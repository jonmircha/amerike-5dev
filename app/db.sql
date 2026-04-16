-- Script de creación de base de datos para "Entrena tu Glamour"
-- Ejecutar en Supabase SQL Editor

-- Habilitar extensión UUID si es necesario
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =============================================
-- TABLA: actividades (catálogo)
-- =============================================
CREATE TABLE IF NOT EXISTS actividades (
    actividad_id CHAR(2) PRIMARY KEY,
    bloque VARCHAR(20) NOT NULL,
    disciplina VARCHAR(50) NOT NULL,
    horario VARCHAR(50) NOT NULL,
    cupo INTEGER NOT NULL DEFAULT 10,
    cupo_maximo INTEGER NOT NULL DEFAULT 10
);

-- =============================================
-- TABLA: participantes
-- =============================================
CREATE TABLE IF NOT EXISTS participantes (
    email VARCHAR(50) PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL,
    apellidos VARCHAR(50) NOT NULL,
    nacimiento DATE NOT NULL
);

-- =============================================
-- TABLA: registros (tabla intermedia)
-- =============================================
CREATE TABLE IF NOT EXISTS registros (
    registro_id SERIAL PRIMARY KEY,
    email VARCHAR(50) NOT NULL,
    actividad CHAR(2) NOT NULL,
    fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_registros_email
        FOREIGN KEY (email)
        REFERENCES participantes(email)
        ON DELETE CASCADE,
    CONSTRAINT fk_registros_actividad
        FOREIGN KEY (actividad)
        REFERENCES actividades(actividad_id)
        ON DELETE CASCADE
);

-- =============================================
-- ÍNDICES para mejorar rendimiento
-- =============================================
CREATE INDEX IF NOT EXISTS idx_registros_email ON registros(email);
CREATE INDEX IF NOT EXISTS idx_registros_actividad ON registros(actividad);
CREATE INDEX IF NOT EXISTS idx_registros_fecha ON registros(fecha);

-- =============================================
-- DATOS DE CATÁLOGO: actividades
-- =============================================
-- Combinaciones: 4 disciplinas × 3 bloques = 12 registros
-- IDs: "1K", "1Y", "1P", "1Z", "2K", "2Y", "2P", "2Z", "3K", "3Y", "3P", "3Z"

INSERT INTO actividades (actividad_id, bloque, disciplina, horario, cupo, cupo_maximo) VALUES
    -- Bloque 1 (9:00 - 12:00)
    ('1K', 'Bloque 1', 'KICK BOXING', '9:00 - 12:00', 10, 10),
    ('1Y', 'Bloque 1', 'YOGA', '9:00 - 12:00', 20, 20),
    ('1P', 'Bloque 1', 'PILATES', '9:00 - 12:00', 10, 10),
    ('1Z', 'Bloque 1', 'ZUMBA', '9:00 - 12:00', 10, 10),

    -- Bloque 2 (14:00 - 17:00)
    ('2K', 'Bloque 2', 'KICK BOXING', '14:00 - 17:00', 10, 10),
    ('2Y', 'Bloque 2', 'YOGA', '14:00 - 17:00', 20, 20),
    ('2P', 'Bloque 2', 'PILATES', '14:00 - 17:00', 10, 10),
    ('2Z', 'Bloque 2', 'ZUMBA', '14:00 - 17:00', 10, 10),

    -- Bloque 3 (18:00 - 21:00)
    ('3K', 'Bloque 3', 'KICK BOXING', '18:00 - 21:00', 10, 10),
    ('3Y', 'Bloque 3', 'YOGA', '18:00 - 21:00', 20, 20),
    ('3P', 'Bloque 3', 'PILATES', '18:00 - 21:00', 10, 10),
    ('3Z', 'Bloque 3', 'ZUMBA', '18:00 - 21:00', 10, 10)
ON CONFLICT (actividad_id) DO NOTHING;

-- =============================================
-- FUNCIÓN: Verificar cupo disponible
-- =============================================
CREATE OR REPLACE FUNCTION verificar_cupo(p_actividad_id CHAR(2))
RETURNS INTEGER AS $$
DECLARE
    cupo_actual INTEGER;
    registrados INTEGER;
BEGIN
    SELECT cupo_maximo INTO cupo_actual
    FROM actividades
    WHERE actividad_id = p_actividad_id;

    SELECT COUNT(*) INTO registrados
    FROM registros
    WHERE actividad = p_actividad_id;

    RETURN cupo_actual - registrados;
