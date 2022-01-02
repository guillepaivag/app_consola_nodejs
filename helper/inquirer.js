const inquirer = require('inquirer')
require('colors')

const preguntas = [
    {
        type: 'list',
        name: 'opcion',
        message: 'Qué desea hacer',
        choices: [
            {
                value: 1,
                name: `${ '1.'.green } Crear tarea`
            },
            {
                value: 2,
                name: `${ '2.'.green } Listar tareas`
            },
            {
                value: 3,
                name: `${ '3.'.green } Listar tareas pendientes`
            },
            {
                value: 4,
                name: `${ '4.'.green } Listar tareas completadas`
            },
            {
                value: 5,
                name: `${ '5.'.green } Completar tareas`
            },
            {
                value: 6,
                name: `${ '6.'.green } Eliminar tareas`
            },
            {
                value: 0,
                name: `${ '0.'.green } Salir`
            },
        ],
    }
]

const inquirerMenu = async () => {
    console.clear()

    console.log('========================================='.green)
    console.log('         Seleccione una opción:          '.green)
    console.log('=========================================\n'.green)

    const { opcion } = await inquirer.prompt(preguntas)
    
    return opcion
}

const pausa = async () => {
    const { continuar } = await inquirer.prompt([
        {
            type: 'confirm',
            name: 'continuar',
            message: `¿Desea ${ 'continuar'.green }?`
        }
    ])

    return continuar
}

const leerInput = async (mensaje) => {
    const { descripcion } = await inquirer.prompt([
        {
            type: 'input',
            name: 'descripcion',
            message: mensaje,
            validate(value) {
                if (value.length === 0) {
                    return 'Se debe ingresar un valor.'
                }

                return true
            }
        }
    ])

    return descripcion
}

const listadoEliminarTareas = async ( tareas = [] ) => {

    const choices = tareas.map( (tarea, i) => {
        const index = `${i+1}.`.green

        return {
            value: tarea.uid,
            name: `${index} ${tarea.descripcion}`,
        }
    })

    choices.push({
        value: 0,
        name: `${ '0.'.green } Cancelar`,
    })

    const { uid } = await inquirer.prompt([
        {
            type: 'list',
            name: 'uid',
            message: 'Borrar tarea',
            choices
        }
    ])

    return uid
}

const confirmacionEliminacion = async (message) => {
    const { ok } = await inquirer.prompt([
        {
            type: 'confirm',
            name: 'ok',
            message,
        }
    ])

    return ok
}

const listadoCheckTareas = async ( tareas = [] ) => {

    const choices = tareas.map( (tarea, i) => {
        const index = `${i+1}.`.green

        return {
            value: tarea.uid,
            name: `${index} ${tarea.descripcion}`,
            checked: !!tarea.fechaCompletado,
        }
    })

    const { uids } = await inquirer.prompt([
        {
            type: 'checkbox',
            name: 'uids',
            message: 'Seleccione',
            choices
        }
    ])

    return uids
}

module.exports = {
    inquirerMenu,
    pausa,
    leerInput,
    listadoEliminarTareas,
    confirmacionEliminacion,
    listadoCheckTareas,
}