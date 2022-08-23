let currentTitle = document.getElementById('current-year-month');
/*var calendarBody = document.getElementById('calendar-body');*/
var today = new Date();
var first = new Date(today.getFullYear(), today.getMonth(),1);
var dayList = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
var monthList = ['January','February','March','April','May','June','July','August','September','October','November','December'];
var leapYear=[31,29,31,30,31,30,31,31,30,31,30,31];
var notLeapYear=[31,28,31,30,31,30,31,31,30,31,30,31];
var pageFirst = first;
var pageYear;

let inputBox = document.getElementById('input-box');
var inputDate = document.getElementById('input-data');
var inputList = document.getElementById('input-list');
var delText = 'X';
//inputDate.addEventListener('click',addTodoList);
var dataCnt = 1;
var keyValue = today.getFullYear() + '' + today.getMonth()+ '' + today.getDate();
let todoList = [];
todoList[keyValue] = [];

if(first.getFullYear() % 4 === 0){
    pageYear = leapYear;
}else{
    pageYear = notLeapYear;
}

function showCalendar(){
    let monthCnt = '100';
    let cnt = 1;
    for(var i = 0; i < 6; i++){ //주에 대한 for문
        var $tr = document.createElement('tr');
        $tr.setAttribute('id', monthCnt);
        for(var j = 0; j < 7; j++){
            if((i === 0 && j < first.getDay()) || cnt > pageYear[first.getMonth()]){
                var $td = document.createElement('td');
                $tr.appendChild($td);
            }else{
                var $td = document.createElement('td');
                $td.textContent = cnt;
                var CNT = cnt.toString();
                var tdDateCnt = CNT.length < 2? 0 + CNT : CNT;
                //TODO: 변경설명, td에 attr 추가
                $td.setAttribute('id', CNT);
                $td.setAttribute('data-td-date', showMain().substring(0, 8) + tdDateCnt);
                // td.attr('data-td-date') = td의 해당날짜;
                $td.setAttribute('class', 'td-date');
                $tr.appendChild($td);
                cnt++;
            }
        }
        monthCnt++;
        document.getElementById("calendar-body").appendChild($tr);
    }
    showMain();
}

function removeCalendar(){
    let catchTr = 100;
    for(var i = 100; i< 106; i++){
        var $tr = document.getElementById(catchTr);
        $tr.remove();
        catchTr++;
    }
}

function prev(){
    let preBox = document.getElementById('input-box').value;
    preBox.value = '';
    const $divs = document.querySelectorAll('#input-list > div');
/*    console.log("$divs");
    console.log($divs);*/
    $divs.forEach(function(e){
        e.remove(); //
    });
    const $btns = document.querySelectorAll('#input-list > button');
    $btns.forEach(function(e1){
        e1.remove();
    });
    if(pageFirst.getMonth() === 1){ //현재 1월일 경우 이전 년도 보여주기
        pageFirst = new Date(first.getFullYear()-1, 12, 1);
        first = pageFirst;
        if(first.getFullYear() % 4 === 0){
            pageYear = leapYear;
        }else{
            pageYear = notLeapYear;
        }
    }else{
        pageFirst = new Date(first.getFullYear(), first.getMonth()-1, 1);
        first = pageFirst;
    }
    // 이전으로 클릭 될때 날짜가 같은 달에 대해서 오늘로 보여줌(달력에 크게 띄우는거)
    today = new Date(today.getFullYear(), today.getMonth()-1, today.getDate());
    currentTitle = monthList[first.getMonth()] + '&nbsp;&nbsp;&nbsp;&nbsp;'+ first.getFullYear();
    removeCalendar();
    showCalendar();
    showMain();
    clickedDate1 = document.getElementById(today.getDate());
    //clickedDate1.classList.add('active');
    clickStart();
    reshowingList();
}

function next(){
    let nextBox = document.getElementById('input-box').value;
    nextBox.value = '';
    const $divs = document.querySelectorAll('#input-list > div');
    $divs.forEach(function(e){
        e.remove();
    });
    const $btns = document.querySelectorAll('#input-list > button');
    $btns.forEach(function(e1){
        e1.remove();
    });
    if(pageFirst.getMonth() === 12){
        pageFirst = new Date(first.getFullYear()+1, 1, 1);
        first = pageFirst;
        if(first.getFullYear() % 4 === 0){
            pageYear = leapYear;
        }else{
            pageYear = notLeapYear;
        }
    }else{
        pageFirst = new Date(first.getFullYear(), first.getMonth()+1, 1);
        first = pageFirst;
    }
    today = new Date(today.getFullYear(), today.getMonth()+1, today.getDate());
    currentTitle = monthList[first.getMonth()] + '&nbsp;&nbsp;&nbsp;&nbsp;'+ first.getFullYear();
    removeCalendar();
    showCalendar();
    showMain();
    clickedDate1 = document.getElementById('selected-date-show');
    let selectedDate = showMain();
    //clickedDate1.classList.add('active');
    clickStart();
    reshowingList();
}

