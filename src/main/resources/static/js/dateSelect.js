function lastDay(date){
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
    var duration = (end - start) / (1000 * 60 * 60 * 24);

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

//TODO : 재귀함수를 통해 실행
//TODO : 아니면 lastDay 함수 로직 변경
//TODO : setMonth()를 적용
function possibleDayCountOriginal(startDate, endDate, dateListArray){
    var start = new Date(startDate);
    var end = new Date(endDate);
    var startMonth = start.getMonth();
    var startYear = start.getFullYear();
    var endYear = end.getFullYear();
    var endMonth = end.getMonth();
    var dateList = dateListArray;

    if(end.getFullYear() > startYear){
        var yearsBetween = end.getFullYear() - startYear;
        endMonth = endMonth + (12 * yearsBetween);
    }

    var possibleDateList = [];
    var monthsBetween = endMonth - startMonth;

    for (let i = startMonth + 1; i <= startMonth + monthsBetween + 1; i++) {
            var month = i;
            startMonth = start.getMonth();
                for (date of dateList) {
                    // 만약 첫 번째 달에 선택한 날짜가 없다면
                    if (startMonth + 1 == i && start.getDate() > date) {
                        continue;
                    // 만약 마지막 달에 선택한 날짜가 없다면
                    } else if (endMonth + 1 == i && end.getDate() < date) {
                        continue;
                    } else if (endMonth + 1 == i && date) {

                    } else {
                        // 년도가 바뀔 때마다
                        if (i > 12) {
                            month -= 12 * parseInt(i / 12);
                            // 1월에
                            if (i % 12 == 1) startYear += parseInt(i / 12);
                        }
                    possibleDay = startYear + "-";
                    possibleDay += month.toString().length < 2? "0" + month : month;
                    possibleDay += "-";
                    // "말일" 옵션을 선택했을 경우
                    if(date == "말일") date = lastDay(possibleDay + "01");
                    lastDay(possibleDay + "01")
                    console.log("possibleDay : " + possibleDay);
                    console.log("lastDay(possibleDay + '01') : " + lastDay(possibleDay + "01"));
                    possibleDay += date.toString().length < 2? "0" + date :  date;
                    console.log(date);
                    console.log(possibleDay);
                    possibleDateList.push(possibleDay);
            }
        }
    }
    console.log(possibleDateList);
    console.log(possibleDateList.length);
    return possibleDateList;
}

// 로직 변경 테스트용 함수
function possibleDayCount(startDate, endDate, dateListArray){
    var start = new Date(startDate);
    var end = new Date(endDate);
    var startYear = start.getFullYear();
    var startMonth = start.getMonth();
    var endYear = end.getFullYear();
    var endMonth = end.getMonth();
    var dateList = dateListArray;

    if(end.getFullYear() > startYear){
        var yearsBetween = endYear - startYear;
        endMonth = endMonth + (12 * yearsBetween);
    }

    var possibleDateList = [];
    var monthsBetween = endMonth - startMonth;

    for (let i = startMonth; i <= startMonth + monthsBetween; i++) {
        var month = i;
        for (date of dateList) {
            var startTemp = new Date(startDate);
            startTemp.setMonth(month);
            //말일을 선택있을 경우
            if (date == "말일"){
                date = lastDay(startTemp.getFullYear() + "-" + (startTemp.getMonth() + 1) + "-01");
            } else {
                date = parseInt(date);
            }
            // 만약 첫 번째 달에 선택한 날짜가 없다면
            if (startMonth == i && start.getDate() > date) {
                continue;
            // 만약 마지막 달에 선택한 날짜가 없다면
            } else if (endMonth == i && end.getDate() < date) {
                continue;
            } else {
                startTemp.setDate(date);
                var possibleDay = startTemp.getFullYear() + "-"
                var possibleMonth = startTemp.getMonth() + 1;
                possibleDay += possibleMonth.toString().length < 2? "0" + possibleMonth : possibleMonth;
                possibleDay += date.toString().length < 2? "-0" + date : "-" + date;
                if (possibleDateList.includes(possibleDay)) continue;
                possibleDateList.push(possibleDay);
            }
        }
    }
    console.log(possibleDateList);
    console.log(possibleDateList.length);
    return possibleDateList;
}