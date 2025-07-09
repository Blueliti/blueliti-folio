# Guide de Modification - Site Web Artiste 3D

Ce guide vous explique comment modifier facilement votre site web d'artiste 3D.

## 🎯 Modifications Simples (Sans Code)

### 1. Remplacer les Vidéos
- Placez vos fichiers vidéo MP4 dans le dossier `public/videos/`
- Dans `src/App.jsx`, ligne 122, remplacez `videoSrc={null}` par `videoSrc="/videos/votre-video.mp4"`

### 2. Changer les Textes
**Titre principal** (ligne 131-136) :
```jsx
<h1 className="text-5xl md:text-7xl font-bold mb-6">
  VOTRE TITRE ICI
  <span className="block text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400">
    SOUS-TITRE
  </span>
</h1>
```

**Description** (ligne 140-142) :
```jsx
<p className="text-xl md:text-2xl text-gray-300 mb-8">
  Votre description personnalisée ici
</p>
```

### 3. Informations de Contact
**Email, téléphone, adresse** (lignes 450-460) :
```jsx
<span>votre-email@exemple.com</span>
<span>+33 X XX XX XX XX</span>
<span>Votre ville, Pays</span>
```

### 4. Ajouter vos Projets
Dans la section galerie (ligne 220+), dupliquez ce bloc pour chaque projet :
```jsx
<Card className="bg-gray-900 border-gray-800 overflow-hidden group hover:scale-105 transition-transform duration-300">
  <div className="aspect-video bg-gray-800 relative">
    {/* Remplacez par votre image */}
    <img src="/images/votre-projet.jpg" alt="Votre projet" className="w-full h-full object-cover" />
  </div>
  <CardContent className="p-6">
    <h3 className="text-xl font-semibold mb-2">Nom de votre projet</h3>
    <p className="text-gray-400 mb-4">Description de votre projet</p>
    <Button variant="outline" size="sm">Voir les détails</Button>
  </CardContent>
</Card>
```

## 🎨 Modifications de Style

### 1. Changer les Couleurs
Dans `src/App.css`, modifiez les variables CSS (lignes 50-80) :
```css
:root {
  --background: oklch(1 0 0); /* Couleur de fond */
  --foreground: oklch(0.145 0 0); /* Couleur du texte */
  --primary: oklch(0.205 0 0); /* Couleur principale */
  /* ... */
}
```

### 2. Modifier les Polices
Dans `src/App.css`, ajoutez :
```css
body {
  font-family: 'Votre Police', sans-serif;
}
```

## 📁 Structure des Fichiers

```
artist-3d-website/
├── public/
│   ├── videos/          # Vos vidéos MP4
│   └── images/          # Vos images
├── src/
│   ├── components/      # Composants réutilisables
│   ├── App.jsx         # Page principale (MODIFIER ICI)
│   ├── App.css         # Styles (COULEURS ICI)
│   └── assets/         # Images du site
└── GUIDE_MODIFICATION.md # Ce guide
```

## 🚀 Modifications Avancées

### 1. Ajouter une Nouvelle Section
Copiez une section existante et modifiez :
```jsx
<section id="nouvelle-section" className="py-20 bg-gray-900">
  <div className="max-w-6xl mx-auto px-4">
    <h2 className="text-4xl font-bold text-center mb-12">Nouveau Titre</h2>
    {/* Votre contenu ici */}
  </div>
</section>
```

### 2. Modifier la Navigation
Dans la navigation (ligne 60+), ajoutez :
```jsx
{ id: 'nouvelle-section', label: 'Nouveau Menu' }
```

## 💡 Conseils

1. **Sauvegardez** toujours vos fichiers avant modification
2. **Testez** vos changements avec `npm run dev`
3. **Optimisez** vos images (format WebP recommandé)
4. **Compressez** vos vidéos pour un chargement rapide

## 🆘 Problèmes Courants

**Le site ne se charge pas** : Vérifiez la console du navigateur (F12)
**Les images ne s'affichent pas** : Vérifiez le chemin des fichiers
**Les vidéos ne se lancent pas** : Vérifiez le format (MP4 recommandé)

## 📞 Support

Si vous avez besoin d'aide pour des modifications plus complexes, n'hésitez pas à demander de l'assistance technique.

