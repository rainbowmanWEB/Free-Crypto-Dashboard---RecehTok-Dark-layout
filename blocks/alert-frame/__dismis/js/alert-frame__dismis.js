document.addEventListener('DOMContentLoaded', ()=> {
    let alertFrameDismis = document.querySelectorAll('.alert-frame__dismis');
    
    alertFrameDismis.forEach((element) => {

        element.addEventListener('click', (e) => {
            e.preventDefault();
            e.target.closest('.alert-frame').classList.toggle('alert-frame_active');
        });

    });
    
});