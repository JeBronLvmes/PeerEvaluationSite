/**
 * Created by Josh Wright on 7/24/18
 * Modified by Houyi Fan on 7/25/18
 *
 * @description
 *      Controller for angularjs. This controller makes api calls to the rails controller.
 *      The controller also handles dynamic changes to professor forms page.
 *
 */

var app = angular.module('evaluationApp', []);


app.controller('evaluationCon', function($scope, $http) {

    $scope.init = function (prof_id) {
        $scope.clickedClass = false; //false until a class is clicked on, to disable groups from being clicked before a class is
        $scope.curProfId = prof_id;
        $scope.processing = false;
        $scope.isProfessorForm = false;
        $scope.selectedCourse = null;
        $scope.formCont = true;
        $scope.showCourses();
    };

    // Functions that Update View

    $scope.toggleAddCourseForm = function() {
        $scope.showAddCourseForm = !$scope.showAddCourseForm;
    };

    $scope.showDetail = function (course_id) {
        if (course_id != null) {
            $scope.clickedClass = true;
            $scope.isGroupTemp = $scope.isProfessorForm;
            $scope.curCourseId = course_id;
        }

        $http.get("/professors/" + $scope.curProfId  + "/courses/" + course_id)
            .then(function(response) {
                $scope.course_name = response.data.dept + ' ' +
                    response.data.number + ' - ' + response.data.name +
                    ' (Section: ' + response.data.section + ')';
            });

        $scope.updateView();
    };

    $scope.showCourses = function () {
        $http({
            url: '/professors/' + $scope.curProfId + '/get_courses',
            method: 'GET'
        })
            .then(function (response) {
                $scope.courses = response.data;
            });
    };



    $scope.updateQueryStdView = function (response) {
        $scope.studentsFind = response.data;
    };

    $scope.updateCurGroupView = function () {
        $scope.groupStudents = [];
        $scope.studentEval = {};
        $scope.evalData = {};

        $http.get("/professors/" + $scope.curProfId  + "/courses/" + $scope.curCourseId + "/groups")
            .then(function (response) {
                $scope.groups = response.data;

                $scope.getGroupStudents();
            });
    };

    $scope.updateCurProfFormView = function () {
        $http.get("/professors/" + $scope.curProfId  + "/get_professor_forms/" + $scope.curCourseId)
            .then(function (response) {
                $scope.forms = response.data;
                $scope.selection = $scope.forms[0];
            });
    };

    $scope.updateView = function () {
        if ($scope.curCourseId != null) {
            if ($scope.isProfessorForm) {
                $scope.students = null;

                $scope.updateCurProfFormView();
                $scope.updateProfessorFormsView();
            } else {
                $scope.groups = null;

                $scope.updateCurGroupView();
            }
        }
    };

    $scope.updateProfessorFormsView = function (){
        $scope.formCont = true;
    };

    // Other Controller Functions

    $scope.getGroupStudents = function () {
        for (let i = 0; i < $scope.groups.length; ++i) {
            $http.get('courses/' + $scope.curCourseId + '/groups/' + $scope.groups[i].id + '/students')
                .then(function (response) {
                    $scope.groupStudents[i] = response.data;
                    $scope.studentEval[$scope.groups[i].id] = {};
                    $scope.evalData[$scope.groups[i].id] = {};

                    // Set the visibility of evaluation table for each students
                    for (let j = 0; j < response.data.length; ++j) {
                        $scope.studentEval[$scope.groups[i].id][response.data[j].id] = true;
                        $scope.evalData[$scope.groups[i].id][response.data[j].id] = null;
                    }
                });
        }
    };

    $scope.showEvaluations = function (groupId, stdId) {
        var hide = $scope.studentEval[groupId][stdId];
        console.log($scope.studentEval);

        if (hide && $scope.evalData[groupId][stdId] == null) {
            $scope.evalData[groupId][stdId] = [];

            $http({
                url: "/students/" + stdId+ '/courses/' + $scope.curCourseId + '/eval_complete',
                method: "GET"
            }).then(function(response) {
                $scope.evalData[groupId][stdId][0] = response.data;
            });

            $http({
                url: "/students/" + stdId+ '/courses/' + $scope.curCourseId + '/eval_incomplete',
                method: "GET"
            }).then(function(response) {
                $scope.evalData[groupId][stdId][1] = response.data;
            });
        }

        //console.log($scope.evalData);
        $scope.studentEval[groupId][stdId] = !hide;
    };

    $scope.switchState = function () {
        $scope.isProfessorForm = !$scope.isProfessorForm;
        $scope.isGroupTemp = $scope.isProfessorForm;
        $scope.updateView();
    };

    /**
     * Show/Hide the new evaluation form when clicking the Add Form button
     *
     * @author Houyi Fan
     */
 	$scope.toggleAddEvaluationForm = function() {
        $scope.showAddEvaluationForm = !$scope.showAddEvaluationForm;
    };

    $scope.getData = function (form) {
        $scope.tempTitle = form.title;
        $scope.tempData = form.student_form_info;
        console.log(form.student_form_info);
    };

    /**
     * Get data in the form and create a new evaluation form (professor form)
     *
     * @author Houyi Fan
     */
 	$scope.addEvaluation = function () {
        if(window.confirm('Create the form?')) {
            $http({
                url: "/professors/" + $scope.curProfId + "/create_professor_forms",
                method: 'POST',
                data: {
                    'title': $scope.new_evaluation_name,
                    'due_date': $scope.due_date,
                    'submission_date': $scope.submission_date,
                    'course_id': $scope.selectedCourse,
                    'html_form': $scope.new_form
                },
                headers: {'Content-Type': 'application/json'}
            })
                .then(function (response) {
                    window.alert("success");
                });
        }
        $scope.updateCurProfFormView();
        $scope.toggleAddEvaluationForm();
	};

    /**
     *
     * @param id
     *
     * @author Josh Wright on 7/24/2018
     */
    $scope.showForm = function (id) {
        $scope.formCont = false;

        $http({
            url: "/professors/" + $scope.curProfId + "/professor_forms/"+ $scope.curCourseId + "/form/"+ id,
            method: "GET"
        }).then(function(response) {
            $scope.form = response.data;
        });

    };

    /**
     *
     * @param form_id
     *
     * @author Josh Wright on 7/24/2018
     */
    $scope.assignForm = function (form_id){
        if(window.confirm('Assign this form?')) {
            $http({
                url: '/professors/' + $scope.curProfId + '/professor_forms/' + $scope.curCourseId + '/form/' + form_id + '/post_evaluation',
                method: 'POST',
                headers: {'Content-Type': 'application/json'}
            }).then(function (response) {
                window.alert("success");
            });
        }
    }
});