function reshowingList(selectedDate){
    $.ajax({
        url : '/readCalendar',
        type : "post",
        contentType: 'application/x-www-form-urlencoded; charset=utf-8',
        dataType : "json",
        data : {selectedDate : selectedDate},
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

//TODO : 새로 추가 된 함수
function showIniAndObList(resp){
    // iniAndObTable이 있는지 확인
    // 그 다음 있으면 요소 삭제, 없으면 그대로 진행
    // 그러고 iniAndObTable에 테이블 id = iniAndObTable - resp 추가하기
    var iniAndOb = resp;
    var iniAndObTable = document.getElementById("iniAndObTable");
    var tableCheck = !!document.getElementById("iniAndObTable");

    let selectedDate = showMain();
    var tdDate = new Date(selectedDate);
    var str = "<tr><td>Ob Content</td><td>Ini Content</td><td>State</td></tr>";
    for (var obj of iniAndOb){
        var dateList = obj["dateList"];
        var monthList = obj["plannedDateList"];
        if (dateList && tdDate > new Date(obj.iniStartDate) && tdDate < new Date(obj.iniEndDate)){
            var dayList = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];
            for (day of dayList){
                if(dateList[day] == "1" && dayList.indexOf(day) == tdDate.getDay()){
                    str += "<tr id=" + obj.categoryCode + ">";
                    str += "<td>" + obj.obContent + "</td>";
                    str += "<td>" + obj.iniContent + "</td>";
                    str += "<td><input type='checkbox'></td>";
                    str += "</tr>";
                }
            }
        } else if (monthList){
            for (date of monthList){
                if (selectedDate == date){
                    str += "<tr id=" + obj.categoryCode + ">";
                    str += "<td>" + obj.obContent + "</td>";
                    str += "<td>" + obj.iniContent + "</td>";
                    str += "<td><input type='checkbox'></td>";
                    str += "</tr>";
                }
            }
        }
    }
    $(iniAndObTable).html(str);
}

/*function reshowingList(){
    keyValue = today.getFullYear() + '' + today.getMonth()+ '' + today.getDate();
    let reshowList = document.getElementById('input-list').value;
    if(todoList[keyValue] === undefined){
        reshowList.remove();
        todoList[keyValue] = [];
        const $divs = document.querySelectorAll('#input-list > div');
        $divs.forEach(function(e){
            e.remove();
        });
        const $btns = document.querySelectorAll('#input-list > button');
        $btns.forEach(function(e1){
            e1.remove();
        });
    }else if(todoList[keyValue].length ===0){
        reshowList.remove();
        const $divs = document.querySelectorAll('#input-list > div');
        $divs.forEach(function(e){
            e.remove();
        });
        const $btns = document.querySelectorAll('#input-list > button');
        $btns.forEach(function(e1){
            e1.remove();
        });
    }else{
        const $divs = document.querySelectorAll('#input-list > div');
        $divs.forEach(function(e){
            e.remove();
        });
        const $btns = document.querySelectorAll('#input-list > button');
        $btns.forEach(function(e1){
            e1.remove();
        });
        var $div = document.createElement('div');
        for(var i = 0; i < todoList[keyValue].length; i++){
            var $div = document.createElement('div');
            $div.textContent = '-' + todoList[keyValue][i];
            var $btn = document.createElement('button');
            $btn.setAttribute('type', 'button');
            $btn.setAttribute('id', 'del-ata');
            $btn.setAttribute('id', dataCnt+keyValue);
            $btn.setAttribute('class', 'del-data');
            $btn.textContent = delText;
            inputList.appendChild($div);
            inputList.appendChild($btn);
            $div.addEventListener('click',checkList);
            $btn.addEventListener('click',deleteTodo);
            inputBox.value = '';
            function deleteTodo(){
                $div.remove();
                $btn.remove();
            }
        }
    }

}*/

console.log(keyValue);
function checkList(e){
    e.currentTarget.classList.add('checked');
}

function showMain(){
    const mainDay = document.getElementById('main-day');
    const mainDate = document.getElementById('main-date');
    const selectedDate = document.getElementById('selected-date');
    const selectedDateShow = document.getElementById('selected-date-show');
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
    mainDay.innerHTML = dayList[today.getDay()];
    mainDate.innerHTML = today.getDate().toString();
    selectedDate.innerHTML = returnDate;
    selectedDateShow.innerHTML = today.getDate();
    return returnDate;
}
var clickedDate1 = document.getElementById(today.getDate());
//clickedDate1.classList.add('active');
//var prevBtn = document.getElementById('prev');
//var nextBtn = document.getElementById('next');
//prevBtn.addEventListener('click',prev);
//nextBtn.addEventListener('click',next);
var tdGroup = [];
function clickStart(){
    for(let i = 1; i <= pageYear[first.getMonth()]; i++){
        tdGroup[i] = document.getElementById(i);
        tdGroup[i].addEventListener('click',changeToday);
    }
}
function changeToday(e){
    for(let i = 1; i <= pageYear[first.getMonth()]; i++){
        if(tdGroup[i].classList.contains('active')){
            tdGroup[i].classList.remove('active');
        }
    }
    clickedDate1 = e.target;
    clickedDate1.classList.add('active');
    today = new Date(today.getFullYear(), today.getMonth(), clickedDate1.id);
    let selectedDate = showMain();
    keyValue = today.getFullYear() + '' + today.getMonth()+ '' + today.getDate();
    reshowingList(selectedDate);
}