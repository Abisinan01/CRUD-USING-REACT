import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { store, persistor } from './redux/store';
import './index.css';
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

const root = createRoot(document.getElementById('root') as HTMLInputElement)
root.render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  </StrictMode>
)