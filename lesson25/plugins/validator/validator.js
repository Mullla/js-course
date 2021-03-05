class Validator{
    // сразу деструктуризируем входящий объект
    constructor({ selector, pattern = {}, method }){
        // селектор формы: id, class...
        this.form = document.querySelector(selector); 

        // для специфичности классов
        this.selector = selector;

        // шаблоны, не затрагивая каcмтомные
        this.pattern = pattern; 

        // настройки, которые указывают, какие поля валилируются
        this.method = method; 

        // тк получаем HTMLCollection, у нее нет метода filter, с помощью spread-оператора копируем ее в массив
        this.formElements = [...this.form.elements].filter(item => {
            return item.tagName.toLowerCase() !== 'button' && item.type !== 'button';
        });

        // если вознимкла ошибка в поле ввода, то это поле ввода записывается в коллекцию Set
        this.error = new Set();
    }

    init() {
        this.applyStyle();
        this.setPattern();
        // биндим текущий this, который находится в контексте вызова init
        this.formElements.forEach(elem => elem.addEventListener('change', this.checkIt.bind(this))); 
        this.form.addEventListener('submit', (e) => {
            e.preventDefault();

            this.formElements.forEach(elem => this.checkIt({target: elem}));

            if (this.error.size) {
                e.preventDefault();
            }
        });
    }

    isValid(elem) {
        const validatorMethod = {
            // проверка является ли строка пустой
            notEmpty(elem){
                if (elem.value.trim() === ''){
                    return false;
                }
                return true;
            },

            //проверяет value элемента и сравнивает его с паттерном
            pattern(elem, pattern){
                // test сразу возвращает булевое значение
                return pattern.test(elem.value);
            }
        };

        // проверка передает ли пользователь методы
        if(this.method){
            // свойства названы по id элемента
            const method = this.method[elem.id];
            
            // если пользователь ошибся в названии или валидирует не все поля, то валидация не запускается
            if(method){
                return method.every(item => {
                    // получаем методы объекта validatorMethod, 
                    // вторым параметром идет pattern, если его нет функция все равно отработает, 
                    // обращаемся к паттерну и у него находим свойство с именем item[1]
                    return validatorMethod[item[0]](elem, this.pattern[item[1]]);
                });
            }
        } else {
            console.warn('Необходимо передать id полей ввода и методы проверки этих полей.')
        }

        // если пользователь не передал никаких паттернов, то валидация должна проходить
        return true; 
    }

    checkIt(event) {
        const target = event.target;

        if(this.isValid(target)){
            this.showSuccess(target);
            this.error.delete(target);
        } else {
            this.showError(target);
            this.error.add(target);
        }
    }


    showError(elem){
        elem.classList.remove('success');
        elem.classList.add('error');
    
        // если уже есть ошибка, то функция дальше не выполняется и не создает новый div
        if (elem.nextElementSibling && elem.nextElementSibling.classList.contains('validator-error')) {
            return;
        }

        const errorDiv = document.createElement('div');
        errorDiv.textContent = 'Ошибка в этом поле';
        errorDiv.classList.add('validator-error');
        elem.insertAdjacentElement('afterend', errorDiv);
    }

    showSuccess(elem){
        elem.classList.remove('error');
        elem.classList.add('success');

        // проверка элемента-соседа
        if(elem.nextElementSibling && elem.nextElementSibling.classList.contains('validator-error')){
            elem.nextElementSibling.remove();
        }
    }

    // метод создает css стили, чтобы не прописывать их отдельно в css-файле
    applyStyle(){
        const style = document.createElement('style');
        style.textContent = `
            ${this.selector} input.success {
                border: 3px solid springgreen;
            }
            ${this.selector} input.error {
                border: 3px solid coral;
            }
            ${this.selector} .validator-error{
                font-size: 14px;
                color: coral;
            }
        `;
        document.head.append(style);
    }

    // задаем паттерны, приоритет у пользовательского паттерна
    // если пользователь передал, то используем его, если нет, то используем по умолчанию
    setPattern(){
        // если пользователь не добавил паттерны, то используем свои по умолчанию
        if (!this.pattern.phone) {
            this.pattern.phone = /^\+?[78]([-()]*\d){10}$/;
        }

        if (!this.pattern.email) {
            this.pattern.email = /^\w+@\w+\.\w{2,}$/;
        }

        if (!this.pattern.cyrillic) {
            this.pattern.cyrillic = /^[а-яё]+$/i;
        }

        // то же самое: this.pattern.phone = this.pattern.phone ? this.pattern.phone : /^\+?[78]([-()]*\d){10}$/;
    }
}