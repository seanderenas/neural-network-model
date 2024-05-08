console.log('nn1.js loaded client-side');


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