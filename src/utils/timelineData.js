/** Sample timeline — replace dates with real local election data via API later */

export const timelineEvents = [
  {
    id: '1',
    date: '2026-01-01 — 2026-02-15',
    title: {
      en: 'Voter registration window',
      hi: 'मतदाता पंजीकरण अवधि',
    },
    desc: {
      en: 'Period to apply or update voter details (illustrative).',
      hi: 'मतदाता विवरण के लिए आवेदन या अद्यतन की अवधि (नमूना)।',
    },
  },
  {
    id: '2',
    date: '2026-03-01 — 2026-03-10',
    title: {
      en: 'Nomination period',
      hi: 'नामांकन अवधि',
    },
    desc: {
      en: 'Candidates file papers (illustrative).',
      hi: 'उम्मीदवार नामांकन दाखिल करते हैं (नमूना)।',
    },
  },
  {
    id: '3',
    date: '2026-03-11 — 2026-04-05',
    title: {
      en: 'Campaign period',
      hi: 'प्रचार अवधि',
    },
    desc: {
      en: 'Public meetings and outreach (illustrative).',
      hi: 'जनसभाएँ और जनसंपर्क (नमूना)।',
    },
  },
  {
    id: '4',
    date: '2026-04-10',
    title: {
      en: 'Polling day',
      hi: 'मतदान दिवस',
    },
    desc: {
      en: 'Vote at your assigned booth (illustrative).',
      hi: 'अपने निर्धारित केंद्र पर मतदान करें (नमूना)।',
    },
  },
  {
    id: '5',
    date: '2026-04-12',
    title: {
      en: 'Counting & results',
      hi: 'गिनती और परिणाम',
    },
    desc: {
      en: 'Results as per official schedule (illustrative).',
      hi: 'आधिकारिक कार्यक्रम के अनुसार परिणाम (नमूना)।',
    },
  },
]

/** Demo “polling moment” for countdown */
export const DEMO_POLL_DATE = new Date('2026-04-10T07:00:00')
