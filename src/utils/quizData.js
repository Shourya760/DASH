/** Placeholder quiz — very simple language for awareness */

export const quizQuestions = [
  {
    id: 'q1',
    question: {
      en: 'What is the minimum age to vote in most countries?',
      hi: 'अधिकांश देशों में मतदान की न्यूनतम आयु क्या होती है?',
    },
    options: [
      { key: 'a', en: '16 years', hi: '16 वर्ष' },
      { key: 'b', en: '18 years', hi: '18 वर्ष' },
      { key: 'c', en: '21 years', hi: '21 वर्ष' },
    ],
    correct: 'b',
  },
  {
    id: 'q2',
    question: {
      en: 'What does NOTA mean on the ballot?',
      hi: 'मतपत्र पर NOTA का क्या मतलब है?',
    },
    options: [
      { key: 'a', en: 'None of the above', hi: 'इनमें से कोई नहीं' },
      { key: 'b', en: 'New party', hi: 'नई पार्टी' },
      { key: 'c', en: 'Postal vote', hi: 'डाक मत' },
    ],
    correct: 'a',
  },
  {
    id: 'q3',
    question: {
      en: 'After voting, what mark do you usually get?',
      hi: 'मतदान के बाद आमतौर पर क्या निशान मिलता है?',
    },
    options: [
      { key: 'a', en: 'Ink mark on finger', hi: 'उँगली पर स्याही' },
      { key: 'b', en: 'Stamp on paper', hi: 'कागज़ पर मुहर' },
      { key: 'c', en: 'SMS code', hi: 'SMS कोड' },
    ],
    correct: 'a',
  },
  {
    id: 'q4',
    question: {
      en: 'Who usually manages elections?',
      hi: 'आमतौर पर चुनाव कौन प्रबंधित करता है?',
    },
    options: [
      { key: 'a', en: 'National election authority', hi: 'राष्ट्रीय चुनाव प्राधिकरण' },
      { key: 'b', en: 'State police only', hi: 'केवल राज्य पुलिस' },
      { key: 'c', en: 'District clubs', hi: 'ज़िला क्लब' },
    ],
    correct: 'a',
  },
]
