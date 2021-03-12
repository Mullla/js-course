const validation = () => {
    // только цифры в калькуляторе
    const checkNums = () => {
        const calcInputs = document.querySelectorAll('input[type="text"].calc-item');

        const formatNum = (elem) => {
            elem.addEventListener('input', (e) => {
                let target = e.target;
                //все, что не соответствует цифре, заменяю пустым символом
                target.value = target.value.replace(/[^0-9]+/i,''); 

                target.addEventListener('blur', () => {
                    const regCalc = /[^\d]+/g;
                    target.value = target.value.replace(regCalc, '');
                });
            });
        };

        calcInputs.forEach(elem => formatNum(elem));
    };

    // текстовые инпуты
    const checkText = () => {
        const textInputs = document.querySelectorAll('input[name="user_name"]'),
            messageInput = document.querySelector('input[name="user_message"]'); 

            textInputs.forEach( textInput => {
                textInput.addEventListener('input', (e) => {
                    let target = e.target;
            
                    // все символы, которые нельзя вводить, заменяются пустой строкой
                    let str = target.value.replace(/[^а-яё\-\s]/ig, '');
            
                    // убираю повторяющиеся дефис или пробел
                    // есть скобочная группа, у нее №1, если после нее идет такой же символ, как в скобочной группе (это пробел или дефис)
                    // то он будет заменяться на точно такой же, который был
                    str = str.replace(/(\-|\s)\1{1,}/g, '$1');
                    
                    target.value = str;
            
                    target.addEventListener('blur', () => {
                        target.value = processText(target);
                    })
            
                    
                });
            });
        
            
            // удаляет дефисы в начале и в конце слова, если это инпут имени, то приводит первые буквы к заглавной
            // вход: target
            // выход: строка
            const processText = (target) => {
                //получила массив из слов
                // каждое слово все еще может начинаться или заканчиваться дефисом 
                let arr = target.value.trim().split(' ');
        
                arr = arr.map(word => {
                        if (word.slice(0,1) === '-' || word.slice(-1) === '-') {
                            // если только первый символ - дефис, то он удаляется
                            if (word.slice(0,1) === '-' && word.slice(-1) !== '-') {
                                word = word.replace(/\-/, '');
            
                            // если только последний символ дефис - он удаляется
                            } else if(word.slice(-1) === '-' && word.slice(0,1) !== '-'){
                                word = word.substring(1, word.length - 1);
            
                            // если оба символа - дефисы, они удаляются
                            } else {
                                word = word.substring(1, word.length - 1).replace(/\-/, '');
            
                            }
            
                        } 
                        if(target.name === 'user_name'){
                            word = word.toUpperCase().slice(0,1) + word.toLowerCase().substring(1);
                        }
            
                        return word;
                });
        
                arr = arr.join(' ');
        
                return arr;
            }

        messageInput.addEventListener('input', (e) => {
            let target = e.target;

            target.value = target.value.replace(/[^а-яё\s\-]/ig, '');

            target.addEventListener('blur', () => {
                target.value = processText(target);
            });
        });
    }

    //проверка email
    const checkEmails = () => {
        const emailInputs = document.querySelectorAll('input[type="email"]');

        const formatEmail = (elem) => {
            elem.addEventListener('input', (e) => {
                let target = e.target;
                //можно только ввод латиницы и спецсимволы
                target.value = target.value.replace(/[^a-z\@\*\-\_\.\!\~\']+/gi,'');  

                target.addEventListener('blur', () => {
                    const regEmail = /([^a-z\-\_\.\!\~\*\'@]+|^\-*|\-*$)/ig;
                    target.value = target.value.replace(regEmail, '').replace(/\-{2,}/g, '-');
                });
            });
        };

        emailInputs.forEach(elem => {
            formatEmail(elem);
        });
    };

    // проверка телефона
    const checkPhone = () => {
        const phoneInputs = document.querySelectorAll('input[name="user_phone"]');

        const formatPhone = (elem) => {
            elem.addEventListener('input', (e) => {
                let target = e.target;
                //все, что не соответствует цифре, заменяю пустым символом
                // elem.value = elem.value.replace(/[^0-9()\-]+/i,''); 
                target.value = target.value.replace(/[^\d()\-]+/i,''); 

                target.addEventListener('blur', () => {
                    const regPhone = /([^\d\)\(\-]+|^\-*|\-*$)/g;
                    target.value = target.value.replace(regPhone, '').replace(/\-{2,}/g, '-');
                });
            });
        };

        phoneInputs.forEach(elem => {
            formatPhone(elem);
        });
    };

    checkEmails();
    checkText();
    checkNums();
    checkPhone();
}

export default validation;