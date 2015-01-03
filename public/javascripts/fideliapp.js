(function(){
	
	var fideliApp = angular.module('fideliApp',[]);

	fideliApp.controller('MainController', function($http){
		var self = this;
		self.title = "Fideliapp";

		$http.get('/users').then(function(response) {
			self.users = response.data;
			},
			function(errResponse) {
			console.error('Error while fetching notes');
		});
})();