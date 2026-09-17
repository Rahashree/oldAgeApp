import React, { createContext, useContext, useState } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userProfile, setUserProfile] = useState(() => {
    const saved = localStorage.getItem('senior_user_profile');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        // fallback
      }
    }
    return {
      isRegistered: false,
      name: '',
      ageGroup: '65-75',
      emergencyNumber: '14567',
      familyHelperLang: 'en'
    };
  });

  const saveProfile = (newProfile) => {
    const updated = { ...userProfile, ...newProfile, isRegistered: true };
    setUserProfile(updated);
    localStorage.setItem('senior_user_profile', JSON.stringify(updated));
  };

  const resetProfile = () => {
    setUserProfile({
      isRegistered: false,
      name: '',
      ageGroup: '65-75',
      emergencyNumber: '14567',
      familyHelperLang: 'en'
    });
    localStorage.removeItem('senior_user_profile');
  };

  return (
    <UserContext.Provider value={{ userProfile, saveProfile, resetProfile }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
