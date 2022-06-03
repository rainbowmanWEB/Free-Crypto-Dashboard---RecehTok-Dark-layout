import $ from "./../../../vendor/jquery.min.js";

$(window).on('load',function(){
    let nowDate = new Date();
    nowDate = nowDate.getDate() + '/' + (nowDate.getMonth() + 1) + '/' + nowDate.getFullYear();
    let $historyDates = document.querySelectorAll('.history__date');
    for (const $OneHistoryDates of $historyDates) {
        $OneHistoryDates.innerHTML = nowDate;
    }
});