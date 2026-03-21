const express = require('express');
const router = express.Router();
const pool = require('../db');
const jwt = require('jsonwebtoken');

// Middleware pour vérifier le token
const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Token manquant' });
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch {
    res.status(401).json({ message: 'Token invalide' });
  }
};

// GET tous les événements
router.get('/', async (req, res) => {
  try {
    const events = await pool.query(
      'SELECT * FROM events ORDER BY date ASC'
    );
    res.json(events.rows);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET un événement + ses clients inscrits
router.get('/:id', async (req, res) => {
  try {
    const event = await pool.query(
      'SELECT * FROM events WHERE id = $1', [req.params.id]
    );
    if (event.rows.length === 0) {
      return res.status(404).json({ message: 'Événement non trouvé' });
    }
    const registrations = await pool.query(
      `SELECT users.id, users.name, users.email 
       FROM registrations 
       JOIN users ON registrations.user_id = users.id 
       WHERE registrations.event_id = $1`,
      [req.params.id]
    );
    res.json({ 
      event: event.rows[0], 
      registeredClients: registrations.rows 
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST créer un événement
router.post('/', async (req, res) => {
  try {
    const { title, description, date, location } = req.body;
    const newEvent = await pool.query(
      'INSERT INTO events (title, description, date, location) VALUES ($1, $2, $3, $4) RETURNING *',
      [title, description, date, location]
    );
    res.status(201).json(newEvent.rows[0]);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// DELETE supprimer un événement
router.delete('/:id', async (req, res) => {
  try {
    await pool.query(
      'DELETE FROM registrations WHERE event_id = $1', [req.params.id]
    );
    await pool.query(
      'DELETE FROM events WHERE id = $1', [req.params.id]
    );
    res.json({ message: 'Événement supprimé avec succès' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST s'inscrire à un événement
router.post('/:id/register', verifyToken, async (req, res) => {
  try {
    const alreadyRegistered = await pool.query(
      'SELECT * FROM registrations WHERE user_id = $1 AND event_id = $2',
      [req.user.id, req.params.id]
    );
    if (alreadyRegistered.rows.length > 0) {
      return res.status(400).json({ message: 'Déjà inscrit à cet événement' });
    }
    await pool.query(
      'INSERT INTO registrations (user_id, event_id) VALUES ($1, $2)',
      [req.user.id, req.params.id]
    );
    res.status(201).json({ message: 'Inscription réussie !' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;