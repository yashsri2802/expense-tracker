import React, { useEffect } from 'react';
import { AlertTriangle, X } from 'lucide-react';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  isLoading?: boolean;
};

export const ConfirmationModal: React.FC<Props> = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = 'Delete',
  cancelText = 'Cancel',
  isLoading = false
}) => {
  // Prevent background scrolling on the document when modal is active
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(15, 23, 42, 0.4)',
      backdropFilter: 'blur(8px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
      animation: 'modalFadeIn 0.25s ease-out'
    }}>
      <style>{`
        @keyframes modalFadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes modalScaleUp {
          from { transform: scale(0.96); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
      `}</style>
      
      <div className="glass-panel" style={{
        maxWidth: '440px',
        width: '90%',
        padding: '2rem',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25), var(--hover-shadow)',
        animation: 'modalScaleUp 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
        position: 'relative',
        border: '1px solid var(--border-color)'
      }}>
        {/* Close Button */}
        <button 
          onClick={onClose}
          disabled={isLoading}
          style={{
            position: 'absolute',
            top: '1.25rem',
            right: '1.25rem',
            background: 'none',
            border: 'none',
            color: 'var(--text-secondary)',
            cursor: 'pointer',
            padding: '0.25rem',
            borderRadius: '6px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'all 0.2s'
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.color = 'var(--text-primary)';
            e.currentTarget.style.background = 'var(--surface-hover)';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.color = 'var(--text-secondary)';
            e.currentTarget.style.background = 'none';
          }}
        >
          <X size={18} />
        </button>

        {/* Warning Icon & Content */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: '1.25rem' }}>
          <div style={{
            background: 'rgba(244, 63, 94, 0.08)',
            border: '1px solid rgba(244, 63, 94, 0.2)',
            padding: '1rem',
            borderRadius: '50%',
            color: 'var(--danger-color)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 8px 16px rgba(244, 63, 94, 0.1)'
          }}>
            <AlertTriangle size={32} />
          </div>

          <div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
              {title}
            </h3>
            <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', fontWeight: 500, lineHeight: 1.5 }}>
              {message}
            </p>
          </div>

          {/* Action Buttons */}
          <div style={{ display: 'flex', width: '100%', gap: '1rem', marginTop: '0.75rem' }}>
            <button
              onClick={onClose}
              disabled={isLoading}
              className="premium-btn"
              style={{
                flex: 1,
                background: 'transparent',
                border: '1px solid var(--border-color)',
                color: 'var(--text-secondary)',
                boxShadow: 'none',
                height: '46px'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.color = 'var(--text-primary)';
                e.currentTarget.style.borderColor = 'var(--text-secondary)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.color = 'var(--text-secondary)';
                e.currentTarget.style.borderColor = 'var(--border-color)';
              }}
            >
              {cancelText}
            </button>
            
            <button
              onClick={onConfirm}
              disabled={isLoading}
              className="premium-btn"
              style={{
                flex: 1,
                background: 'var(--danger-color)',
                color: 'white',
                border: 'none',
                height: '46px',
                boxShadow: '0 4px 12px rgba(244, 63, 94, 0.25)'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.background = '#e11d48'; // Rose red 600
                e.currentTarget.style.boxShadow = '0 6px 16px rgba(244, 63, 94, 0.35)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.background = 'var(--danger-color)';
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(244, 63, 94, 0.25)';
              }}
            >
              {isLoading ? 'Deleting...' : confirmText}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
