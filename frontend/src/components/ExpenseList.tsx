import React from 'react';
import type { Expense } from '../api';

type Props = {
  expenses: Expense[];
  isLoading: boolean;
};

export const ExpenseList: React.FC<Props> = ({ expenses = [], isLoading }) => {
  if (isLoading) {
    return (
      <div className="glass-panel" style={{ padding: '2rem', textAlign: 'center' }}>
        <p style={{ color: 'var(--text-secondary)' }}>Loading expenses...</p>
      </div>
    );
  }

  if (expenses.length === 0) {
    return (
      <div className="glass-panel" style={{ padding: '3rem 2rem', textAlign: 'center' }}>
        <h3 style={{ marginBottom: '0.5rem', color: 'var(--text-primary)' }}>No Expenses Found</h3>
        <p style={{ color: 'var(--text-secondary)' }}>Add an expense to get started.</p>
      </div>
    );
  }

  return (
    <div className="glass-panel" style={{ overflow: 'hidden' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
        <thead style={{ background: 'var(--surface-hover)', borderBottom: '1px solid var(--border-color)' }}>
          <tr>
            <th style={{ padding: '1rem', color: 'var(--text-secondary)', fontWeight: 600, fontSize: '0.85rem' }}>Date</th>
            <th style={{ padding: '1rem', color: 'var(--text-secondary)', fontWeight: 600, fontSize: '0.85rem' }}>Category</th>
            <th style={{ padding: '1rem', color: 'var(--text-secondary)', fontWeight: 600, fontSize: '0.85rem' }}>Description</th>
            <th style={{ padding: '1rem', color: 'var(--text-secondary)', fontWeight: 600, fontSize: '0.85rem', textAlign: 'right' }}>Amount</th>
          </tr>
        </thead>
        <tbody>
          {expenses.map((expense) => (
            <tr key={expense.id} style={{ borderBottom: '1px solid var(--border-color)' }}>
              <td style={{ padding: '1rem', fontSize: '0.95rem' }}>{expense.date}</td>
              <td style={{ padding: '1rem' }}>
                <span style={{ 
                  background: 'var(--bg-color)', 
                  border: '1px solid var(--border-color)',
                  padding: '0.25rem 0.75rem', 
                  borderRadius: '999px',
                  fontSize: '0.85rem'
                }}>
                  {expense.category}
                </span>
              </td>
              <td style={{ padding: '1rem', color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
                {expense.description || '-'}
              </td>
              <td style={{ padding: '1rem', textAlign: 'right', fontWeight: 600 }}>
                ₹{(expense.amount / 100).toFixed(2)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
