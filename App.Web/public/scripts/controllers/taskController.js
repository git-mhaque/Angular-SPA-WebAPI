app.controller('taskController', function (taskService, $scope, $rootScope) {
    $scope.tasks = [];
    $scope.newTask = { Title: '', Details: '', DueDate: ''};
    $scope.showLoadingMessage = false;
    $scope.loadingMessage = "";


    $scope.refreshTaskList = function () {
        $scope.showLoadingMessage = true;
        $scope.loadingMessage = "Loading tasks...";
        taskService.query(function (data) {
            $scope.tasks = data;
            if ($scope.tasks.length == 0) {
                $scope.loadingMessage = "There is no outstanding task.";
            } else {
                $scope.showLoadingMessage = false;
            }
        });
    };

    $scope.refreshTaskList();

    $scope.createTask = function () {
        $scope.newTask.CreatedBy = $rootScope.currentUser;
        taskService.save($scope.newTask, function () {
            $scope.newTask = { Title: '', Details: '', DueDate: '' };
            $scope.refreshTaskList();
        });
    };

    $scope.editTask = function (index) {
        $scope.tasks[index].EditMode = true;
    };


    $scope.updateTask = function (index) {
        var task = $scope.tasks[index];
        console.log("Updating task: " + task.Title);
        taskService.update({ id: task.Id }, task, function () {
            $scope.tasks[index].EditMode = false;
        });
    };

    $scope.completeTask = function (index) {
        var task = $scope.tasks[index];
        task.IsComplete = true;
        console.log("Completing task: " + task.Title);
        taskService.update({ id: task.Id }, task, function () {
            $scope.refreshTaskList();
        });
    };

    $scope.deleteTask = function (index) {
        var task = $scope.tasks[index];
        console.log("Deleting task: " + task.Title);
        taskService.delete({ id: task.Id }, function () {
            //$scope.tasks.splice(index, 1);
            $scope.refreshTaskList();
        });
    };


});
