
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
    /*  try {
          $.ajax({
              url: 'http://' + ip + '/Slim_Proxy_okulsis/SlimProxyBoot.php?url=VeliOgrencileri_mbllogin&dersYiliID=' + dersyiliid + '&kisiId=' + kisiid + '&cid=' + cid + '&languageID=' + lid + '&did=' + did + '',
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
                          url: 'http://' + ip + '/Slim_Proxy_okulsis/SlimProxyBoot.php?url=OgrencininSinavlistesi_mbllogin&okulID=' + okulid + '&kisiID=' + value + '&cid=' + cid + '&languageID=' + lid + '&did=' + did + '',
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
                          url: 'http://' + ip + '/Slim_Proxy_okulsis/SlimProxyBoot.php?url=OgrencininSinavlistesi_mbllogin&okulID=' + okulid + '&kisiID=' + this.value + '&cid=' + cid + '&languageID=' + lid + '&did=' + did + '',
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
        url: 'http://' + ip + '/Slim_Proxy_okulsis/SlimProxyBoot.php?url=OgrencininAldigiNotlar_mbllogin&kisiId=' + kisiid + '&cid=' + cid + '&languageID=' + lid + '&did=' + did + '',
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



                $('#sonuc').append('<tr><td>' + aciklamasi + '</td><td>' + puan + '</td></tr>');
            }

        }
    });


    //Contenier Son

};

