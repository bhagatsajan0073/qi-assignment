var qiApp=angular.module('qiApp',['angular-loading-bar','ui.bootstrap']);

qiApp.config(['cfpLoadingBarProvider', function(cfpLoadingBarProvider) {
    cfpLoadingBarProvider.includeSpinner = true;
    cfpLoadingBarProvider.parentSelector = '#loading-bar-container';
    cfpLoadingBarProvider.latencyThreshold = 1
}]);

qiApp.controller('parentController',function ($scope,$element,$http,$filter,$window,$interval) {
    $scope.data={
        currentPage:1
    };

    $scope.getAllProductList=function () {
        $http({
            url:'getallproduct',
            method:'GET',
            params:{
            }
        }).then(function successcallback(response) {
            if(response.status==200&&response.data.status==0){
                $scope.productListAll=response.data.result;
                $scope.productList=$filter('limitTo')(response.data.result,20,0);
                $scope.totalCount=response.data.totalCount;
                $scope.data.currentPage=1;
            }else {
                console.log(response);
            }
        },function errorcallback(err) {
            console.log(err);
        })
    }

    $scope.__init__=function () {
        $scope.newOrder={};
        $scope.getAllProductList();
        $interval(function () {
            $scope.getAllProductList();
        },10000)
    }();
    
    $scope.getMoreProducts=function () {
        // console.log($scope.data.currentPage);
        $scope.productList=$filter('limitTo')($scope.productListAll, 20, (($scope.data.currentPage-1)*20));
    };

    $scope.addProduct=function (isValid) {
        // console.log($scope.newOrder);
        if(isValid){
            $http({
                url:'addOrder',
                method:'POST',
                data:$scope.newOrder
            }).then(function successCallback(response) {
                if(response.status==200&&response.data.status==0){
                    swal("Success","Your Order has been submitted successfully","success")
                }else {
                    console.log(response);
                }
            },function  errorCallback(err) {
                console.log(err);
            })
        }else {
            swal("Error","Please fill all the information in the form","error")
        }
    };

});