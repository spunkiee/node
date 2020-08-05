const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const v1Routes = require('./routes/v1');

mongoose.connect("mongodb://localhost:27017/blogs", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false 
});

const PORT = 3000;
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended : true }));

app.set('view engine', 'pug');
app.set('views', 'views');

app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/v1', v1Routes);

app.use('*', (__, res) => {
    res.sendFile(path.join(__dirname, 'views/404.html'));
});

app.listen(PORT, () => console.info(`Listning:  ${PORT}`)); 