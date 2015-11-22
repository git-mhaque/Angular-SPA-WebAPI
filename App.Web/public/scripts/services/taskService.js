app.factory("taskService", function ($resource) {
    return $resource("/api/tasks/:id", null,
        {
            "update": { method: "PUT" }
        });
});