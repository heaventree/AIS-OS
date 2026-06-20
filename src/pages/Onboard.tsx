import { FileText, CircleCheck as CheckCircle, Circle } from 'lucide-react'
import './Onboard.css'

const questions = [
  { q: 'Q1', label: 'Who are you, what do you sell, who do you sell it to?', hint: 'Identity, offer, ICP. One paragraph each.' },
  { q: 'Q2', label: 'Paste 1-2 things you\'ve written recently. Don\'t edit them.', hint: 'An email, a LinkedIn post, a DM — anything that sounds like you.' },
  { q: 'Q3', label: 'What are your 2-3 biggest priorities for the next 90 days?', hint: 'Things that, if not done by end of quarter, would make you say "I wasted Q2."' },
  { q: 'Q4', label: 'Where does revenue actually land, and where is it tracked?', hint: 'Stripe? Skool? GoHighLevel? QuickBooks? A spreadsheet?' },
  { q: 'Q5', label: 'Where do you talk to customers, your team, and the outside world day-to-day?', hint: 'Email (Gmail/Outlook)? Slack? Teams? DMs? Phone?' },
  { q: 'Q6', label: 'Where do meeting recordings, notes, and important docs live?', hint: 'Granola? Otter? Google Drive? Notion? Dropbox?' },
  { q: 'Q7', label: 'What\'s the one task that eats your week, and where do you currently track work?', hint: 'Biggest time-suck plus where tasks/projects live.' },
]

const dayOneFiles = [
  { path: 'CLAUDE.md', desc: 'Root operating manual', status: 'template' },
  { path: 'context/', desc: 'About you, your business, priorities', status: 'empty' },
  { path: 'references/voice.md', desc: 'Your writing voice and register', status: 'missing' },
  { path: 'connections.md', desc: 'Registry of every system your AIOS can reach', status: 'template' },
  { path: 'decisions/log.md', desc: 'Append-only decision record', status: 'ready' },
  { path: 'references/3ms-framework.md', desc: 'The Three Ms of AI™ framework', status: 'ready' },
]

const statusLabel: Record<string, { label: string; cls: string }> = {
  ready: { label: 'Ready', cls: 'status-green' },
  template: { label: 'Template — needs filling', cls: 'status-amber' },
  empty: { label: 'Empty', cls: 'status-amber' },
  missing: { label: 'Not created yet', cls: 'status-dim' },
}

export default function Onboard() {
  return (
    <div className="onboard-page">
      <header className="page-header">
        <div className="page-header-icon icon-amber">
          <FileText size={18} />
        </div>
        <div>
          <h1 className="page-title">Onboarding</h1>
          <p className="page-subtitle">Fill in aios-intake.md, then run <code>/onboard</code> to scaffold your Day-1 setup.</p>
        </div>
      </header>

      <div className="onboard-intro">
        <p>
          The intake file has a hard cap of <strong>7 questions</strong>, each answerable in under 60 seconds.
          Don't overthink — you can edit and re-run <code>/onboard</code> any time.
          Fill the file by typing, voice-pasting (Wispr Flow / OS dictation), or running <code>/onboard</code> for a guided conversation.
        </p>
      </div>

      <section className="onboard-section">
        <h2 className="section-title">The 7 Intake Questions</h2>
        <div className="questions-list">
          {questions.map(({ q, label, hint }) => (
            <div key={q} className="question-card">
              <div className="q-badge">{q}</div>
              <div className="q-body">
                <div className="q-label">{label}</div>
                <div className="q-hint">{hint}</div>
              </div>
              <Circle size={16} className="q-check" />
            </div>
          ))}
        </div>
      </section>

      <section className="onboard-section">
        <h2 className="section-title">Day-1 File Status</h2>
        <div className="files-list">
          {dayOneFiles.map(({ path, desc, status }) => {
            const s = statusLabel[status]
            return (
              <div key={path} className="file-row">
                <div className="file-info">
                  <code className="file-path">{path}</code>
                  <span className="file-desc">{desc}</span>
                </div>
                <span className={`file-status ${s.cls}`}>{s.label}</span>
              </div>
            )
          })}
        </div>
      </section>

      <div className="onboard-cta">
        <CheckCircle size={16} />
        <span>Once aios-intake.md is filled, run <code>/onboard</code> in Claude Code to auto-generate all Day-1 files.</span>
      </div>
    </div>
  )
}
