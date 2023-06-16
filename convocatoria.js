window.addEventListener("load", function () {
    buscarDatos();
    botonesyFormOcultos()
});

document.getElementById('btnCrearConvocatoria').addEventListener('click',mostrarBotonesyForm);
document.getElementById('cancelar').addEventListener('click',botonesyFormOcultos);


function botonesyFormOcultos(){
    
    const formu=document.getElementById('formu');
    formu.style.display='none';
}

function mostrarBotonesyForm(){
    const formu=document.getElementById('formu');
    formu.style.display='block';
}

function buscarDatos(){

    const bodyConvocatoria = document.getElementById('bodyConvocatoria');
    const convocatorias = JSON.parse(localStorage.getItem('convocatorias'));

    if(convocatorias === null){
        fetch('datos/convocatorias.json')
        .then((res) => {
        return res.json()
        })
        .then((data) => {
        
        localStorage.setItem('convocatorias', JSON.stringify(data));

        data.forEach(element => {
            const tr = document.createElement('tr');

            const id = document.createElement('td');
            const fecha = document.createElement('td');
            const rival = document.createElement('td');
            const capitan = document.createElement('td');
            const convocar = document.createElement('td');

            id.appendChild(document.createTextNode(element.id));
            fecha.appendChild(document.createTextNode(element.fecha));
            rival.appendChild(document.createTextNode(element.rival));
            capitan.appendChild(document.createTextNode(element.capitan));
            
            const botonConvocar = document.createElement('button');
            
            botonConvocar.setAttribute('id', element.id);
            botonConvocar.setAttribute('onclick', 'convocarJugadores(this)');
            botonConvocar.setAttribute('class', 'btn btn-primary');
            botonConvocar.appendChild(document.createTextNode('Convocar'));

            const botonEditar = document.createElement('button');
            botonEditar.setAttribute('id', element.id);
            botonEditar.setAttribute('onclick', 'modificarConvocatoria(this)');
            botonEditar.setAttribute('class', 'btn btn-info');
            botonEditar.appendChild(document.createTextNode('Editar'));

            const botonEliminar = document.createElement('button');
            botonEliminar.setAttribute('id', element.id);
            botonEliminar.setAttribute('onclick', 'eliminarConvocatoria(this)');
            botonEliminar.setAttribute('class', 'btn btn-danger');
            
            botonEliminar.appendChild(document.createTextNode('X'));
            
            convocar.appendChild(botonEliminar);
            convocar.appendChild(botonEditar);
            convocar.appendChild(botonConvocar);

            tr.appendChild(id);
            tr.appendChild(fecha);
            tr.appendChild(rival);
            tr.appendChild(capitan);
            tr.appendChild(convocar);

            bodyConvocatoria.appendChild(tr);
        });
        })
    }
    else{
        convocatorias.forEach(element => {
        const tr = document.createElement('tr');

        const id = document.createElement('td');
        const fecha = document.createElement('td');
        const rival = document.createElement('td');
        const capitan = document.createElement('td');
        const convocar = document.createElement('td');

        id.appendChild(document.createTextNode(element.id));
        fecha.appendChild(document.createTextNode(element.fecha));
        rival.appendChild(document.createTextNode(element.rival));
        capitan.appendChild(document.createTextNode(element.capitan));
        
        const botonConvocar = document.createElement('button');
        
        botonConvocar.setAttribute('id', element.id);
        botonConvocar.setAttribute('onclick', 'convocarJugadores(this)');
        botonConvocar.setAttribute('class', 'btn btn-primary');
        botonConvocar.appendChild(document.createTextNode('Convocar'));

        const botonEditar = document.createElement('button');
        botonEditar.setAttribute('id', element.id);
        botonEditar.setAttribute('onclick', 'modificarConvocatoria(this)');
        botonEditar.setAttribute('class', 'btn btn-info');
        botonEditar.appendChild(document.createTextNode('Editar'));

        const botonEliminar = document.createElement('button');
        botonEliminar.setAttribute('id', element.id);
        botonEliminar.setAttribute('onclick', 'eliminarConvocatoria(this)');
        botonEliminar.setAttribute('class', 'btn btn-danger');
        botonEliminar.appendChild(document.createTextNode('X'));

        convocar.appendChild(botonEliminar);
        convocar.appendChild(botonEditar);
        convocar.appendChild(botonConvocar);

        tr.appendChild(id);
        tr.appendChild(fecha);
        tr.appendChild(rival);
        tr.appendChild(capitan);
        tr.appendChild(convocar);

        bodyConvocatoria.appendChild(tr);
        });
    }

}

function eliminarConvocatoria(parametro){
    
    let idEliminar = parseInt(parametro.getAttribute("id"));
    const convocatorias = JSON.parse(localStorage.getItem('convocatorias'));
    const nuevo = convocatorias.filter(function(item){
        return item.id !== idEliminar;
    });

    localStorage.setItem('convocatorias',JSON.stringify(nuevo));

    this.borrarBodyTabla();
    this.buscarDatos();
}

function borrarBodyTabla(){
    const elemento = document.getElementById('bodyConvocatoria');
    while (elemento.firstChild) {
    elemento.firstChild.remove();
    }
}

function modificarConvocatoria(param){
    let id_editar = parseInt(param.getAttribute("id"));
    localStorage.setItem('modificarConvocatoria',JSON.stringify(id_editar));
    window.location.href = 'modificarConvocatoria.html'
}

function convocarJugadores(param){
    let idConvocatoria = parseInt(param.getAttribute("id"));
    localStorage.setItem('convocatoriaNro',JSON.stringify(idConvocatoria));
    window.location.href = 'convocarJugadores.html'
}

const cancelar = document.getElementById('cancelar');
cancelar.addEventListener('click', cancelarConvocatoria);

const guardar = document.getElementById('guardar');
guardar.addEventListener('click', crearConvocatoria);

function cancelarConvocatoria(){
    event.preventDefault()
    event.stopPropagation()
    
}

function crearConvocatoria(){
    const forms = document.querySelectorAll('.needs-validation');
    
    Array.from(forms).forEach(form => {
        form.addEventListener('submit', event => {
        if (!form.checkValidity()) {
            event.preventDefault();
            event.stopPropagation();                
        }else{

            const convocatorias = JSON.parse(localStorage.getItem('convocatorias'));
            
            maxId = convocatorias.reduce((max, obj) => obj.id > max ? obj.id : max, -Infinity);
            let i = 0;

            if (maxId !== -Infinity){
            i = maxId + 1;
            }

            const convocatoria = {
            'id' : i,
            'fecha' : document.getElementById('fecha').value,
            'rival' : document.getElementById('rival').value,
            'capitan' : document.getElementById('capitan').value
            }
            convocatorias.push(convocatoria);
            localStorage.setItem('convocatorias', JSON.stringify(convocatorias));

            event.preventDefault();
            event.stopPropagation();
            window.location.reload();
            
        }

        form.classList.add('was-validated')
        }, false)
    })
}