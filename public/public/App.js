import React from 'react';
import XeroPartner2_0 from './XeroPartner2_0';
import IconCard from './components/IconCard';

import cvIcon from './assets/icons/cv-icon.svg';
import travailEquipeIcon from './assets/icons/travail-en-equipe-icon.svg';
import selectionCandidatsIcon from './assets/icons/selection-des-candidats-icon.svg';

const App = () => {
  return (
    <div className="min-h-screen App bg-gray-50 dark:bg-gray-900">
      <section className="py-16 border-b-4 border-indigo-500">
        <XeroPartner2_0 />
      </section>

      <section className="max-w-6xl px-8 mx-auto">
        <h1 className="mb-6 text-4xl font-extrabold text-center text-gray-900 dark:text-white">
          Bienvenue dans l'application
        </h1>

        <h2 className="mb-8 text-3xl font-semibold text-center text-gray-800 dark:text-white">Icônes personnalisées</h2>
        
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-3">
          <IconCard
            src={cvIcon}
            alt="Cv Icon"
            label="Icône CV"
            creditLink="https://www.flaticon.com/fr/icones-gratuites/cv-et-cv"
            creditText="Cv par Bamart - Flaticon"
          />
          <IconCard
            src={travailEquipeIcon}
            alt="Travail en équipe Icon"
            label="Travail en équipe"
            creditLink="https://www.flaticon.com/fr/icones-gratuites/travail-en-equipe"
            creditText="Travail en équipe par Bamart - Flaticon"
          />
          <IconCard
            src={selectionCandidatsIcon}
            alt="Sélection des candidats Icon"
            label="Sélection des candidats"
            creditLink="https://www.flaticon.com/fr/icones-gratuites/selection-des-candidats"
            creditText="Sélection par Bamart - Flaticon"
          />
        </div>

        <h2 className="mt-16 mb-8 text-3xl font-semibold text-center text-gray-800 dark:text-white">Icônes depuis Flaticon</h2>
        
        <div className="flex justify-center">
          <IconCard
            src="https://imageURL_icone_de_Flaticon.svg"
            alt="Cv Icon en ligne"
            label="CV en ligne"
            creditLink="https://www.flaticon.com/fr/icones-gratuites/cv-et-cv"
            creditText="Cv par Bamart - Flaticon"
          />
        </div>
      </section>
    </div>
  );
};

export default App;
