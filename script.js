document.addEventListener('DOMContentLoaded', () => {
    const needHelpButton = document.getElementById('needHelpButton');
    const chatbotContainer = document.getElementById('chatbotContainer');
    const chatHeader = document.querySelector('.chat-header');
    const chatContent = document.getElementById('chatContent');
    const footerBackButton = document.getElementById('footerBackButton');
    const goStartButton = document.getElementById('goStartButton');

const chatbotFlow = {
    start: {
        title: "¿En qué te puedo ayudar?",
        message: "",
        options: [
            { text: "Reclamos y Consultas", target: "reclamosConsultas", subtitle: "Información sobre reclamos y consultas generales." },
            { text: "Otros Trámites", target: "otrosTramites", subtitle: "Realiza otros trámites relacionados con consumo." },
            { text: "Conoce tus Derechos", target: "conoceDerechos", subtitle: "Infórmate sobre tus derechos como consumidor." },
            { text: "Herramientas y Consejos", target: "herramientasConsejos", subtitle: "Utiliza nuestras herramientas y consejos útiles." },
            { text: "Horario y Oficinas", target: "horarioOficinas", subtitle: "Consulta horarios y ubicaciones de oficinas." }
        ]
    },
    reclamosConsultas: {
        title: "Reclamos y Consultas",
        message: "",
        options: [
            { text: "Todo sobre Reclamos", target: "todoReclamos", subtitle: "Todo lo que necesitas saber para ingresar reclamos." },
            { text: "Hacer una Consulta", target: "hacerConsulta", subtitle: "Consulta tus dudas sobre consumo." },
            { text: "Ver Estado de tus casos", target: "estadoCasos", subtitle: "Consulta el estado actual de tus casos." },
            { text: "Comportamiento de las empresas", target: "comportamientoEmpresas", subtitle: "Historial de comportamiento de empresas." }
        ]
    },
    todoReclamos: {
        title: "Todo sobre Reclamos",
        message: "",
        options: [
            { text: "¿Cómo ingresar un Reclamo?", target: "infoIngresarReclamo", subtitle: "Aprende a ingresar un reclamo." },
            { text: "¿Qué saber antes de reclamar?", target: "infoSaberReclamo", subtitle: "Información importante antes de reclamar." },
            { text: "¿Cómo adjuntar antecedentes?", target: "infoAdjuntar", subtitle: "Pasos para adjuntar documentos." },
            { text: "¿Cómo saber el estado de tu reclamo?", target: "infoEstadoReclamo", subtitle: "Consulta el estado del reclamo." },
            { text: "¿Cómo ver casos ya cerrados?", target: "infoCasosCerrados", subtitle: "Consulta casos cerrados." },
            { text: "¿Cuál es la ruta del Reclamo?", target: "infoRuta", subtitle: "Línea de tiempo de gestión del reclamo." },
            { text: "¿Qué hacer si no estás conforme?", target: "infoInconformidad", subtitle: "Pasos si no estás conforme." },
            { text: "¿Qué hacer si la empresa no cumple?", target: "infoIncumplimiento", subtitle: "Qué hacer si la empresa no cumple." },
            { text: "¿Quieres desistir de un Reclamo?", target: "infoDesistir", subtitle: "Pasos para desistir del reclamo." }
        ]
    },
    hacerConsulta: {
        title: "Hacer una Consulta",
        message: "",
        options: [
            { text: "¿Cómo ingresar una Consulta?", target: "infoIngresarConsulta", subtitle: "Pasos para ingresar una consulta." },
            { text: "¿Qué saber al ingresar una Consulta?", target: "infoSaberConsulta", subtitle: "Aspectos a considerar al ingresar una consulta." },
            { text: "¿Cómo revisar el estado de tu Consulta?", target: "infoEstadoConsulta", subtitle: "Consulta el estado de tu consulta." }
        ]
    },
    estadoCasos: { title: "Estado de tus casos", message: "Puedes revisar el estado de todos tus Reclamos, Consultas...", isInfoNode: true },
    comportamientoEmpresas: { title: "Comportamiento de las empresas", message: "Es un buscador del comportamiento de las empresas que te permite conocer su historial...", isInfoNode: true },
    infoIngresarReclamo: { title: "¿Cómo ingresar un Reclamo?", message: "Ingresa al Portal del Consumidor con tu ClaveÚnica o Clave SERNAC...", isInfoNode: true },
    infoSaberReclamo: { title: "¿Qué saber antes de reclamar?", message: "Debes saber: Haber comprado o contratado...", isInfoNode: true },
    infoAdjuntar: { title: "¿Cómo adjuntar antecedentes?", message: "Sigue estos pasos: Ingresa al Portal...", isInfoNode: true },
    infoEstadoReclamo: { title: "¿Cómo saber el estado de tu reclamo?", message: "Sigue estos pasos: Ingresa al Portal...", isInfoNode: true },
    infoCasosCerrados: { title: "¿Cómo ver casos ya cerrados?", message: "Sigue estos pasos: Ingresa al Portal...", isInfoNode: true },
    infoRuta: { title: "¿Cuál es la ruta del Reclamo?", message: "Es la línea de tiempo de la gestión...", isInfoNode: true },
    infoInconformidad: { title: "¿Qué hacer si no estás conforme?", message: "Puedes denunciar y demandar a la empresa...", isInfoNode: true },
    infoIncumplimiento: { title: "¿Qué hacer si la empresa no cumple?", message: "Puedes usar la opción 'Avisar Incumplimiento'...", isInfoNode: true },
    infoDesistir: { title: "¿Quieres desistir de un Reclamo?", message: "Para desistir tu Reclamo: Ingresa al Portal...", isInfoNode: true },
    infoIngresarConsulta: { title: "¿Cómo ingresar una Consulta?", message: "Ingresa al Portal del Consumidor con tu ClaveÚnica o Clave SERNAC...", isInfoNode: true },
    infoSaberConsulta: { title: "¿Qué saber al ingresar una Consulta?", message: "Si tienes dudas sobre temas de consumo...", isInfoNode: true },
    infoEstadoConsulta: { title: "¿Cómo revisar el estado de tu Consulta?", message: "Sigue estos pasos: Ingresa al Portal...", isInfoNode: true },
    otrosTramites: {
        title: "Otros Trámites",
        message: "Elige un tema:",
        options: [
            { text: "Ingresar Alerta Ciudadana", target: "alertaCiudadana", subtitle: "Informa conductas generales de empresas." },
            { text: "Me Quiero Salir", target: "infoSalir", subtitle: "Finaliza contratos de Telecomunicaciones o Seguros." },
            { text: "No Molestar", target: "infoNoMolestar", subtitle: "Solicita que dejen de enviarte spam." }
        ]
    },
    alertaCiudadana: {
        title: "Ingresar Alerta Ciudadana",
        message: "",
        options: [
            { text: "¿Qué es una Alerta Ciudadana?", target: "infoQueAlerta", subtitle: "Definición de Alerta Ciudadana." },
            { text: "¿Cómo ingresar una Alerta?", target: "infoIngresarAlerta", subtitle: "Pasos para ingresar una Alerta Ciudadana." },
            { text: "¿Qué saber al ingresar una Alerta?", target: "infoSaberAlerta", subtitle: "Información sobre la Alerta Ciudadana." },
            { text: "¿Puedes adjuntar documentos?", target: "infoAdjuntarAlerta", subtitle: "Posibilidad de adjuntar documentos." }
        ]
    },
    infoQueAlerta: { title: "¿Qué es una Alerta Ciudadana?", message: "Es una herramienta para informar al SERNAC...", isInfoNode: true },
    infoIngresarAlerta: { title: "¿Cómo ingresar una Alerta?", message: "Ingresa al Portal del Consumidor con tu ClaveÚnica o Clave SERNAC...", isInfoNode: true },
    infoSaberAlerta: { title: "¿Qué saber al ingresar una Alerta?", message: "Recuerda que la Alerta Ciudadana informa conductas generales...", isInfoNode: true },
    infoAdjuntarAlerta: { title: "¿Puedes adjuntar documentos?", message: "Sí, puedes adjuntar documentos (fotos, etc.)...", isInfoNode: true },
    infoSalir: { title: "Me Quiero Salir", message: "Finaliza tus contratos de Telecomunicaciones o Seguros Generales...", isInfoNode: true },
    infoNoMolestar: { title: "No Molestar", message: "Solicita que dejen de enviarte spam o publicidad no deseada...", isInfoNode: true },
    conoceDerechos: {
        title: "Conoce tus Derechos",
        message: "",
        options: [
            { text: "Garantía Legal y Devoluciones", target: "infoGarantia", subtitle: "Tu derecho a cambio, reparación o devolución." },
            { text: "Compras por Internet", target: "infoCompras", subtitle: "Tus derechos ante retrasos o fraudes online." },
            { text: "Servicios Financieros", target: "infoFinancieros", subtitle: "Créditos, tarjetas, portabilidad y derechos." },
            { text: "Telecomunicaciones", target: "infoTelecom", subtitle: "Derechos ante interrupciones o contratos." },
            { text: "Cobranzas", target: "infoCobranzas", subtitle: "Hostigamiento y gastos permitidos." },
            { text: "Ciberseguridad y Fraudes", target: "infoCiber", subtitle: "Prevención y qué hacer si eres víctima." },
            { text: "Derechos en Viajes", target: "infoViajes", subtitle: "Vuelos, equipaje, agencias y más." }
        ]
    },
    infoGarantia: { title: "Garantía Legal y Devoluciones", message: "Conoce tu derecho a cambio, reparación o devolución...", isInfoNode: true },
    infoCompras: { title: "Compras por Internet", message: "Conoce tus derechos ante retrasos, falta de stock o fraudes online...", isInfoNode: true },
    infoFinancieros: { title: "Servicios Financieros", message: "Infórmate sobre créditos, tarjetas, portabilidad y tus derechos financieros...", isInfoNode: true },
    infoTelecom: { title: "Telecomunicaciones", message: "Conoce tus derechos ante interrupciones o al terminar tu contrato...", isInfoNode: true },
    infoCobranzas: { title: "Cobranzas", message: "Infórmate sobre hostigamiento y gastos de cobranza permitidos...", isInfoNode: true },
    infoCiber: { title: "Ciberseguridad y Fraudes", message: "Aprende a prevenir fraudes y qué hacer si eres víctima...", isInfoNode: true },
    infoViajes: { title: "Derechos en Viajes", message: "Conoce tus derechos al viajar: vuelos, equipaje, agencias...", isInfoNode: true },
    herramientasConsejos: {
        title: "Herramientas y Consejos",
        message: "",
        options: [
            { text: "Calculadora de Presupuesto Familiar", target: "infoCalculadora", subtitle: "Organiza tus ingresos y gastos familiares." },
            { text: "Comparador de Tarjetas de Crédito", target: "infoComparador", subtitle: "Compara costos y cargos de diferentes tarjetas." },
            { text: "Calculadora de Gastos de Cobranza", target: "infoCobranza", subtitle: "Verifica gastos permitidos de cobranza." },
            { text: "Simulador de Créditos de Consumo", target: "infoSimulador", subtitle: "Compara diferentes ofertas de créditos de consumo." }
        ]
    },
    infoCalculadora: { title: "Calculadora de Presupuesto Familiar", message: "Organiza tus ingresos y gastos familiares...", isInfoNode: true },
    infoComparador: { title: "Comparador de Tarjetas de Crédito", message: "Compara costos y cargos de diferentes tarjetas...", isInfoNode: true },
    infoCobranza: { title: "Calculadora de Gastos de Cobranza", message: "Verifica cuánto te pueden cobrar por gastos de cobranza...", isInfoNode: true },
    infoSimulador: { title: "Simulador de Créditos de Consumo", message: "Compara diferentes ofertas de créditos de consumo...", isInfoNode: true },
    horarioOficinas: {
        title: "Horario y Oficinas",
        message: "",
        options: [
            { text: "Oficinas Regionales SERNAC", target: "infoOficinas", subtitle: "Direcciones y horarios de oficinas regionales." },
            { text: "Atención en Municipios (Convenios)", target: "infoMunicipios", subtitle: "Atención en tu municipalidad con convenios." }
        ]
    },
    infoOficinas: { title: "Oficinas Regionales SERNAC", message: "Encuentra las direcciones y horarios de nuestras oficinas regionales...", isInfoNode: true },
    infoMunicipios: { title: "Atención en Municipios (Convenios)", message: "Busca si hay puntos de atención en tu municipalidad (convenios)...", isInfoNode: true }
};



    let historyStack = [];
    let currentNodeId = null;

function renderNode(nodeId) {
    currentNodeId = nodeId;
    const node = chatbotFlow[nodeId];
    if (!node) return;

    chatContent.innerHTML = '';

    const title = document.createElement('h3');
    title.textContent = node.title;
    chatContent.appendChild(title);

    const message = document.createElement('p');
    message.innerHTML = node.message;
    chatContent.appendChild(message);

    if (node.options) {
        node.options.forEach(opt => {
            const btn = document.createElement('div');
            btn.classList.add('option-block');
            btn.innerHTML = `
                <div class="option-text">
                    <div class="option-title">${opt.text}</div>
                    ${opt.subtitle ? `<div class="option-subtitle">${opt.subtitle}</div>` : ''}
                </div>
                <i class="fas fa-chevron-right"></i>
            `;

            btn.querySelector('.option-text').addEventListener('click', () => {
                historyStack.push(currentNodeId);
                renderNode(opt.target);
            });
            btn.addEventListener('click', () => {
                historyStack.push(currentNodeId);
                renderNode(opt.target);
            });
            chatContent.appendChild(btn);
        });
    }

    // Mostrar u ocultar el botón Volver según el historial
    if (historyStack.length > 0) {
        footerBackButton.style.display = 'flex'; // Mostrar botón
    } else {
        footerBackButton.style.display = 'none'; // Ocultar botón
    }
}


    needHelpButton.addEventListener('click', () => {
        chatbotContainer.classList.add('visible');
        renderNode('start');
    });

    chatHeader.addEventListener('click', () => {
        chatbotContainer.classList.remove('visible');
    });

    footerBackButton.addEventListener('click', () => {
        if (historyStack.length > 0) {
            const prevNode = historyStack.pop();
            renderNode(prevNode);
        } else {
            renderNode('start');
        }
    });

    goStartButton.addEventListener('click', () => {
        historyStack = [];
        renderNode('start');
    });
});
