var app = angular.module('studentEvaluationApp', []);


app.controller('studentEvaluationCon', function($scope, $http) {
    $scope.init = function (student_id) {
        $scope.curStudentId = student_id;
        $scope.completeEval = false;
    };


    $scope.completeEvaluation = function (id){
        var div = document.getElementById("evaluationCompleteForm");
        div.style.display = "none";
        $http({
            url: '/evaluations/' + id,
            method: 'GET'
        })
            .then(function (response) {
                $scope.courses = response.data;
            });
    }

});