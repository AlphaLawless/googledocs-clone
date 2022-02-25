import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import TextEditor from "./components/TextEditor/TextEditor";
import { v4 as uuidV4 } from "uuid";

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          render={() => <Navigate to={`/documents/${uuidV4()}`} />}
        >
          <Route path="/documents/:id" element={<TextEditor />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
