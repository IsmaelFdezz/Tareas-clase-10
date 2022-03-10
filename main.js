let $intentos = document.querySelector("#intentos")
let primerCarta = null
let contadorCartas = 12
let cronometro
const $cartas = document.querySelectorAll(".carta")
const $datos = document.querySelectorAll("#datos")


function organizarJuego() {
    const colores = ["rojo", "azul", "verde", "amarillo", "naranja", "violeta", "rojo", "azul", "verde", "amarillo", "naranja", "violeta"]
    darColorCarta($cartas, colores)
    manejarEvento()
    carga()
}

function darColorCarta($cartas, colores) {
    const colorRandom = colores.sort(function() {
        return 0.5 - Math.random();
    })

    colorRandom.forEach(function(color, i) {
        $cartas[i].classList.add(color);
    })
}

function manejarEvento() {
    $cartas.forEach(function(carta) {
        carta.onclick = function() {
            manejarClick(carta)
        }
    })
}

function manejarClick(cartaActual) {
    mostrarCarta(cartaActual)

    if (primerCarta === null) {
        primerCarta = cartaActual
    } else {
        if (primerCarta === cartaActual) {
        return;
    }
    $intentos.textContent++
    
    if (cartasIguales(primerCarta, cartaActual)) {
        borrarCarta(primerCarta)
        borrarCarta(cartaActual)
    } else {
        ocultarCarta(primerCarta)
        ocultarCarta(cartaActual)
    }
    primerCarta = null;
    
    }
}

function cartasIguales(carta1, carta2) {
    if (carta1.className === carta2.className) {
        return true;
    }
}

function mostrarCarta(carta) {
    carta.style.opacity = "1"
}

function borrarCarta(carta) {
    setTimeout(function() {
        carta.parentElement.style.backgroundColor = "grey"
        carta.remove()
        contadorCartas--;
        verificarSiGano();
    },500)
}

function ocultarCarta(carta) {
    setTimeout(function() {
        carta.style.opacity = "0"
    }, 500)
}

function verificarSiGano() {
    if(contadorCartas === 0) {
        terminarJuego()
    }  
}

function terminarJuego() {
    console.log("holaaa")
    document.querySelector("#ganaste").style.display = "block"
    detenerCronometro()
}

function detenerCronometro() {
    clearInterval(cronometro)
}

function carga() {
    contadorSegundos = 0;
    contadorMinutos = 0;
    segundos = document.querySelector("#segundos")
    minutos = document.querySelector("#minutos")

    cronometro = window.setInterval(
        function(){
            if(contadorSegundos === 60) {
                contadorSegundos = 0;
                contadorMinutos++;
                minutos.innerHTML = contadorMinutos;
                
                if (contadorMinutos === 60) {
                    contadorMinutos = 0;
                }
            }

            segundos.innerHTML = contadorSegundos;
            contadorSegundos++;

        }, 1000)
}

organizarJuego()