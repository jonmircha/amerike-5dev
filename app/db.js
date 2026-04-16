/**
 * Módulo de conexión y consultas a Supabase
 * "Entrena tu Glamour" - Sistema de registros
 */

import { SUPABASE_CONFIG } from './config.js';

// =============================================
// INICIALIZAR CLIENTE DE SUPABASE
// =============================================
// Usamos la API REST directamente sin dependencias externas
const supabaseUrl = SUPABASE_CONFIG.url;
const supabaseKey = SUPABASE_CONFIG.key;

/**
 * Ejecutar consulta RPC (stored procedure) en Supabase
 * @param {string} functionName - Nombre de la función en Supabase
 * @param {object} params - Parámetros de la función
 * @returns {Promise<object>} Resultado de la consulta
 */
async function rpc(functionName, params = {}) {
    try {
        const response = await fetch(`${supabaseUrl}/rest/v1/rpc/${functionName}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'apikey': supabaseKey,
                'Authorization': `Bearer ${supabaseKey}`,
                'Prefer': 'return=representation'
            },
            body: JSON.stringify(params)
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || `Error ${response.status}: ${response.statusText}`);
        }

        const result = await response.json();
        // RPC retorna array, tomamos el primer elemento si es un objeto único
        return Array.isArray(result) && result.length === 1 ? result[0] : result;
    } catch (error) {
        console.error(`Error en RPC ${functionName}:`, error);
        throw error;
    }
}

/**
 * Obtener datos de una tabla
 * @param {string} table - Nombre de la tabla
 * @param {object} options - Opciones: columns, filter, order, limit
 * @returns {Promise<Array>} Datos de la tabla
 */
async function select(table, options = {}) {
    try {
        let url = `${supabaseUrl}/rest/v1/${table}`;
        const params = new URLSearchParams();

        // Columnas específicas
        if (options.columns) {
            params.append('select', options.columns);
        }

        // Filtros
        if (options.filter) {
            Object.entries(options.filter).forEach(([key, value]) => {
                params.append(key, `eq.${value}`);
            });
        }

        // Ordenamiento
        if (options.order) {
            params.append('order', `${options.order.column}.${options.ascending !== false ? 'asc' : 'desc'}`);
        }

        // Límite
        if (options.limit) {
            params.append('limit', options.limit);
        }

        const queryString = params.toString();
        if (queryString) {
            url += `?${queryString}`;
        }

        const response = await fetch(url, {
            headers: {
                'apikey': supabaseKey,
                'Authorization': `Bearer ${supabaseKey}`,
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || `Error ${response.status}: ${response.statusText}`);
        }

        return await response.json();
    } catch (error) {
        console.error(`Error en select de ${table}:`, error);
        throw error;
    }
}

/**
 * Insertar datos en una tabla
 * @param {string} table - Nombre de la tabla
 * @param {object} data - Datos a insertar
 * @returns {Promise<object>} Registro insertado
 */
async function insert(table, data) {
    try {
        const response = await fetch(`${supabaseUrl}/rest/v1/${table}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'apikey': supabaseKey,
                'Authorization': `Bearer ${supabaseKey}`,
                'Prefer': 'return=representation'
            },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || `Error ${response.status}: ${response.statusText}`);
        }

        const result = await response.json();
        return Array.isArray(result) ? result[0] : result;
    } catch (error) {
        console.error(`Error en insert de ${table}:`, error);
        throw error;
    }
}

/**
 * Actualizar datos en una tabla
 * @param {string} table - Nombre de la tabla
 * @param {object} data - Datos a actualizar
 * @param {object} filter - Filtro para identificar el registro (ej: { email: 'test@test.com' })
 * @returns {Promise<object>} Registro actualizado
 */
