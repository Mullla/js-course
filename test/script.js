const output = document.getElementById('output');

const getData = (url) => {

    return new Promise( (resolve, reject) => {
        const request = new XMLHttpRequest();
        request.open('GET', url);
        request.addEventListener('readystatechange', () => {
            if (request.readyState !== 4) {
                return;
            }

            if (request.status === 200) {
                const response = JSON.parse(request.responseText);
                // возвращает результат, который запросили
                // response - возвращаемый рещультат/ответ
                resolve(response);
            } else {
                reject(request.statusText);
            }
        });

        request.send();
    });
    
};

// * для рандомного объекта, котрый содержит картинку
// const outputPhotos = (data) => {
//     // чтобы получить рандомную картинку
//     const random = Math.floor(Math.random() * data.length);
//     // получаю рандомный объект
//     const obj = data[random];

//     output.innerHTML = `<h4>${obj.title}</h4>
//                         <img src="${obj.thumbnailUrl}" alt="${obj.title}" />`
    
// }

const outputPhotos = (data) => {

    data.forEach( elem => {
        output.insertAdjacentHTML('beforebegin', 
        `<h4>${elem.title}</h4>
        <img src="${elem.thumbnailUrl}" alt="${elem.title}" />`);
    });

}

const urlPhotos = 'https://jsonplaceholder.typicode.com/photos';

const oneImg = getData(`${urlPhotos}/1`),
    twoImg = getData(`${urlPhotos}/2`),
    threeImg = getData(`${urlPhotos}/3`);

// * для объекта
// getData(urlPhotos)
//     .then(outputPhotos) // в outputData data передается с помощью resolve, который написан в промисе после JSON.parse
//     .catch( err => console.error(err) );

// * в случайном порядке, смотря какой промис выполнится раньше
// oneImg
//     .then(outputPhotos)
//     .catch( err => console.error(err));

// twoImg
//     .then(outputPhotos)
//     .catch( err => console.error(err));

Promise.all([oneImg, threeImg, twoImg]) // отработает в том порядке, в котором добавлены в массив
    .then(outputPhotos)
    .catch( err => console.error(err));