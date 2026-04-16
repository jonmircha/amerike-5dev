/**
 * Módulo para envío de correos electrónicos
 * "Entrena tu Glamour" - Sistema de registros
 *
 * Opciones de implementación:
 * 1. Supabase Edge Functions (recomendado para producción)
 * 2. Supabase + servicio externo (SendGrid, Resend, etc.)
 * 3. Email nativo de Supabase (en desarrollo)
 */

import { EMAIL_CONFIG, EVENTO_CONFIG } from './config.js';

/**
 * Generar el HTML del email de confirmación
 * @param {object} datos - Datos del participante
 * @returns {string} HTML del email
 */
function generarEmailHTML(datos) {
    const fechaEvento = new Date(EVENTO_CONFIG.fechaEvento);
    const opcionesFecha = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

    return `
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: 'Helvetica Neue', Arial, sans-serif; background-color: #f5f5f5; }
        .container { max-width: 600px; margin: 0 auto; background: #ffffff; }
        .header {
            background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%);
            padding: 40px 20px;
            text-align: center;
        }
        .header h1 { color: #cddc39; font-size: 28px; margin-bottom: 10px; }
        .header p { color: #ffffff; font-size: 14px; }
        .logo-glamour {
            font-family: 'Didot', 'Bodoni', serif;
            font-size: 18px;
            color: #cddc39;
            text-transform: uppercase;
            letter-spacing: 3px;
            margin-top: 10px;
        }
        .content { padding: 40px 30px; }
        .greeting { font-size: 24px; color: #1a1a1a; margin-bottom: 20px; }
        .message { font-size: 16px; color: #555; line-height: 1.6; margin-bottom: 30px; }
        .details-box {
            background: #f9f9f9;
            border-left: 4px solid #cddc39;
            padding: 20px;
            margin: 20px 0;
        }
        .detail-row {
            display: flex;
            justify-content: space-between;
            padding: 10px 0;
            border-bottom: 1px solid #e0e0e0;
        }
        .detail-row:last-child { border-bottom: none; }
        .detail-label { font-weight: bold; color: #333; }
        .detail-value { color: #555; }
        .highlight { color: #cddc39; font-weight: bold; }
        .cta-button {
            display: inline-block;
            background: #cddc39;
            color: #1a1a1a;
            padding: 15px 30px;
            text-decoration: none;
            border-radius: 5px;
            font-weight: bold;
            margin: 20px 0;
            text-align: center;
        }
        .footer {
            background: #1a1a1a;
            color: #888;
            padding: 30px 20px;
            text-align: center;
            font-size: 12px;
        }
        .footer a { color: #cddc39; text-decoration: none; }
        .sponsors { margin-top: 20px; padding-top: 20px; border-top: 1px solid #333; }
        .sponsor-logos {
            display: flex;
            justify-content: center;
            gap: 30px;
            margin-top: 15px;
        }
        .sponsor-badge {
            background: #333;
            color: #fff;
            padding: 8px 16px;
            border-radius: 4px;
            font-size: 11px;
            text-transform: uppercase;
        }
    </style>
</head>
<body>
    <div class="container">
        <!-- Header -->
        <div class="header">
            <h1>¡Registro Confirmado! 🎉</h1>
            <p>Estás dentro del evento fitness del año</p>
            <div class="logo-glamour">GLAMOUR México</div>
        </div>

        <!-- Contenido -->
        <div class="content">
            <p class="greeting">¡Hola, ${datos.nombre}! 👋</p>

            <p class="message">
                Tu registro para <strong>Entrena tu Glamour</strong> ha sido confirmado.
                Prepárate para vivir una experiencia fitness única junto a las mejores
                marcas: GLAMOUR México, Adidas e Innova Sport.
            </p>

            <div class="details-box">
                <div class="detail-row">
                    <span class="detail-label">Disciplina:</span>
                    <span class="detail-value highlight">${datos.actividad}</span>
                </div>
                <div class="detail-row">
                    <span class="detail-label">Bloque:</span>
                    <span class="detail-value">${datos.bloque}</span>
                </div>
                <div class="detail-row">
                    <span class="detail-label">Horario:</span>
                    <span class="detail-value">${datos.horario}</span>
                </div>
                <div class="detail-row">
                    <span class="detail-label">Fecha del evento:</span>
                    <span class="detail-value">${fechaEvento.toLocaleDateString('es-ES', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
                </div>
                <div class="detail-row">
                    <span class="detail-label">Email de registro:</span>
                    <span class="detail-value">${datos.email}</span>
                </div>
            </div>

            <p class="message">
                <strong>Recomendaciones:</strong>
            </p>
            <ul style="margin: 15px 0 25px 20px; color: #555; line-height: 1.8;">
                <li>Llega con 15 minutos de anticipación</li>
                <li>Lleva ropa cómoda y toalla</li>
                <li>Mantente hidratado/a durante el evento</li>
                <li>Trae tu comprobante de registro (puedes mostrar este email)</li>
            </ul>

            <div style="text-align: center;">
                <a href="#" class="cta-button">Ver detalles del evento</a>
            </div>

            <p class="message">
                ¿Tienes dudas? Responde a este correo o contáctanos en
                <a href="mailto:${EMAIL_CONFIG.desde}" style="color: #cddc39;">${EMAIL_CONFIG.desde}</a>
            </p>
        </div>

        <!-- Footer -->
        <div class="footer">
            <p>© ${new Date().getFullYear()} Entrena tu Glamour. Todos los derechos reservados.</p>

            <div class="sponsors">
                <p style="color: #666; font-size: 11px; text-transform: uppercase; letter-spacing: 2px;">
                    Patrocinadores oficiales
                </p>
                <div class="sponsor-logos">
                    <span class="sponsor-badge">GLAMOUR México</span>
                    <span class="sponsor-badge">Adidas</span>
                    <span class="sponsor-badge">Innova Sport</span>
                </div>
            </div>
        </div>
    </div>
</body>
</html>
    `.trim();
}

