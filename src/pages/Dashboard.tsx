import { Zap, BookOpen, GitCommitVertical as GitCommit, Network, FileText, ArrowRight, CircleCheck as CheckCircle, Circle } from 'lucide-react'
import { Link } from 'react-router-dom'
import './Dashboard.css'

const cards = [
  {
    to: '/framework',
    icon: BookOpen,
    color: 'blue',
    title: '3Ms Framework',
    desc: 'Mindset, Method, Machine — the operator brain.',
    detail: 'Read the full framework',
  },
  {
    to: '/decisions',
    icon: GitCommit,
    color: 'green',
    title: 'Decisions Log',
    desc: 'Append-only record of what was decided and why.',
    detail: 'Log a decision',
  },
  {
    to: '/connections',
    icon: Network,
    color: 'cyan',
    title: 'Connections',
    desc: 'Every system your AIOS can reach.',
    detail: 'View registry',
  },
  {
    to: '/onboard',
    icon: FileText,
    color: 'amber',
    title: 'Onboarding',
    desc: 'Fill in your intake answers to initialize the AIOS.',
    detail: 'Start onboarding',
  },
]

const checklist = [
  { label: 'Fill aios-intake.md (7 questions)', done: false },
  { label: 'Run /onboard to scaffold Day-1 files', done: false },
  { label: 'Connect first tool in connections.md', done: false },
  { label: 'Log your first decision', done: false },
  { label: 'Run /audit on Day 7', done: false },
  { label: 'Run /level-up weekly', done: false },
]

const principles = [
  'Boring is beautiful. Predictable beats clever.',
  'Deterministic steps can be finished. AI steps are always evolving.',
  'Fail fast, learn faster. Real learning lives in your first 10 mistakes.',
]

export default function Dashboard() {
  return (
    <div className="dashboard">
      <header className="page-header">
        <div className="page-header-icon">
          <Zap size={20} strokeWidth={2.5} />
        </div>
        <div>
          <h1 className="page-title">AI Operating System</h1>
          <p className="page-subtitle">Your personal thought partner for shipping faster.</p>
        </div>
      </header>

      <div className="card-grid">
        {cards.map(({ to, icon: Icon, color, title, desc, detail }) => (
          <Link key={to} to={to} className={`dashboard-card color-${color}`}>
            <div className="dashboard-card-top">
              <div className="dashboard-card-icon">
                <Icon size={18} />
              </div>
              <ArrowRight size={14} className="dashboard-card-arrow" />
            </div>
            <h2 className="dashboard-card-title">{title}</h2>
            <p className="dashboard-card-desc">{desc}</p>
            <span className="dashboard-card-cta">{detail}</span>
          </Link>
        ))}
      </div>

      <div className="two-col">
        <section className="panel">
          <h2 className="panel-title">Day-1 Checklist</h2>
          <ul className="checklist">
            {checklist.map(({ label, done }) => (
              <li key={label} className={`checklist-item ${done ? 'done' : ''}`}>
                {done ? <CheckCircle size={15} /> : <Circle size={15} />}
                <span>{label}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="panel">
          <h2 className="panel-title">Governing Principles</h2>
          <ol className="principles">
            {principles.map((p, i) => (
              <li key={i} className="principle-item">
                <span className="principle-num">{i + 1}</span>
                <span>{p}</span>
              </li>
            ))}
          </ol>
          <div className="trademark-note">
            The Three Ms of AI™ is a trademark of Nate Herk. © 2026 Nate Herk.
          </div>
        </section>
      </div>
    </div>
  )
}
