// Variables para usar desde el html
const Usuario = document.getElementById('usuario')
const contraseña = document.getElementById('contraseña')
const entrar = document.getElementById('entrar');
const recordar = document.getElementById('recordar');
p = document.getElementById('pTexto');

function guardarUsuario(dat){
    let datUsuario = {user: Usuario.value, pass: contraseña.value}
    if (datUsuario.user =="" || datUsuario.pass ==""){
        p.innerText= "Faltan datos";
        return;
    }else{
        if(dat === "localStorage"){
            localStorage.setItem("item", JSON.stringify(datUsuario))
        }
    }
    return datUsuario
}