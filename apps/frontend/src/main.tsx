import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './app/App';

async function enableMocking() {
  if (import.meta.env.MODE !== 'mock') {
    return;
  }

  const { worker } = await import('./data/sources/mocks/browser');

  return worker.start({ onUnhandledRequest: 'bypass' });
}

const rootElement = document.getElementById('root')!;
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  enableMocking().then(() => {
    root.render(
      <StrictMode>
        <App />
      </StrictMode>
    );
  });
}
