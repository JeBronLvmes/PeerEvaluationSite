var app = angular.module('courseApp', []);


app.controller('courseCon', function($scope, $http) {

    // Functions that Update View

    $scope.toggleAddCourseForm = function() {
        $scope.showAddCourseForm = !$scope.showAddCourseForm;
    };

    $scope.showDetail = function (prof_id, course_id) {
        if (course_id != null) {
            $scope.isGroupTemp = $scope.isGroup;
            $scope.curProfId = prof_id;
            $scope.curCourseId = course_id;
        }

        $http.get("/professors/" + prof_id + "/courses/" + course_id)
            .then(function(response) {
                $scope.course_name = response.data.dept + ' ' +
                    response.data.number + ' - ' + response.data.name +
               ' (section ' + response.data.section + ')';
            });

        $scope.updateView();
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

    $scope.updateCurStdView = function () {
        $http.get("/professors/" + $scope.curProfId  + "/courses/" + $scope.curCourseId + "/students")
            .then(function (response) {
                $scope.students = response.data;
            });
    };

    $scope.updateView = function () {
        if ($scope.curCourseId != null) {
            if ($scope.isGroup) {
                $scope.students = null;

                $scope.updateCurGroupView();
            } else {
                $scope.groups = null;

                $scope.updateCurStdView();
            }
        }
    };

    // Other Controller Functions

    $scope.switchState = function () {
        $scope.isGroup = !$scope.isGroup;
        $scope.isGroupTemp = $scope.isGroup;
        $scope.updateView();
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
            });
        $scope.toggleAddCourseForm();
    };

    $scope.addStudent = function (id) {
        if (window.confirm('Do you want to add this student?')) {
            $http({
                url: '/professors/' + $scope.curProfId + '/courses/' + $scope.curCourseId + '/add_std',
                method: "POST",
                data: {'std_id': parseInt(id)},
                headers: {'Content-Type': 'application/json'}
            })
            .then(function (response) {
                    window.alert("success");
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