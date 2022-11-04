// almacen online
/*
1) Mostrar productos en el html de foma dinamica
2) Agregar productos al carrito
3) Evitar la carga de productos  repetidos de carritos 
4) Mostrar el carrito en el HTML de forma dínamica
5) Eliminar productos del carrito
6) Calcular el total de la compra
7) Vaciar el carrito
8) Guardar el carrito en el LocalStorage*/

/////////////////////////////////////////

//Menú de la roticería
class Alimento {
    constructor(id, nombre, precio, img){
        this.id = id;
        this.nombre = nombre;
        this.precio = precio;
        this.img = img;
        this.cantidad = 1;
    }
};
const hamburguesa= new Alimento(1,"hamburguesa simple", 500, "img/hamburguesa.jpg");
const hamburguesaDoble=new Alimento(2,"hamburguesa doble", 700, "img/hamburguesadoble.jpg");
const papasFritas=new Alimento(3,"papas fritas",300,"img/papasfritas.jpg");
const pizza=new Alimento(4,"pizza muzzarella",750,"img/pizza.jpg");
const pizzaEsp=new Alimento(5,"pizza especial", 900,"img/pizzaesp.jpg");
const hamburpizza=new Alimento(6,"hamburpizza", 1100,"img/hamburpizza.jpg");
const empanada=new Alimento(7,"empanada unidad",200,"img/empanada.png");
const empanadaDocena=new Alimento(8,"empanada docena",1700,"img/empanadadocena.jpg");
const sangucheLomito=new Alimento(9,"sanguche lomito",650,"img/sanguchelomito.jpg");
const sangucheMilanesa=new Alimento(10,"sanguche milanesa",600,"img/sanguchemilanesa.jpg");
const gaseosaCh=new Alimento(11,"gaseosa 600ml", 200,"img/gaseosa600.jpg");
const gaseosaGr=new Alimento(12,"gaseosa 1,5Lts",300,"img/gaseosalitroymedio.jpg");

const alimentos = [hamburguesa, hamburguesaDoble, papasFritas, pizza, pizzaEsp,hamburpizza, empanada, empanadaDocena, sangucheLomito, sangucheMilanesa, gaseosaCh, gaseosaGr];

//Carrito de compras

let carrito = [];

//Mostrar el menú

const listaMenu= document.getElementById("listaMenu");

//funcion que muestra los alimentos del menú


const mostrarMenu= ()=> {
    alimentos.forEach((Alimento) =>{
        const tarjeta = document.createElement("div");
        tarjeta.classList.add("tarjetaMn");
        tarjeta.innerHTML= `
        <div class="caja">
            <img src="${Alimento.img}" class="imagen" alt="${Alimento.nombre}">
            <div class="textos">
                <h5 class="nombre"> ${Alimento.nombre}</h5>
                <p class="valor">$${Alimento.precio}</p>
                <button class="boton" id="boton${Alimento.id}">Agregar</button>
                </div>
            </div>`                
        listaMenu.appendChild(tarjeta);

        //Agregar productos al carrito:
        const botonM = document.getElementById(`boton${Alimento.id}`);
        botonM.addEventListener("click", ()=>{
            agregarAlCarrito(Alimento.id)
        })
    
    })
}

//Funcion para agregar al Carrito
const agregarAlCarrito = (id)=>{
    const producto = alimentos.find((Alimento) => Alimento.id === id);
    const productoEnCarrito= carrito.find((Alimento) => Alimento.id === id);
    if (productoEnCarrito){
        productoEnCarrito.cantidad++;
    }else{
        carrito.push(Alimento);
    }
}

mostrarMenu();

//mostrar carrito de compras
const contenedorCarrito= document.getElementById("contenedorCarrito");
const verCarrito = document.getElementById("verCarrito");
verCarrito.addEventListener("click", ()=> {
    mostrarCarrito ();
})

//Funcion para mostrar el carrito

const mostrarCarrito= ()=>{
    contenedorCarrito.innerHTML="";
    carrito.forEach((Alimento)=>{
        const tarjeta = document.createElement("div");
        tarjeta.classList.add("tarjetaMn");
        tarjeta.innerHTML= `
        <div class="caja">
            <img src="${Alimento.img}" class="imagen" alt="${Alimento.nombre}">
            <div class="textos">
                <h5 class="nombre"> ${Alimento.nombre}</h5>
                <p class="valor">${Alimento.precio}</p>
                <p class="valor">${Alimento.cantidad}</p>
                <button class="boton" id="eliminar${Alimento.id}">Eliminar</button>
                </div>
            </div>`                
        contenedorCarrito.appendChild(tarjeta);
        //Eliminar Producto del carrito
        const btn= document.getElementById(`eliminar${Alimento.id}`);
        btn.addEventListener("click", ()=>{
            eliminarDelCarrito(Alimento.id);
        })
            
    })
};















// function Menu(id,nombre,valor,tipo){
// this.id= id;
// this.nombre= nombre;
// this.valor=valor;
// this.tipo=tipo;
// }
// const nuevoAlimento= new Menu(13,"postre de chocolate",500,"postre");
// const nuevoAlimento2= new Menu(14,"gelatina",350,"postre");
// const nuevoAlimento3= new Menu(15,"patitas de pollo",600,"comida");
// cargarAlimento(alimentos,nuevoAlimento);
// cargarAlimento(alimentos,nuevoAlimento2);
// cargarAlimento(alimentos,nuevoAlimento3);
// function cargarAlimento(arr,val){
//     arr.push(val);
// }
// function filtrarAlimento(arr,fil){
// const filtrar= arr.filter((elemento)=>{
//     return elemento.nombre.includes(fil);
// })
//   return filtrar;
// }
// function filtrarValorMayor(arr,fil){
// const filtrado= arr.filter((alimento)=>{
//   return alimento.valor >= fil;
// })
// return filtrado;
// } 
// function filtrarValorMenor(arr,fil){
//     const filtrar=arr.filter((alimento)=>{
//       return alimento.valor <= fil;
//     })
//     return filtrar
// }
// console.log(filtrarAlimento(alimentos,prompt("Busca tu alimento")));
// let porPrecio= prompt("Busca tu precio");
// console.log(filtrarValorMayor(alimentos, porPrecio));
// console.log();
// // if ((filtrarAlimento != " ") && (filtrarValorMayor != " ")) {
// //     console.log("En la consola estan tus filtros de alimentos");
// // } else {
// //     console.log("error");
// // }