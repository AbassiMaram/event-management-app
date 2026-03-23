'use client';

import { useState } from 'react';
import axios from 'axios';
import ClientsList from './ClientsList';

interface Event {
  id: number;
  title: string;
  description: string;
  date: string;
  location: string;
}

interface Props {
  event: Event;
  onDelete: (id: number) => void;
}

export default function EventCard({ event, onDelete }: Props) {
  const [showClients, setShowClients] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const handleDelete = async () => {
    if (!confirm('Voulez-vous vraiment supprimer cet événement ?')) return;
    setDeleting(true);
    try {
      await axios.delete(`http://localhost:5000/api/events/${event.id}`);
      onDelete(event.id);
    } catch (error) {
      console.error('Erreur suppression:', error);
    } finally {
      setDeleting(false);
    }
  };

  const formattedDate = new Date(event.date).toLocaleDateString('fr-FR', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="group relative overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl">
      {/* Top gradient accent */}
      <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500" />

      <div className="p-6 flex flex-col gap-4">
        {/* Header */}
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-2">
              <span className="inline-flex items-center rounded-full bg-blue-50 px-3 py-0.5 text-xs font-semibold text-blue-700 ring-1 ring-inset ring-blue-200">
                Événement
              </span>
            </div>

            <h2 className="text-xl font-semibold text-gray-900 leading-tight truncate group-hover:text-blue-600 transition-colors">
              {event.title}
            </h2>

            <p className="mt-2 text-sm text-gray-500 line-clamp-2">
              {event.description}
            </p>
          </div>

          {/* Actions */}
          <div className="flex flex-col gap-2">
            <button
              onClick={handleDelete}
              disabled={deleting}
              className="flex items-center justify-center gap-2 rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-sm font-medium text-red-600 transition hover:bg-red-100 disabled:opacity-50"
            >
              {deleting ? (
                <svg className="h-4 w-4 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v8z"
                  />
                </svg>
              ) : (
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  />
                </svg>
              )}
              {deleting ? 'Suppression...' : 'Supprimer'}
            </button>

            <button
              onClick={() => setShowClients(!showClients)}
              className="flex items-center justify-center gap-2 rounded-xl border border-blue-200 bg-blue-50 px-3 py-2 text-sm font-medium text-blue-600 transition hover:bg-blue-100"
            >
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              {showClients ? 'Masquer' : 'Clients'}
            </button>
          </div>
        </div>

        {/* Meta info */}
        <div className="flex flex-wrap gap-3">
          <div className="flex items-center gap-2 rounded-lg bg-gray-50 px-3 py-1.5 text-sm text-gray-600 ring-1 ring-inset ring-gray-200">
            <svg className="h-4 w-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            <span className="capitalize">{formattedDate}</span>
          </div>

          <div className="flex items-center gap-2 rounded-lg bg-gray-50 px-3 py-1.5 text-sm text-gray-600 ring-1 ring-inset ring-gray-200">
            <svg className="h-4 w-4 text-rose-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
            <span>{event.location}</span>
          </div>
        </div>

        {/* Clients list */}
        {showClients && (
          <div className="mt-2 border-t border-gray-100 pt-4 animate-in fade-in slide-in-from-top-2">
            <ClientsList eventId={event.id} />
          </div>
        )}
      </div>
    </div>
  );
}
