
function runApp() {

navigator.mediaDevices.getUserMedia({ audio: true, video: false }) .then(stream => {
    const audioContext = new AudioContext();
    const source = audioContext.createMediaStreamSource(stream);

    const analyzer = audioContext.createAnalyser();
    
    analyzer.fftSize = 2048;

    source.connect(analyzer);

    function changeDecibelValue(decibels) {
      const negativeDecibels = Math.max(decibels, 0);
      const decibelValue = document.getElementById('decibel-value');
      decibelValue.textContent = negativeDecibels.toFixed();
      colourChange(decibels);
      isRunning(runApp);
      notRunning(stopApp);
    }

    function analyzeAudio(){
  
    const storedData = new Uint8Array(analyzer.frequencyBinCount);
    analyzer.getByteFrequencyData(storedData);
    
    var sum = 0;
    for (let i = 0; i < storedData.length; i++) {
      sum += storedData[i];
    }
    
    // Calculate the average magnitude
    const average = sum / storedData.length;
    
    // Convert the average magnitude to decibels (dB)
    const decibels = 38 * Math.log10(average);



    changeDecibelValue(decibels);
    setTimeout(analyzeAudio, 100);

        }
      
      analyzeAudio();
      
      })



.catch(error => {console.error(error)
} );


    
 function colourChange(decibels){
    if (decibels <= 35){
      document.body.style.backgroundColor = "green";
      document.getElementById("text").innerHTML = " ";
      document.getElementById("text").innerHTML = "The audio is at a safe level";
    }
    else if (decibels >=40 && decibels <=60) {
      document.body.style.backgroundColor = "yellow";
      document.getElementById("text").innerHTML = "The audio is reaching a high level";
    }
    else if(decibels >=60 && decibels <=85) {
      document.body.style.backgroundColor = "red";
      document.getElementById("text").innerHTML = "The audio is too high! Lower it down";
    }
    
 }

 var functionsIsRunning = false;
 var functionNotRunning = false;
 


function isRunning(){
  if(!functionsIsRunning){
    functionsIsRunning = true;
    document.getElementById("button").disabled = true;
    }
  }

  function notRunning (){
    if(!functionNotRunning){
      functionNotRunning = true
      document.getElementById("stopButton").disabled = false;
    }
  }


  function stopApp(){
  if(!isRunning){
    return;
  }
}
}












  

