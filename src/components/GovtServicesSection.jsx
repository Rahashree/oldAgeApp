import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Car, FileText, CreditCard, ShieldCheck, ExternalLink, Volume2 } from 'lucide-react';

export const GovtServicesSection = () => {
  const { t, speakText } = useLanguage();

  const services = [
    {
      id: 'dl',
      titleKey: 'dlTitle',
      guideKey: 'dlGuide',
      icon: <Car size={26} color="var(--primary)" />,
      url: 'https://parivahan.gov.in'
    },
    {
      id: 'aadhaar',
      titleKey: 'aadhaarTitle',
      guideKey: 'aadhaarGuide',
      icon: <FileText size={26} color="var(--accent-gold)" />,
      url: 'https://myaadhaar.uidai.gov.in'
    },
    {
      id: 'pan',
      titleKey: 'panTitle',
      guideKey: 'panGuide',
      icon: <CreditCard size={26} color="var(--accent-green)" />,
      url: 'https://eportal.incometax.gov.in'
    },
    {
      id: 'welfare',
      titleKey: 'welfareTitle',
      guideKey: 'welfareGuide',
      icon: <ShieldCheck size={26} color="var(--primary)" />,
      url: 'https://pmjay.gov.in'
    }
  ];

  return (
    <div className="senior-card">
      <div className="senior-card-header">
        <div className="senior-card-icon">
          🏛️
        </div>
        <div style={{ flex: 1 }}>
          <h2 style={{ fontSize: '1.8rem', fontWeight: 800 }}>
            {t('govtTitle')}
          </h2>
          <p style={{ fontSize: '1.05rem', color: 'var(--text-muted)' }}>
            {t('govtSub')}
          </p>
        </div>
        <button
          className="btn-read-aloud"
          onClick={() => speakText(`${t('govtTitle')}. ${t('govtSub')}`)}
        >
          <Volume2 size={18} />
          <span>{t('readAloud')}</span>
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '20px' }}>
        {services.map((srv) => {
          const title = t(srv.titleKey);
          const guide = t(srv.guideKey);

          return (
            <div
              key={srv.id}
              style={{
                border: '2px solid var(--border-color)',
                borderRadius: '16px',
                padding: '20px',
                backgroundColor: 'var(--bg-card)',
                boxShadow: 'var(--shadow-sm)'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  {srv.icon}
                  <h3 style={{ fontSize: '1.35rem', fontWeight: 800 }}>
                    {title}
                  </h3>
                </div>

                <button
                  className="btn-read-aloud"
                  onClick={() => speakText(`${title}. ${guide}`)}
                >
                  <Volume2 size={18} />
                  <span>{t('readAloud')}</span>
                </button>
              </div>

              <p style={{ fontSize: '1.15rem', lineHeight: 1.6, color: 'var(--text-main)', marginBottom: '16px' }}>
                {guide}
              </p>

              <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                <a
                  href={srv.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-senior btn-secondary"
                  style={{ padding: '8px 18px', fontSize: '1rem', minHeight: '44px', textDecoration: 'none' }}
                >
                  <span>Open Official Govt Website ({srv.url.replace('https://', '')})</span>
                  <ExternalLink size={18} />
                </a>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
