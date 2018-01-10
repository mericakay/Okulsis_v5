function load() {
    var kid = localStorage.getItem("gelenid");
   
    var tc = localStorage.getItem("tc");
    var lid = localStorage.getItem("lid");
    var cid = "";
    var did = "";
    var ip = "";
    var dersyiliid = "";
    var kisiid = "";

   
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
            var donemID = "";
            $('#selectSchool').empty();
            for (var j = 0; j < data.length; j++) {
                rowid = data[j].rowID;
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
                 okullogo = data[j].okullogoURL;
                 brans = data[j].brans;
                 kisilogo = data[j].defaultFotoURL;
                 donemID = data[j].DonemID;
                // alert(donemID);
                
                 localStorage.setItem("kisilogo", kisilogo);
                

                 $('#selectSchool').append("<option data-okullogo=" + okullogo + "  data-donemid=" + donemID + " data-okuladikisa=" + brans + "data-brans=" + brans + " data-did=" + did + " data-kisiid=" + kisiid + " data-egitimyiliid=" + egitimyiliid + " data-okulid=" + okulid + " data-dersyiliid=" + dersyiliid + " data-cid=" + cid + " data-proxy=" + proxy + " id=" + proxylist + " class=" + kurumid + "  value=" + rowid + ">" + text + "</option>");
          
            }
            $("#selectSchool").on('change', function () {
                var row = $(this).find('option:selected').attr('value');
                for (var i = 0; i < data.length; i++) {
                    if (row == data[i].rowID) {
                        localStorage.setItem("okuladi", $('#selectSchool option:selected').text());
                        localStorage.setItem("okullogo", okullogo);
                        localStorage.setItem("RolID", data[i].RolID);
                        localStorage.setItem("kurumid", data[i].KurumID);
                        localStorage.setItem("cid", data[i].cid);
                        localStorage.setItem("did", data[i].did);
                        localStorage.setItem("ip", data[i].proxy);
                        localStorage.setItem("dersyiliid", data[i].DersYiliID);
                        localStorage.setItem("kisiid", data[i].KisiID);
                        localStorage.setItem("okulid", data[i].OkulID);
                        localStorage.setItem("egitimyiliid", data[i].EgitimYilID);
                        localStorage.setItem("brans", data[i].brans);
                        localStorage.setItem("okuladikisa", data[i].OkulAdiKisa);
                        localStorage.setItem("donemID", data[i].DonemID);
                        window.location.href = "pages/main.html";
                    }
                }
               
                
                var proxylist = document.getElementById("proxylist");
                var cidlist = document.getElementById("proxylist");
                var dersyiliidlist = document.getElementById("proxylist");
                var okulidlist = document.getElementById("proxylist");
                var egitimyiliidlist = document.getElementById("proxylist");
                var didlist = document.getElementById("proxylist");
                var kisilist = document.getElementById("proxylist");
                var branslist = document.getElementById("proxylist");
                var okuladikisalist = document.getElementById("proxylist");
                var donemidlist = document.getElementById("proxylist");
                did = didlist.getAttribute("data-did");
                ip = proxylist.getAttribute("data-proxy");
                cid = cidlist.getAttribute("data-cid");
                dersyiliid = dersyiliidlist.getAttribute("data-dersyiliid");
                kisiid = kisilist.getAttribute("data-kisiid");
                okulid = dersyiliidlist.getAttribute("data-okulid");
                egitimyiliid = egitimyiliidlist.getAttribute("data-egitimyiliid");
                brans = branslist.getAttribute("data-brans");
                okuladikisa = okuladikisalist.getAttribute("data-okuladikisa");
                donemID = donemidlist.getAttribute("data-donemid");
                
              
            
               // alert(okulid);
                //-----------------------------------------------------------
            
            
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
                localStorage.setItem("donemID", donemID);
                
                window.location.href = "pages/main.html";
            }

        }

    });
}

