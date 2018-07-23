var app = angular.module('myApp', []);

app.controller('myCon', function($scope, $http) {
    $scope.showDetail = function (prof_id, course_id) {
        $http.get("/professors/" + prof_id + "/courses/" + course_id)
            .then(function(response) {
                $scope.course_name = response.data.name;
                $scope.course_dept = response.data.dept;
                $scope.course_number = response.data.number;
                $scope.course_id = response.data.course_id;
            });
        var div = document.getElementById("course_content");
        div.style.display = "block";
    };
    $scope.showFromDetails = function (prof_id, course_id) {
        $http.get("/professors/" + prof_id + "/professor_forms/" + course_id)
            .then(function(response) {
                $scope.course_name = response.data.name;
                $scope.course_dept = response.data.dept;
                $scope.course_number = response.data.number;
                $scope.course_id = response.data.course_id;
            });
        var div = document.getElementById("course_content");
        div.style.display = "block";
    };

});