const express = require('express');
const path = require('path');
const app = express();

app.use(express.static(path.join(__dirname, 'build')));
// app.use(function (req, res, next) {
//     res.headers("Access-Control-Allow-Origin", "*");
//     res.headers("Access-Control-Allow-Methods", "POST", "GET", "OPTIONS", "DELETE");
//     res.headers("Access-Control-Max-Age", "3600");

//     res.headers("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     next();
// })
app.use('/api/data', require('./api/data'));

app.get('/*', function(req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});
console.log("listen to port:9000")
app.listen(9000);