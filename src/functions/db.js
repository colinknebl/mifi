const MongoClient   = require('mongodb').MongoClient,
      ObjectId      = require('mongodb').ObjectId,
      assert        = require('assert'),
      mongoAtlasUrl = 'mongodb://colinknebl:%^TYGHBN56tyghbn@ds115963.mlab.com:15963/mifin';

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