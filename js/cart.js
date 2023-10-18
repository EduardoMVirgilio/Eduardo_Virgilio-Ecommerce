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

const addQuantity = (id) => {
    productos().then(function (datos){
        let carrito = JSON.parse(leer('carrito'))
        carrito = carrito.map(({producto,cantidad}) => producto == id ? ({producto,cantidad:cantidad+=1}): ({producto,cantidad}))
        guardar('carrito',carrito)
        mostrarCarrito(datos,leer('carrito'))
    }).catch(error => console.error(error))
}

const removeQuantity = (id) => {
    productos().then(function (datos){
        let carrito = JSON.parse(leer('carrito'))
        carrito = carrito.map(({producto,cantidad}) => producto == id && cantidad > 0 ? ({producto,cantidad:cantidad-=1}): ({producto,cantidad}))
        carrito = carrito.filter(({cantidad}) => cantidad > 0)
        guardar('carrito',carrito)
        mostrarCarrito(datos,leer('carrito'))
    }).catch(error => console.error(error))
}

const templateItem = function ({nombre,precio,imagen,cantidad,id},container) {
    const item = generar('li',{className:"item"})
    const figure = generar("figure",{})
    const image = generar("img",{src:imagen,alt:`Imagen del Producto ${nombre}`})
    figure.appendChild(image)
    const data = generar("section",{})
    const name = generar("p",{textContent:nombre})
    const price = generar("p",{innerHTML:`<span>AR$ ${precio}</span>`})
    const actions = generar("form",{onsubmit:e => e.preventDefault()})
    const btnPlus = generar("button",{type:"button",onclick: () => addQuantity(id),innerHTML:`<i class="fa-solid fa-plus"></i>`})
    const btnMinus = generar("button",{type:"button",onclick: () => removeQuantity(id),innerHTML:`<i class="fa-solid fa-minus"></i>`})
    const quantity = generar("p",{innerHTML:`Cantidad: ${cantidad}`})
    actions.append(btnPlus,quantity,btnMinus)
    data.append(name,price,actions)
    const remove = generar("form",{onsubmit:e => e.preventDefault()})
    const btnDelete = generar("button",{type:"button",onclick: () => console.log("Eliminar producto"),innerHTML:`<i class="fa-solid fa-times"></i>`})
    remove.append(btnDelete)
    item.append(figure,data,remove)
    container.appendChild(item)
}

const mostrarCarrito = (productos,carrito) => {
    if(!carrito){
        return document.querySelector("#cantidad").innerHTML="0"
    }
    let items = JSON.parse(carrito)
    items = items.map(item => ({producto:productos.find((_,index) => item.producto == index),cantidad:item.cantidad,id:productos.findIndex((_,index) => item.producto == index)}))
    document.querySelector("#cantidad").innerHTML=items.length
    const list = document.querySelector("#items")
    list.innerHTML = null
    document.querySelector("#deleteAll").onclick = () => {
        localStorage.removeItem('carrito')
        location.reload()
    }
    const autosuma = items.map(({producto,cantidad}) => producto.precio * cantidad).reduce((a,c) => c+=a ,0)
    document.querySelector("#total").innerHTML = `AR$ ${autosuma}`
    items.forEach(({producto,cantidad,id}) => templateItem({...producto,cantidad,id},list));
}

productos().then(function (datos){
    mostrarCarrito(datos,leer('carrito'))
}).catch(error => console.error(error))