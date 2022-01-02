/**
 * _listado
 *  {
 *      uid1: new Tarea(descripcion1),
 *      uid2: new Tarea(descripcion2),
 *      uid3: new Tarea(descripcion3),
 *  }
 * 
 */

const Tarea = require("./Tarea")

class Tareas {
    constructor () {
        this._listado = {}
    }

    get getListado () {
        const listado = []
        
        const uids = Object.keys(this._listado)
        uids.forEach(uid => {
            listado.push( this._listado[uid] )
        })

        return listado
    }

    cargarTareas ( informaciones = [] ) {
        informaciones.forEach(informacion => {
            this._listado[informacion.uid] = informacion
        })
    }

    agregarTareas ( descripcion = '' ) {
        const tarea = new Tarea(descripcion)
        this._listado[tarea.uid] = tarea
    }

    listarTareas () {
        const listado = Object.values(this._listado)
        return Tareas.generarListado(listado)
    }

    listarTareasPendientes ( pendientes = true ) {
        const listado = Object.values(this._listado)
        const listadoFiltrado = filtro(listado, pendientes)
        return Tareas.generarListado(listadoFiltrado)

        function filtro(listado = [], pendientes = true) {
            return listado.filter(tarea => !tarea.fechaCompletado === pendientes)
        }
    }

    eliminarTareaPorUID ( uid = '' ) {
        if (uid) delete this._listado[uid]
    }

    static generarListado (listado) {
        let listadoTareas = ``

        listado.forEach( (tarea, i, arr)  => {
            const index = `${i+1}.`.green
            const descripcion = tarea.descripcion
            listadoTareas += `${ index } ${ descripcion } :: ${ estaCompletado(tarea) }\n`
        })

        return listadoTareas

        function estaCompletado(tarea) {
            if (tarea.fechaCompletado) return 'Completada'.green

            return 'Pendiente'.red
        }
    }
}

module.exports = Tareas