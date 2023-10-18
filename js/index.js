import {generar,productos,leer,guardar} from './functions.js'

const linkCarrito = document.querySelector('a[href*="#carrito"')
linkCarrito.onclick = (e) => {
    e.preventDefault();
    location.assign("/cart.html");
}

const linkHome = document.querySelector('a[href="#"')
linkHome.onclick = (e) => {
    e.preventDefault();
    location.assign("/index.html");
}

const addCart = function (id) {
    const data = leer('carrito')
    if(!data) guardar('carrito',[])
    let carrito = JSON.parse(leer('carrito'))
    const hayItems = carrito.length > 0
   
    if(!hayItems){
        carrito.push({producto:id-=1,cantidad:1})
        guardar('carrito',carrito)
        return Swal.fire({
        title: 'Felicidades!',
        text: 'Se agrego el producto al carrito',
        icon: 'success',
        showDenyButton: true,
        confirmButtonText: 'Finalizar la compra',
        denyButtonText: `Seguir comprando`,
        denyButtonColor: "rgb(20,180,180)",
        confirmButtonColor: "rgb(120,20,180)"
        }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
             return location.assign("/cart.html")
            }
          })
    }
    debugger
    const existe = carrito.map(({producto}) => producto ).includes(id-=1)
    if(!existe){
        carrito.push({producto:id,cantidad:1})
        guardar('carrito',carrito)
        return Swal.fire({
            title: 'Felicidades!',
            text: 'Se agrego el producto al carrito',
            icon: 'success',
            showDenyButton: true,
            confirmButtonText: 'Finalizar la compra',
            denyButtonText: `Seguir comprando`,
            denyButtonColor: "rgb(20,180,180)",
            confirmButtonColor: "rgb(120,20,180)"
            }).then((result) => {
                /* Read more about isConfirmed, isDenied below */
                if (result.isConfirmed) {
                 return location.assign("/cart.html")
                }
              })
    }

    carrito = carrito.map(({producto,cantidad}) => producto == id ? ({producto,cantidad:cantidad+=1}): ({producto,cantidad}))
    guardar('carrito',carrito)
    return Swal.fire({
        title: 'Felicidades!',
        text: 'Se agrego el producto al carrito',
        icon: 'success',
        showDenyButton: true,
        confirmButtonText: 'Finalizar la compra',
        denyButtonText: `Seguir comprando`,
        denyButtonColor: "rgb(20,180,180)",
        confirmButtonColor: "rgb(120,20,180)"
        }).then((result) => {
            if (result.isConfirmed) {
             return location.assign("/cart.html")
            }
          })
} 

const templateProducto = function ({nombre,precio,imagen,id},container) {
    const producto = generar('li',{className:"producto"})
    producto.setAttribute("data-id",id)
    const figure = generar("figure",{})
    const image = generar("img",{src:imagen,alt:`Imagen del Producto ${nombre}`})
    figure.appendChild(image)
    const name = generar("p",{textContent:nombre})
    const price = generar("p",{innerHTML:`<span>AR$ ${precio}</span> ${parseInt(id) < 4 ? `<span class="destacado"><i class="fa-solid fa-star"></i></span>`: ""}`})
    const actions = generar("form",{onsubmit:e => e.preventDefault()})
    const btnDetail = generar("button",{type:"button",onclick: () => window.location.assign(`/detail.html?producto=${id}`),innerHTML:`<i class="fa-solid fa-eye"></i>`})
    const btnCart = generar("button",{type:"button",onclick: () => addCart(id),innerHTML:`<i class="fa-solid fa-plus"></i>`})
    actions.append(btnCart,btnDetail)
    producto.append(figure,name,price,actions)
    container.appendChild(producto)
}


const mostrarProducto = productos => productos.forEach((producto,index) => templateProducto({...producto,id:index+=1},document.querySelector("#productos")));



productos().then(datos => mostrarProducto(datos)).catch(error => console.error(error))