END;
$$ LANGUAGE plpgsql;

-- =============================================
-- FUNCIÓN/PROCEDURE: Registrar participante
-- =============================================
-- Valida cupo, verifica email duplicado y registra en transacción
CREATE OR REPLACE FUNCTION registrar_participante(
    p_email VARCHAR(50),
    p_nombre VARCHAR(50),
    p_apellidos VARCHAR(50),
    p_nacimiento DATE,
    p_actividad_id CHAR(2)
) RETURNS JSON AS $$
DECLARE
    v_cupo_disponible INTEGER;
    v_existe_email BOOLEAN;
    v_existe_registro BOOLEAN;
    v_actividad_nombre VARCHAR(50);
    v_bloque VARCHAR(20);
    v_horario VARCHAR(50);
BEGIN
    -- Verificar si el email ya existe en participantes
    SELECT EXISTS(SELECT 1 FROM participantes WHERE email = p_email) INTO v_existe_email;

    IF v_existe_email THEN
        -- Verificar si ya tiene un registro (solo puede registrarse una vez)
        SELECT EXISTS(SELECT 1 FROM registros WHERE email = p_email) INTO v_existe_registro;

        IF v_existe_registro THEN
            RETURN json_build_object(
                'success', false,
                'message', 'Este email ya está registrado en el evento. Solo se permite un registro por persona.'
            );
        END IF;
    END IF;

    -- Verificar cupo disponible
    SELECT verificar_cupo(p_actividad_id) INTO v_cupo_disponible;

    IF v_cupo_disponible <= 0 THEN
        RETURN json_build_object(
            'success', false,
            'message', 'Lo sentimos, esta actividad está llena. Por favor elige otra opción.'
        );
    END IF;

    -- Obtener información de la actividad
    SELECT disciplina, bloque, horario INTO v_actividad_nombre, v_bloque, v_horario
    FROM actividades
    WHERE actividad_id = p_actividad_id;

    -- INICIAR TRANSACCIÓN
    BEGIN
        -- Insertar o actualizar participante
        IF NOT v_existe_email THEN
            INSERT INTO participantes (email, nombre, apellidos, nacimiento)
            VALUES (p_email, p_nombre, p_apellidos, p_nacimiento);
        ELSE
            UPDATE participantes
            SET nombre = p_nombre, apellidos = p_apellidos, nacimiento = p_nacimiento
            WHERE email = p_email;
        END IF;

        -- Insertar registro
        INSERT INTO registros (email, actividad, fecha)
        VALUES (p_email, p_actividad_id, CURRENT_TIMESTAMP);

        -- COMMIT implícito al finalizar

        RETURN json_build_object(
            'success', true,
            'message', '¡Registro exitoso! Te hemos enviado un correo de confirmación.',
            'data', json_build_object(
                'email', p_email,
                'nombre', p_nombre,
                'actividad', v_actividad_nombre,
                'bloque', v_bloque,
                'horario', v_horario
            )
        );

    EXCEPTION WHEN OTHERS THEN
        -- ROLLBACK implícito en caso de error
        RETURN json_build_object(
            'success', false,
            'message', 'Ocurrió un error al procesar tu registro. Por favor intenta de nuevo.'
        );
    END;
END;
$$ LANGUAGE plpgsql;

-- =============================================
-- FUNCIÓN: Obtener participantes con detalles
-- =============================================
CREATE OR REPLACE FUNCTION obtener_participantes_completos()
RETURNS TABLE (
    email VARCHAR(50),
    nombre VARCHAR(50),
    apellidos VARCHAR(50),
    nacimiento DATE,
    actividad_id CHAR(2),
    disciplina VARCHAR(50),
    bloque VARCHAR(20),
    horario VARCHAR(50),
    fecha_registro TIMESTAMP
) AS $$
BEGIN
    RETURN QUERY
    SELECT
        p.email,
        p.nombre,
        p.apellidos,
        p.nacimiento,
        a.actividad_id,
        a.disciplina,
        a.bloque,
        a.horario,
        r.fecha
    FROM participantes p
    INNER JOIN registros r ON p.email = r.email
    INNER JOIN actividades a ON r.actividad = a.actividad_id
    ORDER BY r.fecha DESC;
END;
$$ LANGUAGE plpgsql;

