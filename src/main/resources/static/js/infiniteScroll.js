function YesScroll() {
    console.log('*********************YesScroll test');
//    const pagination = document.querySelector('.btn-wrap clearfix'); // 페이지네이션 정보획득
//    const fullContent = document.querySelector('.content-right'); // 전체를 둘러싼 컨텐츠 정보획득

    const screenHeight = screen.height; // 화면 크기
//
//    var contentRight = document.getElementsByClassName('content-right');
    var contentRight = document.querySelector('.content-right');
    var flag = false; // 일회용 글로벌 변수
    var bottomMonthDate;
    var topMonthDate;
    var nextMonthCnt = 100;
    var cntPlus = 2;

    document.addEventListener('scroll',OnScroll,{passive:true}); // 스크롤 이벤트함수정의
//    console.log('screenHeight :', screenHeight)

//    contentRight.addEventListener('scroll', OnScroll, {passive : true});

    function OnScroll () { //스크롤 이벤트 함수
        console.log('====================OnScroll test');

        const fullHeight = contentRight.clientHeight; // content-right 클래스의 높이
//        const scrollPosition = pageYOffset; // 스크롤 위치

        console.log('window.innerHeight :', window.innerHeight);
        console.log('screenHeight :', screenHeight);
        console.log('contentRight.clientHeight :', contentRight.clientHeight);
        console.log('contentRight.height :', contentRight.height);
        console.log('contentRight.style.height :', contentRight.style.height);
        console.log('window.scrollY :', window.scrollY);
        console.log('document.body.offsetHeight :', document.body.offsetHeight);
//        console.log('(document.body.offsetHeight * 0.9) :', document.body.offsetHeight * 0.9);
//        console.log('(window.innerHeight + window.scrollY) >= document.body.offsetHeight');
//        console.log((window.innerHeight + window.scrollY) >= document.body.offsetHeight);

        // TODO : calendar1.js - attachNextForScroll에서 monthCnt 조정 필요
        console.log('before bottomMonthDate :', bottomMonthDate);
        // 스크롤이 바닥에 닿았을 때
        if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight && !flag) { // 만약 전체높이-화면높이/2가 스크롤포지션보다 작아진다면, 그리고 oneTime 변수가 거짓이라면
//        if (window.scrollY >= (document.body.offsetHeight * 0.9) && !flag) { // 스크롤포지션이 전체 길이의 10% 이상으로 내려간다면, flag 변수가 거짓이라면
//        if (window.scrollY == (document.body.offsetHeight * 0.9)) { // 스크롤포지션이 전체 길이의 10% 이상으로 내려간다면, flag 변수가 거짓이라면
            console.log('if works1 ---------------------------------');
//            flag = true; // oneTime 변수를 true로 변경해주고,
            bottomMonthDate = attachNextForScroll(bottomMonthDate, nextMonthCnt * cntPlus, flag);
//            flag = flss; // flag 변수를 로 변경해주고,
            cntPlus++;
            console.log('after bottomMonthDate :', bottomMonthDate);
        // TODO : 스크롤이 완전히 올라갔을 때는 아직 구현 안 됨
        // TODO : calendar1.js - attachPrevForScroll에서 monthCnt 조정 필요
        }
//        } else if (window.scrollY ==  0 && flag) {
//            console.log('if works2 ---------------------------------');
//            flag = true;
//            topMonthDate = attachPrevForScroll(topMonthDate, nextMonthCnt)
//            flag = false;
//        }

    }

//    function madeCalendar() {
//        const calendarBody = document.createElement('tbody');
//        const calendar = calendarBody.cloneNode('false');
//        calendarBody.className = 'calendar-body';
//
//        for (var i=0; i<5; i++){
//            calendar.appendChild(calendarBody.cloneNode('true'));
//        }
//        calendarBody.className = 'calendar-body';
//        fullContent.appendChild(calendar);
//        oneTime = false;
//    }
 }