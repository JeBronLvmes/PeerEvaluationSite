var app = angular.module('myApp', []);

app.controller('myCon', function($scope, $http) {
    $scope.showDetail = function (prof_id, course_id) {
        $http.get("/professors/" + prof_id + "/courses/" + course_id)
            .then(function(response) {
                $scope.res = response.data;
            });
    };
});