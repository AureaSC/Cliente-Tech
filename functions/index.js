const functions = require('firebase-functions');
const express = require('express');
const bodyParser = require('body-parser');
const Lead = require('./Lead');
// const cors = require('cors');


/* -- TRATATIVA PARA ENCONTRAR ERRO NO DIRETORIO:
try{
    const Lead = require('/Users/Aurea/Documents/Gama Academy/Assigments/ClienteTech/Lead.js');
  }catch(e){
    console.log(e.stack)
  }*/

const app = express();
// app.use(cors({ origin: true }));
// Add middleware to authenticate requests
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.sendfile('./public/index.html');
});

app.post('/leads', (req, res) => {
  const dataForm = req.body;
  const lead = Lead.create(dataForm);
  res.send("Obrigado por se cadastrar;)");
});

app.get('/leads.csv', (req, res) => {
  res.setHeader('Content-Type', 'text/csv'); 
  res.setHeader('Content-Disposition', 'attachment; filename=' + 'meusleads.csv');
  
  Lead.csv((data) => {
      res.send(data);
  });
});

exports.api = functions.https.onRequest(app);
// app.listen(3000);