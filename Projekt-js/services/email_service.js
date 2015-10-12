app.service('emailService', function($http, $window, $interval) {
    var localStorage = $window.localStorage;
    var defaultInterval = 10;
    var intervalAction;

    return {
        clearIntervalAction: function() {
            $interval.cancel(intervalAction);
        },

        setIntervalAction: function(action) {
            intervalAction = action;
        },

        getRefreshInterval: function() {
            console.log(localStorage.interval);
            console.log(defaultInterval);
            return parseInt(localStorage.interval) || defaultInterval;
        },
    };
});
