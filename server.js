const express = require('express');
const mongoose = require('mongoose');
const app = express();
const ejs = require('ejs');
const { kStringMaxLength } = require('buffer');

app.set('view engine', 'ejs');


mongoose.connect(`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.txq9fum.mongodb.net/test`, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
const AttSchema = {
    Name: String,
    Time: String,
    Date: String
}

const pain = mongoose.model('pain', AttSchema, 'pain');

app.get('/', (req, res) => {
   
    pain.find({})
      .then(stds => {
        res.render('index', {
          stdList: stds
        });
      })
      .catch(err => {
        console.error(err);
        res.status(500).send('Error fetching data');
      });
  });
  
  app.use(express.static('views'));
app.listen(3000, function() {
    console.log('server is running');
})
