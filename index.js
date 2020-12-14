 const path          = require('path')
    ,  express       = require('express')
    ,  app           = express()
    ,  dotenv        = require('dotenv')
    ,  createError   = require('http-errors')
    ,  cors          = require('cors')
    ,  router        = require('./routes/index')
    ,  checkInternet = require('check-internet-connected')

app.use(cors());
app.use(express.json());
app.use('/api/v1', router);
app.use(express.static(path.join(__dirname, 'public')) );

const port      = process.env.PORT || 5001
    , env       = process.env.NODE_ENV || 'development'

if(env === "development" || env === "test") {
    dotenv.config({ path : './config/config.env' })
}

app.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        message: "Welcome to Chilli'n API!! This is a simple API that consume External API from Flickr API."
    });
});

// Check if connected to internet or Not, Since this API consume External API.
checkInternet()
    .then((result) => {
        console.log("You are connected to Internet.");
    }).catch((err) => {
        console.log(`Sorrry, you are not connected to Internet, here is the error detail ${err}`);
    });

// Catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// Error Handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error   = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.json({error: err});
});

try {
    app.listen(port, () => {
        console.log(`Server is started at ${Date()} in ${env} mode!`);
        console.log(`Listening on Port ${port}!`);
    });
} catch (err) {;
    console.log(err);
};



module.exports = app;




 