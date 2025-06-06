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
    estadoCasos: { title: "Estado de tus casos", message: `
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
    message: `Es un buscador del comportamiento de las empresas que te permite conocer su historial frente a los reclamos que reciben. 
    <br><a href="https://www.sernac.cl/boletinempresas" target="_blank">Accede al Boletín Empresas</a>.
    <br><a href="https://youtu.be/BOYiqOjRdLw" target="_blank">Mira cómo usarlo (Video)</a>.`,
    isInfoNode: true
},
boletinIndicadores: {
    title: "¿Qué indicadores compara?",
    message: `Puedes comparar por empresa:
    <ul>
        <li>Cantidad de casos recibidos y su porcentaje en el mercado.</li>
        <li>Días promedio que tarda en responder v/s el promedio del mercado.</li>
        <li>Porcentaje de casos respondidos v/s el promedio del mercado.</li>
        <li>Porcentaje de soluciones ofrecidas del total de casos respondidos.</li>
    </ul>
    <a href="https://www.sernac.cl/boletinempresas" target="_blank">Accede al Boletín Empresas</a> para ver estos datos.`,
    isInfoNode: true
},
    infoIngresarReclamo: { title: "¿Cómo ingresar un Reclamo?", message: `Ingresa al <a href="http://www.sernac.cl/app/consumidor" target="_blank">Portal del Consumidor</a> con tu ClaveÚnica o Clave SERNAC. 
    Si es tu primera visita, <a href="https://www.sernac.cl/app/consumidor/index.php?a=registro" target="_blank">regístrate aquí</a>. 
    Te recomendamos adjuntar antecedentes que acrediten los hechos (boleta, contrato, etc.).`, isInfoNode: true },
    infoSaberReclamo: { title: "¿Qué saber antes de reclamar?", message: `
        <strong>Debes saber:</strong><br>
        • Haber comprado o contratado con el comercio establecido.<br>
        • Ser el/la titular afectado(a).<br>
        • No ser empresa.<br><br>
        La gestión dura máximo 18 días hábiles.<br>
        Obtén más información en 
        <a href="https://www.sernac.cl/portal/617/w3-article-9178.html" target="_blank">Conoce más sobre el Reclamo</a> 
        y en la 
        <a href="https://www.sernac.cl/portal/604/w3-article-7563.html" target="_blank">Ruta de tu Reclamo</a>.
    `, isInfoNode: true },
    infoAdjuntar: { title: "¿Cómo adjuntar antecedentes?", message: `
        <strong>Sigue estos pasos:</strong><br>
        • Ingresa al 
        <a href="http://www.sernac.cl/app/consumidor" target="_blank">Portal del Consumidor</a> 
        con tu ClaveÚnica o Clave SERNAC.<br>
        • Selecciona <em>'Estado de tus casos'</em>.<br>
        • Al hacer clic en el número del caso, podrás adjuntar documentos en la pestaña 
        <em>'Agregar información'</em>.
    `, isInfoNode: true },
    infoEstadoReclamo: { title: "¿Cómo saber el estado de tu reclamo?", message: `
        <strong>Sigue estos pasos:</strong><br>
        • Ingresa al 
        <a href="http://www.sernac.cl/app/consumidor" target="_blank">Portal del Consumidor</a> 
        con tu ClaveÚnica o Clave SERNAC.<br>
        • Escoge <em>'Estado de tus casos'</em>.<br>
        • Selecciona el número de tu Reclamo para conocer la respuesta.
    `, isInfoNode: true },
    infoCasosCerrados: { title: "¿Cómo ver casos ya cerrados?", message: `
        <strong>Sigue estos pasos:</strong><br>
        • Ingresa al 
        <a href="http://www.sernac.cl/app/consumidor" target="_blank">Portal del Consumidor</a> 
        con tu ClaveÚnica o Clave SERNAC.<br>
        • Escoge <em>'Estado de tus casos'</em>.<br>
        • Busca y selecciona el número del caso que ya está cerrado para revisar el resultado final.
    `, isInfoNode: true },
    infoRuta: { title: "¿Cuál es la ruta del Reclamo?", message: `
        Es la línea de tiempo de la gestión de tu Reclamo: pasos, etapas, resultados posibles y recomendaciones.<br>
        Revisa el especial 
        <a href="https://www.sernac.cl/portal/604/w3-article-7563.html" target="_blank">‘La Ruta de tu Reclamo’</a>.
    `, isInfoNode: true },
    infoInconformidad: { title: "¿Qué hacer si no estás conforme?", message: `
        Puedes denunciar y demandar a la empresa sin necesidad de un abogado(a) en el Juzgado de Policía Local.<br>
        Descarga el 
        <a href="https://www.sernac.cl/portal/618/w3-article-57407.html" target="_blank">Formulario para denuncia y demanda</a>.
    `, isInfoNode: true },
    infoIncumplimiento: { title: "¿Qué hacer si la empresa no cumple?", message: `
        Puedes usar la opción <em>'Avisar Incumplimiento'</em> en el 
        <a href="http://www.sernac.cl/app/consumidor" target="_blank">Portal del Consumidor</a>, 
        dentro de la sección <em>'Estado de tus casos'</em>. Así, podremos monitorear el comportamiento de la empresa e insistirle para que cumpla lo que te ofreció.<br>
        Revisa también la 
        <a href="https://www.sernac.cl/portal/604/w3-article-7563.html" target="_blank">‘Ruta de tu Reclamo’</a>.
    `, isInfoNode: true },
    infoDesistir: { title: "¿Quieres desistir de un Reclamo?", message: `
        Puedes usar la opción <em>'Avisar Incumplimiento'</em> en el 
        <a href="http://www.sernac.cl/app/consumidor" target="_blank">Portal del Consumidor</a>, 
        dentro de la sección <em>'Estado de tus casos'</em>. Así, podremos monitorear el comportamiento de la empresa e insistirle para que cumpla lo que te ofreció.<br>
        Revisa también la 
        <a href="https://www.sernac.cl/portal/604/w3-article-7563.html" target="_blank">‘Ruta de tu Reclamo’</a>.
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
        La gestión es de máximo 2 días hábiles.<br><br>
        <a href="https://www.sernac.cl/portal/617/w3-article-9182.html" target="_blank">Conoce más sobre la Consulta</a>.
    `, isInfoNode: true },
    infoEstadoConsulta: { title: "¿Cómo revisar el estado de tu Consulta?", message: `
        Si tienes dudas sobre temas de consumo y la aplicación de la Ley 
        (por ejemplo, si tu caso es una infracción o no), puedes hacernos una consulta. 
        La gestión es de máximo 2 días hábiles.<br><br>
        <a href="https://www.sernac.cl/portal/617/w3-article-9182.html" target="_blank">Conoce más sobre la Consulta</a>.
    `, isInfoNode: true },
    otrosTramites: {
        title: "Otros Trámites",
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
    infoQueAlerta: { title: "¿Qué es una Alerta Ciudadana?", message: "Es una herramienta para informar al SERNAC conductas de empresas que te afectan a ti y a otros consumidores. <br><a href='https://www.sernac.cl/portal/617/w3-article-55680.html' target='_blank'>Conoce más sobre la Alerta Ciudadana</a>", isInfoNode: true },
    infoIngresarAlerta: { title: "¿Cómo ingresar una Alerta?", message: "Ingresa al Portal del Consumidor <a href='http://www.sernac.cl/app/consumidor' target='_blank'>aquí</a> con tu ClaveÚnica o Clave SERNAC. Si es tu primera visita, <a href='https://www.sernac.cl/app/consumidor/index.php?a=registro' target='_blank'>regístrate</a>. Adjunta antecedentes (boleta, fotos, etc.) al ingresar la alerta.<br><br>También puedes ir a nuestras <a href='https://www.sernac.cl/portal/617/w3-propertyvalue-13742.html' target='_blank'>Direcciones Regionales</a>.", isInfoNode: true },
    infoSaberAlerta: { title: "¿Qué saber al ingresar una Alerta?", message: "Recuerda que la Alerta Ciudadana informa conductas generales, <strong>NO</strong> resuelve un problema tuyo particular (para eso tienes el Reclamo).<br><br>Conoce más sobre la Alerta Ciudadana <a href='https://www.sernac.cl/portal/617/w3-article-55680.html' target='_blank'>aquí</a>.", isInfoNode: true },
    infoAdjuntarAlerta: { title: "¿Puedes adjuntar documentos?", message: "Sí, puedes adjuntar documentos (fotos, etc.) <strong>ÚNICAMENTE</strong> al momento de ingresar la solicitud.<br><br>Conoce más <a href='https://www.sernac.cl/portal/617/w3-article-55680.html' target='_blank'>aquí</a>.", isInfoNode: true },
    infoSalir: {
    title: "Me Quiero Salir (MQS)",
    options: [
        {
            text: "¿Qué es Me Quiero Salir?",
            subtitle: "Descubre qué es esta herramienta para terminar tus contratos.",
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
    Conoce más sobre <a href="https://www.sernac.cl/portal/617/w3-article-58403.html" target="_blank">MQS</a>.
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
  message: "Sigue estos pasos:<br>* Ingresa al <a href='http://www.sernac.cl/app/consumidor' target='_blank'>Portal del Consumidor</a> (puedes usar ClaveÚnica o Clave SERNAC).<br>* Selecciona 'Me Quiero Salir' > 'Telecomunicaciones'.<br>* Pincha en 'Ingresar nueva solicitud'.",
  isInfoNode: true
},
mqsTelecomSaber: {
  title: "¿Qué saber al ingresar MQS?",
  message: "Debes ser el/la titular del contrato y adjuntar una copia de tu Cédula de Identidad (CI). Recibirás respuesta del SERNAC en un plazo máximo de 8 días hábiles. <br>Más info: <a href='https://www.sernac.cl/portal/617/w3-article-58403.html' target='_blank'>aquí</a> | FAQ: <a href='https://www.sernac.cl/portal/617/w3-propertyvalue-66083.html' target='_blank'>aquí</a>.",
  isInfoNode: true
},
mqsTelecomEstado: {
  title: "¿Cómo revisar el estado de tu MQS?",
  message: "Sigue estos pasos:<br>* Ingresa al <a href='http://www.sernac.cl/app/consumidor' target='_blank'>Portal del Consumidor</a>.<br>* Selecciona 'Me Quiero Salir' > 'Telecomunicaciones'.<br>* Revisa tu caso en la pestaña 'En curso'.",
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
mqsSeguroSolicitar: {
  title: "¿Cómo solicitarlo?",
  message: `Sigue estos pasos:<br>
    * Ingresa al Portal del Consumidor (<a href="http://www.sernac.cl/app/consumidor" target="_blank">http://www.sernac.cl/app/consumidor</a>) (puedes usar ClaveÚnica o Clave SERNAC).<br>
    * Selecciona 'Me Quiero Salir' > 'Seguros'.<br>
    * Pincha en 'Ingresar nueva solicitud'.`,
  isInfoNode: true
},
mqsSeguroSaber: {
  title: "¿Qué saber al ingresar MQS?",
  message: `Debes ser el/la titular o asegurado(a) y adjuntar una copia de tu CI. Recibirás respuesta del SERNAC en un plazo máximo de 8 días hábiles.<br><br>
    Más info: <a href="https://www.sernac.cl/portal/617/w3-article-58403.html" target="_blank">Aquí</a> | 
    FAQ: <a href="https://www.sernac.cl/portal/617/w3-propertyvalue-66083.html" target="_blank">Aquí</a>`,
  isInfoNode: true
},
mqsSeguroEstado: {
  title: "¿Cómo revisar el estado de tu MQS?",
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
    message: "Solicita que dejen de enviarte spam o publicidad no deseada.",
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
    Conoce más <a href="https://www.sernac.cl/portal/617/w3-article-9184.html" target="_blank">aquí</a> | 
    <a href="https://www.sernac.cl/portal/617/w3-propertyvalue-63007.html" target="_blank">FAQ</a>.`,
    isInfoNode: true
},

infoComoIngresarNoMolestar: {
    title: "¿Cómo ingresar una solicitud?",
    message: `Sigue estos pasos:<br>
    * Ingresa al Portal del Consumidor (<a href="http://www.sernac.cl/app/consumidor" target="_blank">http://www.sernac.cl/app/consumidor</a>).<br>
    * Selecciona 'No Molestar'.<br>
    * Pincha en 'Ingresar nuevo teléfono y/o correo electrónico' que deseas bloquear.`,
    isInfoNode: true
},

infoSaberAntesNoMolestar: {
    title: "¿Qué saber al ingresar No Molestar?",
    message: `Considera que:<br>
    * No puedes bloquear empresas de cobranza con esta herramienta (para eso tienes el reclamo por hostigamiento).<br>
    * Debes ser la persona destinataria del spam que quieres bloquear.<br>
    * El plazo legal para que la empresa deje de contactarte es de 7 días hábiles máximo desde tu solicitud.<br>
    Conoce más <a href="https://www.sernac.cl/portal/617/w3-article-9184.html" target="_blank">aquí</a> | 
    <a href="https://www.sernac.cl/portal/617/w3-propertyvalue-63007.html" target="_blank">FAQ</a>.`,
    isInfoNode: true
},

infoEstadoNoMolestar: {
    title: "¿Cómo revisar el estado?",
    message: `Sigue estos pasos:<br>
    * Ingresa al Portal del Consumidor (<a href="http://www.sernac.cl/app/consumidor" target="_blank">http://www.sernac.cl/app/consumidor</a>).<br>
    * Selecciona 'No Molestar'.<br>
    * Elige el número telefónico o el correo electrónico que registraste.<br>
    * Luego verás el listado de todas las empresas a las que has pedido bloquear y el estado de cada solicitud (si fue acogida o no).`,
    isInfoNode: true
},

infoIncumplimientoNoMolestar: {
    title: "¿Qué hacer si no cumplen?",
    message: `Si una empresa sigue contactándote después del plazo, puedes usar la opción 'Avisar Incumplimiento':<br>
    * Ingresa al Portal del Consumidor (<a href="http://www.sernac.cl/app/consumidor" target="_blank">http://www.sernac.cl/app/consumidor</a>).<br>
    * Selecciona 'No Molestar'.<br>
    * Pincha sobre el número de teléfono o correo que sigue recibiendo la publicidad.<br>
    * Luego indica la empresa que te sigue contactando.<br>
    SERNAC gestionará este aviso y te informará el resultado a tu correo en un plazo de 12 días hábiles. 
    Más info <a href="https://www.sernac.cl/portal/617/w3-article-58437.html" target="_blank">aquí</a>.`,
    isInfoNode: true
},

infoEliminarNoMolestar: {
    title: "¿Cómo eliminar una solicitud?",
    message: `Si cambias de opinión y quieres volver a recibir información de una empresa que bloqueaste, sigue estos pasos:<br>
    * Ingresa al Portal del Consumidor (<a href="http://www.sernac.cl/app/consumidor" target="_blank">http://www.sernac.cl/app/consumidor</a>).<br>
    * Selecciona 'No Molestar'.<br>
    * En el estado de tu solicitud, selecciona la(s) empresa(s) a las que has pedido el cese.<br>
    * En la parte superior derecha encontrarás un botón rojo que dice 'Eliminar solicitud'.`,
    isInfoNode: true
}
,
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
    infoGarantia: {
    title: "Garantía Legal y Devoluciones",
    message: "Conoce tu derecho a garantía (6x3), retracto y más.",
    options: [
        { text: "¿Qué es la Garantía Legal (6x3)?", subtitle: "Conoce tu derecho a cambio, reparación o devolución.", target: "garantiaQueEs" },
        { text: "¿Qué hacer si un producto nuevo falla?", subtitle: "Conoce las 3 opciones que tienes para exigir.", target: "garantiaProductoFalla" },
        { text: "¿Cuál es el plazo para ejercer la Garantía Legal?", subtitle: "¿Cuánto tiempo tienes para usar tu garantía?", target: "garantiaPlazo" },
        { text: "¿Puedes cambiar un producto si no te gustó?", subtitle: "Diferencia entre garantía legal y ticket de cambio voluntario.", target: "garantiaNoGusto" },
        { text: "¿La Garantía aplica en productos usados?", subtitle: "Condiciones de garantía para productos de segunda mano.", target: "garantiaUsados" },
        { text: "¿La Garantía aplica en liquidaciones?", subtitle: "¿Tienes los mismos derechos si compraste en liquidación?", target: "garantiaLiquidaciones" },
        { text: "¿Y si una empresa te obliga a hacer una revisión técnica?", subtitle: "¿Pueden condicionar tu garantía a una revisión técnica?", target: "garantiaRevisionTecnica" },
        { text: "¿Qué productos no tienen garantía ni cambio?", subtitle: "Conoce las excepciones a la garantía legal.", target: "garantiaExcepciones" },
        { text: "¿Puedes arrepentirte de una compra?", subtitle: "Tu derecho a retracto en compras a distancia.", target: "garantiaRetractoDistancia" },
        { text: "¿Puedes arrepentirte en compras presenciales?", subtitle: "Cuándo aplica el retracto si compraste presencialmente.", target: "garantiaRetractoPresencial" },
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
        message: `Puedes exigir la devolución, cambio o reparación del producto gratis (tú eliges) dentro de los 6 meses desde la compra o recepción.<br>
        Si la empresa no respeta este derecho, ingresa un Reclamo en el <a href="http://www.sernac.cl/app/consumidor" target="_blank">Portal del Consumidor</a>.<br>
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
        title: "¿Aplica la garantía en productos usados?",
        message: `Los productos usados o de segunda mano <strong>NO</strong> tienen Garantía Legal 6x3, <strong>SIEMPRE que te lo adviertan ANTES de la compra</strong>.<br>
        Conoce más en <a href="https://www.sernac.cl/portal/604/w3-propertyvalue-8062.html" target="_blank">Garantía Legal 6x3</a>.`,
        isInfoNode: true
    },
    garantiaLiquidacion: {
  title: "¿La Garantía aplica en liquidaciones?",
  message: `Sí, <strong>no por comprar más barato tienes menos derechos</strong>.<br>
  Conoce más sobre la <a href="https://www.sernac.cl/portal/604/w3-propertyvalue-8062.html" target="_blank">Garantía Legal 6x3</a>.`,
  isInfoNode: true
},

garantiaRevisionTecnica: {
  title: "¿Y si una empresa te obliga a hacer una revisión técnica?",
  message: `Las empresas <strong>no pueden poner barreras</strong> como condicionar la garantía a la revisión/definición de un servicio técnico.<br>
  Si ocurre, <a href="http://www.sernac.cl/app/consumidor" target="_blank">haz un Reclamo en el Portal del Consumidor</a>.<br>
  Conoce más en <a href="https://www.sernac.cl/portal/604/w3-propertyvalue-8062.html" target="_blank">Garantía Legal 6x3</a>.`,
  isInfoNode: true
},

garantiaExcepciones: {
  title: "¿Qué productos no tienen garantía ni cambio?",
  message: `No tienen garantía legal los productos que compraste en el comercio informal (sin boleta o factura).<br>
  Tampoco los de segunda selección, usados o refaccionados, <strong>siempre y cuando te lo hayan advertido claramente antes de la compra</strong>.<br>
  Conoce más en <a href="https://www.sernac.cl/portal/604/w3-propertyvalue-8062.html" target="_blank">Garantía Legal 6x3</a>.`,
  isInfoNode: true
},

retractoDistancia: {
  title: "¿Puedes arrepentirte de una compra?",
  message: `Si compras por internet (o a distancia) tienes <strong>10 días</strong> desde la compra o recepción para <strong>devolver el producto sin uso y con su embalaje en buen estado</strong>.<br>
  Conoce más sobre <a href="https://www.sernac.cl/portal/617/w3-propertyvalue-64530.html" target="_blank">Derecho a Retracto</a>.`,
  isInfoNode: true
},

retractoPresencial: {
  title: "¿Puedes arrepentirte en compras presenciales?",
  message: `Si compraste presencialmente pero <strong>no tuviste acceso directo al producto</strong> (por ejemplo, por catálogo), el derecho a retracto también aplica, salvo que la empresa informe su exclusión.<br>
  Conoce más sobre <a href="https://www.sernac.cl/portal/617/w3-propertyvalue-64530.html" target="_blank">Derecho a Retracto</a>.`,
  isInfoNode: true
},

retractoEjercer: {
  title: "¿Cómo ejercer tu derecho a Retracto?",
  message: `Informa a la empresa que anulas la compra dentro de <strong>10 días</strong> (desde compra o recepción).<br>
  El plazo se <strong>amplía a 90 días</strong> si no enviaron confirmación escrita del contrato.<br>
  Conoce más sobre <a href="https://www.sernac.cl/portal/617/w3-propertyvalue-64530.html" target="_blank">Derecho a Retracto</a>.`,
  isInfoNode: true
},

garantiaVsCambio: {
  title: "¿Garantía Legal vs Ticket de Cambio?",
  message: `La <strong>Garantía Legal</strong> es un derecho por ley cuando un producto nuevo falla.<br>
  En cambio el <strong>Ticket de Cambio</strong> es una oferta voluntaria de la empresa para que puedas cambiar por gusto o talla dentro de un plazo definido.<br>
  Conoce más en <a href="https://www.sernac.cl/portal/604/w3-propertyvalue-8062.html" target="_blank">Garantía Legal 6x3</a>.`,
  isInfoNode: true
},

garantiaEmbalaje: {
  title: "¿Te pueden exigir el embalaje original?",
  message: `No, para ejercer la <a href="https://www.sernac.cl/portal/604/w3-propertyvalue-8062.html" target="_blank">Garantía Legal</a>, las empresas <strong>no pueden exigir embalaje original</strong> si el producto nuevo falla, ni tampoco cobrar si no lo tienes.`,
  isInfoNode: true
},




    infoCompras: { title: "Compras por Internet", message: "Conoce tus derechos ante retrasos, falta de stock o fraudes online...", isInfoNode: true },

  infoCompras: {
    title: "Compras por Internet",
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
    title: "¿Qué hacer si el producto no llega a tiempo?",
    message: `La empresa debe indicar una fecha clara de retiro o un rango preciso para el despacho (indicando si son días hábiles o corridos). Si no cumple con ese plazo, haz un <a href="http://www.sernac.cl/app/consumidor" target="_blank">Reclamo en el Portal</a>.
Revisa tus <a href="https://www.sernac.cl/portal/604/w3-propertyvalue-20982.html" target="_blank">Derechos en Comercio Electrónico</a>.`,
    isInfoNode: true
  },
  productoSinStock: {
    title: "¿Qué hacer si te venden un producto sin stock?",
    message: `Las empresas están obligadas a informarte sobre la falta de stock ANTES de que realices la compra. Si compraste algo y luego te dicen que no hay stock, están incumpliendo. En ese caso, haz un <a href="http://www.sernac.cl/app/consumidor" target="_blank">Reclamo en el Portal</a>.
Revisa tus Derechos en <a href="https://www.sernac.cl/portal/604/w3-propertyvalue-20982.html" target="_blank">Comercio Electrónico</a>.`,
    isInfoNode: true
  },
  AlgoDistinto: {
    title: "¿Qué hacer si recibes algo distinto?",
    message: `Las empresas deben respetar todo lo que te ofrecieron en su publicidad y las características informadas del producto o servicio (precio, formas de pago, costo de envío, etc.). Si recibes algo distinto a lo prometido, haz un <a href="http://www.sernac.cl/app/consumidor" target="_blank">Reclamo en el Portal</a>.
Revisa tus Derechos en <a href="https://www.sernac.cl/portal/604/w3-propertyvalue-20982.html" target="_blank">Comercio Electrónico</a>.`,
    isInfoNode: true
  },
  RetractoCompras: {
    title: "¿Puedes arrepentirte? (Retracto)",
    message: `Si compras por internet (o a distancia) tienes 10 días desde la compra/recepción para devolver el producto sin uso y embalaje en buen estado. Conoce más sobre <a href="https://www.sernac.cl/portal/617/w3-propertyvalue-64530.html" target="_blank">Derecho a Retracto</a>.`,
    isInfoNode: true
  },
  ComprasEmpresaNoContesta: {
    title: "¿Qué hacer si la empresa no te contesta?",
    message: `La empresa debe informar formas de contacto claras (teléfono, correo, etc.) y responder tus consultas o reclamos dentro de un plazo razonable. Si tienes problemas para contactarlos o no te responden, haz un <a href="http://www.sernac.cl/app/consumidor" target="_blank">Reclamo en el Portal</a>.
Revisa tus Derechos en <a href="https://www.sernac.cl/portal/604/w3-propertyvalue-20982.html" target="_blank">Comercio Electrónico</a>.`,
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
  title: "Servicios Financieros",
  options: [
    { text: "¿Cuáles son tus derechos financieros?", subtitle: "En bancos, casas comerciales, entre otras.", target: "InfoComprasDerFin" },
    { text: "¿No te dejan cerrar un producto?", subtitle: "Tu derecho a terminar productos financieros.", target: "cerrarProducto" },
    { text: "Derechos al contratar un crédito", subtitle: "Información que debes tomar en cuenta.", target: "derechosCredito" },
    { text: "Vigencia de una cotización", subtitle: "¿Cuánto dura una cotización que te entregan?", target: "vigenciaCotizacion" },
    { text: "¿Cuáles son las ventas atadas?", subtitle: "Pon atención a las condiciones ofrecidas.", target: "ventasAtadas" },
    { text: "¿Te pueden cambiar un contrato?", subtitle: "Modificaciones unilaterales.", target: "cambioContrato" },
    { text: "¿Te pueden enviar productos no solicitados?", subtitle: "Conoce esta práctica prohibida.", target: "productosNoSolicitados" },
    { text: "¿Te pueden limitar los medios de pago?", subtitle: "Tu libertad para elegir dónde pagar (PAC/PAT).", target: "limiteMediosPago" },
    { text: "¿Qué hacer ante un cobro irregular?", subtitle: "Acciones frente a cobros indebidos.", target: "cobroIrregular" },
    { text: "¿Qué es la Portabilidad Financiera?", subtitle: "Cámbiate de banco o institución financiera más fácil.", target: "portabilidadFinanciera" },
    { text: "¿Te cobran por cambiar la tarjeta?", subtitle: "Costos por reposición del plástico de tu tarjeta.", target: "cambioTarjeta" },
    { text: "¿Cómo prevenir fraudes financieros?", subtitle: "Aprende a prevenir fraudes financieros.", target: "fraudesFinancieros" }
  ]
},

InfoComprasDerFin: {
  title: "¿Cuáles son tus derechos financieros?",
  message: `* Cerrar productos en 5 días.<br>* Recibir Hoja Resumen.<br>* Conocer todos los costos.<br><br>Infórmate más en <a href="https://www.sernac.cl/portal/604/w3-propertyvalue-66843.html" target="_blank">Consumidor Financiero</a>.`,
  isInfoNode: true
},

cerrarProducto: {
  title: "¿No te dejan cerrar un producto?",
  message: `Tienes derecho a cerrar cualquier producto financiero en 5 días (si pagaste lo adeudado). Si no cumplen, haz un <a href="http://www.sernac.cl/app/consumidor" target="_blank">Reclamo en el Portal del Consumidor</a>.<br>Conoce más info en <a href="https://www.sernac.cl/portal/604/w3-propertyvalue-66843.html" target="_blank">Consumidor Financiero</a>.`,
  isInfoNode: true
},

derechosCredito: {
  title: "Derechos al contratar un crédito",
  message: `* Información sobre contratos de adhesión, CTC y CAE.<br>* No pueden obligarte a contratar productos ni cambiar condiciones.<br>* Libertad para usar pagos electrónicos de otros bancos.<br><br>Conoce más en <a href="https://www.sernac.cl/portal/604/w3-propertyvalue-66843.html" target="_blank">Consumidor Financiero</a>.`,
  isInfoNode: true
},

vigenciaCotizacion: {
  title: "Vigencia de una cotización",
  message: `La cotización de una institución financiera debe durar al menos 7 días hábiles. <br>Más info en <a href="https://www.sernac.cl/portal/604/w3-propertyvalue-66843.html" target="_blank">Consumidor Financiero</a>.`,
  isInfoNode: true
},

ventasAtadas: {
  title: "¿Cuáles son las ventas atadas?",
  message: `No pueden obligarte a contratar productos/servicios no solicitados, como seguros automotrices junto con tarjetas. <br>Conoce más en <a href="https://www.sernac.cl/portal/604/w3-propertyvalue-66843.html" target="_blank">Consumidor Financiero</a>.`,
  isInfoNode: true
},

cambioContrato: {
  title: "¿Te pueden cambiar un contrato?",
  message: `No pueden modificar condiciones o costos sin tu consentimiento expreso. Si ocurre, haz un <a href="http://www.sernac.cl/app/consumidor" target="_blank">Reclamo</a>.<br>Infórmate en <a href="https://www.sernac.cl/portal/604/w3-propertyvalue-66843.html" target="_blank">Consumidor Financiero</a>.`,
  isInfoNode: true
},

productosNoSolicitados: {
  title: "¿Te pueden enviar productos no solicitados?",
  message: `Está prohibido enviar productos financieros que no hayas solicitado. Reclama en el <a href="http://www.sernac.cl/app/consumidor" target="_blank">Portal del Consumidor</a>.<br>Lee más en <a href="https://www.sernac.cl/portal/604/w3-propertyvalue-66843.html" target="_blank">Consumidor Financiero</a>.`,
  isInfoNode: true
},

limiteMediosPago: {
  title: "¿Te pueden limitar los medios de pago?",
  message: `Puedes elegir libremente el banco para PAC/PAT. Si no te lo permiten, reclama en el <a href="http://www.sernac.cl/app/consumidor" target="_blank">Portal</a>.<br>Infórmate en <a href="https://www.sernac.cl/portal/604/w3-propertyvalue-66843.html" target="_blank">Consumidor Financiero</a>.`,
  isInfoNode: true
},

cobroIrregular: {
  title: "¿Qué hacer ante un cobro irregular?",
  message: `Contacta a la empresa para desconocer el cargo. Si no responde, reclama en el <a href="http://www.sernac.cl/app/consumidor" target="_blank">Portal</a>.<br>Más info en <a href="https://www.sernac.cl/portal/604/w3-propertyvalue-66244.html" target="_blank">Ciberseguridad en Consumo</a>.`,
  isInfoNode: true
},

portabilidadFinanciera: {
  title: "¿Qué es la Portabilidad Financiera?",
  message: `Facilita el cambio de productos como cuentas, créditos y tarjetas a otra institución. Proceso estandarizado y más simple.<br><a href="https://www.sernac.cl/portal/604/w3-propertyvalue-66843.html" target="_blank">Conoce más</a>.`,
  isInfoNode: true
},

cambioTarjeta: {
  title: "¿Te cobran por cambiar la tarjeta?",
  message: `No pueden cobrarte por cambiar o reponer el plástico de tu tarjeta. Más info en <a href="https://www.sernac.cl/portal/604/w3-propertyvalue-66843.html" target="_blank">Consumidor Financiero</a>.`,
  isInfoNode: true
},

fraudesFinancieros: {
  title: "¿Cómo prevenir fraudes financieros?",
  message: `Evita ofertas muy buenas para ser verdad o empresas desconocidas que piden pagos adelantados.<br>Denuncia ante el <a href="http://www.ministeriopublico.cl/" target="_blank">Ministerio Público</a>.<br>Consejos en <a href="https://www.sernac.cl/portal/604/w3-propertyvalue-66244.html" target="_blank">Ciberseguridad en Consumo</a>.`,
  isInfoNode: true
}
,
    infoTelecom: {
  title: "Telecomunicaciones",
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
    { text: "¿Puedes terminar si pagaste por adelantado?", subtitle: "Saber si puedes terminar si ya pagaste.", target: "telecoAdelantado" }
  ]
},

telecoDerechos: {
  title: "Derechos en Telecomunicaciones",
  message: `Tienes derecho a terminar tu contrato de telecomunicaciones (internet, teléfono, TV) en cualquier momento y sin causa. No pueden negarse ni imponerte requisitos o multas por ello. Cualquier condición que te pongan para dificultarlo es una infracción.<br><a href='https://www.sernac.cl/portal/604/w3-propertyvalue-14521.html' target='_blank'>Conoce más</a>.`,
  isInfoNode: true
},

telecoInterrupcion: {
  title: "¿Qué hacer si tu servicio se interrumpe?",
  message: `Tienes derecho a descuentos en tu boleta e incluso indemnizaciones si te suspenden, alteran o interrumpen el servicio contratado por causas imputables a la empresa. <br><a href='http://www.sernac.cl/app/consumidor' target='_blank'>Reclama aquí</a>. <a href='https://www.sernac.cl/portal/604/w3-propertyvalue-14521.html' target='_blank'>Más info</a>.`,
  isInfoNode: true
},

telecoServiciosExtra: {
  title: "¿Te obligan a contratar servicios extra?",
  message: `Ninguna empresa de telecomunicaciones puede obligarte a contratar servicios adicionales que no deseas. <br><a href='https://www.sernac.cl/portal/604/w3-propertyvalue-14521.html' target='_blank'>Infórmate más</a>.`,
  isInfoNode: true
},

telecoTerminar: {
  title: "¿Cuándo puedes terminar tu contrato?",
  message: `Puedes terminarlo en cualquier momento sin necesidad de dar una causa. Deben cerrarlo en un máximo de 1 día hábil desde tu solicitud.<br>Usa la herramienta <a href='http://www.sernac.cl/app/consumidor' target='_blank'>Me Quiero Salir</a>.`,
  isInfoNode: true
},

telecoRequisitos: {
  title: "¿Te exigen requisitos para terminar?",
  message: `No pueden exigirte requisitos como no tener deudas o devolver equipos antes del cierre. <br><a href='https://www.sernac.cl/portal/617/w3-article-58403.html' target='_blank'>Más sobre MQS</a>.`,
  isInfoNode: true
},

telecoTitular: {
  title: "¿Qué requisitos debes cumplir para terminar?",
  message: `Solo necesitas ser titular del contrato. No tienes que explicar tus motivos. <br><a href='http://www.sernac.cl/app/consumidor' target='_blank'>Usa Me Quiero Salir</a>.`,
  isInfoNode: true
},

telecoPlazo: {
  title: "¿En cuánto tiempo deben terminar tu contrato?",
  message: `La empresa debe cerrarlo y dejar de cobrarte en máximo 1 día hábil desde tu solicitud. <br><a href='https://www.sernac.cl/portal/617/w3-article-58403.html' target='_blank'>Más info</a>.`,
  isInfoNode: true
},

telecoNumero: {
  title: "¿Puedes mantener tu número?",
  message: `Sí. Puedes portar tu número hasta 2 años después de terminar el contrato (180 días si tienes deuda). <br><a href='https://www.sernac.cl/portal/604/w3-propertyvalue-14521.html' target='_blank'>Más información</a>.`,
  isInfoNode: true
},

telecoDeudas: {
  title: "¿Puedes terminar tu contrato si tienes deudas?",
  message: `Sí. La empresa debe cerrar el contrato aunque tengas deudas. Luego emitirá la facturación final. <br><a href='https://www.sernac.cl/portal/604/w3-propertyvalue-14521.html' target='_blank'>Más detalles</a>.`,
  isInfoNode: true
},

telecoAdelantado: {
  title: "¿Puedes terminar si pagaste por adelantado?",
  message: `Sí. Si tienes saldo a favor, deben calcularlo y devolvértelo. <br><a href='https://www.sernac.cl/portal/604/w3-propertyvalue-14521.html' target='_blank'>Más info</a>.`,
  isInfoNode: true
}
,
    infoCobranzas: {
  title: "Cobranzas",
  options: [
    { text: "¿Qué es la cobranza extrajudicial?", subtitle: "Entiende qué es la cobranza extrajudicial.", target: "cobranzaExtrajudicial" },
    { text: "¿Pierdes tus derechos si tienes deudas?", subtitle: "Tus derechos como deudor/a deben respetarse.", target: "cobranzaDerechosDeudor" },
    { text: "¿Desde cuándo pueden cobrarte?", subtitle: "Cuándo pueden iniciar las acciones de cobranza.", target: "cobranzaDesdeCuando" },
    { text: "¿Quién paga los gastos de cobranza?", subtitle: "Tu responsabilidad y los topes máximos legales.", target: "cobranzaGastos" },
    { text: "¿Te pueden acosar u hostigar?", subtitle: "Conoce los límites legales que deben respetar al cobrarte.", target: "cobranzaHostigamiento" },
    { text: "¿Cómo reclamar por hostigamiento?", subtitle: "Pasos para ingresar tu reclamo si te hostigan.", target: "cobranzaReclamar" },
    { text: "¿Cuándo usar el reclamo 'No me hostiguen'?", subtitle: "Casos específicos en los que aplica este reclamo.", target: "cobranzaCuandoReclamar" },
    { text: "¿Qué hacer si te siguen hostigando?", subtitle: "Qué hacer si la empresa incumple tras tu reclamo.", target: "cobranzaIncumplimiento" },
    { text: "¿Cómo renegociar tu deuda?", subtitle: "Alternativas gratuitas para ordenar tus deudas.", target: "cobranzaRenegociar" }
  ]
},

cobranzaExtrajudicial: {
  title: "¿Qué es la cobranza extrajudicial?",
  message: `Es el procedimiento que usan las empresas o agencias externas para informarte sobre una mora o retraso en tus pagos, antes de iniciar acciones judiciales.<br><a href='https://www.sernac.cl/portal/604/w3-propertyvalue-21025.html' target='_blank'>Conoce más</a>.`,
  isInfoNode: true
},

cobranzaDerechosDeudor: {
  title: "¿Pierdes tus derechos si tienes deudas?",
  message: `No. Aunque tengas deudas, tus derechos siguen vigentes y deben respetarse.<br><a href='https://www.sernac.cl/portal/604/w3-propertyvalue-21025.html' target='_blank'>Revisa tus derechos</a>.`,
  isInfoNode: true
},

cobranzaDesdeCuando: {
  title: "¿Desde cuándo pueden cobrarte?",
  message: `Solo pueden iniciar cobranzas extrajudiciales después de 20 días corridos desde que tu deuda cayó en mora.<br><a href='https://www.sernac.cl/portal/604/w3-propertyvalue-21025.html' target='_blank'>Infórmate aquí</a>.`,
  isInfoNode: true
},

cobranzaGastos: {
  title: "¿Quién paga los gastos de cobranza?",
  message: `Tú los pagas, pero tienen topes máximos por ley. Verifica en la <a href='https://www.sernac.cl/app/calculadora_financiera' target='_blank'>Calculadora de Cobranza</a>.<br><a href='https://youtu.be/t_AsPJxLKo0' target='_blank'>Ver video explicativo</a>.`,
  isInfoNode: true
},

cobranzaHostigamiento: {
  title: "¿Te pueden acosar u hostigar?",
  message: `No. Sólo se permite 1 llamada o visita semanal y 2 gestiones remotas con 2 días entre ellas.<br><a href='https://www.sernac.cl/portal/617/w3-propertyvalue-66804.html' target='_blank'>Más sobre No Me Hostiguen</a>.`,
  isInfoNode: true
},

cobranzaReclamar: {
  title: "¿Cómo reclamar por hostigamiento?",
  message: `Ingresa al <a href='http://www.sernac.cl/app/consumidor' target='_blank'>Portal del Consumidor</a>, elige 'Reclamo' y luego 'No me hostiguen cobranzas'.<br><a href='https://www.sernac.cl/portal/617/w3-propertyvalue-66804.html' target='_blank'>Ver instructivo</a>.`,
  isInfoNode: true
},

cobranzaCuandoReclamar: {
  title: "¿Cuándo usar el reclamo 'No me hostiguen'?",
  message: `Si te llaman más de lo permitido, te cobran deudas ajenas, ya pagadas, judicializadas o en renegociación.<br><a href='https://www.sernac.cl/portal/617/w3-propertyvalue-66804.html' target='_blank'>Casos aplicables</a>.`,
  isInfoNode: true
},

cobranzaIncumplimiento: {
  title: "¿Qué hacer si te siguen hostigando?",
  message: `Puedes avisar incumplimiento desde 'Estado de tus casos' o ingresar un nuevo reclamo con nuevas pruebas.<br><a href='http://www.sernac.cl/app/consumidor' target='_blank'>Portal del Consumidor</a>.`,
  isInfoNode: true
},

cobranzaRenegociar: {
  title: "¿Cómo renegociar tu deuda?",
  message: `Puedes renegociar o liquidar tus deudas con la Superintendencia de Insolvencia (SUPERIR).<br><a href='https://www.superir.gob.cl/' target='_blank'>Ir a SUPERIR</a>. <a href='https://www.sernac.cl/portal/604/w3-propertyvalue-21025.html' target='_blank'>Más información</a>.`,
  isInfoNode: true
},
    infoCiber: {
  title: "Ciberseguridad y Fraudes",
  options: [
    { text: "¿Cómo prevenir fraudes online?", subtitle: "Consejos para comprar online de forma segura.", target: "prevencionFraudesOnline" },
    { text: "¿Cómo prevenir fraudes financieros?", subtitle: "Recomendaciones generales para evitar fraudes.", target: "prevencionFraudesFinancieros" },
    { text: "¿Qué hacer ante un cobro irregular?", subtitle: "Qué hacer si detectas un cargo no reconocido.", target: "cobroIrregularFraudes" },
    { text: "¿Qué hacer si fuiste víctima de fraude?", subtitle: "Pasos a seguir si te estafaron.", target: "victimaFraude" }
  ]
},

prevencionFraudesOnline: {
  title: "¿Cómo prevenir fraudes online?",
  message: `¡Cuidado con las estafas! Pueden existir empresas falsas que te engañan con ofertas muy convenientes, no entregan los productos o simplemente desaparecen tras el pago.<br>Denuncia en el <a href='http://www.ministeriopublico.cl/' target='_blank'>Ministerio Público</a>.<br>Más info en <a href='https://www.sernac.cl/portal/604/w3-propertyvalue-66244.html' target='_blank'>Ciberseguridad en Consumo</a>.`,
  isInfoNode: true
},

prevencionFraudesFinancieros: {
  title: "¿Cómo prevenir fraudes financieros?",
  message: `Mantente alerta ante ofertas demasiado buenas, empresas desconocidas o solicitudes de pagos por adelantado.<br>Denuncia en el <a href='http://www.ministeriopublico.cl/' target='_blank'>Ministerio Público</a>.<br><a href='https://www.sernac.cl/portal/604/w3-propertyvalue-66244.html' target='_blank'>Recomendaciones aquí</a>.`,
  isInfoNode: true
},

cobroIrregularFraudes: {
  title: "¿Qué hacer ante un cobro irregular?",
  message: `Si ves un cargo no reconocido, contacta a la empresa para desconocer la operación. Si no responden, reclama en el <a href='http://www.sernac.cl/app/consumidor' target='_blank'>Portal del Consumidor</a>.<br>Más en <a href='https://www.sernac.cl/portal/604/w3-propertyvalue-66244.html' target='_blank'>Ciberseguridad en Consumo</a>.`,
  isInfoNode: true
},

victimaFraude: {
  title: "¿Qué hacer si fuiste víctima de fraude?",
  message: `Si una empresa te estafó, suplantó identidad o desapareció tras el pago, denuncia en el <a href='http://www.ministeriopublico.cl/' target='_blank'>Ministerio Público</a>.<br><a href='https://www.sernac.cl/portal/604/w3-propertyvalue-66244.html' target='_blank'>Infórmate más aquí</a>.`,
  isInfoNode: true
},
    infoViajes: {
  title: "Derechos en Viajes",
  message: "Conoce tus derechos al viajar: vuelos, equipaje, agencias.",
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
  message: `Si la aerolínea es responsable del retraso o cancelación, tienes derecho a:<br>* Reubicación en el siguiente vuelo disponible<br>* Devolución total del pasaje<br>* Compensaciones económicas<br>* Asistencia (alimentación, alojamiento)<br><a href='https://www.sernac.cl/portal/604/w3-propertyvalue-21019.html' target='_blank'>Conoce más</a>.`,
  isInfoNode: true
},

viajeOverbooking: {
  title: "¿Qué pasa si hay sobreventa de pasajes (overbooking)?",
  message: `La aerolínea debe:<br>* Ofrecer alternativas como otro vuelo o reembolso<br>* Otorgar compensación económica proporcional al perjuicio<br><a href='https://www.sernac.cl/portal/604/w3-propertyvalue-21019.html' target='_blank'>Ver detalles</a>.`,
  isInfoNode: true
},

viajeEquipaje: {
  title: "¿Y si pierden o dañan tu equipaje?",
  message: `La aerolínea es responsable por tu equipaje facturado si lo pierde, retrasa o daña.<br>Debes reportarlo inmediatamente en el aeropuerto.<br>Los montos de compensación están regulados por ley o convenios.<br><a href='https://www.sernac.cl/portal/604/w3-propertyvalue-21019.html' target='_blank'>Más información</a>.`,
  isInfoNode: true
},

viajeResponsabilidadAgencia: {
  title: "¿Qué responsabilidad tiene la agencia de viajes?",
  message: `La agencia debe cumplir lo ofrecido en publicidad y contrato.<br>Es responsable incluso si el problema fue con servicios de terceros (aerolínea, hotel, etc.).<br><a href='https://www.sernac.cl/portal/604/w3-propertyvalue-21019.html' target='_blank'>Ver más</a>.`,
  isInfoNode: true
},

viajeAntesContratar: {
  title: "¿Qué debes saber antes de contratar un viaje?",
  message: `Antes de contratar:<br>* Lee el contrato<br>* Exige que todo quede por escrito<br>* Guarda cotizaciones y publicidad<br><a href='https://www.sernac.cl/portal/604/w3-propertyvalue-21019.html' target='_blank'>Consejos útiles</a>.`,
  isInfoNode: true
},

viajeIncumplimiento: {
  title: "¿Qué hacer si no cumplen lo que te prometieron?",
  message: `Si la agencia o aerolínea no cumple:<br>* Reclama en el <a href='http://www.sernac.cl/app/consumidor' target='_blank'>Portal del Consumidor</a><br>* Guarda todos los antecedentes: contrato, correos, boletas, fotos, etc.<br>Más en <a href='https://www.sernac.cl/portal/604/w3-propertyvalue-21019.html' target='_blank'>Derechos del Pasajero</a>.`,
  isInfoNode: true
}
,
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
    infoCalculadora: {
  title: "Calculadora de Presupuesto Familiar",
  options: [
    { text: "¿Para qué sirve?", subtitle: "Calcula tu capacidad de pago y potencial de ahorro.", target: "presupuestoParaQueSirve" },
    { text: "¿Cómo funciona?", subtitle: "Entiende cómo interpretar el resultado del semáforo.", target: "presupuestoComoFunciona" }
  ]
},

presupuestoParaQueSirve: {
  title: "¿Para qué sirve?",
  message: `Esta calculadora te permite registrar tus ingresos y gastos mensuales para calcular tu capacidad (o la de tu familia) de endeudamiento y tu potencial de ahorro. ¡Es muy útil para ordenar tus finanzas!<br><a href='https://www.sernac.cl/app/calculadora' target='_blank'>Ir a la Calculadora</a>.`,
  isInfoNode: true
},

presupuestoComoFunciona: {
  title: "¿Cómo funciona?",
  message: `Al ingresar tus datos, la calculadora te arroja un resultado con un semáforo:<br>* <strong>Verde</strong>: ¡Felicitaciones! Presupuesto equilibrado.<br>* <strong>Amarillo</strong>: Atención, estás cerca del límite financiero.<br>* <strong>Rojo</strong>: Cuidado, sobrepasas el límite de endeudamiento recomendado.<br><a href='https://www.sernac.cl/app/calculadora' target='_blank'>Usa la Calculadora</a>.`,
  isInfoNode: true
}
,
    infoComparador: {
  title: "Comparador de Tarjetas de Crédito",
  options: [
    { text: "¿Qué es y para qué sirve?", subtitle: "Compara los cargos de las tarjetas de crédito.", target: "tarjetasQueEs" },
    { text: "¿Qué puedes comparar?", subtitle: "Tipos de costos que puedes revisar.", target: "tarjetasQueComparar" },
    { text: "¿Por qué es importante comparar?", subtitle: "Diferencias significativas entre emisores.", target: "tarjetasImportancia" }
  ]
},

// Nodos informativos

tarjetasQueEs: {
  title: "¿Qué es y para qué sirve?",
  message: `Es una herramienta gratuita de SERNAC que te permite conocer y comparar de forma fácil los diferentes cargos y costos asociados al uso de las tarjetas de crédito disponibles en el mercado chileno. Te ayuda a tomar decisiones informadas, elegir la opción más conveniente para tu bolsillo y evitar el sobreendeudamiento.<br><a href='https://www.sernac.cl/portal/619/w3-article-64916.html' target='_blank'>Ir al Comparador</a>.`,
  isInfoNode: true
},

tarjetasQueComparar: {
  title: "¿Qué puedes comparar?",
  message: `Puedes comparar diversos cargos que aplican las distintas tarjetas, tales como:<br>* Cargos por mantención y/o administración (anuales o mensuales)<br>* Costos por realizar avances en efectivo (en Chile y en el extranjero)<br>* Comisiones por compras fuera de Chile<br>* Otros cargos específicos por transacciones<br>Incluye información actualizada de la mayoría de las tarjetas vigentes.<br><a href='https://www.sernac.cl/portal/619/w3-article-64916.html' target='_blank'>Revisa el Comparador</a>.`,
  isInfoNode: true
},

tarjetasImportancia: {
  title: "¿Por qué es importante comparar?",
  message: `Porque existen diferencias ¡muy significativas! en los cobros entre distintas tarjetas y emisores. Por ejemplo:<br>* Los cargos anuales por mantención pueden variar desde $0 hasta más de $350.000<br>* Un avance en efectivo puede costar desde $0 hasta casi $30.000 por cada operación<br>Comparar te permite identificar estos costos ocultos y elegir la tarjeta que más te conviene.<br><a href='https://www.sernac.cl/portal/619/w3-article-64916.html' target='_blank'>Usa el Comparador</a>.`,
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
  message: `Si tienes una deuda atrasada (en mora) y la empresa ha iniciado acciones de cobranza extrajudicial (como llamados o cartas), esta calculadora te ayuda a verificar cuál es el monto MÁXIMO que legalmente te pueden exigir por los gastos asociados a esa cobranza.<br><br>Es importante que sepas que estos gastos de cobranza son de cargo tuyo (como persona deudora), pero siempre deben respetar los topes que establece la ley. Así te aseguras de que no te cobren más de lo permitido.<br><br><a href='https://www.sernac.cl/app/calculadora_financiera/' target='_blank'>Ir a la Calculadora</a><br><a href='https://www.sernac.cl/portal/604/w3-propertyvalue-21025.html' target='_blank'>Derechos en Cobranzas</a>.`,
  isInfoNode: true
},

cobranzaComoFunciona: {
  title: "¿Cómo funciona?",
  message: `Debes ingresar el monto de tu deuda vencida (capital más intereses y comisiones devengadas). La calculadora aplicará automáticamente los porcentajes y topes que están en la ley para indicarte cuánto es lo máximo que la empresa te podría cobrar por concepto de gastos de cobranza extrajudicial.<br><br><a href='https://www.sernac.cl/app/calculadora_financiera/' target='_blank'>Usa la Calculadora</a><br><a href='https://youtu.be/t_AsPJxLKo0' target='_blank'>Video explicativo</a>.`,
  isInfoNode: true
},
    infoSimulador: {
  title: "Simulador de Créditos de Consumo",
  options: [
    { text: "¿Para qué sirve el simulador?", subtitle: "Compara opciones de crédito en el mercado.", target: "simuladorParaQueSirve" },
    { text: "¿Cómo funciona el simulador?", subtitle: "Aprende a ingresar tus datos correctamente.", target: "simuladorComoFunciona" }
  ]
},

simuladorParaQueSirve: {
  title: "¿Para qué sirve el simulador?",
  message: `Es una herramienta de SERNAC donde puedes realizar simulaciones de créditos de consumo. Te permite comparar las distintas opciones que existen actualmente en el mercado para que tomes una decisión de financiamiento más informada.<br><a href='https://www.sernac.cl/app/comparador' target='_blank'>Ir al Simulador de Créditos de Consumo</a>.`,
  isInfoNode: true
},

simuladorComoFunciona: {
  title: "¿Cómo funciona el simulador?",
  message: `Primero debes elegir el monto del crédito que necesitas, luego seleccionar tu rango de sueldo líquido mensual y, finalmente, escoger el número de meses (plazo) en que quieres pagar el crédito. El simulador te mostrará las distintas ofertas del mercado ordenadas de menor a mayor Costo Total del Crédito (CTC), que es el indicador más completo para comparar.<br><a href='https://www.sernac.cl/app/comparador' target='_blank'>Ir al Simulador</a>.`,
  isInfoNode: true
},
    horarioOficinas: {
        title: "Horario y Oficinas",
        message: "",
        options: [
            { text: "Oficinas Regionales SERNAC", target: "infoOficinas", subtitle: "Direcciones y horarios de oficinas regionales." },
            { text: "Atención en Municipios (Convenios)", target: "infoMunicipios", subtitle: "Atención en tu municipalidad con convenios." }
        ]
    },
    infoOficinas: {
  title: "Oficinas Regionales SERNAC",
  message: `SERNAC tiene oficinas en todas las capitales regionales para atenderte presencialmente.<br>Revisa sus ubicaciones y horarios de atención aquí:<br><a href='https://www.sernac.cl/portal/617/w3-propertyvalue-13742.html' target='_blank'>Listado de Oficinas Regionales</a>.`,
  isInfoNode: true
},
    infoMunicipios: {
  title: "Atención en Municipios (Convenios)",
  message: `Además de nuestras Oficinas Regionales, en SERNAC tenemos convenios con diversas comunas para atender tus consultas y reclamos más cerca tuyo.<br>Consulta si tu municipalidad tiene convenio activo y dónde puedes encontrar atención:<br><a href='https://www.sernac.cl/portal/618/w3-propertyvalue-14971.html' target='_blank'>Puntos de Atención por Municipio</a>.`,
  isInfoNode: true
}
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

            btn.querySelector('.option-text').addEventListener('click', () => {
                historyStack.push(currentNodeId);
                renderNode(opt.target);
            });
            btn.addEventListener('click', () => {
                if (currentNodeId !== opt.target) {
                    historyStack.push(currentNodeId);
                }
                renderNode(opt.target);
            });
            chatContent.appendChild(btn);
        });

        updateGoStartButton(target);
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
}

function mostrarFormularioFeedback(tipo) {
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
    const chatContent = document.getElementById("chatContent");
    const usefulFeedbackSection = document.getElementById("usefulFeedbackSection");
    // Oculta formulario de feedback si existe
    const formulario = document.querySelector(".feedback-form");
    if (formulario) {
        formulario.remove();
    }

    if (usefulFeedbackSection) {
        usefulFeedbackSection.remove();
    }

    const feedbackCard = document.createElement("div");
    feedbackCard.className = "feedback-card";

    const gracias = document.createElement("div");
    gracias.className = "feedback-thanks";
    gracias.innerHTML = `
        <i class="fas fa-check-circle"></i>
        <span>¡Gracias por tu comentario!</span>
    `;
    feedbackCard.appendChild(gracias);
    chatContent.appendChild(feedbackCard);

    scrollToBottom();

    // Muestra el botón "Inicio" en el footer
    const goStartBtn = document.getElementById("goStartButton");
    if (goStartBtn) goStartBtn.style.display = "flex";


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



});
