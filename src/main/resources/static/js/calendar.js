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
                $td.setAttribute('id', CNT);
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
        dataType : "text",
        data : {selectedDate : selectedDate},
        success : function(result){
            console.log(this.data);
        },
        error : function(err){
            console.log(err+"에러발생");
            console.log(this.data);
        }
    });
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
        returnDate = today.getFullYear() + "-0" + (today.getMonth()+1) + "-" + today.getDate();
    }else{
        returnDate = today.getFullYear() + "-" + (today.getMonth()+1) + "-" + today.getDate();
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