import Dygraph from 'dygraphs/dist/dygraph';
import { bindable, useView } from 'aurelia-templating';
import { Dygraphchart } from "./dygraphchart";

@useView('./dygraphchart.html')
export class Sachart extends Dygraphchart {
    @bindable inputs;
    @bindable fromid;
    @bindable maxdata = 120;
    @bindable refindex;
    @bindable refvalues = 1;
    @bindable pH = 0;
    @bindable pCO2 = 0;
    @bindable throttle = 2000; //time to throttle chart update, if it is too much at once
    @bindable convertors;
    @bindable pointSize = 10;
    @bindable minichart;

    constructor() {
        super();
        console.log('sachart constructor');
        this.xy = true; //set xy chart - datapoint will not contain time point
        this.handleResize = () => {
            if (isElementVisible(this.dygraphcanvas)) {
                console.log('sachart handle resize. This:',this);
                if (this.dygraph) this.dygraph.resize()
            } else console.log('sachart invisible no resize');
        }
        this.observerCallback = (mutationsList, observer) => {
            for (const mutation of mutationsList) {
              if (mutation.type === 'attributes' && mutation.attributeName === 'style') {
                const targetElement = mutation.target;
                if (this.isElementVisible(targetElement)) {
                    if (this.dygraph) this.dygraph.resize()
                }
              }
            }
        };
        this.observer = new MutationObserver(this.observerCallback);
    }

    bind() {
        super.bind();
        //if (!this.width) this.width = '100%';
        //if (!this.height) this.height = '400px';
        if (typeof this.pH === 'string') this.pH = parseFloat(this.pH, 10);
        if (typeof this.pCO2 === 'string') this.pCO2 = parseFloat(this.pCO2, 10);
        //console.warn('sachart bind() width height'+this.width+' '+this.height);
    }

    attached() {
        window.addEventListener('resize', this.handleResize);
        super.attached();
    }

    detached() {
        window.removeEventListener('resize', this.handleResize);
    }

    isElementVisible(element) {
        // Check if the element itself is set to display: none
        if (window.getComputedStyle(element).display === "none") {
            return false;
        }
    
        // Traverse up the DOM tree
        while (element) {
            if (element.tagName === "BODY") {
                // Reached the body element without finding display: none; the element is visible
                return true;
            }
            // Check the computed style of the current element
            if (window.getComputedStyle(element).display === "none") {
                // Found a parent with display: none; the element is not visible
                this.visibilityElement = element;
                this.observer.observe(this.visibilityElement, {attributes:true, attributeFilter:['style']})
                return false;
            }
            // Move up to the next parent element
            element = element.parentElement;
        }
    
        // Default to visible if no parent with display: none was found
        return true;
    }    
    

