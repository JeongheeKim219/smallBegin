function datePicker(){
    let year, month, date, now, today;

    now = new Date();
    year = now.getFullYear();
    month = now.getMonth() + 1;
    date = now.getDate();

    if (date < 10) {
        date = '0' + date;
    }

    if (month < 10) {
        month = '0' + month;
    }

    today = year + "-" + month + "-" + date;

    document.getElementById("obStartDate").setAttribute("min", today);
    document.getElementById("obStartDate").setAttribute("value", today);
}

function btnHide(){
    $('.material-icons-outlined').hide();
}
function btnShow(){
    $('.material-icons-outlined').show();
}
function divHide(){
    $('#krAdd2').hide();
    $('#krAdd3').hide();
}

(function($){

    $(function(){
        btnHide();
        divHide();
        datePicker();

        $('.keyResult').keyup(function(){
            var keyResult = $(this).val();
            if(keyResult.length > 3){
                btnShow();
            }
        })
        /*            $('.material-icons-outlined').click(function(){
                        var krInput = document.getElementsByClassName('.keyResult');
                        var krbtn = document.getElementsByClassName('material-icons-outlined');
                        $('#krAdd').append(krInput);
                        $('#krAdd').append(krbtn);
                    })*/

        $('#krbtn1').click(function(){
            $('#krAdd2').show();
            $('#krbtn2').hide();
        })

        $('#krbtn2').click(function(){
            $('#krAdd3').show();
            $('#krbtn3').hide();
        })

        $('#krbtn3').click(function(){
            alert("목표값은 최대 3개까지 작성 가능합니다");
        })

        //ajax
        $('#obClick').click(function(){
            readForm('#obForm','/readOBForm');
        })
    })
})(jQuery)