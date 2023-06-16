
function getJugadores(fecha) {
    const titularesJSON = localStorage.getItem(fecha);
    return titularesJSON ? JSON.parse(titularesJSON) : [];
}


function guardarJugadores(fecha, titulares) {
    localStorage.setItem(fecha, JSON.stringify(titulares));
}


function agregarFecha() {
    const fecha = document.getElementById('fecha').value;

    const tablasDiv = document.getElementById('tablas');
    const tabla = document.createElement('table');
    tabla.id = fecha;
    tablasDiv.appendChild(tabla);

    const tituloTabla = document.createElement('h5');
    tituloTabla.textContent = fecha;
    tablasDiv.insertBefore(tituloTabla, tabla);

    mostrarTabla(fecha);
}


function eliminarJugador(fecha, dorsal) {
    const titulares = getJugadores(fecha);

    const jugadoresFiltrados = titulares.filter(jugador => jugador.dorsal !== dorsal);

    guardarJugadores(fecha, jugadoresFiltrados);
    mostrarTabla(fecha);
}


function mostrarTabla(fecha) {
    const titulares = getJugadores(fecha);
    const tabla = document.getElementById(fecha);
    tabla.innerHTML = '';
    
    const encabezado = document.createElement('thead');
    const encabezadoFila = document.createElement('tr');
    const encabezadoNombre = document.createElement('th');
    encabezadoNombre.textContent = 'Nombre';
    const encabezadoApellido = document.createElement('th');
    encabezadoApellido.textContent = 'Apellido';
    const encabezadoDorsal = document.createElement('th');
    encabezadoDorsal.textContent = 'Dorsal';
    const encabezadoPosicion = document.createElement('th');
    encabezadoPosicion.textContent = 'Posición';
    
    encabezadoFila.appendChild(encabezadoNombre);
    encabezadoFila.appendChild(encabezadoApellido);
    encabezadoFila.appendChild(encabezadoDorsal);
    encabezadoFila.appendChild(encabezadoPosicion);
    encabezado.appendChild(encabezadoFila);
    tabla.appendChild(encabezado);
    
    const encabezadoAccion = document.createElement('th');
    encabezadoAccion.textContent = 'Acción';
    encabezadoFila.appendChild(encabezadoAccion);


    const cuerpoTabla = document.createElement('tbody');
    titulares.forEach(jugador => {
        const fila = document.createElement('tr');
        const celdaNombre = document.createElement('td');
        celdaNombre.textContent = jugador.nombre;
        const celdaApellido = document.createElement('td');
        celdaApellido.textContent = jugador.apellido;
        const celdaDorsal = document.createElement('td');
        celdaDorsal.textContent = jugador.dorsal;
        const celdaPosicion = document.createElement('td');
        celdaPosicion.textContent = jugador.posicion;
    
        fila.appendChild(celdaNombre);
        fila.appendChild(celdaApellido);
        fila.appendChild(celdaDorsal);
        fila.appendChild(celdaPosicion);
        cuerpoTabla.appendChild(fila);

        
        const celdaAccion = document.createElement('td');
        const botonBorrar = document.createElement('button');
        botonBorrar.textContent = 'X';
        botonBorrar.style.backgroundColor = 'red';
        botonBorrar.classList.add('boton-borrar');
        botonBorrar.addEventListener('click', () => eliminarJugador(fecha, jugador.dorsal));
        celdaAccion.appendChild(botonBorrar);
        fila.appendChild(celdaAccion);

        cuerpoTabla.appendChild(fila);
        
    });
    tabla.appendChild(cuerpoTabla);
}


function agregarTitular() {
    const fechaSeleccionada = document.getElementById('fecha').value;
    const nombre = document.getElementById('nombre').value;
    const apellido = document.getElementById('apellido').value;
    const dorsal = document.getElementById('dorsal').value;
    const posicion = document.getElementById('posicion').value;

    const jugadores = getJugadores(fechaSeleccionada);

    // Verifica si hay campos de entrada vacíos
    if (nombre === '' || apellido === '' || posicion === '' || dorsal === '') {
        alert('Por favor, complete todos los campos.');
        return;
    }

    // Verifica el número máximo de jugadores por convocatoria
    if (jugadores.length >= 11) {
        alert('No se pueden agregar más jugadores para esta fecha.');
        return;
    }

    // Verifica el número máximo de arqueros
    const arqueros = jugadores.filter(jugador => jugador.posicion === 'Arquero');
    if (posicion === 'Arquero' && arqueros.length >= 1) {
        alert('Ya hay un arquero en esta fecha.');
        return;
    }

    const jugador = {
        nombre: nombre,
        apellido: apellido,
        dorsal: dorsal,
        posicion: posicion
    };

    jugadores.push(jugador);
    guardarJugadores(fechaSeleccionada, jugadores);

    mostrarTabla(fechaSeleccionada);
}

// Carga las fechas almacenadas en el local storage
const fechas = Object.keys(localStorage).filter(key => key !== 'jugadores' && key !== 'convocatorias' && key !== 'convocatoriasJugadores' && key !== 'modificarConvocatoria' && key !== 'convocatoriaNro' && key !== 'editar');

const tablasDiv = document.getElementById('tablas');
fechas.forEach(fecha => {
    const tabla = document.createElement('table');
    tabla.id = fecha;
    tablasDiv.appendChild(tabla);

    const tituloTabla = document.createElement('h5');
    tituloTabla.textContent = fecha;
    tablasDiv.insertBefore(tituloTabla, tabla);

    mostrarTabla(fecha);
        }
    );