
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
 var headername = localStorage.getItem("headername");
    document.getElementsByTagName("P")[0].innerHTML = headername;


    //menu başlangıç
    try {
        var menuid = "#menuid";
        $.ajax({
            url: 'http://' + ip + '/Slim_Proxy_okulsis/SlimProxyBoot.php?url=mobilMenu_mbllogin&RolID=' + rolid + '&lid=' + lid + '&cid=' + cid + '&did=' + did + '',
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
                        $('#menu').append(' <ul id=' + ID + '><li><a   href="../' + url + '  ">' + text + '</a></li></ul>');
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



    //contenier başlangıç
    try {
        $.ajax({
            url: 'http://' + ip + '/Slim_Proxy_okulsis/SlimProxyBoot.php?url=VeliOgrencileri_mbllogin&dersYiliID=' + dersyiliid + '&kisiId=' + kisiid + '&cid=' + cid + '&lid=' + lid + '&did=' + did + '',
            type: 'GET',
            dataType: 'json',
            success: function (data) {
                var j;
                var dataSet = [];
                var properties = [];
                $('#selectNumber').empty();
                for (var j = 0; j < data.length; j++) {
                    var text = data[j].AdiSoyadi;
                    var yakinogrenciid = data[j].OgrenciID;

                    $('#selectNumber').append("<option value=" + yakinogrenciid + ">" + text + "</option>");
                }
                if (data.length == 2) {
                    document.getElementById("selectNumber").style.visibility = "hidden";
                    document.getElementsByTagName("P")[0].innerHTML = text;
                    $("#example td").remove();;
                    $.ajax({
                        url: 'http://' + ip + '/Slim_Proxy_okulsis/SlimProxyBoot.php?url=OgrenciVeliIcinOgretmenListesi_mbllogin&kisiId=' + yakinogrenciid + '&cid=' + cid + '&lid=' + lid + '&did=' + did + '',
                        type: 'GET',
                        dataType: 'json',
                        success: function (data) {

                            var j;
                            var dataSet = [];
                            var properties = [];
                            for (var j = 0; j < data.length; j++) {
                                var aciklama = data[j].aciklama;
                                var dersadi = data[j].DersAdi;
                                var tanim = data[j].Tanim;
                                var teslimtarihi = data[j].TeslimTarihi;
                                $('#example').append('<tr><td>' + aciklama + '</td><td>' + dersadi + '</td></tr>');
                            }
                        }

                    });
                }
                $("#sube").on('change', function () {
                    $("#example td").remove();;
                    $.ajax({
                        url: 'http://' + ip + '/Slim_Proxy_okulsis/SlimProxyBoot.php?url=OgrenciVeliIcinOgretmenListesi_mbllogin&kisiId=' + this.value + '&cid=' + cid + '&lid=' + lid + '&did=' + did + '',
                        type: 'GET',
                        dataType: 'json',
                        success: function (data) {

                            var j;
                            var dataSet = [];
                            var properties = [];
                            for (var j = 0; j < data.length; j++) {
                                var aciklama = data[j].aciklama;
                                var dersadi = data[j].DersAdi;
                                var tanim = data[j].Tanim;
                                var teslimtarihi = data[j].TeslimTarihi;
                                $('#example').append('<tr><td>' + aciklama + '</td><td>' + dersadi + '</td></tr>');
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

