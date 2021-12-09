import snap from "snapsvg-cjs";
import $ from "../vendor/jquery.min.js";

export default class chart {
    self = this;
    
     crypts = {
         btc: [
            15, 25, 40, 30, 45, 40, 35, 55, 37, 50, 60, 45,70, 78
          ],
     };
     btc = [
      15, 25, 40, 30, 45, 40, 35, 55, 37, 50, 60, 45,70, 78
    ];
     chart_2_y = [
      80, 65, 65, 40, 55, 34, 54, 50, 60, 64, 55, 27, 24, 30
    ];
    
    
    
     drawLineGraph(graph, points, container, id, isMini) {
        let chart_h = 40;
        let chart_w = 80;
        let stepX = 77 / 14;
        function point(x, y) {
            x: 0;
            y: 0;
        }

        var graph = Snap(graph);
    
    
        /*END DRAW GRID*/
    
        /* PARSE POINTS */
        var myPoints = [];
        var shadowPoints = [];
    
        function parseData(points) {
            for (let i = 0; i < points.length; i++) {
                var p = new point();
                var pv = points[i] / 100 * 40;
                p.x = 83.7 / points.length * i + 1;
                p.y = 40 - pv;
                if (p.x > 78) {
                    p.x = 78;
                }
                myPoints.push(p);
            }
            //console.log(myPoints);
        }
    
        var segments = [];
    
        function createSegments(p_array) {
            
            for (let i = 0; i < p_array.length; i++) {
                var seg = "L" + p_array[i].x + "," + p_array[i].y;
                if (i === 0) {
                    seg = "M" + p_array[i].x + "," + p_array[i].y;
                }
                segments.push(seg);
            }
        }
    
        function joinLine(segments_array, id) {
            var line = segments_array.join(" ");
            var line = graph.path(line);
            line.attr('id', 'graph-' + id);
            var lineLength = line.getTotalLength();
    
            line.attr({
                'stroke-dasharray': lineLength,
                    'stroke-dashoffset': lineLength
            });
        }
    
        function calculatePercentage(points, graph) {
            var initValue = points[0];
            var endValue = points[points.length - 1];
            var sum = endValue - initValue;
    
            var percentagePrefix = "";
    
            function count(graph, sum) {
                var totalGain = $(graph).find('.total-gain');
                var i = 0;
                var time = 1300;
                var intervalTime = Math.abs(time / sum);
                var timerID = 0;
                if (sum > 0) {
                    var timerID = setInterval(function () {
                        i++;
                        totalGain.text(percentagePrefix + i);
                        if (i === sum) clearInterval(timerID);
                    }, intervalTime);
                } else if (sum < 0) {
                    var timerID = setInterval(function () {
                        i--;
                        totalGain.text(percentagePrefix + i);
                        if (i === sum) clearInterval(timerID);
                    }, intervalTime);
                }
            }
            count(graph, sum);
    
            setTimeout(function () {
                hVal.addClass('visible');
            }, 1300);
    
        }
    
    
        function showValues() {
            var val1 = $(graph).find('.h-value');
            var val2 = $(graph).find('.percentage-value');
            val1.addClass('visible');
            val2.addClass('visible');
        }
    
        function drawPolygon(segments, id) {
            var lastel = segments[segments.length - 1];
            var polySeg = segments.slice();
            polySeg.push([78, 38.4], [1, 38.4]);
            var polyLine = polySeg.join(' ').toString();
            var replacedString = polyLine.replace(/L/g, '').replace(/M/g, "");
    
            var poly = graph.polygon(replacedString);
            var clip = graph.rect(-80, 0, 80, 40);
            poly.attr({
                'id': 'poly-' + id,
                /*'clipPath':'url(#clip)'*/
                    'clipPath': clip
            });
            clip.animate({
                transform: 't80,0'
            }, 1300, mina.linear);
        }
    
          parseData(points);
          
          createSegments(myPoints);
          joinLine(segments,id);
     
          if(!isMini) {
            drawPolygon(segments, id);
          }
        
    }
    
     minichart (graph, points, container, id) {
        let minipoints = [];
        for (let i = this.crypts[points].length - 6; i < this.crypts[points].length; i++) {
            minipoints.push(this.crypts[points][i]);
        }
        //console.log(this.crypts[points]);
        this.drawLineGraph(graph, minipoints, container, id, true);
    }
    
    
}
