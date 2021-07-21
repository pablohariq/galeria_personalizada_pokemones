import http from 'http'
import fs from 'fs'
import {crearObjetoConImagenYNombre} from './script.js'

http
.createServer((req, res) => {
    //servir documento html en ruta base
    if (req.url == '/'){
        fs.readFile('index.html', 'utf-8', (err, data) => {
            if (err) {console.log(err)}
            res.writeHead(200, {'Content-type': 'text/html; charset=utf-8'})
            res.end(data)
        })
    }
    //entregar json con datos de pokemon solicitado por el documento html
    if (req.url == '/pokemones'){
        res.writeHead(200, {'Content-type': 'Application/json'})
        crearObjetoConImagenYNombre()
        .then((resolve) => {
            console.log(resolve)
            res.end(JSON.stringify(resolve))
        })
        // .finally(res.end())        
    }
})
.listen(3000, () => console.log('Servidor iniciado en el puerto 3000'))