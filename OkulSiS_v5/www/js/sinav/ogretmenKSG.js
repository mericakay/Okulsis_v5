﻿
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
    document.getElementById("subesec").style.visibility = "hidden";
    document.getElementById("ogrencisec").style.visibility = "hidden";
    document.getElementById("kitapciksec").style.visibility = "hidden";
 var headername = localStorage.getItem("headername");
    document.getElementsByTagName("P")[0].innerHTML = headername;

    //  alert(ip);
    //menu başlangıç
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

    //menu Son


    //contenier başlangıç

    //Klasik Puan Girişi
    $.ajax({
        url: 'http://' + ip + '/Slim_Proxy_okulsis/SlimProxyBoot.php?url=Ogretmensinavlistesi_mbllogin&ogretmenID=' + kisiid + '&egitimYilID=' + egitimyiliid + '&okulID=' + okulid + '&kisiID=' + kisiid + '&cid=' + cid + '&lid=' + lid + '&did=' + did + '',
        type: 'GET',
        dataType: 'json',
        success: function (data) {
            var sinaviddd = "sinaviddd";
            var sinavidlist = "";
            var sinavdersidlist = "";
            var j;
            var dataSet = [];
            var properties = [];
            $('#sinavsec').empty();
            $("#cevaplar td").remove();
            for (var j = 0; j < data.length; j++) {
                var text = data[j].SinavAciklamasi;
                var sinavid = data[j].SinavID;
                var sinavdersid = data[j].SinavDersID;
                $('#sinavsec').append("<option data-sinavdersid=" + sinavdersid + " data-sinvaid=" + sinavid + " id=" + sinaviddd + " >" + text + "</option>");
            }
            $("#sinavsec").on('change', function () {
                document.getElementById("subesec").style.visibility = "visible";
                var sinaviddd = document.getElementById("sinaviddd");
                sinavidlist = $(this).find('option:selected').attr('data-sinvaid');
                sinavdersidlist = $(this).find('option:selected').attr('data-sinavdersid');
                localStorage.setItem("sinavdersidlist", sinavdersidlist);
                localStorage.setItem("sinavidlist", sinavidlist);
                $('#subesec').empty();
                $('#ogrencisec').empty();
                $('#kitapciksec').empty();
                $("#cevaplar td").remove();
                $.ajax({
                    url: 'http://' + ip + '/Slim_Proxy_okulsis/SlimProxyBoot.php?url=OgretmenSinavaGirenSubeler_mbllogin&sinavID=' + sinavidlist + '&okulID=' + okulid + '&ogretmenID=' + kisiid + '&cid=' + cid + '&lid=' + lid + '&did=' + did + '',
                    type: 'GET',
                    dataType: 'json',
                    success: function (data) {
                        var j;
                        var dataSet = [];
                        var properties = [];
                        var sinavagirensubeler = "sinavagirensubeler";
                        var sinavokulidlist = "sinavokulidlist";
                        var sinavokulidgelen = "";
                        var girensubler = "";
                        $('#subesec').empty();
                        for (var j = 0; j < data.length; j++) {
                            var text = data[j].SinifKodu;
                            var sinavokulid = data[j].SinavOkulID;
                            var SinifKodu = data[j].SinifKodu;

                            // alert(sinifid);
                            $('#subesec').append("<option  value=" + sinavokulid + " id=" + sinavagirensubeler + " data-snifkodu=" + SinifKodu + " data-sinavokulid=" + sinavokulid + " >" + text + "</option>");
                        }
                        $("#subesec").on('change', function () {
                            document.getElementById("ogrencisec").style.visibility = "visible";
                            var sinavagirensubeler = document.getElementById("sinavagirensubeler");
                            girensubler = $(this).find('option:selected').attr('data-snifkodu');
                            sinavokulidgelen = $(this).find('option:selected').attr('data-sinavokulid');
                            localStorage.setItem("girensubler", girensubler);
                            localStorage.setItem("sinavokulidgelen", sinavokulidgelen);
                            $("#cevaplar td").remove();
                            $.ajax({
                                url: 'http://' + ip + '/Slim_Proxy_okulsis/SlimProxyBoot.php?url=TopluOgrenciCevap_mbllogin&sinavOkulID=' + this.value + '&sinifKodu=' + girensubler + '&cid=' + cid + '&lid=' + lid + '&did=' + did + '',
                                type: 'GET',
                                dataType: 'json',
                                success: function (data) {
                                    var j;
                                    var dataSet = [];
                                    var properties = [];
                                    var msglist = "msglist";
                                    $('#ogrencisec').empty();
                                    for (var j = 0; j < data.length; j++) {
                                        var text = data[j].AdiSoyadi;
                                        var SinifKodu = data[j].SinifKodu;
                                        var sinavogrenciid = data[j].SinavOgrenciID;
                                      

                                        // alert(sinifid);
                                        $('#ogrencisec').append("<option value=" + SinifKodu + " data-user=" + sinavogrenciid + " id=" + msglist + ">" + text + "</option>");
                                    }
                                    $("#ogrencisec").on('change', function () {
                                        $("#cevaplar td").remove();
                                        document.getElementById("kitapciksec").style.visibility = "visible";
                                        var girensublerr = localStorage.getItem("girensubler");
                                        var sinavokulidgelenler = localStorage.getItem("sinavokulidgelen");
                                        var msglist = document.getElementById("msglist");
                                        localStorage.setItem("sinavogrenciid", $(this).find('option:selected').attr('data-user'));
                                        sinavogrenciid=  localStorage.getItem("sinavogrenciid");
                                        
                                        $.ajax({
                                            url: 'http://' + ip + '/Slim_Proxy_okulsis/SlimProxyBoot.php?url=SinavdaKullanilanKitaplar_mbllogin&sinavOkulID=' + sinavokulidgelenler + '&sinifKodu=' + SinifKodu + '&cid=' + cid + '&lid=' + lid + '&did=' + did + '',
                                            type: 'GET',
                                            dataType: 'json',
                                            success: function (data) {
                                                var j;
                                                var dataSet = [];
                                                var properties = [];
                                                $('#kitapciksec').empty();
                                                for (var j = 0; j < data.length; j++) {
                                                    var text = data[j].KitapcikAciklamasi;
                                                    var sinavkitapcikid = data[j].SinavKitapcikID;
                                                    if (j >= 1) {
                                                        $('#kitapciksec').append("<option value=" + sinavkitapcikid + ">" + text + "</option>");
                                                    }
                                                   
                                                }
                                                if (data.length == 2) {
                                                   
                                                    var sinavidlist = localStorage.getItem("sinavidlist");
                                                    var sinavdersidlist = localStorage.getItem("sinavdersidlist");
                                                     $("#cevaplar td").remove();
                                                    $.ajax({
                                                        url: 'http://' + ip + '/Slim_Proxy_okulsis/SlimProxyBoot.php?url=OgretmenSinavSorulariKDK_mbllogin&sinavDersID=' + sinavdersidlist + '&sinavOgrenciID=' + sinavogrenciid + '&cid=' + cid + '&lid=' + lid + '&did=' + did + '',
                                                        type: 'GET',
                                                        dataType: 'json',
                                                        success: function (data) {

                                                            var j;
                                                            var dataSet = [];
                                                            var properties = [];
                                                            var puanid = "puan";
                                                            //$('#location').empty();
                                                            for (var j = 0; j < data.length; j++) {
                                                                var sira = data[j].Sira;
                                                                var sorupuani = data[j].SoruPuani;
                                                                var soruid = data[j].SinavSoruID;
                                                                var aldigipuan = data[j].AldigiPuan;
                                                                var ogrencialdigipuan = data[j].OgrenciSoruPuani;
                                                                var onay = data[j].Onay;
                                                                //alert(onay);
                                                                puanid = "puan" +j;
                                                                // alert(puanid);
                                                                if (onay == 0) {
                                                                    $('#cevaplar').append('<tr ><td class="onaysiz">' + sira + '</td><td  id="maxpuan"><input class="op" style="width:70%;" name="puan" type="number" id=' + puanid + '  max=' + sorupuani + ' placeholder="' + ogrencialdigipuan+'"></td><td class="ap" id="aldigipuan" >' + aldigipuan + '</td><td class="sp" id="sorupuaniii" >' + sorupuani + '</td><td style="display:none;">' + soruid + '</td><td style="display:none;">' + puanid + '</td></tr>');
                                                                }
                                                                else {
                                                                    $('#cevaplar').append('<tr ><td class="onayli">' + sira + '</td><td id="maxpuan"><input style="display:none;" style="width:70%;" class="op"  name="puan" type="number" id=' + puanid + '  max=' + sorupuani + ' placeholder="' + ogrencialdigipuan +'"></td> <td class="ap" id="aldigipuan" >' + aldigipuan + '</td><td class="sp" id="sorupuaniii" >' + sorupuani + '</td><td style="display:none;">' + soruid + '</td><td style="display:none;">' + puanid + '</td></tr>');
                                                                }
                                                               
                                                            }
                                                            var tds = document.getElementById('cevaplar').getElementsByTagName('td');
                                                           
                                                            var sum = 0;
                                                            for (var i = 0; i < tds.length; i++) {
                                                                if (tds[i].className == 'sp') {
                                                                    sum += isNaN(tds[i].innerHTML) ? 0 : parseInt(tds[i].innerHTML);
                                                                    
                                                                }
                                                            }

                                                            var tdss = document.getElementById('cevaplar').getElementsByTagName('td');
                                                            var sum1 = 0;
                                                            for (var i = 0; i < tdss.length; i++) {
                                                                if (tdss[i].className == 'ap') {
                                                                    sum1 += isNaN(tdss[i].innerHTML) ? 0 : parseInt(tdss[i].innerHTML);

                                                                }
                                                            }

                                                            $('#toplam').append('<tr><td>' + sum + '</td><td class="hs">' + sum1+'</td></tr>');
                                                            $("#cevaplar").on('click', 'td', function () {
                                                                var table = document.getElementById("cevaplar");
                                                                var rows = table.getElementsByTagName("tr");
                                                                for (i = 0; i < rows.length; i++) {
                                                                    var currentRow = table.rows[i];
                                                                    var createClickHandler =
                                                                        function (row) {
                                                                            return function () {
                                                                                var rows = $("#location>tr");
                                                                                // alert(JSON.stringify(rows, null, 4));
                                                                                console.log(JSON.stringify(rows, null, 5));
                                                                                var cell = row.getElementsByTagName("td")[4];
                                                                                var odeviddd = row.getElementsByTagName("td")[4];

                                                                                var id = cell.innerHTML;
                                                                                gelenodeviddd = odeviddd.innerHTML;
                                                                               // alert(id);
                                                                                // alert(gelenodeviddd);
                                                                              
                                                                                $(function () {
                                                                                    // alert(puanid);
                                                                                   // alert(id);
                                                                                    var ggg = "#"+id;
                                                                                   // alert(ggg);
                                                                                    $(ggg).change(function () {
                                                                                       // alert(ggg);
                                                                                        var max = parseInt($(this).attr('max'));
                                                                                        var min = parseInt($(this).attr('min'));
                                                                                        if ($(this).val() > max) {
                                                                                            $(this).val(max);
                                                                                        }
                                                                                        else if ($(this).val() < min) {
                                                                                            $(this).val(min);
                                                                                        }
                                                                                    });
                                                                                });


                                                                            };
                                                                        };

                                                                    currentRow.onclick = createClickHandler(currentRow);
                                                                }
                                                                ////////////////////////////////
                                                            
                                                            });
                                                        }

                                                    });}
                                                $("#kitapciksec").on('change', function () {
                                                    
                                                   
                                                    var sinavidlist = localStorage.getItem("sinavidlist");
                                                    var sinavdersidlist = localStorage.getItem("sinavdersidlist");
                                                    $.ajax({
                                                        url: 'http://' + ip + '/Slim_Proxy_okulsis/SlimProxyBoot.php?url=OgretmenSinavSorulariKDK_mbllogin&sinavDersID=' + sinavdersidlist + '&sinavOgrenciID=' + sinavogrenciid + '&cid=' + cid + '&lid=' + lid + '&did=' + did + '',
                                                        type: 'GET',
                                                        dataType: 'json',
                                                        success: function (data) {

                                                            var j;
                                                            var dataSet = [];
                                                            var properties = [];
                                                            var puanid = "puan";
                                                            //$('#location').empty();
                                                            for (var j = 0; j < data.length; j++) {
                                                                var sira = data[j].Sira;
                                                                var sorupuani = data[j].SoruPuani;
                                                                var soruid = data[j].SinavSoruID;
                                                                puanid = j;
                                                               // alert(puanid);
                                                                $('#cevaplar').append('<tr><td>' + sira + '</td><td id="maxpuan"><input class="op"  name="puan" type="number" id=' + puanid + '  max=' + sorupuani + ' placeholder="Puan"></td><td class="sp" id="sorupuaniii" >' + sorupuani + '</td><td style="display:none;">' + soruid + '</td><td style="display:none;">' + puanid + '</td></tr>');
                                                            }
                                                            var tds = document.getElementById('cevaplar').getElementsByTagName('td');
                                                           // alert("asa");
                                                            var sum = 0;
                                                            for (var i = 0; i < tds.length; i++) {
                                                                if (tds[i].className == 'sp') {
                                                                    sum += isNaN(tds[i].innerHTML) ? 0 : parseInt(tds[i].innerHTML);
                                                                    alert(sum);
                                                                }
                                                            }
                                                         
                                                            $('#toplam').append('<tr><td>' + sum + '</td><td class="hs">asd</td></tr>');
                                                            $("#cevaplar").on(' touchstart click', 'td', function () {


                                                                ////////////////////////////////
                                                                $(function () {
                                                                   // alert(puanid);
                                                                    $(puanid).change(function () {
                                                                        var max = parseInt($(this).attr('max'));
                                                                        var min = parseInt($(this).attr('min'));
                                                                        if ($(this).val() > max) {
                                                                            $(this).val(max);
                                                                        }
                                                                        else if ($(this).val() < min) {
                                                                            $(this).val(min);
                                                                        }
                                                                    });
                                                                });
                                                            });
                                                        }

                                                    });


                                                });
                                            }

                                        });


                                    });
                                }

                            });


                        });
                    }

                });

            });
        }

    });


    //Contenier Son

};

