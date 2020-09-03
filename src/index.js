const express = require('express');
const bodyParser = require('body-parser');
const swaggerUI = require('swagger-ui-express');
const createMiddleware = require('@apidevtools/swagger-express-middleware')
const path = require('path');
const swaggerDocument = require('./swagger.json')
const routes = require('./src/routes')

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get('/health', (req, res) => {
    res.send(`I will always work as intended ;)`);
});

app.use('/swaggerui', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

createMiddleware(swaggerDocument, app, (err, middleware) => {
    app.enable('case sensitive routing')

    app.use(
       middleware.metadata(),
       middleware.CORS(),
       middleware.files(),
       middleware.parseRequest(),
       middleware.validateRequest(),
       middleware.mock()
   )

    app.use(function(err, req, res, next) {
        console.log(`[${err.status}] ${err.name} - ${err.message}`)
        console.log(`${err.stack}`)
        res.status(err.status);
        res.send(
            { message: (`[${err.status}] ${err.name} - ${err.message}`) }
        );
    });
});

app.use('/user', routes.createUser);

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`App listening on port: ${port}`);
    console.log('    [INFO] Swagger path = ' + path.resolve(__dirname, './swagger.json'));
});