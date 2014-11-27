Meteor.publish('todasNotas', function () {
   return Notas.find({owner: this.userId}); 
});
