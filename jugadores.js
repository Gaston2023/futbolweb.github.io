// VERIFICA SI HAY DATOS EN EL LS O NO
if(localStorage.getItem('jugadores') === undefined || localStorage.getItem('jugadores')===null){
    guardarLocalStorage();
}

window.addEventListener("load", function () {
    leerLocalStorage();
    
});


function guardarLocalStorage(){

    const json_str=document.getElementById('datos-json').textContent;
    localStorage.setItem('jugadores',json_str)
}

function borrarLocalStorage(){
    
    localStorage.removeItem('jugadores')
}

// VALIDAR CAMPOS COMPLETOS
function validacion(){
    var dni,apellido,nombre,edad,apodo,dorsal;
    dni=document.getElementById('idni').value;
    apellido=document.getElementById('iapellido').value;
    nombre=document.getElementById('inombre').value;
    edad=document.getElementById('iedad').value;
    apodo=document.getElementById('iapodo').value;
    dorsal=document.getElementById('idorsal').value;

    if(dni==="" || apellido ==="" || nombre==="" || edad==="" || apodo==="" || dorsal===""){
        
        alert("COMPLETAR TODOS LOS CAMPOS");
        return true
        
    }
}

// ACCEDE AL LS
function leerLocalStorage(){

    const jsonJugadores=localStorage.getItem('jugadores');
    if (jsonJugadores!==null){
        
        const jsonData= JSON.parse(jsonJugadores);
        const miBody=document.getElementById('miBody');
        
        let indice=0;

        for(let elemento of jsonData){
            
            let row=document.createElement('tr');
            // CREACION DE CELDAS
            
            let celda_0=document.createElement('td');
            let celda_1=document.createElement('td');
            let celda_2=document.createElement('td');
            let celda_3=document.createElement('td');
            let celda_4=document.createElement('td');
            let celda_5=document.createElement('td');
            let celda_6=document.createElement('td');
            let celda_7=document.createElement('td');
            let celda_8=document.createElement('td');

            
            let texto_0=document.createTextNode(elemento.dni);
            let texto_1=document.createTextNode(elemento.apellido);
            let texto_2=document.createTextNode(elemento.nombre);
            let texto_3=document.createTextNode(elemento.posicion);
            let texto_4=document.createTextNode(elemento.edad);
            let texto_5=document.createTextNode(elemento.apodo);
            let texto_6=document.createTextNode(elemento.pieHabil);
            let texto_7=document.createTextNode(elemento.dorsal);
            
            //  BOTON ELIMINAR

            let boton=document.createElement('button');
            let x=elemento.dni;
            
            boton.setAttribute('dni',x);
            boton.setAttribute('onclick', 'eliminarJugador(this), eliminar(this)');
            boton.setAttribute('id','delete')
            //console.log(boton);

            
            let texto_8=document.createTextNode('Eliminar');
            const logoDelete = document.createElement("img");
            logoDelete.src="https://cdn.icon-icons.com/icons2/1808/PNG/512/trash-can_115312.png";
            logoDelete.style.width="35px";
            logoDelete.style.height="35px";

            // BOTON EDITAR

            let boton2=document.createElement('button');
            let y=elemento.dni;
            
            boton2.setAttribute('dni',y);
            boton2.setAttribute('onclick', 'editarJugador(this)');
            boton2.setAttribute('class','editar')
            boton2.setAttribute('id','dni')
            
            let texto_9=document.createTextNode('EDITAR');
            const logoEditar = document.createElement("img");
            logoEditar.src="https://cdn.pixabay.com/photo/2017/06/06/00/33/edit-icon-2375785_960_720.png";
            logoEditar.style.width="42px";
            logoEditar.style.height="42px"

            // Arbol de Nodos
            celda_0.appendChild(texto_0);
            celda_1.appendChild(texto_1);
            celda_2.appendChild(texto_2);
            celda_3.appendChild(texto_3);
            celda_4.appendChild(texto_4);
            celda_5.appendChild(texto_5);
            celda_6.appendChild(texto_6);
            celda_7.appendChild(texto_7);

            boton.appendChild(logoDelete);
            celda_8.appendChild(boton);

            boton2.appendChild(logoEditar);
            celda_8.appendChild(boton2)
            
            row.appendChild(celda_0);
            row.appendChild(celda_1);
            row.appendChild(celda_2);
            row.appendChild(celda_3);
            row.appendChild(celda_4);
            row.appendChild(celda_5);
            row.appendChild(celda_6);
            row.appendChild(celda_7);
            row.appendChild(celda_8);

            
            miBody.appendChild(row);
            console.log(row)
            
            indice++
        }

    }else{
        
    }
}

function borrarBodyTabla(){
    const elemento = document.getElementById('miBody');
    while (elemento.firstChild) {
        elemento.firstChild.remove();
    }
}



document.getElementById('btnAdd').addEventListener('click',crearJugador);

function crearJugador(){

    const jsonJugadores=localStorage.getItem('jugadores');
    if (jsonJugadores!==null && validacion()!==true){
        
            const jsonData=JSON.parse(jsonJugadores);
            // let dni=jsonData.length;
            // console.log(dni);

            const jugadorNuevo={
                "dni":document.getElementById('idni').value,
                "apellido":document.getElementById('iapellido').value,
                "nombre":document.getElementById('inombre').value,
                "posicion":document.getElementById('iposiciones').value,
                "edad":document.getElementById('iedad').value,
                "apodo":document.getElementById('iapodo').value,
                "pieHabil":document.getElementById('ipie').value,
                "dorsal":document.getElementById('idorsal').value,

            };
            
            jsonData.push(jugadorNuevo);
            console.log(jsonData);

            localStorage.removeItem('jugadores');
            const guardar=JSON.stringify(jsonData);
            localStorage.setItem('jugadores',guardar);
        
            this.leerLocalStorage();
            
    }else{
        
    }
    }

