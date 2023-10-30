
const botonDepositar=document.getElementById("btnD");
const botonRetirar=document.getElementById("btnR");
const botonTransferir=document.getElementById("btnT");
const botonCambiar=document.getElementById("btnC");
const botonSalir=document.getElementById("btnS");
let saldoInicial=1000, saldoActual, intentos=3, PIN_CORRECTO="1234";


const mostrarSaldo=()=> {
    document.getElementById("saldo").textContent=saldoInicial+"€";
}

const iniciarSesion=()=> {
    const pin=prompt("Inserte el pin")
    while (pin!=PIN_CORRECTO && intentos>1) {
        intentos--
        alert(`Pin incorrecto, quedan ${intentos} intentos.`)
        const pin=prompt("Inserte el pin")
    }
    if (pin===PIN_CORRECTO) {
        alert("Inicio de sesión exitoso, bienvenido")
        mostrarSaldo()
    }
    else {
        window.location.replace("templates/bloqueado.html")
    }
}

const depositar= ()=> {
    const cantidad=parseFloat(prompt("Inserte la cantidad a depositar"))
    if (isNaN(cantidad) || cantidad<=0) {
        alert ("Inserte una cantidad valida")
    }
    else {
        saldoActual=saldoInicial+cantidad;
        saldoInicial=saldoActual
        alert(`Se han depositado ${cantidad}€`)
        mostrarSaldo()
    }
}
const retirar=()=>{
    const cantidad=parseFloat(prompt("Inserte la cantidad a retirar"))
    if (isNaN(cantidad) || cantidad<=0 || cantidad>saldoInicial) {
        alert ("Inserte una cantidad valida")
    }
    else {
        saldoActual=saldoInicial-cantidad;
        saldoInicial=saldoActual
        alert(`Se han retirado ${cantidad}€`)
        mostrarSaldo()
    }
}

const cambiarContrasena=()=> {
    const pin=prompt("Inserte su pin actual")
    if (pin!=PIN_CORRECTO) {
        alert("El pin no es correcto, vuelva a intentarlo")
        const pin=prompt("Inserte su pin actual")
    }
    else if (pin===PIN_CORRECTO) {
         PIN_CORRECTO=prompt("Inserte la nueva contraseña")
    
        alert("Se ha cambiado la contraseña")
    }
}
botonDepositar.addEventListener("click", depositar)

botonRetirar.addEventListener("click", retirar)


botonTransferir.addEventListener("click", ()=>{

})

botonCambiar.addEventListener("click", cambiarContrasena)

botonSalir.addEventListener("click", ()=>{
    window.location.replace("templates/salir.html")

})

window.addEventListener("load",iniciarSesion)
