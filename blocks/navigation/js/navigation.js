import $ from "./../../../vendor/jquery.min.js";

$(window).on('load',function(){
    let $navigation = document.querySelector('.navigation');
    
    $navigation.addEventListener('click', (e)=>{
        e.preventDefault();
        if (e.target.closest('.navigation__elem')) {
            let $navigationElemActive = document.querySelector('.navigation__elem_active');
            let $navigationLinkActive = document.querySelector('.navigation__link_active');
            $navigationElemActive.classList.remove('navigation__elem_active');
            $navigationLinkActive.classList.remove('navigation__link_active');
            e.target.closest('.navigation__elem').classList.add('navigation__elem_active');
            e.target.closest('.navigation__link').classList.add('navigation__link_active');
        }
    })
});