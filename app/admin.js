/**
 * Script del Panel Administrativo
 * "Entrena tu Glamour" - Sistema de registros
 */

import {
    ADMIN_CONFIG,
    MENSAJES,
    DISCIPLINAS
} from './config.js';

import {
    obtenerParticipantes,
    eliminarRegistro,
    actualizarRegistro,
    obtenerCuposDisponibles
} from './db.js';

// =============================================
// ESTADO DE LA APLICACIÓN
// =============================================
let participantes = [];
let filtroActual = {
    disciplina: '',
    bloque: '',
    search: ''
};

// =============================================
// UTILIDADES
// =============================================

/**
 * Verificar sesión almacenada
 */
function verificarSesion() {
    const sesion = localStorage.getItem('adminSesion');

    if (sesion) {
        try {
            const data = JSON.parse(sesion);
            const ahora = new Date().getTime();

            // Verificar si la sesión no ha expirado (30 min)
            if (ahora < data.expira) {
                return true;
            }
        } catch (e) {
            console.error('Error al leer sesión:', e);
        }
    }

    return false;
}

/**
 * Guardar sesión
 */
function guardarSesion(recordar = false) {
    const minutos = recordar ? ADMIN_CONFIG.sesionMinutos : 30;
    const expira = new Date().getTime() + (minutos * 60 * 1000);

    localStorage.setItem('adminSesion', JSON.stringify({
        usuario: ADMIN_CONFIG.usuario,
        expira: expira
    }));
}

/**
 * Cerrar sesión
 */
function cerrarSesion() {
    localStorage.removeItem('adminSesion');
    window.location.reload();
}

/**
 * Formatear fecha para mostrar
 */
function formatDate(dateString) {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
}

/**
 * Formatear fecha y hora
 */
function formatDateTime(dateString) {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
}

/**
 * Mostrar toast notification
 */
function showToast(message, type = 'success') {
    const toast = document.getElementById('toast');
    const toastMessage = document.getElementById('toast-message');

    toast.className = `toast ${type}`;
    toastMessage.textContent = message;
    toast.style.display = 'block';

    setTimeout(() => {
        toast.style.display = 'none';
    }, 3000);
}

// =============================================
// LOGIN
// =============================================

function initLogin() {
    const loginOverlay = document.getElementById('login-overlay');
    const adminPanel = document.getElementById('admin-panel');
    const loginForm = document.getElementById('login-form');
    const loginError = document.getElementById('login-error');

    // Verificar sesión existente
    if (verificarSesion()) {
        loginOverlay.style.display = 'none';
        adminPanel.style.display = 'block';
        cargarParticipantes();
        return;
    }

    // Manejar submit del login
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const usuario = document.getElementById('admin-usuario').value.trim();
        const password = document.getElementById('admin-password').value.trim();
        const recordar = document.getElementById('recordar').checked;

        if (usuario === ADMIN_CONFIG.usuario && password === ADMIN_CONFIG.password) {
            guardarSesion(recordar);
            loginOverlay.style.display = 'none';
            adminPanel.style.display = 'block';
            cargarParticipantes();
        } else {
            loginError.textContent = 'Usuario o contraseña incorrectos';
            loginError.style.display = 'block';
        }
    });

    // Manejar logout
    document.getElementById('btn-logout').addEventListener('click', cerrarSesion);
}

// =============================================
// CARGA DE DATOS
// =============================================

async function cargarParticipantes() {
    const tablaBody = document.getElementById('tabla-body');
    const noData = document.getElementById('no-data');
    const errorData = document.getElementById('error-data');

    try {
        const datos = await obtenerParticipantes();
        participantes = Array.isArray(datos) ? datos : [];

        // Ocultar loading y error
        tablaBody.innerHTML = '';
        errorData.style.display = 'none';

        if (participantes.length === 0) {
            noData.style.display = 'block';
            actualizarStats();
            return;
        }

        noData.style.display = 'none';
        renderTabla();
        actualizarStats();

    } catch (error) {
        console.error('Error al cargar participantes:', error);
        tablaBody.innerHTML = '';
        noData.style.display = 'none';
        errorData.style.display = 'block';
        document.getElementById('error-message').textContent = error.message || 'Error de conexión';
    }
}

// =============================================
// RENDERIZADO DE TABLA
// =============================================

