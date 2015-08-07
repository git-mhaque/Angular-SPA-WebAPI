var app = angular.module('taskManagerApp', ['ngRoute', 'ngResource']).run(function ($rootScope,$http) {

    $rootScope.isAuthenticated = false;
	$rootScope.currentUser = '';
	$rootScope.tokenKey = 'accessToken';

	$http.defaults.headers.common["Authorization"] = 'Bearer ' + sessionStorage.getItem($rootScope.tokenKey);

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
			templateUrl: './Public/main.html',
			controller: 'mainController'
		})
		//the login display
		.when('/login', {
		    templateUrl: './Public/login.html',
			controller: 'authController'
		})
		//the signup display
		.when('/register', {
		    templateUrl: './Public/register.html',
			controller: 'authController'
		});
});


app.factory('taskService', function($resource){
    return $resource('/api/tasks/:id', null,
        {
            'update': { method: 'PUT' }
        });
});

app.controller('mainController', function(taskService, $scope, $rootScope){
	$scope.tasks = taskService.query();
	$scope.newTask = { Title: '', Details: '', DueDate: '', CompletedDate: '' };
	
	$scope.createTask = function() {
	    $scope.newTask.createdBy = $rootScope.currentUser;
	    $scope.newTask.createdDate = Date.now();
	    taskService.save($scope.newTask, function () {
	        $scope.tasks = taskService.query();
	        $scope.newTask = { Title: '', Details: '', DueDate: '', CompletedDate: '' };
	    });
	};

	$scope.editTask = function (index) {
	    $scope.tasks[index].EditMode = !$scope.tasks[index].EditMode;
	    if ($scope.tasks[index].EditMode == false) {
	        $scope.updateTask(index);
	    }
	    
	};

	$scope.editTaskKeyPress = function (keyEvent, index) {
	    if (keyEvent.which === 13) {
	        $scope.tasks[index].EditMode = false;
	        $scope.updateTask(index);
	    }
	};


	$scope.updateTask = function (index) {
	    var task = $scope.tasks[index];
	    console.log("Update task: " + task.Title);
	    taskService.update({id:task.Id},task, function () {
	        //$scope.tasks.splice(index, 1);
	    });
	};

	$scope.removeTask = function (index) {
	    var taskId = $scope.tasks[index].Id;
	    console.log("Remove task: " + taskId);
	    taskService.delete({id: taskId}, function () {
	        $scope.tasks.splice(index, 1);
	    });
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