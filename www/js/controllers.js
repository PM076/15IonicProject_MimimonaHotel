function padLeft(a, b) {
    var l = (a + '').length;
    if (l >= b) {
        return a + '';
    } else {
        var arr = [];
        for (var i = 0; i < b - l; i++) {
            arr.push('0');
        }
        arr.push(a);
        return arr.join('');
    }
}
angular.module('app.controllers', [])


.controller('homepageCtrl', ['$scope', '$state', '$stateParams', 'orderdetails', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
    // You can include any angular dependencies as parameters for this function
    // TIP: Access Route Parameters for your page via $stateParams.parameterName
    function($scope, $state, $stateParams, orderdetails) {
        $scope.reserve = "test";
        $scope.userdata = "";
        userdata = orderdetails.getCookie("userdata");
        if (userdata != "") {
            orderdetails.userdata = JSON.parse(userdata);
            $scope.userdata = orderdetails.userdata;
            console.log($scope.userdata);
        }

        $scope.$on('$ionicView.enter', function(e) {
            $scope.userdata = orderdetails.userdata;
        });

        $scope.logout = function() {
            orderdetails.userdata = "";
            $scope.userdata = orderdetails.userdata;
            orderdetails.setCookie("userdata", "", -356);
        }

        $scope.checklogin = function() {
            return $scope.userdata != "";
        }

        $scope.toPreviousorder = function() {
            dataQ = { UserID: orderdetails.userdata.UserID };
            console.log(dataQ);
            $.ajax({
                type: "POST",
                dataType: "json",
                timeout: 8000,
                url: "http://mimimona.azurewebsites.net/app/previousorder.php ",
                data: JSON.stringify(dataQ),
                success: function(res) {
                    // response = jQuery.parseJSON(data);
                    console.log(JSON.stringify(res));
                    if (res.status == "success") {
                        orderdetails.theorders = res.orders;
                        $state.go('confirmOrder');
                    } else if (res.status == "wrongpass") {

                        alert("Invalid Username or Password");

                    } else {
                        alert("fail");
                    }

                },
                error: function(xmlhttprequest, textstatus, message) {
                    if (textstatus === "timeout") {
                        alert("Connection timeout");
                    } else {
                        console.log("fail|" + textstatus + "|" + message);
                    }
                }
            });
        }

    }


])


.controller('registerCtrl', ['$scope', '$stateParams', 'orderdetails', '$state', '$ionicHistory', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
    // You can include any angular dependencies as parameters for this function
    // TIP: Access Route Parameters for your page via $stateParams.parameterName
    function($scope, $stateParams, orderdetails, $state, $ionicHistory) {

        $scope.backhome = function() {
            $ionicHistory.nextViewOptions({
                disableBack: true
            });
            $state.go('homepage');
        };

        $scope.username = "";
        $scope.Updatedusername = function(a) {
            console.log('Updated', a);
            $scope.username = a;
        };
        $scope.phonenum = "";
        $scope.Updatedphonenum = function(a) {
            console.log('Updated', a);
            $scope.phonenum = a;
        };
        $scope.password = "";
        $scope.Updatedpassword = function(a) {
            console.log('Updated', a);
            $scope.password = a;
        };
        $scope.submitRegister = function() {
            dataQ = {};
            dataQ = {
                username: $scope.username,
                phonenum: $scope.phonenum,
                password: $scope.password
            };
            if ($scope.username == "" || $scope.password == "") {
                alert("Username and Password is Empty");
                return; //end function
            }
            console.log('Doing register ' + JSON.stringify(dataQ));
            $.ajax({
                type: "POST",
                dataType: "json",
                timeout: 8000,
                url: "http://mimimona.azurewebsites.net/app/register.php ",
                data: JSON.stringify(dataQ),
                success: function(res) {
                    // response = jQuery.parseJSON(data);
                    console.log(JSON.stringify(res));
                    if (res.status == "success") {
                        orderdetails.userdata = res;
                        orderdetails.setCookie("userdata", JSON.stringify(orderdetails.userdata), 356);
                        console.log(orderdetails.getCookie("userdata"));
                        $scope.backhome();
                    } else {
                        alert("fail");
                    }

                },
                error: function(xmlhttprequest, textstatus, message) {
                    if (textstatus === "timeout") {
                        alert("Connection timeout");
                    } else {
                        console.log("fail|" + textstatus + "|" + message);
                    }
                }
            });



        }
    }


])


