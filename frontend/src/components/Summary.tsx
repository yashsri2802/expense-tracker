import React from 'react';
import type { Expense } from '../api';
import { TrendingUp, Calculator, AlertCircle, BarChart3, PieChart } from 'lucide-react';

type Props = {
  expenses: Expense[];
};

const CATEGORY_COLORS: Record<string, string> = {
  Groceries: '#10b981',       // Emerald
  Housing: '#6366f1',         // Indigo
  Entertainment: '#f43f5e',   // Rose
  Utilities: '#f59e0b',       // Amber
  Transportation: '#0ea5e9',   // Sky
  Food: '#8b5cf6',            // Violet
  Other: '#64748b'            // Slate
};

export const Summary: React.FC<Props> = ({ expenses = [] }) => {
  // Calculations
  const total = expenses.reduce((sum, exp) => sum + exp.amount, 0);
  const count = expenses.length;
  const avg = count > 0 ? total / count : 0;
  
  const maxAmount = count > 0 ? Math.max(...expenses.map(e => e.amount)) : 0;
  const maxExpense = expenses.find(e => e.amount === maxAmount);

  // Category mapping
  const categoryTotals: Record<string, number> = {};
  expenses.forEach(e => {
    categoryTotals[e.category] = (categoryTotals[e.category] || 0) + e.amount;
  });

  const sortedCategories = Object.entries(categoryTotals)
    .map(([category, amount]) => ({
      category,
      amount,
      percentage: total > 0 ? (amount / total) * 100 : 0
    }))
    .sort((a, b) => b.amount - a.amount);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* 3-Column Stats Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '1.5rem'
      }}>
        {/* Total Expenses Card */}
        <div className="glass-panel" style={{
          background: 'linear-gradient(135deg, var(--primary-color) 0%, var(--accent-color) 100%)',
          color: 'white',
          border: 'none',
          padding: '1.75rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          position: 'relative',
          overflow: 'hidden',
          animationDelay: '0.1s'
        }}>
          {/* Subtle design element */}
          <div style={{
            position: 'absolute',
            right: '-10%',
            bottom: '-10%',
            opacity: 0.15,
            color: 'white',
            transform: 'rotate(-15deg)'
          }}>
            <TrendingUp size={160} />
          </div>

          <div style={{ zIndex: 1 }}>
            <h3 style={{ 
              fontSize: '0.8rem', 
              fontWeight: 800, 
              color: 'rgba(255, 255, 255, 0.75)', 
              textTransform: 'uppercase', 
              letterSpacing: '0.08em',
              marginBottom: '0.4rem'
            }}>
              Total Expenses
            </h3>
            <p style={{ fontSize: '2.5rem', fontWeight: 800, letterSpacing: '-0.04em', color: '#ffffff' }}>
              ₹{(total / 100).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </p>
            <p style={{ fontSize: '0.85rem', color: 'rgba(255, 255, 255, 0.8)', marginTop: '0.4rem', fontWeight: 500 }}>
              Across {count} recorded transaction{count === 1 ? '' : 's'}
            </p>
          </div>

          <div style={{
            background: 'rgba(255, 255, 255, 0.15)',
            padding: '0.75rem',
            borderRadius: '12px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1
          }}>
            <TrendingUp size={24} color="white" />
          </div>
        </div>

        {/* Average Card */}
        <div className="glass-panel" style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          animationDelay: '0.2s'
        }}>
          <div>
            <h3 style={{ 
              fontSize: '0.8rem', 
              fontWeight: 800, 
              color: 'var(--text-secondary)', 
              textTransform: 'uppercase', 
              letterSpacing: '0.08em',
              marginBottom: '0.4rem'
            }}>
              Average Expense
            </h3>
            <p style={{ fontSize: '2.25rem', fontWeight: 800, letterSpacing: '-0.03em' }}>
              ₹{(avg / 100).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </p>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '0.4rem', fontWeight: 500 }}>
              Average cost per transaction
            </p>
          </div>

          <div style={{
            background: 'var(--surface-hover)',
            border: '1px solid var(--border-color)',
            padding: '0.75rem',
            borderRadius: '12px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <Calculator size={24} color="var(--primary-color)" />
          </div>
        </div>

        {/* Highest Single Expense Card */}
        <div className="glass-panel" style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          animationDelay: '0.3s'
        }}>
          <div>
            <h3 style={{ 
              fontSize: '0.8rem', 
              fontWeight: 800, 
              color: 'var(--text-secondary)', 
              textTransform: 'uppercase', 
              letterSpacing: '0.08em',
              marginBottom: '0.4rem'
            }}>
              Highest Single Expense
            </h3>
            <p style={{ fontSize: '2.25rem', fontWeight: 800, letterSpacing: '-0.03em' }}>
              ₹{(maxAmount / 100).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </p>
            {maxExpense ? (
              <p style={{ 
                fontSize: '0.85rem', 
                color: 'var(--text-secondary)', 
                marginTop: '0.4rem', 
                fontWeight: 500,
                display: 'flex',
                alignItems: 'center',
                gap: '0.35rem'
              }}>
                Category:{' '}
                <span style={{ 
                  color: CATEGORY_COLORS[maxExpense.category] || 'var(--text-primary)',
                  fontWeight: 700
                }}>
                  {maxExpense.category}
                </span>
              </p>
            ) : (
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '0.4rem', fontWeight: 500 }}>
                No expenses registered
              </p>
            )}
          </div>

          <div style={{
            background: 'var(--surface-hover)',
            border: '1px solid var(--border-color)',
            padding: '0.75rem',
            borderRadius: '12px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <AlertCircle size={24} color="var(--accent-color)" />
          </div>
        </div>
      </div>

      {/* Spending Analytics Progress Cards */}
      {count > 0 && (
        <div className="glass-panel" style={{
          animationDelay: '0.4s',
          display: 'flex',
          flexDirection: 'column',
          gap: '1.25rem'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <BarChart3 size={20} color="var(--primary-color)" />
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700 }}>Category Spend Distribution</h3>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '1.25rem'
          }}>
            {sortedCategories.map(({ category, amount, percentage }) => {
              const color = CATEGORY_COLORS[category] || '#64748b';
              return (
                <div key={category} style={{
                  background: 'var(--surface-color)',
                  border: '1px solid var(--border-color)',
                  padding: '1rem 1.25rem',
                  borderRadius: '14px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.6rem'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <span style={{ 
                        width: '8px', 
                        height: '8px', 
                        borderRadius: '50%', 
                        background: color 
                      }} />
                      <span style={{ fontWeight: 700, fontSize: '0.9rem' }}>{category}</span>
                    </div>
                    <span style={{ 
                      fontSize: '0.75rem', 
                      color: 'var(--text-secondary)',
                      fontWeight: 600,
                      background: 'var(--surface-hover)',
                      padding: '0.2rem 0.5rem',
                      borderRadius: '6px'
                    }}>
                      {percentage.toFixed(0)}%
                    </span>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', fontWeight: 500 }}>Total Spent</span>
                    <span style={{ fontWeight: 700, fontSize: '1.1rem', letterSpacing: '-0.02em' }}>
                      ₹{(amount / 100).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </span>
                  </div>

                  <div className="progress-track">
                    <div className="progress-fill" style={{
                      width: `${percentage}%`,
                      background: color
                    }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
