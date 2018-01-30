
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
    var kurumid = localStorage.getItem("kurumid");
    var did = localStorage.getItem("did");
    // alert(okulid);
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

    //gelen mesajlar
    try {
        $.ajax({

            url: 'http://' + ip + '/Slim_Proxy_okulsis/SlimProxyBoot.php?url=GelenMesajListesi_mbllogin&kisiID=' + kisiid + '&cid=' + cid + '&lid=' + lid + '&did=' + did + '',
            type: 'GET',
            dataType: 'json',
            success: function (data) {

                var j;
                var dataSet = [];
                var properties = [];
                //$('#location').empty();
                for (var j = 0; j < data.length; j++) {
                    var tarih = data[j].Tarih;
                    var Adi = data[j].SenderAdi;
                    var konu = data[j].Konu;
                    var mesaj = data[j].Mesaj;

                    $('#example').append('<tr value="' + mesaj + '" ><td  >' + Adi + '</td><td>' + konu + '</td><td>' + tarih + '</td><td style="display:none;">' + mesaj + '</td></tr>');
                }
                $("#example").on('click', function () {

                    var table = document.getElementById("example");
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

                                    alert(id);
                                    // alert("<OgrenciID>" + id + "</OgrenciID>" + "<DevamsizlikKodID>" + gelen + "</DevamsizlikKodID>");
                                };
                            };

                        currentRow.onclick = createClickHandler(currentRow);
                    }

                });

            }
        });
    } catch (e) {
        alert(e);
    }



    //Contenier Son
};

