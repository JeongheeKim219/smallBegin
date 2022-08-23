var today = new Date();
var first = new Date(today.getFullYear(), today.getMonth(),1);
var dayList = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
var monthList = ['January','February','March','April','May','June','July','August','September','October','November','December'];
var leapYear=[31,29,31,30,31,30,31,31,30,31,30,31];
var notLeapYear=[31,28,31,30,31,30,31,31,30,31,30,31];
var pageFirst = first;
//var pageYear;

let inputBox = document.getElementById('input-box');
var inputDate = document.getElementById('input-data');
var inputList = document.getElementById('input-list');
var delText = 'X';
//inputDate.addEventListener('click',addTodoList);
var dataCnt = 1;
var keyValue = today.getFullYear() + '' + today.getMonth()+ '' + today.getDate();
let todoList = [];
todoList[keyValue] = [];

function getPageYear(date){
    var pageYear;
    if(date.getFullYear() % 4 === 0){
        pageYear = leapYear;
    }else{
        pageYear = notLeapYear;
    }
    return pageYear;
}

function attachMain(){
    var mainThisMonth = new Date();
    var tbodyFList = document.createDocumentFragment();
    var tbodyMainCode = showCalendar(mainThisMonth, 100);
//    var tbodyNextFirstWeekCode = showCalendar(next(mainThisMonth), 200).firstElementChild;
    var tbodyNextFirstWeekCode = showCalendar(next(mainThisMonth), 200);

    tbodyFList.append(tbodyMainCode);
    tbodyFList.append(tbodyNextFirstWeekCode);
    let length = tbodyFList.childElementCount;

    for (var i = 0; i < length; i++) {
        tbodyFList.children[i].setAttribute('data-main-month-block', 0);
    }

//    document.getElementById("calendar-body").append(tbodyMainCode)
//    document.getElementById("calendar-body").append(tbodyNextFirstWeekCode)
    document.getElementById("calendar-body").append(tbodyFList);
    return next(mainThisMonth)
}

// TODO: monthCnt 조정 필요
function attachNextForScroll(bottomMonthDate, monthCnt){
    if (!bottomMonthDate) bottomMonthDate = next(new Date());
    var tbodyNextCodeForScroll = showCalendar(bottomMonthDate, monthCnt);

    document.getElementById("calendar-body").append(tbodyNextCodeForScroll);
    return bottomMonthDate;
}

// TODO: monthCnt 조정 필요
function attachPrevForScroll(mainThisMonth, monthCnt){
    if (!mainThisMonth) mainThisMonth = prev(new Date());
    var topMain = prev(mainThisMonth);
    var tbodyPrevCodeForScroll = showCalendar(topMain, monthCnt);
    document.getElementById("calendar-body").before(tbodyPrevCodeForScroll);
    return topMain;
}

function getDateSepPoint(pointDate){
    var currentMonthStr = '';
    currentMonthStr += pointDate.getFullYear() + '.';
    var monthStr = (pointDate.getMonth() + 1).toString();
    var dateStr = (pointDate.getDate()).toString();
    currentMonthStr += monthStr.length < 2? "0" + monthStr : monthStr;
    currentMonthStr += '.'
    currentMonthStr += dateStr.length < 2? "0" + dateStr : dateStr;

    return currentMonthStr;
}

function setDateId(pointDate, date){
    var dateId = "";
    var dateStr = date.toString();
    dateId += pointDate.getFullYear();
    var monthStr = (pointDate.getMonth() + 1).toString();
    dateId += monthStr.length < 2? "0" + monthStr : monthStr;
    var dateStr = date.toString();
    dateId += dateStr.length < 2? "0" + dateStr : dateStr;
    return dateId;
}

function showCurrentMonthTitle(pointDate){
    var currentMonthStr = '';
    currentMonthStr += pointDate.getFullYear() + '.';
    var monthStr = (pointDate.getMonth() + 1).toString();
    currentMonthStr += monthStr.length < 2? "0" + monthStr : monthStr;

    var calendarTitle = $("#current-year-month");
    calendarTitle.empty();
    calendarTitle.append(currentMonthStr);
}

