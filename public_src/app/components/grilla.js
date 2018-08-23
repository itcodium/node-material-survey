module.exports=function(app){

    var grillaCtrl=function($scope) {
        if( typeof this.data!='undefined'){
            $scope.grilla=this.data;
        }else{
            $scope.grilla={};
        }
        $scope.grilla.edit=this.btnEdit;
        $scope.grilla.add=this.btnAdd;
        $scope.grilla.delete=this.btnDelete;
        $scope.grilla.selectedGrid=this.selectedGrid;
        $scope.grilla.multipleSelect=(typeof  this.multipleSelect=='undefined'?true:this.multipleSelect);
        $scope.mostrarPaginacion= (typeof  this.mostrarPaginacion=='undefined'?true:this.mostrarPaginacion);
    }
    grillaCtrl.$inject = ['$scope'];
    

    app.component('grilla', {
        template: require('./grilla.html'),
        bindings: {
            data: '=',
            
            data: '=',
            orderByDB:'=',
            footData: '=',
            mostrarPaginacion:'=',
            btnEdit:'=',
            btnAdd:'=',
            btnDelete:'=',
            selectedGrid:'=',
            multipleSelect:'='
            
        },
        controller: grillaCtrl
    });
    

}


  