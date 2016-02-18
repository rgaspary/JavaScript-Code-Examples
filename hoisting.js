//  Hoisting.- JS moves variable declaration to the top if it does not find the declared variable. It only moves the variable declaration but not the value.

//Example 1
var thing = "a thing";

console.log(thing); //responds with "a thing".

// Example 2
console.log(thing);

var thing = "a thing"; //responds "undefined".

// Example 3
function thing() {
    console.log("a thing");
}

thing(); //responds "a thing".

// Example 4
thing();

function thing() {
    console.log("a thing");
} //responds "a thing".

// Example 5
thing();

var thing = function() {
    console.log("a thing");
} //responds "undefined".