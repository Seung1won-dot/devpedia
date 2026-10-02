import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { App } from './App'
import { UpdatePrompt } from './components/UpdatePrompt'
import './styles/fonts/pretendard.css'
import './styles/tokens.css'
import './styles/base.css'
import './styles/term.css'
import './styles/category.css'
import './styles/home.css'
import './styles/palette.css'
import './styles/stats.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
    <UpdatePrompt />
  </StrictMode>,
)
