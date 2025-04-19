import React from 'react';
import cvIcon from './assets/icons/cv-icon.svg';
import travailEquipeIcon from './assets/icons/travail-en-equipe-icon.svg';
import selectionCandidatsIcon from './assets/icons/selection-des-candidats-icon.svg';

const IconDisplay = () => {
  return (
    <div className="p-6 space-y-6 icon-display">
      <h2 className="text-2xl font-semibold">Icônes téléchargées</h2>

      <div className="space-y-4">
        <div>
          <img src={cvIcon} alt="Cv Icon" style={{ width: '50px' }} />
          <p>Votre texte ici pour l'icône CV</p>
          <a href="https://www.flaticon.com/fr/icones-gratuites/cv-et-cv" title="cv icônes">Par Bamart - Flaticon</a>
        </div>

        <div>
          <img src={travailEquipeIcon} alt="Travail en équipe Icon" style={{ width: '50px' }} />
          <p>Votre texte ici pour l'icône travail en équipe</p>
          <a href="https://www.flaticon.com/fr/icones-gratuites/travail-en-equipe">Par Bamart - Flaticon</a>
        </div>

        <div>
          <img src={selectionCandidatsIcon} alt="Sélection Icon" style={{ width: '50px' }} />
          <p>Votre texte ici pour l'icône sélection</p>
          <a href="https://www.flaticon.com/fr/icones-gratuites/selection-des-candidats">Par Bamart - Flaticon</a>
        </div>
      </div>
    </div>
  );
};

export default IconDisplay;