-- =============================================
-- FUNCIÓN: Obtener cupos disponibles por actividad
-- =============================================
CREATE OR REPLACE FUNCTION obtener_cupos_disponibles()
RETURNS TABLE (
    actividad_id CHAR(2),
    disciplina VARCHAR(50),
    bloque VARCHAR(20),
    horario VARCHAR(50),
    cupo_maximo INTEGER,
    cupo_ocupado INTEGER,
    cupo_disponible INTEGER
) AS $$
BEGIN
    RETURN QUERY
    SELECT
        a.actividad_id,
        a.disciplina,
        a.bloque,
        a.horario,
        a.cupo_maximo,
        COALESCE(COUNT(r.actividad), 0)::INTEGER AS cupo_ocupado,
        (a.cupo_maximo - COALESCE(COUNT(r.actividad), 0))::INTEGER AS cupo_disponible
    FROM actividades a
    LEFT JOIN registros r ON a.actividad_id = r.actividad
    GROUP BY a.actividad_id, a.disciplina, a.bloque, a.horario, a.cupo_maximo
    ORDER BY a.bloque, a.disciplina;
END;
$$ LANGUAGE plpgsql;

-- =============================================
-- FUNCIÓN: Eliminar registro (para admin)
-- =============================================
CREATE OR REPLACE FUNCTION eliminar_registro(p_email VARCHAR(50))
RETURNS JSON AS $$
BEGIN
    -- Eliminar en cascada gracias a FOREIGN KEY con ON DELETE CASCADE
    DELETE FROM registros WHERE email = p_email;

    -- Opcional: eliminar participante si no tiene otros registros
    -- DELETE FROM participantes WHERE email = p_email AND NOT EXISTS (SELECT 1 FROM registros WHERE email = p_email);

    RETURN json_build_object(
        'success', true,
        'message', 'Registro eliminado exitosamente.'
    );
END;
$$ LANGUAGE plpgsql;

-- =============================================
-- FUNCIÓN: Actualizar registro (para admin)
-- =============================================
CREATE OR REPLACE FUNCTION actualizar_registro(
    p_email_antiguo VARCHAR(50),
    p_email_nuevo VARCHAR(50),
    p_nombre VARCHAR(50),
    p_apellidos VARCHAR(50),
    p_nacimiento DATE,
    p_actividad_id CHAR(2)
) RETURNS JSON AS $$
DECLARE
    v_cupo_disponible INTEGER;
    v_existe_registro BOOLEAN;
BEGIN
    -- Verificar si existe el registro antiguo
    SELECT EXISTS(SELECT 1 FROM registros WHERE email = p_email_antiguo) INTO v_existe_registro;

    IF NOT v_existe_registro THEN
        RETURN json_build_object(
            'success', false,
            'message', 'El registro que intentas modificar no existe.'
        );
    END IF;

    -- Si cambia el email, verificar que el nuevo no exista
    IF p_email_antiguo != p_email_nuevo THEN
        SELECT EXISTS(SELECT 1 FROM participantes WHERE email = p_email_nuevo) INTO v_existe_registro;

        IF v_existe_registro THEN
            RETURN json_build_object(
                'success', false,
                'message', 'El email nuevo ya está registrado.'
            );
        END IF;

        -- Verificar cupo de la nueva actividad si cambia
        SELECT verificar_cupo(p_actividad_id) INTO v_cupo_disponible;

        IF v_cupo_disponible <= 0 THEN
            RETURN json_build_object(
                'success', false,
                'message', 'La actividad seleccionada está llena.'
            );
        END IF;
    END IF;

    -- INICIAR TRANSACCIÓN
    BEGIN
        -- Actualizar participante
        UPDATE participantes
        SET email = p_email_nuevo,
            nombre = p_nombre,
            apellidos = p_apellidos,
            nacimiento = p_nacimiento
        WHERE email = p_email_antiguo;

        -- Actualizar registro
        UPDATE registros
        SET email = p_email_nuevo,
            actividad = p_actividad_id
        WHERE email = p_email_antiguo;

        RETURN json_build_object(
            'success', true,
            'message', 'Registro actualizado exitosamente.'
        );

    EXCEPTION WHEN OTHERS THEN
        RETURN json_build_object(
            'success', false,
            'message', 'Ocurrió un error al actualizar el registro.'
        );
    END;
END;
$$ LANGUAGE plpgsql;
