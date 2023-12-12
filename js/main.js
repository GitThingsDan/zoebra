/* 1° PARTE - "INTRODUCCIÓN": */
function pedirStringNoVacio(instruccion, valorPorDefecto) {
	// Una forma mejorada de promptear que se me ocurrió, para validar que la entrada del usuario no sea un string vacío ("", un valor que literalmente no me sirve de nada), y así no tener que repetir este "dowhile" cada vez que deba emitir un "prompt":
	let str
	do {
		str = prompt(instruccion, valorPorDefecto)
	} while (str === "")
	return str
}
function pedirDatosPersonales(instruccionNombre, instruccionIdDeGenero) {
	const NOMBRE = pedirStringNoVacio(instruccionNombre, "Daniel")
	if (NOMBRE) {
		// console.log(NOMBRE)
		function pedirIdentidadDeGenero(instruccion, opcionFemenina = "f", opcionMasculina = "m", opcionOtra = "x") {
			// Usaré el siguiente objeto para llamar cada clave como "IDS_DE_GENERO_OBJ.id*" y que se entienda mejor la instrucción del prompt a primera vista (en lugar de usar un array y mostrar el índice de cada elemento - sólo un número, lo que se vería poco claro -):
			const IDS_DE_GENERO_OBJ = {
				// Normalizar todos los parámetros (ahora valores), convirtiéndolos a minúsculas con ".toLowerCase()":
				idFemenina: opcionFemenina.toLowerCase(),
				idMasculina: opcionMasculina.toLowerCase(),
				idOtra: opcionOtra.toLowerCase(),
			}

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
			// console.log(ID_DE_GENERO)
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
function darLaBienvenida(usuario) {
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
		// console.log(bienvenida)
		alert(bienvenida)
	}
}

/* 2° PARTE - "DESARROLLO": */
function pedirNumeroValido(instruccion, funcionParse = parseInt) {
	let input, num
	do {
		input = pedirStringNoVacio(instruccion)
		if (input === null) {
			return null
		} else {
			num = funcionParse(input)
		}
	} while (Number.isNaN(num))
	return num
}
function pedirInfoProductoYAgregarlo(arrDeProductos, arrDeIdsDeProductos, carrito, arrDeIdsDeCarrito) {
	function mostrarProductosDisponibles() {
		let productosDisponibles = "PRODUCTOS DISPONIBLES:\n"
		for (let producto of arrDeProductos) {
			// Cuando se nos enseñe más métodos para manipular arrays y eliminar sus elementos, mejoraré el siguiente "if":
			// if (producto.stock > 0) {
			// }
			productosDisponibles += "\nID: " + producto.id
				+ ", " + producto.nombre
				+ ", $" + producto.precio
				+ ", en stock: " + producto.stock
		}
		return productosDisponibles
	}

	const pedirIdDeProducto = function () {
		let idDeProducto
		do {
			idDeProducto = pedirNumeroValido("Ingrese el N° de ID del producto deseado.\n\n"
				+ mostrarProductosDisponibles())
			if (idDeProducto === null) {
				return
			}
		} while (!arrDeIdsDeProductos.includes(idDeProducto))
		return idDeProducto
	}
	const generarProductoOriginal = idDeProducto => {
		if (idDeProducto) {
			const PRODUCTO_ORIGINAL = arrDeProductos[idDeProducto - 1]
			return PRODUCTO_ORIGINAL
		}
	}
	const pedirCantidadAAgregar = function (productoOriginal) {
		if (productoOriginal) {
			let cantidad
			do {
				cantidad = pedirNumeroValido("Ingrese la cantidad de " + productoOriginal.nombre + " que desee agregar a su carrito de compras.\n\n"
					+ "PRODUCTO A AGREGAR:\n" + productoOriginal.nombre
					+ ", $" + productoOriginal.precio
					+ ", en stock: " + productoOriginal.stock
				)
				if (cantidad === null) {
					return null
				}
			} while (cantidad > productoOriginal.stock || cantidad === 0)
			return cantidad
		}
	}
	const calcularYAcumularSubtotal = (cantidad, precio) => {
		if (cantidad && precio) {
			let subtotal = cantidad * precio
			total += subtotal
			return subtotal
		}
	}

	function agregarProducto(productoOriginal, cantidad, subtotal) {
		if (productoOriginal && cantidad && subtotal) {
			class Producto {
				constructor(name, price, quantity, subtotal) {
					this.nombre = name
					this.precio = price
					this.cantidad = quantity
					this.subtotal = subtotal
				}
			}
			const PRODUCTO_A_AGREGAR = new Producto(productoOriginal.nombre, productoOriginal.precio, cantidad, subtotal)
			productoOriginal.stock -= cantidad

			if (!arrDeIdsDeCarrito.includes(productoOriginal.id)) {
				arrDeIdsDeCarrito.push(productoOriginal.id)
				carrito.push(PRODUCTO_A_AGREGAR)
			} else {
				const INDICE_DE_PRODUCTO = productoOriginal.id - 1
				carrito[INDICE_DE_PRODUCTO].cantidad += PRODUCTO_A_AGREGAR.cantidad
			}
			return PRODUCTO_A_AGREGAR
		}
	}

	const ID_DE_PRODUCTO = pedirIdDeProducto()
	const PRODUCTO_ORIGINAL = generarProductoOriginal(ID_DE_PRODUCTO)
	const CANTIDAD = pedirCantidadAAgregar(PRODUCTO_ORIGINAL)
	const SUBTOTAL = calcularYAcumularSubtotal(CANTIDAD, PRODUCTO_ORIGINAL.precio)
	const PRODUCTO_AGREGADO = agregarProducto(PRODUCTO_ORIGINAL, CANTIDAD, SUBTOTAL)
	return PRODUCTO_AGREGADO
}


/* 3° PARTE - "CONCLUSIÓN": */
function mostrarTotalYODespedirse(carrito) {
	let despedida
	// Si carrito tiene productos...
	if (carrito.length > 0) {
		// ...entonces mostrar total a pagar y despedirse del usuario:
		let mensajeCarrito = ""
		for (const producto of carrito) {
			mensajeCarrito += producto.nombre + precio + cantidad + subtotal
		}
		despedida = mensajeCarrito + "\n\nEl total a pagar es de: $" + total
			+ "\n\n¡Gracias por preferirnos!"

		// De otro modo, si el carrito esta vacío...
	} else {
		// ...entonces sólo despedirse:
		despedida = "¡Gracias por preferirnos!"
	}
	console.log(despedida)
	alert(despedida)
}

/* ----------INVOCACIONES:---------- */
/* -----Introducción----- */
// const USUARIO = pedirDatosPersonales(
// 	"Por favor, ingrese su nombre:",
// 	"Ingrese la letra correspondiente a su identidad de género, a partir de las siguientes opciones:"
// )
// let total, carrito
// if (USUARIO) {
// 	darLaBienvenida(USUARIO)

/* -----Desarrollo----- */

total = 0
carrito = []
idsDeCarrito = []
const IDS_DE_PRODUCTOS = [1, 2, 3]
const PRODUCTOS = [
	{
		id: 1,
		nombre: "Agua de jamaica",
		precio: 400,
		stock: 12,
	},
	{
		id: 2,
		nombre: "Agua de limón",
		precio: 500,
		stock: 10,
	},
	{
		id: 3,
		nombre: "Agua de tamarindo",
		precio: 600,
		stock: 8,
	}
]

let confirmacion = confirm("¿Desea agregar algún producto a su carrito de compras?")
while (confirmacion) {
	let producto = pedirInfoProductoYAgregarlo(PRODUCTOS, IDS_DE_PRODUCTOS, carrito, idsDeCarrito)
	if (!producto) {
		break
	}
	confirmacion = confirm("¿Deseas agregar otro producto a tu carrito de compras?")
}
/* -----Conclusión----- */
mostrarTotalYODespedirse(carrito)
// }

/* --------------------------------- */

/* // Una forma breve para omitir argumentos al invocar funciones: poner "_" (sin comillas) en el lugar del argumento a omitir...
const _ = undefined 
*/