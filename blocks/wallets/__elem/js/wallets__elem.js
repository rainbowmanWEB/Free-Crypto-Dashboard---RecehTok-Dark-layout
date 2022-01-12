import $ from "./../../../../vendor/jquery.min.js";

$(window).on('load',function(){
    let wallets = document.querySelector('.wallets');
    wallets.addEventListener('click', (e)=>{
        let walletsElem = e.target.closest('.wallets__elem');
        if (walletsElem && !walletsElem.children[0].classList.contains ('wallets__add-currency')) {
            let walletsElemActive = document.querySelector('.wallets__elem_active');
            walletsElemActive.classList.remove('wallets__elem_active');
            walletsElem.classList.add('wallets__elem_active');
        }
    })
});