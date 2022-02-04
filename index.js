const app = require('express')();
const bodyParser = require('body-parser');
const userRoutes = require('./routes/userRoutes');
const errorHandler = require('./middlewares/errorHandler');

app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.use('/user', userRoutes);

app.use(errorHandler);

app.listen(3000, () => console.log('ouvindo porta 3000!'));
