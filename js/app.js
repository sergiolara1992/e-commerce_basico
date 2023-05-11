/* VARIABLES */
const carrito = document.querySelector("#carrito");
const contenedorCarrito = document.querySelector("#lista-carrito tbody");
const vaciarCarritoBtn = document.querySelector("#vaciar-carrito");
const listaCursos = document.querySelector("#lista-cursos");
let articulosCarrito = [];

cargarEventListeners();
function cargarEventListeners() {
  /* Cuando agregas un curso presionando "Agregar al carrito" */
  listaCursos.addEventListener("click", agregarCurso);

  /* Elimina cursos del carrito */
  carrito.addEventListener("click", eliminarCurso);
}

/* vaciar el carrito  */

vaciarCarritoBtn.addEventListener("click", () =>{
    articulosCarrito = []; /* RESETEAMOS EL ARREGLO */

    limpiarHTML();/* ELIMINAMOS TODO EL HTML */
})

/* FUNCIONES */

function agregarCurso(e) {
  e.preventDefault();

  if (e.target.classList.contains("agregar-carrito")) {
   const cursoSeleccionado = e.target.parentElement.parentElement;
   leerDatosCurso(cursoSeleccionado);
  }
}

/* ELIMINA UN CURSO DEL CARRITO */
function eliminarCurso(e) {
    if(e.target.classList.contains("borrar-curso")) {
        const cursoId = e.target.getAttribute("data-id");

        /* ELIMINA DEL ARREGLO DE ARTICULOS CARRITO POR EL DATA-ID */
        articulosCarrito = articulosCarrito.filter(curso => curso.id !== cursoId );

        carritoHTML(); /* iterar sobre el carrito y mostrar su HTML */
        
    }
    
}

/* LEE EL CONTENIDO DEL HTML AL QUE LE DIMOS CLICK Y EXTRAE LA INFORMACION DEL CURSO */

function leerDatosCurso(curso) {
  console.log(curso);

  /* crear un objeto con el contenido del curso actual */

  const infoCurso = {
    imagen: curso.querySelector("img").src,
    titulo: curso.querySelector("h4").textContent,
    precio: curso.querySelector(".precio span").textContent,
    id: curso.querySelector("a").getAttribute("data-id"),
    cantidad: 1,
  }

  /* REVISA SI UN ELEMENTO YA EXISTE EN EL CARRITO */
  const existe = articulosCarrito.some( curso => curso.id === infoCurso.id );
  if (existe) {

    /* ACTUALIZAMOS LA CANTIDAD */
    const cursos = articulosCarrito.map( curso => {
        if (curso.id === infoCurso.id) {
            curso.cantidad++;
            return curso; /* retorna el objeto actualizado */  
        } else {
            return curso; /* retorna los objetos que no son los duplicados */
        }
    } );
    articulosCarrito = [...cursos];
  } else {
    /* AGREGA ELEMENTOS AL ARREGLO DE CARRITO */
    articulosCarrito = [...articulosCarrito, infoCurso];
  }
  


  console.log(articulosCarrito);

  carritoHTML();
}

/* MUESTRA EL CARRITO DE COMPRAS EN EL HTML */

function carritoHTML() {
    

    /* LIMPIAR EL HTML */

    limpiarHTML();

    /* RECORRE EL CARRITO Y GENERA EL HTML */

    articulosCarrito.forEach(curso => {
        const { imagen, titulo, precio, cantidad, id } = curso;
        const row = document.createElement("tr");
        row.innerHTML = `
        <td>
        <img src="${imagen}" width="100">
        </td>
        <td>${titulo}</td>
        <td>${precio}</td>
        <td>${cantidad}</td>
        <td>
        <a href="#" class="borrar-curso" data-id="${id}" > X </a>
        </td>
        
         `;

         /* AGREGA EL HTML DEL CARRITO EN EL TBODY */

         contenedorCarrito.appendChild(row);
    });
}

/* ELIMINA LOS CURSOS DEL TBODY */

function limpiarHTML() {
   
    while (contenedorCarrito.firstChild) {
        contenedorCarrito.removeChild(contenedorCarrito.firstChild)
        
    }
    
}


