const express = require('express');
const app = express();
const port = 3000;
const router = require('./routers/index');
const session = require('express-session');


app.use(session({
    secret: 'biawak',
    resave: false,
    saveUninitialized: false,
    cookie: {secure: false, sameSite: true}
}))
app.set('view engine', 'ejs');
app.use(express.urlencoded({extended: true}));
app.use(router);


app.listen(port, () => {
    console.log(`Online on http://localhost:${port}`);
})