/* Treehouse FSJS Techdegree
 * Project 5 - Public API Requests
** scripts.js */

var cardsArr = [];

// Search function... 
const searchNames = () => {
    let filter, txtValue;
    filter = $('.search-input').val().toLowerCase();
    console.log(filter);
    
    for (let i = 0; i < $('.card').length; i ++) { 
       list = $('.card')[i].querySelectorAll('.card-info-container h3')[0];
       txtValue = list.textContent || list.innerText;
       if (txtValue.toLowerCase().indexOf(filter) > -1) {
          $('.card')[i].style.display = "";
          cardsArr.push($('.card')[i]);
       } else {
        $('.card')[i].style.display = "none";
       }
    }
    // if ( $('.search-input').val() === 0 ) {
    //     return cardsArr;
    // }
}


// API function from randomuser.me
$.ajax({
    url: 'https://randomuser.me/api/?results=12',
    dataType: 'json',
    success: function(data) {
    
        /*****
         * Using JQuery: This functions adds the necessary elements to form modal card...
         * All the code below is contained in the "modal-container" <div>.  
        ********/
        const modal = (card) => {

            var fName = data.results[card].name.first;
            var lName = data.results[card].name.last;
            var fullName = `${fName} ${lName}`;
            var email = data.results[card].email;
                
            var phone = data.results[card].phone;
            var street = data.results[card].location.street;
            var city = data.results[card].location.city;
            var state = data.results[card].location.state;
            var postcode = data.results[card].location.postcode;
            var birthday = new Date(data.results[card].dob.date);
        
            $('.gallery').after($('<div>', {class: "modal-container"}));
                $('.modal-container').html($('<div>', {class: "modal"}))
                $('.modal').html($('<button><strong>X</strong></button>'))
                    .append($('<div>', {class: "modal-info-container"}));
                $('button').addClass("modal-close-btn").attr('id', "modal-close-btn");
                $('.modal-info-container').html($('<img>', {class: "modal-img", src: `${data.results[card].picture.large}`, alt: "profile picture"}))
                    .append($('<h3>', {id: "name", class: "modal-name cap"}).html(`${fullName}`))
                    .append($('<p>', {class: "modal-text"}).html(`${email}`))
                    .append($('<p>', {class: "modal-text cap"}).html(`${city}`))
                    .append($('<hr>'))
                    .append($('<p>', {class: "modal-text"}).html(`${phone}`))
                    .append($('<p>', {class: "modal-text"}).html(`${street}, ${state}, ${postcode}`))
                    .append($('<p>', {class: "modal-text"}).html(`Birthday: ${birthday.getMonth()+1}/${birthday.getDate()}/${birthday.getFullYear()}`));
                $('.modal-container').append($('<div>', {class: "modal-btn-container"}));
                $('.modal-btn-container').html($('<button>Prev</button>').addClass("modal-prev btn").attr('id', "modal-prev"));
                $('.modal-btn-container').append($('<button>Next</button>').addClass("modal-next btn").attr('id', "modal-next"));
        };
        
        
        /*****
         * Using JQuery: Added a form element with two input elements to the <div> search-container 
        ********/
        $('.search-container').html($('<form>', {action: "#", method: "get"}));
        $('form').html($('<input>', { id: "search-input", class: "search-input", placeholder: "Search..."}))
            .append($('<input>', {type: "submit", value: "🔍", id: "search-submit", class: "search-submit"})); 

        /*****
         * Using JQuery: Added the necessary elements to form the gallery cards - which contain employee's photo, first/last name as well as city/state 
        ********/

        for (var i = 0; i < data.results.length; i++) {

            $('.gallery').html($('<div>', {class: "card"}));
            $('.card').html($('<div>', {class: "card-img-container"}));
            $('.card-img-container').html($('<img>', {class: "card-img", src: `${data.results[i].picture.medium}`, alt: "profile picture"}));
            $('.card').append($('<div>', {class: "card-info-container"}));
            $('.card-info-container').html($('<h3>', {id: "name", class: "card-name cap"}).html(`${data.results[i].name.first}`))
                .append($('<p>', {class: "card-text"}).html(`${data.results[i].email}`))
                .append($('<p>', {class: "card-text cap"}).html(`${data.results[i].location.city}, ${data.results[i].location.state}`));

            cardsArr.push($('.card'));
            $('.gallery').append(cardsArr);
        }

            
        $(document).click(function (e) {

            /**
            * The closest() method search for all elements within or out the selector's tree.
            * It then constructs a new query object from the matching elements. 
            ***/
            if ( $(e.target).closest('.card').length !== 0 ) { 
                const cardClicked = $(e.target).closest('.card').index();
                modal(cardClicked);
                console.log(cardClicked);
                counter = cardClicked;
            }
            

            $('#modal-prev').click(function () {
                if (counter > 0) {
                    counter --;
                    $( 'div' ).remove('.modal-container'); 
                    modal(counter);
                    console.log(counter);
                } else if (counter === 0){
                    $(this).prop("disabled", true);
                }
            });

            $('#modal-next').click(function () {
                if (counter < 10 + 1) {
                    $( 'div' ).remove('.modal-container'); 
                    counter += 1;
                    modal(counter);
                    console.log(counter);
                } else {
                    $(this).prop('disabled', true);
                }   
            });

            $('.modal-close-btn').click(function () {
                $( 'div' ).remove('.modal-container');
            });
            
        });


        /**
        * Search Input (filter): real time filtering and calls the `searchNames` function
        **/

        $('.search-input').keyup( () => {
            searchNames();
        });


        $('.search-subnmit').click(() => {
            searchNames();
        });
    }
});

