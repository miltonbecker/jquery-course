'use strict';

$('.product').on('click', 'button', function () {

    let button = this;

    $.ajax('comments.html', {
        'success': function(response) {
            $(this).closest('.product').find('.comments').html(response).toggle();
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
