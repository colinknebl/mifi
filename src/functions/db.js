const MongoClient   = require('mongodb').MongoClient,
      ObjectId      = require('mongodb').ObjectId,
      assert        = require('assert'),
      mongoUrl      = 'mongodb+srv://test:t6hlm2E3C8P1ypti@cluster0-97izx.mongodb.net/test?retryWrites=true';

exports.handler = function(event, context, callback) {

    MongoClient.connect(mongoUrl, { useNewUrlParser: true }, function(err, client) {
        assert.equal(null, err);
        
        const query = {
            firstName: "Colin"
        }
    
       const collection = client.db("mifi").collection("users");
       collection.find(query).toArray((err, data) => {
            if (err) console.error(err);
    
            console.log('data :', data);

            let headers = {
                'Access-Control-Allow-Origin':'*',
                'Content-Type': 'application/json'
            };
            callback(null, {
                statusCode: 200,
                mode: 'no-cors',
                header: headers,
                body: JSON.stringify(data[0])
            });
       })
       client.close();
    });

    
}