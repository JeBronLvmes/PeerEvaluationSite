var app = angular.module('courseApp', []);


app.controller('courseCon', function($scope, $http) {
    var selected_course_id = null;
    $scope.showDetail = function (prof_id, course_id) {
        $scope.curProfId = prof_id;
        $scope.curCourseId = course_id;
        if (course_id != null)
            $scope.isGroupTemp = $scope.isGroup;
            selected_course_id = course_id;
        $http.get("/professors/" + prof_id + "/courses/" + course_id)
            .then(function(response) {
                $scope.course_name = response.data.dept + ' ' +
                    response.data.number + ' - ' + response.data.name +
               ' (section ' + response.data.section + ')';
            });

        if ($scope.isGroup) {
            $scope.students = null;

            $http.get("/professors/" + prof_id + "/courses/" + course_id + "/groups")
                .then(function (response) {
                    $scope.groups = response.data;
                });
        } else {
            $scope.groups = null;

            $http.get("/professors/" + prof_id + "/courses/" + course_id + "/students")
                .then(function (response) {
                    $scope.students = response.data;
                });
        }
    };

    $scope.switchState = function () {
        $scope.isGroup = !$scope.isGroup;

        if ($scope.curCourseId != null)
            $scope.showDetail($scope.curProfId , $scope.curCourseId);

    };
    $scope.submitStudent = function() {
        console.log("student_id: "+ $scope.student_id);
        console.log("course_id: "+ selected_course_id);
        //$http.get("/courses_student/new/?course_id="+selected_course_id+"&student_id="+$scope.student_id)
    };
});