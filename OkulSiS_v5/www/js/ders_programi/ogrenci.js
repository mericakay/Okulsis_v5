
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
    // Read table body node.


    var okulid = localStorage.getItem("okulid");
    var kisiid = localStorage.getItem("kisiid");
    var dersyiliid = localStorage.getItem("dersyiliid");
    var rolid = localStorage.getItem("RolID");
    var ip = localStorage.getItem("ip");
    var kisiadi = localStorage.getItem("KullaniciAdi");
    var lid = localStorage.getItem("lid");
    var cid = localStorage.getItem("cid");
    var did = localStorage.getItem("did");
    var egitimyiliid = localStorage.getItem("egitimyiliid");
    var gelendonem = localStorage.getItem("donemID");
    var headername = localStorage.getItem("headername");
    document.getElementsByTagName("P")[0].innerHTML = headername;
   
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

    $.ajax({
        url: 'http://' + ip + '/Slim_Proxy_okulsis/SlimProxyBoot.php?url=OgrenciVeYakiniDersProgramiListesi_mbllogin&ogrenciID=' + kisiid + '&donemID=' + gelendonem + '&cid=' + cid + '&lid=' + lid + '&did=' + did + '',
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
    //contenier başlangıç
    $("#donem").on('change', function () {
        $("#example td").remove();
        var secilendonem = document.getElementById("donem").selectedIndex;
        // alert(secilendonem);

        if (secilendonem === 1) {

            gelendonem = 1;



        }
        else {
            gelendonem = 2;


        }
        try {
            // alert(ip);
            $.ajax({
                url: 'http://' + ip + '/Slim_Proxy_okulsis/SlimProxyBoot.php?url=OgrenciVeYakiniDersProgramiListesi_mbllogin&ogrenciID=' + kisiid + '&donemID=' + gelendonem + '&cid=' + cid + '&lid=' + lid + '&did=' + did + '',
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


                        $('#example').append('<tbody><tr><td>' + derssaati + '</td><td>' + gun1 + '</td><td>' + gun2 + '</td><td>' + gun3 + '</td><td>' + gun4 + '</td><td>' + gun5 + '</td></tr></tbody>');

                    }
                }

            });
        } catch (e) {
            alert(e);
        }

    });

  

    //Contenier Son
};
