/* 1° PARTE - "INTRODUCCIÓN": */
function pedirStringNoVacio(instruccion, valorPorDefecto) {
	// Una forma mejorada de promptear que se me ocurrió, para validar que la entrada del usuario no sea un string vacío ("", un valor que literalmente no me sirve de nada), y así no tener que repetir este "dowhile" cada vez que deba emitir un "prompt":
	let str
	do {
		str = prompt(instruccion, valorPorDefecto)
	} while (str === "")

	return str
}
const pedirDatosPersonales = function (instruccionNombre, instruccionIdDeGenero) {
	const NOMBRE = pedirStringNoVacio(instruccionNombre, "Daniel")

	if (NOMBRE) {
		function pedirIdentidadDeGenero(instruccion, opcionFemenina = "f", opcionMasculina = "m", opcionOtra = "x") {
			// Usaré el siguiente objeto para llamar cada clave como "IDS_DE_GENERO_OBJ.id*" y que se entienda mejor la instrucción del prompt a primera vista (en lugar de usar un array y mostrar el índice de cada elemento - sólo un número, lo que se vería poco claro -):
			const IDS_DE_GENERO_OBJ = {
				// Normalizar todos los parámetros (ahora valores), convirtiéndolos a minúsculas con ".toLowerCase()":
				idFemenina: opcionFemenina.toLowerCase(),
				idMasculina: opcionMasculina.toLowerCase(),
				idOtra: opcionOtra.toLowerCase(),
			}

			// A continuación, inicialmente yo planeba hacer esto:
			// const IDS_DE_GENERO_ARR = Object.values(IDS_DE_GENERO_OBJ)
			// Sin embargo, todavía no se nos enseña "Object.values()" para generar instantáneamente un array con los valores ya normalizados derivados del objeto anterior, por lo que tendré que generar de forma "manual" el siguiente array intermediario para que cumpla esa función:
			const IDS_DE_GENERO_ARR = [
				IDS_DE_GENERO_OBJ.idFemenina,
				IDS_DE_GENERO_OBJ.idMasculina,
				IDS_DE_GENERO_OBJ.idOtra
			]

			let idDeGenero
			do {
				idDeGenero = pedirStringNoVacio(instruccion + "\n\n'"
					+ IDS_DE_GENERO_OBJ.idFemenina + "' - identidad femenina\n'"
					+ IDS_DE_GENERO_OBJ.idMasculina + "' - identidad masculina\n'"
					+ IDS_DE_GENERO_OBJ.idOtra + "' - otra identidad de género")

				// Sólo aplicar "toLowerCase()" si el usuario ingresó un string (no vacío, por supuesto), para así no generar en consola errores feos (aunque no graves):
				if (idDeGenero) {
					idDeGenero = idDeGenero.toLowerCase()
				} else {
					return
				}
			} while (!IDS_DE_GENERO_ARR.includes(idDeGenero))

			return idDeGenero
		}

		const ID_DE_GENERO = pedirIdentidadDeGenero(instruccionIdDeGenero)
		if (ID_DE_GENERO) {
			class Usuario {
				constructor(name, genderIdentity) {
					this.nombre = name
					this.identidadDeGenero = genderIdentity
				}
			}
			const USUARIO = new Usuario(NOMBRE, ID_DE_GENERO)
			console.log(USUARIO)

			return USUARIO
		}
	}
}
const darLaBienvenida = usuario => {
	if (usuario) {
		let bienvenida
		switch (usuario.identidadDeGenero) {
			case "f":
				bienvenida = "¡Bienvenida a ZOEBRA, " + usuario.nombre + "!"
				break

			case "m":
				bienvenida = "¡Bienvenido a ZOEBRA, " + usuario.nombre + "!"
				break

			case "x":
				bienvenida = "¡Bienvenidx a ZOEBRA, " + usuario.nombre + "!"
				break

			default:
				return
		}
		console.log(bienvenida)
		alert(bienvenida)

		return bienvenida
	}
}

