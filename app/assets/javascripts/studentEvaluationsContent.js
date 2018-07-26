var app = angular.module('studentEvaluationApp', []);


app.controller('studentEvaluationCon', function($scope, $http) {
    $scope.init = function (student_id) {
        $scope.curStudentId = student_id;
    };
    $scope.completeEvaluation = function (id){

    }

}