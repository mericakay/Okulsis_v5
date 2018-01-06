
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
    var tarih = new Date();
    var gg = tarih.toUTCString();
    var yil = tarih.getFullYear();
    var ay = tarih.getMonth();
    var gun = tarih.getDay();
    var saat = tarih.getHours();
    var dakika = tarih.getMinutes();
    var saniye = tarih.getSeconds();
    var date = new Date(Date.UTC(yil, ay, gun, saat, dakika, saniye));
    date = date.toLocaleDateString();
    //alert(date);
    var dakka = tarih.toLocaleTimeString();
    var gelentarih = date + " " + dakka;
    var dvmGec = 0;
    var dvmYok = 0;

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

    var sinifid = "";

    //contenier başlangıç
    try {
        $.ajax({
            url: 'http://' + ip + '/Slim_Proxy_okulsis/SlimProxyBoot.php?url=OgretmenProgramindakiDersler_mbllogin&kisiId=' + kisiid + '&okulID=' + okulid + '&dersYiliID=' + dersyiliid + '&cid=' + cid + '&languageID=' + lid + '&did=' + did + '',
            type: 'GET',
            dataType: 'json',
            success: function (data) {
                var j = 0;
                var dataSet = [];
                var properties = [];
                $('#selectNumber').empty();
                for (var j = 0; j < data.length; j++) {
                    var text = data[j].Aciklama;
                    var sinifid = data[j].SinifID;
                    // alert(sinifid);
                    $('#selectNumber').append("<option value=" + sinifid + ">" + text + "</option>");
                }
                $("#selectNumber").on('change', function () {


                    sinifid = this.value;
                    try {

                    } catch (e) {

                    }
                    $.ajax({
                        url: 'http://' + ip + '/Slim_Proxy_okulsis/SlimProxyBoot.php?url=ogretmenDersProgramiDersSaatleri_mbllogin&kisiId=' + kisiid + '&sinifID=' + this.value + '&tarih=' + date + '&cid=' + cid + '&languageID=' + lid + '&did=' + did + '',
                        type: 'GET',
                        dataType: 'json',

                        success: function (data) {
                            var j = 0;
                            var dataSet = [];
                            var properties = [];
                            
                            for (var j = 0; j < data.length; j++) {
                                //ogretmenDersProgramiDersSaatleri
                                var text = data[j].Aciklama;
                                var derssirasi = data[j].DersSirasi;
                                var dersid = data[j].DersID;
                           
                            }
                            if (date.length == 1) {
                                alert("Aktif Ders Saati içerisinde değilsiniz ")
                            }
                                $("#example td").remove();
                                $.ajax({

                                    url: 'http://' + ip + '/Slim_Proxy_okulsis/SlimProxyBoot.php?url=ogretmenDersPrgDersSaatleriOgrencileri_mbllogin&sinifID=' + sinifid + '&tarih=' + date + '&dersSirasi=' + derssirasi + '&dersYiliID=' + dersyiliid + '&kisiId=' + kisiid + '&cid=' + cid + '&languageID=' + lid + '&did=' + did + '',
                                    type: 'GET',
                                    dataType: 'json',
                                    success: function (data) {
                                       
                                        var i = 0;
                                      
                                        var dataSet = [];
                                        
                                        var properties = [];
                                       
                                        //$('#location').empty();
                                        try {
                                          
                                         
                                            for (var i = 0; i < data.length; i++) {
                                                
                                                var Numarasi = data[i].Numarasi;
                                            
                                                var Adi = data[i].Adsoyad;
                                               
                                             
                                              
                                                var Tc = data[i].TCKimlikNo;
                                             
                                                
                                                var oid = data[i].OgrenciID;
                                                
                                                $('#example').append('<tr><td>' + Numarasi + '</td><td>' + Adi + '</td><td><input type="checkbox" name="gec" value="gec"></input></td><td><input type="checkbox" name="yok" value="yok"> </input> </td><td style="display:none;">' + oid + '</td></tr>');
                                            }
                                        } catch (e) {
                                            alert(e);
                                        }
                                        
                                        $("#example").on('click', 'td', function () {

                                            var getJsonFromTable = function () {
                                                var rows = [];
                                                $('#example tbody tr').each(function (i, n) {
                                                    var $row = $(n);
                                                    rows.push({
                                                        no: $row.find('td:eq(0)').text(),
                                                        name: $row.find('td:eq(1)').text(),
                                                        yok: $row.find('td:eq(2) input[type=checkbox]').prop('checked'),
                                                        gec: $row.find('td:eq(3) input[type=checkbox]').prop('checked'),
                                                        id: $row.find('td:eq(4)').text(),

                                                    });
                                                });
                                                return JSON.stringify(rows);
                                            };
                                            $(function () {
                                                console.log(getJsonFromTable());
                                                //alert(getJsonFromTable());
                                            });;

                                        });


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

