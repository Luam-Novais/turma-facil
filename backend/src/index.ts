import express from "express"

const server = express()

server.listen(3000, ()=>[
    console.log('Hello word, Servidor rodando em porta 3000.')
])