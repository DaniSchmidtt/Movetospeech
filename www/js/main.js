window.onload = async function() {

    var setText = function(x){
        var canvas = document.getElementById("plotting_canvas");
        var context = canvas.getContext('2d');
        context.clearRect(0, 0, canvas.width, canvas.height); 
        context.font = '50px serif'; 
        context.fillStyle = 'blue';
        context.fillText("1", (canvas.width / 8) *7, (canvas.height / 2));
        context.fillText("2", (canvas.width / 8) *5, (canvas.height / 2));
        context.fillText("3", (canvas.width / 8) *3, (canvas.height / 2));
        context.fillText("4", (canvas.width / 8) , (canvas.height / 2));
        var w = canvas.width
        var h = canvas.height
        if(x == 0){
            context.fillRect((canvas.width / 4) *3, 0, (canvas.width / 4) *4, (canvas.height ) );
        }
        if(x == 1){
            context.fillRect((canvas.width / 4)*2, 0, (canvas.width / 4), (canvas.height) );
        }
        if(x == 2){
            context.fillRect((canvas.width / 4), 0, (canvas.width / 4), (canvas.height) );
        }
        if(x == 3){
            context.fillRect(0, 0, (canvas.width / 4), (canvas.height ) );
        }
        for (x=0;x<=w;x+=(w/4)) {
            for (y=0;y<=h;y+=(h)) {
                context.moveTo(x, 0);
                context.lineTo(x, h);
                context.stroke();
                context.moveTo(0, y);
                context.lineTo(w, y);
                context.stroke();
            }
        }
        
    }
    //start the webgazer tracker
    await webgazer.setRegression('ridge') /* currently must set regression and tracker */
        //.setTracker('clmtrackr')
        .setGazeListener(function(data, clock) {
            if(data != null){

            w = window.innerWidth;
            h = window.innerHeight;
            
            if(data.x < w/4){
                setText(3)
            }else if(data.x > w/4 && data.x < w/2){
                setText(2)
            }
            else if(data.x > w/2 && data.x < (w*3)/4){
                setText(1)
            }
            else if(data.x > (w*3)/4){
                setText(0)
            }
        }    //console.log(data); /* data is an object containing an x and y key which are the x and y prediction coordinates (no bounds limiting) */
          //   console.log(clock); /* elapsed time in milliseconds since webgazer.begin() was called */
        })
        .saveDataAcrossSessions(true)
        .begin();
        webgazer.showVideoPreview(true) /* shows all video previews */
            .showPredictionPoints(true) /* shows a square every 100 milliseconds where current prediction is */
            .applyKalmanFilter(true); /* Kalman Filter defaults to on. Can be toggled by user. */

    //Set up the webgazer video feedback.
    var setup = function() {

        //Set up the main canvas. The main canvas is used to calibrate the webgazer.
        var canvas = document.getElementById("plotting_canvas");
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        canvas.style.position = 'fixed';
        var context = canvas.getContext('2d');
        context.clearRect(0, 0, canvas.width, canvas.height); 
    };
    setup();

};

// Set to true if you want to save the data even if you reload the page.
window.saveDataAcrossSessions = true;

window.onbeforeunload = function() {
    webgazer.end();
}

/**
 * Restart the calibration process by clearing the local storage and reseting the calibration point
 */
function Restart(){
    document.getElementById("Accuracy").innerHTML = "<a>Not yet Calibrated</a>";
    webgazer.clearData();
    ClearCalibration();
    PopUpInstruction();
}