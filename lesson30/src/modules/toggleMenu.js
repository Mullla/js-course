const toggleMenu = () => {
    const menuBtn = document.querySelector('.menu'), // кнопка меню
        menu = document.querySelector('menu'), // тег с блоком меню
        firstSectionLink = document.querySelector('a>img'); // ссылка перехода к первому слайду

        // переключает активный класс у меню
        const handlerMenu = () => {
            menu.classList.toggle('active-menu');
        };

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

        menuBtn.addEventListener('click', handlerMenu);

        menu.addEventListener('click',(event) => {
            let target = event.target;

            if (target.classList.contains('close-btn') || target.closest('a')){
                handlerMenu();
            }

            smoothScroll(target);
        });

        firstSectionLink.addEventListener('click', (event) => {
            let target = event.target;

            smoothScroll(target);
        });

};

export default toggleMenu;