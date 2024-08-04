const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
const port = 3003;

app.use(cors());
app.use(express.json());

// Configurer la connexion à la base de données
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'tenjin_bdd'
});

db.connect(err => {
    if (err) {
      throw err;
    }
    console.log('MySQL connected...');
  });
  
  // Route pour obtenir des données de la table sellers
  app.get('/api/sellers', (req, res) => {
    let sql = 'SELECT * FROM sellers';
    db.query(sql, (err, results) => {
      if (err) throw err;
      res.send(results);
    });
  });
  
  // Route pour obtenir des données de la table customers
  app.get('/api/customers', (req, res) => {
    let sql = 'SELECT * FROM customers';
    db.query(sql, (err, results) => {
      if (err) throw err;
      res.send(results);
    });
  });
  
  // Route pour obtenir des données de la table authors
  app.get('/api/authors', (req, res) => {
    let sql = 'SELECT * FROM authors';
    db.query(sql, (err, results) => {
      if (err) throw err;
      res.send(results);
    });
  });
  
  // Route pour obtenir des données de la table invoices
  app.get('/api/invoices', (req, res) => {
    let sql = 'SELECT * FROM invoices';
    db.query(sql, (err, results) => {
      if (err) throw err;
      res.send(results);
    });
  });
  
  // Route pour obtenir des données de la table locations
  app.get('/api/locations', (req, res) => {
    let sql = 'SELECT * FROM locations';
    db.query(sql, (err, results) => {
      if (err) throw err;
      res.send(results);
    });
  });
  
  // Route pour obtenir des données de la table publics
  app.get('/api/publics', (req, res) => {
    let sql = 'SELECT * FROM publics';
    db.query(sql, (err, results) => {
      if (err) throw err;
      res.send(results);
    });
  });
  
  // Route pour obtenir des données de la table publishers
  app.get('/api/publishers', (req, res) => {
    let sql = 'SELECT * FROM publishers';
    db.query(sql, (err, results) => {
      if (err) throw err;
      res.send(results);
    });
  });
  
  // Route pour obtenir des données de la table series
  app.get('/api/series', (req, res) => {
    let sql = 'SELECT * FROM series';
    db.query(sql, (err, results) => {
      if (err) throw err;
      res.send(results);
    });
  });
  
  // Route pour obtenir des données de la table volumes
  app.get('/api/volumes', (req, res) => {
    let sql = 'SELECT * FROM volumes';
    db.query(sql, (err, results) => {
      if (err) throw err;
      res.send(results);
    });
  });
  
  // Route pour obtenir des données de la table volume_types
  app.get('/api/volume_types', (req, res) => {
    let sql = 'SELECT * FROM volume_types';
    db.query(sql, (err, results) => {
      if (err) throw err;
      res.send(results);
    });
  });

// Route pour obtenir des données de la table customers
app.get('/api/customers', (req, res) => {
  let sql = 'SELECT customer_name FROM customers';
  db.query(sql, (err, results) => {
    if (err) throw err;
    res.send(results);
  });
});

// Route pour obtenir les données des vendeurs
app.get('/api/sellers', (req, res) => {
  const query = 'SELECT seller_name, seller_city FROM your_table_name';
  connection.query(query, (err, results) => {
    if (err) {
      console.error('Erreur lors de l\'exécution de la requête :', err);
      res.status(500).send('Erreur du serveur');
      return;
    }
    res.json(results);
  });
});
  
  app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
  });