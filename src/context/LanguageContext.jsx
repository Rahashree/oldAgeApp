import React, { createContext, useContext, useState, useEffect } from 'react';
import { SUPPORTED_LANGUAGES, getLanguageByCode } from '../i18n/languages';
import { getTranslation } from '../i18n/translations';

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [currentLang, setCurrentLangState] = useState(() => {
    return localStorage.getItem('senior_app_lang') || 'kn'; // Default to Kannada as per example or user prompt
  });
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [fontSizeScale, setFontSizeScale] = useState(1); // 1, 1.15, 1.3
  const [highContrast, setHighContrast] = useState(false);

  const langObj = getLanguageByCode(currentLang);

  const setLanguage = (code) => {
    setCurrentLangState(code);
    localStorage.setItem('senior_app_lang', code);
    // Stop any ongoing speech when language changes
    stopSpeech();
  };

  const t = (key) => {
    return getTranslation(currentLang, key);
  };

  const speakText = (text) => {
    if (!('speechSynthesis' in window)) {
      alert('Speech Synthesis is not supported in this browser.');
      return;
    }

    window.speechSynthesis.cancel(); // Stop any active speech

    if (!text) return;

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = langObj.locale;
    utterance.rate = 0.85; // Slightly slower speech for elderly users

    // Try finding matching voice for locale
    const voices = window.speechSynthesis.getVoices();
    const matchingVoice = voices.find(v => v.lang === langObj.locale || v.lang.startsWith(currentLang));
    if (matchingVoice) {
      utterance.voice = matchingVoice;
    }

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    window.speechSynthesis.speak(utterance);
  };

  const stopSpeech = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  };

  useEffect(() => {
    // Ensure voices are loaded
    if ('speechSynthesis' in window) {
      window.speechSynthesis.onvoiceschanged = () => {
        window.speechSynthesis.getVoices();
      };
    }
  }, []);

  return (
    <LanguageContext.Provider value={{
      currentLang,
      langObj,
      setLanguage,
      t,
      speakText,
      stopSpeech,
      isSpeaking,
      fontSizeScale,
      setFontSizeScale,
      highContrast,
      setHighContrast,
      supportedLanguages: SUPPORTED_LANGUAGES
    }}>
      <div 
        className={`app-theme-root ${highContrast ? 'high-contrast-mode' : ''}`}
        dir={langObj.dir}
        style={{ fontSize: `${18 * fontSizeScale}px` }}
      >
        {children}
      </div>
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
