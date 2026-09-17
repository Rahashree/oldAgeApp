export const SUPPORTED_LANGUAGES = [
  {
    code: 'kn',
    name: 'ಕನ್ನಡ',
    englishName: 'Kannada',
    locale: 'kn-IN',
    greeting: 'ನಮಸ್ಕಾರ!',
    dir: 'ltr',
    sample: 'ಪಿಂಚಣಿ ಮತ್ತು ಸರ್ಕಾರಿ ಸೇವೆಗಳ ಸಹಾಯ'
  },
  {
    code: 'hi',
    name: 'हिन्दी',
    englishName: 'Hindi',
    locale: 'hi-IN',
    greeting: 'नमस्ते!',
    dir: 'ltr',
    sample: 'पेंशन और सरकारी सेवाओं में सहायता'
  },
  {
    code: 'ml',
    name: 'മലയാളം',
    englishName: 'Malayalam',
    locale: 'ml-IN',
    greeting: 'നമസ്കാരം!',
    dir: 'ltr',
    sample: 'പെൻഷൻ, സർക്കാർ സേവനങ്ങൾ'
  },
  {
    code: 'ta',
    name: 'தமிழ்',
    englishName: 'Tamil',
    locale: 'ta-IN',
    greeting: 'வணக்கம்!',
    dir: 'ltr',
    sample: 'ஓய்வூதியம் மற்றும் அரசு சேவைகள்'
  },
  {
    code: 'te',
    name: 'తెలుగు',
    englishName: 'Telugu',
    locale: 'te-IN',
    greeting: 'నమస్కారం!',
    dir: 'ltr',
    sample: 'పెన్షన్ మరియు ప్రభుత్వ సేవలు'
  },
  {
    code: 'mr',
    name: 'मराठी',
    englishName: 'Marathi',
    locale: 'mr-IN',
    greeting: 'नमस्कार!',
    dir: 'ltr',
    sample: 'पेन्शन आणि शासकीय सेवा मदत'
  },
  {
    code: 'bn',
    name: 'বাংলা',
    englishName: 'Bengali',
    locale: 'bn-IN',
    greeting: 'নমস্কার!',
    dir: 'ltr',
    sample: 'পেনশন ও সরকারি সাহায্য'
  },
  {
    code: 'gu',
    name: 'ગુજરાતી',
    englishName: 'Gujarati',
    locale: 'gu-IN',
    greeting: 'નમસ્તે!',
    dir: 'ltr',
    sample: 'પેન્શન અને સરકારી સેવાઓ'
  },
  {
    code: 'pa',
    name: 'ਪੰਜਾਬੀ',
    englishName: 'Punjabi',
    locale: 'pa-IN',
    greeting: 'ਸਤਿ ਸ਼੍ਰੀ ਅਕਾਲ!',
    dir: 'ltr',
    sample: 'ਪੈਨਸ਼ਨ ਅਤੇ ਸਰਕਾਰੀ ਸੇਵਾਵਾਂ'
  },
  {
    code: 'or',
    name: 'ଓଡ଼ିଆ',
    englishName: 'Odia',
    locale: 'or-IN',
    greeting: 'ନମସ୍କାର!',
    dir: 'ltr',
    sample: 'ପେନସନ ଏବଂ ସରକାରୀ ସେବା'
  },
  {
    code: 'ur',
    name: 'اردو',
    englishName: 'Urdu',
    locale: 'ur-IN',
    greeting: 'آداب!',
    dir: 'rtl',
    sample: 'پنشن اور سرکاری خدمات'
  },
  {
    code: 'en',
    name: 'English',
    englishName: 'English',
    locale: 'en-IN',
    greeting: 'Welcome!',
    dir: 'ltr',
    sample: 'Pension & Government Services Helper'
  }
];

export const getLanguageByCode = (code) => {
  return SUPPORTED_LANGUAGES.find(l => l.code === code) || SUPPORTED_LANGUAGES[0];
};
