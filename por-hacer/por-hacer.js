const fs = require('fs'); 

let listadoPorHacer = [];

const guardarDB = () => {
    let data = JSON.stringify(listadoPorHacer);

    fs.writeFile(`db/data.json`, data, (err) => {
        if (err) throw new Error('No se pudo grabar', err)
    });
}

const cargarDB = () => {
    try {
        listadoPorHacer = require('../db/data.json');
    } catch (error) {
        listadoPorHacer = [];
    }
}

const crear = (descripcion) => {
    cargarDB();
    let porHacer = {
        descripcion: descripcion,
        completado: false
    };
    listadoPorHacer.push(porHacer);
    guardarDB();
    return porHacer
}

const getListado = () => {
    cargarDB();
    return listadoPorHacer;
}

const actualizar = (descripcion, completado = true) => {
    cargarDB();
    let index = listadoPorHacer.findIndex(tarea => tarea.descripcion === descripcion);
    if (index >= 0) {
        listadoPorHacer[index].completado = completado;
        guardarDB();
        return true;
    } else {
        return false;
    }

}

const borrar = (descripcion) => {
    cargarDB();
    let nuevolistado = listadoPorHacer.filter(tarea => {
        
        return tarea.descripcion !== descripcion
    });
 
    if (listadoPorHacer.length === nuevolistado.length ) {
        return false;
    } else {
        listadoPorHacer = nuevolistado;
        guardarDB();
        return true;
    }
}

const listar = () => {
    cargarDB();
    let nuevolistado = listadoPorHacer.filter(tarea => {
        
        return tarea.completado == true
    });
 
    if (nuevolistado.length === 0 ) {
        return false;
    } else {
        return nuevolistado;
    }
}





module.exports = {
    crear,
    getListado,
    actualizar,
    borrar,
    listar
}