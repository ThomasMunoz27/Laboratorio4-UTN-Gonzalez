const readline = require('readline/promises');
const fs = require('fs').promises;
const yargs = require('yargs');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})


const argv = yargs
.command("archivo", "crea un archivo con el nombre ingresado",{
    archivo: {
        describe: "nombre del archivo",
        demandOption: false,
        type: "string",
        default: "productos.json",
    }
}).argv


//solicitando datos de producto
const obtenerDatos = async () => {
    const product = await rl.question(`Producto: `)
    const precio = await rl.question(`Precio: `)
    const cantidad = await rl.question(`Cantidad: `)

    const newProduct = {
        producto: product, 
        precio: parseFloat(precio), 
        cantidad: parseInt(cantidad)
    }

    await guardarProducto(newProduct, argv.archivo)
    rl.close()
}

const guardarProducto = async (newProduct, nameArchivo) => {

    let products = []
    try{
        const data = await fs.readFile(nameArchivo, 'utf-8');
            products = JSON.parse(data)
    }catch(err){
        console.log("Error al leer el archivo, creando uno nuevo")
    }    
    products.push(newProduct)

    await fs.writeFile(nameArchivo, JSON.stringify(products, null, 2), (err) => {
        if (err) {
            console.log("Error al guardar el archivo")
        }else{
            console.log(`Producto guardado correctamente en ${nameArchivo}`);
        }
})
showProductsInConsole(nameArchivo)
}

const showProductsInConsole = async (nameArchivo) => {
    const data = await fs.readFile(nameArchivo, 'utf-8')
    const products = JSON.parse(data)
    console.log(products)
}


obtenerDatos()



