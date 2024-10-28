const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

// Permettre l'accès aux fichiers statiques
app.use(express.static('public'));

// Route pour la page d'accueil
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'));
});

// Route API pour récupérer les données
app.get('/api/results', (req, res) => {
    const results = require('../results.json');
    res.json(results);
});

app.listen(port, () => {
    console.log(`Serveur démarré sur http://localhost:${port}`);
});