/**
 * Generar versión en texto plano del email
 * @param {object} datos - Datos del participante
 * @returns {string} Texto plano del email
 */
function generarEmailTexto(datos) {
    const fechaEvento = new Date(EVENTO_CONFIG.fechaEvento);

    return `
¡REGISTRO CONFIRMADO! 🎉

Hola ${datos.nombre},

Tu registro para "Entrena tu Glamour" ha sido confirmado.

DETALLES DEL REGISTRO:
-----------------------
Disciplina: ${datos.actividad}
Bloque: ${datos.bloque}
Horario: ${datos.horario}
Fecha del evento: ${fechaEvento.toLocaleDateString('es-ES', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
Email de registro: ${datos.email}

RECOMENDACIONES:
- Llega con 15 minutos de anticipación
- Lleva ropa cómoda y toalla
- Mantente hidratado/a durante el evento
- Trae tu comprobante de registro

¿Tienes dudas? Contáctanos en ${EMAIL_CONFIG.desde}

---
Entrena tu Glamour
Organizado por GLAMOUR México
Patrocinado por Adidas e Innova Sport
`.trim();
}

/**
 * Enviar email de confirmación usando Supabase Edge Function
 * @param {object} datos - Datos del participante
 * @param {string} datos.email - Email del participante
 * @param {string} datos.nombre - Nombre del participante
 * @param {string} datos.actividad - Disciplina seleccionada
 * @param {string} datos.bloque - Bloque horario
 * @param {string} datos.horario - Horario específico
 * @returns {Promise<object>} Resultado del envío
 */
async function enviarEmailConfirmacion(datos) {
    const htmlContent = generarEmailHTML(datos);
    const textContent = generarEmailTexto(datos);

    // Opción 1: Usar Edge Function de Supabase (producción)
    if (EMAIL_CONFIG.sendEmailUrl && EMAIL_CONFIG.sendEmailUrl !== 'TU_URL_DE_EDGE_FUNCTION_AQUI') {
        try {
            const response = await fetch(EMAIL_CONFIG.sendEmailUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    to: datos.email,
                    from: EMAIL_CONFIG.desde,
                    subject: EMAIL_CONFIG.asuntoConfirmacion,
                    html: htmlContent,
                    text: textContent
                })
            });

            if (!response.ok) {
                throw new Error('Error al enviar el email');
            }

            return { success: true, message: 'Email enviado correctamente' };
        } catch (error) {
            console.error('Error enviando email:', error);
            return {
                success: false,
                message: 'Error al enviar el email de confirmación'
            };
        }
    }

    // Opción 2: Simular envío (desarrollo/testing)
    console.log('=== EMAIL DE CONFIRMACIÓN (SIMULADO) ===');
    console.log(`Para: ${datos.email}`);
    console.log(`Asunto: ${EMAIL_CONFIG.asuntoConfirmacion}`);
    console.log('-----------------------------------------');
    console.log(textContent);
    console.log('=========================================');

    return {
        success: true,
        message: 'Email simulado (configura Edge Function para envío real)',
        debug: { html: htmlContent, text: textContent }
    };
}

/**
 * Enviar email de recordatorio (opcional, para usar antes del evento)
 * @param {object} datos - Datos del participante
 * @returns {Promise<object>} Resultado del envío
 */
async function enviarEmailRecordatorio(datos) {
    const asunto = 'Recordatorio: Tu evento Entrena tu Glamour es pronto 📅';

    const htmlContent = `
<!DOCTYPE html>
<html>
<head>
    <style>
        body { font-family: Arial, sans-serif; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: #cddc39; padding: 20px; text-align: center; }
        .content { padding: 30px 20px; }
        .highlight { color: #cddc39; font-weight: bold; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1 style="color: #1a1a1a; margin: 0;">¡Falta poco! ⏰</h1>
        </div>
        <div class="content">
            <p>Hola ${datos.nombre},</p>
            <p>Este es un recordatorio de tu registro para <strong>Entrena tu Glamour</strong>.</p>
            <p style="background: #f5f5f5; padding: 20px; border-radius: 8px;">
                <strong>Disciplina:</strong> ${datos.actividad}<br>
                <strong>Horario:</strong> ${datos.horario}<br>
                <strong>Fecha:</strong> ${new Date(EVENTO_CONFIG.fechaEvento).toLocaleDateString('es-ES')}
            </p>
            <p>¡No olvides llegar con 15 minutos de anticipación!</p>
        </div>
    </div>
</body>
</html>
    `.trim();

    // Lógica similar a enviarEmailConfirmacion
    console.log('=== EMAIL DE RECORDATORIO (SIMULADO) ===');
    console.log(`Para: ${datos.email}`);
    console.log(`Asunto: ${asunto}`);

    return { success: true, message: 'Recordatorio simulado' };
}

// =============================================
// EXPORTAR FUNCIONES
// =============================================
export {
    enviarEmailConfirmacion,
    enviarEmailRecordatorio,
    generarEmailHTML,
    generarEmailTexto
};
