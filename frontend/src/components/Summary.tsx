import React from 'react';
import type { Expense } from '../api';

type Props = {
  expenses: Expense[];
};

export const Summary: React.FC<Props> = ({ expenses }) => {
  const total = expenses.reduce((sum, exp) => sum + exp.amount, 0);

  return (
    <div className="glass-panel summary-panel" style={{ 
      padding: '1.5rem 2rem', 
      display: 'flex', 
      justifyContent: 'space-between',
      alignItems: 'center',
      background: 'linear-gradient(135deg, var(--primary-color) 0%, var(--primary-hover) 100%)',
      color: 'white',
      border: 'none',
      marginBottom: '1rem'
    }}>
      <div>
        <h3 style={{ fontSize: '0.85rem', opacity: 0.9, textTransform: 'uppercase', letterSpacing: '1px' }}>
          Total Filtered Expenses
        </h3>
        <p style={{ fontSize: '2.5rem', fontWeight: 700, margin: '0.2rem 0 0 0' }}>
          ₹{(total / 100).toFixed(2)}
        </p>
      </div>
    </div>
  );
};
