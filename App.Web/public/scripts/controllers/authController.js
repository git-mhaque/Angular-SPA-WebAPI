app.controller("authController", function ($scope, $http, $rootScope, $location) {
    $scope.vmLogin = { username: "", password: "" };
    $scope.vmRegister = { UserName: "", Password: "", ConfirmPassword: "", Email: "" };

    $scope.errorMessage = "";

    $scope.login = function () {
        var loginData = {
            grant_type: "password",
            username: $scope.vmLogin.username,
            password: $scope.vmLogin.password
        };

        var transform = function (data) {
            return $.param(data);
        }

        $http.post("/Token", loginData, { headers: { "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8" }, transformRequest: transform })
            .success(function (data) {
                $scope.errorMessage = "";
                $rootScope.isAuthenticated = true;
                $rootScope.currentUser = data.userName;
                sessionStorage.setItem($rootScope.tokenKey, data.access_token);
                $location.path('/');
            })
            .error(function (data) {
                $scope.errorMessage = data.error_description;
            });

    };

    $scope.register = function () {
        $scope.vmRegister.ConfirmPassword = $scope.vmRegister.Password;

        $http.post("/api/Account/Register", $scope.vmRegister)
            .success(function (data) {
                $scope.errorMessage = "";
                $scope.vmRegister = { UserName: "", Password: "", ConfirmPassword: "", Email: "" };
                $location.path("/login");
            })
            .error(function (data) {
                $scope.errorMessage = data.ModelState;
            });


        ;
    };
});