/* Treehouse FSJS Techdegree
 * Project 5 - Public API Requests
** scripts.js */

/*****
 * Using JQuery: Added a form element with two input elements to the <div> search-container 
********/
$('.search-container').html($('<form>', {action: "#", method: "get"}));
$('form').html($('<input>', {type: "search", id: "search-input", class: "search-input", placeholder: "Search..."}))
    .append($('<input>', {type: "submit", value: "🔍", id: "search-submit", class: "search-submit"})); 

/*****
 * Using JQuery: Added the necessary elements to form the gallery cards - which contain employee's photo, first/last name as well as city/state 
********/
$('.gallery').html($('<div>', {class: "card"}));
$('.card').html($('<div>', {class: "card-img-container"}));
$('.card-img-container').html($('<img>', {class: "card-img", src: "https://placehold.it/90x90", alt: "profile picture"}));
$('.card').append($('<div>', {class: "card-info-container"}));
$('.card-info-container').html($('<h3>first last</h3>', {id: "name", class: "card-name cap"}))
    .append($('<p>email</p>', {class: "card-text"}))
    .append($('<p>city, state</p>', {class: "card-text cap"}));

/*****
 * Using JQuery: Added the necessary elements to form the gallery cards - which contain employee's photo, first/last name as well as city/state 
********/
