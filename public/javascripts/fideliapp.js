(function(){
	
	var fideliApp = angular.module('fideliApp',[]);

	fideliApp.controller('MainController', function($http){
		var self = this;
		self.title = "Fideliapp";

		$http.get('/users').success(function(data) {
		self.users = data;
		});
	});

})();