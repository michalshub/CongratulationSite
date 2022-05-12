let express = require('express')
let app = express()
let nodemailer = require('nodemailer')
const dotenv = require('dotenv');
dotenv.config();

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'CongratulationsWebsite@gmail.com',
        pass: 'mirelandmichal'
    }
});

var mailOptions = {
    from: 'CongratulationsWebsite@gmail.com',
    to: 'CongratulationsWebsite@gmail.com',
    subject: 'מזל טובבבבבב!!!!',
    text: 'אני באמצע לראות את ההסרטה ולעשות שיעורי בית'
};


const send = async (req, res) => {
    transporter.sendMail(
        { from: mailOptions.from, to: req.body.to, subject: req.body.sub, text: req.body.txt ,html : req.body.html }
        , function (error, info) {
            if (error) {
                console.log("oupssss" + error);
                res.send({ status: "fail" })
            }
            else {
                res.send({ status: "success" })
                console.log('Email sent:' + info.response);
            }
        })
};

const requestApi = () => {
    console.log('requestApi');
    let options = {
        method: 'GET',
        url: ' https://secure.arkom.co.il/wsdev/MTS_WebService.asmx'
    }
    request(options, (err, res, body) => {
        console.log(res);
        if (err)
            console.log(err);
        else {
            console.log('body:', body);
        }
    })
}
module.exports = { send }
// app.listen(3000, () => {
//     console.log('listening in port 3000');
// })