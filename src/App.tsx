import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom'
import { LayoutDashboard, BookOpen, Zap, GitCommitVertical as GitCommit, Network, FileText } from 'lucide-react'
import Dashboard from './pages/Dashboard'
import Framework from './pages/Framework'
import Decisions from './pages/Decisions'
import Connections from './pages/Connections'
import Onboard from './pages/Onboard'
import './App.css'

const nav = [
  { to: '/', label: 'Overview', icon: LayoutDashboard, end: true },
  { to: '/framework', label: '3Ms Framework', icon: BookOpen },
  { to: '/decisions', label: 'Decisions Log', icon: GitCommit },
  { to: '/connections', label: 'Connections', icon: Network },
  { to: '/onboard', label: 'Onboarding', icon: FileText },
]

export default function App() {
  return (
    <BrowserRouter>
      <div className="app-shell">
        <aside className="sidebar">
          <div className="sidebar-logo">
            <Zap size={18} strokeWidth={2.5} />
            <span>AIOS</span>
          </div>
          <nav className="sidebar-nav">
            {nav.map(({ to, label, icon: Icon, end }) => (
              <NavLink key={to} to={to} end={end} className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
                <Icon size={16} />
                <span>{label}</span>
              </NavLink>
            ))}
          </nav>
          <div className="sidebar-footer">
            <span className="badge">v1.0</span>
            <span className="sidebar-footer-label">The Three Ms of AI™</span>
          </div>
        </aside>
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/framework" element={<Framework />} />
            <Route path="/decisions" element={<Decisions />} />
            <Route path="/connections" element={<Connections />} />
            <Route path="/onboard" element={<Onboard />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  )
}
