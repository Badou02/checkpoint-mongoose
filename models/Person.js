// models/Person.js

// Importer Mongoose
const mongoose = require('mongoose');

// Définir le schéma de la personne
const personSchema = new mongoose.Schema({
  name: { type: String, required: true }, // Le nom est une chaîne obligatoire
  age: Number, // L'âge est un nombre
  favoriteFoods: [String] // Les aliments préférés sont un tableau de chaînes
});

// Créer le modèle Person
const Person = mongoose.model('Person', personSchema);

// Exporter le modèle Person
module.exports = Person;
