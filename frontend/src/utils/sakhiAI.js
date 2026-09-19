export function getSakhiAIResponse(input = '', context = {}) {
  const text = input.toLowerCase();

  if (text.includes('member') || text.includes('सदस्य')) {
    return {
      message: `Sakhi AI: To add a new member, first enter the name, phone, and savings details. There are currently ${context.members ?? 0} members.`,
      action: 'add-member'
    };
  }

  if (text.includes('loan') || text.includes('ऋण')) {
    return {
      message: `Sakhi AI: Review loan recovery status. There are ${context.activeLoans ?? 0} active loans and ${context.overdueLoans ?? 0} overdue loans.`,
      action: 'review-loans'
    };
  }

  if (text.includes('saving') || text.includes('बचत')) {
    return {
      message: `Sakhi AI: Update the deposit details and review today’s collection list.`,
      action: 'review-savings'
    };
  }

  return {
    message: 'Sakhi AI: I can help with your SHG operations. Add a member, review loans, or update savings.',
    action: 'help'
  };
}
