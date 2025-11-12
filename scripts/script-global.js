let Menu = false
function abrirNav() {
    document.getElementById("menu-lateral").style.width = "250px";
    document.getElementById("principal").style.marginLeft = "250px";
}

function fecharNav() {
    document.getElementById("menu-lateral").style.width = "0px";
    document.getElementById("principal").style.marginLeft = "0px";
}

function slideMenu() {
    if (Menu === false){
        Menu = true
        abrirNav()
    }
    else{
        Menu = false
        fecharNav()
    }
}

// Navegação está aqui em baixo
function pag_login() {
    getElementById("main-frame").src = "public/Login/Logon.html"
}