.controller('loginCtrl', ['$scope', '$stateParams', 'orderdetails', '$state', '$ionicHistory', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
    // You can include any angular dependencies as parameters for this function
    // TIP: Access Route Parameters for your page via $stateParams.parameterName
    function($scope, $stateParams, orderdetails, $state, $ionicHistory) {
        $scope.backhome = function() {
            $ionicHistory.nextViewOptions({
                disableBack: true
            });
            $state.go('homepage');
        };


        $scope.username = "";
        $scope.Updatedusername = function(username) {
            console.log('Updated ' + username);
            $scope.username = username;

        };

        $scope.password = "";
        $scope.Updatedpassword = function(a) {
            console.log('Updated ' + a);
            $scope.password = a;

        };

        $scope.submitlogin = function() {
            dataQ = {};
            if ($scope.username == "" || $scope.password == "") {
                alert("Username and Password is Empty");
                return; //end function
            }
            dataQ = {
                username: $scope.username,
                password: $scope.password
            };
            console.log('Doing login ' + JSON.stringify(dataQ));
            $.ajax({
                type: "POST",
                dataType: "json",
                timeout: 8000,
                url: "http://mimimona.azurewebsites.net/app/login.php ",
                data: JSON.stringify(dataQ),
                success: function(res) {
                    // response = jQuery.parseJSON(data);
                    console.log(JSON.stringify(res));
                    if (res.status == "success") {
                        orderdetails.userdata = res;
                        orderdetails.setCookie("userdata", JSON.stringify(orderdetails.userdata), 356);
                        console.log(orderdetails.userdata);
                        $scope.backhome();
                    } else if (res.status == "wrongpass") {

                        alert("Invalid Username or Password");

                    } else {
                        alert("fail");
                    }

                },
                error: function(xmlhttprequest, textstatus, message) {
                    if (textstatus === "timeout") {
                        alert("Connection timeout");
                    } else {
                        console.log("fail|" + textstatus + "|" + message);
                    }
                }
            });
        }
    }
])



.controller('typeOfRoomCtrl', ['$scope', '$stateParams', 'orderdetails', '$state', '$ionicHistory', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
    // You can include any angular dependencies as parameters for this function
    // TIP: Access Route Parameters for your page via $stateParams.parameterName
    function($scope, $stateParams, orderdetails, $state, $ionicHistory) {

        $scope.backhome = function() {
            $ionicHistory.nextViewOptions({
                disableBack: true
            });
            $state.go('homepage');
        };

        $scope.typeOfroom = "Standard";
        orderdetails.typeOfroom = $scope.typeOfroom;
        $scope.selectUpdated = function(typeOfroom) {
            console.log('Updated');
            console.log(typeOfroom);
            orderdetails.typeOfroom = typeOfroom;

            $scope.typeOfroom = orderdetails.typeOfroom;
            if ($scope.typeOfroom = "Deluxe") {
                $scope.optionSelectedfloor = "4";
                orderdetails.roomfloor = $scope.optionSelectedfloor;
            }
        };

        $scope.optionSelectedfloor = "2";
        orderdetails.roomfloor = $scope.optionSelectedfloor;
        $scope.selectUpdatedfloor = function(floor) {
            console.log('Updated');
            console.log(floor);
            orderdetails.roomfloor = floor;
        };

        $scope.$on('$ionicView.enter', function(e) {
            $scope.checkindate = orderdetails.cindate;
            $scope.checkinmonth = orderdetails.cinmonth;
            $scope.checkoutdate = orderdetails.coutdate;
            $scope.checkoutmonth = orderdetails.coutmonth;
            $scope.typeOfroom = orderdetails.typeOfroom;
            $scope.floor = orderdetails.roomfloor;
        });


    }
])

.controller('addBedCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
    // You can include any angular dependencies as parameters for this function
    // TIP: Access Route Parameters for your page via $stateParams.parameterName
    function($scope, $stateParams) {

    }
])

