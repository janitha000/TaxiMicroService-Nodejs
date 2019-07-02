const axios = require('axios');
const logger = require('winston');

exports.GET = async (url) => {
    try {
        const response = await axios.get(url);
        if (response.status == 200){
            logger.info(response.data);
            return response.data;
        }
        else{
            logger.info(resposnse.status);
        }
        
    }
    catch (err) {
        logger.error("Error " + err);
    }
}