function showCalendar(pointDate, monthCnt){
    var tbodyFList = document.createDocumentFragment();
    if (!pointDate) pointDate = new Date();
    var pointFirst = new Date(pointDate.getFullYear(), pointDate.getMonth(),1);
    var pointPageYear = getPageYear(pointDate);
    var pointFirstWeekStartDay = pointFirst.getDay();

    var prevFirst = prev(pointDate);
    var prevPageYear = getPageYear(prevFirst);
    var prevLastDate = prevPageYear[prevFirst.getMonth()];
    var prevLastWeekStartDate = prevLastDate - pointFirstWeekStartDay + 1;

    let pointId = parseInt(setDateId(pointDate, 1));
    let prevId = parseInt(setDateId(prevFirst, pointFirstWeekStartDay));
    let cnt = 1;
    for(var i = 1; i < 7; i++){ //주에 대한 for문
        var $tr = document.createElement('tr');
        $tr.setAttribute('id', monthCnt + i);
        for(var j = 0; j < 7; j++){
            if(i === 1 && j < pointFirstWeekStartDay){
                var $td = document.createElement('td');
                var $div = document.createElement('div');
                $div.textContent = prevLastWeekStartDate;;
                $td.appendChild($div);
                $td.setAttribute('id', prevId);
                $td.setAttribute('class', 'prev-month');
                if (prevLastWeekStartDate == prevLastDate) $td.setAttribute('class', 'prev-month month-end-date');
                $tr.appendChild($td);
                prevLastWeekStartDate++;
                prevId++;
            } else{
                var $td = document.createElement('td');
                var $div = document.createElement('div');
                $div.textContent = cnt;
                $td.appendChild($div);
                $td.setAttribute('id', pointId);
                // 달의 첫 날과 마지막 날 구분용 class
                if (cnt == 1) $td.setAttribute('class', 'month-start-date');
                $tr.appendChild($td);
                cnt++;
                pointId++;
            }
        }
        if (cnt > pointPageYear[pointFirst.getMonth()]) break;
        tbodyFList.appendChild($tr);
    }
    showCurrentMonthTitle(new Date());
    showCurrentDateOnLeft();
    return tbodyFList;
}

function getDateForLeft(pointDate){
    var mainDateForLeft = [];
    var yearStr = pointDate.getFullYear();
    var monthStr = pointDate.toLocaleString("en-US", {month : "short"});
    var dateStr = pointDate.getDate().toString();
    var dayStr = pointDate.toLocaleString("en-US", {weekday : "long"});


    mainDateForLeft.push(yearStr);
    monthStr = monthStr.length < 2? "0" + monthStr : monthStr;
    mainDateForLeft.push(monthStr);
    dateStr = dateStr.length < 2? "0" + dateStr : dateStr;
    mainDateForLeft.push(dateStr);
    mainDateForLeft.push(dayStr);

    return mainDateForLeft;
}

function showCurrentDateOnLeft(pointDate){
    if(!pointDate) pointDate = new Date();
    var mainDateList = getDateForLeft(pointDate);
    var mainYear = $("#main-year");
    var mainMonth = $("#main-month");
    var mainDate = $("#main-date");
    var mainDay = $("#main-day");
//    var setUpDate = $("#setUpDate");

//    setUpDate.empty();
    mainYear.empty();
    mainMonth.empty();
    mainDate.empty();
    mainDay.empty();

//    setUpDate.append(mainDateList);
    mainYear.append(mainDateList[0]);
    mainMonth.append(mainDateList[1]);
    mainDate.append(mainDateList[2]);
    mainDay.append(mainDateList[3]);

}


function removeCalendar(){
    let catchTr = 100;
    for(var i = 100; i< 106; i++){
        var $tr = document.getElementById(catchTr);
        $tr.remove();
        catchTr++;
    }
}

function prev(pointDate){
    var pointFirst = new Date(pointDate.getFullYear(), pointDate.getMonth(),1);
    var pointPrev;
//    let preBox = document.getElementById('toDoContent').value;
//    preBox.value = '';
//    const $divs = document.querySelectorAll('#input-list > div');
/*    console.log("$divs");
    console.log($divs);*/
//    $divs.forEach(function(e){
//        e.remove(); //
//    });
//    const $btns = document.querySelectorAll('#input-list > button');
//    $btns.forEach(function(e1){
//        e1.remove();
//    });
    if(pointFirst.getMonth() === 1){ //현재 1월일 경우 이전 년도 보여주기
        pointPrev = new Date(pointFirst.getFullYear()-1, 12, 1);
//        first = pageFirst;
//        if(first.getFullYear() % 4 === 0){
//            pageYear = leapYear;
//        }else{
//            pageYear = notLeapYear;
//        }
    }else{
        pointPrev = new Date(pointFirst.getFullYear(), pointFirst.getMonth()-1, 1);
//        first = pageFirst;
    }
    // 이전으로 클릭 될때 날짜가 같은 달에 대해서 오늘로 보여줌(달력에 크게 띄우는거)
//    today = new Date(today.getFullYear(), today.getMonth()-1, today.getDate());
//    removeCalendar();
//    tbodyPrevCode = showCalendar(pointPrev);
    return pointPrev;
//    showMain();
//    clickedDate1 = document.getElementById(today.getDate());
//    clickedDate1.classList.add('active');
//    clickStart();
//    reshowingList();

}



