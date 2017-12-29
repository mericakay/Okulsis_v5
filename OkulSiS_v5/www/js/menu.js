
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
    var okuladi = localStorage.getItem("okuladi") + "</br>";
    var okullogo = localStorage.getItem("okullogo");
  
 
    var okulid = localStorage.getItem("okulid");
    var kisiid = localStorage.getItem("kisiid");
    var dersyiliid = localStorage.getItem("dersyiliid");
    var did = localStorage.getItem("did");
    var rolid = localStorage.getItem("RolID");
    var ip = localStorage.getItem("ip");
    var kisiadi = localStorage.getItem("KullaniciAdi");
    var lid = localStorage.getItem("lid");
    var brans = localStorage.getItem("brans");
    alert(brans);
    var cid = localStorage.getItem("cid");
    document.getElementsByTagName("P")[0].innerHTML = okuladi  + kisiadi;
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

                
                $('.row').append('<div class="small-box"><div class="inner"><h3>'+value+'</h3><p>'+text+'</p></div><div class="icon"><i class="ion ion-bag"></i></div> <a href="'+url+'" class="small-box-footer">Detaylar <i class="fa fa-arrow-circle-right"></i></a></div>');
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

