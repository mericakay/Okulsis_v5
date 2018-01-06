
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

    var okulid = localStorage.getItem("okulid");
    var kisiid = localStorage.getItem("kisiid");
    var dersyiliid = localStorage.getItem("dersyiliid");
    var rolid = localStorage.getItem("RolID");
    var ip = localStorage.getItem("ip");
    var kisiadi = localStorage.getItem("KullaniciAdi");
    var lid = localStorage.getItem("lid");
    var cid = localStorage.getItem("cid");
    var did = localStorage.getItem("did");
    var theDate = new Date();
    var myNewDate = new Date(theDate);
    myNewDate.setDate(myNewDate.getDate() + 1);
    document.getElementById("myDate").valueAsDate = myNewDate;
 try {
        $.ajax({
            url: 'http://' + ip + '/Slim_Proxy_okulsis/SlimProxyBoot.php?url=mobilMenu_mbllogin&RolID=' + rolid + '&languageID=' + lid + '&cid=' + cid + '&did=' + did + '',
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
                        $('#menu ul').append('<li><a href="../' + url + ' ">' + text + '</a></li>');
                    }


                }
            }
        });
    } catch (e) {
        alert(e);
    }
    //contenier başlangıç
    var x = document.getElementById("myDate").value;
    try {
        $.ajax({

            url: 'http://' + ip + '/Slim_Proxy_okulsis/SlimProxyBoot.php?url=KurumVePersonelDevamsizlik_mbllogin&dersYiliID=' + dersyiliid + '&tarih=' + x + '&cid=' + cid + '&languageID=' + lid + '&did=' + did + '',
            type: 'GET',
            dataType: 'json',
            success: function (data) {
                var j;
                var dataSet = [];
                var properties = [];
                //$('#location').empty();
                for (var j = 0; j < data.length; j++) {
                    var Numarasi = data[j].Numarasi;
                    var Adi = data[j].Adsoyad;
                    var SoyAdi = data[j].Soyadi;
                    var Tc = data[j].TCKimlikNo;
                    var aciklama = data[j].DevamsizlikAdi;
                    var selected = data[j].selected;
                    $('#example').append('<tr><td>' + Numarasi + '</td><td>' + Adi + '</td><td>' + aciklama + '</td></tr>');
                }

            }
        });
    } catch (e) {
        alert(e);
    }

    //Contenier Son
};

