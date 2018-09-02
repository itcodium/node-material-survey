var moment = require('moment');
require("jquery");
import 'bootstrap';
import {API_METHOD}       from '../api.caller';

function formatNumber(nro,mil,decimal){
    if(nro==null){
        return nro;
    }

    var res= nro.toString().replace(/\B(?=(\d{3})+(?!\d))/g, mil);
    var aNro=res.split(decimal)
    var decimalPadding;
    if(typeof aNro[1]=='undefined'){
        aNro[1]=0
    }
    decimalPadding=paddingRight(aNro[1],"0",2)

    return aNro[0]+decimal+decimalPadding;
}

function paddingRight(s, c, n) {
    s=s.toString();
    if (! s || ! c || s.length >= n) {
        return s;
    }
    var max = (n - s.length)/c.length;
    for (var i = 0; i < max; i++) {
        s += c;
    }
    return s;
}
 

export var Components= (function () {
    function Grilla($http,$filter) {
        var _this=this;
        var order={desc:false}
        
        this.gridPager=null;
        this.totalItems=null;
        this.pager = {};
        this.setPage=function() {
            if(!_this.gridPager){
                _this.gridPager=new PagerService(
                    _this.totalItems, 
                    _this.config.query.page,
                    _this.config.query.limit
                );
            }
            if (_this.config.query.page  < 1 
                    || _this.config.query.page > _this.pager.totalPages) {
                return;
            }
            _this.pager = _this.gridPager.GetPager(
                    _this.totalItems, 
                    _this.config.query.page,
                    _this.config.query.limit );
        };

  
        
        _this.config= {
            url:"",
            promise:{},
            showNoRegister:false,
            filterShow:false,
            filtered:{},
            columns:{},
            filter: {
                options: { debounce: 500 }
            },
            query: {
                limit: 2,
                order: '',
                field: '',
                page: 1,
                where: ''
        },
        
            count: 0,
            queryParams:function(param){
                if (typeof param!='undefined'){
                    var params="";
                    var data={};
                    var obj=this.query;
                    var params=   "codigo="+ obj.codigo;
                    params=params+"&limit="+ obj.limit;
                    params=params+"&page="+ obj.page;
                    params=params+"&order="+ obj.order;
                    params=params+"&where="+ obj.where;

                    data.codigo=obj.codigo;
                    data.limit=obj.limit;
                    data.page=obj.page;
                    data.order= obj.order;
                    data.where= obj.where;
                    return data;
                }else{
                    return this.query;
                }
            }
        }
        this.onDelete=function(){}
        this.onAdd=function(){}
        this.onEdit=function(){}

        this.setPageLimit=function(param){
            _this.config.query.limit=param;
        }
        this.order=function(param){             // OK
            param.order.desc=!param.order.desc;
            _this.config.query.field=param.field;
            _this.config.query.order=param.order.desc==1?1:-1;
            this.HttpGetFromDB();
        }
        this.onPaginate= function(page, limit) {  // OK
            if(page==_this.config.query.page){
                return;
            }
            _this.config.query.page= page;
            this.HttpGetFromDB();
        };
        this.next=function(){
            if(_this.config.query.page+1 <=_this.pager.totalPages){
                _this.onPaginate(_this.config.query.page+1, null) 
            }
        }

        this.previous=function(){
            if(_this.config.query.page-1 >0){
                _this.onPaginate(_this.config.query.page-1, null) 
            }
            
        }
        
        /*
        this.callback=function(res){
            if(!param){
                if (res.data.docs && res.data.docs.length>0){
                    _this.data=res.data.docs;
                    _this.totalItems=res.data.count;
                    _this.setPage();
                }else{
                    console.log(res)
                }
            }else{
                param(res)
            }
            _this.config.showNoRegister=true;
            _this.config.loading=false;
            _this.afterGet();
        }
        */

       this.callback=function(res){
            if (res.data.docs && res.data.docs.length>0){
                _this.data=res.data.docs;
                _this.totalItems=res.data.count;
                _this.setPage();
            }
        }

        this.HttpGetFromDB=function(param,callback){
            _this.config.filtered=true;
            _this.config.showNoRegister=false;
            _this.config.loading=true;
            _this.config.promise=$http({
                    url: _this.config.url,
                    method: "GET",
                    params: _this.config.queryParams(param)
                }).then(function(res){
                    if(callback){
                        _this.callback=callback;
                        _this.callback(res);
                    }else{
                        _this.callback(res)
                    };
                    _this.config.showNoRegister=true;
                    _this.config.loading=false;
                    _this.afterGet();
                    
                }, function(error){
                _this.config.loading=false;
                alert("Error")
                // Toast.showError("Error al obtener datos de la grilla, "+error.data.message,'Error');
            });

        }
        this.afterGet=function(){

        }

        this.onCheck=function(index,param){
            // console.log("index,param, _this.multipleSelect ",_this.multipleSelect ,index,param)
            if(_this.multipleSelect!=true){
                for(var i=0;i<_this.data.length;i++){
                    if(!Object.is(_this.data[i], param)){
                        _this.data[i].selected=false;
                    }else{
                        if(_this.data[i].selected){
                            _this.selectedItem=_this.data[i];
                        }else{
                            _this.selectedItem=undefined;
                        }
                    }
                }
            }
            this.onAfterCheck(param);

        }
        this.onAfterCheck=function(){}
        

        this.showVal = function(value, filter) {
            if(value==null || typeof value=='undefined'){
                return "";
            }
            if (filter == 'date') {
                var fechaUpdate;
                if (typeof value!='object'){
                    fechaUpdate= value;
                }else{
                    fechaUpdate=value;
                }

                return (moment(fechaUpdate).parseZone()._isValid) ? moment(fechaUpdate).parseZone().format('YYYY-MM-DD') : fechaUpdate;
            }


            if (filter == 'jsondate'){

                if (value!=null){
                    var fecha=value.replace("Z"," ").replace("T"," ");
                    return moment(fecha).local().format('YYYY-MM-DD');
                }
                return null
            }



            if (filter == 'number'){
                // return  value.toLocaleString('en-IN');
                // $filter('number')(value, 2)
                // return value;
                 return formatNumber(parseFloat(value),",",".");
            }

            if (filter == 'int'){
                return $filter('number')(value, 0); //$filter('number')(value, 2);
            }
            if (filter == 'currency'){
                return $filter('currency')(value,'',2)
            }
            if (filter == 'coef'){
                return $filter('number')(value, 4);
            }
            return value;
        };
        this.filtering = function (element) {
            return true;
        }

    }
    return { Grilla: Grilla 
    }
})()



