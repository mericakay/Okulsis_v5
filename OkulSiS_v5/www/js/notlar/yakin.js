
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
    var kurumid = localStorage.getItem("kurumid");
    var cid = localStorage.getItem("cid");
    var egitimyiliid = localStorage.getItem("egitimyiliid");


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
            url: 'http://' + ip + '/Slim_Proxy_okulsis/SlimProxyBoot.php?url=VeliOgrencileri_mbllogin&dersYiliID=' + dersyiliid + '&kisiId=' + kisiid + '&cid=' + cid + '&languageID=' + lid + '&did=' + did + '',
            type: 'GET',
            dataType: 'json',
            success: function (data) {
                var j;
                var dataSet = [];
                var properties = [];
                var text = "";
                var seviyeid = "";
                $('#sube').empty();
                for (var j = 0; j < data.length; j++) {
                    text = data[j].AdiSoyadi;
                    seviyeid = data[j].OgrenciSeviyeID;

                    $('#sube').append("<option value=" + seviyeid + ">" + text + "</option>");
                }
                if (data.length == 2) {
                    document.getElementById("sube").style.visibility = "hidden";
                    document.getElementsByTagName("P")[0].innerHTML = text;
                    $.ajax({
                        url: 'http://' + ip + '/Slim_Proxy_okulsis/SlimProxyBoot.php?url=KySubeOgrenciDersListesi_mbllogin&ogrenciSeviyeID=' + seviyeid + '&cid=' + cid + '&languageID=' + lid + '&did=' + did + '',
                        type: 'GET',
                        dataType: 'json',
                        success: function (data) {
                            var j;
                            var dataSet = [];
                            var properties = [];
                            //$('#location').empty();
                            for (var j = 0; j < data.length; j++) {
                                var derssaati = data[j].HaftalikDersSaati;
                                var Adi = data[j].DersAdi;
                                var bir = data[j].Donem1_DonemNotu;
                                var iki = data[j].Donem2_DonemNotu;
                                var ys = data[j].YilSonuNotu;
                                var selected = data[j].selected;
                                $('#example').append('<tr><td>' + Adi + '</td><td>' + derssaati + '</td><td>' + bir + '</td><td>' + iki + '</td><td>' + ys + '</td></tr>');
                            }

                        }
                    });
                }
                $("#sube").on('change', function () {
                    $.ajax({
                        url: 'http://' + ip + '/Slim_Proxy_okulsis/SlimProxyBoot.php?url=KySubeOgrenciDersListesi_mbllogin&ogrenciSeviyeID=' + seviyeid + '&cid=' + cid + '&languageID=' + lid + '&did=' + did + '',
                        type: 'GET',
                        dataType: 'json',
                        success: function (data) {
                            var j;
                            var dataSet = [];
                            var properties = [];
                            //$('#location').empty();
                            for (var j = 0; j < data.length; j++) {
                                var derssaati = data[j].HaftalikDersSaati;
                                var Adi = data[j].DersAdi;
                                var bir = data[j].Donem1_DonemNotu;
                                var iki = data[j].Donem2_DonemNotu;
                                var ys = data[j].YilSonuNotu;
                                var selected = data[j].selected;
                                $('#example').append('<tr><td>' + Adi + '</td><td>' + derssaati + '</td><td>' + bir + '</td><td>' + iki + '</td><td>' + ys + '</td></tr>');
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

