


app.controller('login', function ($scope, $http, $window, $httpParamSerializerJQLike, Login_Service_Caller) {
    $scope.action = API_URL +'login';
    $scope.form = {};
    $scope.form.usuario = '';
    $scope.form.password = "";
    
    $scope.languages = APP_PAGE_LANGUAGE.languages;
    $scope.app_lang = APP_PAGE_LANGUAGE.getSelectedLanguage();
    $scope.page = page_login.getPage()
    
    $scope.langChange = function (index) {
        $scope.app_lang = $scope.languages[index];
        APP_PAGE_LANGUAGE.setLanguage($scope.app_lang.code);
        $scope.page = page_login.getPage()
    }
    $scope.submit = function () {
        $scope.form.lang = $scope.app_lang.code;
        $scope.result = Login_Service_Caller.login(
            $scope.action,
            $httpParamSerializerJQLike($scope.form),
            "Error",
            "Bienvenido"
        );
    }

});

/**/

var page_login = {
    name: "login",
    EN: {
        title: "Please login into your account.",
        btnLogin: "Login",
        forgotPass: "Forgot Password?",
        notAccount: "Do not have an account?",
        createAccount: "Create an account"
    },
    ES: { title: "Ingresar al sistema" ,
        btnLogin: "Enviar" ,
        forgotPass: "Recuperar contraseña." ,
        notAccount: "No tiene una cuenta." ,
        createAccount: "Crear una cuenta." },
    PT: { title: "Please login into your account." ,
        btnLogin: "Login" ,
        forgotPass: "Recuperar contraseña." ,
        notAccount: "No tiene una cuenta." ,
        createAccount: "Crear una cuenta."
    },
    getPage: function () {
        return this[APP_PAGE_LANGUAGE.getLanguage()];
    }
};
