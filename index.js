const express = require("express");
const fs = require("fs");
const PORT = process.env.PORT || 3000;
const { MongoClient } = require("mongodb");
const bodyParser = require("body-parser");
let uri = "mongodb+srv://haijun:lala12345@companies.zke0a.mongodb.net/stock_ticker?retryWrites=true&w=majority";
const app = express();

app.get('', (req, res) => {
    fs.readFile('index.html', function (err, txt) {
        if (err) throw (err);
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write(txt);
    });
});

const client = new MongoClient(uri);

app.use(bodyParser.urlencoded({
    extended:true
}))
app.get("/process", function(req,res) {
    res.sendFile(__dirname + "/index.html");
})

app.post("/process", function(req, res) {
    var Ticker = String(req.body.ticker);
    var Company = String(req.body.company);
    async function run() {
        try {
            await client.connect();
            
            const dbo = client.db('stock_ticker');
            const companies = dbo.collection('companies');
            console.log(Company);
            
            if (Ticker == '')
            {
                const Query = {Company: Company};
                console.log(Query);
                const display = await companies.findOne(Query);
                res.send(display.Company + " : " + display.Ticker);
            }
            else if (Company == '')
            {
                const display = await companies.find({Ticker: Ticker}, {projection: {_id: 0, Company: 1, Ticker: 1}})
                .toArray();
                res.writeHead(200, {'Content-Type': 'text/html'});
                for (i = 0; i < display.length; i++)
                {
                    res.write(display[i].Company + " : " + display[i].Ticker + "<br>");
                }
            }
            else {
                const Query = {Company: Company, Ticker: Ticker};
                console.log(Query);
                const display = await companies.findOne(Query);
                res.send(display.Company + " : " + display.Ticker);
            }
        } finally {
            await client.close();
        }
    }
    run().catch(console.dir);

})

app.listen(PORT);
