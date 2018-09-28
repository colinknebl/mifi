const MongoClient   = require('mongodb').MongoClient,
      ObjectId      = require('mongodb').ObjectId,
      assert        = require('assert'),
      mongoUrl      = 'mongodb://test:ASDF1234asdf@ds115963.mlab.com:15963/mifi';

MongoClient.connect(mongoUrl, (err, db) => {

    assert.equal(null, err); 

    db.collection('users').find({
        "name": "Leanne Graham"
    })
    .toArray((err, user) => {
        console.log('user :', user);
        if (user.length === 0) {
            // callback(null, {
            //     statusCode: 200,
            //     body: 'error getting user: Leanne Graham'
            // });
        }
        else {
            // callback(null, {
            //     statusCode: 200,
            //     body: JSON.stringify(user)
            // });
        }
      });
    db.close();
});