const express = require('express');
const app = express();
const passport = require('passport');
const flash = require('connect-flash');
const methodOverride = require('method-override');
const session = require('express-session');
const connectDB = require('./config/db');
const passportStrategy = require('./config/passport');
const config = require('config');


// Database Connect
connectDB();


// Passport Strategy initialize
passportStrategy(passport);

// Body Parser Setup
app.use(express.urlencoded({extended: true}));


// View Engine
app.use(express.static(__dirname + '/public'));
app.set('view engine', 'ejs');
app.use(methodOverride('_method'));

// Session Setup
app.use(session({
    secret: config.get('sessionSecret'),
    resave: false,
    saveUninitialized: false
}));
// Passport Setup
app.use(passport.initialize());
app.use(passport.session());

// Flash Setup

// Routes
app.get('/', (req, res) => {
    res.render('index', {user: req.user});
});
app.get('/about', (req, res) => {
    res.render('about', {user: req.user});
});
app.use('/auth', require('./routes/auths'));
app.use('/users', require('./routes/users'));

// Server Port 
const PORT = process.env.PORT || 5000;
app.listen(PORT, process.env.IP, () => {
    console.log(`Server started on port ${PORT}`);
});


