 const path          = require('path')
    ,  express       = require('express')
    ,  app           = express()
    ,  dotenv        = require('dotenv')
    ,  createError   = require('http-errors')
    ,  cors          = require('cors')
    ,  router        = require('./routes/index')
    ,  checkInternet = require('check-internet-connected')
    ,  swaggerUI = require('swagger-ui-express')
    ,  swaggerFile = require('./documentation.json')
    

app.use(cors());
app.use(express.json());
app.use('/api/v1', router);
app.use(express.static(path.join(__dirname, 'public')) );

// read the configuration setting inside "config/config.env";
dotenv.config({ path : './config/config.env' });

const port      = process.env.PORT || 5001
    , env       = process.env.NODE_ENV || 'development'

app.use(
    express.urlencoded({
        extended: true
    })
);

app.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        message: "Welcome to Chilli'n API!! This is a simple API that consume External API from Flickr API."
    });
});


checkInternet()
    .then((result) => {
        console.log("You are connected to Internet.");
    /* istanbul ignore if */
    }).catch((err) => {
        /* istanbul ignore next */
        console.log(`Sorrry, you are not connected to Internet, here is the error detail ${err}`);
    });


// get Swagger File for documentation
app.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerFile));


/* istanbul ignore next */
app.use(function (req, res, next) {
    /* istanbul ignore next */
    next(createError(404));
});


/* istanbul ignore next */
app.use(function (err, req, res, next) {
    /* istanbul ignore next */
    res.locals.message = err.message;
    /* istanbul ignore next */
    res.locals.error   = req.app.get('env') === 'development' ? err : {};

    /** Render the error pages */
    /* istanbul ignore next */
    res.status(err.status || 500);
    /* istanbul ignore next */
    res.json({error: err});
});


try {
    app.listen(port, () => {
        console.log(`Server is started at ${Date()} in ${env} mode!`);
        console.log(`Listening on Port ${port}!`);
    });
} catch (err) {;
    /* istanbul ignore next */
    console.log(err);
};



module.exports = app;




 