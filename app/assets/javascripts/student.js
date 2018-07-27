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
        $scope.showForm = false;
        $scope.evaluation = null;
        $scope.form_title = null;
        $scope.form_questions = null;
        $scope.evaluationId = null;
        $scope.showCourses();
    };

    /**
     * Show or hide the form to complete evaluations
     *
     * @author Jeb Alawi 7/26/18
     */
    $scope.toggleEvaluationForm = function () {
        $scope.showForm = !$scope.showForm;
    };

    /**
     * Brings up form to complete the evaluation
     *
     * @param {number} id   the id of the evaluation form
     *
     * @author Jeb Alawi 7/26/18
     */
    $scope.completeEvaluation = function(id){
        $scope.showForm = true;
        $http({
            url: '/students/' + $scope.curStdId  + '/courses/' + $scope.curCourseId + '/eval/' + id,
            method: 'GET'
        })
            .then(function (response) {
                $scope.evaluation = response.data;
                $scope.form_title = response.data.title;
                $scope.form_questions = response.data.professor_form_info;
                $scope.evaluationId = response.data.id;

            });

    };

    /**
     * submits student's answers to evaluation
     *
     * @author Jeb Alawi 7/26/18
     */
    $scope.submitEvaluation = function(){
        console.log($scope.form_questions);
        if (window.confirm("Are you sure you want to submit?")) {

            if ($scope.evaluationId != null) {
                $http({
                    url: '/students/' + $scope.curStdId + '/courses/' + $scope.curCourseId + '/eval/' + $scope.evaluationId,
                    method: 'POST',
                    data: {
                        'student_form_info': $scope.form_questions,
                        'isCompleted': true,
                    },
                    headers: {'Content-Type': 'application/json'}
                })
                    .then(function (response) {
                        $scope.toggleEvaluationForm();
                        $scope.evaluation = null;
                        $scope.form_title = null;
                        $scope.form_questions = null;
                        $scope.evaluationId = null;
                        $scope.updateFormsView();
                    });
            } else {
                window.alert("Oops a problem occurred.")
            }
        }
    };

    /**
     * Gets the list of incomplete evaluations
     *
     * @author Jeb Alawi 7/26/18
     */
    $scope.updateFormsView = function () {
      // 'students/:student_id/evaluations_incomplete'
        $http({
            url: '/students/' + $scope.curStdId + '/courses/' + $scope.curCourseId + '/eval_incomplete',
            method: 'GET'
        })
            .then(function (response) {
                $scope.evaluations = response.data;
                if ($scope.evaluations.length == 0){
                    $scope.incompleteForms = false;
                } else{
                    $scope.incompleteForms = true;
                }
            });
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
            $scope.updateFormsView();
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
                if (response.data == null){
                    $scope.group_name = "";
                }
                $scope.group_name = response.data.name;

            });

    };


});