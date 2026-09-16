# site-agence — Site vitrine Amana-Solution

Site statique (HTML/CSS/JS pur, aucune dépendance) pour l'agence **Amana-Solution**.

## Aperçu en local

Ouvrir `index.html` directement ou servir le dossier :

```powershell
# Python (Windows)
python -m http.server 8080
# puis ouvrir http://localhost:8080
```

## Personnalisation obligatoire avant mise en ligne

Avant de publier, 3 éléments sont à remplacer (placeholders actuels) :

1. **Adresse email** — remplacer `contact@amana-solution.com` partout :
   - `index.html` : section contact (3 liens) et footer
   - `index.html` : balise JSON-LD (`email`)
   - `js/main.js` : constante `emailCible` (formulaire)

2. **Téléphone / WhatsApp** — remplacer le numéro `+33612345678` (placeholders) :
   - `index.html` : lien `tel:` et texte « +33 6 12 34 56 78 »
   - `index.html` : lien `https://wa.me/33612345678...` (à ajuster : numéro sans le `+`, préfixe international)
   - `index.html` : footer

3. **Logo** — remplacer le logotype texte + SVG de l'en-tête (2 occurrences, en-tête et footer) :
   - Option A : garder le SVG actuel (lettre en forme de "A" stylisé) — rien à faire.
   - Option B : déposer votre logo dans `images/logo.svg` et remplacer le bloc `<svg class="brand-mark">…</svg>` par
     `<img class="brand-mark" src="images/logo.svg" alt="Amana-Solution">`.

## Formulaire de contact

Sans serveur, le formulaire utilise un lien `mailto:` (il ouvre la messagerie du visiteur avec le message pré-rempli).
C'est volontaire et 100 % fonctionnel hors-ligne.

Pour recevoir les demandes directement dans une boîte mail (sans ouvrir la messagerie du visiteur), brancher un
service gratuit type **Web3Forms** ou **Formspree** (zéro backend) :
voir https://web3forms.com ou https://formspree.io — remplacer alors le gestionnaire du formulaire dans `js/main.js`.

## Mise en ligne (gratuite ou quasi gratuite)

- **Vercel / Netlify** : importer ce dossier tel quel, aucun build à configurer.
- **OVH / autre hébergeur** : FTP/FileZilla — déposer le contenu de `site-agence/` dans le dossier web.

## Structure

```
site-agence/
  index.html        page unique
  css/style.css     styles (design system, responsive)
  js/main.js        interactions (nav, FAQ, reveal, formulaire)
  images/           logo et visuels (voir images/README.md)
```

## Vérifications avant publication

- [ ] Email, téléphone, WhatsApp réels remplacés
- [ ] Logo définitif en place
- [ ] Contenu relu (services, méthode, FAQ, garanties)
- [ ] Test sur mobile (menu hamburger)
- [ ] Test des liens (devis, services, ancres)