export function getSakhiAIResponse(input = '', context = {}) {
  const text = input.toLowerCase();

  if (text.includes('member') || text.includes('सदस्य')) {
    return {
      message: `सखी AI: नए सदस्य को जोड़ने के लिए पहले नाम, फोन और बचत जानकारी दर्ज करें। वर्तमान में ${context.members ?? 0} सदस्य हैं।`,
      action: 'add-member'
    };
  }

  if (text.includes('loan') || text.includes('ऋण')) {
    return {
      message: `सखी AI: ऋण की वसूली की जाँच करें। सक्रिय ऋण ${context.activeLoans ?? 0} हैं और अतिदेय ${context.overdueLoans ?? 0} हैं।`,
      action: 'review-loans'
    };
  }

  if (text.includes('saving') || text.includes('बचत')) {
    return {
      message: `सखी AI: बचत जमा की जानकारी को अपडेट करें और रोज़ की संग्रह सूची देखें।`,
      action: 'review-savings'
    };
  }

  return {
    message: 'सखी AI: मैं आपके SHG के लिए मदद कर सकता हूँ। सदस्य जोड़ें, ऋण देखें या बचत अपडेट करें।',
    action: 'help'
  };
}
