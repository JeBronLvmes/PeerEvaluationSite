/**
 * Created by Bin Chen on 7/23/18
 * Modified by Jeb Alawi on 7/23/18 - add courses, add groups
 *
 * @description
 *      Controller for angularjs. This controller makes api calls to the rails controller.
 *      The controller also handles dynamic changes to web pages, mainly the professor courses
 *      page.
 */

var app = angular.module('courseApp', []);

app.controller('courseCon', function($scope, $http) {

    /**
     * Initialize the controller.
     *
     * @author Bin Chen
     */
    $scope.init = function (prof_id) {
        $scope.clickedClass = false; //false until a class is clicked on, to disable groups from being clicked before a class is
        $scope.curProfId = prof_id;
        $scope.processing = false;
        $scope.isGroup = false;
        $scope.selectedStd = [];
        $scope.showCourses();
    };

    // Functions that Update View

    /**
     * Shows or hides the Add Course form.
     *
     * @author Jeb Alawi
     */
    $scope.toggleAddCourseForm = function() {
        $scope.showAddCourseForm = !$scope.showAddCourseForm;
    };

    /**
     * shows the detailed information of the class.
     *
     * @param {number} course_id        The id of the course
     *
     * @author Bin Chen
     */
    $scope.showDetail = function (course_id, course_name) {
        if (course_id != null) {
            $scope.clickedClass = true;
            $scope.isGroupTemp = $scope.isGroup;
            $scope.curCourseId = course_id;
            $scope.curCourseName = course_name;
        }

        $http.get("/professors/" + $scope.curProfId  + "/courses/" + course_id)
            .then(function(response) {
                $scope.course_name = response.data.dept + ' ' +
                    response.data.number + ' - ' + response.data.name +
               ' (Section: ' + response.data.section + ')';
            });

        $scope.updateView();
    };

    /**
     * get data from server and show all the courses from the professor.
     *
     * @author Bin Chen
     */
    $scope.showCourses = function () {
        $http({
            url: '/professors/' + $scope.curProfId + '/get_courses',
            method: 'GET'
        })
        .then(function (response) {
            $scope.courses = response.data;
        });
    };

    /**
     * Update the query student part's view.
     *
     * @author Jeb Alawi
     */
    $scope.updateQueryStdView = function (response) {
        $scope.studentsFind = response.data;
    };

    /**
     * Update the view about groups and the students in the groups.
     *
     * @author Bin Chen
     */
    $scope.updateCurGroupView = function () {
        $scope.groupStudents = [];
        $http.get("/professors/" + $scope.curProfId  + "/courses/" + $scope.curCourseId + "/groups")
            .then(function (response) {
                $scope.groups = response.data;

                $scope.getGroupStudents();
            });

        console.log($scope.groupStudents);
    };

    /**
     * Update the view about current professor's form.
     *
     * @author Josh Wright
     */
    $scope.updateCurProfFormView = function () {
        $http.get("/professors/" + $scope.curProfId  + "/professor_forms/" + $scope.curCourseId)
            .then(function (response) {
                $scope.forms = response.data;
            });
    };

    /**
     * Update the view about current students in the course.
     *
     * @author Bin Chen
     */
    $scope.updateCurStdView = function () {
        $http.get("/professors/" + $scope.curProfId  + "/courses/" + $scope.curCourseId + "/students")
            .then(function (response) {
                $scope.students = response.data;
            });
    };

    /**
     * Update the whole view.
     *
     * @author Bin Chen
     */
    $scope.updateView = function () {
        if ($scope.curCourseId != null) {
            if ($scope.isGroup) {
                $scope.students = null;

                $scope.updateCurGroupView();
            } else {
                $scope.groups = null;
            }

            $scope.updateCurStdView();
        }
    };

    // Other Controller Functions

    /**
     * Delete student from a group.
     *
     * @param {number} group_id        The id of the group
     * @param {number} student_id        The id of the student
     *
     * @author Bin Chen
     */
    $scope.deleteStudentFromGroup = function(group_id, student_id) {
        if(window.confirm('Remove this student?')) {
            $http({
                url: 'courses/' + $scope.curCourseId + '/groups/' + group_id + '/students/' + student_id,
                method: 'DELETE'
            })
            .then(function (response) {
                $scope.updateCurGroupView();
                window.alert("success");
            });
        }
    };

    /**
     * Get all of the students that currently enroll in the class.
     *
     * @author Bin Chen
     */
    $scope.getCurStudents = function () {
        $http.get("/professors/" + $scope.curProfId  + "/courses/" + $scope.curCourseId + "/students")
            .then(function (response) {
                $scope.students = response.data;
            });
    };

    /**
     * Add student to a group.
     *
     * @param {number} group_id        The id of the group
     * @param {number} student_id        The id of the student
     *
     * @author Bin Chen
     */
    $scope.addStudentToGroup = function(group_id, student_id) {
        if(window.confirm('Add this student to the group?')) {
            $http({
                url: 'courses/' + $scope.curCourseId + '/groups/' + group_id + '/students/' + student_id,
                method: 'POST',
                headers: {'Content-Type': 'application/json'}
            })
                .then(function (response) {
                        $scope.updateCurGroupView();
                    },
                    function (response) {
                        window.alert("fail");
                    });
        }
    };

    /**
     * Gets all of the students that is in the group.
     *
     * @author Bin Chen
     */
    $scope.getGroupStudents = function () {
        for (let i = 0; i < $scope.groups.length; ++i) {
            $http.get('courses/' + $scope.curCourseId + '/groups/' + $scope.groups[i].id + '/students')
                .then(function (response) {
                    $scope.groupStudents[i] = response.data;
                });
        }
    };

    /**
     * Switch the view of page between group view and students view.
     *
     * @author Bin Chen, Jeb Alawi
     */
    $scope.switchState = function () {
        $scope.isGroup = !$scope.isGroup;
        $scope.isGroupTemp = $scope.isGroup;
        $scope.studentsFind = null;
        $scope.updateView();

        if ($scope.isGroupTemp) {
            $scope.getCurStudents();
            $scope.selectedStd = [];
        }
    };

    /**
     * Adds a group to a class.
     *
     * @author Jeb Alawi
     * @modified_by Bin Chen
     */
    $scope.addGroup = function () {
        if(window.confirm('Create the group ' + $scope.group_name + '?')) {
            $http({
                url: 'courses/' + $scope.curCourseId + '/group',
                method: 'POST',
                data: {'name': $scope.group_name},
                headers: {'Content-Type': 'application/json'}
            })
                .then(function (response) {
                        $scope.updateCurGroupView();
                        window.alert("success");
                    },
                    function (response) {
                        window.alert("fail");
                    });
        }
    };

    /**
     * Deletes a group from the class
     *
     * @param id {number}   the id of the group to be deleted
     *
     * @author Jeb Alawi
     */
    $scope.deleteGroup = function(id) {
      if(window.confirm('Delete this group?')) {
          $http({
              url: 'courses/' + $scope.curCourseId + '/group/' + id,
              method: 'DELETE'

          })
          .then(function (response) {
              window.alert("success");
              $scope.updateCurGroupView();
          },
          function (response) {
              window.alert("fail");
          });
      }
    };

    /**
     * Delete a course to the professor course list.
     *
     * @author Jeb Alawi
     */
    $scope.deleteCourse = function(id) {
        if(window.confirm('Delete '+ $scope.curCourseName +'?')) {
            $http({
                url: 'destroy/' + id,
                method: 'DELETE'

            })
            .then(function (response) {
                $scope.init();
                $scope.showCourses();
                $scope.updateView();
            });
        }
    };

    /**
     * Adds a course to the professor course list.
     *
     * @author Jeb Alawi
     */
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

    /**
     * Add the student user choose to the specific group.
     *
     * @param {number} groupId      The group id
     *
     * @author Bin Chen
     */
    $scope.addStdToGroup = function (groupId) {
        console.log($scope.selectedStd[groupId]);

        if (window.confirm('Do you want to add this student?')) {
            $http({
                url: '/professors/' + $scope.curProfId + '/courses/' + $scope.curCourseId + '/add_group_student',
                method: "POST",
                data: {
                    'std_id': parseInt($scope.selectedStd[groupId]),
                    'group_id': groupId
                },
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            })
            .then(function (response) {
                    window.alert("success");
                    $scope.updateCurGroupView();
                },
                function (response) {
                    window.alert("fail");
                });
        }
    };

    /**
     * Add a student to the a class.
     *
     * @param {number} id      The student id
     *
     * @author Bin Chen
     */
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

    /**
     * Submit a query to find students.
     *
     * @author Bin Chen
     */
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

    /**
     * Delete a student from a course.
     *
     * @author Bin Chen
     */
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