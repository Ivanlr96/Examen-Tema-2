
const botonDepositar=document.getElementById("btnD");
const botonRetirar=document.getElementById("btnR");
const botonTransferir=document.getElementById("btnT");
const botonCambiar=document.getElementById("btnC");
const botonSalir=document.getElementById("btnS");
let saldoInicial=1000, saldoActual, intentos=3;
const PIN_CORRECTO="1234";
document.getElementById("saldo").textContent=saldoInicial+"€";

const depositar= ()=> {
    const cantidad=parseFloat(prompt("Inserte la cantidad a depositar"))
    if (isNaN(cantidad) || cantidad<=0) {
        alert ("Inserte una cantidad valida")
    }
    else {
        saldoActual=saldoInicial+cantidad;
        saldoInicial=saldoActual
        alert(`Se han depositado ${cantidad}€`)
        document.getElementById("saldo").textContent=saldoActual+"€";
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
        document.getElementById("saldo").textContent=saldoActual+"€";
    }
}
botonDepositar.addEventListener("click", depositar)

botonRetirar.addEventListener("click", retirar)


botonTransferir.addEventListener("click", ()=>{

})

botonCambiar.addEventListener("click", ()=>{

})

botonSalir.addEventListener("click", ()=>{

})
