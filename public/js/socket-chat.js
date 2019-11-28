var socket = io();

var params = new URLSearchParams(window.location.search);

if (!params.has('nombre') || !params.has('sala')) {
    // se redirecciona al index
    window.location = 'index.html';

    throw new Error('El nombre y la sala son necesarios');
}
var usuario = {

    nombre: params.get('nombre'),
    sala: params.get('sala')
};


socket.on('connect', function() {

    console.log('Conectado al servidor');

    socket.emit('entrarChat', usuario, function(resp) {
        console.log('Usuarios conectados', resp);
    });

    // Enviar información
    // socket.emit('crearMensaje', {
    //     usuario: 'Jorge',
    //     mensaje: 'Hola Mundo'

    // }, function(resp) {

    //     console.log('respuesta server: ', resp);

    // });

    // Enviar información
    socket.on('crearMensaje', function(mensaje) {
        console.log('Servidor:', mensaje);
    });

    // Escuchar cambios de usuarios
    // cuando un usuario entra o sale del chat
    socket.on('ListaPersona', function(personas) {
        console.log(personas);
    });

    // Mensajes privados
    socket.on('mensajePrivado', function(mensaje) {

        console.log('Mensaje Privado', mensaje);

    })


});