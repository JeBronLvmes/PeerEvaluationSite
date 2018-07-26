/**
 * Created by Jeb Alawi on 7/25/18
 *
 * @description
 *      Controller for angularjs. This controller makes api calls to the rails controller.
 *      The controller also handles dynamic changes to web pages, mainly the student courses
 *      page.
 */

var app = angular.module('studentCourseApp', []);

app.controller('studentCon', function($scope, $http) {
    /**
     * Initializes the controller
     *
     * @param student_id {number}    the student's id
     *
     * @author Bin Chen
     */
    $scope.init = function (student_id) {
        $scope.curStdId = student_id;
        $scope.processing = false;
        $scope.showContent = false;
        $scope.showCourses();
    };

    /**
     *
     * Shows course info when the course is clicked on
     *
     * @author Bin Chen
     *
     * @modified_by Jeb Alawi
     */
    $scope.showCourses = function () {
        $http({
            url: "/students/" + $scope.curStdId  + "/courses/",
            method: 'GET'
        })
            .then(function (response) {
                $scope.courses = response.data;
            });
    };

    /**
     * Displays course information (group/evaluations)
     *
     * @param {number} course_id    the id of the course whose info is to be displayed
     * @param {number} course_name  the name of the course to be displayed
     *
     * @author Bin Chen
     */
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

    };


});