angular.module('app.services', [])

.factory('BlankFactory', [function() {

}])

.service('orderdetails', [function() {


    this.userdata = "";
    today = new Date();
    this.checkin = new Date();
    this.checkout = new Date();
    this.typeOfroom = "";
    this.roomfloor = "";
    this.payment = "";
    this.phonenum = "";
    this.AmountDate = 1;
    this.theorders = "";
    this.orderHistory = [{ cindate: "17", cinmonth: "02", coutdate: "19", coutmonth: "02", typeOfroom: "deluxe", roomfloor: "2", cusname: "judy", orderno: "1020", payment: "paypal", nationalid: "12021000000", phonenum: "095-896-0258", email: "judy@hotmail.com" }, { cindate: "17", cinmonth: "02", coutdate: "19", coutmonth: "02", typeOfroom: "deluxe", roomfloor: "2", cusname: "judy", orderno: "1020", payment: "paypal", nationalid: "12021011111", phonenum: "095-896-0258", email: "judy@hotmail.com" }, { cindate: "17", cinmonth: "02", coutdate: "19", coutmonth: "02", typeOfroom: "deluxe", roomfloor: "2", cusname: "judy", orderno: "1020", payment: "paypal", nationalid: "12021022222", phonenum: "095-896-0258", email: "judy@hotmail.com" }];

    this.toDateString = function(datetime) {
        return datetime.toISOString().substring(0, 10);
    }

    this.setCookie = function(cname, cvalue, exdays) {
        var d = new Date();
        d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
        var expires = "expires=" + d.toUTCString();
        document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
    }

    this.getCookie = function(cname) {
        var name = cname + "=";
        var decodedCookie = decodeURIComponent(document.cookie);
        var ca = decodedCookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) == 0) {
                return c.substring(name.length, c.length);
            }
        }
        return "";
    }



}])