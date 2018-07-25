var app = angular.module('evaluationApp', []);


app.controller('evaluationCon', function($scope, $http) {

    $scope.init = function (prof_id) {
        $scope.clickedClass = false; //false until a class is clicked on, to disable groups from being clicked before a class is
        $scope.curProfId = prof_id;
        $scope.processing = false;
        $scope.isProfessorForm = false;
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
                    ' (section ' + response.data.section + ')';
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
            } else {
                $scope.groups = null;

                $scope.updateCurStdView();
            }
        }
    };

    // Other Controller Functions

    $scope.switchState = function () {
        $scope.isProfessorForm = !$scope.isProfessorForm;
        $scope.isGroupTemp = $scope.isProfessorForm;
        $scope.updateView();
    };

 	$scope.addEvaluation = function () {
		$http({
                url: "/professors/" + $scope.curProfId + "/professor_forms/new/",
                method: "GET"
        }).then(function(response) {
				window.location.href = "/professors/" + $scope.curProfId + "/professor_forms/new/";
		});
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
});
