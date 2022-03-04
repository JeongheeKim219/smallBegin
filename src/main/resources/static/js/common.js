function readData(data){
    alert(data);
};

function readForm(formId, url){

      $.ajax({
             url : url,
             type : "post",
             contentType: 'application/x-www-form-urlencoded; charset=utf-8',
             dataType : "text",
             data : $(formId).serialize(),
             success : function(result){
                 console.log("success");
             },
             error : function(err){
                 console.log("error");
             }
      });

}
