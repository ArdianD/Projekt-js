app.controller('SentCtrl', function ($scope, $http, restService) {
	$scope.outbox = [];

	$scope.getSent = function () {
		restService.getSent().then(function(res) {
            $scope.outbox = res.data;
        });
	};

	$scope.getSent();
});