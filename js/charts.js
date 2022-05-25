import snap from "snapsvg-cjs";
import $ from "../vendor/jquery.min.js";

export default class chart {
    self = this;
    
     crypts = {
         btc: [
            15, 0, 40, 30, 45, 40, 35, 55, 37, 50, 60, 45, 70, 78
          ],
          eth: [
            35, 55, 10, 60, 40, 80, 25, 15, 66, 83, 55, 10, 20, 44
          ],
          ltc: [
            33, 0, 43, 27, 77, 58, 45, 63, 31, 10, 70, 35, 60, 18
          ],
          doge: [
            10, 40, 43, 67, 27, 54, 25, 93, 43, 72, 76, 33, 28, 68
          ],
     };
     btc = [
      15, 25, 40, 30, 45, 40, 35, 55, 37, 50, 60, 45,70, 78
    ];
     chart_2_y = [
      80, 65, 65, 40, 55, 34, 54, 50, 60, 64, 55, 27, 24, 30
    ];
    
    
    
     drawLineGraph(graph, points, container, id, isMini, minPoint, maxPoint) {
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
            let range = (maxPoint - minPoint) / 38;
            for (let i = 0; i < points.length; i++) {
                var p = new point();
                if (isMini) {
                    var pv = points[i] / 100 * 38;
                }  else {
                    var pv = (points[i] - minPoint) / range;
                }
                //console.log(points[i]);
                p.x = 83.7 / points.length * i + 1;
                p.y = 38 - pv;
                if (p.x > 78) {
                    p.x = 78;
                }
                myPoints.push(p);
            }
            
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

    scalesDraw (container, minPoint, maxPoint, pointsLenght) {
        // draw count scale
        let $vericalScaleBlock = document.createElement('div');
        $vericalScaleBlock.classList.add('chart__verical-Scale-Block');
        let scaleElem = null;
        container = document.querySelector(container);
        let stepScale = Math.round((maxPoint - minPoint) / 10)
        for (let i = 0; i < 10; i++) {
            scaleElem = document.createElement('div');
            scaleElem.classList.add('chart__scale-elem');
            scaleElem.innerHTML = minPoint + stepScale * i;
            $vericalScaleBlock.appendChild(scaleElem);
        }
        scaleElem = document.createElement('div');
        scaleElem.classList.add('chart__scale-elem');
        scaleElem.innerHTML = maxPoint;
        $vericalScaleBlock.appendChild(scaleElem);
        container.appendChild($vericalScaleBlock);

        //draw time scale
        let nowTime = new Date();
        if(nowTime.getMinutes() > 30) {
            nowTime.setMinutes(30);
        }  else {
            nowTime.setMinutes(0);
        }
        let times = [];
        for (let i = 0; i < pointsLenght + 1; i++) {
            times.push(nowTime.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}));
            nowTime.setMinutes(nowTime.getMinutes() - 30);
        }
        let $horizontalScaleBlock = document.createElement('div');
        $horizontalScaleBlock.classList.add('chart__horizontal-Scale-Block');
        scaleElem = null;
        for (let a = pointsLenght; a > 0; a--) {
            scaleElem = document.createElement('div');
            scaleElem.classList.add('chart__scale-elem');
            scaleElem.innerHTML = times[a];
            $horizontalScaleBlock.appendChild(scaleElem);
            
        }
        container.appendChild($horizontalScaleBlock);
    }

    mouseOnEvent(elem, maxLenghtPoints, pointsArr) {
            let $svgBlock = document.querySelector('.big-chart-line');
            let elemWidth = $svgBlock.getBoundingClientRect().width;
            let step = Math.round(elemWidth / maxLenghtPoints);
            let $plankBlock = document.createElement('div');
            $plankBlock.classList.add('chart__plank-Block');
            let $container = document.querySelector(elem);
            $container.appendChild($plankBlock);
            $plankBlock.style.width = step + 'px';
            let $plankInfoBlock = document.createElement('div');
            $plankInfoBlock.classList.add('chart__plank-info-Block');

            for (let i = 0; i < pointsArr.length; i++) {
                let $plankInfoElemBlock = document.createElement('div');
                $plankInfoElemBlock.classList.add('chart__plank-info-elem');
                $plankInfoElemBlock.setAttribute('data-name', pointsArr[i]);
                let $plankInfoTextBlock = document.createElement('div');
                $plankInfoTextBlock.classList.add('chart__plank-info-text');
                let $plankInfoColorBlock = document.createElement('div');
                $plankInfoColorBlock.classList.add('chart__plank-info-color');
                let color = document.querySelector('#big-chart-gradient-' + pointsArr[i]).children[0].getAttribute('stop-color');
                
                $plankInfoColorBlock.style.backgroundColor = color;
                $plankInfoElemBlock.appendChild($plankInfoTextBlock);
                $plankInfoElemBlock.appendChild($plankInfoColorBlock);
                $plankBlock.appendChild($plankInfoElemBlock);
            }
            
           let chartSelf = this;
            

            $svgBlock.addEventListener('mousemove', (event) => {
                let partOnMouse = Math.round(event.offsetX / step);

                if (partOnMouse > maxLenghtPoints - 1) {
                    return;
                }

                $plankBlock.style.display = 'block';
                $plankBlock.style.left = (partOnMouse * step + 50) + 'px';
                let $plankInfoElemBlocks = document.querySelectorAll('.chart__plank-info-elem');
                
                for (let i = 0; i < $plankInfoElemBlocks.length; i++) {
                    $plankInfoElemBlocks[i].children[0].innerHTML = chartSelf.crypts[$plankInfoElemBlocks[i].getAttribute('data-name')][partOnMouse];
                    
                }
            });
        
    }

    createTable(elem, pointsArr, pointsLenght) {
        let $container = document.querySelector(elem);
        let $table = document.createElement('table');
        $table.classList.add('chart__table');
        let $tableHead = document.createElement('thead');
        $tableHead.classList.add('chart__thead');
        let tHeadArr = ['time'];
        console.log(pointsArr);
        pointsArr.map((point) => {
            tHeadArr.push(point);
        })

        for (let i = 0; i < tHeadArr.length; i++) {
            let $tableHeadElem = document.createElement('th');
            $tableHeadElem.classList.add('chart__thead-th');
            $tableHeadElem.innerHTML = tHeadArr[i];
            $tableHead.appendChild($tableHeadElem);
        }

        let $tableBody = document.createElement('tbody');
        $tableBody.classList.add('chart__tbody');

        let nowTime = new Date();
        if(nowTime.getMinutes() > 30) {
            nowTime.setMinutes(30);
        }  else {
            nowTime.setMinutes(0);
        }
        let times = [];
        for (let i = 0; i < pointsLenght + 1; i++) {
            times.push(nowTime.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}));
            nowTime.setMinutes(nowTime.getMinutes() - 30);
        }

        let timeCount = 0;
        for (let a = pointsLenght - 1; a >= 0; a--) {
            let $tableBodyrow = document.createElement('tr');
            $tableBodyrow.classList.add('chart__tbody-tr');
            let $tableBodyElem = document.createElement('td');
            $tableBodyElem.classList.add('chart__tbody-td');
            $tableBodyElem.innerHTML = times[timeCount];
            $tableBodyrow.appendChild($tableBodyElem);
            for (let b = 0; b < pointsArr.length; b++) {
                $tableBodyElem = document.createElement('td');
                $tableBodyElem.classList.add('chart__tbody-td');
                $tableBodyElem.innerHTML = this.crypts[pointsArr[b]][a];
                let $tableBodyElemIcon = document.createElementNS("http://www.w3.org/2000/svg", 'svg');
                $tableBodyElemIcon.classList.add('chart__tbody-td-icon');
                let $tableBodyElemIconUse = document.createElementNS("http://www.w3.org/2000/svg", 'use');
                $tableBodyElemIconUse.setAttributeNS("http://www.w3.org/1999/xlink", 'href', 'img/arrow-up-right.svg#Flat');
                $tableBodyElemIcon.appendChild($tableBodyElemIconUse);
                $tableBodyElem.appendChild($tableBodyElemIcon);
                if (this.crypts[pointsArr[b]][a - 1] != undefined && this.crypts[pointsArr[b]][a - 1] < this.crypts[pointsArr[b]][a]) {
                    $tableBodyElem.classList.add('chart__tbody-td_posetive');
                    $tableBodyElemIcon.classList.add('chart__tbody-td-icon_posetive');
                }  else {
                    $tableBodyElem.classList.add('chart__tbody-td_negative');
                    $tableBodyElemIcon.classList.add('chart__tbody-td-icon_negative');
                }

                $tableBodyrow.appendChild($tableBodyElem);
            }
            $tableBody.appendChild($tableBodyrow);
            timeCount++;

        }
        $table.appendChild($tableHead);
        $table.appendChild($tableBody);
        $container.appendChild($table);
        
    }
    
     minichart (graph, points, container, id, pointsNumber = 6) {
        let minipoints = [];
        for (let i = this.crypts[points].length - pointsNumber; i < this.crypts[points].length; i++) {
            minipoints.push(this.crypts[points][i]);
        }
        //console.log(this.crypts[points]);
        this.drawLineGraph(graph, minipoints, container, id, true);
    }

    bigChart (graph, pointsArr, container, id) {
        let count = 0;
        let minPoint = null;
        let maxPoint = null;
        let maxLenghtPoints = null;
        for (let point of pointsArr) {
            for (let onepoint of this.crypts[point]) {
                maxPoint = onepoint > maxPoint ? onepoint : maxPoint;
                if (minPoint === null) {
                    minPoint = onepoint;
                }
                minPoint = onepoint < minPoint ? onepoint : minPoint;
            }
            //console.log(maxPoint);
            this.drawLineGraph(graph, this.crypts[point], container, id[count], false, minPoint, maxPoint);
            count++;
            maxLenghtPoints = this.crypts[point].length > maxLenghtPoints ? this.crypts[point].length : maxLenghtPoints;
        }
        this.scalesDraw(container, minPoint, maxPoint, maxLenghtPoints);
        this.mouseOnEvent(container, maxLenghtPoints, pointsArr);
        this.createTable(container, pointsArr, maxLenghtPoints);
    }
    
    
}
