function load() {
    var kid = localStorage.getItem("gelenid");
   
    var tc = localStorage.getItem("tc");
    var lid = localStorage.getItem("lid");
    var cid = "";
    var did = "";
    var ip = "";
    var dersyiliid = "";
    var kisiid = "";
   // alert(lid);
    $.ajax({
        url: 'http://mobile.okulsis.net:8280/Slim_Proxy_okulsis/SlimProxyBoot.php?tc=' + tc + '&url=mobilfirstdata_mbllogin&languageID=' + lid + '',
        type: 'GET',
        dataType: 'json',
        success: function (data) {
          //  alert("ss");
            
            var j;
            var dataSet = [];
            var properties = [];
            var rolid;
            var proxylist = "proxylist";
            var text = "";
            var okulid = ""; 
            var kurumid = "";
            var proxy = "";
            var egitimyiliid = "";
            var gelenip = "";
            var okullogo = "";
            var brans = "";
            var kisilogo = "";
            var okuladikisa = "";
            $('#selectSchool').empty();
            for (var j = 0; j < data.length; j++) {
                text = data[j].OkulAdi;
                okuladikisa = data[j].OkulAdiKisa;
                 okulid = data[j].OkulID;
                 dersyiliid = data[j].DersYiliID;
                 kurumid = data[j].KurumID;
                 kisiid = data[j].KisiID;
                 cid = data[j].cid;
                 proxy = data[j].proxy;     
                 egitimyiliid = data[j].EgitimYilID;  
                 did = data[j].did;
                 gelenip = data[j].ip;    
                 rolid = data[j].RolID;
                 okullogo = data[j].OkulLogo;
                 brans = data[j].brans;
                 kisilogo = data[j].defaultFotoURL;
                 localStorage.setItem("kisilogo", kisilogo);
               //  alert(brans);
               

                 $('#selectSchool').append("<option  data-okuladikis=" + brans + "data-brans=" + brans + " data-did=" + did + " data-kisiid=" + kisiid + " data-egitimyiliid=" + egitimyiliid + " data-okulid=" + okulid + " data-dersyiliid=" + dersyiliid + " data-cid=" + cid + " data-proxy=" + proxy + " id=" + proxylist + " class=" + kurumid + "  value=" + rolid + ">" + text + "</option>");
          
            }
            $("#selectSchool").on('change', function () {
              
                localStorage.setItem("okuladi", $('#selectSchool option:selected').text());
                localStorage.setItem("okullogo", okullogo);
                
                var proxylist = document.getElementById("proxylist");
                var cidlist = document.getElementById("proxylist");
                var dersyiliidlist = document.getElementById("proxylist");
                var okulidlist = document.getElementById("proxylist");
                var egitimyiliidlist = document.getElementById("proxylist");
                var didlist = document.getElementById("proxylist");
                var kisilist = document.getElementById("proxylist");
                var branslist = document.getElementById("proxylist");
                var okuladikisalist = document.getElementById("proxylist");
                did = didlist.getAttribute("data-did");
                ip = proxylist.getAttribute("data-proxy");
                cid = cidlist.getAttribute("data-cid");
                dersyiliid = dersyiliidlist.getAttribute("data-dersyiliid");
                kisiid = kisilist.getAttribute("data-kisiid");
                okulid = dersyiliidlist.getAttribute("data-okulid");
                egitimyiliid = egitimyiliidlist.getAttribute("data-egitimyiliid");
                brans = branslist.getAttribute("data-brans");
                okuladikisa = okuladikisalist.getAttribute("data-okuladikisa");
              
            
               // alert(okulid);
                //-----------------------------------------------------------
                localStorage.setItem("RolID", $(this).find('option:selected').attr('value'));
                localStorage.setItem("kurumid", $(this).find('option:selected').attr('class'));
                localStorage.setItem("cid", $(this).find('option:selected').attr('data-cid'));
                localStorage.setItem("did", $(this).find('option:selected').attr('data-did'));
                localStorage.setItem("ip", $(this).find('option:selected').attr('data-proxy'));
                localStorage.setItem("dersyiliid", $(this).find('option:selected').attr('data-dersyiliid'));
                localStorage.setItem("kisiid", $(this).find('option:selected').attr('data-kisiid'));
                localStorage.setItem("okulid", $(this).find('option:selected').attr('data-okulid'));
                localStorage.setItem("egitimyiliid", $(this).find('option:selected').attr('data-egitimyiliid'));
                localStorage.setItem("brans", $(this).find('option:selected').attr('data-brans'));
                localStorage.setItem("okuladikisa", $(this).find('option:selected').attr('data-okuladikisa'));
               
               window.location.href = "pages/main.html";
            });
            if (data.length == 2) {
                localStorage.setItem("okullogo", okullogo);
                localStorage.setItem("okuladi", text);
                localStorage.setItem("RolID", rolid);
                localStorage.setItem("kurumid", kurumid);
                localStorage.setItem("cid", cid);
                localStorage.setItem("did", did);
                localStorage.setItem("ip", proxy);
                localStorage.setItem("dersyiliid", dersyiliid);
                localStorage.setItem("kisiid", kisiid);
                localStorage.setItem("okulid", okulid);
                localStorage.setItem("egitimyiliid", egitimyiliid);
                localStorage.setItem("brans", brans);
                localStorage.setItem("okuladikisa", okuladikisa);
                var kurumid = localStorage.getItem("kurumid");
                
                window.location.href = "pages/main.html";
            }

        }

    });
}