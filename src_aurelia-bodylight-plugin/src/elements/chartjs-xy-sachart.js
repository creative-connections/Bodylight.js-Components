import {ChartjsXy} from './chartjs-xy';
//import {BdlChartjs} from './chartjs';
import {bindable, useView} from 'aurelia-templating';
//import {PLATFORM} from 'aurelia-pal';
//@useView(PLATFORM.moduleName('./bdl-chartjs.html'))
@useView('./chartjs.html')
export class ChartjsXySachart extends ChartjsXy {
  @bindable fromid;
  @bindable labels;
  @bindable refindex;
  @bindable refvalues;
  @bindable type;
  @bindable labelx;
  @bindable labely;  
  
  

  constructor() {
    super();    
    this.customBackgroundPlugin = {
      beforeDatasetsDraw: function(chart, easing) {
        const acidbaseannotation = [[7.4,40,"Normal area"],
        [7.2,64,"Acute Hypercapnia"],
        [7.1,35,"Acute Base Deficit"],
        [7.1,18,"Chronic Base Deficit"],
        [7.41,20,"Chronic Hypocapnia"],
        [7.56,23,"Acute Hypocapnia"],
        [7.5,49,"Chronic Base Excess"],
        [7.3,80,"Chronic Hypercapnia"]];
      const acidbaselimitborders = [[[7.8,10.8],[7.46,29.1],[7.3,46.8],[6.89,148],[6.96,148],[7.33,52.1],[7.47,36.6],[7.8,13.8]],
        [[7.54,64.7],[7.42,52.1],[7.33,41.4],[7.22,28.7],[7.14,18.4],[7.07,11.6],[7.25,11.6],[7.28,15.8],[7.31,22.8],[7.38,29.1],[7.47,37.6],[7.52,41.4],[7.57,44.3],[7.66,47.3 ]],
        [[7.0,40.7],[7.09,43.9],[7.2,45.5],[7.39,45.5],[7.39,32.1],[7.25,31.7],[7.18,30.5],[7.06,27.6],[7.0,25.3]],
        [[7.412,18.90],[7.389,30.3],[7.354,50.7],[7.303,65.6],[7.221,96.3],[7.281,96.3],[7.37,66.2],[7.41,51.0],[7.44,38.7],[7.46,29.1],[7.48,18.5]]];
        let canvas = chart.ctx;
        let chartArea = chart.chartArea;
        let xAxis = chart.scales['x-axis-1']; // Get the x-axis
        let yAxis = chart.scales['y-axis-1']; // Get the y-axis
    
        // Convert your desired X and Y values to pixel values
        //let xPixel = xAxis.getPixelForValue(yourXValue); // Replace yourXValue with your X value
        //let yPixel = yAxis.getPixelForValue(yourYValue); // Replace yourYValue with your Y value
    
        // Set the style for your custom graphics
        //ctx.fillStyle = 'rgba(0, 255, 0, 0.1)'; // Example: green color with some transparency
    
        // Draw a rectangle (or any other shape) in the background
        // Adjust the position (xPixel, yPixel) and size (width, height) as needed
        //ctx.fillRect(xPixel, yPixel, width, height); // Replace width and height with your desired values
        canvas.strokeStyle = "#909090";
                    for (let i = 0; i < acidbaselimitborders.length; i++) {
                        canvas.beginPath();
                        canvas.moveTo(xAxis.getPixelForValue(acidbaselimitborders[i][0][0]), yAxis.getPixelForValue(acidbaselimitborders[i][0][1]));
                        for (let j = 1; j < acidbaselimitborders[i].length; j++) {
                            canvas.lineTo(xAxis.getPixelForValue(acidbaselimitborders[i][j][0]), yAxis.getPixelForValue(acidbaselimitborders[i][j][1]));
                        }
                        canvas.fill();
                    }
                    for (let i = 0; i < acidbaseannotation.length; i++) {
                      canvas.fillStyle = "#1030ff";
                      canvas.font = "10px Verdana";

                      let cx = xAxis.getPixelForValue(acidbaseannotation[i][0]);
                      let cy = xAxis.getPixelForValue(acidbaseannotation[i][1]);
                      //if ((cx > 0) && (cx < 600) && (cy > 0) && (cy < 400))
                      canvas.fillText(acidbaseannotation[i][2], cx, cy);

                  }

      }
    }
    this.min=10;
    this.max=100;
    this.xmin=7.0;
    this.xmax=7.8;    
  }

  bind() {    
    super.bind();
    this.plugins.push(this.customBackgroundPlugin);
  }    
}
