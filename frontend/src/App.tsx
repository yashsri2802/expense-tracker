import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchExpenses, createExpense } from './api';
import type { CreateExpensePayload } from './api';
import { Layout } from './components/Layout';
import { ExpenseList } from './components/ExpenseList';
import { ExpenseForm } from './components/ExpenseForm';
import { Filters } from './components/Filters';
import { Summary } from './components/Summary';

function App() {
  const queryClient = useQueryClient();
  const [category, setCategory] = useState<string>('All');
  const [sort, setSort] = useState<string>('date_desc');

  const { data: expenses = [], isLoading, isError } = useQuery({
    queryKey: ['expenses', category, sort],
    queryFn: () => fetchExpenses(category, sort)
  });

  const mutation = useMutation({
    mutationFn: (newExpense: CreateExpensePayload) => createExpense(newExpense),
    onSuccess: () => {
      // Invalidate and refetch expenses data
      queryClient.invalidateQueries({ queryKey: ['expenses'] });
    },
  });

  return (
    <Layout>
      {isError && (
        <div style={{ background: 'var(--danger-color)', padding: '1rem', color: 'white', borderRadius: '8px', marginBottom: '1rem' }}>
          Failed to load expenses. Please check if the backend server is running.
        </div>
      )}
      
      {mutation.isError && (
        <div style={{ background: 'var(--danger-color)', padding: '1rem', color: 'white', borderRadius: '8px', marginBottom: '1rem' }}>
          Failed to add expense. Please try again.
        </div>
      )}

      <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        <ExpenseForm 
          onSubmit={(payload) => mutation.mutate(payload)} 
          isLoading={mutation.isPending} 
        />
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <Summary expenses={expenses} />
          <Filters 
            category={category} 
            setCategory={setCategory} 
            sort={sort} 
            setSort={setSort} 
          />
          <ExpenseList expenses={expenses} isLoading={isLoading} />
        </div>
      </div>
    </Layout>
  );
}

export default App;
