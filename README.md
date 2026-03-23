# 🎉 Event Management App

Application de gestion d'événements — Full Stack Next.js / Node.js / React Native

## 📋 Description

Application complète de gestion d'événements comprenant :
- **Backend** : API REST Node.js/Express avec base de données PostgreSQL (Neon)
- **Web** : Interface Next.js pour la gestion des événements
- **Mobile** : Application React Native (Expo) pour les clients

---

## 📸 Aperçu de l'application

### 🌐 Interface Web

<div align="center">
  <img width="1441" height="951" alt="web-list" src="https://github.com/user-attachments/assets/081cdb05-6687-4cdd-ac43-29e74bb38906" />
  <p><em>Liste des événements</em></p>
</div>

<div align="center">
  <img width="966" height="910" alt="web-add" src="https://github.com/user-attachments/assets/9a46d608-f432-4d62-9829-44c1450059c9" />

  <p><em>Formulaire d'ajout d'événement</em></p>
</div>

<div align="center">
  <img width="870" height="845" alt="client-web" src="https://github.com/user-attachments/assets/8c90817b-e6df-4e2c-a3b9-742c808a563a" />

  
  <p><em>Clients inscrits à un événement</em></p>
</div>

---

### 📱 Application Mobile

<div align="center">
  <img src="https://github.com/user-attachments/assets/66d06e8d-bf53-4dd6-bb5c-7bc0b0813865" width="28%" alt="Liste événements mobile" />
  &nbsp;&nbsp;
  <img src="https://github.com/user-attachments/assets/d4fcb014-0148-4c73-9e36-f52e04a0b006" width="28%" alt="Détail événement" />
  &nbsp;&nbsp;
  <img src="https://github.com/user-attachments/assets/0511fab0-6b4e-4d1b-adb7-5d9e90667333" width="28%" alt="Inscription" />
  &nbsp;&nbsp;
  <img src="https://github.com/user-attachments/assets/4b9c1140-72cb-4950-a021-3f27c6630dde" width="28%" alt="Connexion" />
  <p><em>Liste — Détail — Inscription — Connexion</em></p>
</div>

<div align="center">
  <img src="https://github.com/user-attachments/assets/65a77590-af1a-4ee4-8cb3-2ed1f20b3819" width="28%" alt="Inscription événement" />
  <p><em>Inscription à un événement</em></p>
</div>

---

## 🚀 Prérequis

- Node.js >= 18
- npm
- Expo Go (sur téléphone Android/iOS)

---

## ⚙️ Installation & Lancement

### 1. Backend
```bash
cd backend
npm install
```

Créer un fichier `.env` dans `/backend` :
```
DATABASE_URL=votre_connection_string_neon
JWT_SECRET=monsecretjwt123
PORT=5000
```

Lancer le serveur :
```bash
npm run dev
```

API disponible sur : `http://localhost:5000`

---

### 2. Interface Web (Next.js)
```bash
cd web
npm install
npm run dev
```

Application disponible sur : `http://localhost:3000`

#### Fonctionnalités :
- ✅ Afficher la liste des événements
- ✅ Ajouter un nouvel événement
- ✅ Supprimer un événement
- ✅ Consulter les clients inscrits

---

### 3. Application Mobile (React Native + Expo)
```bash
cd mobile
npm install --legacy-peer-deps
npx expo start
```

Scanner le QR code avec **Expo Go** sur votre téléphone.

⚠️ **Important** : Remplacer l'adresse IP dans les fichiers suivants par votre IP locale :
- `app/index.tsx`
- `app/events/EventDetail.tsx`
- `app/auth/signin.tsx`
- `app/auth/signup.tsx`

Pour trouver votre IP : `ipconfig` (Windows) ou `ifconfig` (Mac/Linux)

#### Fonctionnalités :
- ✅ Afficher la liste des événements
- ✅ Consulter le détail d'un événement
- ✅ Inscription (Signup) en tant que client
- ✅ Connexion (Signin) en tant que client
- ✅ S'inscrire à un événement

---

## 🗄️ Base de données

Base de données PostgreSQL hébergée sur **Neon** avec 3 tables :

- `users` — clients de la plateforme
- `events` — événements disponibles
- `registrations` — inscriptions des clients aux événements

---

## 🛠️ Stack Technique

| Partie | Technologies |
|--------|-------------|
| Backend | Node.js, Express, PostgreSQL, JWT, bcrypt |
| Web | Next.js, TypeScript, Tailwind CSS, Axios |
| Mobile | React Native, Expo, React Navigation, Axios |
| Base de données | PostgreSQL (Neon) |

---

## 📁 Structure du projet
```
event-management-app/
├── backend/          # API REST Node.js/Express
│   ├── routes/
│   │   ├── auth.js   # Routes authentification
│   │   └── events.js # Routes événements
│   ├── db.js         # Connexion PostgreSQL
│   └── index.js      # Point d'entrée
├── web/              # Interface Next.js
│   └── app/
│       ├── components/
│       └── page.tsx
└── mobile/           # App React Native
    ├── app/
    │   ├── auth/
    │   └── events/
    ├── components/
    ├── context/
    └── App.tsx
```

---

## 👩‍💻 Auteur
**Maram ABASSI** — Ingénieure Full Stack —

**Maram ABASSI** — Ingénieure Full Stack
[LinkedIn](https://linkedin.com/in/abassi-maram-29a50325b/) | [GitHub](https://github.com/AbassiMaram)
