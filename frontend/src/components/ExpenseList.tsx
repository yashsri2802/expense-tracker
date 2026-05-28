import React from 'react';
import type { Expense } from '../api';
import { 
  Inbox, 
  Loader2, 
  Calendar, 
  FileText, 
  Edit3, 
  Trash2,
  ShoppingBag,
  Home,
  Film,
  Zap,
  Car,
  Utensils,
  Coins 
} from 'lucide-react';

const CATEGORY_ICONS: Record<string, React.FC<{ size?: number; color?: string; className?: string }>> = {
  Groceries: ShoppingBag,
  Housing: Home,
  Entertainment: Film,
  Utilities: Zap,
  Transportation: Car,
  Food: Utensils,
  Other: Coins
};

type Props = {
  expenses: Expense[];
  isLoading: boolean;
  onEditExpense: (expense: Expense) => void;
  onDeleteExpense: (id: number) => void;
  editingId?: number;
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

export const ExpenseList: React.FC<Props> = ({ 
  expenses = [], 
  isLoading, 
  onEditExpense, 
  onDeleteExpense,
  editingId
}) => {
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
      {/* Desktop Ledger - Tabular view */}
      <div className="modern-table-container hide-on-mobile" style={{ border: 'none' }}>
        <table className="modern-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Category</th>
              <th>Description</th>
              <th style={{ textAlign: 'right' }}>Amount</th>
              <th style={{ textAlign: 'center', width: '120px' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {expenses.map((expense) => {
              const catStyle = CATEGORY_STYLES[expense.category] || CATEGORY_STYLES.Other;
              const isEditing = editingId === expense.id;
              
              return (
                <tr 
                  key={expense.id} 
                  style={{
                    backgroundColor: isEditing ? 'rgba(99, 102, 241, 0.04)' : 'transparent',
                    borderLeft: isEditing ? '3px solid var(--primary-color)' : 'none'
                  }}
                >
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
                  <td style={{ textAlign: 'center' }}>
                    <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', alignItems: 'center' }}>
                      {/* Edit Button */}
                      <button
                        onClick={() => onEditExpense(expense)}
                        title="Edit Expense"
                        style={{
                          color: isEditing ? 'var(--primary-color)' : 'var(--text-secondary)',
                          transition: 'all 0.2s',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          padding: '0.45rem',
                          borderRadius: '8px',
                          border: '1px solid transparent',
                          background: isEditing ? 'rgba(99, 102, 241, 0.08)' : 'transparent',
                          borderColor: isEditing ? 'rgba(99, 102, 241, 0.15)' : 'transparent',
                          cursor: 'pointer'
                        }}
                        onMouseOver={(e) => {
                          if (!isEditing) {
                            e.currentTarget.style.color = 'var(--primary-color)';
                            e.currentTarget.style.background = 'var(--surface-hover)';
                          }
                        }}
                        onMouseOut={(e) => {
                          if (!isEditing) {
                            e.currentTarget.style.color = 'var(--text-secondary)';
                            e.currentTarget.style.background = 'transparent';
                          }
                        }}
                      >
                        <Edit3 size={15} />
                      </button>

                      {/* Delete Button */}
                      <button
                        onClick={() => onDeleteExpense(expense.id)}
                        title="Delete Expense"
                        style={{
                          color: 'var(--text-secondary)',
                          transition: 'all 0.2s',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          padding: '0.45rem',
                          borderRadius: '8px',
                          border: '1px solid transparent',
                          background: 'transparent',
                          cursor: 'pointer'
                        }}
                        onMouseOver={(e) => {
                          e.currentTarget.style.color = 'var(--danger-color)';
                          e.currentTarget.style.background = 'rgba(244, 63, 94, 0.08)';
                          e.currentTarget.style.borderColor = 'rgba(244, 63, 94, 0.15)';
                        }}
                        onMouseOut={(e) => {
                          e.currentTarget.style.color = 'var(--text-secondary)';
                          e.currentTarget.style.background = 'transparent';
                          e.currentTarget.style.borderColor = 'transparent';
                        }}
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Mobile-optimized Card Ledger View */}
      <div className="mobile-ledger-list show-on-mobile" style={{ padding: '1rem' }}>
        {expenses.map((expense) => {
          const catStyle = CATEGORY_STYLES[expense.category] || CATEGORY_STYLES.Other;
          const CategoryIcon = CATEGORY_ICONS[expense.category] || CATEGORY_ICONS.Other;
          const isEditing = editingId === expense.id;
          
          return (
            <div 
              key={expense.id} 
              className="mobile-ledger-item"
              style={{
                borderColor: isEditing ? 'var(--primary-color)' : 'var(--border-color)',
                borderLeftWidth: isEditing ? '4px' : '1px',
                borderLeftStyle: 'solid'
              }}
            >
              <div className="mobile-ledger-item-main">
                {/* Category Visual Icon */}
                <div 
                  className="mobile-category-icon-wrapper"
                  style={{
                    background: catStyle.bg,
                    color: catStyle.text,
                    border: `1px solid ${catStyle.border}`
                  }}
                >
                  <CategoryIcon size={18} />
                </div>
                
                {/* Details */}
                <div className="mobile-ledger-details">
                  <div className="mobile-category-title">{expense.category}</div>
                  {expense.description ? (
                    <div className="mobile-description">{expense.description}</div>
                  ) : (
                    <div className="mobile-description" style={{ opacity: 0.35 }}>No description</div>
                  )}
                </div>
                
                {/* Meta details */}
                <div className="mobile-ledger-meta">
                  <div className="mobile-amount">
                    <span style={{ fontSize: '0.8rem', fontWeight: 500, color: 'var(--text-secondary)', marginRight: '0.1rem' }}>₹</span>
                    {(expense.amount / 100).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </div>
                  <div className="mobile-date">{formatDate(expense.date)}</div>
                </div>
              </div>
              
              {/* Quick Actions Row */}
              <div className="mobile-actions-row">
                <button
                  onClick={() => onEditExpense(expense)}
                  className="mobile-action-btn"
                  title="Edit Expense"
                  style={{
                    color: isEditing ? 'var(--primary-color)' : 'var(--text-secondary)',
                    borderColor: isEditing ? 'rgba(99, 102, 241, 0.3)' : 'var(--border-color)',
                    background: isEditing ? 'rgba(99, 102, 241, 0.04)' : 'transparent'
                  }}
                >
                  <Edit3 size={13} />
                  <span>{isEditing ? 'Editing' : 'Edit'}</span>
                </button>
                
                <button
                  onClick={() => onDeleteExpense(expense.id)}
                  className="mobile-action-btn delete"
                  title="Delete Expense"
                >
                  <Trash2 size={13} />
                  <span>Delete</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
