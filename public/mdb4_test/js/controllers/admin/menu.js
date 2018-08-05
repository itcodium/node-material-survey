
var page_menu= {
    ES: {
        titulo_agregar: "Agregar elemento",
        titulo_eliminar: "Eliminar elemento",
        borrar_nodo: "Borrar",
        nombre_nodo: "Nombre del nodo",
        modificar_nodo: "Modificar nodo",
        agregar_hijo: "Agregar nodo",
        agregar: "Agergar nodo al mismo nivel",
        obtener_nodos: "Obtener nodos",
        confimar_eliminar: "¿Realmente desea eliminar el nodo?",
        cancelar_eliminar: "Se ha cancelado la eliminacion.",

    },
    EN: {
        titulo_agregar: "EN_Agregar elemento",
        titulo_eliminar: "EN_Eliminar elemento",
        borrar_nodo: "EN_Borrar",
        nombre_nodo: "EN_Nombre del nodo",
        modificar_nodo: "EN_Modificar",
        agregar_hijo: "EN_Agregar nodo",
        agregar: "EN_Agregar nodo al mismo nivel",
        obtener_nodos: "EN_Obtener nodos",
        confimar_eliminar: "EN_¿Realmente desea eliminar el nodo?",
        cancelar_eliminar: "EN_Se ha cancelado la eliminacion.",
    },
    PT: {
        titulo: "PT_Agregar elemento",
        titulo_eliminar: "PT_Eliminar elemento",
        borrar_nodo: "PT_Borrar",
        nombre_nodo: "PT_Nombre del nodo",
        modificar_nodo: "PT_Modificar",
        agregar_hijo: "PT_Agregar nodo",
        agregar: "PT_Agregar nodo al mismo nivel",
        obtener_nodos: "PT_Obtener nodos",
        confimar_eliminar: "PT_¿Realmente desea eliminar el nodo?",
        cancelar_eliminar: "PT_Se ha cancelado la eliminacion.",

    },
    getPage: function () {
        return this[APP_PAGE_LANGUAGE.getLanguage()];
    }
};


app.controller('menuController', function ($scope,$http, AppControlText, Service_Caller, $httpParamSerializerJQLike) {
    $scope.AppControlText = AppControlText.getText();
    $scope.page_lang = page_perfil.getPage()

    $scope.operation={
        DELETE_NODE: "DELETE_NODE",
        UPDATE_NODE: "UPDATE_NODE",
        ADD_NODE_CHILD:"ADD_NODE_CHILD",
        ADD_NODE_SAME_LEVEL: "ADD_NODE_SAME_LEVEL",
        GET_NODES_DEPTH: "GET_NODES_DEPTH"
    }
    
    $scope.obtener_menu = function () { 
        Service_Caller.get(APP_MENU, {}, true).then(function (resp) {
            $scope.menu_edit = resp;
        });
    }
    $scope.obtener_menu();
    
    $scope.toggleMenu = function (item) {
        console.log("Item", item);
        item.show = !item.show;
    }
    $scope.AppControlText = AppControlText.getText();
    $scope.page_lang = page_menu.getPage()

    $scope.modalAddNode = new modal_template();
    $scope.modalAddNode.target = "AddItem"
    $scope.modalAddNode.form = "tplAddItem";
    $scope.modalAddNode.AppControlText = AppControlText.getText()
    $scope.modalAddNode.page_lang = $scope.page_lang
    $scope.modalAddNode.show = function (item,pOperation) {
        $scope.modalAddNode.model.operation = pOperation;
        $scope.item_edit = item;
        $("#" + this.target).modal('show');
        $scope.modalAddNode.model.id_menu = item.id_menu;

        if (pOperation == $scope.operation.UPDATE_NODE) {
            $scope.modalAddNode.model.node = item.title;
            $scope.modalAddNode.title = $scope.page_lang.modificar_nodo;
        } else {
            $scope.modalAddNode.title = $scope.page_lang.titulo_agregar;
        }
        $scope.modalAddNode.model.lang = APP_PAGE_LANGUAGE.getLanguage();
    }

    $scope.modalAddNode.click = function () {
        Service_Caller.set(APP_MENU, $httpParamSerializerJQLike($scope.modalAddNode.model), false).then(function (resp) {
            console.log("RESP", resp);
            if (resp.status == 'OK') {
                $scope.obtener_menu();
                $scope.modalAddNode.model = {};
                $scope.modalAddNode.hide();
            }
        });
    }

 
    $scope.modalDelete = new modal_template();
    $scope.modalDelete.target = "DeleteItem"
    $scope.modalDelete.form = "tplDeleteItem";
    $scope.modalDelete.title = $scope.page_lang.titulo_eliminar;
    $scope.modalDelete.AppControlText = AppControlText.getText()
    $scope.modalDelete.page_lang = $scope.page_lang
    $scope.modalDelete.click = function (item) {
        Service_Caller.set(APP_MENU, $httpParamSerializerJQLike($scope.modalDelete.model), false).then(function (resp) {
            if (resp.status == 'OK') {
                $scope.obtener_menu();
                $scope.modalDelete.hide();
            }
        });
    }
    $scope.modalDelete.show = function (item) {
        $scope.item_edit = item;
        $("#" + this.target).modal('show');
        $scope.modalDelete.model.operation = $scope.operation.DELETE_NODE;
        $scope.modalDelete.model.id_menu = item.id_menu;
        $scope.modalDelete.model.node = item.title;
    }
})

var modal_template=function(){
    this.target=""
    this.title = ""
    this.text = ""
    this.app_text = ""
    this.model={}
    this.click= function () {
        console.log("Click this.target", this.target);
    },
    this.show = function () {
        $("#" + this.target).modal('show');
    }
    this.hide= function () {
        $("#" + this.target).modal('hide');
    }
}
