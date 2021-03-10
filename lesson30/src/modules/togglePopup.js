const togglePopup = () => {
    const popup = document.querySelector('.popup'),
        popupBtns = document.querySelectorAll('.popup-btn');

        popupBtns.forEach((elem) => {
            elem.addEventListener('click', () => {
                // если размер экрана пользователя < 768px, анимация отключается
                if (document.documentElement.clientWidth  > 768){
                    popup.style.display = 'block';
                    animation();
                } else {
                    popup.style.display = 'block';
                }
            });
        });

        popup.addEventListener('click', (event) => {
            let target = event.target;

                if (target.classList.contains('popup-close')){
                    popup.style.display = 'none';
                } else {
                    target = target.closest('.popup-content');

                    if (!target) {
                        popup.style.display = 'none';
                    }
                }

        });

        //popup animation
        const animation = () => {
            let popupAnimation,
            progress = 0;

            const popupAnimate = function() {
                progress++;
                popupAnimation = requestAnimationFrame(popupAnimate);

                if (progress < 30){
                    popup.style.opacity = progress / 30; 
                } else {
                    cancelAnimationFrame(popupAnimation);
                }
        };

        popupAnimate();
    }
}

export default togglePopup;