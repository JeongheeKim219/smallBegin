
function readForm(formId, url){

    $.ajax({
         url : url,
         type : "post",
         contentType: 'application/x-www-form-urlencoded; charset=utf-8',
         dataType : "text",
         data : $(formId).serialize(),
         success : function(result){
             console.log("readForm success");
         },
         error : function(err){
             console.log("readForm error");
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
