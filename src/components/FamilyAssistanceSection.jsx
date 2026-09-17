import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useUser } from '../context/UserContext';
import { Users, Lock, ShieldCheck, Volume2, Check } from 'lucide-react';

export const FamilyAssistanceSection = () => {
  const { currentLang, supportedLanguages, t, speakText } = useLanguage();
  const { userProfile, saveProfile } = useUser();

  const handleLangChange = (langCode) => {
    saveProfile({ familyHelperLang: langCode });
    const chosenLangObj = supportedLanguages.find(l => l.code === langCode);
    speakText(`Family helper summary language updated to ${chosenLangObj ? chosenLangObj.name : 'English'}.`);
  };

  return (
    <div className="senior-card">
      <div className="senior-card-header">
        <div className="senior-card-icon">
          👥
        </div>
        <div style={{ flex: 1 }}>
          <h2 style={{ fontSize: '1.8rem', fontWeight: 800 }}>
            {t('familyTitle')}
          </h2>
          <p style={{ fontSize: '1.05rem', color: 'var(--text-muted)' }}>
            {t('familySub')}
          </p>
        </div>
        <button
          className="btn-read-aloud"
          onClick={() => speakText(`${t('familyTitle')}. ${t('familySub')}`)}
        >
          <Volume2 size={18} />
          <span>{t('readAloud')}</span>
        </button>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <div>
          <label style={{ display: 'block', fontSize: '1.2rem', fontWeight: 700, marginBottom: '10px' }}>
            {t('familyLangLabel')}
          </label>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '12px' }}>
            {supportedLanguages.map((lang) => {
              const isSelected = userProfile.familyHelperLang === lang.code;
              return (
                <button
                  key={lang.code}
                  type="button"
                  className={`btn-senior ${isSelected ? 'btn-primary' : 'btn-outline'}`}
                  onClick={() => handleLangChange(lang.code)}
                  style={{ fontSize: '1.05rem', justifyContent: 'space-between' }}
                >
                  <span>{lang.name} ({lang.englishName})</span>
                  {isSelected && <Check size={20} />}
                </button>
              );
            })}
          </div>
        </div>

        {/* Privacy Lock Banner */}
        <div style={{
          backgroundColor: '#eff6ff',
          border: '2px solid var(--primary)',
          borderRadius: '16px',
          padding: '20px',
          display: 'flex',
          alignItems: 'center',
          gap: '14px'
        }}>
          <Lock size={32} color="var(--primary)" style={{ flexShrink: 0 }} />
          <div style={{ fontSize: '1.15rem', fontWeight: 600, color: 'var(--text-main)', lineHeight: 1.5 }}>
            {t('privacyNote')}
          </div>
        </div>
      </div>
    </div>
  );
};