function renderTabla() {
    const tablaBody = document.getElementById('tabla-body');

    // Filtrar participantes
    const filtrados = filtrarParticipantes();

    if (filtrados.length === 0) {
        tablaBody.innerHTML = `
            <tr>
                <td colspan="9" style="text-align: center; padding: 2rem; color: var(--color-gray);">
                    No se encontraron participantes con los filtros actuales
                </td>
            </tr>
        `;
        return;
    }

    tablaBody.innerHTML = filtrados.map(p => `
        <tr data-email="${p.email}">
            <td>${p.email}</td>
            <td>${p.nombre}</td>
            <td>${p.apellidos}</td>
            <td>${formatDate(p.nacimiento)}</td>
            <td>${p.disciplina}</td>
            <td>${p.bloque}</td>
            <td>${p.horario}</td>
            <td>${formatDateTime(p.fecha_registro)}</td>
            <td>
                <div class="table-actions">
                    <button class="btn-icon edit" onclick="window.editarParticipante('${p.email}')" title="Editar">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                        </svg>
                    </button>
                    <button class="btn-icon delete" onclick="window.eliminarParticipante('${p.email}')" title="Eliminar">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <polyline points="3 6 5 6 21 6"></polyline>
                            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                            <line x1="10" y1="11" x2="10" y2="17"></line>
                            <line x1="14" y1="11" x2="14" y2="17"></line>
                        </svg>
                    </button>
                </div>
            </td>
        </tr>
    `).join('');
}

// =============================================
// FILTROS
// =============================================

function filtrarParticipantes() {
    return participantes.filter(p => {
        // Filtro por disciplina
        if (filtroActual.disciplina && p.disciplina !== filtroActual.disciplina) {
            return false;
        }

        // Filtro por bloque
        if (filtroActual.bloque && p.bloque !== filtroActual.bloque) {
            return false;
        }

        // Búsqueda por texto
        if (filtroActual.search) {
            const search = filtroActual.search.toLowerCase();
            const matchEmail = p.email.toLowerCase().includes(search);
            const matchNombre = p.nombre.toLowerCase().includes(search);
            const matchApellidos = p.apellidos.toLowerCase().includes(search);

            if (!matchEmail && !matchNombre && !matchApellidos) {
                return false;
            }
        }

        return true;
    });
}

function initFiltros() {
    const filterDisciplina = document.getElementById('filter-disciplina');
    const filterBloque = document.getElementById('filter-bloque');
    const filterSearch = document.getElementById('filter-search');
    const btnReset = document.getElementById('btn-reset-filters');

    filterDisciplina.addEventListener('change', (e) => {
        filtroActual.disciplina = e.target.value;
        renderTabla();
    });

    filterBloque.addEventListener('change', (e) => {
        filtroActual.bloque = e.target.value;
        renderTabla();
    });

    filterSearch.addEventListener('input', (e) => {
        filtroActual.search = e.target.value;
        renderTabla();
    });

    btnReset.addEventListener('click', () => {
        filtroActual = { disciplina: '', bloque: '', search: '' };
        filterDisciplina.value = '';
        filterBloque.value = '';
        filterSearch.value = '';
        renderTabla();
    });
}

// =============================================
// ESTADÍSTICAS
// =============================================

function actualizarStats() {
    const total = participantes.length;
    const kick = participantes.filter(p => p.disciplina === 'KICK BOXING').length;
    const yoga = participantes.filter(p => p.disciplina === 'YOGA').length;
    const pilates = participantes.filter(p => p.disciplina === 'PILATES').length;
    const zumba = participantes.filter(p => p.disciplina === 'ZUMBA').length;

    document.getElementById('stat-total').textContent = total;
    document.getElementById('stat-kick').textContent = kick;
    document.getElementById('stat-yoga').textContent = yoga;
    document.getElementById('stat-pilates').textContent = pilates;
    document.getElementById('stat-zumba').textContent = zumba;
}

// =============================================
// ELIMINAR PARTICIPANTE
// =============================================

window.eliminarParticipante = async function(email) {
    if (!confirm(`¿Estás seguro de eliminar el registro de ${email}?`)) {
        return;
    }

    try {
        const resultado = await eliminarRegistro(email);

        if (resultado.success) {
            showToast('Registro eliminado correctamente');
            await cargarParticipantes();
        } else {
            showToast(resultado.message, 'error');
        }
    } catch (error) {
        console.error('Error al eliminar:', error);
        showToast('Error al eliminar el registro', 'error');
    }
};

// =============================================
// EDITAR PARTICIPANTE - MODAL
// =============================================

