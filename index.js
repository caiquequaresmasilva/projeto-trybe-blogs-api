const app = require('express')();
const bodyParser = require('body-parser');
const userRoutes = require('./routes/userRoutes');
const rootRoutes = require('./routes/rootRoutes');
const errorHandler = require('./middlewares/errorHandler');
const authValidation = require('./middlewares/authValidation');

app.use(bodyParser.json());
app.use(authValidation);

app.use('/', rootRoutes);
app.use('/user', userRoutes);

app.use(errorHandler);

app.listen(3000, () => console.log('ouvindo porta 3000!'));
