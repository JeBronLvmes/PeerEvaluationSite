var app = angular.module('studentCourseApp', []);

app.controller('studentCon', function($scope, $http) {
    $scope.init = function (student_id) {
        $scope.curStdId = student_id;
        $scope.processing = false;
        $scope.showContent = false;
        $scope.showCourses();
    };

    // sets courses variable to course list
    $scope.showCourses = function () {
        $http({
            url: "/students/" + $scope.curStdId  + "/courses/",
            method: 'GET'
        })
            .then(function (response) {
                $scope.courses = response.data;
            });
    };

    // shows the information on the class
    $scope.showDetail = function (course_id, course_name) {
        if (course_id != null) {
            $scope.curCourseId = course_id;
            $scope.curCourseName = course_name;
            $scope.showContent = true;
        }

        // get course name and set variable "course_name"
        $http.get("/students/" + $scope.curStdId  + "/courses/" + course_id)
            .then(function(response) {
                $scope.course_name = response.data.dept + ' ' +
                    response.data.number + ' - ' + response.data.name +
                    ' (Section: ' + response.data.section + ')';
            });
        $http.get('/students/' + $scope.curStdId + '/courses/' + course_id + '/group/')
            .then(function(response) {
                $scope.group_name = response.data.name
            });

        $scope.updateView();
    };

    $scope.updateView = function () {
        if ($scope.curCourseId != null) {

        }
    };

});