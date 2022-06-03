document.addEventListener('DOMContentLoaded', ()=> {
    let $headerNotification = document.querySelector('.header__notification');
    let $headerNotificationNumber = document.querySelector('.header__notification-number');
    let $headerNotificationIcon = document.querySelector('.header__notification-icon');

    $headerNotification.addEventListener('click', (e) => {
            e.preventDefault();
            $headerNotificationNumber.innerHTML = '';
            $headerNotification.classList.remove('header__notification_active');
            $headerNotificationIcon.classList.remove('header__notification-icon_active');
            document.querySelector('.notifications').classList.toggle('notifications_active');
        });
    
});