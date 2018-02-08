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
    var kurumid = localStorage.getItem("kurumid");
    var cid = localStorage.getItem("cid");
    var egitimyiliid = localStorage.getItem("egitimyiliid");

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


    //contenier başlangıç
    /*  try {
          $.ajax({
              url: 'http://' + ip + '/Slim_Proxy_okulsis/SlimProxyBoot.php?url=VeliOgrencileri_mbllogin&dersYiliID=' + dersyiliid + '&kisiId=' + kisiid + '&cid=' + cid + '&lid=' + lid + '&did=' + did + '',
              type: 'GET',
              dataType: 'json',
              success: function (data) {
                  var j;
                  var dataSet = [];
                  var properties = [];
                  $('#selectNumber').empty();
                  for (var j = 0; j < data.length; j++) {
                      var text = data[j].AdiSoyadi;
                      var value = data[j].OgrenciID;
                      $('#selectNumber').append("<option value=" + value + ">" + text + "</option>");
                  }
                  if (data.length == 2) {
                      document.getElementById("selectNumber").style.visibility = "hidden";
                      document.getElementsByTagName("P")[0].innerHTML = text;
                      var ogrenciidselected = this.value;
                      // alert(ogrenciidselected);
                      $.ajax({
                          url: 'http://' + ip + '/Slim_Proxy_okulsis/SlimProxyBoot.php?url=OgrencininSinavlistesi_mbllogin&okulID=' + okulid + '&kisiID=' + value + '&cid=' + cid + '&lid=' + lid + '&did=' + did + '',
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
                                  var sinavturadi = data[j].sinavTurTanim;
                                  $('#sinav').append('<tr><td>' + sinavtarih + '</td><td>' + aciklama + '</td><td>' + sinavturadi + '</td></tr>');
                              }
  
                          }
                      });
                  }
                  $("#selectNumber").on('change', function () {
                      var ogrenciidselected = this.value;
                      // alert(ogrenciidselected);
  
                      $.ajax({
                          url: 'http://' + ip + '/Slim_Proxy_okulsis/SlimProxyBoot.php?url=OgrencininSinavlistesi_mbllogin&okulID=' + okulid + '&kisiID=' + this.value + '&cid=' + cid + '&lid=' + lid + '&did=' + did + '',
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
                                  var sinavturadi = data[j].sinavTurTanim;
                                  $('#sinav').append('<tr><td>' + sinavtarih + '</td><td>' + aciklama + '</td><td>' + sinavturadi + '</td></tr>');
                              }
  
                          }
                      });
                  });
              }
  
          });*/

    $.ajax({
        url: 'http://' + ip + '/Slim_Proxy_okulsis/SlimProxyBoot.php?url=OgrencininAldigiNotlar_mbllogin&kisiId=' + kisiid + '&cid=' + cid + '&lid=' + lid + '&did=' + did + '',
        type: 'GET',
        dataType: 'json',
        success: function (data) {
            var j;
            var dataSet = [];
            var properties = [];
            //$('#location').empty();
            for (var j = 0; j < data.length; j++) {
                var aciklamasi = data[j].Aciklamasi;
                var puan = data[j].Puan;
                var sinavid = data[j].SinavID;
               // alert(sinavid);



                $('#sonuc').append('<tr><td>' + aciklamasi + '</td><td>' + puan + '</td><td style="display:none;" name="oid" >' + sinavid + '</td></tr>');
            }

        }
    });
    $("#sonuc").on('click', 'td', function () {
        var table = document.getElementById("sonuc");
        var rows = table.getElementsByTagName("tr");
        for (i = 0; i < rows.length; i++) {
            var currentRow = table.rows[i];
            var createClickHandler =
                function (row) {
                    return function () {
                        var rows = $("#location>tr");
                        // alert(JSON.stringify(rows, null, 4));
                        console.log(JSON.stringify(rows, null, 4));
                        var cell = row.getElementsByTagName("td")[2];

                        var id = cell.innerHTML;
                      //  alert(id);
                        //localStorage.setItem("secilensinavid", id);

                        try {
                          //  var secilensinavidd = localStorage.getItem("secilensinavid");
                           // alert(secilensinavidd);
                            // alert(secilenogrenciid);
                            $.ajax({
                                url: 'http://' + ip + '/Slim_Proxy_okulsis/SlimProxyBoot.php?url=OgrenciSinavDetayRpt_mbllogin&ogrenciID=' + kisiid + '&sinavID=' + id + '&lid=' + lid + '&cid=' + cid + '&did=' + did + '',
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
                    };
                };

            currentRow.onclick = createClickHandler(currentRow);
        }


       


    });


    //Contenier Son

};

