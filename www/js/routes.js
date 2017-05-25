angular.module('app.routes', [])

.config(function($stateProvider, $urlRouterProvider) {

    // Ionic uses AngularUI Router which uses the concept of states
    // Learn more here: https://github.com/angular-ui/ui-router
    // Set up the various states which the app can be in.
    // Each state's controller can be found in controllers.js

    $stateProvider.state('homepage', {
        url: '/home',
        templateUrl: 'templates/homepage.html',
        controller: 'homepageCtrl'
    })

    .state('typeOfRoom', {
        url: '/type',
        templateUrl: 'templates/typeOfRoom.html',
        controller: 'typeOfRoomCtrl'
    })

    .state('addBed', {
        url: '/bed',
        templateUrl: 'templates/addBed.html',
        controller: 'addBedCtrl'
    })

    .state('orderDetail', {
        url: '/orderDetail',
        templateUrl: 'templates/orderDetail.html',
        controller: 'orderDetailCtrl'
    })

    .state('date', {
        url: '/date',
        templateUrl: 'templates/date.html',
        controller: 'dateCtrl'
    })

    .state('payment', {
        url: '/pay',
        templateUrl: 'templates/payment.html',
        controller: 'paymentCtrl'
    })

    .state('information', {
        url: '/info',
        templateUrl: 'templates/information.html',
        controller: 'informationCtrl'
    })

    .state('editInformation', {
        url: '/edit',
        templateUrl: 'templates/editInformation.html',
        controller: 'editInformationCtrl'
    })

    .state('complete', {
        url: '/complete/:OrderID',
        templateUrl: 'templates/complete.html',
        controller: 'completeCtrl'
    })

    .state('confirmOrder', {
        url: '/confirm',
        templateUrl: 'templates/confirmOrder.html',
        controller: 'confirmOrderCtrl'
    })

    .state('cancelOrder', {
        url: '/cancel',
        templateUrl: 'templates/cancelOrder.html',
        controller: 'cancelOrderCtrl'
    })

    .state('register', {
        url: '/register',
        templateUrl: 'templates/register.html',
        controller: 'registerCtrl'
    })

    .state('login', {
        url: '/login',
        templateUrl: 'templates/login.html',
        controller: 'loginCtrl'
    })

    .state('previousorderdetail', {
        url: '/previousorderdetail/:orindex',
        templateUrl: 'templates/previousorderdetail.html',
        controller: 'previousorderdetailCtrl'
    })

    $urlRouterProvider.otherwise('/home')



});