
var soap = require('soap');
var url = 'https://secure.arkom.co.il/wsdev/MTS_WebService.asmx?wsdl';
var args = {
    TerminalNum: "0000010"
    , TerminalPassword: "0000010"
    , TransSUM: "2.5"
    , TransTASH: "1"
    , TransREF: "455"
    , TransCurrency: "376"
    , CreditType: "0"
    , CustomerEmail: "mirelovadya@gmail.com"
    , ReturnURL: "http://localhost:3000/paymentPageResult"
    , Header_1: ""
    , Header_2: ""
    , Footer_1: ""
    , Language: ""
    , TransID: ""
}
let TransactionID = "";


async function ff() {

    try {
        let client = await soap.createClientAsync(url);
        // console.log(client);
        // let result = await client.MTS_PingAsync({TerminalNum:"0000010",Password:"0000010"});
        // let result = await client.MTS_Redirect_GetTransIDAsync(args);
        // console.log('56', result[0].TransID);
        let result = await client.MTS_Redirect_GetTransResultAsync({ TerminalNum: "0000010", TerminalPassword: "0000010", TransID: "44560QDFF5FD505A49400992B65A8798CC0A", TransResult: "" });
        // let result1 = await client.MTS_GetTransactionResultsAsync({TerminalNum:"0000010",Password:"0000010" ,TransactionID:"44560QDFF5FD505A49400992B65A8798CC0A",TransResult:"",Answer:"",MerchantNote:"",ClientNote:""});
        let result2 = await client.MTS_GetErrorDescriptionAsync({ TerminalNum: "0000010", Password: "0000010", TransactionID: "44560QDFF5FD505A49400992B65A8798CC0A", ErrorCode: 447, ErrorDesc: "" });
        console.log('48', result);
        // console.log('48', result1);
        console.log('49', result2[0].ErrorDesc);
        // Response.Redirect("https://secure.arkom.co.il/GetPaymentMini/GetPayment2.aspx?TransID=~" +
        // TransID, True)
    }
    catch (err) {
        console.log('49', err);
    }
}


const createTransactionId = async (req, res) => {
    try {
        let client = await soap.createClientAsync(url);
        let result = await client.MTS_Redirect_GetTransIDAsync(args);
        TransactionID = result[0].TransID;
        res.send({ TransID: TransactionID })
    }
    catch (err) {
        console.log('61', err);
    }
}
const getTransactionId = async (req, res) => {
    try {
        res.send({ TransID: TransactionID })
    }
    catch (err) {
        console.log('69', err);
    }
}
const createTransactionId2= async (req, res) => {
    try {
        console.log("hi");
        let client = await soap.createClientAsync(url);
        // let result = await client.MTS_PingAsync({TerminalNum:"0000010",Password:"0000010"});
        let result = await client.MTS_GetTransactionIDAsync({TerminalNum:"0000010",Password:"0000010",TransactionID:""});
        console.log('59', result);
        console.log('56', result[0].TransactionID);
        TransactionID = result[0].TransactionID;
        res.send({ TransID: TransactionID })
    }
    catch (err) {
        console.log('49', err);
    }
}


const getResult = async (req, res) => {
    try {
        let client = await soap.createClientAsync(url);
        let result = await client.MTS_Redirect_GetTransResultAsync({ TerminalNum: "0000010", TerminalPassword: "0000010", TransID: TransactionID, TransResult: "" });
        let p = result[0].TransResult.substring(0, 3);
        console.log('79 '+p);
        let result2 = await client.MTS_GetErrorDescriptionAsync({ TerminalNum: "0000010", Password: "0000010", TransactionID: TransactionID, ErrorCode: p, ErrorDesc: "" });
        console.log('81 ', result);
        // console.log('48', result1);
        console.log('83 ', result2[0].ErrorDesc);
        res.send({ message: result2[0].ErrorDesc })
    }
    catch (err) {
        console.log('49', err);
    }
}

module.exports = { getTransactionId, createTransactionId, getResult }

        // let result = await client.MTS_GetTransactionIDAsync(args2);
