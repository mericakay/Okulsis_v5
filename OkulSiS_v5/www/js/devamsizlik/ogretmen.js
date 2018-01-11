
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
    var tarih = new Date();
    var gg = tarih.toUTCString();
    var yil = tarih.getFullYear();
    var ay = tarih.getMonth();
    var gun = tarih.getDay();
    var saat = tarih.getHours();
    var dakika = tarih.getMinutes();
    var saniye = tarih.getSeconds();
    var date = new Date(Date.UTC(yil, ay, gun, saat, dakika, saniye));
    date = date.toLocaleDateString();
    //alert(date);
    var dakka = tarih.toLocaleTimeString();
    var gelentarih = date + " " + dakka;
    var dvmGec = 0;
    var dvmYok = 0;
    var varyokvar = "";
    var varyokyok = "";
    var varyokgec = "";

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
    try {
        $.ajax({
            url: 'http://' + ip + '/Slim_Proxy_okulsis/SlimProxyBoot.php?url=fillVarYokGecTypes_sysSpecificDefinitions&languageID='+lid+'',
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
                    text = data[j].text;
                    url = data[j].value;
                    if (url == 0 ) {
                        varyokvar = "<option value=" + url + ">" + text + "</option>";
                    }
                    if (url == 1) {
                        varyokyok = "<option value=" + url + ">" + text + "</option>";
                    }
                    if (url == 2) {
                        varyokgec = "<option value=" + url + ">" + text + "</option>";
                    }
                   
                   
                }
            }
        });
    } catch (e) {
        alert(e);
    }

    var sinifid = "";

    //contenier başlangıç
    try {
        $.ajax({
            url: 'http://' + ip + '/Slim_Proxy_okulsis/SlimProxyBoot.php?url=OgretmenProgramindakiDersler_mbllogin&kisiId=' + kisiid + '&okulID=' + okulid + '&dersYiliID=' + dersyiliid + '&cid=' + cid + '&languageID=' + lid + '&did=' + did + '',
            type: 'GET',
            dataType: 'json',
            success: function (data) {
                var j = 0;
                var dataSet = [];
                var properties = [];
                $('#selectNumber').empty();
                for (var j = 0; j < data.length; j++) {
                    var text = data[j].Aciklama;
                    var sinifid = data[j].SinifID;
                    // alert(sinifid);
                    $('#selectNumber').append("<option value=" + sinifid + ">" + text + "</option>");
                }
                $("#selectNumber").on('change', function () {


                    sinifid = this.value;
                 
                    $.ajax({
                        url: 'http://' + ip + '/Slim_Proxy_okulsis/SlimProxyBoot.php?url=ogretmenDersProgramiDersSaatleri_mbllogin&kisiId=' + kisiid + '&sinifID=' + this.value + '&tarih=' + date + '&cid=' + cid + '&languageID=' + lid + '&did=' + did + '',
                        type: 'GET',
                        dataType: 'json',

                        success: function (data) {
                            var j = 0;
                            var dataSet = [];
                            var properties = [];
                            
                            for (var j = 0; j < data.length; j++) {
                                //ogretmenDersProgramiDersSaatleri
                                var text = data[j].Aciklama;
                                var derssirasi = data[j].DersSirasi;
                                var dersid = data[j].DersID;
                           
                            }
                            if (date.length == 1) {
                                alert("Aktif Ders Saati içerisinde değilsiniz ")
                            }
                                $("#example td").remove();
                                $.ajax({

                                    url: 'http://' + ip + '/Slim_Proxy_okulsis/SlimProxyBoot.php?url=ogretmenDersPrgDersSaatleriOgrencileri_mbllogin&sinifID=' + sinifid + '&tarih=' + date + '&dersSirasi=' + derssirasi + '&dersYiliID=' + dersyiliid + '&kisiId=' + kisiid + '&cid=' + cid + '&languageID=' + lid + '&did=' + did + '',
                                    type: 'GET',
                                    dataType: 'json',
                                    success: function (data) {
                                       
                                        var i = 0;
                                      
                                        var dataSet = [];
                                        
                                        var properties = [];
                                       
                                        //$('#location').empty();
                                        try {
                                          
                                         
                                            for (var i = 0; i < data.length; i++) {
                                                
                                                var Numarasi = data[i].Numarasi;
                                            
                                                var Adi = data[i].Adsoyad;
                                               
                                             
                                              
                                                var Tc = data[i].TCKimlikNo;
                                             
                                                
                                                var oid = data[i].OgrenciID;
                                                
                                                $('#example').append('<tr><td>' + Numarasi + '</td><td>' + Adi + '</td><td> <select id="yokgec">' + varyokvar + '' + varyokyok + '' + varyokgec +' </select></td><td style="display:none;">' + oid + '</td></tr>');
                                            }
                                        } catch (e) {
                                            alert(e);
                                        }
                                        
                                        $("#example").on('click', 'td', function () {

                                            var getJsonFromTable = function () {
                                                var rows = [];
                                                $('#example tbody tr').each(function (i, n) {
                                                    var $row = $(n);
                                                    rows.push({
                                                        no: $row.find('td:eq(0)').text(),
                                                        name: $row.find('td:eq(1)').text(),
                                                        yokgec: $(this).find('option:selected').attr('value'),
                                                        
                                                        id: $row.find('td:eq(4)').text(),

                                                    });
                                                });
                                                return JSON.stringify(rows);
                                            };
                                            $(function () {
                                                //alert(getJsonFromTable());
                                                console.log(getJsonFromTable());
                                                //alert(getJsonFromTable());
                                            });;

                                        });


                                    }
                                });
                          


                        }
                    });

                });
            }
        });
    } catch (e) {
        alert(e);
    }


    //Contenier Son
};

function sortTable(n) {
    var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
    table = document.getElementById("example");
    switching = true;
    //Set the sorting direction to ascending:
    dir = "asc";
    /*Make a loop that will continue until
    no switching has been done:*/
    while (switching) {
        //start by saying: no switching is done:
        switching = false;
        rows = table.getElementsByTagName("TR");
        /*Loop through all table rows (except the
        first, which contains table headers):*/
        for (i = 1; i < (rows.length - 1); i++) {
            //start by saying there should be no switching:
            shouldSwitch = false;
            /*Get the two elements you want to compare,
            one from current row and one from the next:*/
            x = rows[i].getElementsByTagName("TD")[n];
            y = rows[i + 1].getElementsByTagName("TD")[n];
            /*check if the two rows should switch place,
            based on the direction, asc or desc:*/
            if (dir == "asc") {
                if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
                    //if so, mark as a switch and break the loop:
                    shouldSwitch = true;
                    break;
                }
            } else if (dir == "desc") {
                if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
                    //if so, mark as a switch and break the loop:
                    shouldSwitch = true;
                    break;
                }
            }
        }
        if (shouldSwitch) {
            /*If a switch has been marked, make the switch
            and mark that a switch has been done:*/
            rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
            switching = true;
            //Each time a switch is done, increase this count by 1:
            switchcount++;
        } else {
            /*If no switching has been done AND the direction is "asc",
            set the direction to "desc" and run the while loop again.*/
            if (switchcount == 0 && dir == "asc") {
                dir = "desc";
                switching = true;
            }
        }
    }
}