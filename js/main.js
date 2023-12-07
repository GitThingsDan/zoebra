// Función N°1: entrada de datos ("pedir, con o sin el uso de parámetros, datos de los productos como nombre, precio, cantidad, etc.")
function pedirCadenaDeTextoNoVacia(instruction, defaultValue) {
	let str
	do {
		str = prompt(instruction, defaultValue)
	} while (str === "")
	return str
}
function pedirNumero(instruction, parseFx = parseInt) {
	let num
	do {
		let input = prompt(instruction)
		if (input === null) {
			return
		} else {
			num = parseFx(input)
		}
	} while (Number.isNaN(num))
	// Cuando finalmente num sea válido, return num:
	return num
}
function pedirDatosPersonales() {
	function pedirIdentidadDeGeneroFMX() {
		let genderIdentity
		do {
			genderIdentity = pedirCadenaDeTextoNoVacia("Ingresa la letra correspondiente a tu identidad de género, a partir de las siguientes opciones:\n\n"
				+ "'f' - identidad femenina\n"
				+ "'m' - identidad masculina\n"
				+ "'x' - otra identidad de género")
			if (genderIdentity === null) {
				return
			} else {
				genderIdentity = genderIdentity.toLowerCase()
			}
		} while (!["f", "m", "x"].includes(genderIdentity))
		return genderIdentity
	}

	let firstName = pedirCadenaDeTextoNoVacia("Ingresa tu nombre:", "Daniel")
	if (firstName) {
		let lastName = pedirCadenaDeTextoNoVacia("Ingresa tu apellido:", "Villarroel")
		if (lastName) {
			let genderIdentity = pedirIdentidadDeGeneroFMX()
			if (genderIdentity) {
				let user = { firstName, lastName, genderIdentity }
				return user
			}
		}
	}
}

const productosDisponibles = [
	// Jamaica
	{
		idNo: 1,
		nombre: "Agua de jamaica",
		precio: 40,
		stock: 12,
	},
	// Limón
	{
		idNo: 2,
		nombre: "Agua de limón",
		precio: 50,
		stock: 10,
	},
	// Tamarindo
	{
		idNo: 3,
		nombre: "Agua de tamarindo",
		precio: 60,
		stock: 8,
	}
]
/* for (const product of productosDisponibles) {
	console.log(product)
	alert(`N° de ID: ${product.id}, nombre: ${product.nombre}, precio: ${product.precio}, stock disponible: ${product.stock}`)
} */

function pedirProducto() {
	let id = pedirNumero("Ingresa el N° de ID de tu producto:")
	// Primero, convertir en array a los valores de la propiedad "idNo" del array de objetos "productosDisponibles". Luego, comprobar si este nuevo array incluye al valor "id" ingresado por el usuario:
	if (productosDisponibles.map(x => x.idNo).includes(id)) {
		/* 		let price = pedirNumero("Ingresa el precio de tu producto:")
		if (price) { 
		}
		*/
		let quantity = pedirNumero("Ingresa la cantidad de producto que agregarás a tu carrito de compras:")
		if (quantity <= stock) {
			let product = { id, quantity }
			return product
		}
	}
}

/* Función N°2: procesamiento de la información ("Con los datos de la cantidad y el precio de un producto, podemos calcular el subtotal del mismo.") */
function generarBienvenida(user) {
	if (user) {
		let welcome
		switch (user.genderIdentity) {
			case "f":
				welcome = `¡Bienvenida a ZOEBRA, ${user.firstName} ${user.lastName}!`
				break

			case "m":
				welcome = `¡Bienvenido a ZOEBRA, ${user.firstName} ${user.lastName}!`
				break

			case "x":
				welcome = `¡Bienvenidx a ZOEBRA, ${user.firstName} ${user.lastName}!`
				break

			default:
				break
		}
		return welcome
	}
}
function calcularYAcumularSubtotal(product) {
	if (product) {
		let subtotal = product.price * product.quantity
		total += subtotal
		return subtotal
	}
}
function agregarProducto(product, subtotal) {
	if (product) {
		contadorProductos++
		let productNumber = contadorProductos
		let addedProduct = { productNumber, ...product, subtotal }
		return addedProduct
	}
}
function generarMensajeDeProductoAgregado(addedProduct) {
	if (addedProduct) {
		let addedProductMessage = `\nPRODUCTO N°${contadorProductos}: ${addedProduct.name}, precio: $${addedProduct.price}, cantidad: ${addedProduct.quantity}`
			+ `\n(subtotal: $${addedProduct.subtotal})`
		return addedProductMessage
	}
}

