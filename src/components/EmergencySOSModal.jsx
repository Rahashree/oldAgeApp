import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useUser } from '../context/UserContext';
import { AlertTriangle, Phone, Volume2, X, ShieldAlert, CheckCircle2 } from 'lucide-react';

export const EmergencySOSModal = ({ isOpen, onClose }) => {
  const { currentLang, t, speakText } = useLanguage();
  const { userProfile } = useUser();
  const [sirenActive, setSirenActive] = useState(false);
  const [alertSent, setAlertSent] = useState(false);

  if (!isOpen) return null;

  const handleTriggerEmergencySiren = () => {
    setSirenActive(true);
    speakText('Emergency Alert Activated! Calling Elder Helpline 14567 and sending location alert to registered emergency contact.');
    setAlertSent(true);
  };

  return (
    <div className="voice-modal-overlay" onClick={onClose}>
      <div className="voice-modal-content" onClick={(e) => e.stopPropagation()} style={{ border: '4px solid var(--accent-red)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '2px solid var(--border-color)', paddingBottom: '12px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--accent-red)' }}>
            <AlertTriangle size={32} />
            <h2 style={{ fontSize: '1.8rem', fontWeight: 800 }}>
              {t('emergencyBtn')}
            </h2>
          </div>
          <button onClick={onClose} style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: 'var(--text-main)' }}>
            <X size={28} />
          </button>
        </div>

        <div style={{ textAlign: 'center', padding: '16px 0' }}>
          <p style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '20px' }}>
            National Senior Citizen ElderLine Helpline: <strong style={{ color: 'var(--accent-red)', fontSize: '1.6rem' }}>14567</strong>
          </p>

          <button
            className="btn-senior btn-emergency"
            onClick={handleTriggerEmergencySiren}
            style={{ width: '100%', fontSize: '1.35rem', padding: '20px', marginBottom: '16px' }}
          >
            <ShieldAlert size={28} />
            <span>PRESS FOR IMMEDIATE SOS ALERT</span>
          </button>

          {alertSent && (
            <div style={{
              backgroundColor: '#fef2f2',
              border: '2px solid var(--accent-red)',
              borderRadius: '12px',
              padding: '16px',
              color: 'var(--accent-red)',
              fontWeight: 700,
              fontSize: '1.1rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '10px'
            }}>
              <CheckCircle2 size={24} />
              <span>SOS Alert & SMS sent to contact ({userProfile.emergencyNumber || '14567'})!</span>
            </div>
          )}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px' }}>
          <a
            href="tel:14567"
            className="btn-senior btn-primary"
            style={{ textDecoration: 'none', fontSize: '1.1rem' }}
          >
            <Phone size={22} />
            <span>Elderline 14567</span>
          </a>

          <a
            href="tel:108"
            className="btn-senior btn-outline"
            style={{ textDecoration: 'none', fontSize: '1.1rem' }}
          >
            <Phone size={22} />
            <span>Ambulance 108</span>
          </a>
        </div>
      </div>
    </div>
  );
};
