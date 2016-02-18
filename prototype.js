/*  Prototype is a function that gives a set of rules and properties to an object or variable.
*   Prototypes use constructors and may remind us of classes on other languages.
*   NOTE: PROTOTYPES DO NOT WORK LIKE CLASSES.
*/

// Constructor Example
var cars = function(color, sound) {
    this.color = color;
    this.sound = sound;
    this.honk = function() {
        alert("The car goes " + this.sound);
    };
};

var honda = new cars("black", "meep");

// ES6 Prototype Object Example
const food = {
    init: function(type) {
        this.type = type;
    },
    eat: function() {
        console.log("you ate the " + this.type);
    }
}

const waffle = Object.create(food);
waffle.init('waffle');
waffle.eat();