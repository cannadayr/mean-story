var App = angular.module('App', ["ui.router"]).
config(function($stateProvider, $urlRouterProvider){

	$urlRouterProvider.otherwise("/story");
	
	$stateProvider
	.state('story0', {
		url: "/story",
		templateUrl: "partials/story0.html"
	})
	.state('story0.story1', {
		url: "/1",
		templateUrl: "partials/story1.html",
	})
	.state('story0.story1.story2', {
		url: "/2",
		templateUrl: "partials/story2.html",
	})
	.state('story0.story1.story2.story3a', {
		url: "/3a",
		templateUrl: "partials/story3a.html",
	})
	.state('story0.story1.story2.story3a.story4a', {
		url: "/4a",
		templateUrl: "partials/story4a.html",
	})
	.state('story0.story1.story2.story3b', {
		url: "/3b",
		templateUrl: "partials/story3b.html",
	})
	.state('story0.story1.story2.story3b.story4b', {
		url: "/4b",
		templateUrl: "partials/story4b.html",
	});

/*
	.state('story2a', {
		url: "/story/2/a",
		templateUrl: "partials/story2a.html",
	})
	.state('story2b', {
		url: "/story/2/b",
		templateUrl: "partials/story2b.html",
	})
	.state('submit', {
		url: "/story/submit",
		templateUrl: "partials/submit.html",
	});
*/

	//controller: function($scope){
	//	console.log($scope.data);
	//}
});


App.controller('AppCtrl', ['$scope', '$http', '$state', function($scope, $http, $state){
	//$scope.test = "Angular+ui router is working";
	$scope.data = {};
	
	$scope.submit = function(){
		var html = "";
		html = html.concat(document.getElementById("story0_html").innerHTML); 
		html = html.concat(document.getElementById("story1_html").innerHTML); 
		html = html.concat(document.getElementById("story2_html").innerHTML); 
		html = html.concat(document.getElementById("story3_html").innerHTML); 
		html = html.concat(document.getElementById("story4_html").innerHTML); 
		
		//console.log($scope.data);
	
		var submit ={ 
			"email":$scope.data.email,
			"html":html
		}

		$http.post('/submit', submit).success(function(response){
			alert('Thank you for submitting!');	
		});
	
	//console.log(document.getElementById("storytxt").innerHTML);
		//console.log(submithtml);
		//console.log($scope.data);
	}

	$scope.next = function(){


		console.log($state.current);
	//	$state.go('.1');
//		switch($state.current.name){
//			case 'story0':
//				$state.go('story1');
//				break;	
//			case 'story1':
//				//console.log($scope.data);
//				switch($scope.data.ans0){
//					case 'OPT0':
//						$state.go('story2a');
//						break;
//					case 'OPT1':
//						$state.go('story2b');
//						break;
//				}
//				break;	
//			case 'story2a':
//				$state.go('submit');
//				break;
//			case 'story2b':
//				$state.go('submit');
//				break;
//			case 'submit':
//				console.log($scope.data);
//				$http.post('/submit', $scope.data).success(function(response){
//					console.log(response);
//				});
//				$state.go('story0');
//				break;
//		}
	};	
	$scope.prev = function(){
		switch($state.current.name){
			case 'story1':
				$state.go('story0');
				break;	
			case 'story2a':
				$state.go('story1');
				break;	
			case 'story2b':
				$state.go('story1');
				break;	
			case 'submit':
				$state.go('story1');
				break;	
		}
	};	
}]);
