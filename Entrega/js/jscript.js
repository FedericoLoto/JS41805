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

const alimentos = [hamburguesa, hamburguesaDoble, papasFritas, pizza,pizzaEsp ,hamburpizza, empanada, empanadaDocena, sangucheLomito, sangucheMilanesa, gaseosaCh, gaseosaGr];

//Carrito de compras

let carrito = [];

//Cargar carrito desde el LocalStorage
if(localStorage.getItem('carrito')){
    carrito = JSON.parse(localStorage.getItem("carrito"));
}

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
    const Alimento = alimentos.find((Alimento) => Alimento.id === id);
    const productoEnCarrito= carrito.find((Alimento) => Alimento.id === id);
    (productoEnCarrito?productoEnCarrito.cantidad++:carrito.push(Alimento))

        //Agregar al LocalS
        localStorage.setItem('carrito',JSON.stringify(carrito));
    obtenerTotal();
    
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
    obtenerTotal();
};
// eliminar por producto
const eliminarDelCarrito= (id)=>{   
    const Alimento = carrito.find((Alimento)=> Alimento.id === id);
    const indice = carrito.indexOf (Alimento);
    carrito.splice(indice, 1);
    mostrarCarrito();
    localStorage.setItem('carrito', JSON.stringify(carrito));

}

//vaciar carrito completo
const vaciarCarrito= document.getElementById('vaciarCarrito');
vaciarCarrito.addEventListener("click", ()=> {
    eliminarTodoCarrito();
})


const eliminarTodoCarrito = () =>{
    carrito= [];
    mostrarCarrito();
    localStorage.clear();
}

//Mostrar el total
const total = document.getElementById('total');
const obtenerTotal = () => {
    let totalCompra = 0;    
    carrito.forEach((Alimento)=>{
        totalCompra += Alimento.precio * Alimento.cantidad;
    });
    total.innerHTML= `$${totalCompra}`;
};
//boton de finalizar la compra
const finalizarCompra= document.getElementById('finalizarCompra');
finalizarCompra.addEventListener("click", ()=>{
    totalFinal();
})
function totalFinal(){
    let fin= swal("Estas seguro de realizar la compra? Presiona OK para confirmar", {
        buttons:["Cancelar", true],
      });    
        setTimeout( ()=>{
            swal("Compra Finalizada","Muchas Gracias por su compra", "success")
            eliminarTodoCarrito();
            },3000); 
        eliminarTodoCarrito();
}

// Lista de productos de alimentos por .json
const tabla = document.getElementById('listaProductos')
function cargarJson (){
   fetch('/json/alimentos.json').then(respuesta => respuesta.json())
   .then(user =>{
    user.forEach(user=>{
        const fila = document.createElement('div');
        fila.innerHTML += `
        <td>${user.id}</td>
        <td>${user.nombre}</td>
        <td>${user.valor}</td>
        <td>${user.tipo}</td>
        `
        tabla.appendChild(fila);
    })
   })
}
cargarJson();
//fin del carrito