var axios = require("axios").default;
const requestApi = () => {
    var options = {
        method: 'GET',
        url: 'https://mashape-community-urban-dictionary.p.rapidapi.com/define',
        params: { term: 'wat' },
        headers: {
            'x-rapidapi-host': 'mashape-community-urban-dictionary.p.rapidapi.com',
            'x-rapidapi-key': 'e0ae1c6d3emsh57fefa28fcb6e95p11c524jsneb4ddd2ca25a'
        }
    };

    axios.request(options).then(function (response) {
        console.log(response.data);
    }).catch(function (error) {
        console.error(error);
    });
}
module.exports = { requestApi };

// const request = require('request')
// const Image = require('./models/Picture')

// const dotenv = require('dotenv')
// dotenv.config()


// const requestApi = () => {
//     return new Promise((resolve, reject) => {
//         console.log('requestApi');
//         let options = {
//             method: 'GET',
//             url: `https://api.nasa.gov/planetary/apod?api_key=${process.env.API_KEY}`
//         }
//         request(options, (err, res, body) => {
//             if (err)
//                 reject(err)
//             else {
//                resolve(body)
//             }
//         })
//     })
// }

// module.exports = { requestApi };