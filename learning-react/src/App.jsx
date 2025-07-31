import "./App.css";
import { Greeting } from './components/greeting/greeting.jsx';

function App() {
  return (
    <div>
      <Greeting name="John Doe" />
      <Greeting name="Jane Smith" />
    </div>
  );
}

export default App;