export var PagerService=function() {
    var service = {};
        service.GetPager = GetPager;
    return service;
 
    function GetPager(totalItems, currentPage, pageSize) {
        currentPage = currentPage || 1;
 
        pageSize = pageSize || 10;
 
        var totalPages = Math.ceil(totalItems / pageSize);
 
        var startPage, endPage;
        if (totalPages <= 10) {
            startPage = 1;
            endPage = totalPages;
        } else {
            if (currentPage <= 6) {
                startPage = 1;
                endPage = 10;
            } else if (currentPage + 4 >= totalPages) {
                startPage = totalPages - 9;
                endPage = totalPages;
            } else {
                startPage = currentPage - 5;
                endPage = currentPage + 4;
            }
        }
 
        var startIndex = (currentPage - 1) * pageSize;
        var endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1);
        var pages = _.range(startPage, endPage + 1);
 
        return {
            totalItems: totalItems,
            currentPage: currentPage,
            pageSize: pageSize,
            totalPages: totalPages,
            startPage: startPage,
            endPage: endPage,
            startIndex: startIndex,
            endIndex: endIndex,
            pages: pages
        };
    }
    // http://jasonwatmore.com/post/2016/01/31/angularjs-pagination-example-with-logic-like-google
}


export var ModalTemplate = function () {
    this.modal_name = ""
    this.title = ""
    this.text = ""
    this.app_text = ""
    this.model = {}
    this.items = {}
    this.calendar=[];
    this.enviroment="";
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
            // this.items.splice(this.select_index,1);
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
        this.model_aux = {};
        this.model = {};
    }
    this.cancel = function () {
        this.items[this.select_index] = angular.copy(this.model_aux)
        this.resetModel();
        this.onCancel();
    }
    this.open = function (method, index) {
        
        if (method == API_METHOD.EDIT || method == API_METHOD.DELETE) {
            if (typeof index !== 'undefined') {
                this.setItem(index)
            }
        } else {
            console.log("this.enviroment",this.enviroment)
            if(this.enviroment.toUpperCase()!='TEST'){
                this.resetModel();
            }
        }
        console.log("this.model",this.model,method, index)
        this.method = method;
        this.show();
    }

    this.show = function () {
        var id="#"+this.modal_name;
        $(id).modal('show');
       this.onShow();
    }
    this.setItem = function (index) {
        this.select_index = index;
        this.model_aux = angular.copy(this.items[index]);
        this.model = this.items[index]
    }

    this.setModel = function (data) {
        this.model = data;
    }
    this.setItems = function (data) {
        this.items = data;
    }
    
}
