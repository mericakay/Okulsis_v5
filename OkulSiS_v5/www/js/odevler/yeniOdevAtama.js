
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
    
    document.getElementById("myDate").valueAsDate = new Date();
    var x = document.getElementById("myDate").value;
    
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
            url: 'http://' + ip + '/Slim_Proxy_okulsis/SlimProxyBoot.php?url=OgretmenProgramindakiDersler_mbllogin&kisiId=' + kisiid + '&okulID=' + okulid + '&dersYiliID=' + dersyiliid + '&cid=' + cid + '&languageID=' + lid + '&did=' + did + '',
            type: 'GET',
            dataType: 'json',
            success: function (data) {
                var j;
                var dataSet = [];
                var properties = [];
                $('#sinifsec').empty();
                for (var j = 0; j < data.length; j++) {
                    var text = data[j].Aciklama;
                    var sinifid = data[j].SinifID;
                    var sinifdersid = data[j].SinifDersID;
                    // alert(sinifid);
                    $('#sinifsec').append("<option value=" + sinifid + " classs=" + sinifdersid + ">" + text + "</option>");
                }
                $("#sinifsec").on('change', function () {
                    var sinifid = $(this).find('option:selected').attr('value');
                    var sinifdersid = $(this).find('option:selected').attr('classs');
                    //alert(sinifdersid);
                    localStorage.setItem("sinifid", sinifid);
                    localStorage.setItem("sinifdersid", sinifdersid);
                    $.ajax({
                        url: 'http://' + ip + '/Slim_Proxy_okulsis/SlimProxyBoot.php?url=ogretmenDersPrgDersSaatleriOgrencileri_mbllogin&sinifID=' + this.value + '&tarih='+x+'dersSirasi=1&dersYiliID=' + dersyiliid + '&kisiId=' + kisiid + '&cid=' + cid + '&languageID=' + lid + '&did=' + did + '',
                        type: 'GET',
                        dataType: 'json',
                        success: function (data) {
                            var j;
                            var dataSet = [];
                            var properties = [];
                            $('#multi-select-demo').empty();
                            for (var j = 0; j < data.length; j++) {
                                var text = data[j].Adsoyad;
                                var ogrenciid = data[j].OgrenciID;
                                // alert(sinifid);
                                $('#multi-select-demo').append("<option value=" + ogrenciid + ">" + text + "</option>");
                            }
                            $('#multi-select-demo').on('change', function () {
                                var arr = $(this).val();
                                var myJSON = JSON.stringify(arr);
                                console.log(myJSON);
                                localStorage.setItem("myJSON", myJSON);

                            });

                        }


                    });


                });
            }

        });
    } catch (e) {
        alert(e);
    }

    try {
        $.ajax({
            url: 'http://' + ip + '/Slim_Proxy_okulsis/SlimProxyBoot.php?url=OdevTipleri_mbllogin&cid=' + cid + '&languageID=' + lid + '&did=' + did + '',
            type: 'GET',
            dataType: 'json',
            success: function (data) {
                var j;
                var dataSet = [];
                var properties = [];
                $('#odevtipi').empty();
                for (var j = 0; j < data.length; j++) {
                    var text = data[j].OdevTipi;
                    var odevtipid = data[j].OdevTipID;
                    // alert(sinifid);
                    $('#odevtipi').append("<option value=" + odevtipid + ">" + text + "</option>");
                }
                $("#odevtipi").on('change', function () {
                    var odevtipid = $(this).find('option:selected').attr('value');
                    localStorage.setItem("odevtip", odevtipid);
                });

            }

        });
    } catch (e) {
        alert(e);
    }



    //atama 
    $('input[id^="button"]').click(function () {
        alert("gg");
        var odevtip = localStorage.getItem("odevtip");
        var sinifid = localStorage.getItem("sinifid");
        var sinifdersid = localStorage.getItem("sinifdersid");
        var myJSON = localStorage.getItem("myJSON");
       
        konu = $("#ltanim").val();
        mesaj = $("#fmesaj").val();

        $.ajax({
            url: 'http://' + ip + '/Slim_Proxy_okulsis/SlimProxyBoot.php?url=OdevAtama_mbllogin&sinifDersID=' + sinifdersid + '&ogretmenID=' + kisiid + '&teslimTarihi='+x+'&tanim=' + konu + '&aciklama=' + mesaj + '&odevTipID=' + odevtip + '&notIleDegerlendirilsin=0&donemNotunaEtkiEtsin=0&cid=' + cid + '&XmlData=' + myJSON + '&languageID=' + lid + '&did=' + did + '',
            data: {

                konu: $("#ltanim").val(),
                mesaj: $("#fmesaj").val(),
            },
            type: 'Get',
            dataType: 'json',
            success: function (data) {
                if (data.lenght !== 0) {
                    alert("Mesajınız Başarıyla iletilmiştir");
                }
                else {
                    alert("Beklenmeyen Hata Oluştu Lütfen daha sonra tekrar deneyiniz")
                }

            }
        });

    })

    //Contenier Son
};

