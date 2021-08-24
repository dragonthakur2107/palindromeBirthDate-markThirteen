function reverseStr(str) {
    var listOfChars = str.split('');
    var reverseListOfChars = listOfChars.reverse();
    var reversedStr = reverseListOfChars.join('');
    return reversedStr;
  }
  
  function isPalindrome(str) {
    var reverse = reverseStr(str);
    return str === reverse;
  }
  
  function convertDateToStr(date) {
  
    var dateStr = { day: '', month: '', year: '' };
  
    if (date.day < 10) {
      dateStr.day = '0' + date.day;
    }
    else {
      dateStr.day = date.day.toString();
    }
  
    if (date.month < 10) {
      dateStr.month = '0' + date.month;
    }
    else {
      dateStr.month = date.month.toString();
    }
  
    dateStr.year = date.year.toString();
    return dateStr;
  }
  
  function getAllDateFormats(date) {
    var dateStr = convertDateToStr(date);
  
    var ddmmyyyy = dateStr.day + dateStr.month + dateStr.year;
    var mmddyyyy = dateStr.month + dateStr.day + dateStr.year;
    var yyyymmdd = dateStr.year + dateStr.month + dateStr.day;
    var ddmmyy = dateStr.day + dateStr.month + dateStr.year.slice(-2);
    var mmddyy = dateStr.month + dateStr.day + dateStr.year.slice(-2);
    var yymmdd = dateStr.year.slice(-2) + dateStr.month + dateStr.day;
  
    return [ddmmyyyy, mmddyyyy, yyyymmdd, ddmmyy, mmddyy, yymmdd];
  }
  
  function checkPalindromeForAllDateFormats(date){
    var listOfPalindromes = getAllDateFormats(date);
  
    var flag = false;
  
    for(var i=0; i < listOfPalindromes.length; i++){
      if(isPalindrome(listOfPalindromes[i])){
        flag = true;
        break;
      }
    }
    
    return flag;
  }
  
 
  function isLeapYear(year){
    if(year % 400 === 0){
      return true;
    }
    if(year % 100 === 0){
      return false;
    }
    if(year % 4 === 0){
      return true;
    }
    return false;
  }
  
 
  function getNextDate(date){
    var day = date.day + 1;  
    var month = date.month;
    var year = date.year;
  
    var daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]; // 0 - 11
  
     
    if(month === 2){ 
     
      if(isLeapYear(year)){ 
           if(day > 29){ 
           day = 1;
           month++;  
         }
      }
      else {
         if(day > 28){
           day = 1;
           month++; 
         }
      }
    }
    else {
        if(day > daysInMonth[month - 1]){ 
        day = 1; 
        month++;  
      }
    }
  
    
    if(month > 12){
      month = 1;
      year++; 
    }
  
    return {
      day: day,  
      month: month,
      year: year
    };
  }
  
  
  function getNextPalindromeDate(date){
    var ctr = 0;
    var nextDate = getNextDate(date);
  
    while(1){
      ctr++;
      var isPalindrome = checkPalindromeForAllDateFormats(nextDate);
      if(isPalindrome){
        break;
      }
      nextDate = getNextDate(nextDate);
    }
    return [ctr, nextDate];
  }

  function getPreviousDate(date){
    var day = date.day - 1;  
    var month = date.month;
    var year = date.year;
  
    var daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]; // 0 - 11
  
     
    if(month === 3){ 
     
      if(isLeapYear(year)){ 
           if(day < 1){ 
           day = 29;
           month--;  
         }
      }
      else {
         if(day < 1){
           day = 28;
           month--; 
         }
      }
    }
    else {
        if(day < 1){
            month--
            day = daysInMonth[month-2]; 
      }
    }
  
    
    if(month < 1){
      month = 12;
      year--; 
    }
  
    return {
      day: day,  
      month: month,
      year: year
    };
  }



  function getPreviousPalindromeDate(date){
      var ctr = 0;
      var previousDate = getPreviousDate(date);
      while(1){
          ctr++;
          var isPalindrome = checkPalindromeForAllDateFormats(previousDate);
          if(isPalindrome){
              break;
          }
          previousDate = getPreviousDate(previousDate);
      }
      return[ctr,previousDate];
  }
  

  var dateInputRef = document.querySelector("#bday-input");
  var btnCheck = document.querySelector("#show-btn");
  var outputDiv = document.querySelector("#output-div");
  var processingGif = document.querySelector("#processing-gif");
 
  processingGif.style.display = "none";
  function processingGfx(){
    
    show = function(){
        processingGif.style.display = "block";
        setTimeout(hide, 4000); 
      },

      hide = function(){
        processingGif.style.display = "none";
        btnClickHandler();
        
      };

    show();
    
  }
  function btnClickHandler(a){
      var bdayStr = dateInputRef.value;
       

    if(bdayStr !==''){
        var listOfDate = bdayStr.split('-');
        var date = {
            day: Number(listOfDate[2]),
            month : Number(listOfDate[1]),
            year: Number(listOfDate[0])
        };
        var isPalindrome = checkPalindromeForAllDateFormats(date);
        if(isPalindrome){
            outputDiv.innerText = "Sheesh! You were born on a Palindrome Date";
        }
        else{
            var [ctrNext,nextDate] = getNextPalindromeDate(date);
            var [ctrPrevious,previousDate]=getPreviousPalindromeDate(date);
            var setterPrevious="Days";
            var setterNext="Days"
            if(ctrPrevious === 1){
               setterPrevious ="Day";
            }
            if(ctrNext === 1){
                setterNext ="Day";
             }
            outputDiv.innerText="The Previous Palindrome Date is "+previousDate.day+"-"+previousDate.month+"-"+previousDate.year+", You were late by "+ctrPrevious +" "+setterPrevious+" \n Or \n The Next Date is "+nextDate.day+"-"+nextDate.month+"-"+nextDate.year+", You should have taken birth "+ctrNext+" "+setterNext+" Later.\n But what can we do now? \nIt is what it is."


        }
    }
  }

  btnCheck.addEventListener("click",processingGfx);

