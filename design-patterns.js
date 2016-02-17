// Creational Patterns

// Example 1
var obj = {};

obj.firstName = "Renzo";
obj["lastName"] = "Gaspary";

// Example 2
Object.defineProperty(obj, "country", {
  value: "USA"
});

// Example 3
Object.defineProperties(obj, {
  twitter: {
    value: "renzo_gaspary"
  },
  email: {
    value: "me@renzogaspary.com"
  }
});

// Generating objects with object create
// This builds a prototype chain

// Example
var johnDoe = {
  firstName: "John",
  lastName: "Doe",
  sayName: function() {
    return "My name is " + this.firstName + " " + this.lastName;
  }
};

var janeDoe = Object.create(johnDoe, {
  firstName: {
    value: "Jane"
  }
});

alert(johnDoe.sayName());
alert(janeDoe.sayName());

/*###################################################################################################*/

// Constructor Pattern
// Constructor functions are determined by capitalizing the first letter of the function name

function Person(firstName, lastName) {
  this.firstName = firstName;
  this.lastName = lastName;
  
  // this.sayName = function() {
  //   return "My name is " + this.firstName + " " + this.lastName;
  // }
  
  // This method consumes extra memory because every time a new Person is created, a new sayName function is created with it, this also creates an inheritance problem.
}
// To solve this we need to use a prototype function outside the Person function.
Person.prototype.sayName = function() {
  return "My name is " + this.firstName + " " + this.lastName;
}
// Now every Person object created can share the same sayName function and use less memory.

/*###################################################################################################*/

// Inheritance Pattern
function Beverage(name, temperature) {
  this.name = name;
  this.temperature = temperature;
}

Beverage.prototype.drink = function() {
  console.log("I'm drinking " + this.name);
};

function Coffee(type) {
  Beverage.call(this, "coffee", "hot");
  this.type = type;
}

Coffee.prototype = Object.create(Beverage.prototype);
Coffee.prototype.sip = function(){
  console.log("Sipping some awesome " + this.type + " " + this.name);
};

var water = new Beverage("water", "cold");
var coffee = new Coffee("bold", "roast");

/*###################################################################################################*/

// Mixin Pattern
// Mixins allow us to reuse the same functionality and allow us to reduce the amount of duplication to the code. However, this makes code a bit harder to read without having good documentation.

function extend(target) {
  if (!arguments[1]){
    return;
  }
  
  for (var ii = 0, ll = arguments.length; ii < ll; ii++){
    var source = arguments[ii];
    
    for (var prop in source) {
      if (!target[prop] && source.hasOwnProperty(prop)) {
        target[prop] = source[prop];
      }
    }
  }
}

function Person(name) {
  this.name = name;
}

function Dog(name) {
  this.name = name;
}

var speaker = {
  speak: function() {
    return this.name + " is speaking.";
  }
};

var mover = {
  walk: function() {
    return this.name + " is walking.";
  },
  run: function() {
    return this.name + " is running.";
  }
};

var arithmetic = {
  add: function() {
    return this.name + " is adding numbers together.";
  },
  multiply: function() {
    return this.name + " is multiplying numbers together.";
  }
}

// .extend is a jQuery function
// $.extend(Person.prototype, speaker, mover, arithmetic);
// $.extend(Dog.prototype, speaker, mover);

extend(Person.prototype, speaker, mover, arithmetic);
extend(Dog.prototype, speaker, mover);

var john = new Person("John Doe");
var fido = new Dog("Fido");

// Another example of mixins

var toolbar = new Toolbar("myToolbar"); // Declared elsewhere.
var toggle = document.getElementById("itemStateToggle"); // Declared elsewhere.

toggle.addEventListener("click", function(e) {
  e.target.toggleActiveState();
  e.preventDefault();
});

function mixin(target, source, methods) {
  for (var ii = 2, ll = arguments.length; ii < ll; ii++) {
    var method = arguments[ii];
    target[method] = source[method];
  }
}

mixin(toggle, toolbar.items[0], "toggleActiveState");

/*###################################################################################################*/

// The Decorator Pattern

function Coffee() {
  
}

Coffee.prototype.cost = function() {
  return 5;
};

function small(coffeeObj) {
  
}

var coffee = new Coffee();
