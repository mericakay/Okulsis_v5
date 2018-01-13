
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
    //alert(lid);
    var theDate = new Date();
    var myNewDate = new Date(theDate);
    myNewDate.setDate(myNewDate.getDate());
    document.getElementById("myDate").valueAsDate = myNewDate;
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
 var x = document.getElementById("myDate").value;
 try {
     $.ajax({

         url: 'http://' + ip + '/Slim_Proxy_okulsis/SlimProxyBoot.php?url=KurumVePersonelDevamsizlik_mbllogin&dersYiliID=' + dersyiliid + '&tarih=' + x + '&cid=' + cid + '&languageID=' + lid + '&did=' + did + '',
         type: 'GET',
         dataType: 'json',
         success: function (data) {
             var j;
             var dataSet = [];
             var properties = [];
             //$('#location').empty();
             for (var j = 0; j < data.length; j++) {
                 var Numarasi = data[j].Numarasi;
                 var Adi = data[j].Adsoyad;
                 var SoyAdi = data[j].Soyadi;
                 var Tc = data[j].TCKimlikNo;
                 var aciklama = data[j].DevamsizlikAdi;
                 var selected = data[j].selected;
                 $('#example').append('<tr><td>' + Numarasi + '</td><td>' + Adi + '</td><td>' + aciklama + '</td></tr>');
             }

         }
     });
 } catch (e) {
     alert(e);
 }
 
 $("#myDate").change(function () {
     var x = document.getElementById("myDate").value;
     $("#example td").remove();
    try {
        $.ajax({

            url: 'http://' + ip + '/Slim_Proxy_okulsis/SlimProxyBoot.php?url=KurumVePersonelDevamsizlik_mbllogin&dersYiliID=' + dersyiliid + '&tarih=' + x + '&cid=' + cid + '&languageID=' + lid + '&did=' + did + '',
            type: 'GET',
            dataType: 'json',
            success: function (data) {
                var j;
                var dataSet = [];
                var properties = [];
                //$('#location').empty();
                for (var j = 0; j < data.length; j++) {
                    var Numarasi = data[j].Numarasi;
                    var Adi = data[j].Adsoyad;
                    var SoyAdi = data[j].Soyadi;
                    var Tc = data[j].TCKimlikNo;
                    var aciklama = data[j].DevamsizlikAdi;
                    var selected = data[j].selected;
                    $('#example').append('<tr><td>' + Numarasi + '</td><td>' + Adi + '</td><td>' + aciklama + '</td></tr>');
                }

            }
        });
    } catch (e) {
        alert(e);
    }
 });
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