var app = require('./app');

var server = app.listen(3001, function(){
    console.log("Server is running on port 3001");
});