window.editarParticipante = async function(email) {
    const participante = participantes.find(p => p.email === email);

    if (!participante) {
        showToast('Participante no encontrado', 'error');
        return;
    }

    // Llenar el formulario con los datos
    document.getElementById('edit-email-original').value = participante.email;
    document.getElementById('edit-nombre').value = participante.nombre;
    document.getElementById('edit-apellidos').value = participante.apellidos;
    document.getElementById('edit-email').value = participante.email;
    document.getElementById('edit-nacimiento').value = formatDate(participante.nacimiento);

    // Determinar actividad actual
    const actividadId = `${participante.bloque === 'Bloque 1' ? '1' : participante.bloque === 'Bloque 2' ? '2' : '3'}${participante.disciplina[0]}`;
    document.getElementById('edit-disciplina').value = participante.disciplina;
    document.getElementById('edit-bloque').value = actividadId;

    // Mostrar modal
    document.getElementById('modal-editar').style.display = 'flex';
};

function initModal() {
    const modal = document.getElementById('modal-editar');
    const btnCerrar = document.getElementById('modal-cerrar');
    const btnCancelar = document.getElementById('btn-cancelar');
    const formEditar = document.getElementById('form-editar');
    const modalError = document.getElementById('modal-error');

    // Cerrar modal
    btnCerrar.addEventListener('click', () => {
        modal.style.display = 'none';
        modalError.style.display = 'none';
    });

    btnCancelar.addEventListener('click', () => {
        modal.style.display = 'none';
        modalError.style.display = 'none';
    });

    // Cerrar al hacer click fuera
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
            modalError.style.display = 'none';
        }
    });

    // Submit del formulario
    formEditar.addEventListener('submit', async (e) => {
        e.preventDefault();
        modalError.style.display = 'none';

        const emailOriginal = document.getElementById('edit-email-original').value;
        const emailNuevo = document.getElementById('edit-email').value.trim();
        const nombre = document.getElementById('edit-nombre').value.trim();
        const apellidos = document.getElementById('edit-apellidos').value.trim();
        const nacimiento = document.getElementById('edit-nacimiento').value;
        const actividadId = document.getElementById('edit-bloque').value;

        try {
            const resultado = await actualizarRegistro(
                emailOriginal,
                emailNuevo,
                nombre,
                apellidos,
                nacimiento,
                actividadId
            );

            if (resultado.success) {
                showToast('Registro actualizado correctamente');
                modal.style.display = 'none';
                await cargarParticipantes();
            } else {
                modalError.textContent = resultado.message;
                modalError.style.display = 'block';
            }
        } catch (error) {
            console.error('Error al actualizar:', error);
            modalError.textContent = 'Error al actualizar el registro';
            modalError.style.display = 'block';
        }
    });
}

// =============================================
// EXPORTAR DATOS
// =============================================

function initExportar() {
    document.getElementById('btn-export').addEventListener('click', () => {
        const filtrados = filtrarParticipantes();

        if (filtrados.length === 0) {
            showToast('No hay datos para exportar', 'error');
            return;
        }

        // Crear CSV
        const headers = ['Email', 'Nombre', 'Apellidos', 'Nacimiento', 'Disciplina', 'Bloque', 'Horario', 'Fecha Registro'];
        const rows = filtrados.map(p => [
            p.email,
            p.nombre,
            p.apellidos,
            p.nacimiento,
            p.disciplina,
            p.bloque,
            p.horario,
            p.fecha_registro
        ]);

        const csvContent = [
            headers.join(','),
            ...rows.map(row => row.map(cell => `"${cell}"`).join(','))
        ].join('\n');

        // Descargar archivo
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = `participantes-${new Date().toISOString().split('T')[0]}.csv`;
        link.click();

        showToast('Datos exportados correctamente');
    });
}

// =============================================
// ACTUALIZAR CUPOS EN TIEMPO REAL
// =============================================

async function initActualizacionCupos() {
    // Actualizar cupos cada 30 segundos
    setInterval(async () => {
        try {
            await cargarParticipantes();
        } catch (error) {
            console.error('Error al actualizar cupos:', error);
        }
    }, 30000);
}

// =============================================
// INICIALIZACIÓN
// =============================================

function init() {
    initLogin();
    initFiltros();
    initModal();
    initExportar();
    initActualizacionCupos();

    console.log('Panel Admin inicializado');
}

// Iniciar cuando el DOM esté listo
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
