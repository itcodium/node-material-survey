app.directive("pageTitle", function () {
    return {
        replace: true,
        templateUrl: 'assets/templates/PageTitle.html',
        scope: { value: '=' }
    };
});

app.directive("pageFooter", function () {
    return {
        templateUrl: 'assets/templates/PageFooter.html',
        replace: true,
        scope: { modal: '=' }
    };
});

app.directive("modal", function () {
    return {
        templateUrl: 'assets/templates/Modal.html',
        replace: true,
        scope: { input: '=' }
    };
});
 