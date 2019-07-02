const monitorHelper = require('../Helpers/MonitorHelper');

exports.get_cpu_info =async (req, res) => {
    try{
        const data = await monitorHelper.get_cpu();
        res.send(data);
    }
    catch(err){
        res.send(err);
    }

}