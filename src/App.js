import Form from "./components/Form"
import axios from 'axios'

axios.defaults.baseURL = 'https://us-central1-skipli-coding-challenge.cloudfunctions.net/api'
function App() {
  return (
    <div className="App">
      <Form />
    </div>
  );
}

export default App;
