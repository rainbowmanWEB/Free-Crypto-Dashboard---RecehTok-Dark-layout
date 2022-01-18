import $ from "./../../../vendor/jquery.min.js";
import chart from  './../../../js/charts.js';

$(window).on('load',function(){
    let chartMax = new chart();
    chartMax.bigChart('#big-chart', ['btc', 'eth', 'ltc'], '#big-chart-wrap', ['big-btc', 'big-eth', 'big-ltc']);
});