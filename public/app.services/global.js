window.angular.module('ab.services.global', [])
  .factory('Global', function(){


		var currentUser = window.user;
        var headers = {

            bgImage: "../img/b/51.jpg",
            bgImageTitle: "Isla Santa Fé, Galapagos",
            subTitle: "",
            navbarEntries: []
                      };

 
        var global = {
            currentUser: currentUser,
            subTitle: headers.subTitle,
            navbarEntries: headers.navbarEntries,
            isSignedIn: isSignedIn,
            setModule: setModule,
            goToSignIn:goToSignIn,
            headers: headers
        };


		return global;


        //function currentUser() {
        //
        //    return current_user;
        //
        //}

        function goToSignIn() {
            window.location.href="signin"
        }

        function isSignedIn() {
            return !!currentUser;
        }

        function setModule(mod) {

            switch (mod) {
                case 'uso':
                    headers.subTitle = "Registro de Uso de los Servicios";
                    headers.navbarEntries = [

                        {
                            "title": "Carga Manual",
                            "link": "carga",
                             module: 'uso'
                        },
                        {
                            "title": "Carga Masiva",
                            "link": "upload.file"
                        }

                    ];
                    break;
                case 'poll':
                    headers.subTitle = "Generación de Encuestas de Calidad ";
                    headers.navbarEntries = [

                        {
                            "title": "Lista de Encuestas",
                            "link": "pollList"
                        },
                        {
                            "title": "Crear nueva",
                            "link": "pollList.create"
                        },
                        {
                            "title": "Contestar ejemplo",
                            "link": "survey/5b3971eb2854cfc80393feae"
                        }



                    ];
                    break;
                case 'visor':
                    headers.subTitle = "Visor Institucional";
                    headers.navbarEntries = [

                        {
                            "title": "Modelos",
                            "link": "visor.modelos"
                        },
                        {
                            "title": "Reportes ",
                            "link": "visor.report"
                        }

                    ];
                    break;
                case 'user':
                    headers.subTitle = "Administración de Usuarios";
                    headers.navbarEntries = [

                        {
                            "title": "Usuarios",
                            "link": "usuarios"
                        },
                        {
                            "title": "Perfiles ",
                            "link": "perfiles"
                        },
                        {
                            "title": "Acciones ",
                            "link": "acciones"
                        }

                    ];
                    break;
                case 'monitor':
                    headers.subTitle = "Monitoreo de Carga de Datos";
                    headers.navbarEntries = [

                        {
                            "title": "Auditoria",
                            "link": "auditoria"
                        },
                        {
                            "title": "Reportes ",
                            "link": "pentaho/auditoria"
                        }

                    ];
                    break;
                default:
                    headers.subTitle = "";
                    headers.navbarEntries = [];
            }



        }
 

  });