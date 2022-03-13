//------Variables---------
let baraja = [];
let carta = '';
let puntosJugador = 0;
const numeros = [2,3,4,5,6,7,8,9,10];
const letras = ['J','Q','K','A'];
const palo = ['C','D','H','S'];


//-------Funciones------------- 
function CrearBaraja(){
baraja =[];
for(n of numeros){
    for (p of palo){
        baraja.push(n + p);
    }
}

letras.forEach((l) => {
    palo.forEach((p) => {
        baraja.push(l + p)
    }); 
});

baraja = _.shuffle(baraja);
return baraja;
}

function nuevoJuego() {
    $('#cartasJugador').html('');
    puntosJugador = 0;
    $('#puntosJugador').text(puntosJugador);

    $('#btn-card').removeClass('disabled');
    $('#btn-stop').removeClass('disabled');
    console.clear();
    CrearBaraja();
}

function pedirCarta(){
    carta = baraja.shift();
    const cartaHtml = $('#cartasJugador').html() + `<img src="/cartas/${carta}.png" alt="">`;
    $('#cartasJugador').html(cartaHtml);
    return carta;
}

function sumarPuntos(carta) {
    let puntos = 0;
    console.log(carta);

    let valorCarta = carta.slice(0, -1);
    if (letras.includes(valorCarta)){
        puntos = valorCarta == 'A' ? 11 : 10;
    }else{
        puntos = valorCarta * 1;
    }
    puntosJugador +=puntos;
    $('#puntosJugador').text(puntosJugador);
}

function turnoComputadora() {
    $('#btn-card').addClass('disabled');
    $('#btn-stop').addClass('disabled');
    console.log('Turno de la computadora')

}

//------Botones-----------------
$('#btn-new').click(function(){
    nuevoJuego();
})

$('#btn-card').click(function(){
    
    let carta = pedirCarta();
    sumarPuntos(carta);

    if (puntosJugador > 21) {
        console.log('El jugador perdio');
        turnoComputadora()  
    }
    
})

$('#btn-stop').click(function(){
    turnoComputadora();
})

////Inicia el juego///////////////////////
CrearBaraja();



