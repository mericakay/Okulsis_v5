$(document).ready(function() {

  
  var animating = false,
      submitPhase1 = 1100,
      submitPhase2 = 400,
      logoutPhase1 = 800,
      $login = $(".login"),
      $app = $(".app");
  
  function ripple(elem, e) {
    $(".ripple").remove();
    var elTop = elem.offset().top,
        elLeft = elem.offset().left,
        x = e.pageX - elLeft,
        y = e.pageY - elTop;
    var $ripple = $("<div class='ripple'></div>");
    $ripple.css({top: y, left: x});
    elem.append($ripple);
  };
  
  $(document).on("click", ".login__submit", function(e) {
    if (animating) return;
    animating = true;
    var that = this;
    ripple($(that), e);
    $(that).addClass("processing");
    setTimeout(function() {
      $(that).addClass("success");
      setTimeout(function() {
        $app.show();
        $app.css("top");
        $app.addClass("active");
      }, submitPhase2 - 70);
      setTimeout(function() {
        $login.hide();
        $login.addClass("inactive");
        animating = false;
        $(that).removeClass("success processing");
      }, submitPhase2);
    }, submitPhase1);
  });
  
  $(document).on("click", ".app__logout", function(e) {
    if (animating) return;
    $(".ripple").remove();
    animating = true;
    var that = this;
    $(that).addClass("clicked");
    setTimeout(function() {
      $app.removeClass("active");
      $login.show();
      $login.css("top");
      $login.removeClass("inactive");
    }, logoutPhase1 - 120);
    setTimeout(function() {
      $app.hide();
      animating = false;
      $(that).removeClass("clicked");
    }, logoutPhase1);
  });
  $('input[id^="button"]').click(function () {
    
      username = $("#name").val();
      sifre = $("#password").val();
     
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
                  
                  localStorage.setItem("tc", username);
                  localStorage.setItem("KullaniciAdi", gelen);
                  localStorage.setItem("gelenid", kisiid, "okulid", okulid);
                  var add = localStorage.getItem("KullaniciAdi");

                  window.location.href = "selectScholl.html";
              }
              else {
                  alert("Hatalý kullanýcý adý ya da þifre")
              }

          },
          error: function (textStatus, errorThrown) {
              Success = false;//doesnt goes here
              alert("Beklenmedik bir hata oluþtu lütfen daha sonra deneyiniz")
          }
      });

  });
  
});

function load() {
    //  localStorage.clear();

    var lid = 647;
    localStorage.setItem("lid", lid);
    try {
        $.ajax({

            url: 'http://mobile.okulsis.net:8280/Slim_Proxy_okulsis/SlimProxyBoot.php?url=fillComboBoxTsql_syslanguage',
            type: 'GET',
            dataType: 'json',
            crossDomain: true,
            success: function (data) {

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