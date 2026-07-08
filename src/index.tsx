import ReactDOM from 'react-dom/client';
import App from './App';
import {
  HashRouter,
} from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";

import './index.css';

const rootEl = document.getElementById('root');
if (rootEl) {
  const root = ReactDOM.createRoot(
    document.getElementById("root")!
  );
  root.render(
    <HashRouter>
      <AuthProvider>
        <App />
      </AuthProvider>
    </HashRouter>,
  );
}
