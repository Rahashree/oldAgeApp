import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { FileText, Volume2, Search, CheckCircle2 } from 'lucide-react';

export const DocumentHelperSection = () => {
  const { t, speakText } = useLanguage();
  const [selectedTerm, setSelectedTerm] = useState('term1');

  const terms = [
    { id: 'term1', titleKey: 'term1', expKey: 'term1Exp' },
    { id: 'term2', titleKey: 'term2', expKey: 'term2Exp' },
    { id: 'term3', titleKey: 'term3', expKey: 'term3Exp' },
    { id: 'term4', titleKey: 'term4', expKey: 'term4Exp' }
  ];

  return (
    <div className="senior-card">
      <div className="senior-card-header">
        <div className="senior-card-icon">
          📷
        </div>
        <div style={{ flex: 1 }}>
          <h2 style={{ fontSize: '1.8rem', fontWeight: 800 }}>
            {t('docTitle')}
          </h2>
          <p style={{ fontSize: '1.05rem', color: 'var(--text-muted)' }}>
            {t('docSub')}
          </p>
        </div>
        <button
          className="btn-read-aloud"
          onClick={() => speakText(`${t('docTitle')}. ${t('docSub')}`)}
        >
          <Volume2 size={18} />
          <span>{t('readAloud')}</span>
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
        {terms.map((item) => {
          const title = t(item.titleKey);
          const exp = t(item.expKey);
          const isSelected = selectedTerm === item.id;

          return (
            <div
              key={item.id}
              onClick={() => {
                setSelectedTerm(item.id);
                speakText(`${title}. ${exp}`);
              }}
              style={{
                border: isSelected ? '3px solid var(--primary)' : '2px solid var(--border-color)',
                borderRadius: '16px',
                padding: '20px',
                backgroundColor: isSelected ? 'var(--primary-light)' : 'var(--bg-card)',
                cursor: 'pointer',
                transition: 'all 0.2s',
                display: 'flex',
                flexDirection: 'column',
                gap: '12px'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 800, fontSize: '1.2rem', color: 'var(--text-main)' }}>
                  <FileText color="var(--primary)" size={22} />
                  <span>{title}</span>
                </div>
                {isSelected && <CheckCircle2 size={22} color="var(--primary)" />}
              </div>

              <p style={{ fontSize: '1.15rem', lineHeight: 1.6, color: 'var(--text-main)' }}>
                {exp}
              </p>

              <button
                className="btn-read-aloud"
                style={{ alignSelf: 'flex-start', padding: '4px 12px', fontSize: '0.9rem' }}
                onClick={(e) => {
                  e.stopPropagation();
                  speakText(exp);
                }}
              >
                <Volume2 size={16} />
                <span>{t('readAloud')}</span>
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};