.controller('orderDetailCtrl', ['$scope', '$stateParams', 'orderdetails', '$state', '$ionicHistory', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
    // You can include any angular dependencies as parameters for this function
    // TIP: Access Route Parameters for your page via $stateParams.parameterName
    function($scope, $stateParams, orderdetails, $state, $ionicHistory) {

        $scope.backhome = function() {
            $ionicHistory.nextViewOptions({
                disableBack: true
            });
            $state.go('homepage');
        };
        $scope.checkin = orderdetails.checkin;
        $scope.checkout = orderdetails.checkout;
        $scope.typeOfroom = orderdetails.typeOfroom;
        $scope.floor = orderdetails.roomfloor;
        $scope.payment = orderdetails.payment;
        $scope.phonenum = orderdetails.phonenum;
        $scope.username = orderdetails.userdata.Username;
        $scope.AmountDate = orderdetails.AmountDate;

        $scope.$on('$ionicView.enter', function(e) {
            $scope.checkin = orderdetails.checkin;
            $scope.checkout = orderdetails.checkout;
            $scope.typeOfroom = orderdetails.typeOfroom;
            $scope.floor = orderdetails.roomfloor;
            $scope.payment = orderdetails.payment;
            $scope.phonenum = orderdetails.phonenum;
            $scope.username = orderdetails.userdata.Username;
            $scope.AmountDate = orderdetails.AmountDate;
        });

        $scope.completeOrder = function() {
            if (orderdetails.userdata == "") {
                alert("Please login");
                return;
            }
            if ($scope.typeOfroom != "") {
                var diffDays = $scope.checkout.getDate() - $scope.checkin.getDate();
                if (diffDays == 0) {
                    diffDays = 1;
                } else if (diffDays < 0) {
                    alert("wrong date");
                    return;
                }
                dataQ = {
                    UserID: orderdetails.userdata.UserID,
                    RoomType: $scope.typeOfroom,
                    RoomFloor: $scope.floor,
                    CheckIn: orderdetails.toDateString($scope.checkin),
                    CheckOut: orderdetails.toDateString($scope.checkout),
                    PaymentType: $scope.payment,
                    AmountDate: diffDays

                }
                console.log(orderdetails.toDateString($scope.checkin));
                console.log(orderdetails.toDateString($scope.checkout));
                console.log(dataQ);
                $.ajax({
                    type: "POST",
                    dataType: "json",
                    url: "http://mimimona.azurewebsites.net/app/confirmorder.php ",
                    data: JSON.stringify(dataQ),
                    success: function(res) {
                        // response = jQuery.parseJSON(data);
                        console.log(JSON.stringify(res));
                        if (res.status == "success") {
                            $state.go('complete', { OrderID: res.OrderID });
                        } else if (res.status == "Unavailable") {
                            alert("Unavailable");
                        } else {
                            alert("fail");
                        }

                    },
                    error: function(xmlhttprequest, textstatus, message) {
                        if (textstatus === "timeout") {
                            alert("Connection timeout");
                        } else {
                            console.log("fail|" + textstatus + "|" + message);
                        }
                    }
                });

            }

        }


    }
])

.controller('dateCtrl', ['$scope', '$stateParams', 'orderdetails', '$state', '$ionicHistory', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
    // You can include any angular dependencies as parameters for this function
    // TIP: Access Route Parameters for your page via $stateParams.parameterName
    function($scope, $stateParams, orderdetails, $state, $ionicHistory) {

        $scope.backhome = function() {
            $ionicHistory.nextViewOptions({
                disableBack: true
            });
            $state.go('homepage');
        };

        $scope.checkin = orderdetails.checkin;
        $scope.Updatedcheckin = function(a) {
            console.log('Updated ' + a);
            orderdetails.checkin = a;
            $scope.checkin = orderdetails.checkin;

        };

        $scope.checkout = orderdetails.checkout;
        $scope.Updatedcheckout = function(a) {
            console.log('Updated ' + a);
            orderdetails.checkout = a;
            $scope.checkout = orderdetails.checkout;

        };



        $scope.nextPage = function() {
            diffdate = $scope.checkout.getDate() - $scope.checkin.getDate();
            if (diffdate < 0) {
                alert("Invalid checkin date");
                return;
            } else {
                if (diffdate == 0) diffdate = 1;
                orderdetails.AmountDate = diffdate;
                $state.go('typeOfRoom');
            }
        }


    }
])

