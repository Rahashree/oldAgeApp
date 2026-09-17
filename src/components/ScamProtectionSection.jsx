import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { ShieldAlert, Volume2, AlertCircle, CheckCircle2, PhoneCall } from 'lucide-react';

export const ScamProtectionSection = () => {
  const { t, speakText } = useLanguage();
  const [msgInput, setMsgInput] = useState('');
  const [testResult, setTestResult] = useState(null);

  const sampleScams = [
    "Dear customer, your bank account is blocked today. Click link to update OTP immediately.",
    "Your pension payment is suspended. Call 9876543210 to reactivate within 1 hour.",
    "Congratulation! You won Rs 25 Lakh in Senior Lottery. Send your bank account details to claim."
  ];

  const handleTestScam = (text) => {
    const textToCheck = text || msgInput;
    if (!textToCheck.trim()) return;

    const lower = textToCheck.toLowerCase();
    const isScam = lower.includes('otp') || lower.includes('link') || lower.includes('block') || lower.includes('pin') || lower.includes('lottery') || lower.includes('suspended') || lower.includes('urgent');

    if (isScam) {
      const warnMsg = t('scamWarning');
      setTestResult({ isScam: true, text: warnMsg });
      speakText(warnMsg);
    } else {
      const safeMsg = t('scamSafe');
      setTestResult({ isScam: false, text: safeMsg });
      speakText(safeMsg);
    }
  };

  return (
    <div className="senior-card" style={{ border: '2px solid var(--accent-gold)' }}>
      <div className="senior-card-header">
        <div className="senior-card-icon" style={{ backgroundColor: '#fffbe6' }}>
          🛡️
        </div>
        <div style={{ flex: 1 }}>
          <h2 style={{ fontSize: '1.8rem', fontWeight: 800 }}>
            {t('scamTitle')}
          </h2>
          <p style={{ fontSize: '1.05rem', color: 'var(--text-muted)' }}>
            {t('scamSub')}
          </p>
        </div>
        <button
          className="btn-read-aloud"
          onClick={() => speakText(`${t('scamTitle')}. ${t('scamSub')}`)}
        >
          <Volume2 size={18} />
          <span>{t('readAloud')}</span>
        </button>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <label style={{ fontSize: '1.15rem', fontWeight: 700 }}>
          {t('scamInputLabel')}
        </label>

        {/* Quick sample chips */}
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          {sampleScams.map((sample, idx) => (
            <button
              key={idx}
              type="button"
              className="btn-senior btn-outline"
              onClick={() => {
                setMsgInput(sample);
                handleTestScam(sample);
              }}
              style={{ fontSize: '0.95rem', padding: '8px 14px', minHeight: '40px', borderRadius: '20px' }}
            >
              Test Sample #{idx + 1}
            </button>
          ))}
        </div>

        <textarea
          rows={3}
          value={msgInput}
          onChange={(e) => setMsgInput(e.target.value)}
          placeholder="Paste SMS or WhatsApp message here..."
          style={{
            width: '100%',
            padding: '16px',
            fontSize: '1.15rem',
            borderRadius: '12px',
            border: '2px solid var(--border-color)',
            backgroundColor: 'var(--bg-card)',
            color: 'var(--text-main)'
          }}
        />

        <button
          className="btn-senior btn-primary"
          onClick={() => handleTestScam()}
          style={{ alignSelf: 'flex-start' }}
        >
          <span>{t('scamCheckBtn')}</span>
        </button>

        {testResult && (
          <div
            style={{
              padding: '20px',
              borderRadius: '16px',
              backgroundColor: testResult.isScam ? '#fef2f2' : '#f0fdf4',
              border: `3px solid ${testResult.isScam ? 'var(--accent-red)' : 'var(--accent-green)'}`,
              marginTop: '12px',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '1.3rem', fontWeight: 800, color: testResult.isScam ? 'var(--accent-red)' : 'var(--accent-green)' }}>
              {testResult.isScam ? <ShieldAlert size={28} /> : <CheckCircle2 size={28} />}
              <span>{testResult.text}</span>
            </div>

            <button
              className="btn-read-aloud"
              onClick={() => speakText(testResult.text)}
              style={{ alignSelf: 'flex-start' }}
            >
              <Volume2 size={18} />
              <span>{t('readAloud')}</span>
            </button>
          </div>
        )}

        <div style={{
          backgroundColor: 'var(--primary-light)',
          padding: '16px',
          borderRadius: '12px',
          border: '1px solid var(--border-color)',
          fontSize: '1.1rem',
          fontWeight: 600,
          marginTop: '8px'
        }}>
          {t('scamHelplineNote')}
          <div style={{ display: 'flex', gap: '12px', marginTop: '10px' }}>
            <a href="tel:1930" className="btn-senior btn-outline" style={{ padding: '6px 14px', fontSize: '0.95rem', minHeight: '38px', textDecoration: 'none' }}>
              <PhoneCall size={16} />
              <span>Cybercrime 1930</span>
            </a>
            <a href="tel:14567" className="btn-senior btn-outline" style={{ padding: '6px 14px', fontSize: '0.95rem', minHeight: '38px', textDecoration: 'none' }}>
              <PhoneCall size={16} />
              <span>Elderline 14567</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
