angular
  .module('app', [
    'ui.router'
  ])
  .controller('homeCtrl', ['$scope',function($scope) {
    $scope.title = "Home";
    //alert();
  
  }])

  .config(['$urlRouterProvider', '$stateProvider', function($urlRouterProvider, $stateProvider) {
    $urlRouterProvider.otherwise('/');
    $stateProvider
      .state('home', {
        url: '/',
        cache: false,
        templateUrl: "",
        controller: 'homeCtrl'
      })
   
  }])