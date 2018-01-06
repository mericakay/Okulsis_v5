
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
                var text = "";
                var value = "";
                var ogrenciseviyeid = "";
                var ogrenciid = "";
                var sinifid = "";
                $('#selectNumber').empty();
                for (var j = 0; j < data.length; j++) {
                    text = data[j].AdiSoyadi;
                    value = data[j].OgrenciID;
                    ogrenciseviyeid = data[j].OgrenciSeviyeID;
                    ogrenciid = data[j].OgrenciID;
                    sinifid = data[j].sinifID;


                    $('#selectNumber').append("<option value=" + ogrenciid + ">" + text + "</option>");
                }
                if (data.length == 2) {
                    document.getElementById("selectNumber").style.visibility = "hidden";
                    document.getElementsByTagName("P")[0].innerHTML = text;
                    var ogrenciidselected = this.value;

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
                                url: 'http://' + ip + '/Slim_Proxy_okulsis/SlimProxyBoot.php?url=OgrenciVeYakiniDersProgramiListesi_mbllogin&ogrenciID=' + ogrenciid + '&donemID=' + gelendonem + '&cid=' + cid + '&languageID=' + lid + '&did=' + did + '',
                                type: 'GET',
                                dataType: 'json',
                                success: function (data) {
                                    var j;
                                    var dataSet = [];
                                    var properties = [];
                                    for (var j = 0; j < data.length; j++) {
                                        var derssaati = data[j].DersSaati;


                                        var gun1 = data[j].Gun1_ders;
                                        var gun2 = data[j].Gun2_ders;
                                        var gun3 = data[j].Gun3_ders;
                                        var gun4 = data[j].Gun4_ders;
                                        var gun5 = data[j].Gun5_ders;


                                        $('#example').append('<tr><td>' + derssaati + '</td><td>' + gun1 + '</td><td>' + gun2 + '</td><td>' + gun3 + '</td><td>' + gun4 + '</td><td>' + gun5 + '</td></tr>');

                                    }
                                }

                            });
                        } catch (e) {
                            alert(e);
                        }

                    });

                   
                }
                $("#selectNumber").on('change', function () {
                    var ogrenciidselected = this.value;

                    $.ajax({
                        url: 'http://' + ip + '/Slim_Proxy_okulsis/SlimProxyBoot.php?url=OgrenciVeYakiniDersProgramiListesi_mbllogin&ogrenciID=' + this.value + '&cid=' + cid + '&languageID=' + lid + '&did=' + did + '',
                        type: 'GET',
                        dataType: 'json',
                        success: function (data) {
                            var j;
                            var dataSet = [];
                            var properties = [];
                            for (var j = 0; j < data.length; j++) {
                                var derssaati = data[j].DersSaati;


                                var gun1 = data[j].Gun1_ders;
                                var gun2 = data[j].Gun2_ders;
                                var gun3 = data[j].Gun3_ders;
                                var gun4 = data[j].Gun4_ders;
                                var gun5 = data[j].Gun5_ders;


                                $('#example').append('<tr><td>' + derssaati + '</td><td>' + gun1 + '</td><td>' + gun2 + '</td><td>' + gun3 + '</td><td>' + gun4 + '</td><td>' + gun5 + '</td></tr>');

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

