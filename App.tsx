
import React, { useState } from 'react';
import { VISIT_PROGRAM } from './constants.tsx';
import { RoomImage } from './types.ts';
import ImageUploader from './components/ImageUploader.tsx';
import { generateExecutiveSummary } from './services/geminiService.ts';

const App: React.FC = () => {
  const [roomImages, setRoomImages] = useState<RoomImage[]>([]);
  const [summary, setSummary] = useState<string>('');
  const [isGeneratingSummary, setIsGeneratingSummary] = useState(false);

  const addRoomImage = (img: RoomImage) => {
    setRoomImages([...roomImages, img]);
  };

  const removeRoomImage = (id: string) => {
    setRoomImages(roomImages.filter(img => img.id !== id));
  };

  const handleGenerateSummary = async () => {
    setIsGeneratingSummary(true);
    const text = await generateExecutiveSummary(VISIT_PROGRAM);
    setSummary(text);
    setIsGeneratingSummary(false);
  };

  return (
    <div className="min-h-screen pb-20">
      {/* Header / Hero Section */}
      <header className="bg-slate-900 text-white pt-12 pb-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
            <div>
              <span className="inline-block bg-orange-500/20 text-orange-400 text-xs font-bold px-2 py-1 rounded uppercase tracking-wider mb-3">
                {VISIT_PROGRAM.agency}
              </span>
              <h1 className="text-4xl md:text-5xl font-bold mb-2">Programme de Visite</h1>
              <p className="text-slate-400 text-lg flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                {VISIT_PROGRAM.location}
              </p>
            </div>
            <div className="bg-slate-800 p-4 rounded-xl border border-slate-700 flex items-center gap-6">
              <div className="text-center">
                <p className="text-slate-500 text-xs uppercase font-bold">Date</p>
                <p className="text-xl font-semibold">{VISIT_PROGRAM.date}</p>
              </div>
              <div className="w-px h-10 bg-slate-700"></div>
              <div className="text-center">
                <p className="text-slate-500 text-xs uppercase font-bold">Durée</p>
                <p className="text-xl font-semibold whitespace-nowrap">Journée complète</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 -mt-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Timeline Section */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6">
              <h2 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Déroulement de la Journée
              </h2>
              <div className="space-y-8 relative before:absolute before:inset-0 before:left-4 before:h-full before:w-0.5 before:bg-slate-100 before:ml-[0.875rem] md:before:ml-[0.875rem]">
                {VISIT_PROGRAM.items.map((item) => (
                  <div key={item.id} className="relative pl-12">
                    <div className="absolute left-0 top-0 bg-white border-2 border-orange-500 w-8 h-8 rounded-full flex items-center justify-center z-10 text-lg shadow-sm">
                      {item.icon}
                    </div>
                    <div className="flex flex-col md:flex-row md:justify-between mb-1">
                      <span className="text-orange-600 font-bold text-sm tracking-tight">{item.time}</span>
                      <span className="text-slate-400 text-xs flex items-center gap-1">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        </svg>
                        {item.location}
                      </span>
                    </div>
                    <h3 className="text-lg font-bold text-slate-800 mb-2">{item.title}</h3>
                    <ul className="space-y-1">
                      {item.description.map((desc, idx) => (
                        <li key={idx} className="text-slate-600 text-sm flex items-start gap-2">
                          <span className="text-orange-500 mt-1.5 shrink-0 w-1.5 h-1.5 rounded-full bg-orange-500"></span>
                          {desc}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            {/* Room Image Gallery Management */}
            <ImageUploader 
              images={roomImages} 
              onAddImage={addRoomImage} 
              onRemoveImage={removeRoomImage} 
            />
          </div>

          {/* Sidebar / Extra Info */}
          <div className="space-y-6">
            {/* AI Summary Card */}
            <div className="bg-slate-800 text-white rounded-xl shadow-lg p-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-10">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-24" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold mb-4 relative z-10">Note Stratégique</h3>
              {summary ? (
                <div className="prose prose-invert prose-sm">
                  <p className="text-slate-300 leading-relaxed italic">"{summary}"</p>
                </div>
              ) : (
                <p className="text-slate-400 text-sm mb-6">
                  Générez un résumé professionnel pour votre directeur en un clic.
                </p>
              )}
              <button 
                onClick={handleGenerateSummary}
                disabled={isGeneratingSummary}
                className="w-full mt-4 bg-orange-500 hover:bg-orange-600 disabled:bg-slate-600 text-white font-bold py-2 px-4 rounded-lg transition-all transform active:scale-95 flex items-center justify-center gap-2"
              >
                {isGeneratingSummary ? (
                  <>
                    <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Analyse...
                  </>
                ) : (
                  'Générer avec Gemini'
                )}
              </button>
            </div>

            {/* Bonus Card */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
              <div className="h-32 bg-[url('https://picsum.photos/seed/morocco/600/300')] bg-cover bg-center"></div>
              <div className="p-6">
                <span className="bg-amber-100 text-amber-700 text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider mb-2 inline-block">BONUS</span>
                <h3 className="text-lg font-bold text-slate-800 mb-2">Pack Cadeaux "Souvenir du Maroc"</h3>
                <p className="text-slate-600 text-sm mb-4">Un coffret élégant et corporate pour clôturer la visite de manière mémorable.</p>
                <div className="space-y-2">
                  <div className="flex items-center gap-3 text-xs text-slate-500">
                    <span className="text-amber-500">🎁</span> Boîte de thé marocain premium
                  </div>
                  <div className="flex items-center gap-3 text-xs text-slate-500">
                    <span className="text-amber-500">🍯</span> Produits du terroir (miel, argan)
                  </div>
                  <div className="flex items-center gap-3 text-xs text-slate-500">
                    <span className="text-amber-500">🕯️</span> Objet artisanal discret
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Card */}
            <div className="bg-orange-50 rounded-xl p-6 border border-orange-100">
              <h3 className="font-bold text-orange-900 mb-2">Besoin d'ajustements ?</h3>
              <p className="text-orange-800 text-sm mb-4">Ce programme est flexible en fonction du nombre de participants et de vos priorités stratégiques.</p>
              <button className="text-orange-600 font-semibold text-sm hover:underline">Contacter l'équipe Wevent →</button>
            </div>
          </div>
        </div>
      </main>

      {/* Floating Action for Print/Share */}
      <div className="fixed bottom-6 right-6 flex gap-3">
        <button 
          onClick={() => window.print()}
          className="bg-white text-slate-800 p-4 rounded-full shadow-lg border border-slate-200 hover:bg-slate-50 transition-all flex items-center justify-center group"
          title="Imprimer le programme"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default App;
