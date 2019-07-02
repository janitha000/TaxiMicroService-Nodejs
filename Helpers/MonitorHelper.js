const os = require('os');

exports.get_cpu = () => {
    return os.cpus();
}