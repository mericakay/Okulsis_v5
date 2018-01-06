
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
    var gelendonem = 1;

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

    $("#donem").on('change', function () {
        $("#example td").remove();
        var secilendonem = document.getElementById("donem").value;
        // alert(secilendonem);

        if (secilendonem === "1.donem") {

            gelendonem = 1;



        }
        else {
            gelendonem = 2;


        }
        try {
            // alert(ip);
            $.ajax({
                url: 'http://' + ip + '/Slim_Proxy_okulsis/SlimProxyBoot.php?url=OgrenciKarnesi_mbllogin&donemID=' + gelendonem + '&ogrenciID=' + kisiid + '&cid=' + cid + '&languageID=' + lid + '&did=' + did + '',
                type: 'GET',
                dataType: 'json',
                success: function (data) {
                    var j;
                    var dataSet = [];
                    var properties = [];
                    //$('#location').empty();
                    for (var j = 0; j < data.length; j++) {
                        var dersadi = data[j].DersAdi;
                        var hs = data[j].HaftalikDersSaati;
                        var ysp = data[j].YilSonuPuani;
                        var y1 = data[j].Yazili1;
                        var y2 = data[j].Yazili2;
                        var y3 = data[j].Yazili3;
                        var y4 = data[j].Yazili4;
                        var y5 = data[j].Yazili5;
                        var s1 = data[j].Sozlu1;
                        var s2 = data[j].Sozlu2;
                        var s3 = data[j].Sozlu3;
                        var o1 = data[j].Odev1;
                        var o2 = data[j].Odev2;

                        $('#example').append('<tr><td>' + dersadi + '</td><td>' + y1 + '</td><td>' + y2 + '</td><td>' + y3 + '</td><td>' + y4 + '</td><td>' + y5 + '</td><td>' + s1+ '</td><td>' + s2 + '</td><td>' + s3 + '</td><td>' + o1 + '</td><td>' + o2 + '</td><td>' + ysp + '</td></tr>');
                    }

                }
            });
        } catch (e) {
            alert(e);
        }

    });
   
  

    //Contenier Son



};
