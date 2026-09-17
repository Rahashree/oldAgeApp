import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Landmark, Volume2, ChevronDown, ChevronUp, CheckCircle, AlertCircle, HelpCircle } from 'lucide-react';

export const PensionSection = () => {
  const { currentLang, t, speakText } = useLanguage();
  const [activeQuestion, setActiveQuestion] = useState('pensionQ1');

  const questions = [
    { id: 'pensionQ1', titleKey: 'pensionQ1', ansKey: 'pensionQ1Ans' },
    { id: 'pensionQ2', titleKey: 'pensionQ2', ansKey: 'pensionQ2Ans' },
    { id: 'pensionQ3', titleKey: 'pensionQ3', ansKey: 'pensionQ3Ans' },
    { id: 'pensionQ4', titleKey: 'pensionQ4', ansKey: 'pensionQ4Ans' },
    { id: 'pensionQ5', titleKey: 'pensionQ5', ansKey: 'pensionQ5Ans' }
  ];

  return (
    <div className="senior-card">
      <div className="senior-card-header">
        <div className="senior-card-icon">
          💰
        </div>
        <div style={{ flex: 1 }}>
          <h2 style={{ fontSize: '1.8rem', fontWeight: 800 }}>
            {t('pensionTitle')}
          </h2>
          <p style={{ fontSize: '1.05rem', color: 'var(--text-muted)' }}>
            {t('pensionSub')}
          </p>
        </div>
        <button
          className="btn-read-aloud"
          onClick={() => speakText(`${t('pensionTitle')}. ${t('pensionSub')}`)}
        >
          <Volume2 size={18} />
          <span>{t('readAloud')}</span>
        </button>
      </div>

      <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', backgroundColor: 'var(--primary-light)', padding: '6px 14px', borderRadius: '20px', fontSize: '0.95rem', fontWeight: 700, color: 'var(--primary)', marginBottom: '20px' }}>
        <span>{t('officialGovtBadge')}</span>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
        {questions.map((q) => {
          const isOpen = activeQuestion === q.id;
          const qTitle = t(q.titleKey);
          const qAns = t(q.ansKey);

          return (
            <div
              key={q.id}
              style={{
                border: isOpen ? '3px solid var(--primary)' : '2px solid var(--border-color)',
                borderRadius: '16px',
                backgroundColor: 'var(--bg-card)',
                overflow: 'hidden',
                transition: 'all 0.2s'
              }}
            >
              <button
                type="button"
                onClick={() => {
                  setActiveQuestion(isOpen ? null : q.id);
                  if (!isOpen) speakText(`${qTitle}. ${qAns}`);
                }}
                style={{
                  width: '100%',
                  padding: '18px 20px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  background: 'transparent',
                  border: 'none',
                  textAlign: 'left',
                  cursor: 'pointer',
                  fontSize: '1.25rem',
                  fontWeight: 700,
                  color: 'var(--text-main)'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <HelpCircle color="var(--primary)" size={24} />
                  <span>{qTitle}</span>
                </div>
                {isOpen ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
              </button>

              {isOpen && (
                <div style={{
                  padding: '0 20px 20px 20px',
                  borderTop: '1px solid var(--border-color)',
                  backgroundColor: 'var(--primary-light)'
                }}>
                  <div style={{ margin: '16px 0', fontSize: '1.2rem', lineHeight: 1.6, color: 'var(--text-main)' }}>
                    {qAns}
                  </div>

                  <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginTop: '16px' }}>
                    <button
                      className="btn-read-aloud"
                      onClick={() => speakText(qAns)}
                    >
                      <Volume2 size={18} />
                      <span>{t('readAloud')}</span>
                    </button>

                    <a
                      href="tel:14567"
                      className="btn-senior btn-outline"
                      style={{ padding: '6px 14px', fontSize: '0.95rem', minHeight: '38px', textDecoration: 'none' }}
                    >
                      📞 Call Elderline 14567
                    </a>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
