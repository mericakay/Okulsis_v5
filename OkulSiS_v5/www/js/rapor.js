function load() {
    
    var proad = localStorage.getItem("proad");
 
   
    console.log(proad);
    var y = document.createElement("IFRAME");
    y.setAttribute("src", proad);
    y.style.width = "100%";
    y.style.height = "900px";
    y.style.zIndex = "1000";
    y.style.border = "none";
    
    document.body.appendChild(y);
}
function close_window() {
    
        window.history.back();
    
}