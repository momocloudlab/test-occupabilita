import React, { useState, useMemo } from 'react';
import { 
  ShieldCheck, ArrowRight, Printer, Send, Compass, 
  Users, Zap, CheckCircle2, ChevronRight, HeartPulse
} from 'lucide-react';

export default function EmployabilityApp() {
  const [step, setStep] = useState<'welcome' | 'user-info' | 'test' | 'result'>('welcome');
  const [userData, setUserData] = useState({ name: '', email: '' });
  const [currentIdx, setCurrentIdx] = useState(0);
  const [scores, setScores] = useState<Record<string, number>>({ Identita: 0, Adattabilita: 0, Relazioni: 0, Ottimismo: 0 });

  const questions = [
    { id: 1, text: "Ho un'idea chiara di quali siano i miei obiettivi professionali a lungo termine", dim: "Identita" },
    { id: 2, text: "So identificare con precisione i settori in cui le mie doti sono più richieste", dim: "Identita" },
    { id: 3, text: "Considero il mio lavoro come una parte fondamentale di chi sono", dim: "Identita" },
    { id: 4, text: "Mi sento a mio agio quando devo imparare nuove tecnologie o procedure", dim: "Adattabilita" },
    { id: 5, text: "Cerco attivamente modi per rendere il mio lavoro più efficiente", dim: "Adattabilita" },
    { id: 6, text: "Riesco a gestire bene l'incertezza quando i progetti cambiano rotta", dim: "Adattabilita" },
    { id: 7, text: "Conosco persone in diverse aziende che potrebbero aiutarmi a trovare lavoro", dim: "Relazioni" },
    { id: 8, text: "Partecipo a eventi o gruppi online per restare aggiornato sul mio settore", dim: "Relazioni" },
    { id: 9, text: "I miei colleghi e amici mi considerano un punto di riferimento esperto", dim: "Relazioni" },
    { id: 10, text: "Sono convinto che, anche in tempi di crisi, troverò sempre un'opportunità", dim: "Ottimismo" },
    { id: 11, text: "Vedo i cambiamenti nel mercato del lavoro come sfide stimolanti, non minacce", dim: "Ottimismo" },
    { id: 12, text: "Ho fiducia nella mia capacità di acquisire velocemente nuove competenze", dim: "Ottimismo" },
    { id: 13, text: "Ho investito tempo e risorse nella mia formazione nell'ultimo anno", dim: "Adattabilita" },
    { id: 14, text: "So come promuovere le mie esperienze passate per ottenere nuovi ruoli", dim: "Identita" },
    { id: 15, text: "Mantengo i contatti anche con ex colleghi o responsabili", dim: "Relazioni" }
  ];

  const profiles: any = {
    Identita: {
      title: "Il Visionario Consapevole",
      desc: "Hai una bussola interna fortissima. Sai chi sei, cosa vali e dove vuoi arrivare. Questa chiarezza ti rende immune alle distrazioni e ti permette di scegliere solo le opportunità che contano davvero.",
      tip: "Usa questa tua visione per ispirare chi ti sta intorno, ma ricorda di restare aperto anche a percorsi che oggi non hai ancora immaginato!",
      icon: <Compass />, color: "#701a75"
    },
    Adattabilita: {
      title: "Il Camaleonte Strategico",
      desc: "Sei il professionista del futuro. La tua capacità di cambiare pelle e imparare al volo ti rende inaffondabile. Non temi l'innovazione, la cavalchi.",
      tip: "Assicurati di fermarti ogni tanto per consolidare quello che hai imparato, prima di passare alla prossima novità!",
      icon: <Zap />, color: "#4f46e5"
    },
    Relazioni: {
      title: "Il Connettore di Opportunità",
      desc: "Il tuo valore risiede nella tua rete. Sei una persona che sa tessere legami preziosi e il mercato del lavoro si accorge di te attraverso il passaparola e la stima altrui.",
      tip: "Alimenta costantemente il tuo capitale sociale offrendo valore alla tua rete prima ancora di chiederlo per te.",
      icon: <Users />, color: "#d946ef"
    },
    Ottimismo: {
      title: "L'Ancora di Fiducia",
      desc: "La tua mentalità positiva è il tuo scudo. Dove gli altri vedono barriere, tu vedi varchi. Questa resilienza ti permette di superare crisi che fermerebbero chiunque altro.",
      tip: "Abbina questa tua fiducia a piani d'azione concreti per trasformare il tuo ottimismo in risultati tangibili ancora più velocemente.",
      icon: <HeartPulse />, color: "#0ea5e9"
    }
  };

  const handleAnswer = (val: number) => {
    const dim = questions[currentIdx].dim;
    setScores(prev => ({ ...prev, [dim]: prev[dim] + val }));
    if (currentIdx < questions.length - 1) setCurrentIdx(currentIdx + 1);
    else setStep('result');
  };

  const dominant = useMemo(() => {
    return Object.keys(scores).reduce((a, b) => scores[a] > scores[b] ? a : b);
  }, [scores, step]);

  const sendEmail = () => {
    const subject = encodeURIComponent(`Report Occupabilità - ${userData.name}`);
    const body = encodeURIComponent(`Ciao ${userData.name},\n\necco il tuo profilo di Occupabilità (Fugate):\n\nPROFILO: ${profiles[dominant].title}\n${profiles[dominant].desc}\n\nCONSIGLIO: ${profiles[dominant].tip}`);
    window.location.href = `mailto:${userData.email}?subject=${subject}&body=${body}`;
  };

  return (
    <div className="app-wrapper">
      <style>{`
        .app-wrapper { min-height: 100vh; display: flex; align-items: center; justify-content: center; background: #FDFBFE; font-family: 'Segoe UI', Roboto, sans-serif; padding: 20px; }
        .card { max-width: 750px; width: 100%; background: white; border-radius: 45px; box-shadow: 0 40px 80px rgba(112,26,117,0.12); overflow: hidden; border: 1px solid #f3e8ff; }
        .content { padding: 50px; text-align: center; }
        .icon-header { background: #701a75; color: white; padding: 25px; border-radius: 28px; display: inline-flex; margin-bottom: 30px; box-shadow: 0 20px 40px rgba(112,26,117,0.2); rotate: -2deg; }
        h1 { color: #0f172a; font-size: 45px; font-weight: 900; margin: 0; letter-spacing: -2px; }
        .text-accent { color: #701a75; }
        .subtitle { color: #64748b; font-size: 19px; margin: 25px 0 45px; line-height: 1.6; }
        .btn-main { background: #1e293b; color: white; width: 100%; padding: 22px; border-radius: 22px; font-weight: 800; font-size: 18px; border: none; cursor: pointer; transition: all 0.3s; }
        .btn-main:hover { background: #701a75; transform: translateY(-2px); }
        .input-field { width: 100%; padding: 20px; background: #f8fafc; border: 2px solid transparent; border-radius: 22px; margin-bottom: 15px; font-size: 16px; outline: none; box-sizing: border-box; }
        .likert-btn { width: 100%; text-align: left; padding: 22px; background: white; border: 2px solid #f1f5f9; border-radius: 22px; cursor: pointer; transition: all 0.2s; display: flex; align-items: center; justify-content: space-between; margin-bottom: 10px; }
        .likert-btn:hover { border-color: #701a75; background: #faf5ff; }
        .likert-btn span { font-weight: 700; color: #334155; }
        .progress-bar { height: 8px; background: #f1f5f9; width: 100%; }
        .progress-fill { height: 100%; background: #701a75; transition: width 0.4s; }
        .result-box { background: #0f172a; color: white; padding: 45px; border-radius: 40px; margin: 30px 0; text-align: left; }
        .tip-box { background: #f5f3ff; border-left: 5px solid #701a75; padding: 20px; border-radius: 15px; color: #4c1d95; margin-top: 20px; }
        @media print { .no-print { display: none; } }
      `}</style>

      <div className="card">
        {step === 'test' && (
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: `${((currentIdx + 1) / 15) * 100}%` }}></div>
          </div>
        )}

        <div className="content">
          {step === 'welcome' && (
            <div>
              <div className="icon-header"><ShieldCheck size={45} /></div>
              <h1>Test<br/><span className="text-accent">Occupabilità</span></h1>
              <p className="subtitle">Scopri quanto sei pronto per le sfide del mercato moderno con il modello scientifico di Fugate.</p>
              <button onClick={() => setStep('user-info')} className="btn-main">Analizza la mia Occupabilità</button>
            </div>
          )}

          {step === 'user-info' && (
            <div>
              <h2 style={{fontSize: '36px', fontWeight: '900'}}>Prepariamo il Report</h2>
              <p className="subtitle">Inserisci i tuoi dati per ricevere il profilo personalizzato.</p>
              <input type="text" placeholder="Nome completo" className="input-field" value={userData.name} onChange={e => setUserData({...userData, name: e.target.value})} />
              <input type="email" placeholder="Email" className="input-field" value={userData.email} onChange={e => setUserData({...userData, email: e.target.value})} />
              <button disabled={!userData.name || !userData.email} onClick={() => setStep('test')} className="btn-main" style={{opacity: !userData.name ? 0.3 : 1}}>Inizia il Test</button>
            </div>
          )}

          {step === 'test' && (
            <div style={{textAlign: 'left'}}>
              <span style={{color: '#701a75', fontWeight: '900', fontSize: '12px', textTransform: 'uppercase'}}>Fugate Model - Domanda {currentIdx + 1} di 15</span>
              <h2 style={{fontSize: '28px', margin: '15px 0 30px', lineHeight: '1.2'}}>{questions[currentIdx].text}?</h2>
              {[
                {l: "Raramente / Per nulla", d: "Non rispecchia il mio modo di agire"},
                {l: "A volte", d: "Mi capita, ma non è una costante"},
                {l: "Spesso", d: "È un comportamento che applico regolarmente"},
                {l: "Sempre / Totalmente", d: "Mi descrive perfettamente"}
              ].map((choice, i) => (
                <button key={i} onClick={() => handleAnswer(i + 1)} className="likert-btn">
                  <div>
                    <span>{choice.l}</span><br/>
                    <small style={{color: '#94a3b8'}}>{choice.d}</small>
                  </div>
                  <ChevronRight size={20} color="#701a75" />
                </button>
              ))}
            </div>
          )}

          {step === 'result' && (
            <div>
              <CheckCircle2 size={60} color="#22c55e" style={{marginBottom: '20px'}} />
              <h1>Risultato per {userData.name}</h1>
              <div className="result-box">
                <div style={{display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '20px'}}>
                  <div style={{background: 'white', color: '#0f172a', padding: '10px', borderRadius: '12px'}}>
                    {profiles[dominant].icon}
                  </div>
                  <h3 style={{fontSize: '28px', margin: 0}}>{profiles[dominant].title}</h3>
                </div>
                <p style={{fontSize: '18px', lineHeight: '1.7', color: '#cbd5e1'}}>
                  {profiles[dominant].desc}
                </p>
                <div className="tip-box">
                  <strong>💡 Consiglio Pro:</strong> {profiles[dominant].tip}
                </div>
              </div>
              <div style={{display: 'flex', gap: '15px'}} className="no-print">
                <button onClick={() => window.print()} className="btn-main" style={{flex: 1}}>Salva PDF</button>
                <button onClick={sendEmail} className="btn-main" style={{flex: 1, background: 'white', color: '#1e293b', border: '2px solid #f1f5f9'}}>Email</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
