function load() {
    var lroad = localStorage.getItem("lroad");
    var proad = localStorage.getItem("proad");
    var x = document.createElement("IFRAME");
    x.setAttribute("src", lroad);
    x.style.width = "0%";
    x.style.height = "0px";
    document.body.appendChild(x);
    
    for  (var i = 0; i < 1000000000; i++) {
      
        

    }
    var div = document.getElementById('loader');

    div.style.visibility = 'hidden';
    var y = document.createElement("IFRAME");
    y.setAttribute("src", proad);
    y.style.width = "95%";
    y.style.height = "900px";
    
    document.body.appendChild(y);
}
function close_window() {
    
        window.history.back();
    
}