/* Función N°3: salida de los resultados finales ("una bienvenida donde se visualicen los datos [solicitados al usuario en la Función N°1]") */
const darLaBienvenida = welcome => { if (welcome) { alert(welcome) } }
const mostrarMensajeDeProductoAgregado = function (addedProductMessage, optAddedProduct) {
	if (addedProductMessage) {
		carrito += addedProductMessage
		if (optAddedProduct) {
			if (contadorProductos === 1) {
				console.log("CARRITO:")
			}
			console.log(optAddedProduct)
		}
		alert(`${carrito}\n\nTOTAL A PAGAR: $${total}`)
		let productoFueAgregadoExitosamente = true
		return productoFueAgregadoExitosamente
	}
}

pedirProducto()
/* ----------INVOCACIONES---------- 

// Declaración de variables globales:
let contadorProductos, total, carrito
// Pedir datos al usuario:
let usuario = pedirDatosPersonales()

// Si se generó el objeto "usuario" (valor "truthy"):
if (usuario) {
	// Generar mensaje de bienvenida, y emitirlo (como "alert"):
	let bienvenida = generarBienvenida(usuario)
	darLaBienvenida(bienvenida)

	// Ahora sí, ya podemos asignar valor 0 a las variables globales que son numéricas ("contadorProductos" y "total"):
	contadorProductos = total = 0
	// También, asignarle el "encabezado" a la variable global "carrito", a la cual se concatenarán los productos "agregados al carrito de compras":
	carrito = `CARRITO:\n`

	// Preguntarle al usuario si quiere agregar el primer producto (mediante "confirm"):
	let confirmacion = confirm("¿Deseas agregar algún producto a tu carrito de compras?")

	// Si aceptó (valor "true"), ingresar al (y mantenerse en el) siguiente ciclo "while":
	while (confirmacion) {
		// Pedirle los datos (nombre, precio y cantidad) del producto que desea agregar, y asignar el objeto resultante a la variable "producto" (todavía sin ser agregado; esto es sólo una recopilación de información):
		let producto = pedirProducto()

		// Ahora sí, comienza el "procesamiento" de la (recién ingresada por el usuario) información del producto a agregar, lo cual comprende los siguientes 3 pasos: 
		// - calcular el subtotal (acumulándolo en el "total" a pagar):
		let subtotal = calcularYAcumularSubtotal(producto)
		// - en base al subtotal y al objeto "producto", unirlos en 1 solo objeto y sumar 1 al contadorProductos:
		let productoAgregado = agregarProducto(producto, subtotal)
		// - y generar el mensaje con la info completa del producto agregado (número, nombre, precio, cantidad a comprar, subtotal), sin emitirlo aún (eso lo hará la siguiente función):
		let mensajeDeProductoAgregado = generarMensajeDeProductoAgregado(productoAgregado)

		// Muestra el mensaje del producto agregado con su info de compra, y return true (para "productoFueAgregadoExitosamente"): 
		let productoFueAgregadoExitosamente = mostrarMensajeDeProductoAgregado(mensajeDeProductoAgregado, productoAgregado)

		// Se explica por sí solo...si "productoFueAgregadoExitosamente", preguntar si desea agregar otro producto más:
		if (productoFueAgregadoExitosamente) {
			confirmacion = confirm("¿Deseas agregar otro producto a tu carrito de compras?")
			// Si no agregará más productos al carrito de compras (es decir, contadorProductos >= 1  - naturalmente - && !confirmación), emitir mensaje de total a pagar y despedida:
			if (!confirmacion) {
				console.log(`TOTAL A PAGAR ($):`, total, `\n\nMuchas gracias por tu preferencia; ¡vuelve pronto!`)
				alert(`${carrito}\n\nEl total a pagar es de: $${total}\n\n`
					+ `¡Gracias por preferirnos!`)
				break
			}

			// Si el producto no fue agregado exitosamente (es decir, no se alcanzó a emitir el mentado valor "true", lo que necesariamente implica que el usuario hizo clic en "Cancelar" en alguno de los prompts PORQUE NOS ODIA), entonces atender a su odio y salir "inceremoniosamente" del programa:
		} else {
			break
		}
	}
}

*/