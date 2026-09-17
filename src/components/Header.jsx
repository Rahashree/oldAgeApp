import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useUser } from '../context/UserContext';
import { Globe, AlertTriangle, Eye, ZoomIn, ZoomOut, UserCheck, X } from 'lucide-react';

export const Header = ({ onOpenEmergency, onOpenVoiceModal }) => {
  const { currentLang, langObj, setLanguage, supportedLanguages, t, fontSizeScale, setFontSizeScale, highContrast, setHighContrast } = useLanguage();
  const { userProfile, resetProfile } = useUser();
  const [showLangModal, setShowLangModal] = useState(false);

  const handleZoomIn = () => {
    if (fontSizeScale < 1.3) setFontSizeScale(prev => parseFloat((prev + 0.1).toFixed(2)));
  };

  const handleZoomOut = () => {
    if (fontSizeScale > 0.9) setFontSizeScale(prev => parseFloat((prev - 0.1).toFixed(2)));
  };

  return (
    <header className="top-header">
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <div style={{
          width: '52px',
          height: '52px',
          borderRadius: '50%',
          backgroundColor: 'var(--primary)',
          color: '#fff',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontWeight: 800,
          fontSize: '1.5rem'
        }}>
          👴👵
        </div>
        <div>
          <h1 style={{ fontSize: '1.4rem', fontWeight: 800, lineHeight: 1.2 }}>
            {t('appTitle')}
          </h1>
          <div style={{ fontSize: '0.95rem', color: 'var(--text-muted)', fontWeight: 600 }}>
            {langObj.name} ({langObj.englishName}) • {userProfile.name || 'Senior Citizen'}
          </div>
        </div>
      </div>

      <div className="header-controls">
        {/* Language Switch Button */}
        <button
          className="btn-senior btn-secondary"
          onClick={() => setShowLangModal(true)}
          style={{ minHeight: '48px', padding: '8px 16px', fontSize: '1.05rem' }}
        >
          <Globe size={20} />
          <span>{t('langSwitch')}: <strong>{langObj.name}</strong></span>
        </button>

        {/* Emergency SOS Button */}
        <button
          className="btn-senior btn-emergency"
          onClick={onOpenEmergency}
          style={{ minHeight: '48px', padding: '8px 16px', fontSize: '1.05rem' }}
        >
          <AlertTriangle size={20} />
          <span>SOS 14567</span>
        </button>

        {/* Font Scaler */}
        <div style={{ display: 'flex', gap: '4px', background: 'var(--bg-card)', border: '2px solid var(--border-color)', borderRadius: '12px', padding: '4px' }}>
          <button
            onClick={handleZoomOut}
            title="Decrease Font Size"
            style={{ border: 'none', background: 'transparent', cursor: 'pointer', padding: '6px', color: 'var(--text-main)' }}
          >
            <ZoomOut size={20} />
          </button>
          <button
            onClick={handleZoomIn}
            title="Increase Font Size"
            style={{ border: 'none', background: 'transparent', cursor: 'pointer', padding: '6px', color: 'var(--text-main)' }}
          >
            <ZoomIn size={20} />
          </button>
        </div>

        {/* High Contrast Toggle */}
        <button
          onClick={() => setHighContrast(!highContrast)}
          title="Toggle High Contrast"
          style={{
            border: '2px solid var(--border-color)',
            background: highContrast ? '#facc15' : 'var(--bg-card)',
            color: highContrast ? '#000' : 'var(--text-main)',
            borderRadius: '12px',
            padding: '8px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center'
          }}
        >
          <Eye size={20} />
        </button>
      </div>

      {/* Language Switch Modal */}
      {showLangModal && (
        <div className="voice-modal-overlay" onClick={() => setShowLangModal(false)}>
          <div className="voice-modal-content" onClick={(e) => e.stopPropagation()}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h2 style={{ fontSize: '1.6rem', fontWeight: 800 }}>
                {t('selectLanguageTitle')}
              </h2>
              <button
                onClick={() => setShowLangModal(false)}
                style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: 'var(--text-main)' }}
              >
                <X size={28} />
              </button>
            </div>

            <div className="lang-grid" style={{ maxHeight: '60vh', overflowY: 'auto' }}>
              {supportedLanguages.map((lang) => (
                <button
                  key={lang.code}
                  className={`lang-card ${currentLang === lang.code ? 'selected' : ''}`}
                  onClick={() => {
                    setLanguage(lang.code);
                    setShowLangModal(false);
                  }}
                >
                  <div className="native-name">{lang.name}</div>
                  <div className="english-name">{lang.englishName}</div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
