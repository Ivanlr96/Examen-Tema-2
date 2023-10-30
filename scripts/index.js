/* Autor: Iván Lorenzo Ruiz 
    Link github:
    */

// Se crean las variables de los botones, capturándolos a partir del id de cada uno //
const botonDepositar=document.getElementById("btnD");
const botonRetirar=document.getElementById("btnR");
const botonTransferir=document.getElementById("btnT");
const botonCambiar=document.getElementById("btnC");
const botonSalir=document.getElementById("btnS");
// Se declaran las variables que vamos a utilizar más tarde. Incluimos saldoActual, además del saldoInicial, con esto no necesitaremos un método que actualice el saldo //
let saldoInicial=1000, saldoActual, intentos=3, PIN_CORRECTO="1234";


// Se crea la función  para mostrar el saldo, que se añadirá a las otras funciones //
const mostrarSaldo=()=> {
    document.getElementById("saldo").textContent=saldoInicial+"€";
}

// Función para iniciar sesión //
const iniciarSesion=()=> {
    const pin=prompt("Inserte el pin")
    // Se pedirá el pin desde el prompt, en caso de que el pin no sea correcto, entrará en el bucle con 3 intentos que se irán reduciendo si sigue siendo incorrecto //
    while (pin!=PIN_CORRECTO && intentos>1) {
        intentos--
        alert(`Pin incorrecto, quedan ${intentos} intentos.`)
        const pin=prompt("Inserte el pin")
    }
    // Si al salir del bucle el pin es correcto (o no llega a entrar en el bucle porque es correcto desde el principio), se mostrará el saldo //
    if (pin===PIN_CORRECTO) {
        alert("Inicio de sesión exitoso, bienvenido")
        mostrarSaldo()
    }
    // Si se agotan los intentos en el bucle cuando el pin es incorrecto, aparecerá el mensaje y se redirigirá a la página del cajero bloqueado//
    else {
     alert("Se ha quedado sin intentos, el cajero ha sido bloqueado")
        window.location.replace("templates/bloqueado.html")
    }
}

// FUnción para depositar //
const depositar= ()=> {
    // declaramos la variable cantidad de forma local. En el resto de las funciones también será cantidad, de esta forma se podrá reutilizar en el resto, cambiando solo los parámetros específicos// 
    const cantidad=parseFloat(prompt("Inserte la cantidad a depositar"))
    // Condiciones que mostrarán el mensaje de cantidad inválida, si la cantidad es correcta, entrará por el else y se realizará el depósito//
    if (isNaN(cantidad) || cantidad<=0) {
        alert ("Inserte una cantidad valida")
    }
    else {
        saldoActual=saldoInicial+cantidad;
        // Igualamos el saldo inicial a la variable saldoActual, de esta forma el saldo se actualizará una vez realizada la operación //
        saldoInicial=saldoActual
        alert(`Se han depositado ${cantidad}€`)
        // Llamamos a la función de mostrar saldo, como en este punto el saldoInicial (contenido mostrarSaldo) está igualado al saldoActual, mostrará el saldo Actualizado correctamente //
        mostrarSaldo()
    }
}

// Función para retirar saldo //
const retirar=()=>{
    const cantidad=parseFloat(prompt("Inserte la cantidad a retirar"))
    // Se le añade a las condiciones que si el la cantidad supera el saldoInicial (que cuando vuelva a ejecutarse la función estará actualizado al igualarse), sea una cantidad incorrecta //
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

// Función que aplica la expresión regular. Se le pasará un Iban como parámetro y verificará que esto sea correcto mediante la rexpresión regular//
const validarIban=(iban)=> {
 let expresionRegular=/^(ES\d{22}$)/;
  return expresionRegular.test(iban);
}
// Función para transferir, que funciona igual que la de retirar pero añadiendo varios parámetros //
const transferir=()=> {
    const cantidad=parseFloat(prompt("Inserte la cantidad a transferir"))
    // Misma condición que en el método de retirar //
    if (isNaN(cantidad) || cantidad<=0 || cantidad>saldoInicial) {
        alert ("Inserte una cantidad valida")
    }
    else {
            // En caso de que la cantidad sea correcta, solicitamos el número de la cuenta a la que hacer la transferencia //
            const cuenta=prompt("Inserte el número de la cuenta destino")
            // Utilizamos la función de validar, pasando como parámetro la cuenta que hemos pedido en la línea anterior, en caso de que no cumpla con la expresión regular de la función, dirá que la cuenta no es válida //
            if (!validarIban(cuenta)) {
                alert("La cuenta no es válida")
                return;
            }
            // En caso de que la función sea válida, se ejecutará la operación y se reflejará además a qué cuenta se ha hecho la transferencia //
            else {
                saldoActual=saldoInicial-cantidad;
                saldoInicial=saldoActual
                alert(`Se han transferido ${cantidad}€ a la cuenta ${cuenta}`)
                mostrarSaldo()
            }
    }
}
// Función para cambiar la contraseña //
const cambiarContrasena=()=> {
    const pin=prompt("Inserte su pin actual")
    // Si el pin no es correcto, saldrá un mensaje notificándolo //
    if (pin!=PIN_CORRECTO) {
        alert("El pin no es correcto, no se ha realizado ningún cambio")
    
    }
        // En caso de que el pin sea correcto, se podrá introducir una nueva contraseña. Igualando el PIN_CORRECTO, actualizará el pin original a la nueva contraseña //
    else {
         PIN_CORRECTO=prompt("Inserte la nueva contraseña")
        alert("Se ha cambiado la contraseña")
    }
}

// Añadimos las funciones anteriores a los botones correspondientes //
botonDepositar.addEventListener("click", depositar)

botonRetirar.addEventListener("click", retirar)


botonTransferir.addEventListener("click", transferir)

botonCambiar.addEventListener("click", cambiarContrasena)
// Botón de salir que redigirá a la página de salida //
botonSalir.addEventListener("click", ()=>{
    alert("Gracias por utilizar el cajero, hasta la próxima")
    window.location.replace("templates/salir.html")

})
// Con esta línea se hace que nada más se cargue la página, se ejecute la función iniciarSesion, la cuál no mostrará el saldo hasta que el inicio sea correcto //
window.addEventListener("load",iniciarSesion)
