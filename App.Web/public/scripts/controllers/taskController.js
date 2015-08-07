app.controller('taskController', function (taskService, $scope, $rootScope) {
    $scope.tasks = taskService.query();
    $scope.newTask = { Title: '', Details: '', DueDate: '', CompletedDate: '' };

    $scope.createTask = function () {
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
        taskService.update({ id: task.Id }, task, function () {
            //$scope.tasks.splice(index, 1);
        });
    };

    $scope.removeTask = function (index) {
        var taskId = $scope.tasks[index].Id;
        console.log("Remove task: " + taskId);
        taskService.delete({ id: taskId }, function () {
            $scope.tasks.splice(index, 1);
        });
    };


});
