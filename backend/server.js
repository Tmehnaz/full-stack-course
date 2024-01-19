const http = require('http');
const express = require('./rest.js');
const server = http.createServer(express)

const PORT = process.env.PORT || 3000;

server.listen(PORT, console.log(`Running on ${PORT}`));