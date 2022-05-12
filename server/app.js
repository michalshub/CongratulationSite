const express = require('express');
const mongoose = require('mongoose');
const router = require('./routes/api');
const bodyParser = require('body-parser');
const open = require('open');

const dotenv = require('dotenv');
dotenv.config();

const cors = require('cors');

const app = express();

app.use(bodyParser.json({ limit: "500mb", extended: false }));
app.use(bodyParser.urlencoded({
    limit: "500mb",
    extended: false
}));


app.use(cors());

const connectionParams = {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
}

mongoose.connect(process.env.DB_CONNECT, connectionParams)
    .then(() => {
        console.log("connected to db");
    })
    .catch((err) => {
        console.log("error" + err);
    })



app.use('/', router)

app.get('/paymentPageResult', (req, res) => {
    console.log("kkk");
    //http://localhost:3400/paymentPageResult
    open('http://localhost:3000/paymentPageResult', function (err) {
        if (err) throw err;
    });
    // window.open( "http://localhost:3000/paymentPageResult", "_blank");
    // res.redirect('http://localhost:3000/paymentPageResult');
});


// const requestApi = () => {
//     console.log('requestApi');
//     let options = {
//         method: 'GET',
//         url: 'https://restcountries.eu/rest/v2/capital/jerusalem'
//     }
//     request(options, (err, res, body) => {
//         if (err)
//             console.log(err);
//         else {
//             console.log('body:', body);
//         }
//     })
// }
app.listen(3400, () => {
    console.log('listening at port 3400');
})


// requestApi()