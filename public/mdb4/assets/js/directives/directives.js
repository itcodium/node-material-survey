app.directive("themeSettings", function () {
    return {
        templateUrl: 'mdb4/assets/templates/ThemeSettings.html',
        replace: true,
        scope: { value: '=' }
    };
});

app.directive("pageTitle", function () {
    return {
        replace: true,
        templateUrl: 'mdb4/assets/templates/PageTitle.html',
        scope: { value: '=' }
    };
});

app.directive("pageFooter", function () {
    return {
        templateUrl: 'mdb4/assets/templates/PageFooter.html',
        replace: true,
        scope: { value: '=' }
    };
});

app.directive("pageNavigation", function () {
    return {
        templateUrl: 'mdb4/assets/templates/PageNavigation.html',
        replace: true,
        scope: { value: '=' },
        link: function ($scope, element, attrs) {
          }
        
    };
});



app.directive("menuUser", function () {
    return {
        templateUrl: 'mdb4/assets/templates/MenuUser.html',
        replace: true,
        scope: { value: '=' }
    };
});


app.directive("modal", function () {
    return {
        templateUrl: 'mdb4/assets/templates/Modal.html',
        replace: true,
        scope: { value: '=' }
    };
});