require('colors')

const { guardarInformacion, leerInformacion } = require('./helper/informacion')
const { inquirerMenu, pausa, leerInput, listadoEliminarTareas, confirmacionEliminacion, listadoCheckTareas } = require('./helper/inquirer')
const Tareas = require('./models/Tareas')

console.clear()
const main = async () => {
    
    let opcion = -1
    let tareas = new Tareas()
    let informaciones = leerInformacion()

    if ( informaciones ) {
        // Establecer tareas
        tareas.cargarTareas(informaciones)
    }

    do {
        opcion = await inquirerMenu()
        console.log(`Opción: ${opcion}\n`)

        switch (opcion) {
            case 1:         // CREAR
                const decripcion = await leerInput('Escriba una tarea: ')
                tareas.agregarTareas( decripcion )
                guardarInformacion( tareas.getListado )
                break;

            case 2:         // LISTAR
                const listado1 = tareas.listarTareas()
                console.log(listado1)
                break;

            case 3:         // LISTAR PENDIENTES
                const listado2 = tareas.listarTareasPendientes(true)
                console.log(listado2)
                break;

            case 4:         // LISTAR COMPLETADOS
                const listado3 = tareas.listarTareasPendientes(false)
                console.log(listado3)
                break;

            case 5:         // COMPLETAR TAREAS
                const uids = await listadoCheckTareas(tareas.getListado)
                console.log('uids: ', uids)
                break;

            case 6:         // ELIMINAR TAREAS
                const uid = await listadoEliminarTareas(tareas.getListado)
                if (uid === 0) break
                const ok = await confirmacionEliminacion('¿Seguro?')
                if (ok) {
                    tareas.eliminarTareaPorUID(uid)
                    guardarInformacion( tareas.getListado )
                    console.log('¡Tarea borrada correctamente!')
                }
                break;
        
            default:

                break;
        }
        
        if (opcion !== 0) {
            const continuar = await pausa()
            if (!continuar) opcion = 0
        }

    } while (opcion !== 0)

}

main()