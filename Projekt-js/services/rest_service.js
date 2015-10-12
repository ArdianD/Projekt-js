app.service('restService', function($http, $window, $interval) {
    var localStorage = $window.localStorage;
    var defaultInterval = 10;
    var intervalAction;
	
	return {
		
		getEmails: function() {
			var promise = $http.get('/emails');
            return promise.then(function(data) {
                return data;
            });
        },
		
		getEmail: function(id) {
			var promise = $http.get('/emails/' + id);
            return promise.then(function(data) {
                return data;
            });
        },
	
		getSent: function() {
				var promise = $http.get('/sent');
				return promise.then(function(data) {
					return data;
				});
			},
			
		deleteEmail: function(id) {
			var promise = $http.delete('/emails/' + id);
            return promise.then(function(data) {
                return data;
            });
        },
		
		sendEmail: function(email) {
            email.id = Math.floor((Math.random() * 10000000) + 10000000);
            email.sent = new Date().getTime();
			var promise = $http.post('/sent', email);

            return promise.then(function(data) {
                return data;
            });
        },
		
		setAsRead: function(id) {
            return $http.put('/emails/' + id, {
                read: true
            }).then(function(data) {
                return data;
            });
        }
	};
});