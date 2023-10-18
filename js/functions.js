const archivo = async (file) =>{
    try {
        const consulta = await fetch(file)
        if(!consulta.ok) throw new Error("No se encontraron datos")
        return await consulta.json()
    } catch (error) {
        console.error(error)
    }
}

const leer = (clave) => localStorage.getItem(clave) || null

const guardar = (clave,data) => Array.isArray(data) ? localStorage.setItem(clave,JSON.stringify(data)) : localStorage.setItem(clave,data) 

const productos = async () => {
    try {
        const lista = await archivo("/data/productos.json")
        return lista
    } catch (error) {
        console.error(error)
    }
} 

const generar = (tag,props) => {
    const element = document.createElement(tag)
    Object.keys(props).forEach(prop => element[prop] = props[prop])
    return element
}

export {generar,productos,guardar,leer,archivo}