// listener for form submission
document.querySelector('#XORnnForm').addEventListener('submit', (event) => {
    event.preventDefault()
    let hiddenLayers = document.querySelector('#userHiddenLayerInput').value;
    let learningRate = document.querySelector('#userLearningRateInput').value;
    let numIterations = document.querySelector('#userNumIterations').value;
    console.log(`hiddenlayers: ${hiddenLayers.value} | learningrate: ${learningRate.value}`);
    XORNeuralNetwork(hiddenLayers, learningRate, numIterations);
});

const { Layer, Network } = window.synaptic;
async function XORNeuralNetwork(userHiddenLayers, userLearningRate, numIterations) {
    //creates the 'columns' of neurons
    var inputLayer = new Layer(2);
    var hiddenLayer = new Layer(userHiddenLayers);
    var outputLayer = new Layer(1);
    
    // links/connects the columns together
    inputLayer.project(hiddenLayer);
    hiddenLayer.project(outputLayer);

    //sets he network equal to all the linked columns 
    var myNetwork = new Network({
        input: inputLayer,
        hidden: [hiddenLayer],
        output: outputLayer
    });

    //area for outputs
    let outputs = document.querySelector('#nn0Outputs'); 
    outputs.innerHTML = ``;

    // with the learning rate and loop through
    // activating and propagating
    var learningRate = userLearningRate;
    for (var i=0; i < numIterations * 1000 ; i++){
        // 0,0 -> 0
        myNetwork.activate([0,0]);
        myNetwork.propagate(learningRate, [0]);
        // 0,1 -> 1
        myNetwork.activate([0,1]);
        myNetwork.propagate(learningRate, [1]);
        // 1,0 -> 1
        myNetwork.activate([1,0]);
        myNetwork.propagate(learningRate, [1]);
        // 1,1 -> 0
        myNetwork.activate([1,1]);
        myNetwork.propagate(learningRate, [0]);
    }

    // creates loading circle and then clears area for answers
    outputs.innerHTML += `<div class='row'> <div id='loading' class='col-1'> </div> <div class='col'> <p> running neural network </p> </div> </div>`;
    await new Promise(r => setTimeout(r, 2000));
    outputs.innerHTML = ``;

    // outputs put to the screen
    outputs.innerHTML += `<p id='output1' class=''> [0,0] expected output -> 0, claculated output -> ${Math.round(myNetwork.activate([0,0])[0])} or ${myNetwork.activate([0,0])[0]}</p>`;
    outputs.innerHTML += `<p id='output2' class=''> [0,1] expected output -> 1, claculated output -> ${Math.round(myNetwork.activate([0,1])[0])} or ${myNetwork.activate([0,1])[0]}</p>`;
    outputs.innerHTML += `<p id='output3' class=''> [1,0] expected output -> 1, claculated output -> ${Math.round(myNetwork.activate([1,0])[0])} or ${myNetwork.activate([1,0])[0]}</p>`;
    outputs.innerHTML += `<p id='output4' class=''> [1,1] expected output -> 0, claculated output -> ${Math.round(myNetwork.activate([1,1])[0])} or ${myNetwork.activate([1,1])[0]}</p>`;
    // test the network in console
    console.log(myNetwork.activate([0,0])[0]); // [0.015020775950893527]
    console.log(myNetwork.activate([0,1])[0]); // [0.9815816381088985]
    console.log(myNetwork.activate([1,0])[0]); // [0.9871822457132193]
    console.log(myNetwork.activate([1,1])[0]); // [0.012950087641929467] 
}