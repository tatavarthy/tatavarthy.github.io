

var app = angular.module('myApp', []);
app.controller('myCtrl', function($scope,$http) {
	$scope.tiles=[];
	$scope.cart = [];
	

    $http.get("https://api.myjson.com/bins/qhnfp")
	  .then(function(response) {
	    $scope.tiles = response.data;
	  });

	$scope.calculateCost =function(){
		$scope.cost = 0;
		for(var i=0;i<$scope.cart.length;i++)
	  	{
	  		$scope.cost = $scope.cost + ($scope.cart[i].quantity *  $scope.cart[i].price);
	  	}
	}

	$scope.goToCart = function(){
		   window.location = '/order-summary.html';
	}
		
  	$scope.addToCart = function(event){

  		$scope.showMsg = true;
	  	for(var i=0;i<$scope.tiles.length;i++)
	  	{
	  		if(event.target.id == $scope.tiles[i].id)
	  		{
	  			$scope.cartItem = {};
	  			$scope.cartItem.id = $scope.tiles[i].id;
	  			$scope.cartItem.quantity = 1;
	  			$scope.cartItem.price = $scope.tiles[i].price;
	  			$scope.cartItem.name = $scope.tiles[i].name;
	  			$scope.cart.push($scope.cartItem);
	  		}
	  	}
	 $scope.calculateCost();
	}

	$scope.increment = function(event){
	  	for (var j=0; j<$scope.cart.length; j++) {
	  		if ($scope.cart[j].id == event.target.id) {
	  			$scope.cart[j].quantity += 1;
	  		}
	  	}
	  	$scope.calculateCost();
	}

	$scope.decrement = function(event){
	  	for (var j=0; j<$scope.cart.length; j++) {
	  		if ($scope.cart[j].id == event.target.id) {
	  			$scope.quantity = $scope.cart[j].quantity > 0 ? $scope.cart[j].quantity-= 1:0;
	  			
	  		}
	  	}
	  	$scope.calculateCost();
	} 

});

app.directive('onError', function() {  
  return {
    restrict:'A',
    link: function(scope, element, attr) {
      element.on('error', function() {
        element.attr('src', attr.onError);
      })
    }
  }
});

