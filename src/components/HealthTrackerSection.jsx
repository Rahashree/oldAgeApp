import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Activity, Volume2, Save, HeartPulse } from 'lucide-react';

export const HealthTrackerSection = () => {
  const { t, speakText } = useLanguage();
  const [systolic, setSystolic] = useState('120');
  const [diastolic, setDiastolic] = useState('80');
  const [sugar, setSugar] = useState('110');
  const [savedAdvice, setSavedAdvice] = useState(null);

  const handleSaveHealth = (e) => {
    e.preventDefault();
    const sysNum = parseInt(systolic) || 120;
    const diaNum = parseInt(diastolic) || 80;
    const sugNum = parseInt(sugar) || 110;

    let bpMsg = t('bpNormalAdvice');
    if (sysNum > 140 || diaNum > 90) {
      bpMsg = "⚠️ Your Blood Pressure reading is slightly high (above 140/90). Please rest, drink water, and consult your doctor if needed.";
    }

    let sugMsg = t('sugarNormalAdvice');
    if (sugNum > 140) {
      sugMsg = "⚠️ Your Blood Sugar level is high. Avoid sweet foods and take your prescribed insulin/medicine.";
    }

    const fullAdvice = `${bpMsg} ${sugMsg}`;
    setSavedAdvice(fullAdvice);
    speakText(fullAdvice);
  };

  return (
    <div className="senior-card">
      <div className="senior-card-header">
        <div className="senior-card-icon">
          🩺
        </div>
        <div style={{ flex: 1 }}>
          <h2 style={{ fontSize: '1.8rem', fontWeight: 800 }}>
            {t('healthTitle')}
          </h2>
          <p style={{ fontSize: '1.05rem', color: 'var(--text-muted)' }}>
            {t('healthSub')}
          </p>
        </div>
        <button
          className="btn-read-aloud"
          onClick={() => speakText(`${t('healthTitle')}. ${t('healthSub')}`)}
        >
          <Volume2 size={18} />
          <span>{t('readAloud')}</span>
        </button>
      </div>

      <form onSubmit={handleSaveHealth} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '1.15rem', fontWeight: 700, marginBottom: '8px' }}>
              {t('bpLabel')} (Systolic / Diastolic)
            </label>
            <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
              <input
                type="number"
                value={systolic}
                onChange={(e) => setSystolic(e.target.value)}
                style={{ width: '90px', padding: '12px', fontSize: '1.2rem', borderRadius: '10px', border: '2px solid var(--border-color)', textAlign: 'center' }}
              />
              <span style={{ fontSize: '1.4rem', fontWeight: 700 }}>/</span>
              <input
                type="number"
                value={diastolic}
                onChange={(e) => setDiastolic(e.target.value)}
                style={{ width: '90px', padding: '12px', fontSize: '1.2rem', borderRadius: '10px', border: '2px solid var(--border-color)', textAlign: 'center' }}
              />
              <span style={{ fontSize: '1rem', color: 'var(--text-muted)' }}>mmHg</span>
            </div>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '1.15rem', fontWeight: 700, marginBottom: '8px' }}>
              {t('sugarLabel')} (Fasting / PP)
            </label>
            <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
              <input
                type="number"
                value={sugar}
                onChange={(e) => setSugar(e.target.value)}
                style={{ width: '120px', padding: '12px', fontSize: '1.2rem', borderRadius: '10px', border: '2px solid var(--border-color)', textAlign: 'center' }}
              />
              <span style={{ fontSize: '1rem', color: 'var(--text-muted)' }}>mg/dL</span>
            </div>
          </div>
        </div>

        <button
          type="submit"
          className="btn-senior btn-primary"
          style={{ alignSelf: 'flex-start' }}
        >
          <Save size={20} />
          <span>{t('saveHealthBtn')}</span>
        </button>

        {savedAdvice && (
          <div style={{
            padding: '20px',
            borderRadius: '16px',
            backgroundColor: 'var(--primary-light)',
            border: '2px solid var(--primary)',
            fontSize: '1.15rem',
            lineHeight: 1.6,
            display: 'flex',
            flexDirection: 'column',
            gap: '12px'
          }}>
            <p>{savedAdvice}</p>
            <button
              className="btn-read-aloud"
              type="button"
              onClick={() => speakText(savedAdvice)}
              style={{ alignSelf: 'flex-start' }}
            >
              <Volume2 size={18} />
              <span>{t('readAloud')}</span>
            </button>
          </div>
        )}
      </form>
    </div>
  );
};
