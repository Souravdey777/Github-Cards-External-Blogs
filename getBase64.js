const axios = require('axios');
const getBase64 = async (url) => {
    return await axios
        .get(url, {
            responseType: 'arraybuffer'
        })
        .then(response => Buffer.from(response.data, 'binary').toString('base64'))
}

module.exports = { getBase64 };