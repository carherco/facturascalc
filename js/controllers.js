

facturascalcApp.controller('DatesCtrl', function($scope, Miembros) {
    var today = new Date();
    
    $scope.factura = {
        importe: 0,
        fechaini: today,
        fechafin: today,
        dias: 1
    };
    
    $scope.miembros = Miembros.all();
    
    $scope.nuevomiembro = {
        nombre: '',
        fechaini: $scope.factura.fechaini,
        fechafin: $scope.factura.fechafin,
        dias: 1,
        importe: 0
    }
    
    $scope.add = function() {
        
        Miembros.add($scope.nuevomiembro);
        
        $scope.nuevomiembro = {
            nombre: '',
            fechaini: $scope.factura.fechaini,
            fechafin: $scope.factura.fechafin,
            dias: 1,
            importe: 0
        }
    };
    
    $scope.remove = function(miembro) {
      Miembros.remove(miembro);
    };
});

facturascalcApp.controller('DaysCtrl', function($scope) {
  
});
