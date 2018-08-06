
var ModalTemplate = function () {
    this.modal_name = ""
    this.title = ""
    this.text = ""
    this.app_text = ""
    this.model = {}
    this.items = {}
    this.calendar=[];
    this.click = function () {
        console.log("Click this.modal_name", this.modal_name);
    },
    this.setModel=function(param){
        this.model=param;
    }

    this.onShow=function(){}
    this.onCancel=function(){}
 
    this.hide = function (form) {   
        // JSArrays.deleteFromArray(this.items, this.key_id, this.model[this.key_id])
        if (typeof this.form != 'undefined') { 
            this.form.$setPristine();
            this.form.$setUntouched();
        }
        $("#" + this.modal_name).modal('hide');

        if(this.method == API_METHOD.DELETE){
            this.items.splice(this.select_index,1);
        }
        if(this.method == API_METHOD.EDIT){
            console.log("EDIT")
        }
        if(this.method == API_METHOD.ADD){
            console.log("ADD")   
        }
    }

    this.resetModel = function () {
        this.select_index = -1;
        this.model_aux = null;
        this.model = null;
    }
    this.cancel = function () {
        this.items[this.select_index] = angular.copy(this.model_aux)
        this.resetModel();
        this.onCancel();
    }
    this.open = function (method, index) {
        console.log("method -> ",method)
        if (method == API_METHOD.EDIT || method == API_METHOD.DELETE) {
            if (typeof index !== 'undefined') {
                this.setItem(index)
            }
        } else {
            this.resetModel();
        }
        this.method = method;
        this.show();
    }

    this.show = function () {
       $("#" + this.modal_name).modal('show');
       this.onShow();
    }
    this.setItem = function (index) {
        this.select_index = index;
        this.model_aux = angular.copy(this.items[index]);
        this.model = this.items[index]
    }


    this.setItems = function (data) {
        this.items = data;
    }
    
}
