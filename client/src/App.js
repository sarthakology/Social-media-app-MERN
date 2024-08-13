import './App.css';
import AppRoutes from './components/AppRoutes';
import { UserProvider } from './Context.js';
function App() {

  return (
    <UserProvider>
      <AppRoutes />
    </UserProvider>
  );
}

export default App;
