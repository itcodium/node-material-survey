
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

    this.init=function(){}

    this.show = function () {
        this.model_aux={};
        $("#" + this.modal_name).modal('show');
        $('.picker__header').hide();
        console.log("show -> model", this.model)
        this.calendar.forEach(function(item){
            console.log("$('#'+item).",$('#'+item).val())
            if($('#'+item).val()!=''){
                $('#'+item).pickadate({  format: 'yyyy/mm/dd',  
                                    selectMonths: true,
                                    selectYears: true,
                                    formatSubmit: 'yyyy/mm/dd',   });
            }

        })
        this.init();
    }



    this.initCalendar = function (id) {
        this.calendar.push(id);
    }

    
        

    this.hide = function (form) {   
        // JSArrays.deleteFromArray(this.items, this.key_id, this.model[this.key_id])
        if (typeof this.form != 'undefined') { 
            this.form.$setPristine();
            this.form.$setUntouched();
        }
        $("#" + this.modal_name).modal('hide');

        console.log("hide form",form)
         if(form == API_METHOD.DELETE){
            // this.items.splice(this.select_index,1);
        }
    }

    this.resetModel = function () {
        this.select_index = -1;
        this.model_aux = {};
        this.model = {};
    }
    this.cancel = function () {
        this.items[this.select_index] = angular.copy(this.model_aux)
        this.resetModel();
    }
    this.open = function (method, index) {
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

    this.setItems = function (data) {
        this.items = data;
    }
    this.setItem = function (index) {
        this.select_index = index;
        this.model_aux = angular.copy(this.items[index]);
        this.model = this.items[index]
        
        var model=this.model;
        console.log("model", model)
        // Si hay algun calendario en el formulario lo inicializa desde aca
        Object.keys(this.model).forEach(function(item){
            if(item.indexOf("vigencia")>=0 || item.indexOf("desde")>=0){
                model[item]=model[item].substr(0, 10).replace(/-/g, "/");                
                $('#'+item).val(model[item]);
            }
        });
        
    }
}
