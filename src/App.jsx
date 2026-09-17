import React, { useState } from 'react';
import { LanguageProvider, useLanguage } from './context/LanguageContext';
import { UserProvider, useUser } from './context/UserContext';

import { Onboarding } from './components/Onboarding';
import { Header } from './components/Header';
import { VoiceAssistantModal } from './components/VoiceAssistantModal';
import { EmergencySOSModal } from './components/EmergencySOSModal';

import { PensionSection } from './components/PensionSection';
import { GovtServicesSection } from './components/GovtServicesSection';
import { DocumentHelperSection } from './components/DocumentHelperSection';
import { ScamProtectionSection } from './components/ScamProtectionSection';
import { RemindersSection } from './components/RemindersSection';
import { HealthTrackerSection } from './components/HealthTrackerSection';
import { DevotionalWellnessSection } from './components/DevotionalWellnessSection';
import { FamilyAssistanceSection } from './components/FamilyAssistanceSection';

import { Mic, Volume2, Landmark, Building2, HelpCircle, ShieldAlert, BellRing, Activity, Radio, Users } from 'lucide-react';
import './styles/index.css';

const MainDashboard = () => {
  const { currentLang, t, speakText, isSpeaking, stopSpeech } = useLanguage();
  const { userProfile } = useUser();

  const [activeTab, setActiveTab] = useState('pension');
  const [isVoiceOpen, setIsVoiceOpen] = useState(false);
  const [isEmergencyOpen, setIsEmergencyOpen] = useState(false);

  const tabs = [
    { id: 'pension', labelKey: 'navPension', icon: <Landmark size={22} />, component: <PensionSection /> },
    { id: 'govt', labelKey: 'navGovt', icon: <Building2 size={22} />, component: <GovtServicesSection /> },
    { id: 'doc', labelKey: 'navDocHelper', icon: <HelpCircle size={22} />, component: <DocumentHelperSection /> },
    { id: 'scam', labelKey: 'navScam', icon: <ShieldAlert size={22} />, component: <ScamProtectionSection /> },
    { id: 'reminders', labelKey: 'navReminders', icon: <BellRing size={22} />, component: <RemindersSection /> },
    { id: 'health', labelKey: 'navHealth', icon: <Activity size={22} />, component: <HealthTrackerSection /> },
    { id: 'wellness', labelKey: 'navWellness', icon: <Radio size={22} />, component: <DevotionalWellnessSection /> },
    { id: 'family', labelKey: 'navFamily', icon: <Users size={22} />, component: <FamilyAssistanceSection /> }
  ];

  return (
    <div className="app-container">
      <Header
        onOpenEmergency={() => setIsEmergencyOpen(true)}
        onOpenVoiceModal={() => setIsVoiceOpen(true)}
      />

      {/* Main Greeting Banner */}
      <div className="senior-card" style={{
        background: 'linear-gradient(135deg, var(--primary) 0%, #1e40af 100%)',
        color: '#ffffff',
        textAlign: 'center',
        padding: '32px 20px',
        border: 'none',
        boxShadow: 'var(--shadow-lg)'
      }}>
        <h2 style={{ fontSize: '2.1rem', fontWeight: 800, marginBottom: '12px' }}>
          {t('greeting')}
        </h2>
        <p style={{ fontSize: '1.25rem', opacity: 0.95, marginBottom: '24px' }}>
          {userProfile.name ? `Welcome, ${userProfile.name}!` : ''}
        </p>

        <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', flexWrap: 'wrap' }}>
          <button
            className="btn-senior"
            onClick={() => setIsVoiceOpen(true)}
            style={{
              backgroundColor: '#ffffff',
              color: 'var(--primary)',
              fontSize: '1.35rem',
              padding: '16px 32px',
              fontWeight: 800
            }}
          >
            <Mic size={28} color="var(--primary)" />
            <span>{t('speakBtn')}</span>
          </button>

          <button
            className="btn-read-aloud"
            onClick={() => speakText(t('greeting'))}
            style={{ padding: '12px 20px', fontSize: '1.1rem' }}
          >
            <Volume2 size={22} />
            <span>{t('readAloud')}</span>
          </button>
        </div>
      </div>

      {/* Main Navigation Tabs */}
      <div style={{
        display: 'flex',
        gap: '10px',
        overflowX: 'auto',
        paddingBottom: '12px',
        marginBottom: '20px',
        scrollbarWidth: 'thin'
      }}>
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              className={`btn-senior ${isActive ? 'btn-primary' : 'btn-outline'}`}
              onClick={() => {
                setActiveTab(tab.id);
                speakText(t(tab.labelKey));
              }}
              style={{
                flexShrink: 0,
                fontSize: '1.1rem',
                minHeight: '48px',
                padding: '10px 20px'
              }}
            >
              {tab.icon}
              <span>{t(tab.labelKey)}</span>
            </button>
          );
        })}
      </div>

      {/* Active Feature Component */}
      <div>
        {tabs.find(t => t.id === activeTab)?.component}
      </div>

      {/* Modals */}
      <VoiceAssistantModal
        isOpen={isVoiceOpen}
        onClose={() => setIsVoiceOpen(false)}
      />

      <EmergencySOSModal
        isOpen={isEmergencyOpen}
        onClose={() => setIsEmergencyOpen(false)}
      />
    </div>
  );
};

export const AppContent = () => {
  const { userProfile } = useUser();
  return userProfile.isRegistered ? <MainDashboard /> : <Onboarding />;
};

export default function App() {
  return (
    <UserProvider>
      <LanguageProvider>
        <AppContent />
      </LanguageProvider>
    </UserProvider>
  );
}
