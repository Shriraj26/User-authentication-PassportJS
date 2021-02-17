//1 - Basic Server Creation
//2 - Setup routes and controller
//3 - Set the View Engine to EJS
//4 - Setup Static assets
//5 - Test the DB if connected or not
//6 - Tell the index.js that we use urlencoded to get the client data
//7 - Passport Things
//8 - Mongo Store

//1
const express = require('express');

//7

const cookieParser = require('cookie-parser');
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');

//8 
const MongoStore = require('connect-mongo')(session);

//1
const port = 9000;
const app = express();

//6
app.use(express.urlencoded());  

//7
app.use(cookieParser());


//v.imp!! it connects to MongoDB
const db = require('./config/mongoose');

//3
app.set('view engine', 'ejs');
app.set('views', './views');

//4
app.use(express.static('./assets'));


//7
//8 we will use mongostore to store session details in DB
app.use(session({
 	name: 'user-auth-project-using-passportJS',
 	secret: 'blahsomething',  //this key is used to encrypt the cookie
 	saveUninitialized: false,
 	resave: false,
 	cookie: {
 		maxAge: 1000*60*100
 		//1000 - 1 ms so 1000*60*100 = 10 mins we keep cookie age of only 10 mins and it expires after that.
	},
	store: new MongoStore({
		
			mongooseConnection: db,
			autoRemove: 'disabled'
		
		},
		function(err){
			console.log(err|| 'Connect-Mongo --> Mongo-session store in DB okay!');
		}
	)
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser)

//2 
app.use('/', require('./routes'));


//1
app.listen(port, function(err){
	if(err){
		console.log('Server failed to start');
	}
	console.log('Server running successfully on port ',port);
})

