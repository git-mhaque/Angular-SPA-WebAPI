var app = angular.module('MyApp', []);

app.controller("MyController", function AppController($scope, $http) {
    $scope.errorMessage = {};

    $scope.tokenKey = 'accessToken';

    $scope.result = "";
    $scope.user = "";

    $scope.registerEmail = "";
    $scope.registerPassword = "";
    $scope.registerPassword2 = "";

    $scope.loginEmail = "";
    $scope.loginPassword = "";

    $scope.showError = function showError(obj) {
        console.log(obj);
        $scope.errorMessage = {message: obj};
    }

    $scope.callApi = function () {
        $scope.result  = "";

        var token = sessionStorage.getItem($scope.tokenKey);
        var headers = {};
        if (token) {
            headers.Authorization = 'Bearer ' + token;
        }
        
        $http.get("/api/values", { headers: headers }).success(function (data) {
            $scope.errorMessage = {};
            $scope.result = data;                        
        }).error(function(data){
            $scope.showError(data);
        });

    }

    $scope.register = function () {
        $scope.result = "";

        var data = {
            Email: $scope.registerEmail,
            Password: $scope.registerPassword,
            ConfirmPassword: $scope.registerPassword2
        };

        $http.post("/api/Account/Register", data).success(function (data) {
            $scope.errorMessage = {};
            $scope.result = "Done!";
        }).error(function (data) {
            $scope.showError(data);
        });

    }

    $scope.login = function () {
        $scope.result = "";

        var loginData = {
            grant_type: 'password',
            username: $scope.loginEmail,
            password: $scope.loginPassword
        };

        var transform = function (data) {
            return $.param(data);
        }

        $http.post("/Token", loginData, { headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' }, transformRequest: transform}).success(function (data) {
            $scope.errorMessage = {};
            $scope.user = data.userName;
            sessionStorage.setItem($scope.tokenKey, data.access_token);
        }).error(function (data) {
            $scope.showError(data);
        });
    }

    $scope.logout = function () {
        $scope.errorMessage = {};
        $scope.user = "";
        sessionStorage.removeItem($scope.tokenKey);
    }


});

