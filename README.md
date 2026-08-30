# UMO.PRO.CAO.E.SCOOPS — Site Web Officiel
### Développé par NZ STUDIO Creative

---

## 📁 Structure des fichiers

```
umo-rebuilt/
├── index.html                  ← Page d'accueil
├── robots.txt                  ← Directives moteurs de recherche
├── sitemap.xml                 ← Plan du site (SEO)
├── css/
│   └── style.css               ← Styles globaux + mode sombre
├── js/
│   └── main.js                 ← Interactions, animations, dark mode
├── pages/
│   ├── apropos.html            ← Page À Propos
│   ├── activites.html          ← Page Activités
│   ├── produits.html           ← Page Produits
│   ├── durabilite.html         ← Page Durabilité & ESG
│   ├── actualites.html         ← Page Actualités / Blog
│   └── contact.html            ← Page Contact
└── image_site_cacao/           ← Toutes les photos du site
    ├── logo-removebg-preview.png
    ├── img_centrale.jpg        ← Image hero accueil
    ├── champ.jpg, feve.jpg...  ← Photos produits/terrain
    └── ...
```

---

##  Comment utiliser le site

### Ouvrir en local
1. Extraire l'archive ZIP/TAR dans un dossier
2. Double-cliquer sur **`index.html`**
3. Le site fonctionne directement — aucun serveur requis

### Mettre en ligne (hébergement)
1. Uploader **tout le contenu** du dossier `umo-rebuilt/` sur votre hébergeur
2. S'assurer que `index.html` est à la racine du domaine
3. Mettre à jour `sitemap.xml` avec votre vrai nom de domaine
4. Mettre à jour `robots.txt` avec votre vrai nom de domaine

---

##  Mode Sombre

Le site intègre un mode sombre complet :
- Bouton **/** dans la barre de navigation sur toutes les pages
- La préférence est **sauvegardée automatiquement** dans le navigateur
- Détecte automatiquement la préférence système (Windows/Mac/Mobile)

---

##Comment modifier le contenu

### Changer un texte
1. Ouvrir le fichier HTML concerné avec un éditeur (ex: VS Code, Notepad++)
2. Rechercher le texte à modifier (Ctrl+F)
3. Modifier et sauvegarder
4. Rafraîchir le navigateur

### Changer une image
1. Placer la nouvelle image dans le dossier `image_site_cacao/`
2. Dans le fichier HTML, remplacer le nom du fichier dans la balise `<img src="...">`
3. Conserver les mêmes dimensions recommandées (voir ci-dessous)



---

---

## 🔍 SEO — Ce qui est déjà optimisé

- ✅ Balises `<title>` uniques sur chaque page
- ✅ Balises `<meta description>` sur chaque page
- ✅ Balises Open Graph (partage réseaux sociaux)
- ✅ `robots.txt` configuré
- ✅ `sitemap.xml` généré
- ✅ Images avec attributs `alt` descriptifs
- ✅ Structure HTML sémantique (h1, h2, h3...)
- ✅ Animations scroll pour l'engagement utilisateur


---

## 🛠️ Technologies utilisées

- **HTML5** — Structure sémantique
- **Tailwind CSS** (CDN) — Framework CSS utilitaire
- **JavaScript Vanilla ES6** — Interactions et animations
- **Google Fonts** — Playfair Display + Jost
- **CSS Variables** — Thème clair/sombre

---

© 2025 UMO.PRO.CAO.E.SCOOPS · NZ STUDIO Creative
