/*

    JS NN i based off https://jsfiddle.net/wbkgb73v/ 

*/

console.log('nn1.js loaded client-side');

//training set. [length, width, color(0=blue and 1=red)]
var dataB1 = [1,1,0];
var dataB2 = [2,1,0];
var dataB3 = [2,.5,0];
var dataB4 = [3,1,0];

var dataR1 = [3,1.5,1];
var dataR2 = [3.5,.5,1];
var dataR3 = [4,1.5,1];
var dataR4 = [5.5,1,1];

//unknown type (data we want to find)
var dataU = [4.5,1,"it should be 1"];

var all_points = [dataB1, dataB2, dataB3, dataB4, dataR1, dataR2, dataR3, dataR4];

function sigmoid(num){
    // sigmoid/logistic function f(x) = 1/(1 + e^-x)
    // takes any number and squashes it between 0-1 
    return 1/(1+ Math.exp(-num));
}

// training
function train() {
    // initial weights and bias's 
    let w1 = Math.random()*.2-.1; // outputs something like  
    let w2 = Math.random()*.2-.1; // 0.017256631509511206 or 
    let b = Math.random()*.2-.1;  // -0.036592206040574476
    
    //small learning rate, can be hard coded to different value
    let learning_rate = 0.2;

    for (let iter = 0; iter < 50000; iter++) {
        // pick a random point to start the training on
        let random_idx = Math.floor(Math.random() * all_points.length);
        let point = all_points[random_idx];
        // target stored in 3rd index of points
        let target = point[2]; 

        // feed forward or 'activate' aka do the calc.'s with 
        // weights and bias then squash it in sigmoid func.
        let z = w1 * point[0] + w2 * point[1] + b;
        let pred = sigmoid(z);

        // now we compare the model prediction with the target
        // this is the difference between pred and target squared
        let cost = (pred - target) ** 2; // idk why this is here, its not used

        // now we find the slope of the cost w.r.t. each parameter (w1, w2, b)
        // bring derivative through square function
        let dcost_dpred = 2 * (pred - target); 

        // bring derivative through sigmoid
        // derivative of sigmoid can be written using more sigmoids! d/dz sigmoid(z) = sigmoid(z)*(1-sigmoid(z))
        let dpred_dz = sigmoid(z) * (1-sigmoid(z));

        // I think you forgot these in your slope calculation? 
        let dz_dw1 = point[0];
        let dz_dw2 = point[1];
        let dz_db = 1;

        // now we can get the partial derivatives using the chain rule
        // notice the pattern? We're bringing how the cost changes through each function, first through the square, then through the sigmoid
        // and finally whatever is multiplying our parameter of interest becomes the last part
        let dcost_dw1 = dcost_dpred * dpred_dz * dz_dw1;
        let dcost_dw2 = dcost_dpred * dpred_dz * dz_dw2;
        let dcost_db =  dcost_dpred * dpred_dz * dz_db;

        // now we update our parameters!
        w1 -= learning_rate * dcost_dw1;
        w2 -= learning_rate * dcost_dw2;
        b -= learning_rate * dcost_db;
    }
    return {w1: w1, w2: w2, b: b};
}

document.querySelector('#flowersNN').addEventListener('submit', (event) => {
    event.preventDefault()
    let userLengthInput = document.querySelector('#userLengthInput').value;
    let userWidthInput = document.querySelector('#userWidthInput').value;
    console.log(`Length: ${userLengthInput} | Width: ${userWidthInput}`);
   
    let params = train();
    let model_out = sigmoid( userLengthInput * params.w1 + userWidthInput * params.w2 + params.b );
    console.log(model_out);
    let output = document.querySelector('#nn1Outputs');

    if(Math.round(model_out*100)/100 === 0) output.innerHTML += `<h5 style="" > Blue, target 0 | predicted number: ${model_out} </h5>`
    else output.innerHTML += `<h5> Red, target 1 | predicted number: ${model_out} </h5>`

    //output.innerHTML += `<h3> ${model_out} </h3>`
});

/* ~~~~ beginner NN code ~~~~~~ */
function training(prediction, target){
    let b = prediction;
    for(let i=0; i<500; i++){
        b = b - .1 * slope(b, target)
        console.log(b) 
    }
    console.log(`target: ${target}\ncalculated num: ${b}`);
}

function slope(prediction, target) {
    // derivative of (pred. - targ.)^2
    return 2 * (prediction - target);
}

function squaredErrorCost(prediction, target){ 
    // difference of prediction and target squared
    error = prediction - target;
    return Math.pow(error, 2); 
}



function beginnerNN(m1, m2, w1, w2, b){
    // two input neurons, one output with weights and bias
    // data enrty one * weight one, smae with two and then add bias 
    z = ((m1 * w1) + (m2 * w2)) + b;
    return sigmoid(z)
}
/* ~~~~ beginner NN code ~~~~~~ */