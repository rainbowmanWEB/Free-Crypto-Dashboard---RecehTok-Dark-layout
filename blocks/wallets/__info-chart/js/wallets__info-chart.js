import chart from  './../../../../js/charts.js';
import $ from "./../../../../vendor/jquery.min.js";

$(window).on('load',function(){
    let chartMini = new chart();
    //console.log(chartMini);
    chartMini.minichart('#wallets__info-chart-mini-btc', 'btc', '#wallets__info-chart-wrap-btc', "mini");
    chartMini.minichart('#wallets__info-chart-mini-eth', 'eth', '#wallets__info-chart-wrap-eth', "mini");
    chartMini.minichart('#wallets__info-chart-mini-ltc', 'ltc', '#wallets__info-chart-wrap-ltc', "mini");
});
