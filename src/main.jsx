import { createRoot } from 'react-dom/client'
import { HashRouter } from 'react-router'

import './index.css'
import App from './App.jsx'
import { UserProvider } from './context/userContext.jsx'


createRoot(document.getElementById('root')).render(
  <UserProvider>
    <HashRouter>
      <App />
    </HashRouter>
  </UserProvider>,


)
