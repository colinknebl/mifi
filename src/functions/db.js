const MongoClient   = require('mongodb').MongoClient,
      ObjectId      = require('mongodb').ObjectId,
      assert        = require('assert'),
      mongoAtlasUrl = 'mongodb://colinknebl:special25@wodapp-shard-00-00-ihelb.mongodb.net:27017,wodapp-shard-00-01-ihelb.mongodb.net:27017,wodapp-shard-00-02-ihelb.mongodb.net:27017/wodapp?ssl=true&replicaSet=wodapp-shard-0&authSource=admin';

exports.handler = function(event, context, callback) {

    MongoClient.connect(mongoAtlasUrl, (err, db) => {
        assert.equal(null, err); 
        db.collection('users').find({
            "name": "Leanne Graham"
        })
        .toArray((err, user) => {
            if (user.length === 0) {
                callback(null, {
                    statusCode: 200,
                    body: 'error getting user: Leanne Graham'
                });
            }
            else {
                callback(null, {
                    statusCode: 200,
                    body: JSON.stringify(user)
                });
            }
          });
        db.close();
    });

    
}