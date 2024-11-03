const mongoose = require('mongoose');
const dbURI =
"mongodb+srv://julius:nLcd!r9kfhq6@cluster0.00wzfxg.mongodb.net/Localbites?retryWrites=true&w=majority";
try {
mongoose.connect(
dbURI,
{ useNewUrlParser: true, useUnifiedTopology: true }).then(
() => {console.log(" Mongoose is connected")},
err=> {console.log(err)}
);
}
catch (e) {
console.log("could not connect");
}
require('./users');
require('./location');
require('./review')