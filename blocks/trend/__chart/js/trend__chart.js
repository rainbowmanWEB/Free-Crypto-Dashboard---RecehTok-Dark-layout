import chart from  './../../../../js/charts.js';
import $ from "./../../../../vendor/jquery.min.js";

$(window).on('load',function(){
    let chartMini = new chart();
    //console.log(chartMini);
    chartMini.minichart('#trend__chart-mini-btc', 'btc', '#trend__chart-wrap-btc', "mini", 10);
    chartMini.minichart('#trend__chart-mini-eth', 'eth', '#trend__chart-wrap-eth', "mini", 10);
    chartMini.minichart('#trend__chart-mini-ltc', 'ltc', '#wallets__info-wrap-ltc', "mini", 10);
    chartMini.minichart('#trend__chart-mini-doge', 'doge', '#wallets__info-wrap-doge', "mini", 10);
});
