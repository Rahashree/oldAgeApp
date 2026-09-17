import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useUser } from '../context/UserContext';
import { Volume2, CheckCircle2, User, Phone, ShieldCheck, ArrowRight } from 'lucide-react';

export const Onboarding = () => {
  const { currentLang, setLanguage, supportedLanguages, t, speakText } = useLanguage();
  const { saveProfile } = useUser();

  const [step, setStep] = useState(1); // 1 = Language Selection, 2 = Registration Form
  const [name, setName] = useState('');
  const [ageGroup, setAgeGroup] = useState('65-75');
  const [emergencyNumber, setEmergencyNumber] = useState('14567');
  const [familyHelperLang, setFamilyHelperLang] = useState('en');

  const handleSelectLanguage = (code) => {
    setLanguage(code);
    const selected = supportedLanguages.find(l => l.code === code);
    if (selected) {
      speakText(`${selected.name}. ${getSampleGreeting(code)}`);
    }
  };

  const getSampleGreeting = (code) => {
    switch (code) {
      case 'kn': return 'ನಮಸ್ಕಾರ! ಕನ್ನಡ ಭಾಷೆ ಆಯ್ಕೆಯಾಗಿದೆ.';
      case 'hi': return 'नमस्ते! हिन्दी भाषा चुनी गई है।';
      case 'ml': return 'നമസ്കാരം! മലയാളം തിരഞ്ഞെടുത്തു.';
      case 'ta': return 'வணக்கம்! தமிழ் மொழி தேர்ந்தெடுக்கப்பட்டது.';
      case 'te': return 'నమస్కారం! తెలుగు భాష ఎంచుకోబడింది.';
      case 'mr': return 'नमस्कार! मराठी भाषा निवडली आहे.';
      case 'bn': return 'নমস্কার! বাংলা ভাষা নির্বাচিত হয়েছে।';
      case 'gu': return 'નમસ્તે! ગુજરાતી ભાષા પસંદ કરાઈ છે.';
      case 'pa': return 'ਸਤਿ ਸ਼੍ਰੀ ਅਕਾਲ! ਪੰਜਾਬੀ ਭਾਸ਼ਾ ਚੁਣੀ ਗਈ ਹੈ।';
      case 'or': return 'ନମସ୍କାର! ଓଡ଼ିଆ ଭାଷା ବଛାଗଲା।';
      case 'ur': return 'آداب! اردو زبان منتخب کی گئی ہے۔';
      default: return 'English language selected.';
    }
  };

  const handleCompleteRegistration = (e) => {
    e.preventDefault();
    saveProfile({
      name: name || 'Senior User',
      ageGroup,
      emergencyNumber,
      familyHelperLang
    });
  };

  return (
    <div style={{ padding: '20px 0' }}>
      {step === 1 ? (
        <div className="senior-card" style={{ padding: '32px 24px', textAlign: 'center' }}>
          <h1 style={{ fontSize: '2.2rem', fontWeight: 800, color: 'var(--primary)', marginBottom: '8px' }}>
            {t('selectLanguageTitle')}
          </h1>
          <p style={{ fontSize: '1.2rem', color: 'var(--text-muted)', marginBottom: '24px' }}>
            {t('selectLanguageSubtitle')}
          </p>

          <div className="lang-grid">
            {supportedLanguages.map((lang) => {
              const isSelected = currentLang === lang.code;
              return (
                <button
                  key={lang.code}
                  type="button"
                  className={`lang-card ${isSelected ? 'selected' : ''}`}
                  onClick={() => handleSelectLanguage(lang.code)}
                >
                  <div className="native-name">{lang.name}</div>
                  <div className="english-name">{lang.englishName}</div>
                  {isSelected && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--primary)', marginTop: '6px', fontWeight: 700 }}>
                      <CheckCircle2 size={20} />
                      <span>Selected</span>
                    </div>
                  )}
                </button>
              );
            })}
          </div>

          <div style={{ marginTop: '36px', display: 'flex', justifyContent: 'center', gap: '16px' }}>
            <button
              className="btn-read-aloud"
              type="button"
              onClick={() => speakText(`${t('selectLanguageTitle')}. ${t('selectLanguageSubtitle')}`)}
            >
              <Volume2 size={20} />
              <span>{t('readAloud')}</span>
            </button>

            <button
              className="btn-senior btn-primary"
              type="button"
              onClick={() => setStep(2)}
              style={{ fontSize: '1.3rem' }}
            >
              <span>{t('continueBtn')}</span>
            </button>
          </div>
        </div>
      ) : (
        <div className="senior-card" style={{ padding: '32px 24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
            <h2 style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--text-main)' }}>
              {t('onboardingTitle')}
            </h2>
            <button className="btn-read-aloud" type="button" onClick={() => speakText(`${t('onboardingTitle')}. ${t('onboardingSub')}`)}>
              <Volume2 size={20} />
              <span>{t('readAloud')}</span>
            </button>
          </div>

          <p style={{ fontSize: '1.15rem', color: 'var(--text-muted)', marginBottom: '28px' }}>
            {t('onboardingSub')}
          </p>

          <form onSubmit={handleCompleteRegistration} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div>
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '1.2rem', fontWeight: 700, marginBottom: '8px' }}>
                <User size={22} color="var(--primary)" />
                <span>{t('yourName')}</span>
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder={t('yourNamePlaceholder')}
                style={{
                  width: '100%',
                  padding: '16px',
                  fontSize: '1.2rem',
                  borderRadius: '12px',
                  border: '2px solid var(--border-color)',
                  backgroundColor: 'var(--bg-card)',
                  color: 'var(--text-main)'
                }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '1.2rem', fontWeight: 700, marginBottom: '8px' }}>
                {t('yourAge')}
              </label>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }}>
                {['60-70', '71-80', '80+'].map((age) => (
                  <button
                    key={age}
                    type="button"
                    className={`btn-senior ${ageGroup === age ? 'btn-primary' : 'btn-outline'}`}
                    onClick={() => setAgeGroup(age)}
                    style={{ fontSize: '1.1rem' }}
                  >
                    {age} Years
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '1.2rem', fontWeight: 700, marginBottom: '8px' }}>
                <Phone size={22} color="var(--accent-red)" />
                <span>{t('emergencyContact')}</span>
              </label>
              <input
                type="tel"
                value={emergencyNumber}
                onChange={(e) => setEmergencyNumber(e.target.value)}
                placeholder="14567 or Family phone number"
                style={{
                  width: '100%',
                  padding: '16px',
                  fontSize: '1.2rem',
                  borderRadius: '12px',
                  border: '2px solid var(--border-color)',
                  backgroundColor: 'var(--bg-card)',
                  color: 'var(--text-main)'
                }}
              />
            </div>

            <div>
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '1.2rem', fontWeight: 700, marginBottom: '8px' }}>
                <ShieldCheck size={22} color="var(--accent-gold)" />
                <span>{t('familyHelperLang')}</span>
              </label>
              <select
                value={familyHelperLang}
                onChange={(e) => setFamilyHelperLang(e.target.value)}
                style={{
                  width: '100%',
                  padding: '16px',
                  fontSize: '1.2rem',
                  borderRadius: '12px',
                  border: '2px solid var(--border-color)',
                  backgroundColor: 'var(--bg-card)',
                  color: 'var(--text-main)'
                }}
              >
                <option value={currentLang}>Senior's Selected Language</option>
                <option value="en">English</option>
                <option value="hi">Hindi (हिन्दी)</option>
              </select>
            </div>

            <div style={{ display: 'flex', gap: '16px', marginTop: '16px' }}>
              <button
                className="btn-senior btn-outline"
                type="button"
                onClick={() => setStep(1)}
              >
                {t('backBtn')}
              </button>

              <button
                className="btn-senior btn-primary"
                type="submit"
                style={{ flex: 1, fontSize: '1.25rem' }}
              >
                <span>{t('registerBtn')}</span>
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
