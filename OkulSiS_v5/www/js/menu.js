
function load() {
  
    $("#showmenu").click(function (e) {
        e.preventDefault();
        $("#menu").toggleClass("show");
    });
    $("#menu a").click(function (event) {
        event.preventDefault();
        if ($(this).next('ul').length - 1) {
            $(this).next().toggle('fast');
            $(this).children('i:last-child').toggleClass('fa-caret-down fa-caret-left');
        }
    });
  
    var okullogo = "http://mobile.okulsis.net:8280/" + localStorage.getItem("okullogo");
   // alert(okullogo);
    var kisilogo = "http://mobile.okulsis.net:8280/" + localStorage.getItem("kisilogo");
    //alert(kisilogo);
    document.getElementById("x").src = kisilogo;
    document.getElementById("y").src = okullogo;
 
    var okulid = localStorage.getItem("okulid");
    var okuladikisa = "</br>&nbsp;&nbsp;&nbsp;<span style='padding-top:10px; position:fixed;'>&nbsp;" + localStorage.getItem("okuladikisa") + " </span>";
    var kisiid = localStorage.getItem("kisiid"  );
    var dersyiliid = localStorage.getItem("dersyiliid");
    var did = localStorage.getItem("did");
    var rolid = localStorage.getItem("RolID");
    var ip = localStorage.getItem("ip");
    var kisiadi = "<span>" + localStorage.getItem("KullaniciAdi") + "&nbsp; </span>";
    var lid = localStorage.getItem("lid");
    var brans = "</br></br></br><span style='padding-top:10px; '>&nbsp;&nbsp;" + localStorage.getItem("brans") + "&nbsp;</span>";
   // alert(brans);
 
    var cid = localStorage.getItem("cid");
    document.getElementsByTagName("P")[0].innerHTML = okuladikisa + brans + kisiadi;

    var headername = ""; 
    
   
  //  alert(ip);
    //menu başlangıç
    try {
        var menuid = "#menuid";
        $.ajax({
            url: 'http://' + ip + '/Slim_Proxy_okulsis/SlimProxyBoot.php?url=mobilMenu_mbllogin&RolID=' + rolid + '&languageID=' + lid + '&cid=' + cid +'&did='+did+'',
            type: 'GET',
            dataType: 'json',
            success: function (data) {
                // alert("geldi");
                var j;
                var len = data.length;
                var dataSet = [];
                var properties = [];
                var url = "";
                var value = "";
                var iconclass = "";
                for (var j = 0; j < data.length; j++) {
                    console.log(url);
                    text = data[j].MenuAdi;
                    url = data[j].URL;
                    value = data[j].value;
                    iconclass = data[j].iconclass;
                    collapse = data[j].collapse;
                    headerss = data[j].header;
                    ID = data[j].ID;
                    menuid + j;
                   // alert(headerss);
                    
                    if (collapse == 1) {
                        $('#menu').append('<span class="opener"  >' + text + '</span>');
                    } else {
                        $('#menu').append(' <ul id=' + ID + '><li><a   href="' + url + '  ">' + text + '</a></li></ul>');
                    }
                  
                    
                }
                $('#menu ul').on('touchstart click', function () {
                   // alert(this.id);
                    var row = this.id;
                    for (var i = 0; i < data.length; i++) {
                        if (row == data[i].ID) {

                            localStorage.setItem("headername", data[i].header);
                        }
                    }

                });
            }
        });
    } catch (e) {
        alert(e);
    }
   
    //menu Son

    //dashboard başlangıç
   $.ajax({
       url: 'http://' + ip + '/Slim_Proxy_okulsis/SlimProxyBoot.php?url=DashboarddataDersProgrami_mbllogin&kisiId=' + kisiid + '&rolId=' + rolid + '&languageID=' + lid + '&cid=' + cid + '&did=' + did +'',
        type: 'GET',
        dataType: 'json',
        success: function (data) {
            var j;
            var dataSet = [];
            var properties = [];
            var url = "";
            var value = "";
            var iconclass = "";
            for (var j = 0; j < data.length; j++) {
                text = data[j].dbMenuAdi;            
                url = data[j].URL;
               
                value = data[j].adet;
                iconclass = data[j].iconclass;
                ImageURL = data[j].ImageURL;
               // alert(value);
                if (value == "00") {
                    $('.row').append('<button class="square-button"><img class="small-img" src="' + ImageURL+'"/><br/><span class="button-text">' + text+'</span> </input></button>');
                }
                else {

                    $('.row').append('<button class="square-button"><img class="small-img" src="' + ImageURL + '"/><br/><span class="button-text">' + text +'</span> </input></button>');
                }


                
            }
          //  $('.row').on('touchstart click', function () { alert("aa") });
          
        }
       
    });
    // Dashboard son  <input class="testbutton" type="button" id="button1" value="Gönder">

    //contenier başlangıç
 

   /* $.ajax({
        url: 'http://' + ip + '/Slim_Proxy_okulsis/SlimProxyBoot.php?url=DashboarddataDersProgrami_mbllogin&kisiId=' + kisiid + '&rolId=' + rolid + '&languageID=' + lid + '&cid=' + cid +'',
            type: 'GET',
            dataType: 'json',
            success: function (data) {
               // localStorage.setItem("gelendata", data);
               // alert(data);
                if (data == "") {
                    document.getElementById("example").style.display = "none";
                }
               
               
                var j;
                var dataSet = [];
                var properties = [];
                for (var j = 0; j < data.length; j++) {
                   
                    var derssaati = data[j].DersSaati;
                    var sinifadi = data[j].SinifAdi;
                    var ogretmen = data[j].ogretmen;
                    var ogrenci = data[j].ogrenci;
                   // alert(derssaati);
                    
                    if (j === 1) {
                        var alan1 = data[j].Alan1;
                        var alan2 = data[j].Alan2;
                        var alan3 = data[j].Alan3;
                        $('#example').append('<thead><tr><th>' + alan1 + '</th><th>' + alan2 + '</th><th>' + alan3 + '</th></tr></tbody>');
                    }
                    $('#example').append('<tbody><tr><td>' + derssaati + '</td><td>' + sinifadi + '</td><td>' + ogretmen + '</td></tr></tbody>');
                }
               /* $("#example").on('click', 'td', function () {
                    var header = Array();

                    $("table tr th").each(function (i, v) {
                        header[i] = $(this).text();
                    })

                    alert(header);

                    var data = Array();

                    $("table tr").each(function (i, v) {
                        data[i] = Array();
                        $(this).children('td').each(function (ii, vv) {
                            data[i][ii] = $(this).text();
                        });
                    })

                    alert(data);
                    
                    var myJSON = JSON.stringify(data);
                    console.log(myJSON);

                });


            }


        });*/

    
    //Contenier Son
};

