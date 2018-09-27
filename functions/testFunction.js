exports.handler = function(event, context, callback) {
    console.log('event :', event);
    /** 
     * Example event: https://www.netlify.com/docs/functions/?_ga=2.197964015.1190221458.1538051666-1368358231.1535722306
        {
            "path": "Path parameter",
            "httpMethod": "Incoming request's method name"
            "headers": {Incoming request headers}
            "queryStringParameters": {query string parameters }
            "body": "A JSON string of the request payload."
            "isBase64Encoded": "A boolean flag to indicate if the applicable request payload is Base64-encode"
        }
     */
    /**
     * Example context: https://www.netlify.com/docs/functions/?_ga=2.197964015.1190221458.1538051666-1368358231.1535722306
        {
            "isBase64Encoded": true|false,
            "statusCode": httpStatusCode,
            "headers": { "headerName": "headerValue", ... },
            "body": "..."
        }
     */
    console.log('context :', context);
    callback(null, {
        statusCode: 200,
        body: "Hello, World"
    });
};