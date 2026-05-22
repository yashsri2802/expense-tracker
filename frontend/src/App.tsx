import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchExpenses, createExpense, updateExpense, deleteExpense } from './api';
import type { CreateExpensePayload, Expense } from './api';
import { Layout } from './components/Layout';
import { ExpenseList } from './components/ExpenseList';
import { ExpenseForm } from './components/ExpenseForm';
import { Filters } from './components/Filters';
import { Summary } from './components/Summary';

function App() {
  const queryClient = useQueryClient();
  const [category, setCategory] = useState<string>('All');
  const [sort, setSort] = useState<string>('date_desc');
  const [editingExpense, setEditingExpense] = useState<Expense | null>(null);

  const { data: expenses = [], isLoading, isError } = useQuery({
    queryKey: ['expenses', category, sort],
    queryFn: () => fetchExpenses(category, sort)
  });

  const createMutation = useMutation({
    mutationFn: (newExpense: CreateExpensePayload) => createExpense(newExpense),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['expenses'] });
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, payload }: { id: number; payload: CreateExpensePayload }) => updateExpense(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['expenses'] });
      setEditingExpense(null);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: number) => deleteExpense(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['expenses'] });
      if (editingExpense && editingExpense.id === id) {
        setEditingExpense(null);
      }
    },
  });

  const isMutating = createMutation.isPending || updateMutation.isPending || deleteMutation.isPending;

  return (
    <Layout>
      {isError && (
        <div style={{ 
          background: 'var(--danger-color)', 
          padding: '1rem 1.5rem', 
          color: 'white', 
          borderRadius: '14px', 
          marginBottom: '1.5rem',
          fontWeight: 600,
          boxShadow: '0 4px 12px rgba(244, 63, 94, 0.3)'
        }}>
          Failed to load expenses. Please check if the backend server is running.
        </div>
      )}
      
      {(createMutation.isError || updateMutation.isError || deleteMutation.isError) && (
        <div style={{ 
          background: 'var(--danger-color)', 
          padding: '1rem 1.5rem', 
          color: 'white', 
          borderRadius: '14px', 
          marginBottom: '1.5rem',
          fontWeight: 600,
          boxShadow: '0 4px 12px rgba(244, 63, 94, 0.3)'
        }}>
          Failed to save changes. Please verify database connection and try again.
        </div>
      )}

      <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        <ExpenseForm 
          onSubmit={(payload) => {
            if (editingExpense) {
              updateMutation.mutate({ id: editingExpense.id, payload });
            } else {
              createMutation.mutate(payload);
            }
          }} 
          isLoading={isMutating} 
          editingExpense={editingExpense}
          onCancelEdit={() => setEditingExpense(null)}
        />
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <Summary expenses={expenses} />
          <Filters 
            category={category} 
            setCategory={setCategory} 
            sort={sort} 
            setSort={setSort} 
          />
          <ExpenseList 
            expenses={expenses} 
            isLoading={isLoading} 
            onEditExpense={(expense) => {
              setEditingExpense(expense);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onDeleteExpense={(id) => {
              if (confirm('Are you sure you want to permanently delete this expense?')) {
                deleteMutation.mutate(id);
              }
            }}
            editingId={editingExpense?.id}
          />
        </div>
      </div>
    </Layout>
  );
}

export default App;
