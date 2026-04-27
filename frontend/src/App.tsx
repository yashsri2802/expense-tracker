import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchExpenses, createExpense } from './api';
import type { CreateExpensePayload } from './api';
import { Layout } from './components/Layout';
import { ExpenseList } from './components/ExpenseList';
import { ExpenseForm } from './components/ExpenseForm';

function App() {
  const queryClient = useQueryClient();

  const { data: expenses = [], isLoading, isError } = useQuery({
    queryKey: ['expenses'],
    queryFn: () => fetchExpenses()
  });

  const mutation = useMutation({
    mutationFn: (newExpense: CreateExpensePayload) => createExpense(newExpense),
    onSuccess: () => {
      // Invalidate and refetch expenses data to instantly update the UI table
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
        <ExpenseList expenses={expenses} isLoading={isLoading} />
      </div>
    </Layout>
  );
}

export default App;
