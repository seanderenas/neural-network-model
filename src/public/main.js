console.log('Main.js loaded client-side');

const { Layer, Network } = window.synaptic;
let title = document.querySelector('.title');

if(title.innerHTML === 'Nueral Network One'){
    nn0();
} 
else if (title.innerHTML === 'Nueral Network Two'){
    nn1();
} 
else if (title.innerHTML === 'Nueral Network Three'){
    nn2();
} 
else {
    console.log('main page')
}

function nn0() {
    console.log('NN0')
}

if(document.querySelector('#XORnnForm')) {
    document.querySelector('#XORnnForm').addEventListener('submit', (event) => {
    event.preventDefault()
    let hiddenLayers = document.querySelector('#userHiddenLayerInput');
    let learningRate = document.querySelector('#userLearningRateInput');
    console.log(`hiddenlayers: ${hiddenLayers.value} | learningrate: ${learningRate.value}`);
    XORNeuralNetwork(hiddenLayers.value, learningRate.value);
})};

function nn1() {
    console.log('NN1')
}
function nn2() {
    console.log('NN2')
}

function training(prediction, target){
    let b = prediction;
    for(let i=0; i<300; i++){
        b = b - .1 * slope(b, target)
        console.log(b)
    }
}

/* ~~~~ beginner NN code ~~~~~~ */
function slope(prediction, target) {
    // derivative of (pred. - targ.)^2
    return 2 * (prediction - target);
}

function squaredErrorCost(prediction, target){ 
    // difference of prediction and target squared
    error = prediction - target;
    return Math.pow(error, 2); 
}

function sigmoid(num){
    // sigmoid/logistic function f(x) = 1/(1 + e^-x)
    // takes any number and squashes it between 0-1 
    return 1/(1+ Math.pow(Math.exp(1), -num));
}

function beginnerNN(m1, m2, w1, w2, b){
    // two input neurons, one output with weights and bias
    // data enrty one * weight one, smae with two and then add bias 
    z = ((m1 * w1) + (m2 * w2)) + b;
    return sigmoid(z)
}
/* ~~~~ beginner NN code ~~~~~~ */


async function XORNeuralNetwork(userHiddenLayers, userLearningRate) {
    
    var inputLayer = new Layer(2);
    var hiddenLayer = new Layer(userHiddenLayers);
    var outputLayer = new Layer(1);

    inputLayer.project(hiddenLayer);
    hiddenLayer.project(outputLayer);

    var myNetwork = new Network({
        input: inputLayer,
        hidden: [hiddenLayer],
        output: outputLayer
    });

    //set the outputs to screen
    let outputs = document.querySelector('#nn0Outputs'); 
    outputs.innerHTML = ``;

    // train the network - learn XOR
    var learningRate = userLearningRate;
    let solved = false
    for (var i=0; !(Math.round(myNetwork.activate([0,0])) == 0 && Math.round(myNetwork.activate([1,1])) == 0 && Math.round(myNetwork.activate([0,1])) == 1 && Math.round(myNetwork.activate([1,0])) == 1) ; i++)
    {
        // 0,0 => 0
        myNetwork.activate([0,0]);
        myNetwork.propagate(learningRate, [0]);

        // 0,1 => 1
        myNetwork.activate([0,1]);
        myNetwork.propagate(learningRate, [1]);

        // 1,0 => 1
        myNetwork.activate([1,0]);
        myNetwork.propagate(learningRate, [1]);

        // 1,1 => 0
        myNetwork.activate([1,1]);
        myNetwork.propagate(learningRate, [0]);
    }

    outputs.innerHTML += `<p> ${i} </p>`;
    outputs.innerHTML += `<p> running neural network </p>`;
    await new Promise(r => setTimeout(r, 2000));
    outputs.innerHTML = ``;

    
    outputs.innerHTML += `<p id='output1' class=''> [0,0] expected output -> 0, claculated output -> ${Math.round(myNetwork.activate([0,0])[0])} or ${myNetwork.activate([0,0])[0]}</p>`;
    outputs.innerHTML += `<p id='output2' class=''> [0,1] expected output -> 1, claculated output -> ${Math.round(myNetwork.activate([0,1])[0])} or ${myNetwork.activate([0,1])[0]}</p>`;
    outputs.innerHTML += `<p id='output3' class=''> [1,0] expected output -> 1, claculated output -> ${Math.round(myNetwork.activate([1,0])[0])} or ${myNetwork.activate([1,0])[0]}</p>`;
    outputs.innerHTML += `<p id='output4' class=''> [1,1] expected output -> 0, claculated output -> ${Math.round(myNetwork.activate([1,1])[0])} or ${myNetwork.activate([1,1])[0]}</p>`;
    // test the network
    console.log(myNetwork.activate([0,0])[0]); // [0.015020775950893527]
    console.log(myNetwork.activate([0,1])[0]); // [0.9815816381088985]
    console.log(myNetwork.activate([1,0])[0]); // [0.9871822457132193]
    console.log(myNetwork.activate([1,1])[0]); // [0.012950087641929467] 
}