function next(pointDate){
    var pointFirst = new Date(pointDate.getFullYear(), pointDate.getMonth(),1);
//    console.log('pointFirst :', pointFirst);
    var pointNext;
//    var tbodyNextCode;

//    let nextBox = document.getElementById('toDoContent').value;
//    nextBox.value = '';
//    const $divs = document.querySelectorAll('#input-list > div');
//    $divs.forEach(function(e){
//        e.remove();
//    });
//    const $btns = document.querySelectorAll('#input-list > button');
//    $btns.forEach(function(e1){
//        e1.remove();
//    });
    if(pointFirst.getMonth() === 12){
        pointNext = new Date(pointFirst.getFullYear()+1, 1, 1);
//        first = pageFirst;
//        if(first.getFullYear() % 4 === 0){
//            pageYear = leapYear;
//        }else{
//            pageYear = notLeapYear;
//        }
    }else{
        pointNext = new Date(pointFirst.getFullYear(), pointFirst.getMonth()+1, 1);
//        first = pageFirst;
    }
//    today = new Date(today.getFullYear(), today.getMonth()+1, today.getDate());
//    removeCalendar();
//    flag = false;
//    showCalendar();
//    showMain();
//    clickedDate1 = document.getElementById(today.getDate());
//    clickedDate1.classList.add('active');
//    console.log(clickedDate1);
//    clickStart();
//    reshowingList();
//    return flag
//    console.log('pointNext :', pointNext);
    return pointNext;
}

function reshowingList(selectedDate){
    $.ajax({
        url : '/readCalendar',
        type : "post",
        contentType: 'application/x-www-form-urlencoded; charset=utf-8',
        dataType : "json",
        data : {"selectedDate" : selectedDate},
        success : function(resp){
            //console.log(resp);
            addTodoLists(resp);
        },
        error : function(err, resp){
            console.log(err+"에러발생");
            console.log(resp);
        }
    });
}

function addTodoLists(resp){
    // toDoListsTable 이 있는지 확인
    // 그 다음 있으면 요소 삭제, 없으면 그대로 진행
    // 그러고 toDoLists에 테이블 id = toDoListsTable - resp 추가하기

    var todo = resp;
    var todoCount = resp.length;
    var toDoLists = document.getElementById("toDoListsTable");
    var tableCheck = !!document.getElementById("toDoListsTable");
    console.log(tableCheck);

    // table id=toDoListsTable을 toDoLists 안에 생성
    var toDoTable = "<table><tr><td>Color</td><td>Content</td><td>State</td></tr>";
    var first = "";
    var second = "";
    var third = "";

    for (var obj of todo){
        toDoTable += "<tr>";

        first = obj[Object.keys(obj)[5]];
        toDoTable += "<td>"
        toDoTable += first;
        toDoTable += "</td>";

        second = obj[Object.keys(obj)[2]];
        toDoTable += "<td>"
        toDoTable += second;
        toDoTable += "</td>";

        third = obj[Object.keys(obj)[4]];
        toDoTable += "<td>"
        toDoTable += third;
        toDoTable += "</td>";

        toDoTable += "</tr>";

    }
    toDoTable += "</table>";

    console.log(toDoTable)
    $(toDoLists).html(toDoTable);
}


function addTodoList(){
    var $div = document.createElement('div');
    var temp = document.getElementById('input-box');
    $div.textContent = '-' + temp.value;
    var $btn = document.createElement('button');
    $btn.setAttribute('type', 'button');
    $btn.setAttribute('id', 'del-ata');
    $btn.setAttribute('id', dataCnt+keyValue);
    $btn.setAttribute('class', "del-data");
    $btn.textContent = delText;
    console.log("$div at addTodoList : ", $div);
    console.log("$btn at addTodoList : ", $btn);
    console.log("input-list : ", inputList);
    var inputList2 = document.getElementById('input-list');
    inputList2.appendChild($div);
    inputList2.appendChild($btn);
    //inputList.appendChild($div);
    //inputList.appendChild($btn);
    todoList[keyValue].push(temp.value);
    dataCnt++;
    temp.value = '';
    //$div.addEventListener('click',checkList);
    //$btn.addEventListener('click',deleteTodo);
    function deleteTodo(){
        $div.remove();
        $btn.remove();
    }
}
function checkList(e){
    e.currentTarget.classList.add('checked');
}