    initdygraph() {
        console.log('sachart - initdygraph');
        if (this.pH >0) this.data = [[this.pH, this.pCO2]];
        else this.data = [];
        this.xaxis = "pH";
        this.yaxis = "pCO2mmHg";
        this.logscale = true;
        this.animatedZoom = true;
        this.xrange = [7.0, 7.8]; //7.0 .. 7.8
        this.yrange = [15, 115];//[[7.4,40,0.03],[7.4,40,0.4]]; // 15 .. 115
        this.gradient = [[7.4, 40, 0.03], [7.4, 40, 0.4]];
        this.acidbaseannotation = [[7.4, 40, "Normal area"],
        [7.2, 64, "Acute Hypercapnia"],
        [7.1, 35, "Acute Base Deficit"],
        [7.1, 18, "Chronic Base Deficit"],
        [7.41, 20, "Chronic Hypocapnia"],
        [7.56, 23, "Acute Hypocapnia"],
        [7.5, 49, "Chronic Base Excess"],
        [7.3, 80, "Chronic Hypercapnia"]];
        this.acidbaselimitborders = [[[7.8, 10.8], [7.46, 29.1], [7.3, 46.8], [6.89, 148], [6.96, 148], [7.33, 52.1], [7.47, 36.6], [7.8, 13.8]],
        [[7.54, 64.7], [7.42, 52.1], [7.33, 41.4], [7.22, 28.7], [7.14, 18.4], [7.07, 11.6], [7.25, 11.6], [7.28, 15.8], [7.31, 22.8], [7.38, 29.1], [7.47, 37.6], [7.52, 41.4], [7.57, 44.3], [7.66, 47.3]],
        [[7.0, 40.7], [7.09, 43.9], [7.2, 45.5], [7.39, 45.5], [7.39, 32.1], [7.25, 31.7], [7.18, 30.5], [7.06, 27.6], [7.0, 25.3]],
        [[7.412, 18.90], [7.389, 30.3], [7.354, 50.7], [7.303, 65.6], [7.221, 96.3], [7.281, 96.3], [7.37, 66.2], [7.41, 51.0], [7.44, 38.7], [7.46, 29.1], [7.48, 18.5]]];

        let gradient = this.gradient;
        let acidbaselimitborders = this.acidbaselimitborders;
        let acidbasebelines = this.acidbaselines;
        let acidbaseannotation = this.acidbaseannotation;
        this.dygraph = new Dygraph(this.dygraphcanvas, this.data, {
            labels: [this.xaxis, this.yaxis],
            //resizable: "both",
            highlightSeriesOpts: false,
            showRoller: false,
            showLabelsOnHighlight: false,
            interactionModel: {},              
            highlightCallback: function(e) { },
            unhighlightCallback: function(e) { },
            //drawPoints: true,
            //highlightCircleSize: this.pointSize,
            xlabel: this.xaxis,
            ylabel: this.yaxis,
            logscale: this.logscale,
            //animatedZoom: this.animatedZoom,
            dateWindow: this.xrange,
            valueRange: this.yrange,
            //tomatonSelectXY: true,
            underlayCallback: function (canvas, area, g) {
                //draw area of limit borders
                //console.log("gradients [0][0..2]:" + g.toDomXCoord(gradient[0][0]) + " " + g.toDomXCoord(gradient[0][1]) + " " + g.toDomXCoord(gradient[0][2]));
                if (isNaN(g.toDomXCoord(gradient[0][0]))) {
                    console.log("cannot draw gradients [0][0..2]:" + g.toDomXCoord(gradient[0][0]) + " " + g.toDomXCoord(gradient[0][1]) + " " + g.toDomXCoord(gradient[0][2]));
                }
                else {
                    let my_gradient = canvas.createRadialGradient(
                        g.toDomXCoord(gradient[0][0]), g.toDomYCoord(gradient[0][1]), Math.abs(g.toDomXCoord(gradient[0][2])-g.toDomXCoord(0)),
                        g.toDomXCoord(gradient[1][0]), g.toDomYCoord(gradient[1][1]), Math.abs(g.toDomXCoord(gradient[1][2])-g.toDomXCoord(0)));
                    my_gradient.addColorStop(0, "#ffffaa");
                    my_gradient.addColorStop(.1, "#aaccaa");
                    my_gradient.addColorStop(1, "#ffffff");
                    canvas.fillStyle = my_gradient;
                    canvas.strokeStyle = "#909090";
                    for (let i = 0; i < acidbaselimitborders.length; i++) {
                        canvas.beginPath();
                        canvas.moveTo(g.toDomXCoord(acidbaselimitborders[i][0][0]), g.toDomYCoord(acidbaselimitborders[i][0][1]));
                        for (let j = 1; j < acidbaselimitborders[i].length; j++) {
                            canvas.lineTo(g.toDomXCoord(acidbaselimitborders[i][j][0]), g.toDomYCoord(acidbaselimitborders[i][j][1]));
                        }
                        canvas.fill();
                    }
                    canvas.strokeStyle = "#909090";
                    //draw lines of BE
                    /*
                    for (let i = 1; i < acidbasebelines[0].length; i++) {
                        canvas.beginPath();
                        canvas.moveTo(g.toDomXCoord(acidbasebelines[0][0]-0.8), g.toDomYCoord(acidbasebelines[0][i]*7.5));
                        for (let j = 1; j < acidbasebelines.length; j++) {
                            canvas.lineTo(g.toDomXCoord(acidbasebelines[j][0]-0.8), g.toDomYCoord(acidbasebelines[j][i]*7.5));
                        }
                        canvas.stroke();
                    } *///for
                    for (let i = 0; i < acidbaseannotation.length; i++) {
                        canvas.fillStyle = "#1030ff";
                        canvas.font = "12px Verdana";

                        let cx = g.toDomXCoord(acidbaseannotation[i][0]);
                        let cy = g.toDomYCoord(acidbaseannotation[i][1]);
                        //if ((cx > 0) && (cx < 600) && (cy > 0) && (cy < 400))
                        canvas.fillText(acidbaseannotation[i][2], cx, cy);

                    }
                }
            } //underlaycallback
        });
        //console.log("model name + model[0]"+model + " [0] "+ model[0]);
        //if (graphid == 'graph1') gl_g1 = gr2;
        //else gl_g2 = gr2;
        //});
    }

}
