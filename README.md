# Proyecto "Entrena tu Glamour"

## Contexto del Proyecto

Desarrolla un sistema de registro web para el evento fitness: "Entrena tu Glamour" organizado por la revista GLAMOUR México y patrocinado por Adidas e Innova Sport.

Sistema web con urls amigables para registrar participantes a un evento fitness con 4 disciplinas: Kick Boxing, Yoga, Pilates y Zumba, en 3 bloques de horarios distintos. El evento tiene cupos limitados por actividad y bloque de horario, cada persona solo puede registrarse una vez.

El sistema debe tener una Landing Page para el registro de participantes y un panel administrativo para la gestión de los mismos. El panel administrativo debe estar protegido por contraseña.

## Stack Tecnológico

- **Frontend**: HTML, CSS y JavaScript (Vanilla).
- **Backend**: Supabase como backend as a Service con código Vanilla JS sin dependencias Node.js
- **Base de Datos**: PostgreSQL con Supabase.

## Estructura de archivos básica

Esta es la estructura de archivos que propongo para el proyecto, puedes modificarla si lo consideras necesario:

```
entrena-tu-glamour/
├── index.html           # Landing Page con formulario de registro
├── admin.html           # Panel administrativo con lista de participantes
├── assets/
│   ├── style.css       # Estilos personalizados
│   └── img/            # Imágenes del proyecto
└── app/
    ├── main.js       # script principal de la aplicación
    ├── config.js      # Configuración de entorno y conexión a Supabase
    ├── db.js          # Funciones de conexión y consultas a Supabase
    ├── db.sql          # Script SQL de creación de BD que se ejecutará en Supabase
    └── send-mail.js   # Función para enviar correos con Supabase
```

## Reglas de Negocio

1. **Disciplinas disponibles**: Kick Boxing, Yoga, Pilates, Zumba
2. **Bloques horarios**:
   - Bloque 1: 9:00 - 12:00
   - Bloque 2: 14:00 - 17:00
   - Bloque 3: 18:00 - 21:00
3. **Cupos por actividad**:
   - Yoga: 20 lugares por bloque.
   - Otras disciplinas: 10 lugares por bloque.
4. **Restricciones**:
   - Cada email solo puede registrarse una vez.
   - Cada participante elige UNA sola disciplina y bloque.
   - No permitir registros si el cupo está lleno.
   - Cuando un participante se registra, se le envía un correo electrónico de confirmación.

## Modelo de Datos

Aquí una propuesta de modelo de datos, puedes modificarlo si lo consideras necesario, esta en formato SQL de MySQL, recuerda que usaremos Supabase:

**Tabla actividades** (catálogo)

- actividad_id (CHAR(2), PK): código único (ej: "1K", "2Y")
- bloque (ENUM): "Bloque 1", "Bloque 2", "Bloque 3"
- disciplina (ENUM): "KICK BOXING", "YOGA", "PILATES", "ZUMBA"
- horario (VARCHAR): rango de horas
- cupo (INTEGER): capacidad máxima

**Tabla participantes**

- email (VARCHAR(50), PK)
- nombre (VARCHAR(50))
- apellidos (VARCHAR(50))
- nacimiento (DATE)

**Tabla registros** (tabla intermedia)

- registro_id (INT, PK, AUTO_INCREMENT)
- email (VARCHAR(50), FK → participantes.email)
- actividad (CHAR(2), FK → actividades.actividad_id)
- fecha (DATE)

### Datos de Catálogo

Insertar 12 actividades combinando:

- 4 disciplinas × 3 bloques = 12 registros
- IDs: "1K", "1Y", "1P", "1Z", "2K", "2Y", "2P", "2Z", "3K", "3Y", "3P", "3Z"

### Consideraciones de implementación

1. Usar consultas preparadas para prevenir SQL injection.
2. Manejar errores con try-catch en conexión a BD.
3. Retornar JSON en respuestas AJAX.
4. Usar transacciones en stored procedures.
5. Implementar CASCADE en foreign keys para eliminar en cascada.
6. Validar cupo antes de insertar registro.
7. Enviar correo de confirmación al participante, al registrarse.
8. Mostrar mensajes claros y amigables al usuario.

## Diseño UX/UI

- Crear un diseño responsivo y moderno, que vaya con la identidad de la revista GLAMOUR México y los patrocinadores Adidas e Innova Sport, te agrego como referencia los sitios web de los patrocinadores:
  - https://www.glamour.mx/
  - https://www.adidas.mx/
  - https://www.innovasport.com/
- Como color de acento quiero que uses el color verde lima (#cddc39)
- Como logotipo de la landing page quiero que vectorices (.svg) una propuesta que combine el nombre del evento "Entrena tu Glamour" con el logotipo de GLAMOUR México, te lo dejo en la carpeta assets/img/logo-glamour.png
- Crear un ícono vectorial (.svg) minimalista alusivo a cada disciplina: Kick Boxing, Yoga, Pilates y Zumba.
- Puedes tomar de los sitios oficiales o de cualquier otra fuente urls para las imagenes o videos que consideres pertinentes y que sirvan para la UI de nuestra aplicación, así como los colores y tipografías corporativos de las marcas, el orden de importancia de los patrocinadores es: GLAMOUR México, Adidas e Innova Sport.

## Landing Page (index.html)

- Debe tener una Hero Section visualmente atractiva con el logo del evento y los patrocinadores, con un video de fondo que muestre a mujeres haciendo ejercicio.
- Se debe incluir un contador regresivo para el inicio del evento, la fecha debe ser un valor constante que se defina en el archivo de configuración.
- Formulario con campos: nombre, apellidos, email, fecha de nacimiento
- Select para elegir disciplina
- Radio buttons dinámicos para horarios (se cargan según disciplina)
- Mostrar lugares disponibles en tiempo real
- Validación de campos requeridos
- Mensajes de éxito/error después del registro
- Crear nuevo registro validando que no exista registro previo y que el cupo no esté lleno.
- Enviar correo de confirmación al participante.

## Panel Administrativo (admin.php)

- Acceso con usuario y contraseña.
- Una tabla tipo hoja de cálculo listando todos los registros con las siguientes columnas: Email, Nombre, Apellidos, Fecha Nacimiento, Bloque, Disciplina, Horario, Fecha Registro, Acciones
- Acciones: Botón para editar o eliminar registro por fila.
- Tener filtros para poder ordenar la tabla por disciplina, bloque, horario, fecha de registro, etc.

## Criterios de Aceptación

- [ ] El diseño es responsivo
- [ ] URLs amigables
- [ ] El formulario valida campos requeridos
- [ ] Los horarios se cargan dinámicamente según disciplina
- [ ] Se muestran lugares disponibles en tiempo real
- [ ] No permite registros duplicados por email
- [ ] No permite registrar si el cupo está lleno
- [ ] Se envía el correo de confirmación después de registrarse
- [ ] Se accede al panel de admin con usuario y contraseña
- [ ] El panel admin muestra todos los registros
- [ ] El panel admin permite manejar filtros de ordenamiento
- [ ] Se puede editar y eliminar un registro desde admin
- [ ] Los stored procedures usan transacciones