function showIniAndObList(resp){
    // iniAndObTable에 테이블 id = iniAndObTable - resp 추가하기
    var iniAndOb = resp;
    var iniAndObTable = document.getElementById("iniAndObTable");
    // var tableCheck = !!document.getElementById("iniAndObTable");

    console.log('(iniAndOb.length :', iniAndOb.length);
    removeAllChildElements(iniAndObTable);

//    if (iniAndOb.length > 0){
    var $tr = document.createElement("tr");
    var $td1 = document.createElement("td").textContent = "Ob Content";
    var $td2 = document.createElement("td").textContent = "Ini Content";
    var $td3 = document.createElement("td").textContent = "State";
    $tr.append($td1);
    $tr.append($td2);
    $tr.append($td3);
    iniAndObTable.append($tr);
//    } else{
//    }

    for (var obj of iniAndOb){
        var $tr = document.createElement("tr");
        var obContent = obj["obContent"];
        var iniContent = obj["iniContent"];
        var iniDtlAddState = obj["iniDtlAddState"];
        var $td1 = document.createElement("td").textContent = obContent;
        var $td2 = document.createElement("td").textContent = iniContent;
        var $td3 = document.createElement("td").textContent = iniDtlAddState;
        $tr.append($td1);
        $tr.append($td2);
        $tr.append($td3);
        iniAndObTable.append($tr);
    }

}


function showMain(){
    const mainDay = document.getElementById('main-day');
    const mainDate = document.getElementById('main-date');
    const mainMonth = document.getElementById('main-month');
    const setUpDate = document.getElementById('setUpDate');
    const mainYear = document.getElementById('main-year');

    let returnDate;

    if(today.getMonth()+1 < 10){
        returnDate = today.getFullYear() + "-0" + (today.getMonth()+1);
    }else{
        returnDate = today.getFullYear() + "-" + (today.getMonth()+1);
    }
    if(today.getDate() < 10){
        returnDate += "-0" + today.getDate();
    }else{
        returnDate += "-" + today.getDate();
    }

    var day = dayList[today.getDay()];
    var date = today.getDate().toString();
    var month = today.toLocaleString("en-US", {month : "short"});
    var year = today.getFullYear().toString();

    var theDate = year + '&nbsp;' + month + '&nbsp;' + date + '&nbsp;' + day.slice(0,3);

    var calendarTitle = $("#current-year-month");
    calendarTitle.empty();
    calendarTitle.append(theDate);

    setUpDate.value = returnDate;
    setUpDate.innerHTML = returnDate;

    return returnDate;
}

//clickedDate1.classList.add('active');
//var prevBtn = document.getElementById('prev');
//var nextBtn = document.getElementById('next');
//prevBtn.addEventListener('click',prev);
//nextBtn.addEventListener('click',next);

//function activeMainMonth(pointFirst){
//    var clickedDate = document.getElementById(pointDate, pointDate.getDate());
//    var pointPageYear = getPageYear(pointFirst);
//    var mainMonthTable = [];
//    for(let i = 1; i <= pointPageYear[pointFirst.getMonth()]; i++){
//        tdGroup[i] = document.getElementById(i);
//        tdGroup[i].addEventListener('click', changeToday);
//    }
//    function changeToday(e){
//        for(let i = 1; i <= pointPageYear[pointFirst.getMonth()]; i++){
//            if(tdGroup[i].classList.contains('active')){
//                tdGroup[i].classList.remove('active');
//            }
//        }
//        console.log(e);
//        clickedDate1 = e.target;
//        clickedDate1.classList.add('active');
//        let selectedDate = showMain();
//        keyValue = today.getFullYear() + '' + today.getMonth()+ '' + today.getDate();
//        reshowingList(selectedDate);
//    }
//}

function getDateFromId(idStr){
    if(idStr != ""){
        dateStr = "";
        dateStr += idStr.slice(0, 4);
        dateStr += "-";
        dateStr += idStr.slice(4, 6);
        dateStr += "-";
        dateStr += idStr.slice(-2);
        console.log(dateStr);
        return new Date(dateStr);
    }
}

function getDate4Ajax(idStr){
    if(idStr != ""){
        dateStr = "";
        dateStr += idStr.slice(0, 4);
        dateStr += "-";
        dateStr += idStr.slice(4, 6);
        dateStr += "-";
        dateStr += idStr.slice(-2);
        console.log(dateStr);
        return dateStr;
    }
}