/* 2° PARTE - "DESARROLLO": */
function pedirNumeroValido(instruccion, funcionDeParse = parseInt) {
	let input, num
	do {
		input = pedirStringNoVacio(instruccion)

		if (input === null) {
			return null
		} else {
			num = funcionDeParse(input)
		}
	} while (Number.isNaN(num))

	return num
}
const mostrarProductosDisponibles = arrProductos => {
	let productosDisponibles = "PRODUCTOS DISPONIBLES:\n"
	for (let producto of arrProductos) {
		if (producto.stock > 0) {
			productosDisponibles += "\nID: " + producto.id
				+ ", " + producto.nombre
				+ ", $" + producto.precio
				+ ", en stock: " + producto.stock
		}
	}

	return productosDisponibles
}

const pedirIdDeProductoDisponible = function (arrProductos, arrIdsDeProductos, productosDisponibles) {
	const pedirIdDeProducto = function (arrIdsDeProductos, productosDisponibles) {
		let idDeProducto
		do {
			idDeProducto = pedirNumeroValido("Ingrese el N° de ID del producto deseado.\n\n"
				+ productosDisponibles)

			if (idDeProducto === null) {
				return
			}
		} while (!arrIdsDeProductos.includes(idDeProducto))

		return idDeProducto
	}

	let idDeProducto, stockDeProducto
	do {
		idDeProducto = pedirIdDeProducto(arrIdsDeProductos, productosDisponibles)
		if (idDeProducto) {
			stockDeProducto = arrProductos[idDeProducto - 1].stock
		} else {
			break
		}
	} while (!arrIdsDeProductos.includes(idDeProducto) || stockDeProducto === 0)

	return idDeProducto

	/* 	let idDeProducto = pedirIdDeProducto(arrIdsDeProductos, productosDisponibles)
		if (idDeProducto) {
			let stockDeProducto = arrProductos[idDeProducto - 1].stock
			while (!arrIdsDeProductos.includes(idDeProducto) || stockDeProducto === 0) {
				idDeProducto = pedirIdDeProducto(arrIdsDeProductos, productosDisponibles)
				stockDeProducto = arrProductos[idDeProducto - 1].stock
			}
			return idDeProducto
		} */
}

const generarInfoDeProducto = function (arrProductos, idDeProducto) {
	if (idDeProducto) {
		const INFO_PRODUCTO = arrProductos[idDeProducto - 1]

		return INFO_PRODUCTO
	}
}
const pedirCantidadAAgregar = infoDeProducto => {
	if (infoDeProducto) {
		let cantidad
		do {
			cantidad = pedirNumeroValido("Ingrese la cantidad de " + infoDeProducto.nombre.toLowerCase() + " que desee agregar a su carrito de compras.\n\n"
				+ "PRODUCTO A AGREGAR:\n" + infoDeProducto.nombre
				+ ", $" + infoDeProducto.precio
				+ ", en stock: " + infoDeProducto.stock
			)

			if (cantidad === null || infoDeProducto.stock === 0) {
				return
			}
		} while (cantidad > infoDeProducto.stock || cantidad <= 0)

		return cantidad
	}
}
const calcularYAcumularSubtotal = function (infoDeProducto, cantidad) {
	if (cantidad) {
		let subtotal = infoDeProducto.precio * cantidad
		total += subtotal
		return subtotal
	}
}

function generarProductoAAgregar(infoDeProducto, cantidad, subtotal) {
	if (subtotal) {
		class Producto {
			constructor(idNum, name, price, quantity, partialTotal) {
				this.id = idNum
				this.nombre = name
				this.precio = price
				this.cantidad = quantity
				this.subtotal = partialTotal
			}

			agregarACarrito(arrIdsEnCarrito, carrito = [], infoDeProducto) {
				if (!arrIdsEnCarrito.includes(infoDeProducto.id)) {
					arrIdsEnCarrito.push(infoDeProducto.id)
					carrito.push(this)
				} else {
					const INDICE_DE_PRODUCTO = infoDeProducto.id - 1
					carrito[INDICE_DE_PRODUCTO].cantidad += this.cantidad
					carrito[INDICE_DE_PRODUCTO].subtotal += this.subtotal
				}
				// Hacer ".sort()" del carrito en base al "id" de cada producto agregado, para que las cantidades agregadas se vayan sumando al producto correspondiente, y que no dependa de en qué orden voy comprando los productos:
				carrito.sort((a, b) => a.id - b.id)
				const PRODUCTO_AGREGADO = true
				return PRODUCTO_AGREGADO
			}
		}
		const PRODUCTO_A_AGREGAR = new Producto(infoDeProducto.id, infoDeProducto.nombre, infoDeProducto.precio, cantidad, subtotal)
		infoDeProducto.stock -= cantidad
		return PRODUCTO_A_AGREGAR
	}
}

