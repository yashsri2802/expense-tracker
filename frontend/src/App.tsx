import { useQuery } from '@tanstack/react-query';
import { fetchExpenses } from './api';
import { Layout } from './components/Layout';
import { ExpenseList } from './components/ExpenseList';

function App() {
  const { data: expenses = [], isLoading, isError } = useQuery({
    queryKey: ['expenses'],
    queryFn: () => fetchExpenses()
  });

  return (
    <Layout>
      {isError && (
        <div style={{ background: 'var(--danger-color)', padding: '1rem', color: 'white', borderRadius: '8px', marginBottom: '1rem' }}>
          Failed to load expenses. Please check if the backend server is running constraint.
        </div>
      )}
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        {/* We will add the Add Expense Form and Filters here shortly */}
        <ExpenseList expenses={expenses} isLoading={isLoading} />
      </div>
    </Layout>
  );
}

export default App;
