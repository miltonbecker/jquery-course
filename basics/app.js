'use strict';

let main = () => {
    jQuery('h1').text('Hi, this is jQuery.');
    $('h1').append('<br/>And this is jQuery too!');
    effects();

    //----------------------
    //Descending

    //space: all children under it    
    $('#first li').text('changed');

    //>: the <li> directly under #first, not including the children's children     
    //$('#first > li').text('changed');

    $('#second .b').text('got ya');

    //,: allows me to select multiple elements
    $('#orange, .orange').css('color', '#FA3');

    $('#first li:first').text('Really first');

    //odd: 1, 3, 5...
    //There is also 'even'
    $('#first li:odd').text('Odd');

    //----------------------
    //Traversing
    //Uses more code but is faster

    $('#first').find('li');

    $('li').first();

    //second item
    $('li').first().next();

    //the one before last
    $('li').last().prev();

    //the parent ('ul')
    $('li').first().parent();

    //direct children (>)
    $('#first').children('li');

    //----------------------
    //Manipulating the DOM
    //and Creating Nodes

    let price = $('<li>$100</li>');
    $('#second').find('li').last().remove();
    $('#second').append(price);

    //----------------------
    //Events

    $('.button').on('click', function() {
        $('button').hide();
        $('button').fadeIn(1000);
    });

    //You can also specify the child element which the event will listen on
    $('.something').on('click', 'button', function() {
        $('button').hide();
        $('button').fadeIn(1000);
    });

    //You can get the 'event' as a parameter and prevent the default behavior
    $('.something').on('click', 'button', function (event) {
        event.preventDefault();

        $('button').hide();
        $('button').fadeIn(1000);
    });

    //----------------------
    //the jQuery 'this'

    $('.button-this').on('click', function() {
        $(this).hide();
        $(this).fadeIn(1000);
        
        //just an example
        //closest returns the first element that matches the selector
        //either on the set itself or on a parent 
        $(this).closest('.float-left');
    });


    //----------------------
    //HTML5 meta-data, the data tag attribute: "data-"
    //"data-anything", "data-example"

    let item1 = $('#second').find('li').first();
    let extraData = item1.data('example');
    item1.text(extraData);

    //----------------------
    //Filtering
    //filters the returned set of elements 

    let filters = $('#filters');

    let removeHighlight = function() {
        $('.result').removeClass('highlight');
    };

    filters.on('click', '.green', function () {
        removeHighlight();
        $('.result').filter('.green').addClass('highlight');
    });

    filters.on('click', '.red', function () {
        removeHighlight();
        $('.result').filter('.red').addClass('highlight');
    });

    filters.on('click', '.reset', function () {
        removeHighlight();
    });

    //----------------------
    //CSS 
    //Note: it's probably a good idea to keep the 
    //styling in the CSS

    //Single parameter
    $('.something').css('color', '#FFF');

    //Object
    $('.something').css({
        'color': '#FFF',
        'border': '1px solid black'
    });

    //----------------------
    //Animation

    $('.something').animate({ 'top': '10px' });

    $('.something').animate({ 'top': '10px' }, 2000);

    /*
    We can also do it in CSS, using CSS Transitions 

    .parent {
        transition: top 0.4s;
    }
    .addedClassOnChild {
        top: 10px;
    }
    */


};

let effects = () => {
    $('h1').hide();
    $('h1').slideDown(1000, changeColor);
};

let changeColor = () => {
    $('h1').css('color', '#F44');
};

main();

//commented it out because the script loading was moved to 
//the bottle of the html page
//this way, the page loads faster
//$(document).ready(jQueryMagic);
/*
or
$(jQueryMagic);
or
$(function() {
    ...stuff...
});
*/
