var app = angular.module('courseApp', []);


app.controller('courseCon', function($scope, $http) {
    var selected_course_id = null;
    $scope.showDetail = function (prof_id, course_id) {
        if (course_id != null) {
            $scope.isGroupTemp = $scope.isGroup;
            $scope.curProfId = prof_id;
            $scope.curCourseId = course_id;
        }
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

    $scope.update = function () {
        if ($scope.curCourseId != null)
            $scope.showDetail();
    }

    $scope.switchState = function () {
        $scope.isGroup = !$scope.isGroup;

        $scope.update();
    };

    $scope.submitStudent = function() {
        console.log("student_id: "+ $scope.student_id);
        console.log("course_id: "+ selected_course_id);

        $http({
            url: '/courses_student',
            method: "POST",
            data: { 'student_id' : parseInt($scope.student_id), 'course_id' : selected_course_id },
            headers: {'Content-Type': 'application/json' }
        })
        .then(function(response) {
               window.alert("success");
                $scope.update();
            },
        function(response) {
            window.alert("fail");
        });
    };
});