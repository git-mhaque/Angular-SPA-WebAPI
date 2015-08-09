app.controller('taskController', function (taskService, $scope, $rootScope) {
    $scope.tasks = taskService.query();
    $scope.newTask = { Title: '', Details: '', DueDate: ''};

    $scope.createTask = function () {
        $scope.newTask.CreatedBy = $rootScope.currentUser;
        taskService.save($scope.newTask, function () {
            $scope.tasks = taskService.query();
            $scope.newTask = { Title: '', Details: '', DueDate: ''};
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
            $scope.tasks = taskService.query();
        });
    };

    $scope.deleteTask = function (index) {
        var task = $scope.tasks[index];
        console.log("Deleting task: " + task.Title);
        taskService.delete({ id: task.Id }, function () {
            $scope.tasks.splice(index, 1);
        });
    };

    $scope.refreshTaskList = function () {
        $scope.tasks = taskService.query();
    };

});