// BORRA EN TABLA
function eliminar(Id) {
    
    let row = Id.parentNode.parentNode;
    let table = document.getElementById("tablaJugadores");

    table.deleteRow(row.rowIndex);
    
    };

// BORRA EN LS
function eliminarJugador(param){
    
    let td = param.parentNode;
    let tr = td.parentNode;


    let eliminar = parseInt(tr.cells[0].textContent);

    const jsonJugadores = localStorage.getItem('jugadores');
    const jsonData = JSON.parse(jsonJugadores);

    const nuevo = jsonData.filter(function(item){
        console.log(item);
        return item.dni != eliminar;
    });

    this.borrarLocalStorage();
    const jsonNuevo = JSON.stringify(nuevo);
    localStorage.setItem('jugadores',jsonNuevo);
}


window.addEventListener("load", function (editarJugador) {
    completarDatos();
});


document.getElementById('btnEdit').addEventListener('click', modificarJugador);
document.getElementById('btnEdit').addEventListener('click', aviso);

function ocultarBotonEditar(){
    const btn=document.getElementById('btnEdit');
    btn.style.display='none'
    
}

function aviso(){
    alert("LOS DATOS SE ACTTUALIZARON CON EXITO")
}

function editarJugador(param){
    let td = param.parentNode;
    let tr = td.parentNode;

    let editar = parseInt(tr.cells[0].textContent);
    localStorage.setItem('editar',editar);
    borrarBodyTabla()
    alert("\n"+"\n"+"DEBERA INGRESAR LOS DATOS NUEVAMENTE Y ACTUALIZAR");
    // oculto el boton Agregar
    let btnAdd=document.getElementById('btnAdd');
    btnAdd.style.display='none';
    
    
}

function completarDatos(){
    
    const idModificar = localStorage.getItem('editar');

    const jsonJugadores = localStorage.getItem('jugadores');
    const jsonData = JSON.parse(jsonJugadores);

    const jugador = jsonData.find(item => item.dni === idModificar );

    
}

function modificarJugador(){
    if(validacion()!==true){
        const jsonJugadores = localStorage.getItem('jugadores');
        const jsonData = JSON.parse(jsonJugadores);
        const idModificar = localStorage.getItem('editar');
        const jsonModificado = jsonData.filter( function(item){
            return item.dni !== idModificar;
        });

        const jugadorModificado = {
            
            "dni": document.getElementById('idni').value,
            "apellido": document.getElementById('iapellido').value,
            "nombre": document.getElementById('inombre').value,
            "posicion": document.getElementById('iposiciones').value,
            "edad": document.getElementById('iedad').value,
            "apodo": document.getElementById('iapodo').value,
            "pieHabil": document.getElementById('ipie').value,
            "dorsal": document.getElementById('idorsal').value,
        }
        
        jsonModificado.push(jugadorModificado);
        
        const auxiliar = jsonModificado.sort( function(a,b){
            if(a.id < b.id){
                return -1
            }
            return 0;
        })
        
        
        localStorage.removeItem('jugadores');
        const guardar = JSON.stringify(auxiliar);
        localStorage.setItem('jugadores', guardar);
    }
        

}


document.getElementById('btnBuscar').addEventListener('click', buscarJugador);
function buscarJugador(){
    const jsonJugadores = localStorage.getItem('jugadores');
    const jsonData = JSON.parse(jsonJugadores);
    const buscar2 = document.getElementById('buscar').value;

    
    let resultado2=jsonData.find(persona=>persona.apellido===buscar2 || persona.nombre===buscar2 || persona.dorsal===buscar2);
    
    let resultado3=Object.values(resultado2)
    
    //alert(JSON.stringify(resultado3))
    let lista_vacia=[];
    for(let ele of resultado3){
        
        lista_vacia.push(ele);
    }
    alert("El jugador encontrado es:"+"\n"+"\n"+"==>   " +lista_vacia.join('--')+"  <==")
    
    if(jsonJugadores !== null){
        const jsonData = JSON.parse(jsonJugadores);

        const buscar = document.getElementById('buscar').value;

        const resultado = jsonData.filter(function(item){
            return item.apellido.toLowerCase().includes(buscar) || 
            item.nombre.toLowerCase().includes(buscar) || 
            item.dorsal.toLowerCase().includes(buscar);
        });
        
        if (jsonJugadores!==null){
            indic=0
            for(let elemen of resultado){
                
                
                const miBody2=document.getElementById('miBody2');
                
                let indice=0;

                let row=document.createElement('tr');
                let celda_0=document.createElement('td');
                let celda_1=document.createElement('td');
                let celda_2=document.createElement('td');
                
                let texto_0=document.createTextNode(elemen.apellido);
                let texto_1=document.createTextNode(elemen.nombre);
                let texto_2=document.createTextNode(elemen.posicion);

                celda_0.appendChild(texto_0);
                celda_1.appendChild(texto_1);
                celda_2.appendChild(texto_2);

                
                row.appendChild(celda_0);
                row.appendChild(celda_1);
                row.appendChild(celda_2);

                
                miBody2.appendChild(row);
                console.log(row)
                
                indic++
            }
        }
        
    }else{
        alert("NO SE ENCUENTRA EN LA LISTA")
    }

}

