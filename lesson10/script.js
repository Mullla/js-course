let booksCollection = document.querySelector('.books'),
    bookElems = document.querySelectorAll('.book');
    promo = document.querySelector('.adv'),
    book2ListElems = bookElems[0].querySelectorAll('li'),
    book5ListElems = bookElems[5].querySelectorAll('li'),
    book6ListElems = bookElems[2].querySelectorAll('li');

// restore order
booksCollection.append(bookElems[1]);
booksCollection.append(bookElems[0]);
booksCollection.append(bookElems[4]);
booksCollection.append(bookElems[3]);
booksCollection.append(bookElems[5]);
booksCollection.append(bookElems[2]);

// change background image
document.body.style.backgroundImage = 'url(./image/you-dont-know-js.jpg)';

// update heading
bookElems[4].querySelector('h2 > a').textContent = "Книга 3. this и Прототипы Объектов";

// remove advert
promo.remove();

// restore order of chapters in book 2
book2ListElems[10].insertAdjacentElement('beforebegin', book2ListElems[2]);
book2ListElems[3].insertAdjacentElement('afterend', book2ListElems[6]);
book2ListElems[6].insertAdjacentElement('afterend', book2ListElems[8]);

// restore order of chapters in book 5
book5ListElems[10].insertAdjacentElement('beforebegin', book5ListElems[8]);
book5ListElems[8].insertAdjacentElement('beforebegin', book5ListElems[5]);
book5ListElems[1].insertAdjacentElement('afterend', book5ListElems[9]);
book5ListElems[4].insertAdjacentElement('afterend', book5ListElems[2]);

// add chapter 8 in book 6
book6ListElems[9].insertAdjacentHTML('beforebegin', '<li>Глава 8: За пределами ES6</li>');
