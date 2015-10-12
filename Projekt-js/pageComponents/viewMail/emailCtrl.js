app.controller('EmailCtrl', function($scope, $http, $location, restService) {
    var email_id = $location.path().split(":")[1];
    $scope.email = {};

    $scope.getEmail = function() {
        restService.getEmail(email_id).then(function(email){
            $scope.email = {
                id: email.data.id,
                title: email.data.title,
                date: email.data.received || email.data.sent ,
                sender: email.data.sender || "MailClient",
                receiver: email.data.receiver || "MailClient",
                content: email.data.content
            };
        });
    };

    $scope.deleteMail = function() {
        restService.deleteEmail(email_id).then(function(res){
            $location.path("/inbox");
        });
    };

    $scope.reply = function(){
    	$location.path( "/create/:"+$scope.email.id);
    };
});
