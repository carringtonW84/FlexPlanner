# 📅 DCL || Flex Planner

Une application web moderne pour gérer le planning flexible d'équipe, développée en React avec Vite et Tailwind CSS.

![React](https://img.shields.io/badge/React-19.1.1-blue?logo=react)
![Vite](https://img.shields.io/badge/Vite-7.1.2-green?logo=vite)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4.10-blue?logo=tailwindcss)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Database-blue?logo=postgresql)

## ✨ Fonctionnalités principales

### 🏢 Gestion du planning
- **Planning mensuel** : Vue calendrier avec statuts de présence (sur site, télétravail, congés)
- **Semaine-type** : Configuration du planning hebdomadaire par défaut
- **Gestion des congés** : Ajout, visualisation et suppression des périodes de congés
- **Présences d'équipe** : Vue temps réel de qui est présent/absent dans l'équipe

### 👥 Gestion d'équipe
- **Multiples équipes** : Support des équipes multiples par utilisateur
- **Rapports d'équipe** : Génération de rapports détaillés avec export Excel
- **Vue collaborative** : Visualisation des plannings de l'équipe complète

### ⚙️ Configuration
- **Compte utilisateur** : Gestion du profil et des équipes
- **Types de congés** : Support des congés payés, RTT, maladie, formation
- **Jours fériés** : Prise en compte automatique des jours fériés français
- **Vélocité** : Suivi des points par sprint pour les équipes agiles

## 🏗️ Architecture

### Frontend
- **React 19** avec hooks et context API
- **Vite** pour le bundling et le développement
- **Tailwind CSS** pour le styling avec design system cohérent
- **Architecture modulaire** avec composants réutilisables

### Backend (API)
- API REST avec authentification JWT
- Base de données **PostgreSQL** avec schéma optimisé
- Gestion des rôles et permissions
- Export Excel des rapports

### Structure du projet

```
src/
├── components/          # Composants réutilisables
│   ├── common/         # Composants UI de base
│   └── layout/         # Composants de mise en page
├── contexts/           # Contextes React (Auth, etc.)
├── hooks/              # Hooks personnalisés
├── pages/              # Pages de l'application
├── services/           # Services API
├── utils/              # Utilitaires
└── assets/             # Ressources statiques
```

## 🚀 Installation et développement

### Prérequis
- Node.js 18+ 
- npm ou yarn
- PostgreSQL (pour la base de données)

### Installation

1. **Cloner le repository**
```bash
git clone [url-du-repo]
cd flex-planner
```

2. **Installer les dépendances**
```bash
npm install
```

3. **Configuration de la base de données**
```sql
-- Exécuter le script de création de la base
psql -f src/datamodel/postgresql.sql
```

4. **Configuration de l'API**
```javascript
// Dans src/services/apiService.js
const API_BASE_URL = "http://localhost:5161/api";
```

5. **Démarrer le serveur de développement**
```bash
npm run dev
```

L'application sera accessible sur `http://localhost:5173`

## 🎨 Design System

L'application utilise un design system cohérent avec :

- **Palette de couleurs** : Dégradés rouge/bordeaux pour les éléments principaux
- **Typography** : Hiérarchie claire avec emojis pour améliorer l'UX
- **Composants** : Boutons, cartes, formulaires avec animations fluides
- **Responsive** : Adaptation mobile et tablette

### Composants principaux

- `Button` : Boutons avec variants (primary, secondary, outline, danger)
- `Card` : Conteneurs avec backdrop blur et ombres
- `Input/Select` : Champs de formulaire stylisés
- `Toggle` : Interrupteurs animés
- `DualListSelector` : Sélection d'éléments avec deux listes

## 📊 Base de données

La base PostgreSQL inclut :

### Tables principales
- `users` : Utilisateurs avec équipes multiples
- `teams` : Équipes de travail
- `user_planning` : Planning quotidien
- `user_weekly_schedules` : Semaines-types
- `user_vacations` : Gestion des congés

### Données de configuration
- Types de congés (congés payés, RTT, maladie, formation)
- Jours fériés français
- Statuts de présence avec couleurs et émojis

### Fonctionnalités avancées
- Triggers pour `updated_at` automatique
- Vues pour les requêtes complexes
- Fonction `get_user_day_status()` pour la logique métier

## 🔐 Authentification

- **JWT tokens** avec localStorage
- **Context API** pour la gestion d'état global
- **Protection des routes** automatique
- **Gestion des erreurs** 401/403

## 📱 Pages de l'application

1. **🔐 LoginPage** : Authentification
2. **📅 PlanningPage** : Vue mensuelle du planning
3. **⏰ WeeklySchedulePage** : Configuration semaine-type
4. **🏖️ VacationsPage** : Gestion des congés
5. **👥 PresencePage** : Qui est là aujourd'hui
6. **📊 TeamReportsPage** : Rapports et exports
7. **⚙️ AccountPage** : Paramètres du compte

## 🛠️ Scripts disponibles

```bash
npm run dev          # Serveur de développement
npm run build        # Build de production
npm run lint         # Linting ESLint
npm run preview      # Prévisualisation du build
```

## 🌟 Fonctionnalités avancées

### Export Excel
- Génération de rapports d'équipe au format Excel
- Données configurables par période
- Téléchargement automatique

### Gestion intelligente des statuts
- Priorité : Planning spécifique > Congés > Jours fériés > Week-end > Semaine-type
- Calcul automatique basé sur les règles métier
- Interface intuitive avec codes couleur

### UX optimisée
- **Animations fluides** avec Tailwind
- **Feedback visuel** pour toutes les actions
- **Messages de confirmation** pour les actions critiques
- **Loading states** partout

## 🤝 Contribution

1. Fork le projet
2. Créer une branche feature (`git checkout -b feature/AmazingFeature`)
3. Commit les changements (`git commit -m 'Add: Amazing Feature'`)
4. Push vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrir une Pull Request

## 📝 License

Ce projet est sous licence MIT. Voir le fichier `LICENSE` pour plus de détails.

## 👨‍💻 Équipe

Développé avec ❤️ pour optimiser la gestion du travail flexible en équipe.

---

*Flex Planner - Gérez votre planning en toute simplicité* 📅
