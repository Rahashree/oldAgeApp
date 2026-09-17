import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Radio, Heart, Volume2, Play, Pause, Sparkles } from 'lucide-react';

export const DevotionalWellnessSection = () => {
  const { currentLang, t, speakText } = useLanguage();
  const [isPlayingRadio, setIsPlayingRadio] = useState(false);

  const getDevotionalChant = (lang) => {
    switch (lang) {
      case 'kn': return 'ಓಂ ನಮಃ ಶಿವಾಯ • ಶ್ರೀ ಮಂಜುನಾಥ ಸ್ವಾಮಿ ಸುಪ್ರಭಾತ • ಗಾಯತ್ರಿ ಮಂತ್ರ';
      case 'hi': return 'ॐ नमः शिवाय • श्री हनुमान चालीसा • गायत्री मंत्र भजन';
      case 'ml': return 'ഹരിനാമകീർത്തനം • ഓം നമോ നാരായണായ • സുപ്രഭാതം';
      case 'ta': return 'கந்த சஷ்டி கவசம் • ஓம் நமச்சிவாய • பெருமாள் சுப்ரபாதம்';
      case 'te': return 'వెంకటేశ్వర సుప్రభాతం • ఓం నమః శివాయ • శ్రీరామ నామస్మరణ';
      case 'mr': return 'ॐ नमः शिवाय • श्री गजानन महाराज बावन्नी • हरिपाठ';
      case 'bn': return 'ওঁ নমঃ শিবায় • শ্রীরামকৃষ্ণ নামসংকীর্তন • সুপ্রভাত স্তোত্র';
      case 'gu': return 'ૐ નમઃ શિવાય • જે જે શ્રી રામ • પ્રભાતિયાં ભજન';
      case 'pa': return 'ੴ ਸਤਿਨਾਮੁ ਵਾਹਿਗੁਰੂ • ਸੁਖਮਨੀ ਸਾਹਿਬ ਪਾਠ • ਸ਼ਬਦ ਕੀਰਤਨ';
      case 'or': return 'ଓଁ ନମଃ ଶିବାୟ • ଶ୍ରୀ ଜଗନ୍ନାଥ ହରିନାମ • ସୁପ୍ରଭାତ';
      case 'ur': return 'تلاوت کلام پاک • نعت شریف • درود پاک';
      default: return 'Om Namah Shivaya • Devotional Chants • Peace Meditation';
    }
  };

  const handlePlayBreathing = () => {
    const breathGuide = "Sit comfortably in your chair. Close your eyes softly. Take a deep breath in... 1, 2, 3... Now gently breathe out... 1, 2, 3... Feel total peace and relaxation.";
    speakText(breathGuide);
  };

  return (
    <div className="senior-card">
      <div className="senior-card-header">
        <div className="senior-card-icon">
          🧘
        </div>
        <div style={{ flex: 1 }}>
          <h2 style={{ fontSize: '1.8rem', fontWeight: 800 }}>
            {t('wellnessTitle')}
          </h2>
          <p style={{ fontSize: '1.05rem', color: 'var(--text-muted)' }}>
            {t('wellnessSub')}
          </p>
        </div>
        <button
          className="btn-read-aloud"
          onClick={() => speakText(`${t('wellnessTitle')}. ${t('wellnessSub')}`)}
        >
          <Volume2 size={18} />
          <span>{t('readAloud')}</span>
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '20px' }}>
        {/* Devotional Audio */}
        <div style={{
          border: '2px solid var(--border-color)',
          borderRadius: '16px',
          padding: '20px',
          backgroundColor: 'var(--primary-light)',
          display: 'flex',
          flexDirection: 'column',
          gap: '14px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '1.3rem', fontWeight: 800 }}>
            <Radio size={26} color="var(--primary)" />
            <span>{t('devotionalRadio')}</span>
          </div>

          <p style={{ fontSize: '1.1rem', fontWeight: 600, color: 'var(--text-main)' }}>
            {getDevotionalChant(currentLang)}
          </p>

          <button
            className="btn-senior btn-primary"
            onClick={() => {
              setIsPlayingRadio(!isPlayingRadio);
              if (!isPlayingRadio) speakText(`Playing ${getDevotionalChant(currentLang)}.`);
            }}
            style={{ alignSelf: 'flex-start' }}
          >
            {isPlayingRadio ? <Pause size={20} /> : <Play size={20} />}
            <span>{isPlayingRadio ? 'Pause Radio' : 'Play Radio Audio'}</span>
          </button>
        </div>

        {/* Breathing Yoga */}
        <div style={{
          border: '2px solid var(--border-color)',
          borderRadius: '16px',
          padding: '20px',
          backgroundColor: '#f0fdf4',
          display: 'flex',
          flexDirection: 'column',
          gap: '14px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '1.3rem', fontWeight: 800, color: 'var(--accent-green)' }}>
            <Sparkles size={26} />
            <span>{t('yogaSteps')}</span>
          </div>

          <p style={{ fontSize: '1.1rem', color: 'var(--text-main)' }}>
            5 minutes of deep breathing increases oxygen flow and relaxes the mind.
          </p>

          <button
            className="btn-senior btn-primary"
            onClick={handlePlayBreathing}
            style={{ alignSelf: 'flex-start', backgroundColor: 'var(--accent-green)' }}
          >
            <Volume2 size={20} />
            <span>Start Guided Breathing</span>
          </button>
        </div>
      </div>
    </div>
  );
};
