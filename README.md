# Zoebra, LA tienda de aguas frescas
## Lógica de la aplicación web:

1. Pedir datos personales al usuario (nombre e identidad de género).
2. Dar la bienvenida.
3. Preguntar si desea agregar algún producto a su carrito.
	* Si dice que sí: 
		- Mostrar los productos disponibles.
		- Pedir el N° de ID del producto deseado.
		- Preguntar qué cantidad de producto desea comprar.
		- Agregar producto al carrito.
		- Mostrar productos en carrito (con subtotales y total a pagar).
		- Regresar al punto 3.
	* Si dice que no:
		4. Comprobar si el carrito tiene productos.
		* Si es verdadero:  
			- Mostrar carrito, total a pagar, y despedirse del usuario.
		* Si es falso: 
			- Sólo despedirse del usuario.