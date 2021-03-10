const tabs = () => {
        const tabHeader = document.querySelector('.service-header'),
            tabs = tabHeader.querySelectorAll('.service-header-tab'),
            tabsContent = document.querySelectorAll('.service-tab');

            const toggleTabsContent = (index) => {
                for (let i = 0; i < tabsContent.length; i++) {
                    if (index === i){
                        tabsContent[i].classList.remove('d-none');
                        tabs[i].classList.add('active');
                    } else {
                        tabsContent[i].classList.add('d-none');
                        tabs[i].classList.remove('active');
                    }
                }
            };

            tabHeader.addEventListener('click', (event) => {
                let target = event.target;
                    target = target.closest('.service-header-tab'); // проверяет селектор, если есть - возвращает этот элемент, если нет, то проверяет родителя и тд

                    if (target){
                        tabs.forEach((item, i) => {
                            if (item === target) {
                                toggleTabsContent(i);
                            }
                        });
                    }


            });
    };