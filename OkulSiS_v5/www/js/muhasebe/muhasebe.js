
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
 var headername = localStorage.getItem("headername");
    document.getElementsByTagName("P")[0].innerHTML = headername;

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

            url: 'http://' + ip + '/Slim_Proxy_okulsis/SlimProxyBoot.php?url=KurumPersoneliSinifListesi_mbllogin&dersYiliID=' + dersyiliid + '&cid=' + cid + '&languageID=' + lid + '&did=' + did + '',
            type: 'GET',
            dataType: 'json',
            success: function (data) {
                var j;
                var dataSet = [];
                var properties = [];
                $('#selectNumber').empty();
                for (var j = 0; j < data.length; j++) {
                    var text = data[j].SinifAdi;
                    var sinifid = data[j].SinifID;
                    // alert(sinifid);
                    $('#selectNumber').append("<option value=" + sinifid + ">" + text + "</option>");
                }
                $("#selectNumber").on('change', function () {


                    $.ajax({
                        url: 'http://' + ip + '/Slim_Proxy_okulsis/SlimProxyBoot.php?url=Kysubeogrencilistesi_mbllogin&sinifID='+this.value+'&cid=' + cid + '&languageID=' + lid + '&did=' + did +'',
                        type: 'GET',
                        dataType: 'json',
                        success: function (data) {
                            var j;
                            var dataSet = [];
                            var properties = [];
                            $('#sube').empty();
                            for (var j = 0; j < data.length; j++) {
                                var text = data[j].Aciklama;
                                var derssirasi = data[j].DersSirasi;
                                var dersid = data[j].DersID;
                                var ogrenciid = data[j].ogrenciID;

                                $('#sube').append("<option value=" + ogrenciid + ">" + text + "</option>");
                            }
                            $("#sube").on('change', function () {
                                $("#example td").remove(); ; 
                                $.ajax({

                                    url: 'http://' + ip + '/Slim_Proxy_okulsis/SlimProxyBoot.php?url=MuhBorcluSozlesmeleri_mbllogin&dersYiliID=' + dersyiliid + '&ogrenciID='+this.value+'&cid=' + cid + '&languageID=' + lid + '&did=' + did + '',
                                    type: 'GET',
                                    dataType: 'json',
                                    success: function (data) {
                                        var j;
                                        var dataSet = [];
                                        var properties = [];
                                        //$('#location').empty();
                                        for (var j = 0; j < data.length; j++) {
                                            var toplamtutar = data[j].ToplamTutar;
                                            var taahutno = data[j].TaahhutnameNo;
                                            var toplamodenen = data[j].ToplamOdenen;
                                            var kalantutar = data[j].KalanTutar;
                                            var borclusozlesmeid = data[j].BorcluSozlesmeID;

                                            $('#example').append('<tr><td  onclick="myFunction()">' + taahutno + '</td><td>' + toplamtutar + '</td><td>' + toplamodenen + '</td><td>' + kalantutar + '</td></tr>');
                                        }

                                    }
                                });
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

