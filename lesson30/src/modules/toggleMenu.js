const toggleMenu = () => {
    const menu = document.querySelector('menu'); // тег с блоком меню
    
        // переключает активный класс у меню
        const handlerMenu = () => {
            menu.classList.toggle('active-menu');
        };

        document.addEventListener('click', (event) => {
            let target = event.target;

            if (target.closest('div.menu') //если это иконка меню
                || target.classList.contains('close-btn') // или есть кнопка закрыть
                || target.closest('li>a') // или это ссылка
                || ( menu.classList.contains('active-menu') && !target.closest('.active-menu') )) { // или меню открыто и при этом клик не на меню

                handlerMenu();
            }

            smoothScroll(event);
        });


        // smooth scroll
        const smoothScroll = (e) => {
            let target = e.target;
            if (target.closest('li>a') || target.closest('a>img')) {
                e.preventDefault(); // отменяю обычный переход по ссылке, чтобы добавить плавный

                target = target.closest('a'); 

                let id = target.getAttribute('href').substr(1); //выделяю часть ссылки href = #<...>, чтобы подставить значение <...> и найти элемент поid

                document.getElementById(id).scrollIntoView({ //скроллю к элементу с заданным id
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }

};

export default toggleMenu;