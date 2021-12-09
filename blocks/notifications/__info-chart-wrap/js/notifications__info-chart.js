import chart from  './../../../../js/charts.js';
import $ from "./../../../../vendor/jquery.min.js";

$(window).on('load',function(){
    let chartMini = new chart();
    //console.log(chartMini);
    chartMini.minichart('#notifications__info-chart-mini-1', 'btc', '#notifications__info-chart-wrap', "mini");
});
