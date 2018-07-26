/**
 * Created by Josh Wright on 7/24/18
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
        $scope.studentEval = true;
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
        $http.get("/professors/" + $scope.curProfId  + "/courses/" + $scope.curCourseId + "/groups")
            .then(function (response) {
                $scope.groups = response.data;
            });
    };

    $scope.updateCurProfFormView = function () {
        $http.get("/professors/" + $scope.curProfId  + "/professor_forms/" + $scope.curCourseId)
            .then(function (response) {
                $scope.forms = response.data;
                $scope.selection = $scope.forms[0];

            });
    };

    $scope.updateCurStdView = function () {
        $http.get("/professors/" + $scope.curProfId  + "/courses/" + $scope.curCourseId + "/students")
            .then(function (response) {
                $scope.students = response.data;
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

                $scope.updateCurStdView();
                $scope.updateStudentEvaluationsView();
            }
        }



    };

    $scope.updateStudentEvaluationsView = function (){
        $scope.studentEval = true;
    };

    $scope.updateProfessorFormsView = function (){
        $scope.formCont = true;
    };

    // Other Controller Functions

    $scope.switchState = function () {
        $scope.isProfessorForm = !$scope.isProfessorForm;
        $scope.isGroupTemp = $scope.isProfessorForm;
        $scope.updateView();
    };

 	$scope.toggleAddEvaluationForm = function() {
        $scope.showAddEvaluationForm = !$scope.showAddEvaluationForm;
    };

 	$scope.addEvaluation = function () {
 		$http({
            url: "",
            method: 'POST',
            data: {
                'title': $scope.new_evaluation_name,
                'due_date': $scope.due_date,
                'submission_date': $scope.submission_date,
				'course_id': $scope.course_id,
                'html_form': $scope.new_form
            },
            headers: {'Content-Type': 'application/json'}
        });

        $scope.toggleAddEvaluationForm();
	};

    $scope.addGroup = function () {
        $http({
            url: 'courses/' + $scope.curCourseId + '/group',
            method: 'POST',
            data: { 'name': $scope.group_name },
            headers: {'Content-Type': 'application/json'}
        })
            .then(function(response) {
                    window.alert("success");
                    $scope.updateCurStdView();
                },
                function(response) {
                    window.alert("fail");
                });

    };

    $scope.addCourse = function () {
        $http({
            url: 'courses/',
            method: 'POST',
            data: {
                'name': $scope.new_course_name,
                'dept': $scope.course_dept,
                'number': $scope.course_number,
                'section': $scope.course_section
            },
            headers: {'Content-Type': 'application/json'}
        })
            .then(function (response) {
                $scope.showCourses();
            });

        $scope.toggleAddCourseForm();
    };

    $scope.addStudent = function (id) {
        if (window.confirm('Do you want to add this student?')) {
            $scope.processing = true;
            $http({
                url: '/professors/' + $scope.curProfId + '/courses/' + $scope.curCourseId + '/add_std',
                method: "POST",
                data: {'std_id': parseInt(id)},
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            })
                .then(function (response) {
                        window.alert("success");
                        $scope.processing = false;
                        $scope.updateView();
                    },
                    function (response) {
                        window.alert("fail");
                    });
        }
    };

    $scope.submitQuery = function () {
        var queryUrl = '/studentSearch?';
        var check = false;

        if ($scope.std_fname != null && $scope.std_fname != '') {
            check = true;
            queryUrl += 'first_name=' + $scope.std_fname;
        }

        if ($scope.std_lname != null && $scope.std_lname != '') {
            if (check)
                queryUrl += '&';

            check = true;
            queryUrl += 'last_name=' + $scope.std_lname;
        }

        if ($scope.std_dot != null && $scope.std_dot != '') {
            if (check)
                queryUrl += '&';

            queryUrl += 'dot_number=' + $scope.std_dot;
        }

        $http({
            url: queryUrl,
            method: "GET"
        })
            .then(function(response) {
                    $scope.updateQueryStdView(response);
                },
                function(response) {
                    window.alert("fail");
                });
    };


    $scope.deleteStudent = function (id) {
        if (window.confirm('Do you want to delete this student?')) {
            $http({
                url: '/professors/' + $scope.curProfId + '/courses/' + $scope.curCourseId + '/del_std/' + id,
                method: "DELETE"
            })
                .then(function(response) {
                        window.alert("success");
                        $scope.updateCurStdView();
                    },
                    function(response) {
                        window.alert("fail");
                    });
        }
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
     * @param student_id
     *
     * @author Josh Wright on 7/24/2018
     */
    $scope.viewEvaluations = function (student_id){
        $scope.studentEval = false;

        $http({
            url: "/students/" + student_id + "/evaluations_completed",
            method: "GET"
        }).then(function(response) {
            $scope.completedEvaluations = response.data;
        });

        $http({
            url: "/students/" + student_id + "/evaluations_incomplete",
            method: "GET"
        }).then(function(response) {
            $scope.incompleteEvaluations = response.data;
        });
    };

    /**
     *
     * @param form_id
     *
     * @author Josh Wright on 7/24/2018
     */
    $scope.assignForm = function (form_id){
        $http({
            url: "/professors/" + $scope.curProfId + "/courses/"+ $scope.curCourseId + "/students",
            method: "GET"
        }).then(function(response) {
            $scope.students = response.data;
            for(var i =0;i<$scope.students.length;i++){
                $http({
                    url:'/professors/'+$scope.curProfId+'/professor_forms/'+$scope.curCourseId +'/form/'+form_id+'/post_evaluation',
                    method: 'POST',
                    data: {'id': $scope.students[i].id },
                    headers: {'Content-Type': 'application/json'}
                })
            }
            window.alert("success");
        });
    }

});


