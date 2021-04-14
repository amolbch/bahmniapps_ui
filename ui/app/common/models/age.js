'use strict';

angular.module('bahmni.common.models')
    .factory('age', ['$rootScope','$http',function ($rootScope,$http) {
        var dateUtil = Bahmni.Common.Util.DateUtil;

        var fromBirthDate = function (birthDate) {
          

            var d = new Date(birthDate),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();
    
        if (month.length < 2) 
            month = '0' + month;
        if (day.length < 2) 
            day = '0' + day;
    
      
            // console.log("birthDate ::"+document.getElementById("ageYears"));


            var today = dateUtil.now();
            var period = dateUtil.diffInYearsMonthsDays(birthDate, today);
            console.log(period.years, period.months, period.days);
            // document.getElementById("birthdate").value  =   [year, month, day].join('-');
            // console.log("$rootScope.birthdatevalue ::::;" +  document.getElementById("birthdate").value );
            $rootScope.birthdatevalue = [year, month, day].join('-');
            $rootScope.yearsnew = period.years
            $rootScope.monthsnew = period.months
            $rootScope.daysnew = period.days
// console.log("document.getElementById " + document.getElementById("popupDatepicker").value);
            if(document.getElementById("popupDatepicker") != null){
                // alert(day,month,year)
                this.gmtDate(day,month,year);
            }else{
                // alert("hhhhhhhhhhhh"+document.getElementById("popupDatepicker").value)
        //   var date1 = document.getElementById("popupDatepicker").value;
        //         $rootScope.dob = date1;
                this.gmtDate(day,month,year);
            }
            if(document.getElementById("birthdate") != null){
              
                document.getElementById("birthdate").value = [year, month, day].join('-')
                }

            if(document.getElementById("ageYears") != null){
              
            document.getElementById("ageYears").value = period.years
            }
            if(document.getElementById("ageMonths") != null){
            document.getElementById("ageMonths").value = period.months
            }
            if(document.getElementById("ageDays") != null){
            document.getElementById("ageDays").value = period.days
            }
            return create(period.years, period.months, period.days);
        };
 


        var create = function (years, months, days) {
            var isEmpty = function () {
                return !(this.years || this.months || this.days);
            };
            $rootScope.yearsnew = years
            $rootScope.monthsnew = months
            $rootScope.daysnew = days
            console.log("birthDate ::"+years, months, days);

          
            return {
                years: years,
                months: months,
                days: days,
                isEmpty: isEmpty
            };
        };

        var calculateBirthDate = function (age) {
            var birthDate = dateUtil.now();
            birthDate = dateUtil.subtractYears(birthDate, age.years);
            birthDate = dateUtil.subtractMonths(birthDate, age.months);
            birthDate = dateUtil.subtractDays(birthDate, age.days);
            

            console.log("birthDate >>>>>>>"+birthDate);
            return birthDate;
        };
        var localDateConversion = function (date,month,year) {
            return $http.get(Bahmni.Common.Constants.bahmniRESTBaseURL + "/gmttoethiopian/"+date+"/"+month+"/"+year+"");
        };
      
   var gmtDate = function(dd,mm,yyyy){
                var dob = null;
                console.log(dd,mm,yyyy);
                this.localDateConversion(dd,mm,yyyy).then(function (response) {
                 console.log(response.data.date+'/'+response.data.month.replaceAll(',', '')+'/'+response.data.year);
                    $rootScope.dob = response.data.date+'-'+response.data.month.replaceAll(',', '')+'-'+response.data.year;
                    console.log("dob 1111111111 ::"+$rootScope.dob);
                    if(document.getElementById("popupDatepicker").value != null)
                    document.getElementById("popupDatepicker").value = $rootScope.dob 
                    // document.getElementById("Ethiopian_DOB").value = $rootScope.dob
                    // alert(document.getElementById("Ethiopian DOB"));
                     return   $rootScope.dob;
                },function (response){
                    console.log("response ::"+response);
                    return null;
                });
            }

      
        return {
            fromBirthDate: fromBirthDate,
            create: create,
            calculateBirthDate: calculateBirthDate,
            localDateConversion:localDateConversion,
            gmtDate:gmtDate
        };
    }]
);
