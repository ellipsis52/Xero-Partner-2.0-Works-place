module.exports = {
    entry: ['./source/main.ts'], // Définir le fichier principal à compiler (ton fichier main.ts)
    format: ['cjs', 'esm'],      // Format de sortie: CommonJS et ES Module
    target: 'node16',            // Définir la cible de version Node.js (adapte selon ta version de Node)
    outDir: 'dist',              // Dossier de sortie de la compilation (tu peux changer le nom du dossier si nécessaire)
    clean: true,                 // Nettoyer le dossier de sortie avant la nouvelle compilation
    minify: true,                // Minifier le code pour la production (optionnel)
    sourcemap: true,             // Générer une carte de source (optionnel)
    external: ['some-module'],   // Liste des modules externes à exclure de l'output (optionnel)
  };
// tsup.config.js
module.exports = {
  entry: ['./path/to/your/file.ts'], // Remplace avec le chemin correct vers ton fichier
  format: ['esm', 'cjs'],
  dts: true,  // Si tu veux générer des fichiers de type TypeScript
};
module.exports = {
  entry: ['./source/main.ts'],  // Assure-toi que ce fichier existe bien dans ton dossier source
  format: ['esm', 'cjs'],
  dts: true,  // Si tu veux aussi générer des types
};
