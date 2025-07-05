import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import store from "./redux/store";
import './index.css';
import { Provider } from "react-redux";

const root = createRoot(document.getElementById('root') as HTMLInputElement)
root.render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>
)