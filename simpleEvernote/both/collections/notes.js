
Notas = new Mongo.Collection('notas');

Meteor.methods({
    'removeNota': function (id) {
        Notas.remove({_id: id});
    }
});
