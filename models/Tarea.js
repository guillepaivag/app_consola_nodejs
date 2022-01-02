const { v4: uuidv4 } = require('uuid');

class Tarea {
    constructor (descripcion) {
        this.uid = uuidv4()
        this.descripcion = descripcion ? descripcion : ''
        this.fechaCompletado = null
    }

    
}

module.exports = Tarea