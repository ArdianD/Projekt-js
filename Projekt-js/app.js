app = angular.module('myapp', ['ui.router']).config(function($stateProvider, $urlRouterProvider) {
    $stateProvider
	.state('home', {
		url: "/",
		templateUrl: "pageComponents/mailLists/inbox/inbox.html",
		controller: 'InboxCtrl'
	})
	.state('inbox', {
		url: "/inbox",
		templateUrl: "pageComponents/mailLists/inbox/inbox.html",
		controller: 'InboxCtrl'
	})
	.state('sent', {
		url: "/sent",
		templateUrl: "pageComponents/mailLists/sent/sent.html",
		controller: 'SentCtrl'
	})
	.state('create', {
		url: "/create",
		templateUrl: "pageComponents/newMail/create.html",
		controller: 'CreateCtrl'
	})
	.state('email', {
		url: "/view/:emailId",
		templateUrl: "pageComponents/viewMail/email.html",
		controller: 'EmailCtrl'
	})
	.state('reply', {
		url: "/create/:emailId",
		templateUrl: "pageComponents/newMail/create.html",
		controller: 'CreateCtrl'
	})
	.state('config', {
		url: "/config",
		templateUrl: "pageComponents/configuration/config.html",
		controller: 'ConfigCtrl'
	});
});

app.filter('highlight', function($sce) {
    return function(text, phrase) {
      if (phrase) {
      	text = text.replace(new RegExp('('+phrase+')', 'gi'),
        '<span class="marked">$1</span>');
  		}
      return $sce.trustAsHtml(text);
    };
});

app.directive('search', function () {
	return {
		restrict: 'E',
		templateUrl: 'pageComponents/mailSearch/search.html'
	};
});

app.directive('menu', function () {
    return {
        restrict: 'E',
        templateUrl: 'pageComponents/sidePanel/menu.html',
        controller: 'ConfigCtrl'
    };
});