function addTodoTable(){
    console.log("delete");
    var lengthT = $("#toDoListsTable > tbody tr").length;
    console.log(lengthT);
    if(lengthT > 0){
        console.log("delete rows");
        var todoT = document.getElementById("toDoListsTable");
        for(var i=lengthT-1; i>=0; i--){
           //todoT.deleteRow(i);
           console.log(i);
           var test = todoT.deleteRow(i);
        }
    }
}

function addTodo(result){
    var resultTodo = JSON.parse(result);
    console.log(resultTodo);

    if(resultTodo.length > 0){
        var table4Todo = document.getElementById("toDoListsTable");

        var indexRaw = table4Todo.insertRow();
        var cell1 = indexRaw.insertCell(0);
        var cell2 = indexRaw.insertCell(1);
        var cell3 = indexRaw.insertCell(2);
        var cell4 = indexRaw.insertCell(3);
        var cell5 = indexRaw.insertCell(4);

        cell1.innerText = ' ';
        cell2.innerText = 'content';
        cell3.innerText = 'state';
        cell4.innerText = ' ';
        cell5.innerText = ' ';

        for(var obj of resultTodo){
            var newRaw = table4Todo.insertRow();
            var color = newRaw.insertCell(0);
            var content = newRaw.insertCell(1);
            var state = newRaw.insertCell(2);
            var deleteBtn = newRaw.insertCell(3);

            var values = Object.values(obj);

            color.innerText = "●";

            content.innerText = values[2];
            state.innerText = values[4];
            deleteBtn.innerText = "delete";
        }
    }
}

function readToDo(clickedDate){
    console.log(clickedDate);
     $.ajax({
             url : "/readCalendar",
             type : "post",
             contentType: 'application/x-www-form-urlencoded; charset=utf-8',
             dataType : "text",
             data : {"clickedDate" : clickedDate},
             success : function(result){
                 addTodoTable();
                 addTodo(result);
             },
             error : function(err){
                 console.log(err+"에러발생");
             }
      });
}

function removeAllChildElements(parentElement){
    while (parentElement.firstChild) {
      parentElement.removeChild(parentElement.firstChild);
    }
}


function clickDate(pointDate){
    // 캘린더 화면에 접속하면 자동으로 해당일의 날짜가 클릭되어 활성화 상태가 된다.
    if (!pointDate) pointDate = new Date();
    var clickedDate = setDateId(pointDate, pointDate.getDate());
    var clickedDateElement = document.getElementById(clickedDate);
    console.log('clickedDate: ', clickedDate);
    clickedDateElement.classList.add('active');
    // TODO: memberCode 입력부분 수정 필요
    readInitiative(3, clickedDate);
    // TODO: 하위 엘리멘트도 이벤트가 등록되게 해야 함

    // 여기에 첫화면에 대한 to_do 서치하는 함수 넣기 parameter = getDateFromId(clickedDate)
    var param4readToDo = getDate4Ajax(clickedDate);
    readToDo(param4readToDo);

    tdList = $("#calendar-body td");
    console.log(tdList);
    for (td of tdList){
        td.addEventListener('click', changeClickedDate);
        for (tdDiv of td.childNodes){
                tdDiv.addEventListener('click', changeClickedDate);
        }
    }
    function changeClickedDate(e){
        if (clickedDateElement != e.target || clickedDateElement != e.target.parentNode){
            clickedDateElement.classList.remove('active');
            clickedDateElement = e.target;
            clickedDate = e.target.id;
            if(clickedDate == ""){
               clickedDate = clickedDateElement.parentNode.id;
               clickedDateElement = clickedDateElement.parentNode;
                // clickedDateElement.parentNode.classList.add('active');
                ///showCurrentDateOnLeft(getDateFromId(tempClickedDate));
            }
            clickedDateElement.classList.add('active');
            console.log(getDateFromId(clickedDate));
            showCurrentDateOnLeft(getDateFromId(clickedDate));
            // TODO: memberCode 입력부분 수정 필요
            readInitiative(3, clickedDate);
        }
    }

//        console.log(e);
//        clickedDate1 = e.target;
//        clickedDate1.classList.add('active');
////        today = new Date(today.getFullYear(), today.getMonth(), clickedDate1.id);
//        let selectedDate = showMain();
//        keyValue = today.getFullYear() + '' + today.getMonth()+ '' + today.getDate();
//        reshowingList(selectedDate);
//    }
}
