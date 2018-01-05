
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
            url: 'http://' + ip + '/Slim_Proxy_okulsis/SlimProxyBoot.php?url=OdevListesiOgrenciveYakin_mbllogin&ogrenciID=' + kisiid + '&cid=' + cid + '&languageID=' + lid + '&did=' + did + '&egitimYilID=' + egitimyiliid + '',
            type: 'GET',
            dataType: 'json',
            success: function (data) {

                var j;
                var dataSet = [];
                var properties = [];
                for (var j = 0; j < data.length; j++) {
                    var ogretmenadi = data[j].OgretmenAdi;
                    var dersadi = data[j].DersAdi;
                    var tanim = data[j].Tanim;
                    var teslimtarihi = data[j].TeslimTarihi;
                    var aciklama = data[j].Aciklama;
                    var odevid = data[j].OgrenciOdevID;
                    $('#example').append('<tr><td>' + ogretmenadi + '</td><td>' + dersadi + '</td><td>' + tanim + '</td><td>' + teslimtarihi + '</td><td style="display:none;">' + aciklama + '</td></tr>');
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
                                    var cell = row.getElementsByTagName("td")[4];

                                    var id = cell.innerHTML;
                                    alert(id);

                                };
                            };

                        currentRow.onclick = createClickHandler(currentRow);
                    }
                    $.ajax({
                        url: 'http://' + ip + '/Slim_Proxy_okulsis/SlimProxyBoot.php?url=OdevListesiOgrenciveYakin_mbllogin&ogrenciID=' + kisiid + '&egitimYilID=' + egitimyiliid + '&did=' + did + '&cid=' + cid + '&languageID=' + lid + '',
                        type: 'GET',
                        dataType: 'json',
                        success: function (data) {

                            console.log("okundu");
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

