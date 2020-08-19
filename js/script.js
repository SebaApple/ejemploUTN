/*
  1. Array para el Carrito de compras:
 [{
   id: numero,
   nombre: string,
   cantidad: numero,
   precioUnitario: numero
 }]
  */

var productos =
    [
        {
            id: 1,
            nombre: "Papa",
            precioUnitario: 25.55,
            cantidad: 600,
        },
        {
            id: 2,
            nombre: "Palta Chilena",
            precioUnitario: 121.85,
            cantidad: 120,
        },
        {
            id: 3,
            nombre: "Harina Leudante Blancaflor",
            precioUnitario: 103.42,
            cantidad: 20,
        },
        {
            id: 4,
            nombre: "Sopa Knnor",
            precioUnitario: 85.5,
            cantidad: 23,
        },
        {
            id: 5,
            nombre: "Spaguetti Matarazzo",
            precioUnitario: 85.111,
            cantidad: 58,
        },
        {
            id: 6,
            nombre: "Aceite Girasol Cañuelas",
            precioUnitario: 99.963,
            cantidad: 85,
        },
        {
            id: 7,
            nombre: "Pan Lactal Bimbo",
            precioUnitario: 75.01,
            cantidad: 12,
        },
        {
            id: 8,
      		nombre: "Shampoo Anticaspa Eucerin",
      		precioUnitario: 1190.50,
            cantidad: 111
        },
        {
            id: 9,
            nombre: "Ades de Almendra",
            precioUnitario: 195.77,
            cantidad: 54
        },
];

// Inicio del tbodyStock para crear las filas (tr) del la tablaStock

productos.forEach(element => {
    createTrStock(element);
});

//****************************************************************

var productos_comprados = [];

/*
    Se crea <td> del tbody.
    Se retorna el td creado
 */

function createTd(text) {

  var td = document.createElement('td');
  var txt = document.createTextNode(text);
  
  td.appendChild(txt);
  
  return td;
}

/**
    Se retorna el td creado del button
 */

function createTdBoton(id, text, style, functionClick) {

    //Se crea un <td> que contendra un button en su interior.
    var td = document.createElement('td');
    var btn = document.createElement('button');

    btn.classList.add('btn');
    // Se agrega estilo definido por bootstrap
    btn.classList.add(style);
    // se define el atributo id para el botón
    btn.setAttribute('id', id);

    var txt = document.createTextNode(text);

    btn.appendChild(txt);

    // se agrega el listener click con su funcion.
    btn.addEventListener('click', functionClick);
    td.appendChild(btn);

    return td;
}

/*
    Cargar Cantidad de Productos
    Se crea un <td> con un input en su interior.
    Retorna el td creado
 */

function createTdInput() {

    var td = document.createElement('td');
    var input = document.createElement('input');
    // se aplica el class indicado por bootstrap
    input.classList.add('form-control'); 
    // type genérico para los de tipo texto
    input.setAttribute('type', 'text-center');
    // texto sugerido
    input.setAttribute('placeHolder', 'Cantidad de Unidades');

    td.appendChild(input);

    return td;
}

/*
    Se crea una fila <tr> con varias celdas por columna <td> conteniendo todos los detalles del producto.
    
    //<tr>
    //  <td>string</td> nombre
    //  <td>number</td> precio_unitario
    //  <td>number</td> cantidad
    //  <td>button"txt"</td> id
    //</tr>
    
    Para mostrar la lista de productos del supermecado.
 */

function createTrStock(producto) {
    // productoNombre
    var tdProductName = createTd(producto.nombre);
    // productoPrecioUnitario
    var tdValueUnit = createTd(producto.precioUnitario);
    // productoCantidad
    var tdQuant = createTd(producto.cantidad);
    // Subtotal
    var tdValueSubTotal = createTdInput();
    // Botón
    var tdButtonAdd = createTdBoton(producto.id, 'Agregar', 'btn-outline-success', agregarCarrito);

    // se crea la fila <tr> y se le agregan sus celdas <td>
    var tr = document.createElement('tr');

    tr.appendChild(tdProductName);
    tr.appendChild(tdValueUnit);
    tr.appendChild(tdQuant);
    tr.appendChild(tdValueSubTotal);
    tr.appendChild(tdButtonAdd);

    // se agrega el <tbody> a la table del Listado de Productos
    var tbody = document.getElementById('tbodyStock');
    tbody.appendChild(tr);
}

/**
    Función para agregar #cantidad de productos al carrito.
 */
