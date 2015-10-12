app.controller('InboxCtrl', function ($scope, $http, $location, $interval, emailService, restService) {
	$scope.inbox = [];
	var interval;

	$scope.getEmails = function () {
		restService.getEmails().then(function(res) {
            $scope.inbox = res.data;
        });
	};

	$scope.delete = function () {
		event.target.disabled = 'disabled';
		event.target.previousSibling.disabled = 'disabled';
		var id = this.mail.id;
		restService.deleteEmail(id).then(function(res) {
            $scope.getEmails();
        });
	};

	$scope.read = function () {
		if (event.target.type === 'submit') {
			return;
		}
		var id = this.mail.id;
		$location.path('/view/:' + id);
		if (!this.mail.read) {
			restService.setAsRead(id);
		}
	};

	$scope.respond = function(){
    	$location.path( "/create/:" + this.mail.id);
    };

	$scope.$on('$destroy', function(){
		emailService.clearIntervalAction();
	});

	$scope.getEmails();
	
	interval = $interval(function () { $scope.getEmails(); }, 1000 * emailService.getRefreshInterval());
	emailService.setIntervalAction(interval);
});
