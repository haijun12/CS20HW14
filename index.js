const express = require("express");
const fs = require("fs");
const PORT = process.env.PORT || 3000;

const app = express();
app.get('', (req, res) => {
    fs.readFile('index.html', function (err, txt) {
        if (err) throw (err);
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write(txt);
    });
});

app.listen(PORT);
