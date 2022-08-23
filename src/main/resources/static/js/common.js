function readData(data){
    alert(data);
}

function readForm(formId, url){
      $.ajax({
             url : url,
             type : "post",
             contentType: 'application/x-www-form-urlencoded; charset=utf-8',
             dataType : "text",
             data : $(formId).serialize(),
             success : function(result){
                 console.log(result);
                 console.log(this.data);
             },
             error : function(err){
                 console.log(err+"에러발생");
                 console.log(this.data);
             }
      });
}

function sendDateList(startDate, endDate, dateList, url){
    $.ajax({
         url : url,
         type : "post",
         contentType: 'application/x-www-form-urlencoded; charset=utf-8',
         dataType : "text",
         data : {
                "dateList" : dateList
                },
         success : function(result){
             console.log("sendDateList success");
         },
         error : function(err){
             console.log("sendDateList error");
         }
    });

};

function readFormTodo(formId, url){

    let dataToDo = $('input[name=toDoList]').val();

    $.ajax({
        url : url,
        type : "post",
        contentType: 'application/x-www-form-urlencoded; charset=utf-8',
        dataType : "text",
        data : {toDoList : $('#input-box').val()},
        success : function(result){
            console.log(dataToDo);
        },
        error : function(err){
            console.log(err+"에러발생");
            console.log(dataToDo);
        }
    });

}


// TODO: memberCode 입력 필수
function readInitiative(memberCode, iniDetailAddPlanDate){
    $.ajax({
        url : '/readInitiative',
        type : "post",
        contentType: 'application/x-www-form-urlencoded; charset=utf-8',
        dataType : "json",
        data : {
            "memberCode" : memberCode,
            "iniDetailAddPlanDate" : iniDetailAddPlanDate
        },
        success : function(resp){
            showIniAndObList(resp);
            console.log(resp);
        },
        error : function(err, resp){
            console.log(err+"에러발생");
            console.log(resp);
        }
    });
}