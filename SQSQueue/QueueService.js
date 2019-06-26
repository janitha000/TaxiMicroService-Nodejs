var AWS = require('aws-sdk');
var logger = require('../Util/winston')
AWS.config.update({region : 'us-east-1'});


exports.SendMessagetoSQS = function(username)  {
    var sqs = new AWS.SQS({apiVersion: '2012-11-05'});
    var params = {
        DelaySeconds: 10,
        MessageAttributes: {
          "Title": {
            DataType: "String",
            StringValue: "TaxiMicroServiceNodeServer"
          },
          "Author": {
            DataType: "String",
            StringValue: "Nodejs Server"
          }
        },
        MessageBody: "User " + username + " logged in to the system" ,
        QueueUrl: "https://sqs.us-east-1.amazonaws.com/914556018196/AuthEmailQueue"
    }

    return new Promise(function(resolve, reject){
        sqs.sendMessage(params, function(err, data){
            if(err){
                logger.error(err)
                reject(err)
            }else{
                logger.info("email sent data " + data);
                resolve(data)
            }
        })
    }) 
}