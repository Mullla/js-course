const changeImgs = () => {
    const commandSection = document.getElementById('command');

    let temp;
    commandSection.addEventListener('mouseover', (e) => {
        let target = e.target;

        if(target.classList.contains('command__photo')){
            temp = target.src;
            target.src = target.dataset.img;
        }
        
    });

    commandSection.addEventListener('mouseout', (e) => {
        let target = e.target;

        if(target.classList.contains('command__photo')){
            target.src = temp;
        }
        
    });
    
}