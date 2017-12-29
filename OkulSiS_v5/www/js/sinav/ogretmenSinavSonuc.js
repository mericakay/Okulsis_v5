﻿
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
    var did = localStorage.getItem("did");
    var rolid = localStorage.getItem("RolID");
    var ip = localStorage.getItem("ip");
    var kisiadi = localStorage.getItem("KullaniciAdi");
    var lid = localStorage.getItem("lid");
    var egitimyiliid = localStorage.getItem("egitimyiliid");
    var cid = localStorage.getItem("cid");



    //menu başlangıç

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
    //menu Son


    //contenier başlangıç
    try {
        $.ajax({
            url: 'http://' + ip + '/Slim_Proxy_okulsis/SlimProxyBoot.php?url=Ogretmensinavlistesi_mbllogin&ogretmenID=' + kisiid + '&egitimYilID=' + egitimyiliid + '&okulID=' + okulid + '&kisiID=' + kisiid + '&languageID=' + lid + '&cid=' + cid + '&did=' + did + '&grid=0',
            type: 'GET',
            dataType: 'json',
            success: function (data) {

                var j;
                var dataSet = [];
                var properties = [];
                $('#selectNumber').empty();
                for (var j = 0; j < data.length; j++) {
                    var text = data[j].SinavAciklamasi;
                    var sinavid = data[j].SinavID;
                    // alert(sinifid);
                    $('#selectNumber').append("<option value=" + sinavid + ">" + text + "</option>");
                }
                $("#selectNumber").on('change', function () {

                    $.ajax({
                        url: 'http://' + ip + '/Slim_Proxy_okulsis/SlimProxyBoot.php?url=OgrencilerinAldigiNotlarSinavBazli_mbllogin&sinavID=' + this.value + '&donemID=1&cid=' + cid + '&languageID=' + lid + '&did=' + did + '&grid=1',
                        type: 'GET',
                        dataType: 'json',
                        success: function (data) {
                            var j;
                            var dataSet = [];
                            var properties = [];
                            //$('#location').empty();
                            for (var j = 0; j < data.length; j++) {
                                var numarasi = data[j].Numarasi;
                                var adsoyad = data[j].adsoyad;
                                var aciklama = data[j].Aciklamasi;
                                var puan = data[j].Puan;


                                $('#giden').append('<tr><td>' + numarasi + '</td><td>' + adsoyad + '</td><td>' + aciklama + '</td><td>' + puan + '</td></tr>');
                            }

                        }
                    });

                });
            }
        });

    } catch (e) {
        alert(e);
    }


    //Contenier Son

};
