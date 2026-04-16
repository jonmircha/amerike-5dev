/**
 * Script principal de la Landing Page
 * "Entrena tu Glamour" - Sistema de registros
 */

import {
    EVENTO_CONFIG,
    DISCIPLINAS,
    BLOQUES,
    MENSAJES
} from './config.js';

import {
    registrarParticipante,
    obtenerCuposDisponibles,
    obtenerActividadesPorDisciplina
} from './db.js';

import {
    enviarEmailConfirmacion
} from './send-mail.js';

// =============================================
// ESTADO DE LA APLICACIÓN
// =============================================
let cuposDisponibles = {};
let actividadesPorDisciplina = {};
let disciplinaSeleccionada = null;
let bloqueSeleccionado = null;

// =============================================
// UTILIDADES
// =============================================

/**
 * Formatear fecha para input date (YYYY-MM-DD)
 */
function formatDateForInput(date) {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

/**
 * Validar email con regex
 */
function isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

/**
 * Calcular edad mínima (18 años)
 */
function calcularEdad(fechaNacimiento) {
    const hoy = new Date();
    const nacimiento = new Date(fechaNacimiento);
    let edad = hoy.getFullYear() - nacimiento.getFullYear();
    const mesDiff = hoy.getMonth() - nacimiento.getMonth();

    if (mesDiff < 0 || (mesDiff === 0 && hoy.getDate() < nacimiento.getDate())) {
        edad--;
    }

    return edad;
}

/**
 * Mostrar/ocultar loading en el botón
 */
function setLoading(loading) {
    const btnSubmit = document.getElementById('btn-submit');
    const btnText = btnSubmit.querySelector('.btn-text');
    const btnLoading = btnSubmit.querySelector('.btn-loading');

    if (loading) {
        btnSubmit.disabled = true;
        btnText.style.display = 'none';
        btnLoading.style.display = 'flex';
    } else {
        btnSubmit.disabled = false;
        btnText.style.display = 'inline';
        btnLoading.style.display = 'none';
    }
}

/**
 * Mostrar mensaje de error en el formulario
 */
function showError(field, message) {
    const errorElement = document.getElementById(`error-${field}`);
    const inputElement = document.getElementById(field);

    if (errorElement) {
        errorElement.textContent = message;
    }

    if (inputElement) {
        inputElement.classList.add('error');
    }
}

/**
 * Limpiar errores del formulario
 */
function clearErrors() {
    const errorElements = document.querySelectorAll('.error-message');
    const inputElements = document.querySelectorAll('.error');

    errorElements.forEach(el => el.textContent = '');
    inputElements.forEach(el => el.classList.remove('error'));
}

/**
 * Mostrar mensaje de éxito
 */
function showSuccess(data) {
    const form = document.getElementById('registroForm');
    const successMessage = document.getElementById('success-message');

    form.style.display = 'none';
    successMessage.style.display = 'block';

    const detailsElement = document.getElementById('success-details');
    detailsElement.innerHTML = `
        <strong>${data.nombre}</strong><br>
        ${data.actividad} - ${data.bloque}<br>
        ${data.horario}
    `;
}

/**
 * Mostrar mensaje de error general
 */
function showErrorBox(title, message) {
    const errorBox = document.getElementById('error-message-box');
    const errorTitle = document.getElementById('error-title');
    const errorDesc = document.getElementById('error-description');

    errorTitle.textContent = title;
    errorDesc.textContent = message;
    errorBox.style.display = 'block';

    // Scroll hacia el error
    errorBox.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

// =============================================
// COUNTDOWN
// =============================================

function initCountdown() {
    const fechaEvento = new Date(`${EVENTO_CONFIG.fechaEvento}T${EVENTO_CONFIG.horaEvento || '09:00'}`);

    function updateCountdown() {
        const now = new Date();
        const diff = fechaEvento - now;

        if (diff <= 0) {
            // El evento ya comenzó
            document.getElementById('days').textContent = '00';
            document.getElementById('hours').textContent = '00';
            document.getElementById('minutes').textContent = '00';
            document.getElementById('seconds').textContent = '00';
            return;
        }

        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);

        document.getElementById('days').textContent = String(days).padStart(2, '0');
        document.getElementById('hours').textContent = String(hours).padStart(2, '0');
        document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
        document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');
    }

    updateCountdown();
    setInterval(updateCountdown, 1000);
}

// =============================================
// CARGA DE CUPOS DISPONIBLES
// =============================================

async function cargarCuposDisponibles() {
    try {
        const cupos = await obtenerCuposDisponibles();

        cuposDisponibles = {};
        cupos.forEach(cupo => {
            cuposDisponibles[cupo.actividad_id] = {
                disciplina: cupo.disciplina,
                bloque: cupo.bloque,
                horario: cupo.horario,
                disponible: cupo.cupo_disponible,
                maximo: cupo.cupo_maximo,
                ocupado: cupo.cupo_ocupado
            };
        });

        console.log('Cupos cargados:', cuposDisponibles);
    } catch (error) {
        console.error('Error al cargar cupos:', error);
        console.error('Error details:', error.message, error.stack);
        // Datos de fallback por si falla la conexión
        cuposDisponibles = generarCuposFallback();
    }
}

function generarCuposFallback() {
    const cupos = {};
    const disciplinas = ['KICK BOXING', 'YOGA', 'PILATES', 'ZUMBA'];
    const bloques = ['Bloque 1', 'Bloque 2', 'Bloque 3'];
    const horarios = ['9:00 - 12:00', '14:00 - 17:00', '18:00 - 21:00'];

    disciplinas.forEach((disc, discIndex) => {
        const cupoMaximo = disc === 'YOGA' ? 20 : 10;
        bloques.forEach((bloque, bloqueIndex) => {
            const id = `${bloqueIndex + 1}${disc[0]}`;
            cupos[id] = {
                disciplina: disc,
                bloque: bloque,
                horario: horarios[bloqueIndex],
                disponible: cupoMaximo,
                maximo: cupoMaximo,
                ocupado: 0
            };
        });
    });

    return cupos;
}

// =============================================
// SELECCIÓN DE DISCIPLINA
// =============================================

function initDisciplinasCards() {
    const cards = document.querySelectorAll('.disciplina-card');

    cards.forEach(card => {
        card.addEventListener('click', () => {
            const disciplina = card.dataset.disciplina;

            // Remover selección previa
            cards.forEach(c => c.classList.remove('selected'));

            // Seleccionar nueva
            card.classList.add('selected');
            disciplinaSeleccionada = disciplina;

            // Cargar bloques para esta disciplina
            cargarBloquesPorDisciplina(disciplina);

            // Scroll suave hacia el formulario
            document.getElementById('registro').scrollIntoView({ behavior: 'smooth' });

            // Seleccionar el select del formulario
            document.getElementById('disciplina').value = disciplina;
        });
    });
}

// =============================================
// CARGA DE BLOQUES HORARIOS
// =============================================

async function cargarBloquesPorDisciplina(disciplina) {
    const bloquesContainer = document.getElementById('bloques-container');
    const bloquesOptions = document.getElementById('bloques-options');
    const cuposInfo = document.getElementById('cupos-info');
    const cuposGrid = document.getElementById('cupos-grid');

    console.log('Cargando bloques para:', disciplina);
    console.log('Cupos disponibles:', cuposDisponibles);

    try {
        let actividades;

        // Intentar cargar desde Supabase
        if (actividadesPorDisciplina[disciplina]) {
            actividades = actividadesPorDisciplina[disciplina];
        } else {
            actividades = await obtenerActividadesPorDisciplina(disciplina);
            actividadesPorDisciplina[disciplina] = actividades;
        }

        console.log('Actividades cargadas:', actividades);

        // Mostrar contenedor de bloques
        bloquesContainer.style.display = 'block';

        // Generar opciones de bloques
        bloquesOptions.innerHTML = actividades.map(actividad => {
            const cupo = cuposDisponibles[actividad.actividad_id];
            const disponible = cupo ? cupo.disponible : actividad.cupo;
            const esLleno = disponible <= 0;

            return `
                <label class="bloque-option" data-actividad="${actividad.actividad_id}">
                    <input type="radio" name="bloque" value="${actividad.actividad_id}" ${esLleno ? 'disabled' : ''}>
                    <div class="bloque-radio-custom"></div>
                    <div class="bloque-content">
                        <div class="bloque-info">
                            <span class="bloque-nombre">${actividad.bloque}</span>
                            <span class="bloque-horario">${actividad.horario}</span>
                        </div>
                        <span class="bloque-cupo ${esLleno ? 'lleno' : 'disponible'}">
                            ${esLleno ? 'Lleno' : `${disponible} lugares`}
                        </span>
                    </div>
                </label>
            `;
        }).join('');

        // Mostrar cupos detallados
        cuposInfo.style.display = 'block';
        cuposGrid.innerHTML = actividades.map(actividad => {
            const cupo = cuposDisponibles[actividad.actividad_id];
            const disponible = cupo ? cupo.disponible : actividad.cupo;

            return `
                <div class="cupo-item">
                    <div class="cupo-bloque">${actividad.bloque}</div>
                    <div class="cupo-numero ${disponible === 0 ? 'agotado' : ''}">
                        ${disponible}/${actividad.cupo}
                    </div>
                </div>
            `;
        }).join('');

        // Agregar listeners a las opciones de bloque
        const bloqueOptions = bloquesOptions.querySelectorAll('.bloque-option');
        bloqueOptions.forEach(option => {
            option.addEventListener('click', () => {
                const input = option.querySelector('input[type="radio"]');

                if (input.disabled) return;

                // Remover selección previa
                bloqueOptions.forEach(o => o.classList.remove('selected'));

                // Seleccionar nuevo
                option.classList.add('selected');
                input.checked = true;
                bloqueSeleccionado = input.value;

                // Limpiar error
                document.getElementById('error-bloque').textContent = '';
            });
        });

        // Limpiar error de disciplina
        document.getElementById('error-disciplina').textContent = '';

    } catch (error) {
        console.error('Error al cargar bloques:', error);
        showErrorBox('Error', 'No se pudieron cargar los horarios disponibles. Por favor recarga la página.');
    }
}

// =============================================
// VALIDACIÓN DE FORMULARIO
// =============================================

function validarFormulario() {
    clearErrors();
    let isValid = true;

    const nombre = document.getElementById('nombre').value.trim();
    const apellidos = document.getElementById('apellidos').value.trim();
    const email = document.getElementById('email').value.trim();
    const nacimiento = document.getElementById('nacimiento').value;
    const disciplina = document.getElementById('disciplina').value;
    const bloque = bloqueSeleccionado;

    // Validar nombre
    if (!nombre) {
        showError('nombre', MENSAJES.validacion.nombre);
        isValid = false;
    }

    // Validar apellidos
    if (!apellidos) {
        showError('apellidos', MENSAJES.validacion.apellidos);
        isValid = false;
    }

    // Validar email
    if (!email) {
        showError('email', MENSAJES.validacion.email);
        isValid = false;
    } else if (!isValidEmail(email)) {
        showError('email', MENSAJES.validacion.email);
        isValid = false;
    }

    // Validar fecha de nacimiento
    if (!nacimiento) {
        showError('nacimiento', MENSAJES.validacion.nacimiento);
        isValid = false;
    } else {
        const edad = calcularEdad(nacimiento);
        if (edad < 18) {
            showError('nacimiento', 'Debes ser mayor de 18 años para registrarte');
            isValid = false;
        } else if (edad > 100) {
            showError('nacimiento', 'Fecha de nacimiento inválida');
            isValid = false;
        }
    }

    // Validar disciplina
    if (!disciplina) {
        showError('disciplina', MENSAJES.validacion.disciplina);
        isValid = false;
    }

    // Validar bloque
    if (!bloque) {
        showError('bloque', MENSAJES.validacion.bloque);
        isValid = false;
    }

    return isValid;
}

// =============================================
// ENVÍO DEL FORMULARIO
// =============================================

async function handleSubmit(event) {
    event.preventDefault();

    console.log('Formulario submit iniciado');
    console.log('Disciplina seleccionada:', disciplinaSeleccionada);
    console.log('Bloque seleccionado:', bloqueSeleccionado);

    if (!validarFormulario()) {
        console.log('Validación falló');
        // Mostrar primer error
        const firstError = document.querySelector('.error');
        if (firstError) {
            firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
        return;
    }

    console.log('Validación pasó, enviando...');

    setLoading(true);

    const nombre = document.getElementById('nombre').value.trim();
    const apellidos = document.getElementById('apellidos').value.trim();
    const email = document.getElementById('email').value.trim().toLowerCase();
    const nacimiento = document.getElementById('nacimiento').value;
    const actividadId = bloqueSeleccionado;

    try {
        // Registrar participante
        const resultado = await registrarParticipante(
            email,
            nombre,
            apellidos,
            nacimiento,
            actividadId
        );

        if (resultado.success) {
            // Enviar email de confirmación
            await enviarEmailConfirmacion({
                email: email,
                nombre: nombre,
                actividad: resultado.data.actividad,
                bloque: resultado.data.bloque,
                horario: resultado.data.horario
            });

            // Mostrar éxito
            showSuccess(resultado.data);
        } else {
            // Mostrar error específico
            showErrorBox('Error en el registro', resultado.message);
        }

    } catch (error) {
        console.error('Error en el registro:', error);

        let mensajeError = MENSAJES.error.conexion;

        if (error.message.includes('duplicate')) {
            mensajeError = MENSAJES.error.emailDuplicado;
        } else if (error.message.includes('llena') || error.message.includes('cupo')) {
            mensajeError = MENSAJES.error.cupoLleno;
        }

        showErrorBox('Error', mensajeError);
    } finally {
        setLoading(false);
    }
}

// =============================================
// INICIALIZACIÓN
// =============================================

async function init() {
    // Inicializar countdown
    initCountdown();

    // Cargar cupos disponibles
    await cargarCuposDisponibles();

    // Inicializar cards de disciplinas
    initDisciplinasCards();

    // Configurar submit del formulario
    const form = document.getElementById('registroForm');
    form.addEventListener('submit', handleSubmit);

    // Configurar fecha máxima de nacimiento (18 años mínimo)
    const hoy = new Date();
    const hace18Anos = new Date(hoy.setFullYear(hoy.getFullYear() - 18));
    const nacimientoInput = document.getElementById('nacimiento');
    nacimientoInput.max = formatDateForInput(hace18Anos);

    // Configurar fecha mínima (100 años atrás)
    const hace100Anos = new Date();
    hace100Anos.setFullYear(hace100Anos.getFullYear() - 100);
    nacimientoInput.min = formatDateForInput(hace100Anos);

    // Listeners para limpiar errores al escribir
    const inputs = form.querySelectorAll('input, select');
    inputs.forEach(input => {
        input.addEventListener('input', () => {
            input.classList.remove('error');
            document.getElementById(`error-${input.id}`).textContent = '';
        });
    });

    console.log('Entrena tu Glamour - Aplicación inicializada');
}

// Iniciar cuando el DOM esté listo
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