.controller('paymentCtrl', ['$scope', '$stateParams', 'orderdetails', '$state', '$ionicHistory', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
    // You can include any angular dependencies as parameters for this function
    // TIP: Access Route Parameters for your page via $stateParams.parameterName
    function($scope, $stateParams, orderdetails, $state, $ionicHistory) {

        $scope.backhome = function() {
            $ionicHistory.nextViewOptions({
                disableBack: true
            });
            $state.go('homepage');
        };

        $scope.payment = "credit";
        orderdetails.payment = $scope.payment;
        $scope.Updatedpayment = function(payment) {
            console.log('Updated');
            console.log(payment);
            orderdetails.payment = payment;
            $scope.payment = orderdetails.payment;
        };


    }
])

.controller('informationCtrl', ['$scope', '$stateParams', 'orderdetails', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
    // You can include any angular dependencies as parameters for this function
    // TIP: Access Route Parameters for your page via $stateParams.parameterName
    function($scope, $stateParams, orderdetails) {
        $scope.username = "";
        orderdetails.username = $scope.username;
        $scope.Updatedusername = function(username) {
            console.log('Updated');
            console.log(username);
            orderdetails.username = username;

        };

        /*$scope.nationalid = "";
        orderdetails.nationalid = $scope.nationalid;
        $scope.Updatednationalid = function(nationalid) {
            console.log('Updated');
            console.log(nationalid);
            orderdetails.nationalid = nationalid;

        };

        $scope.phonenum = "";
        orderdetails.phonenum = $scope.phonenum;
        $scope.Updatedphonenum = function(phonenum) {
            console.log('Updated');
            console.log(phonenum);
            orderdetails.phonenum = phonenum;

        };*/

        $scope.email = "";
        orderdetails.email = $scope.email;
        $scope.Updatedemail = function(email) {
            console.log('Updated');
            console.log(email);
            orderdetails.password = password;

        };

    }
])

.controller('editInformationCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
    // You can include any angular dependencies as parameters for this function
    // TIP: Access Route Parameters for your page via $stateParams.parameterName
    function($scope, $stateParams) {


    }
])

.controller('completeCtrl', ['$scope', '$stateParams', 'orderdetails', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
    // You can include any angular dependencies as parameters for this function
    // TIP: Access Route Parameters for your page via $stateParams.parameterName
    function($scope, $stateParams, orderdetails) {
        $scope.OrderID = $stateParams.OrderID;
        $scope.$on('$ionicView.enter', function(e) {
            $scope.OrderID = $stateParams.OrderID;
        });




    }
])

.controller('confirmOrderCtrl', ['$scope', '$stateParams', 'orderdetails', '$ionicHistory', '$state', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
    // You can include any angular dependencies as parameters for this function
    // TIP: Access Route Parameters for your page via $stateParams.parameterName
    function($scope, $stateParams, orderdetails, $ionicHistory, $state) {
        $scope.backhome = function() {
            $ionicHistory.nextViewOptions({
                disableBack: true
            });
            $state.go('homepage');
        };
        $scope.theorders = orderdetails.theorders;
        //console.log($scope.orderHistory);

    }
])

.controller('cancelOrderCtrl', ['$scope', '$stateParams', 'orderdetails', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
    // You can include any angular dependencies as parameters for this function
    // TIP: Access Route Parameters for your page via $stateParams.parameterName
    function($scope, $stateParams, orderdetails) {
        $scope.orderHistory = orderdetails.orderHistory;
        console.log($scope.orderHistory);


    }
])

.controller('previousorderdetailCtrl', ['$scope', '$stateParams', 'orderdetails', '$ionicHistory', '$state', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
    // You can include any angular dependencies as parameters for this function
    // TIP: Access Route Parameters for your page via $stateParams.parameterName
    function($scope, $stateParams, orderdetails, $ionicHistory, $state) {
        $scope.backhome = function() {
            $ionicHistory.nextViewOptions({
                disableBack: true
            });
            $state.go('homepage');
        };

        $scope.orindex = $stateParams.orindex;
        $scope.theorder = orderdetails.theorders[$scope.orindex];
        $scope.username = orderdetails.userdata.username;
        $scope.typeOfroom = $scope.theorder.RoomType;

        $scope.$on('$ionicView.enter', function(e) {
            $scope.orindex = $stateParams.orindex;
            $scope.theorder = orderdetails.theorders[$scope.orindex];
            $scope.Username = orderdetails.userdata.Username;
            $scope.typeOfroom = $scope.theorder.RoomType;
            $scope.OrderID = $scope.theorder.OrderID;
            console.log($scope.theorder, orderdetails.userdata);
        });

    }
])



;