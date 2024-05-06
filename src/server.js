const express = require('express'); 
var expressLayouts = require('express-ejs-layouts');
const path = require('path') 
const app = express(); 
const bodyParser = require('body-parser');
const title = require('process');

const PORT = 3000; 

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.set('layout', './layouts/application');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(expressLayouts);
app.use(express.static(__dirname + '/public'));
//app.use('/public/images', express.static(__dirname + '/public/images'));

app.get('/', (req, res)=>{ 
	res.render('index', {title: 'Neural Networks!', description: 'Home page that will direct you to the different kinds of neural networks and how to learn them.'} )
});

app.get('/nn0', (req, res)=>{ 
    res.render('nn0', {title: 'Nueral Network One', description: 'Nueral Network One Description'}) 
}); 
app.get('/nn1', (req, res)=>{ 
    res.render('nn1', {title: 'Nueral Network Two', description: 'Nueral Network Two Description'}) 
}); 
app.get('/nn2', (req, res)=>{ 
    res.render('nn2', {title: 'Nueral Network Three', description: 'Nueral Network Three Description'}) 
}); 

app.listen(PORT, (error) =>{ 
	if(!error) {
		console.log("Server is Successfully Running,and App is listening on port "+ PORT)
    } 
	else{
		console.log("Error occurred, server can't start", error); 
	} 
}); 
