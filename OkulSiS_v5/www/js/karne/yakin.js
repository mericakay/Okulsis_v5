
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
                    $.ajax({
                        url: 'http://' + ip + '/Slim_Proxy_okulsis/SlimProxyBoot.php?url=OgrenciKarnesi_mbllogin&donemID=' + gelendonem + '&ogrenciID=' + ogrenciid + '&cid=' + cid + '&did=' + did + '',
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

                                $('#example').append('<tr><td>' + dersadi + '</td><td>' + y1 + '</td><td>' + y2 + '</td><td>' + y3 + '</td><td>' + ysp + '</td></tr>');
                            }

                        }
                    });
                }
                $("#sube").on('change', function () {
                    $.ajax({
                        url: 'http://' + ip + '/Slim_Proxy_okulsis/SlimProxyBoot.php?url=OgrenciKarnesi_mbllogin&donemID=' + gelendonem + '&ogrenciID=' + this.value + '&cid=' + cid + '&did=' + did + '',
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

                                $('#example').append('<tr><td>' + dersadi + '</td><td>' + y1 + '</td><td>' + y2 + '</td><td>' + y3 + '</td><td>' + ysp + '</td></tr>');
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

function secilenDonem() {

    if (secilendonem === "1.donem") {

        gelendonem = 1;
    }
    else {
        gelendonem = 2;
    }
};