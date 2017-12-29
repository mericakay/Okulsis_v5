
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
    var okuladikisa = "<span font-size:80%;'>" + localStorage.getItem("okuladikisa") + "&nbsp;&nbsp; </span></br></br></br>" ;
    var okullogo = localStorage.getItem("okullogo");
    var kisilogo = "http://mobile.okulsis.net:8280/" + localStorage.getItem("kisilogo");
    //alert(kisilogo);
    document.getElementById("x").src = kisilogo;
    document.getElementById("y").src = "../images/yyyy.png";
 
    var okulid = localStorage.getItem("okulid");
    var okuladikisa = localStorage.getItem("okuladikisa");
    var kisiid = localStorage.getItem("kisiid"  );
    var dersyiliid = localStorage.getItem("dersyiliid");
    var did = localStorage.getItem("did");
    var rolid = localStorage.getItem("RolID");
    var ip = localStorage.getItem("ip");
    var kisiadi = "<span style=' border-style:solid;  border-width: 1px;font-size: 110%;'>&nbsp;&nbsp;&nbsp;&nbsp;" + localStorage.getItem("KullaniciAdi") + "&nbsp;&nbsp; </span></br>";
    var lid = localStorage.getItem("lid");
    var brans = "</br></br></br><span style='border-style:solid;  border-width: 1px; font-size: 110%; margin-left:25%; '>&nbsp;&nbsp;" + localStorage.getItem("brans") +"&nbsp;&nbsp; </span></br>";
   // alert(brans);
    var cid = localStorage.getItem("cid");
    document.getElementsByTagName("P")[0].innerHTML = brans + kisiadi;
    $('#okuladiamk').append('' + okuladikisa + '');
  //  alert(ip);
    //menu başlangıç
    try {
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
                    
                    if (collapse == 1) {
                        $('#menu ul').append('<span class="opener" onclick="myFunction()" >' + text + '</span>');
                    } else {
                        $('#menu ul').append('<li><a href="' + url + ' ">' + text + '</a></li>');
                    }
                  

                }
            }
        });
    } catch (e) {
        alert(e);
    }
   
    //menu Son

    //dashboard başlangıç
   $.ajax({
       url: 'http://' + ip + '/Slim_Proxy_okulsis/SlimProxyBoot.php?url=DashboarddataDersProgrami_mbllogin&kisiId=' + kisiid + '&rolId=' + rolid + '&languageID=' + lid + '&cid=' + cid +'',
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
                text = data[j].MenuAdi;            
                url = data[j].URL;
               
                value = data[j].adet;
                iconclass = data[j].iconclass;

             
                    $('.row').append('<a href=' + url + '><ul id="dashboardnew" >' + text + '<p>' + value + '</p></ul></a>');
                
            }
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

