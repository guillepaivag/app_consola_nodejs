const fs = require('fs')
// const path = require('path')

const archivo = './db/data.json'

const guardarInformacion = ( data ) => {
    fs.writeFileSync( archivo, JSON.stringify( data ) )
}

const leerInformacion = () => {
    if ( !fs.existsSync(archivo) ) return null

    const info = fs.readFileSync(archivo, {
        encoding: 'utf-8',
        
    })

    return JSON.parse(info)
}

module.exports = {
    guardarInformacion,
    leerInformacion,
}