import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Bell, Volume2, CheckCircle2, Sun, Moon, Sunrise, Plus } from 'lucide-react';

export const RemindersSection = () => {
  const { t, speakText } = useLanguage();

  const [pills, setPills] = useState([
    { id: 1, name: 'Blood Pressure Pill (Amlodipine)', slot: 'morning', taken: true },
    { id: 2, name: 'Diabetes Medicine (Metformin)', slot: 'morning', taken: false },
    { id: 3, name: 'Multivitamin', slot: 'afternoon', taken: false },
    { id: 4, name: 'Cholesterol Medicine (Atorvastatin)', slot: 'night', taken: false }
  ]);

  const toggleTaken = (id) => {
    setPills(pills.map(p => {
      if (p.id === id) {
        const nextTaken = !p.taken;
        if (nextTaken) speakText(`Great! You have taken ${p.name}.`);
        return { ...p, taken: nextTaken };
      }
      return p;
    }));
  };

  const slots = [
    { key: 'morning', titleKey: 'morningSlot', icon: <Sunrise size={24} color="#d97706" /> },
    { key: 'afternoon', titleKey: 'afternoonSlot', icon: <Sun size={24} color="#eab308" /> },
    { key: 'night', titleKey: 'nightSlot', icon: <Moon size={24} color="#3b82f6" /> }
  ];

  return (
    <div className="senior-card">
      <div className="senior-card-header">
        <div className="senior-card-icon">
          🔔
        </div>
        <div style={{ flex: 1 }}>
          <h2 style={{ fontSize: '1.8rem', fontWeight: 800 }}>
            {t('reminderTitle')}
          </h2>
          <p style={{ fontSize: '1.05rem', color: 'var(--text-muted)' }}>
            {t('reminderSub')}
          </p>
        </div>
        <button
          className="btn-read-aloud"
          onClick={() => speakText(`${t('reminderTitle')}. ${t('reminderSub')}`)}
        >
          <Volume2 size={18} />
          <span>{t('readAloud')}</span>
        </button>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {slots.map((s) => {
          const slotPills = pills.filter(p => p.slot === s.key);

          return (
            <div
              key={s.key}
              style={{
                border: '2px solid var(--border-color)',
                borderRadius: '16px',
                padding: '18px',
                backgroundColor: 'var(--bg-card)'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px', fontSize: '1.25rem', fontWeight: 800 }}>
                {s.icon}
                <span>{t(s.titleKey)}</span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {slotPills.map((pill) => (
                  <div
                    key={pill.id}
                    onClick={() => toggleTaken(pill.id)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '14px 18px',
                      borderRadius: '12px',
                      backgroundColor: pill.taken ? 'var(--primary-light)' : 'var(--bg-main)',
                      border: pill.taken ? '2px solid var(--accent-green)' : '2px solid var(--border-color)',
                      cursor: 'pointer'
                    }}
                  >
                    <span style={{ fontSize: '1.15rem', fontWeight: 700, textDecoration: pill.taken ? 'line-through' : 'none' }}>
                      💊 {pill.name}
                    </span>

                    <button
                      className={`btn-senior ${pill.taken ? 'btn-primary' : 'btn-outline'}`}
                      style={{ padding: '6px 16px', minHeight: '40px', fontSize: '0.95rem' }}
                    >
                      {pill.taken ? t('takenBtn') : t('notTakenBtn')}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
