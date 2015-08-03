var app = angular.module('taskManagerApp', ['ngRoute', 'ngResource']).run(function ($rootScope) {

    $rootScope.isAuthenticated = false;
	$rootScope.currentUser = '';
	$rootScope.tokenKey = 'accessToken';

	$rootScope.logout = function () {
    	//$http.get('auth/signout');
    	$rootScope.isAuthenticated = false;
    	$rootScope.currentUser = '';
    	sessionStorage.removeItem($rootScope.tokenKey);
	};
    
});


app.config(function($routeProvider){
	$routeProvider
		//the timeline display
		.when('/', {
			templateUrl: '/Public/main.html',
			controller: 'mainController'
		})
		//the login display
		.when('/login', {
		    templateUrl: '/Public/login.html',
			controller: 'authController'
		})
		//the signup display
		.when('/register', {
		    templateUrl: '/Public/register.html',
			controller: 'authController'
		});
});


app.factory('taskService', function($resource){
	return $resource('/api/tasks/:id');
});

app.controller('mainController', function(taskService, $scope, $rootScope){
	$scope.tasks = taskService.query();
	$scope.newTask = { Title: '', Details: '', DueDate: '', CompletedDate: '' };
	
	$scope.createTask = function() {
	    $scope.newTask.created_by = $rootScope.current_user;
	    $scope.newTask.created_at = Date.now();
	    taskService.save($scope.newTask, function () {
	        $scope.newTask = taskService.query();
	        $scope.newTask = { Title: '', Details: '', DueDate: '', CompletedDate: '' };
	    });
	};

	$scope.editTask = function (index) {
	    $scope.tasks[index].EditMode = !$scope.tasks[index].EditMode;
	};

	$scope.editTaskKeyPress = function (keyEvent, index) {
	    if (keyEvent.which === 13) {
	        $scope.tasks[index].EditMode = false;
	    }
	}

	$scope.removeTask = function (index) {
	    $scope.tasks.splice(index, 1);
	};


});

app.controller("authController", function($scope, $http, $rootScope, $location){
  $scope.vmLogin = { username: "", password: "" };
  $scope.vmRegister = { UserName: "", Password: "", ConfirmPassword: "", Email: "" };

  $scope.errorMessage = '';

  $scope.login = function () {
      var loginData = {
          grant_type: 'password',
          username: $scope.vmLogin.username,
          password: $scope.vmLogin.password
      };

      var transform = function (data) {
          return $.param(data);
      }

      $http.post("/Token", loginData, { headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' }, transformRequest: transform })
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

      $http.post('/api/Account/Register', $scope.vmRegister)
          .success(function (data) {
              $scope.errorMessage = "";
              $scope.vmRegister = { UserName: "", Password: "", ConfirmPassword: "", Email: "" };
              $location.path('/login');
          })
          .error(function (data) {
              $scope.errorMessage = data.ModelState;
          });


      ;
  };
});