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
// This pattern allows us to add extra functionality to an object, but the key thing to remember is that it does not change the interface of that object.

// Without inheritance

function Coffee() {
  // This constructor is left empty on purpose
}

Coffee.prototype.cost = function() {
  return 5;
};

Coffee.small = function(coffeeObj) {
  var cost = soffeeObj.cost();

  coffeeObj.cost = function() {
    return cost - 1;
  };
};

Coffee.medium = function(coffeeObj) {
  // This constructor is left empty on purpose
};

Coffee.large = function(coffeeObj) {
  var cost = soffeeObj.cost();

  coffeeObj.cost = function() {
    return cost + 1;
  };
};

Coffee.sugar = function(coffeeObj) {
  var cost = soffeeObj.cost();

  coffeeObj.cost = function() {
    return cost + .15;
  };
};

Coffee.creamer = function(coffeeObj) {
  var cost = soffeeObj.cost();

  coffeeObj.cost = function() {
    return cost + .15;
  };
};

Coffee.whippedCream = function(coffeeObj) {
  var cost = soffeeObj.cost();

  coffeeObj.cost = function() {
    return cost + .15;
  };
};

Coffee.milk = function(coffeeObj) {
  var cost = soffeeObj.cost();

  coffeeObj.cost = function() {
    return cost + .15;
  };
};
Coffee.foam = function(coffeeObj) {
  var cost = soffeeObj.cost();

  coffeeObj.cost = function() {
    return cost + .15;
  };
};
Coffee.chocolate = function(coffeeObj) {
  var cost = soffeeObj.cost();

  coffeeObj.cost = function() {
    return cost + .15;
  };
};

Coffee.mocha = function(coffeeObj) {
  Coffee.milk(coffeeObj);
  Coffee.foam(coffeeObj);
  Coffee.chocolate(coffeeObj);

  var cost = coffeeObj.cost();

  coffeeObj.cost = function() {
      return cost;
  }
};

var coffee = new Coffee();
var mocha = new Coffee();

// With inheritance
function Beverage() {
  this._cost = 0;
}

Beverage.prototype.cost = function() {
  return this._cost;
}

function BeverageDecorator(beverage) {
  Beverage.call(this);
  this.beverage = beverage;
}

BeverageDecorator.prototype = Object.create(Beverage.prototype);
BeverageDecorator.prototype.cost = function() {
  return this._cost + this.beverage.cost();
};

funciton Small(beverage) {
  BeverageDecorator.call(this, beverage);
  this._cost = -1;
}

Small.prototype = Object.create(BeverageDecorator.prototype);

funciton Sugar(beverage) {
  BeverageDecorator.call(this, beverage);
  this._cost = .15;
}

Sugar.prototype = Object.create(BeverageDecorator.prototype);

function Coffee() {
  Beverage.call(this);
  this._cost = 5;
}

Coffee.prototype = Object.create(Beverage.prototype);

var coffee = new Coffee();
coffee = var Small(coffee);
coffee = var Sugar(coffee);


/*###################################################################################################*/

// The Basic Module Pattern