/* 3° PARTE - "CONCLUSIÓN": */
function generarMensajeDeCarrito(mensajeDeCarrito) {
	mensajeDeCarrito = "CARRITO (total a pagar: $" + total + "):"
	for (const PRODUCTO of carrito) {
		mensajeDeCarrito += "\n" + PRODUCTO.nombre
			+ ", precio: $" + PRODUCTO.precio
			+ ", en carrito: " + PRODUCTO.cantidad
			+ " (subtotal: $" + PRODUCTO.subtotal + ")"
	}
	return mensajeDeCarrito
}
function mostrarTotalYODespedirse(carrito, mensajeDeCarrito) {
	let despedida
	// Si carrito tiene productos...
	if (carrito.length > 0) {
		// ...entonces mostrar total a pagar y despedirse del usuario:
		console.log(carrito)
		despedida = mensajeDeCarrito + "\n\nEl total a pagar es de: $" + total
			+ "\n\n¡Gracias por preferirnos!"

		// De otro modo, si el carrito está vacío...
	} else {
		// ...entonces sólo despedirse:
		despedida = "¡Gracias por preferirnos!"
	}
	console.log(despedida)
	alert(despedida)

	return despedida
}

/* ----------INVOCACIONES:---------- */
/* -----Introducción----- */

const USUARIO = pedirDatosPersonales(
	"Por favor, ingrese su nombre:",
	"Ingrese la letra correspondiente a su identidad de género, a partir de las siguientes opciones:"
)

let total, carrito
if (USUARIO) {
	darLaBienvenida(USUARIO)

	/* -----Desarrollo----- */
	total = 0, carrito = [], idsEnCarrito = [], mensajeDeCarrito = ""
	const IDS_DE_PRODUCTOS_ARR = [1, 2, 3]
	const PRODUCTOS_ARR = [
		{
			id: 1,
			nombre: "Agua de jamaica",
			precio: 400,
			stock: 10,
		},
		{
			id: 2,
			nombre: "Agua de limón",
			precio: 500,
			stock: 20,
		},
		{
			id: 3,
			nombre: "Agua de tamarindo",
			precio: 600,
			stock: 30,
		}
	]
	let confirmacion = confirm("¿Desea agregar algún producto a su carrito de compras?")
	while (confirmacion) {
		const PRODUCTOS_DISPONIBLES = mostrarProductosDisponibles(PRODUCTOS_ARR)
		const ID_DE_PRODUCTO = pedirIdDeProductoDisponible(PRODUCTOS_ARR, IDS_DE_PRODUCTOS_ARR, PRODUCTOS_DISPONIBLES)
		const INFO_DE_PRODUCTO = generarInfoDeProducto(PRODUCTOS_ARR, ID_DE_PRODUCTO)
		const CANTIDAD = pedirCantidadAAgregar(INFO_DE_PRODUCTO)
		const SUBTOTAL = calcularYAcumularSubtotal(INFO_DE_PRODUCTO, CANTIDAD)
		const PRODUCTO_A_AGREGAR = generarProductoAAgregar(INFO_DE_PRODUCTO, CANTIDAD, SUBTOTAL)
		if (PRODUCTO_A_AGREGAR) {
			PRODUCTO_A_AGREGAR.agregarACarrito(idsEnCarrito, carrito, INFO_DE_PRODUCTO)
		} else {
			break
		}
		mensajeDeCarrito = generarMensajeDeCarrito(mensajeDeCarrito)
		confirmacion = confirm("¡Producto agregado exitosamente!\n\n" + mensajeDeCarrito + "\n\n¿Desea agregar otro producto a su carrito de compras?")
	}

	/* -----Conclusión----- */
	mostrarTotalYODespedirse(carrito, mensajeDeCarrito)
}