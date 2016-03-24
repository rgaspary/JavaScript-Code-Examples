/**
 * Created by renzogaspary on 3/23/16.
 */
/* Save a JS object into an external JSON file */

var fs = require("fs");
var myJson = {
    key: "myvalue"
};

fs.writeFile("filename.json", JSON.stringify(myJson), "utf8", function(err) {
    if (err) {
        throw err;
    }
    console.log(JSON.stringify(myJson));
});