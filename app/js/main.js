function getDateList(date) {
    //console.log(date);
    var date = date || "11.11.2015";
    //var date = "11.11.2015";
    var data_array = Koledar['Urnik'];

    var tmp = date.split('.');
    var x = new Date(tmp[2] + '-' + tmp[1] + '-' + tmp[0]).getTime();
    var y = new Date('2015-11-11').getTime();
    //console.log(x);
    //console.log(y);
    if(x < y){
        date = '11.11.2015';
    }

    var today = _.where(data_array, {"datum": date});
    //console.log(today);
    if (today === '') {
        $('#drop option[value="11.11.2015"]').attr('selected', true)
        today = _.where(data_array, {"datum": '11.11.2015'});
    } 

    var data = {};
    data.spored = today;

    renderLoad(data)
}
function renderLoad(dataarray) {
    $.get('template/list.html', function (template) {
        var rendered = Mustache.render(template, dataarray);
        //console.log(rendered);
      
        $('#koledar.content ul').html(rendered);
        setTimeout(function () {
            $('#koledar').mCustomScrollbar();
        }, 100);



    });
}
function renderLiffe(dataarray) {

    var data = {};
    data.podatki = Perspektive;

    $.get('template/liffe.html', function (template) {
        var rendered = Mustache.render(template, data);

        $('#koledar').html(rendered);
        //console.debug();

    });
}
function renderPopup(data) {

    $.get('template/popup.html', function (template) {
        var rendered = Mustache.render(template, data);
        //console.log(rendered);
        $("#mylightbox").html(rendered);
        $.featherlight($("#mylightbox"));
        //console.debug();

    });
}
function openMovie(id){
        
        var filteredGoal = _.where(MOVIES, {id: id});
        if(filteredGoal.length === 1){
             var data = filteredGoal[0].data.LIFFe_Filmi.Film[0];
             //console.log(data);
             var inject = {};
             inject.title = '<b>' + data.Naslov_SLO[0] + '</b> - ' + data.Naslov_ORIG[0];
             inject.img = data.foto[0];
             inject.descr = data.Opis[0];
             inject.youtube=  data.Youtube_SI[0];
             inject.director=  data.Reziser[0];
             inject.dolzina=  data.Dolzina[0];
             renderPopup(inject);
             //$("#mylightbox").html(JSON.stringify(inject));
        }
       
}
$(document).ready(function () {
    //renderLiffe(Perspektive);
//    var date = $("#server_current_date").html();
//    date = date.split("-");
//    var d = new Date();
//    var dan = d.getDate();
//    var dan = d.getDate();
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1; //January is 0!
    var yyyy = today.getFullYear();

    if (dd < 10) {
        dd = '0' + dd
    }

    if (mm < 10) {
        mm = '0' + mm
    }

    var danes = dd + "." + mm + "." + yyyy;
   

    $('#drop option[value="' + danes + '"]').attr("selected", true)

    getDateList(danes);


    $('#drop').change(
            function () {

                var val2 = $('#drop option:selected').val();


                getDateList(val2);
                // Do something with val1 and val2 ...
            }
    );




});
