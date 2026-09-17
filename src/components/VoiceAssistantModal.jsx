import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Mic, MicOff, Volume2, X, Send, Sparkles } from 'lucide-react';

export const VoiceAssistantModal = ({ isOpen, onClose }) => {
  const { currentLang, langObj, t, speakText, isSpeaking, stopSpeech } = useLanguage();
  const [inputText, setInputText] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [messages, setMessages] = useState([]);
  const [isGenerating, setIsGenerating] = useState(false);

  useEffect(() => {
    if (isOpen) {
      // Add initial localized greeting message
      const initialGreeting = getInitialGreeting(currentLang);
      setMessages([{
        sender: 'ai',
        text: initialGreeting
      }]);
      // Speak greeting automatically
      speakText(initialGreeting);
    } else {
      stopSpeech();
    }
  }, [isOpen, currentLang]);

  const getInitialGreeting = (lang) => {
    switch (lang) {
      case 'kn': return 'ನಮಸ್ಕಾರ! ನಾನು ನಿಮ್ಮ ಡಿಜಿಟಲ್ ಸಹಾಯಕಿ. ನಿಮ್ಮ ಪಿಂಚಣಿ, ಸರ್ಕಾರಿ ಸೇವೆಗಳು ಅಥವಾ ಯಾವುದೇ ಪ್ರಶ್ನೆ ಕೇಳಿ.';
      case 'hi': return 'नमस्ते! मैं आपकी डिजिटल सहायक हूँ। अपनी पेंशन, सरकारी सेवाओं या किसी भी सवाल के बारे में पूछें।';
      case 'ml': return 'നമസ്കാരം! ഞാൻ നിങ്ങളുടെ ഡിജിറ്റൽ സഹായിയാണ്. പെൻഷൻ, സർക്കാർ സേവനങ്ങൾ എന്നിവയെക്കുറിച്ച് ചോദിക്കാം.';
      case 'ta': return 'வணக்கம்! நான் உங்கள் டிஜிட்டல் உதவியாளர். உங்கள் ஓய்வூதியம், அரசு சேவைகள் பற்றி கேட்கலாம்.';
      case 'te': return 'నమస్కారం! నేను మీ డిജിటల్ సహాయకుడిని. పెన్షన్ లేదా ప్రభుత్వ సేవల గురించి అడగండి.';
      case 'mr': return 'नमस्कार! मी तुमची डिजिटल सहाय्यक आहे. पेन्शन किंवा शासकीय सेवांबद्दल विचारा.';
      case 'bn': return 'নমস্কার! আমি আপনার ডিজিটাল সহকারী। আপনার পেনশন বা সরকারি সেবা সম্পর্কে জিজ্ঞাসা করুন।';
      case 'gu': return 'નમસ્તે! હું તમારી ડિજિટલ સહાયક છું. તમારા પેન્શન કે સરકારી સેવાઓ વિશે પૂછો.';
      case 'pa': return 'ਸਤਿ ਸ਼੍ਰੀ ਅਕਾਲ! ਮੈਂ ਤੁਹਾਡੀ ਡਿਜੀਟਲ ਸਹਾਇਕ ਹਾਂ। ਪੈਨਸ਼ਨ ਜਾਂ ਸਰਕਾਰੀ ਸੇਵਾਵਾਂ ਬਾਰੇ ਪੁੱਛੋ।';
      case 'or': return 'ନମସ୍କାର! ମୁଁ ଆପଣଙ୍କ ଡିଜିଟାଲ୍ ସହାୟକ। ଆପଣଙ୍କ ପେନସନ କିମ୍ବା ସରକାରୀ ସେବା ବିଷୟରେ ପଚାରନ୍ତୁ।';
      case 'ur': return 'آداب! میں آپ کی ڈیجیٹل اسسٹنٹ ہوں۔ اپنی پنشن یا سرکاری خدمات کے بارے میں پوچھیں۔';
      default: return 'Hello! I am your Digital Assistant. Ask me anything about pension or government services.';
    }
  };

  const handleStartListening = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert('Voice recognition is not supported in this browser. Please type your query below.');
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.lang = langObj.locale;
      recognition.interimResults = false;
      recognition.maxAlternatives = 1;

      recognition.onstart = () => setIsListening(true);
      recognition.onend = () => setIsListening(false);
      recognition.onerror = (err) => {
        setIsListening(false);
        console.error('Speech recognition error:', err);
      };

      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        if (transcript) {
          setInputText(transcript);
          handleSendQuery(transcript);
        }
      };

      recognition.start();
    } catch (err) {
      console.error(err);
      setIsListening(false);
    }
  };

  const handleSendQuery = (textToSend) => {
    const query = textToSend || inputText;
    if (!query.trim()) return;

    // Append user message
    const newMessages = [...messages, { sender: 'user', text: query }];
    setMessages(newMessages);
    setInputText('');
    setIsGenerating(true);

    // Generate intelligent localized assistant response
    setTimeout(() => {
      const aiReply = generateAIResponse(query, currentLang);
      setMessages([...newMessages, { sender: 'ai', text: aiReply }]);
      setIsGenerating(false);
      // Auto speak response in target language
      speakText(aiReply);
    }, 600);
  };

  const generateAIResponse = (userQuery, lang) => {
    const q = userQuery.toLowerCase();

    // 1. Pension Question
    if (q.includes('pension') || q.includes('ಪಿಂಚಣಿ') || q.includes('पेंशन') || q.includes('പെൻഷൻ') || q.includes('ஓய்வூதியம்') || q.includes('పెన్షన్') || q.includes('पेन्शन')) {
      switch (lang) {
        case 'kn': return 'ನಿಮ್ಮ ಪಿಂಚಣಿ ಸ್ಥಿತಿಯನ್ನು ಪರಿಶೀಲಿಸಲು ನಾನು ಸಹಾಯ ಮಾಡುತ್ತೇನೆ. ನಾವು ಒಂದೊಂದೇ ಹಂತವಾಗಿ ಮಾಡೋಣ. ಈ ತಿಂಗಳ ಪಿಂಚಣಿ ನೇರವಾಗಿ ನಿಮ್ಮ ಬ್ಯಾಂಕ್ ಖಾತೆಗೆ ಜಮಾ ಆಗಿದೆ. ನಿಮ್ಮ ಬ್ಯಾಂಕ್ SMS ಪರಿಶೀಲಿಸಿ ಅಥವಾ ಉಚಿತ ಸಹಾಯವಾಣಿ 14567 ಗೆ ಕರೆ ಮಾಡಿ.';
        case 'hi': return 'आपकी पेंशन स्थिति की जांच करने के लिए मैं मदद करूंगी। हम एक-एक करके आगे बढ़ेंगे। इस महीने की पेंशन सीधे आपके बैंक खाते में जमा हो चुकी है।';
        case 'ml': return 'നിങ്ങളുടെ പെൻഷൻ വിവരങ്ങൾ പരിശോധിക്കാൻ ഞാൻ സഹായിക്കാം. ഈ മാസത്തെ പെൻഷൻ അക്കൗണ്ടിൽ വന്നിട്ടുണ്ട്.';
        case 'ta': return 'உங்கள் ஓய்வூதிய விவரங்களை சரிபார்க்க நான் உதவுகிறேன். இந்த மாத ஓய்వூதியம் உங்கள் வங்கிக் கணக்கில் जमा செய்யப்பட்டுள்ளது.';
        case 'te': return 'మీ పెన్షన్ వివరాలు తనిఖీ చేయడానికి నేను సహాయం చేస్తాను. ఈ నెల పెన్షన్ మీ బ్యాంక్ ఖాతాలో జమ చేయబడింది.';
        case 'mr': return 'मी तुमच्या पेन्शनची माहिती तपासण्यास मदत करते. या महिन्याची पेन्शन थेट खात्यात जमा झाली आहे.';
        default: return 'I will assist you in checking your pension status step-by-step. Your monthly pension is credited directly to your bank account via DBT.';
      }
    }

    // 2. Life Certificate / Jeevan Pramaan
    if (q.includes('certificate') || q.includes('ಜೀವನ') || q.includes('प्रमाण') || q.includes('സർട്ടിഫിക്കറ്റ്') || q.includes('சான்றிதழ்')) {
      switch (lang) {
        case 'kn': return 'ಜೀವನ ಪ್ರಮಾಣಪತ್ರವನ್ನು ಪ್ರತಿ ವರ್ಷ ನವೆಂಬರ್‌ನಲ್ಲಿ ಸಲ್ಲಿಸಬೇಕು. ನಿಮ್ಮ ಮನೆಗೇ ಅಂಚೆ ಅಣ್ಣನನ್ನು (Postman) ಕರೆಸಿ ಬೆರಳಚ್ಚು ಮೂಲಕ ಸಲ್ಲಿಸಬಹುದು.';
        case 'hi': return 'जीवन प्रमाण पत्र हर साल नवंबर में जमा करना होता है। आप अपने डाकिया (Postman) को घर बुलाकर डिजिटल रूप से जमा करवा सकते हैं।';
        default: return 'Life certificate can be submitted annually in November. You can call your local postman for doorstep biometric submission.';
      }
    }

    // Default friendly response
    switch (lang) {
      case 'kn': return `ನಿಮ್ಮ ಪ್ರಶ್ನೆ "${userQuery}" ಗೆ ಧನ್ಯವಾದಗಳು. ಹಿರಿಯ ನಾಗರಿಕರಿಗೆ ಅಗತ್ಯವಿರುವ ಎಲ್ಲಾ ಸರ್ಕಾರಿ ಸೇವೆಗಳು ಮತ್ತು ಮಾಹಿತಿಯನ್ನು ನಾನು ಸರಳವಾಗಿ ಒದಗಿಸುತ್ತೇನೆ.`;
      case 'hi': return `आपके प्रश्न "${userQuery}" के लिए धन्यवाद। वरिष्ठ नागरिकों के लिए सभी जानकारी मैं सरल भाषा में प्रदान करती हूँ।`;
      case 'ml': return `നിങ്ങളുടെ ചോദ്യത്തിന് നന്ദി. മുതിർന്ന പൗരന്മാർക്കുള്ള എല്ലാ വിവരങ്ങളും ഞാൻ ലളിതമായി നൽകാം.`;
      case 'ta': return `உங்கள் கேள்விக்கு நன்றி. மூத்த குடிமக்களுக்கான தகவல்களை எளிய தமிழில் விளக்குகிறேன்.`;
      case 'te': return `మీ ప్రశ్నకు ధన్యవాదాలు. వయోవృద్ధులకు అవసరమైన సమాచారాన్ని సులభంగా అందిస్తాను.`;
      default: return `Thank you for your question: "${userQuery}". I am here to help you navigate all senior services smoothly.`;
    }
  };

  if (!isOpen) return null;

  return (
    <div className="voice-modal-overlay" onClick={onClose}>
      <div className="voice-modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '650px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '2px solid var(--border-color)', paddingBottom: '12px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Sparkles color="var(--primary)" size={26} />
            <h2 style={{ fontSize: '1.5rem', fontWeight: 800 }}>
              {t('voiceModalTitle')}
            </h2>
          </div>
          <button onClick={onClose} style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: 'var(--text-main)' }}>
            <X size={28} />
          </button>
        </div>

        {/* Mic Pulse Button */}
        <div style={{ textAlign: 'center', margin: '16px 0' }}>
          <button
            className={`mic-pulse-circle ${isListening ? 'listening' : ''}`}
            onClick={handleStartListening}
            title="Tap to speak"
            style={{ backgroundColor: isListening ? 'var(--accent-red)' : 'var(--primary)' }}
          >
            {isListening ? <MicOff size={44} /> : <Mic size={44} />}
          </button>
          <p style={{ marginTop: '12px', fontSize: '1.15rem', fontWeight: 700, color: isListening ? 'var(--accent-red)' : 'var(--text-main)' }}>
            {isListening ? t('voiceListening') : t('speakBtn')}
          </p>
          <div style={{ fontSize: '0.95rem', color: 'var(--text-muted)' }}>
            Language Locale: <strong>{langObj.locale}</strong> ({langObj.name})
          </div>
        </div>

        {/* Conversation Stream */}
        <div style={{
          maxHeight: '260px',
          overflowY: 'auto',
          display: 'flex',
          flexDirection: 'column',
          gap: '12px',
          padding: '12px',
          backgroundColor: 'var(--bg-main)',
          borderRadius: '16px',
          border: '1px solid var(--border-color)'
        }}>
          {messages.map((msg, idx) => (
            <div
              key={idx}
              style={{
                alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start',
                maxWidth: '85%',
                padding: '14px 18px',
                borderRadius: '16px',
                backgroundColor: msg.sender === 'user' ? 'var(--primary)' : 'var(--bg-card)',
                color: msg.sender === 'user' ? '#ffffff' : 'var(--text-main)',
                border: msg.sender === 'ai' ? '2px solid var(--border-color)' : 'none',
                boxShadow: 'var(--shadow-sm)',
                fontSize: '1.15rem',
                lineHeight: 1.5
              }}
            >
              <div style={{ marginBottom: '6px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '8px' }}>
                <strong style={{ fontSize: '0.9rem', opacity: 0.8 }}>
                  {msg.sender === 'user' ? 'You' : `Assistant (${langObj.name})`}
                </strong>

                {msg.sender === 'ai' && (
                  <button
                    className="btn-read-aloud"
                    onClick={() => speakText(msg.text)}
                    style={{ padding: '4px 10px', fontSize: '0.85rem' }}
                  >
                    <Volume2 size={16} />
                    <span>{t('readAloud')}</span>
                  </button>
                )}
              </div>
              <p>{msg.text}</p>
            </div>
          ))}

          {isGenerating && (
            <div style={{ padding: '12px', color: 'var(--text-muted)', fontStyle: 'italic', fontSize: '1.05rem' }}>
              {t('aiThinking')}
            </div>
          )}
        </div>

        {/* Text Input Row */}
        <div style={{ display: 'flex', gap: '10px' }}>
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSendQuery()}
            placeholder={t('voicePromptPlaceholder')}
            style={{
              flex: 1,
              padding: '14px',
              fontSize: '1.1rem',
              borderRadius: '12px',
              border: '2px solid var(--border-color)',
              backgroundColor: 'var(--bg-card)',
              color: 'var(--text-main)'
            }}
          />
          <button
            className="btn-senior btn-primary"
            onClick={() => handleSendQuery()}
            style={{ minHeight: '48px', padding: '0 20px' }}
          >
            <Send size={22} />
          </button>
        </div>
      </div>
    </div>
  );
};
