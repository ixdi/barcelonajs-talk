/*
 * Subscripción a la publicación de Notas
 */
Meteor.subscribe('todasNotas');

/*
 * Configuración del paquete accounts-ui
 */
Accounts.ui.config({
    passwordSignupFields: "USERNAME_ONLY"
});

/*
 * Configuración del locale de moment al arranque
 */
Meteor.startup(function () {
    moment.locale('es');
});
