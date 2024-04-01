const express = require('express'),
      server = express();

//serving static files, such as CSS files
server.use(express.static('css'));
server.use(express.static('images'));

//setting the port.
server.set('port', process.env.PORT || 3000);

// Require controller module
const openai_api = require("./openai");

//Adding routes
server.get('/',(request,res)=>{
 res.sendFile(__dirname + '/index.html');
});

server.get('/api', openai_api.menu);

//Binding to localhost://3000
server.listen(3000,()=>{
 console.log('Express server started at port 3000');
});