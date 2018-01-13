
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
    var sinavid = "";
 var headername = localStorage.getItem("headername");
    document.getElementsByTagName("P")[0].innerHTML = headername;

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
            url: 'http://' + ip + '/Slim_Proxy_okulsis/SlimProxyBoot.php?url=MsjIcinPersonelListesi_mbllogin&sendrolID=7&rolID=4&cid=' + cid + '&did=' + did + '&languageID=' + lid + '&okulID=' + okulid + '',
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
                    text = data[j].aciklama;
                    id = data[j].ID;


                    $('#selectTeacher').append("<option value=" + id + ">" + text + "</option>");
                }
                $("#selectTeacher").on('change', function () {
                    $.ajax({
                        url: 'http://' + ip + '/Slim_Proxy_okulsis/SlimProxyBoot.php?url=Ogretmensinavlistesi_mbllogin&ogretmenID=' + this.value + '&egitimYilID=' + egitimyiliid + '&okulID=' + okulid + '&kisiID=' + kisiid + '&languageID=' + lid + '&cid=' + cid + '&did=' + did + '&grid=0',
                        type: 'GET',
                        dataType: 'json',
                        success: function (data) {

                            var j;
                            var dataSet = [];
                            var properties = [];
                            $('#selectNumber').empty();
                            for (var j = 0; j < data.length; j++) {
                                var text = data[j].SinavAciklamasi;
                                sinavid = data[j].SinavID;
                                // alert(sinifid);
                                $('#selectNumber').append("<option value=" + sinavid + ">" + text + "</option>");
                            }
                            $("#selectNumber").on('change', function () {
                                sinavid = this.value;
                                // localStorage.setItem("sinavid", sinavid);
                                $("#giden td").remove();
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
                                            var ogrenciid = data[j].OgrenciID;

                                            $('#giden').append('<tr ><td>' + numarasi + '</td><td>' + adsoyad + '</td><td>' + puan + '</td><td style="display:none;" name="oid" >' + ogrenciid + '</td></tr>');
                                        }

                                    }
                                });

                            });
                            $("#giden").on('click', 'td', function () {
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

function openReport() {


}