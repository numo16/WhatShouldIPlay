var whatShouldIPlayApp = angular.module('whatShouldIPlayApp', ['angularLocalStorage']);

whatShouldIPlayApp.controller('GameCtrl', function($scope, $http, storage) {
	storage.bind($scope, 'games');
	storage.bind($scope, 'gameCount');
	storage.bind($scope, 'steamName');

	$scope.getGames = function() {
		$http({
			method: "POST",
			url: "/games",
			data: {
				"username": $scope.steamName
			},
			headers: {'Content-Type': 'application/json'}
		}).success(function(data, status){
			$scope.gameCount = data.count;

			$scope.games = [];

			angular.forEach(data.games, function(game){
				$scope.games.push(game);
			});
		}).error(function(data, status){
			alert(data);
		});
	};
});