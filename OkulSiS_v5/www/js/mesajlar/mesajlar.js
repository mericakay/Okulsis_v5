
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
    //menu başlangıç
    document.getElementById("cmb3").style.visibility = "hidden";
    document.getElementById("cmb2").style.visibility = "hidden";
    document.getElementById("cmb4").style.visibility = "hidden";

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
            url: 'http://' + ip + '/Slim_Proxy_okulsis/SlimProxyBoot.php?url=Msjcombo1_mbllogin&kisiId=' + kisiid + '&kurumID=' + kurumid + '&rolID=' + rolid + '&cid=' + cid + '&languageID=' + lid + '&did=' + did +'',
            type: 'GET',
            dataType: 'json',
            success: function (data) {
                
                var j;
                var dataSet = [];
                var properties = [];
                var cmbid = "";
                var gelensendrolid = "";
                $('#cmb1').empty();
                for (var j = 0; j < data.length; j++) {
                    var text = data[j].RolAdi;
                     cmbid = data[j].sendRolID;
                   // alert(cmbid);

                    $('#cmb1').append("<option value=" + cmbid + ">" + text + "</option>");
                }
                $("#cmb1").on('change', function () {
                    $("#cmb3").empty();
                    document.getElementById("cmb2").style.visibility = "visible";
                    gelensendrolid = this.value;
                    $.ajax({
                        url: 'http://' + ip + '/Slim_Proxy_okulsis/SlimProxyBoot.php?url=Msjcombo2_mbllogin&kisiId=' + kisiid + '&rolID=' + rolid + '&sendrolID=' + gelensendrolid + '&cid=' + cid + '&languageID=' + lid + '&did=' + did +'',
                        type: 'GET',
                        dataType: 'json',
                        success: function (data) {
                            var j;
                            var dataSet = [];
                            var properties = [];
                            $('#cmb2').empty();
                            for (var j = 0; j < data.length; j++) {
                                var aciklama = data[j].aciklama;
                                var cmbid = data[j].ID;
                                var kontrol = data[j].kontrol;
                                


                                $('#cmb2').append("<option  value=" + kontrol + "  >" + aciklama + "</option>");
                            }
                            $("#cmb2").on('change', function () {
                                $("#cmb3").empty();
                                document.getElementById("cmb3").style.visibility = "visible";
                                if (this.value == 1) {
                                $.ajax({
                                    url: 'http://' + ip + '/Slim_Proxy_okulsis/SlimProxyBoot.php?url=Msjcombo3_mbllogin&kisiId=' + kisiid + '&okulid=' + okulid + '&rolID=' + rolid + '&sendrolID=' + gelensendrolid+'&cid=' + cid + '&languageID=' + lid + '&did=' + did +'',
                                    type: 'GET',
                                    dataType: 'json',
                                    success: function (data) {
                                        var j;
                                        var dataSet = [];
                                        var properties = [];
                                        var msglist = "msglist";
                                        $('#cmb3').empty();
                                        for (var j = 0; j < data.length; j++) {

                                            var aciklama = data[j].aciklama;
                                            var kontrol = data[j].kontrol;
                                            var cmbid = data[j].ID;
                                            
                                            $('#cmb3').append("<option  value=" + kontrol + "  data-user=" + cmbid + " id=" + msglist + "  >" + aciklama + "</option>");
                                        }

                                    }
                                    });
                                } else {
                                    document.getElementById("cmb3").style.visibility = "hidden";
                                }
                                $("#cmb3").on('change', function () {
                                    document.getElementById("cmb4").style.visibility = "visible";
                                    var msglist = document.getElementById("msglist");
                                    var show = $(this).find('option:selected').attr('data-user');
                                   
                                    localStorage.setItem("show", show);
                                   // alert(this.value);
                                    if (this.value == 1) {
                                        $.ajax({
                                            url: 'http://' + ip + '/Slim_Proxy_okulsis/SlimProxyBoot.php?url=Msjcombo4_mbllogin&kisiId=' + kisiid + '&sinifID=' + show + '&rolID=' + rolid + '&sendrolID=' + gelensendrolid + '&cid=' + cid + '&languageID=' + lid + '&did=' + did + '',
                                            type: 'GET',
                                            dataType: 'json',
                                            success: function (data) {
                                             
                                                var j;
                                                var dataSet = [];
                                                var properties = [];
                                                $('#cmb4').empty();
                                                for (var j = 0; j < data.length; j++) {
                                                    var aciklama = data[j].aciklama;
                                                    var cmbid = data[j].ID;
                                                 

                                                    $('#cmb4').append("<option >" + aciklama + "</option>");
                                                }

                                            }
                                        });
                                    } else {
                                        document.getElementById("cmb4").style.visibility = "hidden";
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
   
    // Mesaj Tipleri
 
   


    //gelen mesajlar
   
    $('input[id^="button"]').click(function () {

        konu = $("#lname").val();
        mesaj = $("#fmesaj").val();
        var kime = localStorage.getItem("show");
        var msgtip = localStorage.getItem("mesajtipid");
        $.ajax({
            url: 'http://' + ip + '/Slim_Proxy_okulsis/SlimProxyBoot.php?url=SendMesajDefault_mbllogin&konu=' + konu + '&mesaj=' + mesaj + '&kisiId=' + kisiid + '&receiveKisiID=' + kime + '&mesajTipID=1&cid=' + cid + '&languageID=' + lid + '&did=' + did +'',
            data: {
                konu: $("#lname").val(),
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