async function update(table, data, filter) {
    try {
        const filterParams = new URLSearchParams();
        Object.entries(filter).forEach(([key, value]) => {
            filterParams.append(key, `eq.${value}`);
        });

        const response = await fetch(`${supabaseUrl}/rest/v1/${table}?${filterParams}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'apikey': supabaseKey,
                'Authorization': `Bearer ${supabaseKey}`,
                'Prefer': 'return=representation'
            },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || `Error ${response.status}: ${response.statusText}`);
        }

        const result = await response.json();
        return Array.isArray(result) ? result[0] : result;
    } catch (error) {
        console.error(`Error en update de ${table}:`, error);
        throw error;
    }
}

/**
 * Eliminar datos de una tabla
 * @param {string} table - Nombre de la tabla
 * @param {object} filter - Filtro para identificar el registro
 * @returns {Promise<void>}
 */
async function remove(table, filter) {
    try {
        const filterParams = new URLSearchParams();
        Object.entries(filter).forEach(([key, value]) => {
            filterParams.append(key, `eq.${value}`);
        });

        const response = await fetch(`${supabaseUrl}/rest/v1/${table}?${filterParams}`, {
            method: 'DELETE',
            headers: {
                'apikey': supabaseKey,
                'Authorization': `Bearer ${supabaseKey}`
            }
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || `Error ${response.status}: ${response.statusText}`);
        }

        return { success: true };
    } catch (error) {
        console.error(`Error en delete de ${table}:`, error);
        throw error;
    }
}

// =============================================
// FUNCIONES ESPECÍFICAS DEL DOMINIO
// =============================================

/**
 * Registrar un participante usando el stored procedure
 * @param {string} email
 * @param {string} nombre
 * @param {string} apellidos
 * @param {string} nacimiento (YYYY-MM-DD)
 * @param {string} actividadId
 * @returns {Promise<object>} Resultado del registro
 */
async function registrarParticipante(email, nombre, apellidos, nacimiento, actividadId) {
    return await rpc('registrar_participante', {
        p_email: email,
        p_nombre: nombre,
        p_apellidos: apellidos,
        p_nacimiento: nacimiento,
        p_actividad_id: actividadId
    });
}

/**
 * Obtener todos los participantes con detalles
 * @returns {Promise<Array>} Lista de participantes
 */
async function obtenerParticipantes() {
    return await rpc('obtener_participantes_completos');
}

/**
 * Obtener cupos disponibles por actividad
 * @returns {Promise<Array>} Cupos disponibles
 */
async function obtenerCuposDisponibles() {
    return await rpc('obtener_cupos_disponibles');
}

/**
 * Obtener actividades filtradas por disciplina
 * @param {string} disciplina - Nombre de la disciplina
 * @returns {Promise<Array>} Actividades disponibles
 */
async function obtenerActividadesPorDisciplina(disciplina) {
    return await select('actividades', {
        filter: { disciplina: disciplina },
        order: { column: 'bloque' }
    });
}

/**
 * Obtener una actividad específica
 * @param {string} actividadId - ID de la actividad (ej: "1K")
 * @returns {Promise<object>} Datos de la actividad
 */
async function obtenerActividad(actividadId) {
    const resultados = await select('actividades', {
        filter: { actividad_id: actividadId }
    });
    return resultados[0] || null;
}

/**
 * Verificar si un email ya tiene registro
 * @param {string} email
 * @returns {Promise<boolean>} true si ya está registrado
 */
async function emailYaRegistrado(email) {
    const resultados = await select('registros', {
        filter: { email: email },
        limit: 1
    });
    return resultados.length > 0;
}

/**
 * Eliminar un registro por email
 * @param {string} email
 * @returns {Promise<object>} Resultado de la eliminación
 */
async function eliminarRegistro(email) {
    return await rpc('eliminar_registro', { p_email: email });
}

/**
 * Actualizar un registro existente
 * @param {string} emailAntiguo
 * @param {string} emailNuevo
 * @param {string} nombre
 * @param {string} apellidos
 * @param {string} nacimiento
 * @param {string} actividadId
 * @returns {Promise<object>} Resultado de la actualización
 */
async function actualizarRegistro(emailAntiguo, emailNuevo, nombre, apellidos, nacimiento, actividadId) {
    return await rpc('actualizar_registro', {
        p_email_antiguo: emailAntiguo,
        p_email_nuevo: emailNuevo,
        p_nombre: nombre,
        p_apellidos: apellidos,
        p_nacimiento: nacimiento,
        p_actividad_id: actividadId
    });
}

// =============================================
// EXPORTAR FUNCIONES
// =============================================
export {
    // Funciones genéricas
    select,
    insert,
    update,
    remove,
    rpc,

    // Funciones del dominio
    registrarParticipante,
    obtenerParticipantes,
    obtenerCuposDisponibles,
    obtenerActividadesPorDisciplina,
    obtenerActividad,
    emailYaRegistrado,
    eliminarRegistro,
    actualizarRegistro
};
