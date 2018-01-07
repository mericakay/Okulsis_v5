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
    var rolid = localStorage.getItem("RolID");
    var ip = localStorage.getItem("ip");
    var kisiadi = localStorage.getItem("KullaniciAdi");
    var lid = localStorage.getItem("lid");
    var cid = localStorage.getItem("cid");
    var did = localStorage.getItem("did");
    //menu başlangıç
    var gelendonem = 1;
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


    try {
        $.ajax({
            url: 'http://' + ip + '/Slim_Proxy_okulsis/SlimProxyBoot.php?url=VeliOgrencileri_mbllogin&dersYiliID=' + dersyiliid + '&kisiId=' + kisiid + '&cid=' + cid + '&languageID=' + lid + '&did=' + did + '',
            type: 'GET',
            dataType: 'json',
            success: function (data) {
                var j;
                var dataSet = [];
                var properties = [];
                $('#sube').empty();
                for (var j = 0; j < data.length; j++) {
                    var text = data[j].AdiSoyadi;
                    var ogrenciid = data[j].OgrenciID;

                    $('#sube').append("<option value=" + ogrenciid + ">" + text + "</option>");
                }
                if (data.length == 2) {
                    document.getElementById("sube").style.visibility = "hidden";
                    document.getElementsByTagName("P")[0].innerHTML = text;
                    $("#donem").on('change', function () {
                        $("#example td").remove();
                        var secilendonem = document.getElementById("donem").value;
                        // alert(secilendonem);

                        if (secilendonem === "1.donem") {

                            gelendonem = 1;



                        }
                        else {
                            gelendonem = 2;


                        }
                        try {
                            // alert(ip);
                            $.ajax({
                                url: 'http://' + ip + '/Slim_Proxy_okulsis/SlimProxyBoot.php?url=OgrenciKarnesi_mbllogin&donemID=' + gelendonem + '&ogrenciID=' + ogrenciid + '&cid=' + cid + '&languageID=' + lid + '&did=' + did + '',
                                type: 'GET',
                                dataType: 'json',
                                success: function (data) {
                                    var j;
                                    var dataSet = [];
                                    var properties = [];
                                    //$('#location').empty();
                                    for (var j = 0; j < data.length; j++) {
                                        var dersadi = data[j].DersAdi;
                                            var hs = data[j].HaftalikDersSaati;
                                            var ysp = data[j].YilSonuPuani;
                                            var y1 = data[j].Yazili1;
                                            var y2 = data[j].Yazili2;
                                            var y3 = data[j].Yazili3;
                                            var y4 = data[j].Yazili4;
                                            var y5 = data[j].Yazili5;
                                            var ortaksinav = data[j].Yazili6;
                                            var perf1 = data[j].Perf1;
                                            var perf2 = data[j].Perf2;
                                            var perf3 = data[j].Perf3;
                                            var u1 = data[j].uygulama1;
                                            var u2 = data[j].uygulama2;
                                            var u3 = data[j].uygulama3;
                                            var prj1 = data[j].Proje1;
                                            var odv1 = data[j].Odev1;
                                            var ortalama = data[j].Donem_PuanOrtalamasi;
                                            var atoplam = data[j].AgirlikliYilSonuNotu;
                                            var aortalama = data[j].AgirlikliYilsonuPuani;


                                            $('#example').append('<tr><td>' + dersadi + '</td><td class="hs">' + hs + '</td><td>' + y1 + '</td><td>' + y2 + '</td><td>' + y3 + '</td><td>' + y4 + '</td><td>' + y5 + '</td><td>' + ortaksinav + '</td><td>' + perf1 + '</td><td>' + perf2 + '</td><td>' + perf3 + '</td><td>' + u1 + '</td><td>' + u2 + '</td><td>' + u3 + '</td><td>' + prj1 + '</td><td>' + odv1 + '</td><td>' + ortalama + '</td></tr>');
                                    }
                                    var tds = document.getElementById('example').getElementsByTagName('td');
                                    var sum = 0;
                                    for (var i = 0; i < tds.length; i++) {
                                        if (tds[i].className == 'hs') {
                                            sum += isNaN(tds[i].innerHTML) ? 0 : parseInt(tds[i].innerHTML);
                                        }
                                    }
                                    document.getElementById('hds').innerHTML = sum;
                                    document.getElementById('atoplam').innerHTML = atoplam;
                                    document.getElementById('aortalama').innerHTML = aortalama;

                                }
                            });
                        } catch (e) {
                            alert(e);
                        }

                    });

                }
                $("#sube").on('change', function () {
                    $("#donem").on('change', function () {
                        $("#example td").remove();
                        var secilendonem = document.getElementById("donem").value;
                        // alert(secilendonem);

                        if (secilendonem === "1.donem") {

                            gelendonem = 1;



                        }
                        else {
                            gelendonem = 2;


                        }
                        try {
                            // alert(ip);
                            $.ajax({
                                url: 'http://' + ip + '/Slim_Proxy_okulsis/SlimProxyBoot.php?url=OgrenciKarnesi_mbllogin&donemID=' + gelendonem + '&ogrenciID=' + this.value + '&cid=' + cid + '&languageID=' + lid + '&did=' + did + '',
                                type: 'GET',
                                dataType: 'json',
                                success: function (data) {
                                    var j;
                                    var dataSet = [];
                                    var properties = [];
                                    //$('#location').empty();
                                    for (var j = 0; j < data.length; j++) {
                                        var dersadi = data[j].DersAdi;
                                        var hs = data[j].HaftalikDersSaati;
                                        var ysp = data[j].YilSonuPuani;
                                        var y1 = data[j].Yazili1;
                                        var y2 = data[j].Yazili2;
                                        var y3 = data[j].Yazili3;
                                        var y4 = data[j].Yazili4;
                                        var y5 = data[j].Yazili5;
                                        var s1 = data[j].Sozlu1;
                                        var s2 = data[j].Sozlu2;
                                        var s3 = data[j].Sozlu3;
                                        var o1 = data[j].Odev1;
                                        var o2 = data[j].Odev2;

                                        $('#example').append('<tr><td>' + dersadi + '</td><td>' + y1 + '</td><td>' + y2 + '</td><td>' + y3 + '</td><td>' + y4 + '</td><td>' + y5 + '</td><td>' + s1 + '</td><td>' + s2 + '</td><td>' + s3 + '</td><td>' + o1 + '</td><td>' + o2 + '</td><td>' + ysp + '</td></tr>');
                                    }

                                }
                            });
                        } catch (e) {
                            alert(e);
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
