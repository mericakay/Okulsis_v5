
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
   
    var dvmGec = 0;
    var dvmYok = 0;
    var headername = localStorage.getItem("headername");
    document.getElementsByTagName("P")[0].innerHTML = headername;
    try {
        var menuid = "#menuid";
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


    //contenier başlangıç
    try {
       
        $.ajax({

            url: 'http://' + ip + '/Slim_Proxy_okulsis/SlimProxyBoot.php?url=OgretmenDersProgramiListesi_mbllogin&ogretmenID=' + kisiid + '&dersYiliID=' + dersyiliid + '&cid=' + cid + '&languageID=' + lid + '&did=' + did + '&donemID=1',
            type: 'GET',
            dataType: 'json',
            success: function (data) {
                var j;
                var dataSet = [];
                var properties = [];
                //$('#location').empty();
                for (var j = 0; j < data.length; j++) {
                    var gun = data[j].aciklama;
                    var dersadi = data[j].DersAdi;
                    var sinifkodu = data[j].SinifKodu;
                    var dersbaslangicbitis = data[j].DersBaslangicBitisSaati;
                    var Tc = data[j].TCKimlikNo;
                    var selected = data[j].selected;

                    $('#example').append('<tr><td>' + gun + '</td><td>' + dersadi + '</td><td>' + sinifkodu + '</td><td>' + dersbaslangicbitis + '</td></tr>');

                }
                $('#example').on('touchstart click', function () {

                    //
                });


            }
        });
    } catch (e) {
        alert(e);
    }

    //Contenier Son
};

function sortTable(n) {
   
}