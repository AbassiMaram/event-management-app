'use client';

import { useState } from 'react';
import axios from 'axios';

interface Event {
  id: number;
  title: string;
  description: string;
  date: string;
  location: string;
}

interface Props {
  onEventAdded: (event: Event) => void;
}

export default function AddEventForm({ onEventAdded }: Props) {
  const [form, setForm] = useState({
    title: '',
    description: '',
    date: '',
    location: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await axios.post(
        'http://localhost:5000/api/events',
        form
      );
      onEventAdded(res.data);
      setForm({ title: '', description: '', date: '', location: '' });
    } catch (error) {
      setError('Erreur lors de la création de l\'événement');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
      <h2 className="text-xl font-bold text-gray-800 mb-4">
        ➕ Ajouter un événement
      </h2>
      {error && (
        <p className="text-red-500 text-sm mb-3">{error}</p>
      )}
      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          type="text"
          placeholder="Titre de l'événement"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          required
          className="w-full border border-gray-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <textarea
          placeholder="Description"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          className="w-full border border-gray-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          rows={3}
        />
        <input
          type="datetime-local"
          value={form.date}
          onChange={(e) => setForm({ ...form, date: e.target.value })}
          required
          className="w-full border border-gray-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <input
          type="text"
          placeholder="Lieu"
          value={form.location}
          onChange={(e) => setForm({ ...form, location: e.target.value })}
          className="w-full border border-gray-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-500 text-white py-2 rounded-lg font-semibold hover:bg-blue-600 transition disabled:opacity-50"
        >
          {loading ? 'Création...' : 'Créer l\'événement'}
        </button>
      </form>
    </div>
  );
}