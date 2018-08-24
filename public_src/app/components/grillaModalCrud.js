
export var SurveyApp=function (
                    $scope,$http,$filter,
                    ModalTemplate,ApiCaller,AppServiceCaller,AplicationText)
    {
    
        var _this=this;
        this.api =null;
        this.grid=null;
        this.modal=null;
        $scope.AplicationText = AplicationText;

        this.setApiCaller=function(param){
            _this.api=new ApiCaller(param);
            _this.api.setCaller(AppServiceCaller)
        }
        this.createModal=function(modalName,modalTitle,model_id,form){
            _this.modal = new ModalTemplate();
            _this.modal.modal_name     = modalName ;   
            _this.modal.title          = modalTitle;   
            _this.modal.key_id         = model_id;     
            _this.modal.template       = form;        
            _this.modal.pageText       = $scope.pageText;
            _this.modal.AplicationText = AplicationText;
            _this.modal.submit=_this.modalSubmit;
            
        }
        this.afterCreateGrid=function(){

        }
        this.createGrid=function(Components,config){
            _this.grid=new Components.Grilla($http,$filter);
            _this.grid.config.url=config.url ;
            _this.grid.config.columns=config.columns;
            _this.grid.setPageLimit(config.limit)

            _this.grid.onDelete=function(){
                _this.modal.model=_this.grid.selectedItem;
                _this.modal.open('DELETE'); 
            }
    
            _this.grid.onAdd=function(){
                _this.modal.open('ADD'); 
            }
            _this.grid.onEdit=function(){
                _this.modal.model=_this.grid.selectedItem;
                _this.modal.open('EDIT'); 
            }
        }

        
        this.modalSubmit = function (form) {
            this.form = form;
            if (form.$valid) {
                if (this.method == "EDIT") {
                    _this.api.put(_this.modal.model._id, _this.modal.model, Put_callBack);
                }
                if (this.method == "DELETE") {
                    _this.api.delete(_this.modal.model._id, Delete_callBack);
                }

                if (this.method == "ADD") {
                    _this.api.post(_this.modal.model, Post_callBack);
                }
            }
        }

        var Put_callBack=function(res){
            if (!_this.api.isError(res)) {
                if (res.statusText != 'OK') {
                    toastr.error(res.data.message);
                } else {
                    _this.modal.hide();
                }
            }
        }

        var Post_callBack=function(res){
            if (!_this.api.isError(res)) {
                if (res.statusText != 'OK') {
                    toastr.error(res.data.message);
                } else {
                    _this.grid.HttpGetFromDB();
                    _this.modal.hide();
                }
            }
        }
        
        var Delete_callBack=function(res){
            if (!_this.api.isError(res)) {
                if (res.statusText != 'OK') {
                    toastr.error(res.data.message);
                } else {
                    _this.modal.hide();
                    _this.grid.selectedItem=null;
                    _this.grid.HttpGetFromDB();
                    toastr.success(res.data.message);
                }
            }
        }
    }
    