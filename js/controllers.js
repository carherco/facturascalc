facturascalcApp.controller('DatesCtrl', function($scope, Miembros) {
    var today = new Date();
    $scope.mostrarParticipaciones = false;
    
    $scope.factura = {
        importe: 0,
        fechaini: today,
        fechafin: today,
        dias: 1
    };
    
    $scope.miembros = Miembros.all();
    
    $scope.nuevomiembro = {
        id: 0,
        nombre: '',
        fechaini: $scope.factura.fechaini,
        fechafin: $scope.factura.fechafin,
        dias: 1,
        participacion: 0,
        dentro: false
    }
    
    $scope.add = function() {
        
        Miembros.add($scope.nuevomiembro);
        
        $scope.nuevomiembro = {
            id: 0,
            nombre: '',
            fechaini: $scope.factura.fechaini,
            fechafin: $scope.factura.fechafin,
            dias: 1,
            participacion: 0,
            dentro: false
        }
    };
    
    $scope.remove = function(miembro) {
      Miembros.remove(miembro);
    };
    
    $scope.calcularParticipacionesFactura = function() {

        var miliseconds_in_a_day = 1000 * 3600 * 24;
        var timeDiff = $scope.factura.fechafin.getTime() - $scope.factura.fechaini.getTime();
        $scope.factura.dias = Math.ceil(timeDiff / miliseconds_in_a_day) + 1;      
        var gasto_dia = $scope.factura.importe / $scope.factura.dias;

        //Reseteamos las participaciones de los miembros,
        //y calculamos los participantes iniciales
        var num_participantes = 0;
        var entroantesiniciofactura = false;
        var saliodespuesiniciofactura = false;
        for (var i = 0; i < $scope.miembros.length; i++) {
            $scope.miembros[i].id = i;
            $scope.miembros[i].participacion = 0;
            entroantesiniciofactura = ($scope.factura.fechaini.getTime()-$scope.miembros[i].fechaini.getTime())>=0;
            saliodespuesiniciofactura = ($scope.miembros[i].fechafin.getTime()-$scope.factura.fechaini.getTime())>=0
            if(entroantesiniciofactura && saliodespuesiniciofactura){
                $scope.miembros[i].dentro = true;
                num_participantes++;
            } else {
                $scope.miembros[i].dentro = false;
            }
        }

        //Empieza el algoritmo
        var gasto_dia_participante = 0;
        var diff_fechas = 0;
        var fecha_in_miliseconds = $scope.factura.fechaini.getTime();
        for($d = 1; $d<=$scope.factura.dias; $d++) {
            //Si alguien entra en el grupo este día, se le incluye
            for (var i = 0; i < $scope.miembros.length; i++) {
                diff_fechas = $scope.miembros[i].fechaini.getTime()-fecha_in_miliseconds;
                if(diff_fechas >= 0 && diff_fechas < miliseconds_in_a_day) {
                    if(!$scope.miembros[i].dentro) {
                        $scope.miembros[i].dentro = true;
                        num_participantes++; 
                    }
                    
                }   
            }
            
            //Se le añade a cada participante el gasto de este día
            gasto_dia_participante = gasto_dia / num_participantes;
            for (var i = 0; i < $scope.miembros.length; i++) {
                if($scope.miembros[i].dentro) {
                    $scope.miembros[i].participacion += gasto_dia_participante;
                }
            }
            
            //Si alguien sale del grupo este día, se le excluye para el resto de días
            for (var i = 0; i < $scope.miembros.length; i++) {
                diff_fechas = $scope.miembros[i].fechafin.getTime()-fecha_in_miliseconds;
                if(diff_fechas >= 0 && diff_fechas < miliseconds_in_a_day) {
                    if($scope.miembros[i].dentro) {
                        $scope.miembros[i].dentro = false;
                        num_participantes--;
                    }
                    
                }   
            }
            
            //Para ajustar la fecha en la siguiente vuelta
            fecha_in_miliseconds += miliseconds_in_a_day;
        }
   
        $scope.mostrarParticipaciones = true;
    }
});

facturascalcApp.controller('DaysCtrl', function($scope) {
  
});
