
app.controller('tramitesList.ctrl', ['$scope',"$resource","$routeParams",'datacontext','SugarCargaPortal','Tramite',
	function ($scope, $resource,$routeParams,datacontext,SugarCargaPortal,Tramite) {
 		$scope.tramites={};
		//console.log("$scope.ciudadano",$scope.ciudadano);
		// 1001977030
		try {

			if(typeof  $routeParams.ce!='undefined') {

				var vCiudadano= $resource('/tramites');
				var vCiudadanoSugar= $resource('/ciudadanoSugar');

				$("#Container_Tramites").addClass("loadingContent");
				console.log("$routeParams.ce",$routeParams.ce);
				$scope.tramites=vCiudadano.query({cedulaCiudadanoRUC:$routeParams.ce},function(res) {

					vCiudadanoSugar.get({cedulaCiudadanoRUC:$routeParams.ce},function(res) {
						$scope.ciudadano=res.data;
						console.log("+++ ciudadano ++++",res);
					});
					for (var i = 0; i < res.length; i++) {
						(function getPoll(tramite) {
							$("#"+tramite._id).css("padding","10").addClass("loadingContent");


							 var query={institucion : "",taxonomia :   ""};
							 query.institucion=tramite.institucion.instSigla;
							if (typeof tramite.taxonomia.taxCodTaxonomia != 'undefined' ){
								var vTaxonomia=tramite.institucion.instSigla;
								var vPolllist= $resource('/polllist/encuestaPorTramite');
								var query={institucion : tramite.institucion._id ,taxonomia :   tramite.taxonomia._id};
								vPolllist.query(query,function(polllists){
									if(polllists.length>0){
										$scope.removeSpin(tramite._id);
										//$("#"+tramite._id).css("padding","4");
										// $("#"+tramite._id).append('<a href=/#!/pollListAnswer/'+polllists[0]._id+'> Encuesta </a>');
										 $("#"+tramite._id).append('<a class="label label-info"  href=/#!/pollListAnswer/'+polllists[0]._id+'>Encuesta *</a>');
									}else{
										 $scope.getDefaultDefaultPoll(tramite._id);
									}
								});
							}

						})(res[i]);
					//	$scope.addSpin(res[i]._id);
					}
					$("#Container_Tramites").removeClass("loadingContent");
					$("#container_search").show();
				});
			}else{
				alertar("No se ha encontrado ciudadano.", "warning");
			}
		}
		catch(err) {
			alertar(err.message, "danger");
		}



		$scope.removeSpin=function(pTramiteId){
			$("#"+pTramiteId).css("padding","0");
			$("#"+pTramiteId).css("border","0");
			$("#"+pTramiteId).removeClass("loadingContent");
		}

		$scope.addSpin=function(pTramiteId){
			$("#"+pTramiteId).addClass("loadingContent");
		}

		$scope.getDefaultDefaultPoll=function(tramite_id){
			//console.log("** getDefaultDefaultPoll ("+tramite_id+")**");

			if( typeof  $scope.defaultPoll=='undefined'){
				var vDefaultPoll= $resource('/polllist/encuestaPorDefecto');
				$scope.tramite= vDefaultPoll.query({}, function(poll) {
					console.log("+++ vDefaultPoll poll.length",poll.length)
					if(poll.length>0){
						$scope.defaultPoll=poll;
						console.log("$scope.defaultPoll",$scope.defaultPoll);
						//$("#"+tramite_id).attr("href", "/#!/pollListAnswer/"+poll[0]._id).html("Encuesta");
						$("#"+tramite_id).append('<a class="label label-info"  href=/#!/pollListAnswer/'+poll[0]._id+'>Encuesta</a>');
					}else{
						$("#"+tramite_id).css("background-color","transparent");
						$scope.removeSpin(tramite_id);
					}

				});
			}else{
				$("#"+tramite_id).attr("href", "/#!/pollListAnswer/"+$scope.defaultPoll[0]._id).html("Encuesta");
				$scope.removeSpin(tramite_id);
			}
		}

		//region Mensajes
		$scope.alerts = [];
		$scope.closeAlert = function (index) {
			if (index) {
				$scope.alerts.splice(index, 1);
			} else {
				$scope.alerts = [];
			}
		};

		function alertar(mensaje, type, timoff, strong, linkText, linkFunc) {
			datacontext.alertar($scope.alerts, mensaje, type, timoff, strong, linkText, linkFunc);
			refreshView();
		}

		function refreshView(obj) {
			if ($scope.$root.$$phase != '$apply' && $scope.$root.$$phase != '$digest') {
				$scope.$apply();
			}
		}
		//endregion Mensajes
	}]);

app.controller('tramiteItem.ctrl', ['$scope','$routeParams','$resource','socket','datacontext','TramitePortal',
	function ($scope, $routeParams, $resource,socket,datacontext,TramitePortal) {
		$scope.tramite={}


		$("#content_tramite").addClass("loadingContent");
		var vTramitePortal= $resource('/tramitePortal/:tramiteId');
		$scope.tramite= vTramitePortal.get({tramiteId:$routeParams.tramiteId}, function(res) {
			$("#content_tramite").removeClass("loadingContent");
			$("#content_tramite tramite").show();
		});



	}]);

