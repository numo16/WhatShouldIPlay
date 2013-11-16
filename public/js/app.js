function GameCtrl($scope, $http) {
	$scope.games = [];

	$scope.gameCount = $scope.games.length

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
}