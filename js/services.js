//angular.module('facturascalc.services', [])

facturascalcApp.factory('Miembros', function() {
  var today = new Date();

  // Some fake testing data
  var miembros = [{
    id: 0,
    nombre: 'Jose',
    fechaini: today,
    fechafin: today,
    dias: 1,
    participacion: 0,
    dentro: false
  }];

  return {
    all: function() {
      return miembros;
    },
    add: function(member) {
      miembros.push(member);
    },
    remove: function(member) {
      miembros.splice(miembros.indexOf(member), 1);
    },
    get: function(memberId) {
      for (var i = 0; i < miembros.length; i++) {
        if (miembros[i].id === parseInt(memberId)) {
          return miembros[i];
        }
      }
      return null;
    }
  };
});
