/**
 * Configuración del proyecto "Entrena tu Glamour"
 *
 * IMPORTANTE: Para usar Supabase, necesitas:
 * 1. Crear una cuenta en https://supabase.com
 * 2. Crear un nuevo proyecto
 * 3. Ejecutar el script app/db.sql en el SQL Editor de Supabase
 * 4. Obtener tus credenciales desde Settings > API
 * 5. Reemplazar los valores abaixo
 */

// =============================================
// CONFIGURACIÓN DE SUPABASE
// =============================================
const SUPABASE_CONFIG = {
  // URL de tu proyecto Supabase (ej: https://xyzcompany.supabase.co)
  url: "https://kkbybfhjpsuqaizmukhh.supabase.co",

  // Clave pública (anon/public key) desde Settings > API
  // Esta clave es segura para usar en el frontend
  key: "sb_publishable_u3NF3cNu5FtWWOQHaeMqTg_pBpQHH4p",
};

// =============================================
// CONFIGURACIÓN DEL EVENTO
// =============================================
const EVENTO_CONFIG = {
  // Fecha del evento (formato: YYYY-MM-DD)
  fechaEvento: "2026-05-15",

  // Nombre del evento
  nombre: "Entrena tu Glamour",

  // Hora del evento para el countdown (si es null, usa medianoche)
  horaEvento: "09:00",

  // Email de contacto para soporte
  emailSoporte: "contacto@entrenatumglamour.mx",
};

// =============================================
// CONFIGURACIÓN DE EMAIL (Supabase Edge Function)
// =============================================
const EMAIL_CONFIG = {
  // URL de la Edge Function para enviar emails
  // Se debe crear una Edge Function en Supabase para esto
  sendEmailUrl: "TU_URL_DE_EDGE_FUNCTION_AQUI",

  // Email del remitente (configurado en Supabase)
  desde: "no-reply@entrenatumglamour.mx",

  // Asunto del email de confirmación
  asuntoConfirmacion: "¡Tu registro está confirmado! 🎉",
};

// =============================================
// CONFIGURACIÓN DE ADMIN
// =============================================
const ADMIN_CONFIG = {
  // Credenciales de acceso al panel admin
  // En producción, esto debería validarse contra Supabase Auth
  usuario: "admin",
  password: "glamour2026", // ⚠️ Cambiar en producción

  // Tiempo de sesión en minutos
  sesionMinutos: 30,
};

// =============================================
// DISCIPLINAS Y BLOQUES (catálogo)
// =============================================
const DISCIPLINAS = [
  { id: "KICK BOXING", nombre: "Kick Boxing", icono: "🥊" },
  { id: "YOGA", nombre: "Yoga", icono: "🧘" },
  { id: "PILATES", nombre: "Pilates", icono: "🤸" },
  { id: "ZUMBA", nombre: "Zumba", icono: "💃" },
];

const BLOQUES = [
  { id: "Bloque 1", nombre: "Bloque 1", horario: "9:00 - 12:00" },
  { id: "Bloque 2", nombre: "Bloque 2", horario: "14:00 - 17:00" },
  { id: "Bloque 3", nombre: "Bloque 3", horario: "18:00 - 21:00" },
];

// =============================================
// MENSAJES DE USUARIO
// =============================================
const MENSAJES = {
  exito: {
    registro:
      "¡Tu registro ha sido exitoso! Te hemos enviado un correo de confirmación.",
    actualizacion: "Tu registro ha sido actualizado.",
    eliminacion: "Registro eliminado correctamente.",
  },
  error: {
    emailDuplicado:
      "Este email ya está registrado. Solo se permite un registro por persona.",
    cupoLleno:
      "Lo sentimos, esta actividad está llena. Por favor elige otra opción.",
    camposRequeridos: "Por favor completa todos los campos requeridos.",
    fechaInvalida: "Fecha de nacimiento inválida.",
    conexion: "Error de conexión. Por favor intenta de nuevo.",
    general: "Ocurrió un error. Por favor intenta de nuevo.",
  },
  validacion: {
    email: "Ingresa un email válido",
    nombre: "El nombre es requerido",
    apellidos: "Los apellidos son requeridos",
    nacimiento: "Selecciona tu fecha de nacimiento",
    disciplina: "Selecciona una disciplina",
    bloque: "Selecciona un bloque horario",
  },
};

// =============================================
// EXPORTAR CONFIGURACIÓN
// =============================================
// Para usar en otros archivos: import { SUPABASE_CONFIG, EVENTO_CONFIG } from './config.js';

// Hacer disponible globalmente para scripts vanilla JS
window.APP_CONFIG = {
  supabase: SUPABASE_CONFIG,
  evento: EVENTO_CONFIG,
  email: EMAIL_CONFIG,
  admin: ADMIN_CONFIG,
  disciplinas: DISCIPLINAS,
  bloques: BLOQUES,
  mensajes: MENSAJES,
};

// Export para módulos ES6
export {
  SUPABASE_CONFIG,
  EVENTO_CONFIG,
  EMAIL_CONFIG,
  ADMIN_CONFIG,
  DISCIPLINAS,
  BLOQUES,
  MENSAJES,
};
