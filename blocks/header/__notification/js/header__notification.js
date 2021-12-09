document.addEventListener('DOMContentLoaded', ()=> {
    let headerNotification = document.querySelectorAll('.header__notification');
    
    headerNotification.forEach((element) => {

        element.addEventListener('click', (e) => {
            e.preventDefault();
            document.querySelector('.notifications').classList.toggle('notifications_active');
        });

    });
    
});