function agregarCarrito(e) {
    // se obtiene el input.
    var input = e.target.parentNode.previousSibling.firstChild;
    // se obtiene el valor ingresado en el input.
    var cantidad_de_unidades = input.value;

    // si no se ingresa un valor abrira un alert.
    if (cantidad_de_unidades == '') {

        alert('Ingrese un monto _a comprar.');
        return;
    }

    // se obtiene el id del button
    var id_button = e.target.id;
    // se verifica si el producto ya fue comprado o no.
    var index_comprados = productos_comprados.findIndex(parametro => parametro.id == id_button);

    if (index_comprados != -1) {
        alert('Ya se había cargado al carrito.');
        return;
    }

    // se busca el índice del producto comprado para conocer sus propiedades.
    var index = productos.findIndex(parametro => parametro.id == id_button);
    // se obtiene el producto segun su id
    var producto = productos[index];
    // se obtiene cada propiedad del producto
    var id = producto.id;
    var nombre = producto.nombre;
    var cantidad = producto.cantidad;
    var precio = producto.precioUnitario;

    // verificamos que no se compre más que el máximo de unidades(Stock)
    if (cantidad_de_unidades > cantidad) {
        alert('esta comprando mas productos de lo que disponemos de stock!');
        return;
    }

    // se actualiza el valor del nuevo stock en el html.
    var cantidad_html = e.target.parentNode.previousSibling.previousSibling.firstChild;
    var stock = cantidad - cantidad_de_unidades;
    cantidad_html.textContent = stock;
    // se actualiza el valor en el vector (por referencia se actualiza el vector)
    // productos[index].cantidad = stock;
    producto.cantidad = stock;

    // se crea un objeto sencillo con la informacion del producto comprado
    var producto_aux = {
        id: id,
        nombre: nombre,
        precioUnitario: precio,
        cantidad: cantidad_de_unidades,
    };
    // se agrega el producto a la lista definitiva
    productos_comprados.push(producto_aux);
    // se crea el <tr> en la tabla de productos comprados enviando 'producto_aux'.
    createTrBuy(producto_aux);
    // se actualiza el total de la compra.
    //updateTotal();
}

/*
    Se crea un <tr> con varios <td> conteniendo toda la información de un producto.
    Usado especialmente para representar la tabla de productos cargados al carrito por el usuario.
 */

function createTrBuy(producto) {
    // productoNombre
    var tdProductName = createTd(producto.nombre);
    // productoCantidad
    var tdQuant = createTd(producto.cantidad);
  // productoPrecioUnitario
    var tdValueUnit = createTd(producto.precioUnitario);
    // Subtotal
    var tdValueSubTotal = createTd(producto.precioUnitario * producto.cantidad);
    // Botón XXX se ajusta el id del botton para que no coincida con lo del stock
    var tdButtonOut = createTdBoton(producto.id + '_delete', 'Borrar', 'btn-outline-danger', removeCarrito);

    // se crea el <tr> y se le agregan sus <td>
    var tr = document.createElement('tr');

    tr.classList.add('text-center'); // se agrega un estilo
    tr.appendChild(tdProductName);
    tr.appendChild(tdQuant);
    tr.appendChild(tdValueUnit);
    tr.appendChild(tdValueSubTotal);
    tr.appendChild(tdButtonOut);

    // se agrega el <tr> a una tabla especifica
    var tbody = document.getElementById('tbodyBuy');
    tbody.appendChild(tr);
}

/**
    Funcion para borrar un producto del carrito.
    Es ejecutado desde un button en el html.
 */
function removeCarrito(e)
{
    // se obtiene el id del button
    var id_button = e.target.id;
    // el id de los botones para borrar productos comprados tiene el formato 'xxx_delete'
    // donde 'xxx'='id es el id del producto'.
    var id_button_number = id_button.replace('_delete', '');
    // se obtiene el indice de un producto de acuerdo a su id.
    var index = productos_comprados.findIndex(parametro => parametro.id == id_button_number);
    // se borra el producto deseado del vector.
    productos_comprados.splice(index, 1);

    // a partir de su id obtenemos el button
    var button = document.getElementById(id_button);
    // a partir del button obtenemos <td> -> <tr>
    var nodo_tr = button.parentNode.parentNode; // <tr>

    // se obtienen todos los nodos del <tr> y se van borrando uno a uno
    nodo_tr.childNodes.forEach(nodo_td => {
        // se obtienen todos los nodos del <td> y se van borrando uno a uno
        nodo_td.childNodes.forEach(n => { 

            nodo_td.removeChild(n);

        });
    });

    // se actualiza el total de la compra.
    //updateTotal();
}
/**
    Calcula y actualiza el total a pagar por el usuario de la lista de productos comprados.
    Se modifica el elemento con el id='total'.
 */

function totalCompra() {
    // se obtiene el total calculando el precio por la cantidad comprada.
    var total = 0;
    productos_comprados.forEach(unProducto => {
        total += unProducto . precioUnitario * unProducto . cantidad;
    });
    // se actualiza el html con el nuevo total.
    //var mensaje = document.getElementById('total');

    alert('Total de su compra $' + total);
    //mensaje.innerHTML = "Total: " + formatMoney(total);
}
