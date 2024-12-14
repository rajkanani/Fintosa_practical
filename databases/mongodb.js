var mongoose = require("mongoose");
mongoose.Promise = global.Promise;
// Connect to MongoDB
mongoose.connect(process.env.MONGODB_CONN).then(
    () => {
        console.log('mongodb connected');
    },
    err => {
        console.log(err);
    }
);
var glob = require("glob"),
    path = require("path");
glob.sync("./databases/models/*").forEach(function (file) {
    require(path.resolve(file));
});