var app = angular.module('evaluationApp', []);


app.controller('studentEvaluationCon', function($scope, $http) {
    $scope.init = function (student_id) {
        $scope.curStudentId = student_id;
        $scope.completeEval = false;
        $scope.evaluationCompleteForm = false;
    };


    $scope.completeEvaluation = function (id){
        //var div = document.getElementById("evaluationCompleteForm");
        //div.style.display = "none";

        $scope.evaluationCompleteForm = true;
        $http({
            url: '/evaluations/' + id,
            method: 'GET'
        })
        .then(function (response) {
            $scope.courses = response.data;
        });
    }

});