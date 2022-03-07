﻿function lastDay(date){
   var date = new Date(date);
   var month = new Date(date).getMonth();
   var lastDayList = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
   var lastDay = lastDayList[month];

   //2월인지 체크
   if (month == 1 && (leapYear(date))){
        lastDay = 29;
   }
   return lastDay;
}


function leapYear(date){
    let year = new Date(date).getFullYear();
    var result = false;
    if ((year % 4 == 0 && year % 100 != 0) || year % 400 == 0){
        result = true;
    }
    return result;
}


function lastDaySelector(startDate, endDate){
    var start = new Date(startDate);
    var end = new Date(endDate);
    var startMonth = start.getMonth();
    var startTemp = new Date(startDate);
    var lastDayList = [];

    for (let i = 0; i < 12; i++) {
        var total = startMonth + i;
        if(total > 12) total -= 12;

        var lastDayInMonth = lastDay(startTemp.setMonth(total));
        lastDayList.push(lastDayInMonth);
        if (startTemp.getFullYear() == end.getFullYear() && startTemp.getMonth() == end.getMonth()){
            break;
        }
    }
    if (end.getDate() != lastDay(end)){
        lastDayList.pop();
    }
    return lastDayList;
}


function minLastDay(startDate, endDate) {
    var lastDayList = lastDaySelector(startDate, endDate);
    var minDate = lastDay(startDate);
    if (lastDayList.length){
        for (i of lastDayList) {
            minDate = Math.min(minDate, i)
        }
    }
    return minDate;
}


function showDate(startDate, endDate){
    var lastDayList = lastDaySelector(startDate, endDate);
    var last = minLastDay(startDate, endDate);
    var text = "<table><tr>";

    for (let i = 1; i <= last; i++){
        if(i == last){
            text += "<th><div " + "id='" + i + "' class='day end' >" + i + "</div></th>";
            break;
        }
        text += "<th><div " + "id='" + i + "' class='day'>" + i + "</div></th>";
        if(i % 7 == 0){
            text += "</tr>";
        }
    }
    text += "<tr><th colspan='7'><div class='day' id='everyEnd'>말일</div><th></tr></table>";
    return text;
}


function showDateLessMonth(startDate, endDate){
    var start = new Date(startDate);
    var end = new Date(endDate);
    var startLastDay = lastDay(startDate);
    var duration = (end - start) / (1000 * 60 * 60 * 24)

    //선택한 기간이 한 달을 넘을 경우 : return
    if (duration > startLastDay) return;

    //넘지 않을 경우
    var startDate = start.getDate();
    var endDate = end.getDate();
    if (startDate < endDate){
        for (let i = 1; i < startDate; i++){
            console.log(i)
            $("#" + i).css({"color" : "white"});
            $("#" + i).attr({"class" : "disabled"});
        }
        console.log("----------------");
        for (let i = endDate; i > startDate + duration; i--){
            console.log(i);
            $("#" + i).css({"color" : "white"});
            $("#" + i).attr({"class" : "disabled"});
        }
    }else if (startDate > endDate){
        console.log("================");
        for (let i = startDate; i > endDate; i--){
            console.log(i)
            $("#" + i).css({"color" : "white"});
            $("#" + i).attr({"class" : "disabled"});
        }
    }
    $("#everyDay").css({"color" : "white"});
    $("#everyDay").attr({"class" : "disabled"});
}


// TODO  날짜 클릭과 실행 가능 횟수 나열
// TODO alert창 customize 논의
function selectDate(elementParam){
    var element = $(elementParam);
    var dataDateSelected = element.attr("data-date-selected");
    if (dataDateSelected == undefined || dataDateSelected == "false"){
        element.attr("data-date-selected", "true");
        element.css({"background-color" : "#4169E1", "color" : "#FFFAF0"});
        if(element.hasClass("day end")){
            alert(element.text() + "일을 선택하셨습니다. 매달 말일을 선택하고 싶으시다면 '말일' 옵션을 사용해주세요.");
        }
    } else if (element.attr("data-date-selected") == "true"){
        element.css({"background-color" : "transparent", "color" : "black"});
        element.attr("data-date-selected", "false");
    }

    var dateListArray = [];
    $(".day").each(function(index, item) {
        if($(item).attr("data-date-selected") == "true"){
            dateListArray.push($(item).text())
        }
    });
    return dateListArray;
}


function possibleDayCount(startDate, endDate, dateListArray){
    var start = new Date(startDate);
    var end = new Date(endDate);
    var startMonth = start.getMonth();
    var endMonth = end.getMonth();
    var dateList = dateListArray;

    if(end.getFullYear() > start.getFullYear()){
        var yearsBetween = end.getFullYear() - start.getFullYear();
        endMonth = endMonth + (12 * yearsBetween);
    }

    var possibleDateList = [];
    var monthsBetween = endMonth - startMonth;
    var count = 0;
    for (date of dateList) {
        for (let i = startMonth + 1; i <= startMonth + monthsBetween + 1; i++) {
        console.log("i : " + i);
        console.log("date : " + date);
            // 만약 첫 번째 달에 선택한 날짜가 없다면
            if (startMonth + 1 == i && start.getDate() > date) {
                console.log("startDateContinue");
                continue;
            // 만약 마지막 달에 선택한 날짜가 없다면
            } else if (endMonth + 1 == i && end.getDate() < date){
                console.log("endDateContinue");
                continue;
            } else {
                var possibleDay = i + "월 " + date + "일";
                possibleDateList.push(possibleDay);
            }
        }
    }

    console.log(possibleDateList);
    console.log(possibleDateList.length);

}