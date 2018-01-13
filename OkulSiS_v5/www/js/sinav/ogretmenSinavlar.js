
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
    var headername = localStorage.getItem("headername");
    document.getElementsByTagName("P")[0].innerHTML = headername;
    
    
    //menu başlangıç

    try {
        var menuid = "#menuid";
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
    // Sınavlar
    try {
        $.ajax({

            url: 'http://' + ip + '/Slim_Proxy_okulsis/SlimProxyBoot.php?url=Ogretmensinavlistesi_mbllogin&ogretmenID=' + kisiid + '&egitimYilID=' + egitimyiliid + '&okulID=' + okulid + '&kisiID=' + kisiid + '&cid=' + cid + '&languageID=' + lid + '&did=' + did + '&grid=1',
            type: 'GET',
            dataType: 'json',
            success: function (data) {
                var j;
                var dataSet = [];
                var properties = [];
                //$('#location').empty();
                for (var j = 0; j < data.length; j++) {
                    var sinavtarih = data[j].SinavTarihi;
                    var aciklama = data[j].SinavAciklamasi;
                    var sinavturadi = data[j].SinavTurAdi;
                    var degerlendirildi = data[j].isDegerlendirildi;
                    var SinavID = data[j].SinavID;
                    if (degerlendirildi == 1) {
                        $('#sinav').append('<tr><td class="degerlendirildi">' + sinavtarih + '</td><td class="degerlendirildi">' + aciklama + '</td><td class="degerlendirildi">' + sinavturadi + '</td></tr>');
                    }
                    else {
                        $('#sinav').append('<tr><td>' + sinavtarih + '</td><td>' + aciklama + '</td><td>' + sinavturadi + '</td></tr>');

                    }



                }

            }
        });
        $("#sinav").on('click', 'td', function () {
            var table = document.getElementById("giden");
            var rows = table.getElementsByTagName("tr");
            for (i = 0; i < rows.length; i++) {
                var currentRow = table.rows[i];
                var createClickHandler =
                    function (row) {
                        return function () {
                            var rows = $("#location>tr");
                            // alert(JSON.stringify(rows, null, 4));
                            console.log(JSON.stringify(rows, null, 4));
                            var cell = row.getElementsByTagName("td")[3];

                            var id = cell.innerHTML;
                            localStorage.setItem("secilenogrenciid", id);

                            // alert("<OgrenciID>" + id + "</OgrenciID>" + "<DevamsizlikKodID>" + gelen + "</DevamsizlikKodID>");
                        };
                    };

                currentRow.onclick = createClickHandler(currentRow);
            }


            try {
                var secilenogrenciid = localStorage.getItem("secilenogrenciid");
                // alert(secilenogrenciid);
                $.ajax({
                    url: 'http://' + ip + '/Slim_Proxy_okulsis/SlimProxyBoot.php?url=OgrenciSinavDetayRpt_mbllogin&ogrenciID=' + secilenogrenciid + '&sinavID=' + sinavid + '&languageID=' + lid + '&cid=' + cid + '&did=' + did + '',
                    type: 'GET',
                    dataType: 'json',
                    success: function (data) {
                        var j;
                        var dataSet = [];
                        var properties = [];
                        //$('#location').empty();
                        for (var j = 0; j < data.length; j++) {

                            var proad = data[j].proad;

                            localStorage.setItem("proad", proad);
                            window.location.href = "../rapor.html";
                        }


                    }
                });
            } catch (e) {
                alert(e);
            }


        });
    } catch (e) {
        alert(e);
    }

   
    //Contenier Son

};

