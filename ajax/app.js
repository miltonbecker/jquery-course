'use strict';

$('.product').on('click', '.show-comments', function () {

    let button = this;

    $.ajax('comments.html', {
        'success': function (response) {
            $(this).closest('.product').find('.comments').html(response).toggle('fast');
        },
        'error': function (request, errorType, errorMessage) {
            console.log(`errorType: ${errorType}
                        errorMessage: ${errorMessage}`);
        },
        context: button
    });

    //the call above is equivalent to 
    let equivalentTo = function () {
        $.get('comments.html', (response) => {
            $(this).closest('.product').find('.comments').html(response).toggle();
        });
    };
});

$('form').on('submit', function (event) {
    event.preventDefault();
    let form = $(this);

    $.ajax('buy.json', {
        type: 'POST',
        contentType: 'application/json',
        dataType: 'json',
        data: form.serialize(),
        success: function (response) {
            form.remove();
            let confirmation = $('<p class=\'confirmation\'></p>');
            if (response.result === true) {
                confirmation.append('You bought it!');
            } else {
                confirmation.append('There was an error :(');
            }
            $('.show-comments').before(confirmation);
            $('.confirmation').hide().fadeIn('fast');
        }
    });
});

//$('form').serialize() 
//is the same as getting the values of all inputs, like: 
//{ 'quantity': $('#quantity').val() }

$('.product').on('keyup keypress', '.quantity', function () {
    let value = $(this).val();
    if ($.isNumeric(value) === false) {
        $(this).val(value.slice(0, -1));
    }
});

$('.product').on('focusout', '.quantity', function () {
    let value = $(this).val();
    if ($.isNumeric(value) === false) {
        $(this).val(1);
    }
});

let sendParameters = function () {
    //this is equivalent to 'comments.html?someData=123'
    $.ajax('comments.html', {
        'success': (response) => {
            $(this).closest('.product').find('.comments').html(response).toggle();
        },
        'data': { 'someData': '123' }
    });
};

let moreOptions = function () {
    let product = this;

    $.ajax('comments.html', {
        'success': (response) => {
            $(this).closest('.product').find('.comments').html(response).toggle();
        },
        'data': { 'someData': '123' },
        'error': function (request, errorType, errorMessage) {
            console.log(`errorType: ${errorType}
                        \nerrorMessage: ${errorMessage}`);
        },
        'timeout': 3000, //ms
        'beforeSend': function () {
            //add a spinner to the screen
            //so the user knows it is processing
        },
        'complete': function () {
            //runs after either success or error
            //good place to remove the spinner 
        },
        //the context changes the value of 'this' used within
        //jQuery's callbacks 
        'context': product
    });
};

let shortHand1 = function () {
    $.get('url', function (response) {

    });
    //shorthand for 
    $.ajax('url', {
        success: function (response) {

        }
    });
}

let shortHand2 = function () {
    $.getJSON('url', function (response) {

    });
    //shorthand for 
    $.ajax('url', {
        dataType: 'json',
        success: function (response) {

        }
    });
}

//----------------------

//If I add an event handler to an element that doesn't exist yet, 
//the event is not going to work, for example:
$('.does-not-exist-yet').on('click', function () { });

//So, in this case, we should use an event delegation
$('.parent-which-exists').on('click', '.does-not-exist-yet', function () { });

//----------------------

//One way to organize the code is to use JavaScript Objects
//So we add the events bindings to JS Objects' keys/functions 
//And then just call them

//OR 

//We can use Constructor Functions 
//Which are even better 
//And allow us to reuse the same function for different elements
//e.g.
function CapitalizedName(product, element) {
    this.product = product;
    this.element = element;
}

CapitalizedName.prototype = {
    commonFunctions: function () {
    }
}

let mouse = new CapitalizedName('mouse', $('.something'));
let keyboard = new CapitalizedName('keyboard', $('.anotherThing'));

//----------------------

//Utility methods

let each = function () {
    $.each(collection, function (index, object) {
        //for each item in the collection, 
        //call the function passing the index and the object  
    })
};

let map = function () {
    let firstArray = [ 1, 2, 3, 4 ];
    let secondArray = $.map(firstArray, function (item, index) {
        return item + 1;
    });
    //map returns an array that is the modified version of the array it received
    //here, secondArray is [2, 3, 4, 5]
};

//----------------------
//There is a way to turn off the event handlers on an element 

//For example
$('.some-element').off('click');
//This will turn off watching for the 'click' event on that element, i.e., no 'click' event handler will be executed 

//----------------------
//Namespaced Events   

$('.some-element').on('click.thor', function () { });
//This click handler is named 'thor'

//This is useful if we want to turn off only this event 
$('.some-element').off('click.thor');

//Or if we want to turn off all event handlers named 'thor'
$('.some-element').on('click.thor', function () { });
$('.some-element').on('keydown.thor', function () { });
$('.some-element').on('keypress.thor', function () { });

$('.some-element').off('.thor');
//This will turn off all 3 handlers above

//----------------------
//Triggering Events 

$('.some-button').trigger('click');

$('.some-button').trigger('click.thor');

//----------------------
//Custom Events

//Guess what, you can create any event you want 
$('some-element').on('lol', function () { });

//Then you have to trigger it by code 
$('some-element').trigger('lol');

//----------------------
//Plugins 
//It's like JavaScript's prototype 
//You add a function which every jQuery element can invoke 
//It's useful when we need to use the same function elsewhere 

$.fn.yell = function () {
    console.log('Yelling: ' + $(this).text().toUpperCase());
};

$('<p>hi there</p>').yell();

//----------------------
//Promises 
//There is a jQuery way of creating Promises

let promise = $.Deferred();

let result, result2 = 'bla';

//resolve calls done
promise.resolve(result);
promise.done(function (result) { });

//reject calls fail
promise.reject(result);
promise.fail(function (result) { });

//The ajax methods return a promise object

let promise2 = $.ajax('buy.json');

//There is also a way to wait until all promises are done processing 

$.when(promise.resolve(result), promise2)
    .then(function (result, result2) {
        console.log('success');
    })
    .catch(function (error, errorMessage) {
        console.log(errorMessage); 
    });