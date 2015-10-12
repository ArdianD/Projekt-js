app.controller('CreateCtrl', function($scope, $http, $location, restService) {
    var email_id = $location.path().split(":")[1];

    $scope.email = {
        receivers: [],
        title: null,
        content: null
    };
    
    $scope.sendEmail = function() {
	if ($scope.mailForm.$valid) {
            restService.sendEmail($scope.email).then(function(res) {
                $location.path("/sent");
            });
		}
    };
	
	$scope.validEmail = true;

    $scope.validateEmail = function() {
        var assignees = $scope.email.receivers;
        for (var i in assignees) {
            var re = /\S+@\S+\.\S+/;
            if (re.test(assignees[i])) {
                $scope.validEmail = true;
				document.getElementById("assigneesInput").style.backgroundColor = "green";
            } else {
                $scope.validEmail = false;
				document.getElementById("assigneesInput").style.backgroundColor = "rgba(255, 0, 0, 0.8)";
				break;
            }
        }
    };
	
	$scope.validateTitle = function() {
		var title = $scope.email.title;
		if(title != null) {
			document.getElementById("titleInput").style.backgroundColor = "green";
		} else {
			document.getElementById("titleInput").style.backgroundColor = "rgba(255, 0, 0, 0.8)";
		}
	}
	
	$scope.validateContent = function() {
		var content = $scope.email.content;
		if(content != null) {
			document.getElementById("contentInput").style.backgroundColor = "white";
		} else {
			document.getElementById("contentInput").style.backgroundColor = "rgba(255, 0, 0, 0.8)";
		}
	}
	
	

    if (email_id) {
        restService.getEmail(email_id).then(function(email) {
            $scope.email = {
                receivers: [].concat(email.data.sender),
                title: "RE: " + email.data.title,
                content: "\r\n ... " + email.data.sender + " wrote ...  \r\n"+email.data.content
            };
        });
    }

});
