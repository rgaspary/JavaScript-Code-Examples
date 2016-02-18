/*  Promises are JavaScript code that runs in Async, waits for other code to finish before running.
*   - Ajax call that excecutes when a parent code finishes running.
*   - $.when().then() - "then()" can be ran in a chain multiple times after the first "when()".
*   - ES6 Generators - Every time "yield" is used in a value, it waits on a promise to resolve. In order for generators to run, include traceur.js in the project. Bluebird, co, and q are generator libraries.
*/

//Callback - Welcome to hell, or Don't do this if possible

var response1, response2, response3;

$.ajax({
  type: 'GET',
  url: 'api1.json', //GETting a JSON file acts just like hitting an API
  success: function(data1) {
    
    response1 = JSON.stringify(data1);
    // got the first response, let's go to the next one
    $.ajax({
      type: 'GET',
      url: 'api2.json'
      success: function(data2) {
        
        response2 = JSON.stringify(data2);
        // got the second response, let's go to the next one
        $.ajax({
          type: 'GET',
          url: 'api3.json',
          success: function(data3) {
            response3 = JSON.stringify(data3);
            // got the third response. Where done
          },
          error: function(xhr, status, error) {
            console.log("There was a problem. Error: " + error.toString());
          }
        });
      },
      error: function(xhr, status, error) {
        console.log("There was a problem. Error: " + error.toString());
      }
    });
  },
  error: function(xhr, status, error) {
    console.log("There was a problem. Error: " + error.toString());
  }
});

//Clean Callback - Getting better
var response1, response2, response3;

$.ajax({
  type: 'GET',
  url: 'api1.json', //GETting a JSON file acts just like hitting an API
  success: apiCall2,
  error: handleError
});

function apiCall2(data1) {
    response1 = JSON.stringify(data1);
    // got the first response, let's go to the next one
    $.ajax({
        type: 'GET',
        url: 'api2.json',
        success: apiCall3,
        error: handleError
    });
}
function apiCall3(data2) {
    response2 = JSON.stringify(data2);
    // got the second response, let's go to the next one
    $.ajax({
        type: 'GET',
        url: 'api3.json',
        success: function(data3) {
            response3 = JSON.stringify(data3);
            // got the third response. Where done
        },
        error: handleError
    });
}
function handleError(xhr, status, error) {
  console.log("There was a problem. Error: " + error.toString());
}

//Promises - This is what you should do!
var response1, response2, response3;

$.get('api1.json').then(function(data1) {
    response1 = JSON.stringify(data1);
    // got the first response, let's go to the next one
    return $.get('api2.json');
}).then(function(data2) {
    response2 = JSON.stringify(data2);
    // got the second response, let's go to the next one
    return $.get('api3.json')
}).then(function(data3) {
    response3 = JSON.stringify(data3);
    // got the third response. Where done
}, handleError);


function handleError(xhr, status, error) {
  console.log("There was a problem. Error: " + error.toString());
}

//ES6 Generators - If you do this, you're a rock star

//GENERATORS ARE AWESOME!!!!
//use with Traceur: https://github.com/google/traceur-compiler
//find out how this works: look at what-are-generators.js
var response1, response2, response3;

Promise.coroutine(function* () {
  
    var profile = yield $.get('api1.json');
    response1 = JSON.stringify(data1);
    // got the first response, let's go to the next one
  
    var tweets = yield $.get('api2.json');
    response2 = JSON.stringify(data1);
    // got the first response, let's go to the next one
  
    var friend = yield $.get('api3.json');
    response3 = JSON.stringify(data1);
    // got the first response, let's go to the next one
  
})().catch(function(errs) {
  //handle errors on any events
})

//WHAT??!!!!!!  What just happened??
//Every time you yield a value, it waits for that promise to resolve
//once it resolves, it passes it's value to the variable and resumes
//But that seems like magic.  "Wrong...it IS magic"