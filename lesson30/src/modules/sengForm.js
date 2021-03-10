const sendForm = () => {
    const errorMessage = 'Что-то пошло не так...',
        loadMessage = 'Загрузка...',
        successMessage = 'Спасибо! Мы скоро с Вами свяжемся';

    // все формы со страницы
    const forms = document.querySelectorAll('form');

    const statusMessage = document.createElement('div');
    statusMessage.style.cssText = 'font-size: 2rem;';

    // валидация
    const validate = (input) => {
        const regPhone = /[^\+\d+]/g,
            regName = /[^а-яё\s]+/gi,
            regMessage = /[^а-яё\s\.,:;\-\!\?\d]+/gi;
    
            input.addEventListener('input', () => {
                if(input.type === 'tel'){
                    input.value = input.value.replace(regPhone, ''); 
    
                } else if(input.name === 'user_name'){
                    input.value = input.value.replace(regName, '');
    
                } else if(input.name === 'user_message'){
                    input.value = input.value.replace(regMessage, '');
                }
            });
    }

    // создание и перебор элементов формы
    const createFormElements = (form) => {
        // массив с инпутами из формы
        const formElements = [];
        // добавление инпута в массив с элементами формы
        for (const elem of form.elements) {
            if (elem.tagName.toLowerCase() !== 'button' && elem.type !== 'button') {
                formElements.push(elem);
            }
        }
    
        formElements.forEach( (elem) => validate(elem));
    
    };

    // для каждой формы отправка данных
    forms.forEach( (form) => {
        
        createFormElements(form);

        form.addEventListener('submit', (e) => {
            e.preventDefault();
            form.append(statusMessage);
            statusMessage.textContent = loadMessage;

            // присваивает body результат работы функции createBody для формы
            let body = createBody(form);

            postData(body)
                .then( (response) => {
                    if (response.status !== 200) {
                        // промис не переходит в ошибку из-за ошибок сети
                        // если статус не 200, то fetch все равно отработает, поэтому нужно вручную обработать ошибку
                        throw new Error(`status network ${response.status}`);
                    }
                    statusMessage.textContent = successMessage;
                })
                .catch( () => {
                    statusMessage.textContent = errorMessage;
                    console.error(error);
                });



            // очищает значения формы
            e.target.reset();
        });
    });


    // функция работает только с запросом, принимает body и функции-оповещения пользователя
    const postData = (body) => {
        // fetch возвращает промис
        // а postData возвращает fetch
        return fetch('./server.php', {
            // по умолчанию GET
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        });

        
    };

    // создает объект body из формы
    const createBody = (form) => {
        // объект содержит все данные формы
        //если у inputa не будет name, то formData не заполнится
        const formData = new FormData(form); 
        // когда сервер не понимает формат formData, отправляются другие данные
        let body = {};

        // перебираем значения formData и записывем их в объект body в формате ключ:значение
        formData.forEach( (val, key) => {
            body[key] = val;
        });

        return body;
    }

};