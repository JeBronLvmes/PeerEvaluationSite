var app = angular.module('courseApp', []);

app.controller('courseCon', function($scope, $http) {
    $scope.showDetail = function (prof_id, course_id) {
        $scope.curProfId = prof_id;
        $scope.curCourseId = course_id;
        if (course_id != null)  $scope.isGroupTemp = $scope.isGroup;

        $http.get("/professors/" + prof_id + "/courses/" + course_id)
            .then(function(response) {
                $scope.course_name = response.data.dept + ' ' +
                    response.data.number + ' - ' + response.data.name +
               ' (section ' + response.data.section + ')';
            });

        if ($scope.isGroup) {

        } else {
            $http.get("/professors/" + prof_id + "/courses/" + course_id + "/students")
                .then(function (response) {
                    $scope.students = response;
                });
        }
    };

    $scope.switchState = function () {
        $scope.isGroup = !$scope.isGroup;

        if ($scope.curCourseId != null)
            $scope.showDetail($scope.curProfId , $scope.curCourseId);
    };
});