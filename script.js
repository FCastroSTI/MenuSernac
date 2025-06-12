document.addEventListener('DOMContentLoaded', () => {
    let feedbackTipo = ""; 
    let breadcrumbPath = [];
    const needHelpButton = document.getElementById('needHelpButton');
    const sessionId = 'session-' + Math.random().toString(36).substr(2, 9);
    const chatbotContainer = document.getElementById('chatbotContainer');
    const chatHeader = document.querySelector('.chat-header');
    const chatContent = document.getElementById('chatContent');
    const footerBackButton = document.getElementById('footerBackButton');
    const goStartButton = document.getElementById('goStartButton');

function agregarParents(chatbotFlow) {
    const flowWithParent = JSON.parse(JSON.stringify(chatbotFlow)); // clonar

    Object.keys(chatbotFlow).forEach(parentKey => {
        const node = chatbotFlow[parentKey];
        if (node.options) {
            node.options.forEach(opt => {
                if (flowWithParent[opt.target]) {
                    flowWithParent[opt.target].parent = parentKey;
                }
            });
        }
    });

    return flowWithParent;
}

const chatbotFlow = {
    start: {
        title: "¿En qué te puedo ayudar?",
        message: "",
        options: [
            { text: "Reclamos y consultas", target: "reclamosConsultas", subtitle: "Cómo ingresar reclamos, hacer consultas y revisar tus casos." },
            { text: "Otros trámites", target: "otrosTramites", subtitle: "Ingresar alertas, termina contratos o bloquea publicidad." },
            { text: "Conoce tus derechos", target: "conoceDerechos", subtitle: "Infórmate sobre tus derechos como persona consumidora." },
            { text: "Herramientas y consejos", target: "herramientasConsejos", subtitle: "Encuentra calculadoras, comparadores y simuladores útiles." },
            { text: "Horario de atencion y dirección de las oficinas", target: "horarioOficinas", subtitle: "Encuentra nuestras oficinas regionales y convenios." }
        ]
    },
    reclamosConsultas: {
        title: "Reclamos y Consultas",
        message: "",
        options: [
            { text: "Todo sobre Reclamos", target: "todoReclamos", subtitle: "Ingresa reclamos, conoce requisitos, revisa el estado y más." },
            { text: "Hacer una Consulta", target: "hacerConsulta", subtitle: "Resuelve tus dudas sobre temas de consumo." },
            { text: "Ver Estado de tus casos (Portal)", target: "estadoCasos", subtitle: "Revisa el estado de todos tus trámites." },
            { text: "Comportamiento de las empresas (Boletín)", target: "comportamientoEmpresas", subtitle: "Compara cómo responden a tus reclamos." }
        ]
    },
    todoReclamos: {
        title: "Todo sobre Reclamos",
        message: "",
        options: [
            { text: "¿Cómo ingresar un Reclamo?", target: "infoIngresarReclamo", subtitle: "Te explicamos los pasos para iniciar tu reclamo." },
            { text: "¿Qué saber antes de reclamar?", target: "infoSaberReclamo", subtitle: "Conoce los requisitos y plazos importantes para tu reclamo." },
            { text: "¿Cómo adjuntar antecedentes?", target: "infoAdjuntar", subtitle: "Sigue las intrucciones para agregar documentos a tu caso." },
            { text: "¿Cómo saber el estado de tu reclamo?", target: "infoEstadoReclamo", subtitle: "Verifica el avance de tu reclamo." },
            { text: "¿Cómo ver casos ya cerrados?", target: "infoCasosCerrados", subtitle: "Revisa el resultado de tus reclamos finalizados." },
            { text: "¿Cuál es la ruta del Reclamo?", target: "infoRuta", subtitle: "Conoce las etapas y posibles resultados de tu reclamo." },
            { text: "¿Qué hacer si no estás conforme?", target: "infoInconformidad", subtitle: "Pasos a seguir si no aceptas la respuesta a tu reclamo." },
            { text: "¿Qué hacer si la empresa no cumple la solución?", target: "infoIncumplimiento", subtitle: "Te indicamos cómo avisar si no cumplen lo acordado en tu caso." },
            { text: "¿Quieres desistir de un Reclamo?", target: "infoDesistir", subtitle: "Te explicamos cómo anular un reclamo que ya ingresaste." }
        ]
    },
    hacerConsulta: {
        title: "Hacer una Consulta",
        message: "",
        options: [
            { text: "¿Cómo ingresar una Consulta?", target: "infoIngresarConsulta", subtitle: "Te explicamos los pasos para realizar tu consulta." },
            { text: "¿Qué saber al ingresar una Consulta?", target: "infoSaberConsulta", subtitle: "Conoce la diferencia con los reclamos antes de ingresar tu consulta." },
            { text: "¿Cómo revisar el estado de tu Consulta?", target: "infoEstadoConsulta", subtitle: "Verifica la respuesta a tu consulta." }
        ]
    },
    estadoCasos: { title: "¿En qué están tus casos?", message: `
        Puedes revisar el estado de todos tus Reclamos, Consultas, Alertas Ciudadanas, 
        solicitudes de 'Me Quiero Salir' y 'No Molestar' ingresando al 
        <a href="http://www.sernac.cl/app/consumidor" target="_blank">Portal del Consumidor</a> 
        con tu ClaveÚnica o Clave SERNAC.
    `, isInfoNode: true },
    comportamientoEmpresas: {
    title: "Boletín Empresas",
    options: [
        {
            text: "¿Qué es y cómo usarlo?",
            subtitle: "Conoce qué es y cómo usar esta herramienta.",
            target: "boletinUsarlo"
        },
        {
            text: "¿Qué indicadores compara?",
            subtitle: "Revisa los indicadores de respuesta y solución que compara.",
            target: "boletinIndicadores"
        }
    ]
},
boletinUsarlo: {
    title: "¿Qué es y cómo usarlo?",
    message: `Es un buscador del comportamiento de las empresas que te permite conocer su historial frente a los reclamos que reciben. Accede al 
    <a href="https://www.sernac.cl/boletinempresas" target="_blank">Boletín Empresas</a>.<br>
    Mira <a href="https://youtu.be/BOYiqOjRdLw" target="_blank">cómo usarlo (Video)</a>.`,
    isInfoNode: true
},
boletinIndicadores: {
    title: "¿Qué indicadores compara?",
    message: `Puedes comparar por empresa:<br>
        • Cantidad de casos recibidos y su porcentaje en el mercado.<br>
        • Días promedio que tarda en responder v/s el promedio del mercado.<br>
        • Porcentaje de casos respondidos v/s el promedio del mercado.<br>
        • Porcentaje de soluciones ofrecidas del total de casos respondidos.<br><br>

    Accede al <a href="https://www.sernac.cl/boletinempresas" target="_blank">Boletín Empresas</a> para ver estos datos.`,
    isInfoNode: true
},
    infoIngresarReclamo: { title: "¿Cómo ingresar un Reclamo?", message: `Ingresa al <a href="http://www.sernac.cl/app/consumidor" target="_blank">Portal del Consumidor</a> con tu ClaveÚnica o Clave SERNAC. 
    Si es tu primera visita, <a href="https://www.sernac.cl/app/consumidor/index.php?a=registro" target="_blank">regístrate</a>. 
    Te recomendamos adjuntar antecedentes que acrediten los hechos (boleta, contrato, etc.).`, isInfoNode: true },
    infoSaberReclamo: { title: "¿Qué saber antes de reclamar?", message: `
        Debes saber:<br>
        • Haber comprado o contratado con el comercio establecido.<br>
        • Ser el/la titular afectado(a).<br>
        • No ser empresa.<br><br>
        La gestión dura máximo 18 días hábiles.<br>
        Obtén más información en 
        '<a href="https://www.sernac.cl/portal/617/w3-article-9178.html" target="_blank">Conoce más sobre el Reclamo</a>' 
        y en la 
        '<a href="https://www.sernac.cl/portal/604/w3-article-7563.html" target="_blank">Ruta de tu Reclamo</a>'.
    `, isInfoNode: true },
    infoAdjuntar: { title: "¿Cómo adjuntar antecedentes?", message: `
        Sigue estos pasos:<br>
        • Ingresa al 
        <a href="http://www.sernac.cl/app/consumidor" target="_blank">Portal del Consumidor</a> 
        con tu ClaveÚnica o Clave SERNAC.<br>
        • Selecciona 'Estado de tus casos'.<br>
        • Al hacer clic en el número del caso, podrás adjuntar documentos en la pestaña 'Agregar información'.
    `, isInfoNode: true },
    infoEstadoReclamo: { title: "¿Cómo saber el estado de tu reclamo?", message: `
        Sigue estos pasos:<br>
        • Ingresa al 
        <a href="http://www.sernac.cl/app/consumidor" target="_blank">Portal del Consumidor</a> 
        con tu ClaveÚnica o Clave SERNAC.<br>
        • Escoge 'Estado de tus casos'.<br>
        • Selecciona el número de tu Reclamo para conocer la respuesta.
    `, isInfoNode: true },
    infoCasosCerrados: { title: "¿Cómo ver casos ya cerrados?", message: `
        Sigue estos pasos:<br>
        • Ingresa al 
        <a href="http://www.sernac.cl/app/consumidor" target="_blank">Portal del Consumidor</a> 
        con tu ClaveÚnica o Clave SERNAC.<br>
        • Escoge 'Estado de tus casos'.<br>
        • Busca y selecciona el número del caso que ya está cerrado para revisar el resultado final.
    `, isInfoNode: true },
    infoRuta: { title: "¿Cuál es la ruta del Reclamo?", message: `
        Es la línea de tiempo de la gestión de tu Reclamo: pasos, etapas, resultados posibles y recomendaciones.<br>
        Revisa el especial 
        '<a href="https://www.sernac.cl/portal/604/w3-article-7563.html" target="_blank">La Ruta de tu Reclamo</a>'.
    `, isInfoNode: true },
    infoInconformidad: { title: "¿Qué hacer si no estás conforme?", message: `
        Puedes denunciar y demandar a la empresa sin necesidad de un abogado(a) en el Juzgado de Policía Local. Descarga el 
        <a href="https://www.sernac.cl/portal/618/w3-article-57407.html" target="_blank">Formulario para denuncia y demanda</a>.
    `, isInfoNode: true },
    infoIncumplimiento: { title: "¿Qué hacer si la empresa no cumple la solución?", message: `
        Puedes usar la opción 'Avisar Incumplimiento' en el 
        <a href="http://www.sernac.cl/app/consumidor" target="_blank">Portal del Consumidor</a>, 
        dentro de la sección 'Estado de tus casos'. Así, podremos monitorear el comportamiento de la empresa e insistirle para que cumpla lo que te ofreció.<br>
        Revisa también la 
        '<a href="https://www.sernac.cl/portal/604/w3-article-7563.html" target="_blank">Ruta de tu Reclamo</a>'.
    `, isInfoNode: true },
    infoDesistir: { title: "¿Quieres desistir de un Reclamo?", message: `
        Para desistir tu reclamo:<br> 
        • Ingresa al <a href="http://www.sernac.cl/app/consumidor" target="_blank">Portal del Consumidor</a>.<br>
        • Dirígete a 'Estado de tus casos'.<br>
        • Selecciona el Reclamo que deseas anular.<br>
        • En la pregunta '¿Quieres desistir del Reclamo?', haz clic en la opción 'Sí'.
    `, isInfoNode: true },
    infoIngresarConsulta: { title: "¿Cómo ingresar una Consulta?", message: `
        Ingresa al 
        <a href="http://www.sernac.cl/app/consumidor" target="_blank">Portal del Consumidor</a> 
        con tu ClaveÚnica o Clave SERNAC. Si es tu primera visita, regístrate.<br><br>
        También puedes visitar nuestras 
        <a href="https://www.sernac.cl/portal/617/w3-propertyvalue-13742.html" target="_blank">Direcciones Regionales</a>.
    `, isInfoNode: true },
    infoSaberConsulta: { title: "¿Qué saber al ingresar una Consulta?", message: `
        Si tienes dudas sobre temas de consumo y la aplicación de la Ley 
        (por ejemplo, si tu caso es una infracción o no), puedes hacernos una consulta. 
        La gestión es de máximo 2 días hábiles. <a href="https://www.sernac.cl/portal/617/w3-article-9182.html" target="_blank">Conoce más sobre la Consulta</a>.
    `, isInfoNode: true },
    infoEstadoConsulta: { title: "¿Cómo revisar el estado de tu Consulta?", message: `
        Sigue estos pasos:<br>
        • Ingresa al <a href="http://www.sernac.cl/app/consumidor" target="_blank">Portal del Consumidor</a> con tu ClaveÚnica o Clave SERNAC.<br>
        • Escoge 'Estado de tus casos'.
        • Selecciona el número de tu Consulta para ver la respuesta.
    `, isInfoNode: true },
    otrosTramites: {
        title: "Otros Trámites",
        options: [
            { text: "Ingresar Alerta Ciudadana", target: "alertaCiudadana", subtitle: "Informa sobre conductas de empresas que afectan a muchas personas consumidoras." },
            { text: "Me Quiero Salir", target: "infoSalir", subtitle: "Finaliza tus contratos de Telecoluminaciones o Seguros Generales." },
            { text: "No Molestar", target: "infoNoMolestar", subtitle: "Solicita que dejen de enviarte spam o publicidad no deseada." }
        ]
    },
    alertaCiudadana: {
        title: "Ingresar Alerta Ciudadana",
        message: "",
        options: [
            { text: "¿Qué es una Alerta Ciudadana?", target: "infoQueAlerta", subtitle: "Infórmate sobre cómo reportar conductas masivas de empresas." },
            { text: "¿Cómo ingresar una Alerta?", target: "infoIngresarAlerta", subtitle: "Te indicamos los pasos para ingresar tu reporte." },
            { text: "¿Qué saber al ingresar una Alerta?", target: "infoSaberAlerta", subtitle: "Conoce la diferencia con los reclamos y cuándo usarla." },
            { text: "¿Puedes adjuntar documentos?", target: "infoAdjuntarAlerta", subtitle: "Averigua si puedes agregar evidencia a tu alerta." }
        ]
    },
    infoQueAlerta: { title: "¿Qué es una Alerta Ciudadana?", message: "Es una herramienta para informar al SERNAC conductas de empresas que te afectan a ti y a otros consumidores. <a href='https://www.sernac.cl/portal/617/w3-article-55680.html' target='_blank'>Conoce más sobre la Alerta Ciudadana</a>", isInfoNode: true },
    infoIngresarAlerta: { title: "¿Cómo ingresar una Alerta?", message: "Ingresa al <a href='http://www.sernac.cl/app/consumidor' target='_blank'>Portal del Consumidor</a> con tu ClaveÚnica o Clave SERNAC. Si es tu primera visita, regístrate. Adjunta antecedentes (boleta, fotos, etc.) al ingresar la alerta.<br><br>También puedes ir a nuestras <a href='https://www.sernac.cl/portal/617/w3-propertyvalue-13742.html' target='_blank'>Direcciones Regionales</a>.", isInfoNode: true },
    infoSaberAlerta: { title: "¿Qué saber al ingresar una Alerta?", message: "Recuerda que la Alerta Ciudadana informa conductas generales, NO resuelve un problema tuyo particular (para eso tienes el Reclamo). <a href='https://www.sernac.cl/portal/617/w3-article-55680.html' target='_blank'>Conoce más sobre la Alerta Ciudadana</a>.", isInfoNode: true },
    infoAdjuntarAlerta: { title: "¿Puedes adjuntar documentos?", message: "Sí, puedes adjuntar documentos (fotos, etc.) ÚNICAMENTE al momento de ingresar la solicitud. <a href='https://www.sernac.cl/portal/617/w3-article-55680.html' target='_blank'>Conoce más</a>.", isInfoNode: true },
    infoSalir: {
    title: "Me Quiero Salir (MQS)",
    options: [
        {
            text: "¿Qué es Me Quiero Salir?",
            subtitle: "Descubre qué es herramienta para terminar tus contratos.",
            target: "infoQueEsMQS"
        },
        {
            text: "MQS: Telecomunicaciones",
            subtitle: "Termina tus contratos de telefonía, internet o TV.",
            target: "infoMQSTelecom"
        },
        {
            text: "MQS: Seguros Generales",
            subtitle: "Termina tus contratos de seguros generales.",
            target: "infoMQSSeguros"
        }
    ]
},
infoQueEsMQS: {
    title: "¿Qué es Me Quiero Salir?",
    message: `'Me Quiero Salir' (MQS) es una herramienta para solicitar el término de tus contratos de Telecomunicaciones y Seguros Generales. 
    <a href="https://www.sernac.cl/portal/617/w3-article-58403.html" target="_blank">Conoce más sobre MQS</a>.
    Revisa las <a href="https://www.sernac.cl/portal/617/w3-propertyvalue-66083.html" target="_blank">Preguntas Frecuentes</a>.`,
    isInfoNode: true
},
infoMQSTelecom: {
  title: "MQS Telecomunicaciones",
  message: "",
  options: [
    { text: "¿Cómo solicitarlo?", target: "mqsTelecomSolicitar", subtitle: "Te mostramos los pasos para pedir el término de tu contrato." },
    { text: "¿Qué saber al ingresar MQS?", target: "mqsTelecomSaber", subtitle: "Conoce los requisitos y plazos para tu solicitud." },
    { text: "¿Cómo revisar el estado de tu MQS?", target: "mqsTelecomEstado", subtitle: "Verifica el avance de tu solicitud MQS." },
    { text: "¿Qué pasa si la empresa no te responde?", target: "mqsTelecomSinRespuesta", subtitle: "Entérate qué pasa si la empresa no te responde a tiempo." },
    { text: "¿Qué hacer si la empresa no cumple?", target: "mqsTelecomNoCumple", subtitle: "Conoce los pasos si la empresa no termina tu contrato." },
    { text: "¿Cómo anular tu solicitud?", target: "mqsTelecomAnular", subtitle: "Descubre cómo cancelar una solicitud que ya hiciste." }
  ]
},
mqsTelecomSolicitar: {
  title: "¿Cómo solicitarlo?",
  message: "Sigue estos pasos:<br>• Ingresa al <a href='http://www.sernac.cl/app/consumidor' target='_blank'>Portal del Consumidor</a> (puedes usar ClaveÚnica o Clave SERNAC).<br>• Selecciona 'Me Quiero Salir' > 'Telecomunicaciones'.<br>• Pincha en 'Ingresar nueva solicitud'.",
  isInfoNode: true
},
mqsTelecomSaber: {
  title: "¿Qué saber al ingresar MQS?",
  message: "Debes ser el/la titular del contrato y adjuntar una copia de tu Cédula de Identidad (CI). Recibirás respuesta del SERNAC en un plazo máximo de 8 días hábiles. <br><a href='https://www.sernac.cl/portal/617/w3-article-58403.html' target='_blank'>Más info </a> | <a href='https://www.sernac.cl/portal/617/w3-propertyvalue-66083.html' target='_blank'>FAQ</a>.",
  isInfoNode: true
},
mqsTelecomEstado: {
  title: "¿Cómo revisar el estado de tu MQS?",
  message: "Sigue estos pasos:<br>• Ingresa al <a href='http://www.sernac.cl/app/consumidor' target='_blank'>Portal del Consumidor</a>.<br>• Selecciona 'Me Quiero Salir' > 'Telecomunicaciones'.<br>• Revisa tu caso en la pestaña 'En curso'.",
  isInfoNode: true
},
mqsTelecomSinRespuesta: {
  title: "¿Qué pasa si la empresa no te responde?",
  message: "En 8 días hábiles, desde SERNAC te informaremos si la empresa respondió o no. Si no lo hizo, cerraremos el caso indicando que la empresa no respondió.",
  isInfoNode: true
},
mqsTelecomNoCumple: {
  title: "¿Qué hacer si la empresa no cumple?",
  message: "Si la empresa informa que acepta tu solicitud pero no la cumple, derivaremos el caso a la Subsecretaría de Telecomunicaciones (SUBTEL) con el número de reclamo que se generó para ti.",
  isInfoNode: true
},
mqsTelecomAnular: {
  title: "¿Cómo anular tu solicitud?",
  message: "Para cancelar tu solicitud 'Me Quiero Salir' de Telecomunicaciones, debes llamar a un ejecutivo de SERNAC, ya que esta opción no está disponible aquí en el chat.",
  isInfoNode: true
},
infoMQSSeguros: {
  title: "Ok, sobre MQS para Seguros Generales, ¿qué quieres saber?",
  message: "",
  options: [
    { text: "¿Cómo solicitarlo?", target: "mqsTelecomSolicitar", subtitle: "Te mostramos los pasos para pedir el término de tu seguro." },
    { text: "¿Qué saber al ingresar MQS?", target: "mqsTelecomSaber", subtitle: "Conoce los requisitos y plazos para tu solicitud de seguro." },
    { text: "¿Cómo revisar el estado?", target: "mqsTelecomEstado", subtitle: "Verifica el avance de tu solicitud de seguro." },
    { text: "¿Qué pasa si la empresa no te responde?", target: "mqsTelecomSinRespuesta", subtitle: "Entérate qué pasa si la empresa no te responde a tiempo." },
    { text: "¿Qué hacer si la empresa no cumple?", target: "mqsTelecomNoCumple", subtitle: "Conoce los pasos si la empresa no termina tu contrato de seguro." },
    { text: "¿Cómo desistir de tu solicitud?", target: "mqsTelecomAnular", subtitle: "Descubre cómo cancelar una solicitud de seguro que ya hiciste." }
  ]
},
mqsSeguroSolicitar: {
  title: "¿Cómo solicitarlo?",
  message: `Sigue estos pasos:<br>
    • Ingresa al <a href="http://www.sernac.cl/app/consumidor" target="_blank">Portal del Consumidor</a> (puedes usar ClaveÚnica o Clave SERNAC).<br>
    • Selecciona 'Me Quiero Salir' > 'Seguros'.<br>
    • Pincha en 'Ingresar nueva solicitud'.`,
  isInfoNode: true
},
mqsSeguroSaber: {
  title: "¿Qué saber antes de ingresar MQS?",
  message: `Debes ser el/la titular o asegurado(a) y adjuntar una copia de tu CI. Recibirás respuesta del SERNAC en un plazo máximo de 8 días hábiles.<br><br>
    <a href="https://www.sernac.cl/portal/617/w3-article-58403.html" target="_blank">Más info </a> | 
    <a href="https://www.sernac.cl/portal/617/w3-propertyvalue-66083.html" target="_blank">FAQ</a>.`,
  isInfoNode: true
},
mqsSeguroEstado: {
  title: "¿Cómo revisar el estado?",
  message: `Sigue estos pasos:<br>
    • Ingresa al <a href="http://www.sernac.cl/app/consumidor" target="_blank">Portal del Consumidor</a>.<br>
    • Selecciona 'Me Quiero Salir' > 'Seguros'.<br>
    • Revisa tu caso en la pestaña 'En curso'.`,
  isInfoNode: true
},
mqsSeguroSinRespuesta: {
  title: "¿Qué pasa si la empresa no te responde?",
  message: "En 8 días hábiles, desde SERNAC te informaremos si la empresa respondió o no. Si no lo hizo, le enviaremos un oficio recordándole su obligación de responder (tendrá 5 días hábiles para hacerlo).",
  isInfoNode: true
},
mqsSeguroNoCumple: {
  title: "¿Qué hacer si la empresa no cumple?",
  message: "Te notificaremos del incumplimiento y, en este caso, tendrás que ingresar un Reclamo formal contra la empresa.",
  isInfoNode: true
},
mqsSeguroAnular: {
  title: "¿Cómo desistir de tu solicitud?",
  message: "Para anular tu solicitud 'Me Quiero Salir' de Seguros, debes llamar a un ejecutivo de SERNAC, ya que esta opción no está disponible aquí en el chat.",
  isInfoNode: true
},
    infoNoMolestar: {
    title: "No Molestar",
    options: [
        { text: "¿Qué es No Molestar?", subtitle: "Conoce esta herramienta para evitar el spam.", target: "infoQueEsNoMolestar" },
        { text: "¿Cómo ingresar una solicitud?", subtitle: "Te explicamos los pasos para pedir el bloqueo.", target: "infoComoIngresarNoMolestar" },
        { text: "¿Qué saber al ingresar No Molestar?", subtitle: "Conoce las excepciones y plazos importantes.", target: "infoSaberAntesNoMolestar" },
        { text: "¿Cómo revisar el estado?", subtitle: "Verifica las empresas que bloqueaste.", target: "infoEstadoNoMolestar" },
        { text: "¿Qué hacer si no cumplen?", subtitle: "Avisa si te siguen contactando después del bloqueo.", target: "infoIncumplimientoNoMolestar" },
        { text: "¿Cómo eliminar una solicitud?", subtitle: "Te enseñamos a deshacer un bloqueo si cambias de opinión.", target: "infoEliminarNoMolestar" }
    ]
},

infoQueEsNoMolestar: {
    title: "¿Qué es No Molestar?",
    message: `Es una herramienta virtual para solicitar que las empresas no te envíen 'spam' o te hagan llamados por promociones o publicidad que no deseas. 
    <a href="https://www.sernac.cl/portal/617/w3-article-9184.html" target="_blank">Conoce más </a> | 
    <a href="https://www.sernac.cl/portal/617/w3-propertyvalue-63007.html" target="_blank">FAQ</a>.`,
    isInfoNode: true
},

infoComoIngresarNoMolestar: {
    title: "¿Cómo ingresar una solicitud?",
    message: `Sigue estos pasos:<br>
    • Ingresa al <a href="http://www.sernac.cl/app/consumidor" target="_blank">Portal del Consumidor</a>.<br>
    • Selecciona 'No Molestar'.<br>
    • Pincha en 'Ingresar nuevo teléfono y/o correo electrónico' que deseas bloquear.`,
    isInfoNode: true
},

infoSaberAntesNoMolestar: {
    title: "¿Qué saber al ingresar No Molestar?",
    message: `Considera que:<br>
    • No puedes bloquear empresas de cobranza con esta herramienta (para eso tienes el reclamo por hostigamiento).<br>
    • Debes ser la persona destinataria del spam que quieres bloquear.<br>
    • El plazo legal para que la empresa deje de contactarte es de 7 días hábiles máximo desde tu solicitud.<br>
    <a href="https://www.sernac.cl/portal/617/w3-article-9184.html" target="_blank">Conoce más</a> | 
    <a href="https://www.sernac.cl/portal/617/w3-propertyvalue-63007.html" target="_blank">FAQ</a>.`,
    isInfoNode: true
},

infoEstadoNoMolestar: {
    title: "¿Cómo revisar el estado?",
    message: `Sigue estos pasos:<br>
    • Ingresa al <a href="http://www.sernac.cl/app/consumidor" target="_blank">Portal del Consumidor</a>.<br>
    • Selecciona 'No Molestar'.<br>
    • Elige el número telefónico o el correo electrónico que registraste.<br>
    • Luego verás el listado de todas las empresas a las que has pedido bloquear y el estado de cada solicitud (si fue acogida o no).`,
    isInfoNode: true
},

infoIncumplimientoNoMolestar: {
    title: "¿Qué hacer si no cumplen?",
    message: `Si una empresa sigue contactándote después del plazo, puedes usar la opción 'Avisar Incumplimiento':<br>
    • Ingresa al <a href="http://www.sernac.cl/app/consumidor" target="_blank">Portal del Consumidor</a>.<br>
    • Selecciona 'No Molestar'.<br>
    • Pincha sobre el número de teléfono o correo que sigue recibiendo la publicidad.<br>
    • Luego indica la empresa que te sigue contactando.<br>
    SERNAC gestionará este aviso y te informará el resultado a tu correo en un plazo de 12 días hábiles. 
    <a href="https://www.sernac.cl/portal/617/w3-article-58437.html" target="_blank">Más info aquí</a>.`,
    isInfoNode: true
},

infoEliminarNoMolestar: {
    title: "¿Cómo eliminar una solicitud?",
    message: `Si cambias de opinión y quieres volver a recibir información de una empresa que bloqueaste, sigue estos pasos:<br>
    • Ingresa al <a href="http://www.sernac.cl/app/consumidor" target="_blank">Portal del Consumidor</a>.<br>
    • Selecciona 'No Molestar'.<br>
    • En el estado de tu solicitud, selecciona la(s) empresa(s) a las que has pedido el cese.<br>
    • En la parte superior derecha encontrarás un botón rojo que dice 'Eliminar solicitud'.`,
    isInfoNode: true
}
,
    conoceDerechos: {
        title: "Conoce tus Derechos",
        message: "",
        options: [
            { text: "Garantía Legal y Devoluciones", target: "infoGarantia", subtitle: "Conoce tu derecho a garantía (6x3), retracto y más." },
            { text: "Compras por Internet", target: "infoCompras", subtitle: "Conoce tus derechos ante retrasos, falta de stock o fraudes online." },
            { text: "Servicios Financieros", target: "infoFinancieros", subtitle: "Infórmate sobre créditos, tarjetas, portabilidad y tus derechos financieros." },
            { text: "Telecomunicaciones", target: "infoTelecom", subtitle: "Conoce tus derechos ante interrupciones o al terminar tu contrato." },
            { text: "Cobranzas", target: "infoCobranzas", subtitle: "Infórmate sobre hostigamiento y gastos de cobranza permitidos." },
            { text: "Ciberseguridad y Fraudes", target: "infoCiber", subtitle: "Aprende a prevenir fraudes y qué hacer si eres víctima." },
            { text: "Derechos en Viajes", target: "infoViajes", subtitle: "Conoce tus derechos al viajar: vuelos, equipaje, agencias." }
        ]
    },
    infoGarantia: {
    title: "Derechos en Garantía Legal y Devoluciones",
    options: [
        { text: "¿Qué es la Garantía Legal (6x3)?", subtitle: "Conoce tu derecho a cambio, reparación o devolución.", target: "garantiaQueEs" },
        { text: "¿Qué hacer si un producto nuevo falla?", subtitle: "Conoce las 3 opciones que tienes para exigir.", target: "garantiaProductoFalla" },
        { text: "¿Cuál es el plazo para ejercer la Garantía Legal?", subtitle: "¿Cuánto tiempo tienes para usar tu garantía?", target: "garantiaPlazo" },
        { text: "¿Puedes cambiar un producto si no te gustó?", subtitle: "Diferencia entre garantía legal y ticket de cambio voluntario.", target: "garantiaNoMeGusto" },
        { text: "¿La Garantía aplica en productos usados?", subtitle: "Condiciones de garantía para productos de segunda mano.", target: "garantiaProductoUsado" },
        { text: "¿La Garantía aplica en liquidaciones?", subtitle: "¿Tienes los mismos derechos si compraste en liquidación?", target: "garantiaLiquidacion" },
        { text: "¿Y si una empresa te obliga a hacer una revisión técnica?", subtitle: "¿Pueden condicionar tu garantía a una revisión técnica?", target: "garantiaRevisionTecnica" },
        { text: "¿Qué productos no tienen garantía ni cambio?", subtitle: "Conoce las excepciones a la garantía legal.", target: "garantiaExcepciones" },
        { text: "¿Puedes arrepentirte de una compra?", subtitle: "Tu derecho a retracto en compras a distancia.", target: "garantiaRetractoDistancia" },
        { text: "¿Puedes arrepentirte en compras presenciales?", subtitle: "Cuándo aplica el retracto si compraste presencialmente.", target: "retractoPresencial" },
        { text: "¿Cómo ejercer tu derecho a Retracto?", subtitle: "Cómo y cuándo ejercer tu derecho a retracto.", target: "garantiaEjercerRetracto" },
        { text: "¿Garantía Legal vs Ticket de Cambio?", subtitle: "Entiende las diferencias clave entre ambos.", target: "garantiaVsTicket" },
        { text: "¿Te pueden exigir el embalaje original?", subtitle: "¿Es requisito tener el embalaje para ejercer tu garantía?", target: "garantiaEmbalaje" }
    ]
    },
    garantiaQueEs: {
        title: "¿Qué es la Garantía Legal (6x3)?",
        message: `Es tu derecho a exigir la devolución del dinero, el cambio o la reparación gratis de un producto nuevo que te falla, dentro de los 6 meses desde que lo compraste o recibiste.<br>
        Conoce más en <a href="https://www.sernac.cl/portal/604/w3-propertyvalue-8062.html" target="_blank">Garantía Legal 6x3</a>.`,
        isInfoNode: true
        },
    garantiaProductoFalla: {
        title: "¿Qué hacer si un producto nuevo falla?",
        message: `Puedes exigir la devolución, cambio o reparación del producto gratis (tú eliges) dentro de los 6 meses desde la compra o recepción. 
        Si la empresa no respeta este derecho, ingresa un Reclamo en el <a href="http://www.sernac.cl/app/consumidor" target="_blank">Portal del Consumidor</a>. 
        Mira el especial <a href="https://www.sernac.cl/portal/604/w3-propertyvalue-8062.html" target="_blank">Garantía Legal 6x3</a>.`,
        isInfoNode: true
    },
    garantiaPlazo: {
        title: "¿Cuál es el plazo para ejercer la Garantía Legal?",
        message: `Tienes 6 meses desde la compra/recepción para elegir entre devolución, cambio o reparación gratis del producto.<br>
        Conoce más en <a href="https://www.sernac.cl/portal/604/w3-propertyvalue-8062.html" target="_blank">Garantía Legal 6x3</a>.`,
        isInfoNode: true
    },
    garantiaNoMeGusto: {
        title: "¿Puedes cambiar un producto si no te gustó?",
        message: `No, la Garantía Legal 6x3 sólo aplica si el producto falla. Si quieres cambiar por gusto o talla, puedes hacerlo solo si la empresa ofrece voluntariamente un 'ticket de cambio'.<br>
        Conoce más en <a href="https://www.sernac.cl/portal/604/w3-propertyvalue-8062.html" target="_blank">Garantía Legal 6x3</a>.`,
        isInfoNode: true
    },
    garantiaProductoUsado: {
        title: "¿La Garantía aplica en productos usados?",
        message: `Los productos usados o de segunda mano NO tienen Garantía Legal 6x3, SIEMPRE que te lo adviertan ANTES de la compra.<br>
        Conoce más en <a href="https://www.sernac.cl/portal/604/w3-propertyvalue-8062.html" target="_blank">Garantía Legal 6x3</a>.`,
        isInfoNode: true
    },
    garantiaLiquidacion: {
    title: "¿La Garantía aplica en liquidaciones?",
    message: `Sí, no por comprar más barato tienes menos derechos.<br>
    Conoce más sobre la <a href="https://www.sernac.cl/portal/604/w3-propertyvalue-8062.html" target="_blank">Garantía Legal 6x3</a>.`,
    isInfoNode: true
    },

    garantiaRevisionTecnica: {
    title: "¿Y si una empresa te obliga a hacer una revisión técnica?",
    message: `Las empresas no pueden poner barreras como condicionar la garantía a la revisión/definición de un servicio técnico.<br>
    Si ocurre, haz un Reclamo en el <a href="http://www.sernac.cl/app/consumidor" target="_blank">Portal del Consumidor</a>.<br>
    Conoce más en <a href="https://www.sernac.cl/portal/604/w3-propertyvalue-8062.html" target="_blank">Garantía Legal 6x3</a>.`,
    isInfoNode: true
    },

    garantiaExcepciones: {
    title: "¿Qué productos no tienen garantía ni cambio?",
    message: `No tienen garantía legal los productos que compraste en el comercio informal (sin boleta o factura).<br>
    Tampoco los de segunda selección, usados o refaccionados, siempre y cuando te lo hayan advertido claramente antes de la compra.<br>
    Conoce más en <a href="https://www.sernac.cl/portal/604/w3-propertyvalue-8062.html" target="_blank">Garantía Legal 6x3</a>.`,
    isInfoNode: true
    },

    garantiaRetractoDistancia: {
    title: "¿Puedes arrepentirte de una compra?",
    message: `Si compras por internet (o a distancia) tienes 10 días desde la compra o recepción para devolver el producto sin uso y con su embalaje en buen estado.<br>
    Conoce más sobre <a href="https://www.sernac.cl/portal/617/w3-propertyvalue-64530.html" target="_blank">Derecho a Retracto</a>.`,
    isInfoNode: true
    },

    retractoPresencial: {
    title: "¿Puedes arrepentirte en compras presenciales?",
    message: `Si compraste presencialmente pero no tuviste acceso directo al producto (por ejemplo, por catálogo), el derecho a retracto también aplica, salvo que la empresa informe su exclusión.<br>
    Conoce más sobre <a href="https://www.sernac.cl/portal/617/w3-propertyvalue-64530.html" target="_blank">Derecho a Retracto</a>.`,
    isInfoNode: true
    },

    garantiaEjercerRetracto: {
    title: "¿Cómo ejercer tu derecho a Retracto?",
    message: `Informa a la empresa que anulas la compra dentro de 10 días (desde compra o recepción).<br>
    El plazo se amplía a 90 días si no enviaron confirmación escrita del contrato.<br>
    Conoce más sobre <a href="https://www.sernac.cl/portal/617/w3-propertyvalue-64530.html" target="_blank">Derecho a Retracto</a>.`,
    isInfoNode: true
    },

    garantiaVsTicket: {
    title: "¿Garantía Legal vs Ticket de Cambio?",
    message: `La Garantía Legal es un derecho por ley cuando un producto nuevo falla.<br>
    En cambio el Ticket de Cambio es una oferta voluntaria de la empresa para que puedas cambiar por gusto o talla dentro de un plazo definido.<br>
    Conoce más en <a href="https://www.sernac.cl/portal/604/w3-propertyvalue-8062.html" target="_blank">Garantía Legal 6x3</a>.`,
    isInfoNode: true
    },

    garantiaEmbalaje: {
    title: "¿Te pueden exigir el embalaje original?",
    message: `No, para ejercer la <a href="https://www.sernac.cl/portal/604/w3-propertyvalue-8062.html" target="_blank">Garantía Legal</a>, las empresas no pueden exigir embalaje original si el producto nuevo falla, ni tampoco cobrar si no lo tienes.`,
    isInfoNode: true
    },




    infoCompras: { title: "Compras por Internet", message: "Conoce tus derechos ante retrasos, falta de stock o fraudes online...", isInfoNode: true },

  infoCompras: {
    title: "Derechos en Compras por Internet",
    options: [
      {
        text: "¿Qué hacer si el producto no llega a tiempo?",
        subtitle: "Qué hacer si no cumplen con la fecha de entrega.",
        target: "noLlegaTiempo"
      },
      {
        text: "¿Qué hacer si te venden un producto sin stock?",
        subtitle: "Conoce la obligación de informar si no hay stock.",
        target: "productoSinStock"
      },
      {
        text: "¿Qué hacer si recibes algo distinto?",
        subtitle: "Deben respetar lo que te ofrecieron.",
        target: "AlgoDistinto"
      },
      {
        text: "¿Puedes arrepentirte? (Retracto)",
        subtitle: "Tu derecho a retracto en compras online.",
        target: "RetractoCompras"
      },
      {
        text: "¿Qué hacer si la empresa no te contesta?",
        subtitle: "La empresa debe tener canales de contacto claros para ti.",
        target: "ComprasEmpresaNoContesta"
      },
      {
        text: "¿Cómo puedes prevenir fraudes en línea?",
        subtitle: "Aprende a prevenir fraudes en tus compras online.",
        target: "ComprasInternetFraudes"
      }
    ]
  },
  noLlegaTiempo: {
    title: "¿Qué hacer si tu producto no llega a tiempo?",
    message: `La empresa debe indicar una fecha clara de retiro o un rango preciso para el despacho (indicando si son días hábiles o corridos). Si no cumple con ese plazo, haz un Reclamo en el <a href="http://www.sernac.cl/app/consumidor" target="_blank">Portal</a>.
Revisa tus <a href="https://www.sernac.cl/portal/604/w3-propertyvalue-20982.html" target="_blank">Derechos en Comercio Electrónico</a>.`,
    isInfoNode: true
  },
  productoSinStock: {
    title: "¿Qué hacer si te venden un producto sin stock?",
    message: `Las empresas están obligadas a informarte sobre la falta de stock ANTES de que realices la compra. Si compraste algo y luego te dicen que no hay stock, están incumpliendo. En ese caso, haz un Reclamo en el <a href="http://www.sernac.cl/app/consumidor" target="_blank">Portal</a>.
Revisa tus <a href="https://www.sernac.cl/portal/604/w3-propertyvalue-20982.html" target="_blank">Derechos en Comercio Electrónico</a>.`,
    isInfoNode: true
  },
  AlgoDistinto: {
    title: "¿Qué hacer si recibes algo distinto?",
    message: `Las empresas deben respetar todo lo que te ofrecieron en su publicidad y las características informadas del producto o servicio (precio, formas de pago, costo de envío, etc.). Si recibes algo distinto a lo prometido, haz un Reclamo en el <a href="http://www.sernac.cl/app/consumidor" target="_blank">Portal</a>.
Revisa tus <a href="https://www.sernac.cl/portal/604/w3-propertyvalue-20982.html" target="_blank">Derechos en Comercio Electrónico</a>.`,
    isInfoNode: true
  },
  RetractoCompras: {
    title: "¿Puedes arrepentirte de una compra?",
    message: `Si compras por internet (o a distancia) tienes 10 días desde la compra/recepción para devolver el producto sin uso y embalaje en buen estado. Conoce más sobre <a href="https://www.sernac.cl/portal/617/w3-propertyvalue-64530.html" target="_blank">Derecho a Retracto</a>.`,
    isInfoNode: true
  },
  ComprasEmpresaNoContesta: {
    title: "¿Qué hacer si la empresa no te contesta?",
    message: `La empresa debe informar formas de contacto claras (teléfono, correo, etc.) y responder tus consultas o reclamos dentro de un plazo razonable. Si tienes problemas para contactarlos o no te responden, haz un Reclamo en el <a href="http://www.sernac.cl/app/consumidor" target="_blank">Portal</a>.
Revisa tus <a href="https://www.sernac.cl/portal/604/w3-propertyvalue-20982.html" target="_blank">Derechos en Comercio Electrónico</a>.`,
    isInfoNode: true
  },
  ComprasInternetFraudes: {
    title: "¿Cómo puedes prevenir fraudes en línea?",
    message: `¡Cuidado con las estafas! Pueden existir empresas falsas que te engañan con ofertas muy convenientes, no entregan los productos o simplemente desaparecen después de recibir tu pago. Si te pasa algo así, haz una denuncia ante el 
<a href="http://www.ministeriopublico.cl/" target="_blank">Ministerio Público</a>, ya que podría ser un delito.
Infórmate más sobre cómo comprar seguro en <a href="https://www.sernac.cl/portal/604/w3-propertyvalue-66244.html" target="_blank">Ciberseguridad en Consumo</a>.`,
    isInfoNode: true
  },

    infoFinancieros: {
  title: "Derechos en Servicios Financieros",
  options: [
    { text: "¿Cuáles son tus derechos financieros?", subtitle: "En bancos, casas comerciales, entre otras.", target: "InfoComprasDerFin" },
    { text: "¿No te dejan cerrar un producto?", subtitle: "Tu derecho a terminar productos financieros.", target: "cerrarProducto" },
    { text: "Derechos al contratar un crédito", subtitle: "Información que debes tomar en cuenta.", target: "derechosCredito" },
    { text: "Vigencia de una cotización", subtitle: "¿Cuánto dura una cotización que te entregan?", target: "vigenciaCotizacion" },
    { text: "¿Cuáles son las ventas atadas?", subtitle: "Pon atención a las condiciones ofrecidas.", target: "ventasAtadas" },
    { text: "¿Te pueden cambiar un contrato?", subtitle: "Modificaciones unilaterales.", target: "cambioContrato" },
    { text: "¿Te pueden enviar productos no solicitados?", subtitle: "Conoce esta práctica prohibida.", target: "productosNoSolicitados" },
    { text: "¿Te pueden limitar los medios de pago?", subtitle: "Tu libertad para elegir dónde pagar (PAC/PAT).", target: "limiteMediosPago" },
    { text: "¿Qué hacer ante un cobro irregular?", subtitle: "Qué hacer ante cargos que no reconoces.", target: "cobroIrregular" },
    { text: "¿Qué es la Portabilidad Financiera?", subtitle: "Cámbiate de banco o institución financiera más fácil.", target: "portabilidadFinanciera" },
    { text: "¿Te cobran por cambiar la tarjeta?", subtitle: "Costos por reposición del plástico de tu tarjeta.", target: "cambioTarjeta" },
    { text: "¿Cómo prevenir fraudes financieros?", subtitle: "Aprende a prevenir fraudes financieros.", target: "fraudesFinancieros" }
  ]
},

InfoComprasDerFin: {
  title: "¿Cuáles son tus derechos financieros?",
  message: `• Cerrar productos en 5 días.<br>• Recibir Hoja Resumen.<br>• Conocer todos los costos.<br><br>Infórmate más en <a href="https://www.sernac.cl/portal/604/w3-propertyvalue-66843.html" target="_blank">Consumidor Financiero</a>.`,
  isInfoNode: true
},

cerrarProducto: {
  title: "¿No te dejan cerrar un producto?",
  message: `Tienes derecho a cerrar cualquier producto financiero en 5 días (si pagaste lo adeudado). Si no cumplen, haz un Reclamo en el <a href="http://www.sernac.cl/app/consumidor" target="_blank">Portal del Consumidor</a>. Conoce más info en <a href="https://www.sernac.cl/portal/604/w3-propertyvalue-66843.html" target="_blank">Consumidor Financiero</a>.`,
  isInfoNode: true
},

derechosCredito: {
  title: "Derechos al contratar un crédito",
  message: `• Empresas deben informar sobre contratos de adhesión, CTC y CAE.<br>
  • No te pueden obligar a contratar productos ni a cambios de condiciones.<br>
  • No te pueden limitar el uso de pagos electrónicos de otros bancos.<br>
  Conoce más en <a href="https://www.sernac.cl/portal/604/w3-propertyvalue-66843.html" target="_blank">Consumidor Financiero</a>.`,
  isInfoNode: true
},

vigenciaCotizacion: {
  title: "Vigencia de una cotización",
  message: `La cotización de una institución financiera debe durar al menos 7 días hábiles, para que tengas tiempo
  de compararla con otras opciones. <a href="https://www.sernac.cl/portal/604/w3-propertyvalue-66843.html" target="_blank">Más info</a>.`,
  isInfoNode: true
},

ventasAtadas: {
  title: "¿Cuáles son las ventas atadas?",
  message: `Las instituciones financieras no pueden 'amarrarte' con productos/servicios no solicitados (ej. obligarte a contratar seguros automotriz al pedir tarjeta).
  Tienes la libertad de aceptarlos o no.<br>Conoce más en <a href="https://www.sernac.cl/portal/604/w3-propertyvalue-66843.html" target="_blank">Consumidor Financiero</a>.`,
  isInfoNode: true
},

cambioContrato: {
  title: "¿Te pueden cambiar un contrato?",
  message: `No pueden cambiar las condiciones o los costos sin tu expreso consentimiento (por ejemplo, no te pueden subir las comisiones de tu tarjeta unilateralmente). Si te pasa esto, haz un Reclamo en el <a href="http://www.sernac.cl/app/consumidor" target="_blank">Portal del Consumidor</a>.<br>Conoce más en <a href="https://www.sernac.cl/portal/604/w3-propertyvalue-66843.html" target="_blank">Consumidor Financiero</a>.`,
  isInfoNode: true
},

productosNoSolicitados: {
  title: "¿Te pueden enviar productos no solicitados?",
  message: `Está prohibido que te envíen a tu domicilio o lugar de trabajo productos financieros o contratos que no has solicitado ni aceptado previamente. Si te pasa, haz un Reclamo en el <a href="http://www.sernac.cl/app/consumidor" target="_blank">Portal</a>. <a href="https://www.sernac.cl/portal/604/w3-propertyvalue-66843.html" target="_blank">Más info</a>.`,
  isInfoNode: true
},

limiteMediosPago: {
  title: "¿Te pueden limitar los medios de pago?",
  message: `Puedes elegir libremente la entidad con la que quieres tener tu convevio de pago automático de cuentas (PAC)
  o de tarjeta de crédito (PAT). La empresa no puede obligarte a usar sólo el banco asociado al producto. 
  Si no te lo permiten, has un Reclamo en el <a href="http://www.sernac.cl/app/consumidor" target="_blank">Portal del Consumidor</a>.
  <br>Más información en <a href="https://www.sernac.cl/portal/604/w3-propertyvalue-66843.html" target="_blank">Consumidor Financiero</a>.`,
  isInfoNode: true
},

cobroIrregular: {
  title: "¿Qué hacer ante un cobro irregular?",
  message: `Ante cobros o cargos irregulares en tus cuentas, contacta inmediatamente a la empresa para desconocer la operación y prevenir fraudes. Las entidades financieras te deben restituir el dinero o anular cargos no autorizados. Si la empresa no responde, reclama en el <a href="http://www.sernac.cl/app/consumidor" target="_blank">Portal del Consumidor</a>.<br>Revisa más en <a href="https://www.sernac.cl/portal/604/w3-propertyvalue-66244.html" target="_blank">Ciberseguridad en Consumo</a>.`,
  isInfoNode: true
},

portabilidadFinanciera: {
  title: "¿Qué es la Portabilidad Financiera?",
  message: `La portabilidad financiera te permite cambiarte fácilmente de una institución financiera a otra, buscando mejores condiciones para tus productos como:<br>
  • Cuentas corrientes<br>
  • Tarjetas de crédito<br>
  • Créditos hipotecarios<br>
  • Créditos de consumo o automotrices<br>
  Es un proceso estandarizado y más simple.<br>
  <a href="https://www.sernac.cl/portal/604/w3-propertyvalue-66843.html" target="_blank">Más info</a>.`,
  isInfoNode: true
},

cambioTarjeta: {
  title: "¿Te cobran por cambiar la tarjeta?",
  message: `No, las entidades financieras no pueden cobrarte por el cambio o la reposición del plástico (material) de tu tarjeta de crédito o débito. Tampoco pueden exigirte firmar un nuevo contrato con condiciones diferentes solo por este cambio. <a href="https://www.sernac.cl/portal/604/w3-propertyvalue-66843.html" target="_blank">Más info</a>.`,
  isInfoNode: true
},

fraudesFinancieros: {
  title: "¿Cómo prevenir fraudes financieros?",
  message: `Mantente alerta ante ofertas de créditos demasiado buenas para ser verdad, empresas desconocidas o que te pidan dinero por adelantado para gestionar un préstamo.<br>
  Podrían ser fraudes. Si eres víctima, denuncia ante el <a href="http://www.ministeriopublico.cl/" target="_blank">Ministerio Público</a>.<br>
  Revisa nuestros consejos en <a href="https://www.sernac.cl/portal/604/w3-propertyvalue-66244.html" target="_blank">Ciberseguridad en Consumo</a>.`,
  isInfoNode: true
}
,
    infoTelecom: {
  title: "Derechos en Telecomunicaciones",
  options: [
    { text: "Derechos en Telecomunicaciones", subtitle: "Conoce los principales.", target: "telecoDerechos" },
    { text: "¿Qué hacer si tu servicio se interrumpe?", subtitle: "Descuentos y compensaciones a los que tienes derecho.", target: "telecoInterrupcion" },
    { text: "¿Te obligan a contratar servicios extra?", subtitle: "Evita las ventas atadas que no solicitaste.", target: "telecoServiciosExtra" },
    { text: "¿Cuándo puedes terminar tu contrato?", subtitle: "Plazos y cómo solicitar el término.", target: "telecoTerminar" },
    { text: "¿Te exigen requisitos para terminar?", subtitle: "¿Pueden negarse a terminar tu contrato?", target: "telecoRequisitos" },
    { text: "¿Qué requisitos debes cumplir para terminar?", subtitle: "Solo necesitas ser el/la titular.", target: "telecoTitular" },
    { text: "¿En cuánto tiempo deben terminar tu contrato?", subtitle: "Plazo legal para que hagan efectivo el cierre.", target: "telecoPlazo" },
    { text: "¿Puedes mantener tu número?", subtitle: "Infórmate sobre la portabilidad numérica al cambiarte.", target: "telecoNumero" },
    { text: "¿Puedes terminar tu contrato si tienes deudas?", subtitle: "Cómo se cobran los saldos pendientes al terminar.", target: "telecoDeudas" },
    { text: "¿Puedes terminar si pagaste por adelantado?", subtitle: "Devolución de saldos a tu favor.", target: "telecoAdelantado" }
  ]
},

telecoDerechos: {
  title: "Principales Derechos en Telecomunicaciones",
  message: `Tienes derecho a terminar tu contrato de telecomunicaciones (internet, teléfono, TV) en cualquier momento y sin causa. No pueden negarse ni imponerte requisitos o multas por ello. Cualquier condición que te pongan para dificultarlo es una infracción.<br>Conoce más en <a href='https://www.sernac.cl/portal/604/w3-propertyvalue-14521.html' target='_blank'>Derechos en Telecomunicaciones</a>.`,
  isInfoNode: true
},

telecoInterrupcion: {
  title: "¿Qué hacer si tu servicio se interrumpe?",
  message: `Tienes derecho a descuentos en tu boleta e incluso indemnizaciones si te suspenden, alteran o interrumpen el servicio contratado (teléfono, internet, TV pagada) por causas imputables a la empresa. Si vulneran tus derechos, ingresa un Reclamo en el <a href='http://www.sernac.cl/app/consumidor' target='_blank'>Portal</a>. <a href='https://www.sernac.cl/portal/604/w3-propertyvalue-14521.html' target='_blank'>Más info</a>.`,
  isInfoNode: true
},

telecoServiciosExtra: {
  title: "¿Te obligan a contratar servicios extra?",
  message: `Ninguna empresa de telecomunicaciones puede obligarte a contratar servicios adicionales que no deseas o necesitas junto con el plan principal. <br>
  Conoce más en <a href='https://www.sernac.cl/portal/604/w3-propertyvalue-14521.html' target='_blank'>Derechos en Telecomunicaciones</a>.`,
  isInfoNode: true
},

telecoTerminar: {
  title: "¿Cuándo puedes terminar tu contrato?",
  message: `En cualquier momento sin necesidad de expresar una causa. La empresa debe cerrar el contrato en 1 día hábil máximo desde tu solicitud.
  Conoce más en <a href='https://www.sernac.cl/portal/604/w3-propertyvalue-14521.html' target='_blank'>Derechos en Telecomunicaciones</a>.<br>
  Te recomendamos también usar la herramienta <a href='http://www.sernac.cl/app/consumidor' target='_blank'>Me Quiero Salir</a> en el Portal del Consumidor.`,
  isInfoNode: true
},

telecoRequisitos: {
  title: "¿Te exigen requisitos para terminar?",
  message: `Las empresas no pueden negarse a terminar tu contrato ni ponerte trabas como, por ejemplo, exigir que no tengas deudas o que devuelvas primero los equipos, etc. Cualquier requisito o condición para tardar el cierre de contrato, es una infracción. Usa <a href='https://www.sernac.cl/app/consumidor/' target='_blank'>Me Quiero Salir</a> en el Portal. <a href='https://www.sernac.cl/portal/617/w3-article-58403.html' target='_blank'>Más sobre MQS</a>`,
  isInfoNode: true
},

telecoTitular: {
  title: "¿Qué requisitos debes cumplir para terminar?",
  message: `El único requisito es que seas la persona titular del contrato que quieres terminar. No debes explicar los motivos de tu decisión. Usa <a href='http://www.sernac.cl/app/consumidor' target='_blank'>Me Quiero Salir</a> en el Portal. <a href='http://www.sernac.cl/portal/617/w3-article-58403.html' target='_blank'>Más sobre MQS</a>.`,
  isInfoNode: true
},

telecoPlazo: {
  title: "¿En cuánto tiempo deben terminar tu contrato?",
  message: `Las empresas deben terminar tu contrato y dejar de facturarte en un plazo máximo de 1 día hábil desde que realizaste el requerimiento. Usa <a href='https://www.sernac.cl/app/consumidor/' target='_blank'>Me Quiero Salir</a>
  en el Portal. <a href='https://www.sernac.cl/portal/617/w3-article-58403.html' target='_blank'>Más sobre MQS</a>.`,
  isInfoNode: true
},

telecoNumero: {
  title: "¿Puedes mantener tu número?",
  message: `Sí, gracias a la portabilidad numérica. Si eres postpago (tenías un plan), puedes recuperar tu número portándolo a otra compañía hasta 2 años después de terminar el contrato. Si tienes deuda con la antigua compañía, el plazo para portarte manteniendo el número es de 180 días. Conoce más en <a href='https://www.sernac.cl/portal/604/w3-propertyvalue-14521.html' target='_blank'>Derechos en Telecomunicaciones</a>.`,
  isInfoNode: true
},

telecoDeudas: {
  title: "¿Puedes terminar tu contrato si tienes deudas?",
  message: `Sí, la empresa debe terminar tu contrato aunque tengas deudas pendientes. Luego te emitirá la facturación final con los cobros adeudados y coordinará contigo la devolución de equipos si corresponde. Conoce más en <a href='https://www.sernac.cl/portal/604/w3-propertyvalue-14521.html' target='_blank'>Derechos en Telecomunicaciones</a>.`,
  isInfoNode: true
},

telecoAdelantado: {
  title: "¿Puedes terminar si pagaste por adelantado?",
  message: `Sí. Si pagaste tu plan de forma anticipada y quedan saldos a tu favor al momento de terminar el contrato, la empresa deberá calcularlos y restituirte ese dinero. <a href='https://www.sernac.cl/portal/604/w3-propertyvalue-14521.html' target='_blank'>Más info</a>.`,
  isInfoNode: true
}
,
    infoCobranzas: {
  title: "Derechos en Cobranzas",
  options: [
    { text: "¿Qué es la cobranza extrajudicial?", subtitle: "Entiende qué es la cobranza extrajudicial.", target: "cobranzaExtrajudicial" },
    { text: "¿Pierdes tus derechos si tienes deudas?", subtitle: "Tus derechos como deudor/a deben respetarse.", target: "cobranzaDerechosDeudor" },
    { text: "¿Desde cuándo pueden cobrarte?", subtitle: "Cuándo pueden iniciar las acciones de cobranza.", target: "cobranzaDesdeCuando" },
    { text: "¿Quién paga los gastos de cobranza?", subtitle: "Tu responsabilidad y los topes máximos legales.", target: "cobranzaGastos" },
    { text: "¿Te pueden acosar u hostigar?", subtitle: "Conoce los límites legales que deben respetar al cobrarte.", target: "cobranzaHostigamiento" },
    { text: "¿Cómo reclamar por hostigamiento?", subtitle: "Pasos para ingresar tu reclamo si te hostigan.", target: "cobranzaReclamar" },
    { text: "¿Cuándo usar el reclamo 'No me hostiguen'?", subtitle: "Casos específicos en los que aplica este reclamo.", target: "cobranzaCuandoReclamar" },
    { text: "¿Qué hacer si te siguen hostigando?", subtitle: "Qué hacer si la empresa incumple tras tu reclamo.", target: "cobranzaIncumplimiento" },
    { text: "¿Cómo renegociar tu deuda?", subtitle: "Alternativas gratuitas para ordenar tus deudas en la SUPERIR.", target: "cobranzaRenegociar" }
  ]
},

cobranzaExtrajudicial: {
  title: "¿Qué es la cobranza extrajudicial?",
  message: `Es el procedimiento que usan las empresas o agencias externas para informarte sobre una mora o retraso en tus pagos, antes de iniciar acciones judiciales.<br>Conoce más en <a href='https://www.sernac.cl/portal/604/w3-propertyvalue-21025.html' target='_blank'>Cobranzas Extrajudiciales</a>.`,
  isInfoNode: true
},

cobranzaDerechosDeudor: {
  title: "¿Pierdes tus derechos si tienes deudas?",
  message: `No. Aunque tengas deudas y caigas en mora, sigues teniendo derechos que las empresas deben respetar al momento de cobrarte. Conoce tus <a href='https://www.sernac.cl/portal/604/w3-propertyvalue-21025.html' target='_blank'>Derechos en Cobranzas Extrajudiciales</a>.`,
  isInfoNode: true
},

cobranzaDesdeCuando: {
  title: "¿Desde cuándo pueden cobrarte?",
  message: `Las acciones de cobranza extrajudicial (llamados, cartas, etc.) solo pueden empezar a realizarse después de 20 días corridos desde que tu deuda venció y cayó en mora. Conoce tus <a href='https://www.sernac.cl/portal/604/w3-propertyvalue-21025.html' target='_blank'>Derechos en Cobranzas Extrajudiciales</a>.`,
  isInfoNode: true
},

cobranzaGastos: {
  title: "¿Quién paga los gastos de cobranza?",
  message: `Los gastos de la cobranza extrajudicial los pagas tú (la persona con la deuda), pero ¡ojo!, estos gastos tienen topes máximos definidos por ley según el monto de tu deuda. Usa la <a href='https://www.sernac.cl/app/calculadora_financiera' target='_blank'>Calculadora de Gastos de Cobranza</a> para verificar que no te cobren de más.<br> Video: <a href='https://youtu.be/t_AsPJxLKo0' target='_blank'>Cómo funciona</a>.`,
  isInfoNode: true
},

cobranzaHostigamiento: {
  title: "¿Te pueden acosar u hostigar?",
  message: `No. La ley limita claramente las acciones de cobranza: solo se permite 1 visita o llamada telefónica a la semana. Adicionalmente, pueden realizar hasta 2 gestiones remotas semanales (como emails, SMS, mensajes de WhatsApp o por apps), siempre que haya al menos dos días de diferencia entre ellas. Si te hostigan con más contactos que esos, ingresa un Reclamo con la opción 'No me hostiguen cobranzas'. <a href='https://www.sernac.cl/portal/617/w3-propertyvalue-66804.html' target='_blank'>Más sobre 'No Me Hostiguen'</a>.`,
  isInfoNode: true
},

cobranzaReclamar: {
  title: "¿Cómo reclamar por hostigamiento?",
  message: `Sigue estos pasos:<br>
  • Ingresa al <a href='http://www.sernac.cl/app/consumidor' target='_blank'>Portal del Consumidor</a> (puedes usar ClaveÚnica o Clave SERNAC).<br>
  • Selecciona la opción 'Reclamo' y luego 'No me hostiguen cobranzas'.<br>
  • Acepta las condiciones, completa la información solicitada y presiona 'Enviar'.<br>

  <a href='https://www.sernac.cl/portal/617/w3-propertyvalue-66804.html' target='_blank'>Más sobre 'No Me Hostiguen'</a>.`,
  isInfoNode: true
},

cobranzaCuandoReclamar: {
  title: "¿Cuándo usar el reclamo 'No me hostiguen'?",
  message: `Usa el reclamo especial 'No me hostiguen cobranzas' si:<br>
  • Te llaman o contactan más veces de lo permitido por la ley para cobrarte una deuda.<br>
  • Te cobran una deuda que ya pagaste.<br>
  • Te cobran una deuda que pertenece a otra persona o que tú desconoces.<br>
  • Te cobran una deuda que ya tiene una demanda judicial notificada.<br>
  • Te cobran una deuda que está en proceso de renegociación o liquidación en la Superintendencia de Insolvencia y Reemprendimiento (SUPERIR).<br>
  <a href='https://www.sernac.cl/portal/617/w3-propertyvalue-66804.html' target='_blank'>Más info</a>.`,
  isInfoNode: true
},

cobranzaIncumplimiento: {
  title: "¿Qué hacer si te siguen hostigando?",
  message: `Sigue estos pasos según el caso:<br>
   • Si la empresa acogió tu reclamo 'No me hostiguen' pero luego vuelve a incumplir: puedes 'Avisar Incumplimiento' en la sección 'Estado de tus casos' del <a href='https://www.sernac.cl/app/consumidor/' target='_blank'>Portal</a>.<br>
   • Si la empresa no acogió tu reclamo y tienes nuevas pruebas del hostigamiento: ingresa un nuevo Reclamo adjuntando esos antecedentes.<br>
<a href='https://www.sernac.cl/portal/617/w3-propertyvalue-66804.html' target='_blank'>Más info</a>.`,
  isInfoNode: true
},

cobranzaRenegociar: {
  title: "¿Cómo renegociar tu deuda?",
  message: `Puedes buscar una solución a tu sobreendeudamiento a través de los procedimientos gratuitos de Renegociación o Liquidación Voluntaria de Deudas que ofrece la <a href='https://www.superir.gob.cl/' target='_blank'>Superintendencia de Insolvencia y Reemprendimiento (SUPERIR)</a>. Estos mecanismos te permiten pagar tus deudas en nuevas condiciones, de acuerdo a tu capacidad económica actual.
<br><a href='https://www.sernac.cl/portal/604/w3-propertyvalue-21025.html' target='_blank'>Más info sobre cobranzas</a>.`,
  isInfoNode: true
},
    infoCiber: {
  title: "Derechos en Ciberseguridad y Fraudes",
  options: [
    { text: "¿Cómo prevenir fraudes online?", subtitle: "Consejos para comprar online de forma segura.", target: "prevencionFraudesOnline" },
    { text: "¿Cómo prevenir fraudes financieros?", subtitle: "Recomendaciones generales para evitar fraudes.", target: "prevencionFraudesFinancieros" },
    { text: "¿Qué hacer ante un cobro irregular?", subtitle: "Qué hacer si detectas un cargo no reconocido.", target: "cobroIrregularFraudes" },
    { text: "¿Qué hacer si fuiste víctima de fraude?", subtitle: "Pasos a seguir si te estafaron.", target: "victimaFraude" }
  ]
},

prevencionFraudesOnline: {
  title: "¿Cómo prevenir fraudes online?",
  message: `¡Cuidado con las estafas! Pueden existir empresas falsas que te engañan con ofertas muy convenientes, no entregan los productos o simplemente desaparecen tras el pago. Si te pasa algo así, haz una denuncia ante el <a href='http://www.ministeriopublico.cl/' target='_blank'>Ministerio Público</a>, ya que podría ser un delito.<br>Infórmate más sobre cómo comprar seguro en <a href='https://www.sernac.cl/portal/604/w3-propertyvalue-66244.html' target='_blank'>Ciberseguridad en Consumo</a>.`,
  isInfoNode: true
},

prevencionFraudesFinancieros: {
  title: "¿Cómo prevenir fraudes financieros?",
  message: `Mantente alerta ante ofertas de créditos demasiado buenas para ser verdad, empresas desconocidas o que te pidan dinero por adelantado para gestionar un préstamo. Podrían ser fraudes. Si eres víctima, denuncia ante el <a href='http://www.ministeriopublico.cl/' target='_blank'>Ministerio Público</a>.<br>
  Revisa nuestros consejos en <a href='https://www.sernac.cl/portal/604/w3-propertyvalue-66244.html' target='_blank'>Ciberseguridad en Consumo</a>.`,
  isInfoNode: true
},

cobroIrregularFraudes: {
  title: "¿Qué hacer ante un cobro irregular?",
  message: `Ante cobros o cargos irregulares en tus cuentas, contacta inmediatamente a la empresa para desconocer la operación y prevenir fraudes. Las entidades financieras te deben restituir el dinero o anular los cargos no autorizados. Si la empresa no responde, reclama en el <a href='http://www.sernac.cl/app/consumidor' target='_blank'>Portal del Consumidor</a>.
  <br>Revisa más en <a href='https://www.sernac.cl/portal/604/w3-propertyvalue-66244.html' target='_blank'>Ciberseguridad en Consumo</a>.`,
  isInfoNode: true
},

victimaFraude: {
  title: "¿Qué hacer si fuiste víctima de fraude?",
  message: `Si fuiste víctima de una empresa fraudulenta (por ejemplo, una que desapareció con tu dinero, no te entregó el producto, suplantó la identidad de otra, etc.), te recomendamos hacer inmediatamente una denuncia ante el <a href='http://www.ministeriopublico.cl/' target='_blank'>Ministerio Público</a>, ya que estos actos suelen ser delitos.<br>
  Revisa nuestros consejos en<a href='https://www.sernac.cl/portal/604/w3-propertyvalue-66244.html' target='_blank'>Ciberseguridad en Consumo</a>.`,
  isInfoNode: true
},
    infoViajes: {
  title: "Derechos en Viajes",
  options: [
    { text: "¿Qué derechos tienes si tu vuelo se retrasa o cancela?", subtitle: "Conoce las compensaciones y opciones disponibles para ti.", target: "viajeVueloRetrasado" },
    { text: "¿Qué pasa si hay sobreventa de pasajes (overbooking)?", subtitle: "Tus derechos si te niegan el embarque por sobreventa.", target: "viajeOverbooking" },
    { text: "¿Y si pierden o dañan tu equipaje?", subtitle: "Responsabilidad de la aerolínea con tu equipaje.", target: "viajeEquipaje" },
    { text: "¿Qué responsabilidad tiene la agencia de viajes?", subtitle: "La agencia debe cumplir todo lo que te prometió.", target: "viajeResponsabilidadAgencia" },
    { text: "¿Qué debes saber antes de contratar un viaje?", subtitle: "Consejos importantes que debes considerar antes de contratar.", target: "viajeAntesContratar" },
    { text: "¿Qué hacer si no cumplen lo que te prometieron?", subtitle: "Cómo reclamar si la aerolínea o agencia no cumplen.", target: "viajeIncumplimiento" }
  ]
},

viajeVueloRetrasado: {
  title: "¿Qué derechos tienes si tu vuelo se retrasa o cancela?",
  message: `Si la aerolínea es la responsable del retraso o cancelación de tu vuelo, tienes derecho, según corresponda, a que te embarquen en el siguiente vuelo disponible, a que te devuelvan el monto total pagado por el pasaje, o a recibir compensaciones económicas que dependen del tiempo de la demora. Además, según el caso, pueden corresponderte derechos asistenciales como llamadas telefónicas, alimentación y hasta alojamiento si es necesario esperar al día siguiente. Conoce todos los detalles en <a href='https://www.sernac.cl/portal/604/w3-propertyvalue-21019.html' target='_blank'>Derechos del Pasajero Aéreo</a>.`,
  isInfoNode: true
},

viajeOverbooking: {
  title: "¿Qué pasa si hay sobreventa de pasajes (overbooking)?",
  message: `Si te niegan el embarque debido a una sobreventa de pasajes que sea responsabilidad de la aerolínea, esta debe ofrecerte alternativas como embarcar en el próximo vuelo disponible o el reembolso total del pasaje no utilizado. Además, tienes derecho a una compensación económica que varía según la distancia del vuelo y la demora final en llegar a tu destino. Infórmate sobre tus <a href='https://www.sernac.cl/portal/604/w3-propertyvalue-21019.html' target='_blank'>Derechos del Pasajero Aéreo</a>.`,
  isInfoNode: true
},

viajeEquipaje: {
  title: "¿Y si pierden o dañan tu equipaje?",
  message: `La aerolínea es responsable por la pérdida, retraso o daño de tu equipaje facturado (el que entregaste en el counter). Debes informar el problema a la aerolínea apenas lo detectes en el aeropuerto. Existen límites máximos en las indemnizaciones que están establecidos por la ley aeronáutica chilena o por convenios internacionales, según corresponda a tu vuelo. Revisa tus <a href='https://www.sernac.cl/portal/604/w3-propertyvalue-21019.html' target='_blank'>Derechos del Pasajero Aéreo</a>.`,
  isInfoNode: true
},

viajeResponsabilidadAgencia: {
  title: "¿Qué responsabilidad tiene la agencia de viajes?",
  message: `La agencia de viajes con la que contrataste debe cumplir con todo lo que te ofreció y prometió, tanto en su publicidad como en el contrato que firmaste (transporte, alojamiento, tours, comidas incluidas, etc.). La agencia es responsable directamente, incluso si los problemas ocurren con servicios prestados por terceros (como la aerolínea o el hotel). Debe entregarte información clara y veraz antes de que contrates. Revisa tus <a href='https://www.sernac.cl/portal/604/w3-propertyvalue-21019.html' target='_blank'>Derechos al contratar con Agencias de Viaje</a>.`,
  isInfoNode: true
},

viajeAntesContratar: {
  title: "¿Qué debes saber antes de contratar un viaje?",
  message: `Antes de contratar con una agencia: Lee detenidamente el contrato antes de firmar y asegúrate de entenderlo. Exige que toda la información relevante y las promesas que te hagan verbalmente queden por escrito (precios finales con tasas e impuestos, fechas exactas, condiciones del viaje, servicios incluidos, políticas de cancelación y devolución). Guarda siempre copias de la publicidad, cotizaciones y del contrato firmado. Más consejos en <a href='https://www.sernac.cl/portal/604/w3-propertyvalue-21019.html' target='_blank'>Derechos al contratar con Agencias de Viaje</a>.`,
  isInfoNode: true
},

viajeIncumplimiento: {
  title: "¿Qué hacer si no cumplen lo que te prometieron?",
  message: `Si la aerolínea o la agencia de viajes no respetan tus derechos o no cumplen con lo ofrecido, puedes ingresar un Reclamo en el <a href='https://www.sernac.cl/app/consumidor/' target='_blank'>Portal del Consumidor</a> del SERNAC. Es muy importante que guardes todos los antecedentes que tengas para respaldar tu caso (tu contrato, publicidad, correos electrónicos, boletas, fotografías, etc.).`,
  isInfoNode: true
}
,
    herramientasConsejos: {
        title: "Herramientas y Consejos",
        message: "",
        options: [
            { text: "Calculadora de Presupuesto Familiar", target: "infoCalculadora", subtitle: "Organiza tus ingresos y gastos familiares." },
            { text: "Comparador de Tarjetas de Crédito", target: "infoComparador", subtitle: "Compara costos y cargos de diferentes tarjetas." },
            { text: "Calculadora de Gastos de Cobranza", target: "infoCobranza", subtitle: "Verifica cuánto te pueden cobrar por gastos de cobranza." },
            { text: "Simulador de Créditos de Consumo", target: "infoSimulador", subtitle: "Compara diferentes ofertas de créditos de consumo." }
        ]
    },
    infoCalculadora: {
  title: "Calculadora de Presupuesto Familiar",
  options: [
    { text: "¿Para qué sirve?", subtitle: "Calcula tu capacidad de pago y potencial de ahorro.", target: "presupuestoParaQueSirve" },
    { text: "¿Cómo funciona?", subtitle: "Entiende cómo interpretar el resultado del semáforo.", target: "presupuestoComoFunciona" }
  ]
},

presupuestoParaQueSirve: {
  title: "¿Para qué sirve?",
  message: `Esta calculadora te permite registrar tus ingresos y gastos mensuales para calcular tu capacidad (o la de tu familia) de endeudamiento y tu potencial de ahorro. ¡Es muy útil para ordenar tus finanzas! Accede a la <a href='https://www.sernac.cl/app/calculadora' target='_blank'>Calculadora Presupuesto Familiar</a>.`,
  isInfoNode: true
},

presupuestoComoFunciona: {
  title: "¿Cómo funciona?",
  message: `Al ingresar tus datos, la calculadora te arroja un resultado con un semáforo:<br>
• <strong>Verde</strong>: ¡Felicitaciones! Tienes un presupuesto equilibrado y recomendable.<br>
• <strong>Amarillo</strong>: ¡Atención! Estás cerca del límite de tu carga financiera recomendada.<br>
• <strong>Rojo</strong>: ¡Cuidado! Excedes la carga financiera máxima recomendada, lo que aumenta tu riesgo de sobreendeudamiento.<br>
Usa la <a href='https://www.sernac.cl/app/calculadora/' target='_blank'>Calculadora</a> para ver tu resultado.`,
  isInfoNode: true
}
,
    infoComparador: {
  title: "Comparador de Tarjetas de Crédito",
  options: [
    { text: "¿Qué es y para qué sirve?", subtitle: "Conoce qué es y compara los cargos de las tarjetas.", target: "tarjetasQueEs" },
    { text: "¿Qué puedes comparar?", subtitle: "Revisa los tipos de costos que puedes comparar.", target: "tarjetasQueComparar" },
    { text: "¿Por qué es importante comparar?", subtitle: "Entiende por qué hay diferencias signficativas entre tarjetas", target: "tarjetasImportancia" }
  ]
},

// Nodos informativos

tarjetasQueEs: {
  title: "¿Qué es y para qué sirve?",
  message: `Es una herramienta gratuita de SERNAC que te permite conocer y comparar de forma fácil los diferentes cargos y costos asociados al uso de las tarjetas de crédito disponibles en el mercado chileno. Te ayuda a tomar decisiones informadas, elegir la opción más conveniente para tu bolsillo y evitar el sobreendeudamiento. Accede al <a href='https://www.sernac.cl/portal/619/w3-article-64916.html' target='_blank'>Comparador de Tarjetas de Crédito</a>.`,
  isInfoNode: true
},

tarjetasQueComparar: {
  title: "¿Qué puedes comparar?",
  message: `Puedes comparar diversos cargos que aplican las distintas tarjetas, tales como:<br>
• Cargos por mantención y/o administración (anuales o mensuales).<br>
• Costos por realizar avances en efectivo (tanto en Chile como en el extranjero).<br>
• Comisiones por compras realizadas fuera de Chile.<br>
• Otros cargos específicos por diferentes transacciones.<br>
La herramienta incluye información actualizada de la gran mayoría de las tarjetas vigentes en el mercado. Revisa el <a href='https://www.sernac.cl/portal/619/w3-article-64916.html' target='_blank'>Comparador de Tarjetas de Crédito</a>.`,
  isInfoNode: true
},

tarjetasImportancia: {
  title: "¿Por qué es importante comparar?",
  message: `Porque existen diferencias ¡muy significativas! en los cobros entre distintas tarjetas y emisores. Por ejemplo, solo los cargos anuales por mantención pueden variar desde $0 hasta más de $350.000, y un avance en efectivo te puede costar desde $0 hasta casi $30.000 por cada operación. Comparar te permite identificar estos costos ocultos y elegir la tarjeta que realmente te conviene más. Usa el <a href='https://www.sernac.cl/portal/619/w3-article-64916.html' target='_blank'>Comparador de Tarjetas de Crédito</a>.`,
  isInfoNode: true
}
,
    infoCobranza: {
  title: "Calculadora de Gastos de Cobranza",
  options: [
    { text: "¿Para qué sirve?", subtitle: "Verifica el monto máximo legal que te pueden cobrar.", target: "cobranzaParaQueSirve" },
    { text: "¿Cómo funciona?", subtitle: "Aprende a ingresar los datos para calcular.", target: "cobranzaComoFunciona" }
  ]
},

cobranzaParaQueSirve: {
  title: "¿Para qué sirve?",
  message: `Si tienes una deuda atrasada (en mora) y la empresa ha iniciado acciones de cobranza extrajudicial (como llamados o cartas), esta calculadora te ayuda a verificar cuál es el monto MÁXIMO que legalmente te pueden exigir por los gastos asociados a esa cobranza.
Es importante que sepas que estos gastos de cobranza son de cargo tuyo (como persona deudora), pero siempre deben respetar los topes que establece la ley. Así te aseguras de que no te cobren más de lo permitido.
Accede aquí a la <a href='https://www.sernac.cl/app/calculadora_financiera/' target='_blank'>Calculadora de Gastos de Cobranza</a> y revisa también tus <a href='https://www.sernac.cl/portal/604/w3-propertyvalue-21025.html' target='_blank'>Derechos en Cobranzas</a>.`,
  isInfoNode: true
},

cobranzaComoFunciona: {
  title: "¿Cómo funciona?",
  message: `Debes ingresar el monto de tu deuda vencida (capital más intereses y comisiones devengadas). La calculadora aplicará automáticamente los porcentajes y topes que están en la ley para indicarte cuánto es lo máximo que la empresa te podría cobrar por concepto de gastos de cobranza extrajudicial.
Puedes <a href='https://www.sernac.cl/app/calculadora_financiera/' target='_blank'>usar la Calculadora aquí</a> y ver un <a href='https://www.youtube.com/watch?v=t_AsPJxLKo0' target='_blank'>video explicativo</a> sobre cómo funciona.`,
  isInfoNode: true
},
    infoSimulador: {
  title: "Simulador de Créditos de Consumo",
  options: [
    { text: "¿Para qué sirve el Simulador de Créditos?", subtitle: "Compara diferentes opciones de crédito de consumo.", target: "simuladorParaQueSirve" },
    { text: "¿Cómo funciona el simulador?", subtitle: "Aprende a usar el simulador e ingresar tus datos.", target: "simuladorComoFunciona" }
  ]
},

simuladorParaQueSirve: {
  title: "¿Para qué sirve el Simulador de Créditos?",
  message: `Es una herramienta de SERNAC donde puedes realizar simulaciones de créditos de consumo. Te permite comparar las distintas opciones que existen actualmente en el mercado para que tomes una decisión de financiamiento más informada. Accede aquí al <a href='https://www.sernac.cl/app/comparador' target='_blank'>Simulador de Créditos de Consumo</a>.`,
  isInfoNode: true
},

simuladorComoFunciona: {
  title: "¿Cómo funciona el simulador?",
  message: `Primero debes elegir el monto del crédito que necesitas, luego seleccionar tu rango de sueldo líquido mensual y, finalmente, escoger el número de meses (plazo) en que quieres pagar el crédito. El simulador te mostrará las distintas ofertas del mercado ordenadas de menor a mayor Costo Total del Crédito (CTC), que es el indicador más completo para comparar. Accede aquí al <a href='https://www.sernac.cl/app/comparador' target='_blank'>Simulador de Créditos de Consumo</a>.`,
  isInfoNode: true
},
    horarioOficinas: {
        title: "Horarios de atención y direcciones",
        message: "",
        options: [
            { text: "Oficinas Regionales SERNAC", target: "infoOficinas", subtitle: "Encuentra las direcciones y horarios de nuestras oficinas regionales." },
            { text: "Atención en Municipios (Convenios)", target: "infoMunicipios", subtitle: "Busca si hay puntos de atención en tu municipalidad (convenios)." }
        ]
    },
    infoOficinas: {
  title: "Oficinas Regionales SERNAC",
  message: `SERNAC tiene oficinas en todas las capitales regionales para atenderte presencialmente.<br><a href='https://www.sernac.cl/portal/617/w3-propertyvalue-13742.html' target='_blank'>Revisa y conoce sus horarios de atención</a>.`,
  isInfoNode: true
},
    infoMunicipios: {
  title: "Atención en Municipios (Convenios)",
  message: `Además de nuestras Oficinas Regionales, en SERNAC tenemos convenios con diversas comunas para atender tus consultas y reclamos más cerca tuyo. <a href='https://www.sernac.cl/portal/618/w3-propertyvalue-14971.html' target='_blank'>Mira si tu municipalidad</a> tiene convenio activo y dónde puedes encontrar atención.`,
  isInfoNode: true
}
};

const chatbotFlowWithParent = agregarParents(chatbotFlow);

    let historyStack = [];
    let currentNodeId = null;

function renderNode(nodeId) {
    currentNodeId = nodeId;
    const node = chatbotFlowWithParent[nodeId];
    if (!node) return;

    // Recalcular breadcrumbPath en base al parent de nodeId
    breadcrumbPath = [];
    let current = nodeId;
    while (current) {
        breadcrumbPath.unshift(current); // agrega al inicio
        current = chatbotFlowWithParent[current]?.parent;
    }

    chatContent.innerHTML = '';

    // Generar el breadcrumb visual
    const breadcrumbContainer = document.createElement('div');
    breadcrumbContainer.className = 'breadcrumb-container';

    breadcrumbPath.forEach((nodeKey, index) => {
        const span = document.createElement('span');
        span.className = 'breadcrumb-item';
        span.textContent = (nodeKey === 'start') ? 'Inicio' : (chatbotFlowWithParent[nodeKey]?.title || nodeKey);
        span.setAttribute('data-target', nodeKey);

        // Al hacer clic en un breadcrumb, navegar a ese nodo
        span.addEventListener('click', () => {
            renderNode(nodeKey);
        });

        breadcrumbContainer.appendChild(span);

        // Añadir separador si no es el último
        if (index < breadcrumbPath.length - 1) {
            const separator = document.createElement('span');
            separator.className = 'breadcrumb-separator';
            separator.textContent = ' / ';
            breadcrumbContainer.appendChild(separator);
        }
    });

    chatContent.appendChild(breadcrumbContainer);

    const title = document.createElement('h3');
    title.textContent = node.title;
    chatContent.appendChild(title);

    if (node.message) {
        const card = document.createElement('div');
        card.className = 'content-card';

        const messageElement = document.createElement('div');
        messageElement.innerHTML = node.message;

        card.appendChild(messageElement);
        chatContent.appendChild(card);
    }

    if (node.isInfoNode) {
        setTimeout(() => {
            mostrarFeedbackFinal();
        }, 5000);
    }

    if (node.options && node.options.length > 0) {
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

            // Un solo addEventListener aquí, más limpio:
            btn.addEventListener('click', () => {
                registrarInteraccion(opt.target, opt.text); // Guarda cada clic
                if (currentNodeId !== opt.target) {
                    historyStack.push(currentNodeId);
                }
                renderNode(opt.target); // Navega al siguiente nodo
            });

            chatContent.appendChild(btn);
        });

        updateGoStartButton(target);
    }
    const chatFooter = document.getElementById("chatFooter");
    const footerBackButton = document.getElementById("footerBackButton");

    if (currentNodeId !== 'start') {
        chatFooter.style.display = 'flex';
        footerBackButton.style.display = 'flex';
    } else {
        chatFooter.style.display = 'none';
        footerBackButton.style.display = 'none';
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

        const goStartBtn = document.getElementById("goStartButton");
        if (goStartBtn) goStartBtn.style.display = "none";

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

function mostrarFeedbackFinal() {
    if (document.getElementById("usefulFeedbackSection")) {
        return;
    }
    const chatContent = document.getElementById("chatContent");

    const feedbackPregunta = document.createElement("div");
    feedbackPregunta.id = "usefulFeedbackSection";
    feedbackPregunta.classList.add("feedback-box");

    const titulo = document.createElement("p");
    titulo.className = "feedback-title";
    titulo.textContent = "¿Te fue útil esta información?";

    const botones = document.createElement("div");
    botones.classList.add("feedback-buttons");

    const botonSi = document.createElement("button");
    botonSi.className = "feedback-button feedback-button-positive";
    botonSi.innerHTML = '<i class="fa fa-thumbs-up"></i> Sí';
    botonSi.addEventListener("click", () => mostrarFormularioFeedback("positivo"));

    const botonNo = document.createElement("button");
    botonNo.className = "feedback-button feedback-button-negative";
    botonNo.innerHTML = '<i class="fa fa-thumbs-down"></i> No';
    botonNo.addEventListener("click", () => mostrarFormularioFeedback("negativo"));


    botones.appendChild(botonSi);
    botones.appendChild(botonNo);

    feedbackPregunta.appendChild(titulo);
    feedbackPregunta.appendChild(botones);
    chatContent.appendChild(feedbackPregunta);
    feedbackPregunta.scrollIntoView({ behavior: "smooth" });
}

function mostrarFormularioFeedback(tipo) {
    feedbackTipo = tipo; // ← Guardar la opción elegida ("positivo" o "negativo")

    const chatContent = document.getElementById("chatContent");

    // Deshabilitar ambos botones y marcar el seleccionado
    const botones = document.querySelectorAll(".feedback-button");
    botones.forEach(boton => {
        boton.disabled = true;
        boton.classList.remove("feedback-button-selected", "positivo", "negativo");
    });

    const botonSeleccionado = tipo === "positivo"
        ? document.querySelector(".feedback-button:nth-child(1)")
        : document.querySelector(".feedback-button:nth-child(2)");

    botonSeleccionado.classList.add("feedback-button-selected", tipo);

    // Crea el formulario
    const feedbackForm = document.createElement("div");
    feedbackForm.classList.add("feedback-form");

    const texto = document.createElement("p");
    texto.textContent = tipo === "positivo"
        ? "¡Excelente! ¿Hay algo más que quieras comentarnos? (opcional)"
        : "Lamentamos no haberte sido de ayuda. ¿Qué faltó o cómo podemos mejorar? (opcional)";
    texto.style.fontWeight = "bold";
    texto.style.textAlign = "center";

    const textarea = document.createElement("textarea");
    textarea.id = "comentarioFeedback";
    textarea.placeholder = "Escribe tu comentario aquí...";

    const boton = document.createElement("button");
    boton.textContent = "Enviar Comentario";
    boton.classList.add("feedback-submit");
    boton.onclick = mostrarGraciasFeedback;

    feedbackForm.appendChild(texto);
    feedbackForm.appendChild(textarea);
    feedbackForm.appendChild(boton);

    chatContent.appendChild(feedbackForm);
    feedbackForm.scrollIntoView({ behavior: "smooth" });
}



function mostrarGraciasFeedback() {
    const comentario = document.getElementById("comentarioFeedback")?.value?.trim();

    let textoFinal = "";

    // Convertimos "positivo"/"negativo" a "Sí"/"No"
    if (feedbackTipo === "positivo") {
        textoFinal = "Sí";
    } else if (feedbackTipo === "negativo") {
        textoFinal = "No";
    }

    if (comentario) {
        textoFinal += " - Comentario: " + comentario;
    }

    // Registrar la interacción
    registrarInteraccion("encuesta_feedback", textoFinal);

    // Aquí puedes poner tu mensaje de agradecimiento o limpiar el formulario
    const feedbackForm = document.querySelector(".feedback-form");
    if (feedbackForm) {
        feedbackForm.innerHTML = "<p style='text-align:center; font-weight:bold;'>¡Gracias por tu comentario!</p>";
    }
}





function irAlInicio() {
  document.getElementById("chatContent").innerHTML = "";

  // Oculta el botón de inicio
  const goStartBtn = document.getElementById("goStartButton");
  if (goStartBtn) goStartBtn.style.display = "none";
  document.getElementById("goStartButton").style.display = "none";
  cargarNodo("inicio");
}

function updateGoStartButton(target) {
    // El nodo "feedbackThanks" es tu nodo final de encuesta (lo vimos en tu función)
    const showOnNodes = ["feedbackThanks"];
    if (showOnNodes.includes(target)) {
        goStartButton.style.display = 'flex';
    } else {
        goStartButton.style.display = 'none';
    }
}

function registrarInteraccion(objetivo, texto) {
    fetch('guardar_interaccion.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            objetivo: objetivo,
            texto: texto,
            session_id: sessionId
        })
    })
    .then(response => response.text())
    .then(data => console.log('Interacción guardada:', data))
    .catch(error => console.error('Error al guardar interacción:', error));
}



});
