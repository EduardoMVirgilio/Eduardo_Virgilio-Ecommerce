import {generar,productos,leer} from './functions.js'

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

productos().then(productos => {
    const url = new URLSearchParams(location.search)
    let id = url.get('producto')
    if(!id) return Swal.fire({
        title: 'Error!',
        text: 'No se encontro el producto',
        icon: 'error',
      }).then(() => location.assign("/index.html"))
    id = parseInt(id)
    id -= 1
    const producto = productos.find((_,i) => i == id)
    if(!producto) return Swal.fire({
        title: 'Error!',
        text: 'No se encontro el producto',
        icon: 'error',
      }).then(() => location.assign("/index.html"))

      templateProducto({...producto,id},document.querySelector(".producto"))
})

const templateProducto = function ({nombre,precio,imagen,descripcion,id},container) {
    const figure = generar("figure",{})
    const image = generar("img",{src:imagen,alt:`Imagen del Producto ${nombre}`})
    figure.appendChild(image)
    const data = generar("article",{})
    const name = generar("p",{textContent:nombre})
    const desc = generar("p",{textContent:descripcion})
    const price = generar("p",{innerHTML:`<span>AR$ ${precio}</span> ${parseInt(id) < 4 ? `<span class="destacado"><i class="fa-solid fa-star"></i></span>`: ""}`})
    data.append(name,price,desc)   
    const actions = generar("form",{onsubmit:e => e.preventDefault()})
    const btnCart = generar("button",{type:"button",onclick: () => console.log("comprar el producto"),innerHTML:`Agregar al carrito`})
    actions.append(btnCart)
    container.append(figure,data,actions)
}