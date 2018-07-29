window.angular.module('ab.services.global', [])
  .factory('Global', function(){



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



 
 

  });