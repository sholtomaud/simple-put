#!/usr/bin/env node

'use strict';
const http = require('http');
const startUsage = process.cpuUsage();

let memory = {
    maxTotal: 0,
    maxUsed: 0,
    maxExternal: 0
};

var server = http.createServer(function (req, res) {
  
  let dataLength = ''; 
  
  req.on('data', function (chunk) {
    dataLength += chunk.length;
    let processMemory = process.memoryUsage();
    memory.maxTotal = ( Number(processMemory.heapTotal) > Number(memory.maxTotal) ) ? processMemory.heapTotal : memory.maxTotal;
    memory.maxUsed = (  Number(processMemory.heapUsed) >  Number(memory.maxUsed) ) ? processMemory.heapUsed : memory.maxUsed;
    memory.maxExternal = (  Number(processMemory.external) >  Number(memory.maxExternal) ) ? processMemory.external : memory.maxExternal;
  })
  .on('end', function () {  // done
    process.stdout.write('END process.memoryUsage: '+ JSON.stringify(memory) + '\r');
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    dataLength = '';
    res.end();
  });

});

server.listen(8082, '127.0.0.1');  // start