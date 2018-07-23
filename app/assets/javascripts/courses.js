function coursesAppInitializer ($scope, initializer){
    $scope.course = initializer;
}
function TodoCtrl($scope) {
$scope.totalTodos = 4;
}
coursesController.$inject = ['$scope','coursesAppInitializer'];