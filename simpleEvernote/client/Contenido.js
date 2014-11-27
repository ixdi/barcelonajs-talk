
Session.setDefault('vistaActiva','lista');
Session.set('activeId', '');

/* 
 * Template Contenido
 */
Template.Contenido.helpers({
    esActiva: function (vista) {
        return (Session.equals('vistaActiva', vista)) ? 'active' : '';
    },
    vistaLista: function () {
        return Session.equals('vistaActiva', 'lista');
    },
    getNotaActiva: function () {
        return Notas.findOne({_id: Session.get('activeId')});
    }
});

Template.Contenido.rendered = function () {
    $('.modal-trigger').leanModal();
}

Template.Contenido.events({
    'click .tabs-wrp li a': function (ev) {
        ev.preventDefault();
        Session.set('vistaActiva', ev.currentTarget.id);
    }
});

/* 
 * Template NuevaNota
 */
Template.NuevaNota.events({
    'submit form': function (ev) {
        ev.preventDefault();
        var datosForm = {
            titulo: ev.target.titulo.value,
            nota: ev.target.nota.value,
            timestamp: new Date().getTime(),
            checked: false,
            owner: Meteor.userId()
        }
        Notas.insert(datosForm, function (err) {
            if (err) { console.log('Error'); return; }    
            else {
                Session.set('vistaActiva', 'lista');
            }
        });
    }
});

/* 
 * Template ListaNotas
 */
Template.ListaNotas.helpers({
    colNotas: function () {
        return Notas.find({}, {sort: {timestamp: 1}});
    },
    fecha: function (timestamp) {
        return moment(timestamp).format('L HH:mm:ss');
    }
});

Template.ListaNotas.events({
    'click .fa-trash-o': function (ev) {
        ev.preventDefault();
        var id = this._id;
        Notas.remove({_id: id});
    },
    'click .fa-check': function (ev) {
        ev.preventDefault();
        Notas.update({_id: this._id}, {$set: { checked: !this.checked}}); 
    },
    'click .muestraContenido': function (ev) {
        ev.preventDefault();
        Session.set('activeId', this._id);
        $('#lanza-nota').click();
    }
});
