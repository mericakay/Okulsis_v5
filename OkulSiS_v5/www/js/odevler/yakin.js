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
    try {
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

                    $.ajax({
                        url: 'http://' + ip + '/Slim_Proxy_okulsis/SlimProxyBoot.php?url=OdevListesiOgrenciveYakin_mbllogin&ogrenciID=' + value + '&egitimYilID=' + egitimyiliid + '&did=' + did + '&cid=' + cid + '&languageID=' + lid + '',
                        type: 'GET',
                        dataType: 'json',
                        success: function (data) {
                            var j;
                            var dataSet = [];
                            var properties = [];
                            for (var j = 0; j < data.length; j++) {
                                var ogretmenadi = data[j].OgretmenAdi;
                                var dersadi = data[j].DersAdi;
                                var tanim = data[j].Tanim;
                                var teslimtarihi = data[j].TeslimTarihi;
                                var aciklama = data[j].Aciklama;
                                var ogrencigordu = data[j].OgrenciGordu;
                                var odevid = data[j].OgrenciOdevID;
                                //  alert(ogrencigordu);
                                if (ogrencigordu == 1) {

                                    $('#example').append('<tr><td class="okundu" >' + ogretmenadi + '</td><td class="okundu">' + dersadi + '</td><td class="okundu">' + tanim + '</td><td class="okundu">' + teslimtarihi + '</td><td class="okundu" style="display:none;">' + aciklama + '</td><td class="okundu"  style="display:none;">' + odevid + '</td></tr>');

                                }
                                else {
                                    $('#example').append('<tr><td class="okunmadi">' + ogretmenadi + '</td><td class="okunmadi">' + dersadi + '</td><td class="okunmadi">' + tanim + '</td><td class="okunmadi">' + teslimtarihi + '</td><td class="okunmadi" style="display:none;">' + aciklama + '</td> <td class="okunmadi" style="display:none;">' + odevid + '</td></tr>');
                                }

                            }
                            $("#example").on('click', function () {
                                var table = document.getElementById("example");
                                var rows = table.getElementsByTagName("tr");
                                for (i = 0; i < rows.length; i++) {
                                    var currentRow = table.rows[i];
                                    var createClickHandler =
                                        function (row) {
                                            return function () {
                                                var rows = $("#location>tr");
                                                // alert(JSON.stringify(rows, null, 4));
                                                console.log(JSON.stringify(rows, null, 5));
                                                var cell = row.getElementsByTagName("td")[4];
                                                var odeviddd = row.getElementsByTagName("td")[5];

                                                var id = cell.innerHTML;
                                                gelenodeviddd = odeviddd.innerHTML;
                                                alert(id);
                                              //  alert(gelenodeviddd);
                                                setTimeout(function () {
                                                    location.reload()
                                                }, 100);
                                            };
                                        };

                                    currentRow.onclick = createClickHandler(currentRow);
                                }
                                $.ajax({
                                    url: 'http://' + ip + '/Slim_Proxy_okulsis/SlimProxyBoot.php?url=OdevListesiOgrenciveYakin_mbllogin&ogrenciID=' + kisiid + '&egitimYilID=' + egitimyiliid + '&did=' + did + '&cid=' + cid + '&languageID=' + lid + '',
                                    type: 'GET',
                                    dataType: 'json',
                                    success: function (data) {

                                        console.log("okundu");
                                    }
                                });
                            });
                        }

                    });
                }
                $("#selectNumber").on('change', function () {
                    var ogrenciidselected = this.value;

                    $.ajax({
                        url: 'http://' + ip + '/Slim_Proxy_okulsis/SlimProxyBoot.php?url=OdevListesiOgrenciveYakin_mbllogin&ogrenciID=' + this.value + '&egitimYilID=' + egitimyiliid + '&did=' + did + '&cid=' + cid + '&languageID=' + lid +'',
                        type: 'GET',
                        dataType: 'json',
                        success: function (data) {



                            var j;
                            var dataSet = [];
                            var properties = [];
                            for (var j = 0; j < data.length; j++) {
                                var ogretmenadi = data[j].OgretmenAdi;
                                var dersadi = data[j].DersAdi;
                                var tanim = data[j].Tanim;
                                var teslimtarihi = data[j].TeslimTarihi;
                                $('#example').append('<tr><td>' + ogretmenadi + '</td><td>' + dersadi + '</td><td>' + tanim + '</td><td>' + teslimtarihi + '</td></tr>');
                            }
                            $("#example").on('click', function () {
                                alert("1");
                                var table = document.getElementById("example");
                                var rows = table.getElementsByTagName("tr");
                                for (i = 0; i < rows.length; i++) {
                                    var currentRow = table.rows[i];
                                    var createClickHandler =
                                        function (row) {
                                            return function () {
                                                var rows = $("#location>tr");
                                                // alert(JSON.stringify(rows, null, 4));
                                                console.log(JSON.stringify(rows, null, 4));
                                                var cell = row.getElementsByTagName("td")[4];

                                                var id = cell.innerHTML;
                                                alert(id);

                                            };
                                        };

                                    currentRow.onclick = createClickHandler(currentRow);
                                }
                                $.ajax({
                                    url: 'http://' + ip + '/Slim_Proxy_okulsis/SlimProxyBoot.php?url=OdevListesiOgrenciveYakin_mbllogin&ogrenciID=' + kisiid + '&egitimYilID=' + egitimyiliid + '&did=' + did + '&cid=' + cid + '&languageID=' + lid + '',
                                    type: 'GET',
                                    dataType: 'json',
                                    success: function (data) {

                                        console.log("okundu");
                                    }
                                });
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