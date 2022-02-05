const app = require('express')();
const bodyParser = require('body-parser');

const { errorHandler, authValidation } = require('./middlewares');

const { rootRoutes, categoryRoutes, userRoutes } = require('./routes');

app.use(bodyParser.json());
app.use(authValidation);

app.use('/', rootRoutes);
app.use('/user', userRoutes);
app.use('/categories', categoryRoutes);

app.use(errorHandler);

app.listen(3000, () => console.log('ouvindo porta 3000!'));
