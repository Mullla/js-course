const sendForm = () => {
    const errorMessage = 'Что-то пошло не так...',
        loadMessage = `<span class="loader"></span>`,
        successMessage = 'Спасибо! Мы скоро с Вами свяжемся';

    // все формы со страницы
    const forms = document.querySelectorAll('form');

    const statusMessage = document.createElement('div');
    statusMessage.style.cssText = 'font-size: 2rem; color: ghostwhite;';

    // коллекция с правильно заполненными полями
    const checked = new Set();

    // валидация
    const validate = (input) => {
        const regPhone = /[^\+\d+]/g,
            regName = /[^а-яё\s]+/gi,
            regMessage = /[^а-яё\s\.,:;\-\!\?\d]+/gi;
        
            // кнопка из заполняемой формы
            const formBtn = input.closest('form').querySelector('.form-btn');
    
            input.addEventListener('input', () => {

                if(input.type === 'tel'){
                    input.value = input.value.replace(regPhone, ''); 

                    if(input.value.length < 7 || input.value.length > 13){
                        checked.delete(input)
                    } else {
                        checked.add(input);
                    }

                } else if(input.name === 'user_name'){
                    input.value = input.value.replace(regName, '');

                    if(input.value.length < 2){
                        checked.delete(input)
                    } else {
                        checked.add(input);
                    }
                    

                } else if(input.name === 'user_message'){
                    input.value = input.value.replace(regMessage, '');

                } 

                if(input.type === 'email'){
                    if(input.value){
                        checked.add(input);
                    } else {
                        checked.delete(input);
                    }
                }

                if(checked.size === 3){
                    formBtn.disabled = false;
                } else {
                    formBtn.disabled = true;
                }

            });


            
    }



    // создание и перебор элементов формы (для их валидации)
    const createFormElements = (form) => {
        // массив с инпутами из формы
        const formElements = [];
        // добавление инпута в массив с элементами формы
        for (const elem of form.elements) {
            if (elem.tagName.toLowerCase() !== 'button' && elem.type !== 'button') {
                formElements.push(elem);
            }
        }
    
        formElements.forEach( elem => {
            validate(elem);
            
            // нахожу кнопку отправки
        });

    };

    // для каждой формы отправка данных
    forms.forEach( (form) => {
        // сразу отключаю кнопки отправки у формы
        const submitBtn = form.querySelector('.form-btn')
        submitBtn.disabled = true;

        createFormElements(form);

        form.addEventListener('submit', (e) => {
            e.preventDefault();
            form.append(statusMessage);
            statusMessage.innerHTML = loadMessage;


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

                    // через 3-5 секунд сообщение пропадает
                    setTimeout(() => statusMessage.remove(), 3000);
                })
                .then(() => {
                    // после того, как пропадет сообщение, модалка закроется
                    setTimeout(() => document.querySelector('.popup').style.display = 'none', 1000);
                    
                })
                .catch( (error) => {
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

export default sendForm;