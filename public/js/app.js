var whatShouldIPlayApp = angular.module('whatShouldIPlayApp', ['angularLocalStorage']);

whatShouldIPlayApp.controller('GameCtrl', function($scope, $http, storage) {
	storage.bind($scope, 'games', {defaultValue: []});
	storage.bind($scope, 'gameCount', {defaultValue: 0});
	storage.bind($scope, 'steamName', {defaultValue: ""});
	storage.bind($scope, 'playingNow', {defaultValue: {name: ""}});

	$scope.getGames = function() {
		$http({
			method: "POST",
			url: "/games",
			data: {
				"username": $scope.steamName
			},
			headers: {'Content-Type': 'application/json'}
		}).success(function(data, status){
			if (data.count > $scope.gameCount) {
				angular.forEach(data.games, function(game){
					var found = false;

					angular.forEach($scope.games, function(storedGame){
						if (game.app_id == storedGame.app_id) {
							found = true;
						};
					});

					if (!found) {
						game.played = false;
						$scope.games.push(game);
					};
				});
			};

			$scope.gameCount = data.count;

			$scope.getNextToPlay();
		}).error(function(data, status){
			alert(data.error);
		});
	};

	$scope.getNextToPlay = function(){
		var selected = false;

		while(!selected){
			var index = Math.floor(Math.random() * $scope.gameCount);

			var game = $scope.games[index];

			if(!game.played){
				$scope.playingNow = game;
				selected = true;
			}
		}
	}

	$scope.playedIt = function() {
		angular.forEach($scope.games, function(game){
			if (game.app_id == $scope.playingNow.app_id) {
				game.played = true;
			};
		});

		$scope.getNextToPlay();
	}

	if($scope.steamName != "") {
		$scope.getGames();
	}
});