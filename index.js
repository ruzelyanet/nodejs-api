const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');


const mongoUrl = 'mongodb://localhost:27017/online-store';
mongoose.connect(
    mongoUrl,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
);

const Product = mongoose.model('Product', {
    id: Number,
    name: String,
    price: mongoose.Schema.Types.Decimal128
});


const app = express();
app.use(bodyParser.json());


app.get(
    '/products',
    (req, res) => Product.find()
        .exec()
        .then(products => res.json(products))
);

app.post(
    '/products',
    (req, res) => Product.create(req.body)
        .then(createdProduct => res.json(createdProduct))
);

app.put(
    '/products/:id',
    (req, res) => Product.findOneAndUpdate({ id: req.params.id }, req.body)
        .exec()
        .then(product => res.json(product))
);

app.delete(
    '/products/:id',
    (req, res) => Product.deleteOne({ id: req.params.id })
        .exec()
        .then(() => res.json({ success: true }))
);



// eslint-disable-next-line
app.listen(3004, () => console.log('Listening on port 3004...'));

