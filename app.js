function reverseStr(str){
    return str.split('').reverse().join('');
}

function checkPalindrome(str){
    var reversedStr = reverseStr(str);
    return str === reversedStr;
}

function dateToStrConverter(date){
    var strDate ={day:'',month:'',year:'' }
    if(date.day < 10 ){
        strDate.day='0' + date.day;
    }
    else{
        strDate.day = date.day.toString();
    }
    
    if(date.month < 10 ){
        strDate.month='0' + date.month;
    }
    else{
        strDate.month = date.month.toString();
    }
    strDate.year = date.year.toString();

    return strDate;
}

function allDateFormatter(date){
      var strDate = dateToStrConverter(date);

      var ddmmyyyy = strDate.day + strDate.month + strDate.year;
      var mmddyyyy = strDate.month + strDate.day + strDate.year;
      var yyyymmdd =  strDate.year + strDate.day + strDate.month ;
      var ddmmyy =  strDate.day + strDate.month +strDate.year.slice(-2);
      var mmddyy = strDate.month + strDate.day +strDate.year.slice(-2);
      var yymmdd = strDate.year.slice(-2) + strDate.month + strDate.day;
      return [ddmmyyyy,mmddyyyy,yyyymmdd,ddmmyy,mmddyy,yymmdd];
}


function palindromeCheckerForAllFormats(date){
    var palindromelist= allDateFormatter(date);
    var flag = false;
    for(var i = 0; i <  palindromelist.length;i++){
        if(checkPalindrome(palindromelist[i])){
            flag = true;
            break;
        }
    }
}

function isLeapYear(year){
    if(year % 400 === 0){
        return true;
    }
    if(year % 100 === 0){
        return false;
    }
    if(year % 4===0){
        return true;
    }
    return false;
}

function getNextDate(date){
    var day = date.day+1;
    var month = date.month;
    var year = date.year;
     var daysInMonth =[31,28,31,30,31,30,31,31,30,31,30,31];
     if(month === 2){
         if(isLeapYear(year)){
             if (day > 29){
                 day = 1;
                 month ++;
             }
         }
         else{
             if(day > 28){
                 day = 1;
                 month++;
             }
         }

     }
     else{
         if(day > daysInMonth[month-1]){
             day=1;
             month++;
         }
     }
     if (month > 12){
         month = 1;
         year++;
     }
     return {
         day : day,
         month : month,
         year : year 
    };
}
function getNextPalindromeDate(date){
      var counter = 0;
      var nextDate = getNextDate(date);
      while(1){
          counter++;
          var isPalindrome = palindromeCheckerForAllFormats(nextDate);
          if(isPalindrome){
              break;
          }
          nextDate = getNextDate(nextDate);
      }
      return [counter,nextDate];
}
var date ={
    day: 31,
    month:1,
    year:2020
}
console.log(getNextPalindromeDate(date));