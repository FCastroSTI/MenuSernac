<?php
// guardar_interaccion.php

// Conexión a PostgreSQL
$conexion = pg_connect("host=localhost dbname=chatbots user=postgres password=root");

if (!$conexion) {
    http_response_code(500);
    echo "Error de conexión a la base de datos.";
    exit;
}

// Recibir datos
$data = json_decode(file_get_contents("php://input"), true);

// Validar datos mínimos
if (!isset($data['objetivo']) || !isset($data['texto']) || !isset($data['session_id'])) {
    http_response_code(400);
    echo "Datos incompletos.";
    exit;
}

// Preparar datos
$chatbot = 'sernac';
$id = pg_escape_string($conexion, $data['session_id']);
$fechahora = date('Y-m-d H:i:s');
$origen = 'usuario'; // siempre "usuario" porque es el click
$objetivo = pg_escape_string($conexion, $data['objetivo']);
$texto = pg_escape_string($conexion, $data['texto']);
$ticket = 'NULL'; // no estamos usando ticket por ahora

// Insertar en la tabla conversacion
$query = "
INSERT INTO conversacion (chatbot, id, fechahora, origen, objetivo, texto, ticket)
VALUES ('$chatbot', '$id', '$fechahora', '$origen', '$objetivo', '$texto', NULL)
";

$result = pg_query($conexion, $query);

if ($result) {
    echo "OK";
} else {
    http_response_code(500);
    echo "Error al guardar interacción.";
}

pg_close($conexion);
