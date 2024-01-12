const expresss = require('express');
const app = express();

app.get('/', function(req, res)=>{
    res.set('Content-Type', 'text/html, charset=utf-8');
    res.send("<h1>Hello world!</h1>");
})

app.listen(process.env.PORT || 3000);