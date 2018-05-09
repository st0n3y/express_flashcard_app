'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const app = express();

app.set('view engine', 'pug');

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// app.use((req, res, next) => {
// 	req.message = 'This message made it';
// 	const err = new Error('Something went wrong');
// 	err.status = 500;
// 	next(err);
// });

app.use((req, res, next) => {
	console.log(req.message);
	next();
});

app.get('/', (req, res) => {
	const name = req.cookies.username;
	if(name) {
		res.render('index', { name });	
	} else {
		res.redirect('/hello');
	}
});

app.get('/cards', (req, res) => {
	res.render('card', { 
		prompt: "Who wrote Burmese Days?", 
		hint: "His birth name was Eric Blair",
	});
});

app.get('/hello', (req, res) => {
	const name = req.cookies.username;
	if(name) {
		res.redirect('/');	
	} else {
		res.render('hello');
	}
});

app.post('/hello', (req, res) => {
	res.cookie('username', req.body.username);
	res.redirect('/');
});

app.post('/goodbye', (req, res) => {
	res.clearCookie('username', { path: '/' });
	res.redirect('/hello');
});

app.use((req, res, next) => {
	const err = new Error("Not Found");
	err.status = 404;
	next(err);
});

app.use((err, req, res, next) => {
	res.locals.error = err;
	res.status(err.status);
	res.render('error');
});

app.listen(3000, () => {
	console.log('The application is running on localhost:3000');
});
