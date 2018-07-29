let min = 0;
let sec = 0;
let hours = 0;
let letsStop = 0;
window.onload = function() {
    setInterval(function() {
        if (letsStop !== 1) {
            sec++;
            if (sec === 60) {
                min++;
                sec = 0;
            }
            if (min === 60) {
                hours++;
                min = 0;
                sec = 0;
            }
            $('.timer').html(hours + ':' + min + ':' + sec);
            console.log(min);
            console.log(sec);
        }

    }, 1000);
};

let cards = [];
let cardsName = ['fa fa-diamond', 'fa fa-paper-plane-o', 'fa fa-anchor', 'fa fa-bolt', 'fa fa-cube', 'fa fa-anchor', 'fa fa-leaf', 'fa fa-bicycle', 'fa fa-diamond', 'fa fa-bomb', 'fa fa-leaf', 'fa fa-bomb', 'fa fa-bolt', 'fa fa-bicycle', 'fa fa-paper-plane-o', 'fa fa-cube'];
let openCards = [];

$('.deck').each(function() {
    $(this).find('li').each(function() {
        cards.push($(this));
    });
});
let temp = 0;

cardsName = shuffle(cardsName);

let cardNumber = 0;
$('.deck').each(function() {
    $(this).find('li').find('i').each(function() {
        $(this).removeAttr('class');
        $(this).addClass(cardsName[cardNumber]);
        cardNumber++;
    });
});

$('.deck').each(function() {
    $(this).find('li').find('i').each(function() {
        let tempClass = $($(cards[temp][0]).find('i')[0]).attr('class');
        $(this).removeAttr('class');
        $(this).addClass(tempClass);
        temp++;
    });
});

function shuffle(array) {
    let currentIndex = array.length,
        temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

let moves = 0,
    stars = 3;

removeProperties = function(prop) {
    setTimeout(function() {
        prop.removeClass('show open animated wobble');
        openCards[0].removeClass('show open animated wobble');
        openCards = [];
    }, 400);
};

showCardOnClick = function(clickEvent) {
    clickEvent.on('click', function() {
        moves++;
        if (moves === 16) {

        } else if (moves > 16 && moves <= 25) {
            $('section ul li').hide();
            $('section ul').append('<li><i class="fa fa-star"></i></li>');
            $('section ul').append('<li><i class="fa fa-star"></i></li>');
            stars = 2;
        } else if (moves > 25) {
            $('section ul li').hide();
            $('section ul').append('<li><i class="fa fa-star"></i></li>');
            stars = 1;
        }
        $('.moves').html(moves);
        if ((openCards.length % 2) === 0) {
            $(this).addClass('show open animated wobble');
            $(this).off('click');
            openCards.push($(this));
        } else if (openCards.length !== 0) {
            $(this).addClass('show open animated wobble');

            const self = $(this);
            for (let i = 0; i < openCards.length; i++) {
                if (openCards[i].find('i').attr('class') === self.find('i').attr('class')) {
                    self.removeClass('animated wobble');
                    self.addClass('show match animated rubberBand');
                    openCards[i].removeClass('animated wobble');
                    openCards[i].addClass('show match animated rubberBand');
                    console.log('match');
                    $(this).off('click');
                    openCards = [];
                    break;
                } else {
                    self.addClass('show open animated wobble');
                    removeProperties(self);
                    openCards[0].on('click', showCardOnClick(openCards[0]));
                    console.log('no match');
                }
            }
        }
        if ($('.deck').find('.match').length === 16) {
            setTimeout(function() {
                $('.deck').each(function() {
                    swal({
                        title: 'Congratulations',
                        type: 'success',
                        text: 'You have won the game . Moves conceded are ' + moves + '. You have got ' + stars + ' Stars Time taken is ' + hours + ' Hours ' + min + ' Minutes and ' + sec + ' Seconds',
                        allowOutsideClick: false,
                        showCancelButton: true,
                        confirmButtonText: 'Play Again',
                        confirmButtonColor: '#0000FF',
                        cancelButtonText: 'Close',
                        cancelButtonColor: '#FF0000'
                    }).then(function() {
                        location.reload();
                    }, function(dismiss) {
                        console.log('Yes');
                    });

                });
            }, 300);
            letsStop = 1;
            $('.timer').hide();
            $('.timer').html('0:0:0');
            $('.timer').show();
        }

    });
};

for (let i = 0; i < cards.length; i++) {
    cards[i].on('click', showCardOnClick(cards[i]));
}

$('.restart').on('click', function() {
    location.reload();
});