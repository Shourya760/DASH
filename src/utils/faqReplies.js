/** Keyword → predefined reply (EN + HI) for FAQ assistant demo */

export const faqKnowledge = [
  {
    keys: ['register', 'registration', 'enroll', 'नामांकन', 'पंजीकरण'],
    reply: {
      en: 'You can register as a voter when you are 18+. Use the official voter portal or visit the designated centre in your area. Keep your documents ready.',
      hi: '18+ होने पर आप मतदाता के रूप में पंजीकरण कर सकते हैं। आधिकारिक मतदाता पोर्टल का उपयोग करें या अपने क्षेत्र के निर्धारित केंद्र पर जाएँ। दस्तावेज़ तैयार रखें।',
    },
  },
  {
    keys: ['id', 'document', 'epic', 'आईडी', 'दस्तावेज़'],
    reply: {
      en: 'Carry an approved photo ID such as voter ID, national ID, passport, or other IDs listed by your election authority. Check the latest official list before election day.',
      hi: 'स्वीकृत फोटो आईडी लाएँ जैसे मतदाता पहचान पत्र, राष्ट्रीय पहचान पत्र, पासपोर्ट, या चुनाव प्राधिकरण सूची में अन्य। चुनाव से पहले नवीनतम आधिकारिक सूची देखें।',
    },
  },
  {
    keys: ['nota'],
    reply: {
      en: 'NOTA means “None of the above.” If you do not want to vote for any candidate, you can choose NOTA. It is a secret choice like other votes.',
      hi: 'NOTA का मतलब है “इनमें से कोई नहीं।” यदि आप किसी उम्मीदवार को वोट नहीं देना चाहते, NOTA चुन सकते हैं। यह अन्य वोटों की तरह गुप्त रहता है।',
    },
  },
  {
    keys: ['evm', 'machine', 'वोटिंग', 'ईवीएम'],
    reply: {
      en: 'An EVM is an electronic machine. You press the button next to your choice. VVPAT may show a paper slip for extra confidence. Ask the polling officer if you need help.',
      hi: 'EVM इलेक्ट्रॉनिक मशीन है। अपनी पसंद के बगल का बटन दबाएँ। VVPAT कागज़ी पर्ची दिखा सकता है। मदद चाहिए तो मतदान अधिकारी से पूछें।',
    },
  },
  {
    keys: ['booth', 'polling', 'where', 'केंद्र', 'बूथ'],
    reply: {
      en: 'Your polling booth is printed on your voter slip or available on the official voter services website. Go early and carry your ID.',
      hi: 'आपका मतदान केंद्र मतदाता पर्ची पर छपा होता है या आधिकारिक वेबसाइट पर मिलता है। जल्दी जाएँ और आईडी साथ लाएँ।',
    },
  },
]

export function findFaqReply(text, lang) {
  const lower = String(text).toLowerCase()
  for (const item of faqKnowledge) {
    if (item.keys.some((k) => lower.includes(k.toLowerCase()))) {
      return item.reply[lang] || item.reply.en
    }
  }
  return lang === 'hi'
    ? 'मुझे यह प्रश्न डेमो में नहीं मिला। कृपया आधिकारिक वेबसाइट देखें या ऊपर दिए प्रश्न चुनें।'
    : 'I could not match that in the demo. Please check the official voter portal or pick a question above.'
}
