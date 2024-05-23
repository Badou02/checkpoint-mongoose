// server.js ou app.js

// Charger les variables d'environnement depuis le fichier .env
require('dotenv').config();

// Importer Mongoose
const mongoose = require('mongoose');

// Importer le modèle Person
const Person = require('./models/Person'); 

// Vérifier si l'URI est correctement récupéré
console.log('MONGO_URI:', process.env.MONGO_URI);

// Connexion à la base de données MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Successfully connected to MongoDB');

    // Appeler les fonctions de création et de recherche après la connexion
    createMultiplePeople();
    removePeopleByName('Mary');
    findPeopleByName('John Doe');
    findPersonByFavoriteFood('Pizza');
    findPersonById('votre_person_id');
    findPeopleWhoLikeBurritos();
  })
  .catch(err => console.error('Connection error', err));

// Supprimer toutes les personnes nommées 'Mary'
function removePeopleByName(name) {
  Person.remove({ name }, (err, result) => {
    if (err) return console.error(err);
    console.log('People removed:', result);
  });
}

// Créer et sauvegarder plusieurs personnes
function createMultiplePeople() {
  const arrayOfPeople = [
    { name: 'Jane Doe', age: 25, favoriteFoods: ['Salad', 'Pasta'] },
    { name: 'Emily Smith', age: 35, favoriteFoods: ['Sushi', 'Steak'] },
    { name: 'Michael Johnson', age: 28, favoriteFoods: ['Tacos', 'Burritos'] }
  ];

  Person.create(arrayOfPeople, (err, people) => {
    if (err) return console.error(err);
    console.log('People created:', people);
  });
}

// Trouver toutes les personnes nommées 'John Doe'
function findPeopleByName(name) {
  Person.find({ name }, (err, people) => {
    if (err) return console.error(err);
    console.log('People found:', people);
  });
}

// Trouver une personne qui aime 'Pizza'
function findPersonByFavoriteFood(food) {
  Person.findOne({ favoriteFoods: food }, (err, person) => {
    if (err) return console.error(err);
    console.log('Person found:', person);
  });
}

// Trouver une personne par son identifiant
function findPersonById(personId) {
  Person.findById(personId, (err, person) => {
    if (err) return console.error(err);
    console.log('Person found by ID:', person);
  });
}

// Trouver des personnes qui aiment les burritos, trier par nom, limiter à 2 résultats, masquer l'âge
function findPeopleWhoLikeBurritos() {
  Person.find({ favoriteFoods: 'Burritos' })
    .sort('name')
    .limit(2)
    .select('-age')
    .exec((err, data) => {
      if (err) return console.error(err);
      console.log('People who like burritos:', data);
    });
}
