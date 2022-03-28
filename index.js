const app = require('express')();
const bodyParser = require('body-parser');
require('dotenv/config');

const { PORT } = process.env;

const { errorHandler, authValidation } = require('./middlewares');

const { rootRoutes, categoryRoutes, userRoutes, postRoutes } = require('./routes');

app.use(bodyParser.json());
app.use(authValidation);

app.use('/', rootRoutes);
app.use('/user', userRoutes);
app.use('/categories', categoryRoutes);
app.use('/post', postRoutes);

app.use(errorHandler);

app.listen(PORT, () => console.log(`Ouvindo na porta ${PORT}`));
