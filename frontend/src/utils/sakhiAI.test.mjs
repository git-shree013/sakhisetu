import test from 'node:test';
import assert from 'node:assert/strict';
import { getSakhiAIResponse } from './sakhiAI.js';

test('returns a member guidance reply for add-member requests', () => {
  const reply = getSakhiAIResponse('add member', { members: 12, activeLoans: 4 });
  assert.match(reply.message, /सदस्य/i);
  assert.match(reply.message, /जोड़/i);
});

test('returns a loan recovery reply for overdue questions', () => {
  const reply = getSakhiAIResponse('loan overdue', { activeLoans: 4, overdueLoans: 1 });
  assert.match(reply.message, /ऋण/i);
  assert.match(reply.message, /वसूली/i);
  assert.equal(reply.action, 'review-loans');
});
