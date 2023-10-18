//

const addCart = function (id=1){
    let carrito =localStorage.getItem('carrito')
    if(!carrito) {
        localStorage.setItem('carrito',JSON.stringify([]))
        carrito = JSON.parse(localStorage.getItem('carrito'))
    }
    const hayItems = carrito.lenght > 0
    const existe = Boolean(carrito.find(({producto}) => producto == id ))

    if(!hayItems){
        carrito.push({producto:id,cantidad:1})
        localStorage.setItem('carrito',JSON.stringify(carrito))
        return location.assign("/cart.html")
    }

    if(hayItems && !existe){
        carrito.push({producto:id,cantidad:1})
        localStorage.setItem('carrito',JSON.stringify(carrito))
        return location.assign("/cart.html")
    }

    carrito = carrito.map(({producto,cantidad}) => producto == id ? ({producto,cantidad:cantidad+=1}) : ({producto,cantidad}))
    localStorage.setItem('carrito',JSON.stringify(carrito))
    return location.assign("/cart.html")
}

addCart(1)

const showCart = function(catalogo=[]){
    let carrito = localStorage.getItem('carrito')
    if(!carrito) {
        localStorage.setItem('carrito',JSON.stringify([]))
        carrito = JSON.parse(localStorage.getItem('carrito'))
    }
    const hayItems = carrito.lenght > 0
    if(!hayItems) {
        return alert("No hay productos en el carrito")
    }
    
    let subtotal = 0 
    carrito.forEach(item => {
        const producto = catalogo.find(p => p.id == item.producto)
        subtotal += producto.precio * item.cantidad
        return generateItem({...producto,cantidad:item.cantidad})
    })



    //const items = carrito.map(({producto,cantidad}) => ({producto:catalogo.find(p => p.id == producto),cantidad}))
    //items.forEach(item =>  generateItem(item));
}


// [{producto:1,cantidad:1},{producto:2,cantidad:1}]
// [{producto:{id:1,precio:1000...},cantidad:1}]

// [1000,400]