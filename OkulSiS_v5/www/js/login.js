function load() {
    //  localStorage.clear();

    var lid = 647;
   
    var tchatirla = localStorage.getItem("tchatirla");
    localStorage.clear();
    localStorage.setItem("lid", lid);
    try {
        $.ajax({

            url: 'http://mobile.okulsis.net:8280/Slim_Proxy_okulsis/SlimProxyBoot.php?url=fillComboBoxTsql_syslanguage',
            type: 'GET',
            dataType: 'json',
            crossDomain: true,
            success: function (data) {
                document.getElementById("password").value = tchatirla;
                var j;
                var dataSet = [];
                var properties = [];
                //$('#location').empty();
                for (var j = 0; j < data.length; j++) {
                    var dil = data[j].language;
                    var id = data[j].id;
                    var url = data[j].url;
                    var background = "background- image:url(" + url + ")"

                    $('#selectLanguage').append("<option style=" + url + "  value=" + id + ">" + dil + "</option>");
                }
                $("#selectLanguage").on('change', function () {

                    lid = this.value;

                    localStorage.setItem("lid", lid);

                });


            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.log("request failed" + errorThrown);
            }
        });

    } catch (e) {
        alert(e);
    }


}
$(document).ready(function () {
    
;    $('input[id^="button"]').click(function () {

        username = $("#name").val();
        sifre = $("#password").val();
        var ip = localStorage.getItem("proxy");
        $.ajax({
            url: 'http://mobile.okulsis.net:8280/Slim_Proxy_okulsis/SlimProxyBoot.php?&url=gnlKullaniciFindForLoginByTcKimlikNo_mbllogin',
            data: {
                tc: $("#name").val(),
                sifre: $("#password").val(),
            },
            type: 'Get',
            dataType: 'json',
            success: function (data) {
                if (data.lenght !== 0) {
                    var gelen = data[0].adsoyad;
                    var kisiid = data[0].KisiID;
                    var okulid = data[0].okulid;
                    document.getElementsByTagName("P")[0].innerHTML = gelen;
                    localStorage.setItem("tc", username);
                    localStorage.setItem("KullaniciAdi", gelen);
                    localStorage.setItem("gelenid", kisiid, "okulid", okulid);
                    var add = localStorage.getItem("KullaniciAdi");

                    window.location.href = "selectScholl.html";
                }
                else {
                    alert("Hatalı kullanıcı adı ya da şifre")
                }

            },
            error: function (textStatus, errorThrown) {
                Success = false;//doesnt goes here
                alert("Lütfen İnternet Ayarlarınızı Kontrol Ediniz")
            }
        });

    })
   
})
function limit(element) {
    var max_chars = 11;

    if (element.value.length > max_chars) {
        element.value = element.value.substr(0, max_chars);
    }
}