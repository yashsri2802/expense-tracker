import React from 'react';
import type { Expense } from '../api';
import { Inbox, Loader2, Calendar, FileText, ChevronRight } from 'lucide-react';

type Props = {
  expenses: Expense[];
  isLoading: boolean;
};

const CATEGORY_STYLES: Record<string, { bg: string, text: string, border: string }> = {
  Groceries: { bg: 'rgba(16, 185, 129, 0.08)', text: 'var(--success-color)', border: 'rgba(16, 185, 129, 0.2)' },
  Housing: { bg: 'rgba(99, 102, 241, 0.08)', text: 'var(--primary-color)', border: 'rgba(99, 102, 241, 0.2)' },
  Entertainment: { bg: 'rgba(244, 63, 94, 0.08)', text: 'var(--danger-color)', border: 'rgba(244, 63, 94, 0.2)' },
  Utilities: { bg: 'rgba(245, 158, 11, 0.08)', text: 'var(--warning-color)', border: 'rgba(245, 158, 11, 0.2)' },
  Transportation: { bg: 'rgba(14, 165, 233, 0.08)', text: '#0ea5e9', border: 'rgba(14, 165, 233, 0.2)' },
  Food: { bg: 'rgba(139, 92, 246, 0.08)', text: 'var(--accent-color)', border: 'rgba(139, 92, 246, 0.2)' },
  Other: { bg: 'rgba(100, 116, 139, 0.08)', text: 'var(--text-secondary)', border: 'rgba(100, 116, 139, 0.2)' }
};

export const ExpenseList: React.FC<Props> = ({ expenses = [], isLoading }) => {
  // Date Formatter Helper
  const formatDate = (dateStr: string) => {
    try {
      const [year, month, day] = dateStr.split('-');
      if (!year || !month || !day) return dateStr;
      
      const date = new Date(Number(year), Number(month) - 1, Number(day));
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });
    } catch {
      return dateStr;
    }
  };

  if (isLoading) {
    return (
      <div className="glass-panel" style={{ 
        padding: '4rem 2rem', 
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '1rem',
        animationDelay: '0.3s'
      }}>
        <Loader2 size={36} className="spinner" style={{ 
          color: 'var(--primary-color)',
          animation: 'spin 1.2s linear infinite'
        }} />
        <p style={{ color: 'var(--text-secondary)', fontWeight: 600 }}>Syncing ledger database...</p>
        <style>{`
          @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }

  if (expenses.length === 0) {
    return (
      <div className="glass-panel" style={{ 
        padding: '5rem 2rem', 
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '1.25rem',
        animationDelay: '0.3s'
      }}>
        <div style={{
          background: 'var(--surface-hover)',
          border: '1px solid var(--border-color)',
          padding: '1.25rem',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'var(--text-secondary)'
        }}>
          <Inbox size={40} strokeWidth={1.5} />
        </div>
        <div>
          <h3 style={{ marginBottom: '0.4rem', color: 'var(--text-primary)', fontSize: '1.25rem' }}>No Ledger Entries</h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', fontWeight: 500, maxWidth: '320px', margin: '0 auto' }}>
            There are no expenses in this category. Input a transaction above to get started.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="glass-panel" style={{ 
      overflow: 'hidden', 
      padding: 0,
      animationDelay: '0.3s'
    }}>
      <div className="modern-table-container" style={{ border: 'none' }}>
        <table className="modern-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Category</th>
              <th>Description</th>
              <th style={{ textAlign: 'right' }}>Amount</th>
            </tr>
          </thead>
          <tbody>
            {expenses.map((expense) => {
              const catStyle = CATEGORY_STYLES[expense.category] || CATEGORY_STYLES.Other;
              return (
                <tr key={expense.id}>
                  <td style={{ fontWeight: 600, color: 'var(--text-primary)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <Calendar size={14} color="var(--text-secondary)" style={{ opacity: 0.7 }} />
                      <span>{formatDate(expense.date)}</span>
                    </div>
                  </td>
                  <td>
                    <span 
                      className="category-badge"
                      style={{ 
                        background: catStyle.bg,
                        color: catStyle.text,
                        borderColor: catStyle.border,
                        borderWidth: '1px'
                      }}
                    >
                      {expense.category}
                    </span>
                  </td>
                  <td style={{ color: 'var(--text-secondary)', fontWeight: 500 }}>
                    {expense.description ? (
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <FileText size={14} style={{ opacity: 0.5 }} />
                        <span>{expense.description}</span>
                      </div>
                    ) : (
                      <span style={{ opacity: 0.3 }}>—</span>
                    )}
                  </td>
                  <td style={{ 
                    textAlign: 'right', 
                    fontWeight: 800, 
                    fontSize: '1.05rem',
                    color: 'var(--text-primary)',
                    letterSpacing: '-0.02em'
                  }}>
                    <span style={{ color: 'var(--text-secondary)', marginRight: '0.15rem', fontWeight: 500, fontSize: '0.85rem' }}>₹</span>
                    {(expense.amount / 100).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
