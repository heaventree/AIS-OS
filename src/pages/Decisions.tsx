import { useState, useEffect } from 'react'
import { GitCommitVertical as GitCommit, Plus, X, ChevronDown, ChevronUp, Trash2 } from 'lucide-react'
import { supabase } from '../lib/supabase'
import './Decisions.css'

interface Decision {
  id: string
  title: string
  decision: string
  why: string
  alternatives: string | null
  owner: string | null
  created_at: string
}

const empty = { title: '', decision: '', why: '', alternatives: '', owner: '' }

export default function Decisions() {
  const [decisions, setDecisions] = useState<Decision[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState(empty)
  const [saving, setSaving] = useState(false)
  const [expanded, setExpanded] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const load = async () => {
    setLoading(true)
    const { data, error } = await supabase.from('decisions').select('*').order('created_at', { ascending: false })
    if (error) setError(error.message)
    else setDecisions(data ?? [])
    setLoading(false)
  }

  useEffect(() => { load() }, [])

  const save = async () => {
    if (!form.title.trim() || !form.decision.trim() || !form.why.trim()) return
    setSaving(true)
    const { error } = await supabase.from('decisions').insert({
      title: form.title.trim(),
      decision: form.decision.trim(),
      why: form.why.trim(),
      alternatives: form.alternatives.trim() || null,
      owner: form.owner.trim() || null,
    })
    if (error) { setError(error.message); setSaving(false); return }
    setForm(empty)
    setShowForm(false)
    await load()
    setSaving(false)
  }

  const remove = async (id: string) => {
    await supabase.from('decisions').delete().eq('id', id)
    setDecisions(prev => prev.filter(d => d.id !== id))
  }

  const fmt = (iso: string) => new Date(iso).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })

  return (
    <div className="decisions-page">
      <header className="page-header">
        <div className="page-header-icon icon-green">
          <GitCommit size={18} />
        </div>
        <div className="header-row">
          <div>
            <h1 className="page-title">Decisions Log</h1>
            <p className="page-subtitle">Append-only record of meaningful decisions and why they were made.</p>
          </div>
          <button className="btn-primary" onClick={() => setShowForm(v => !v)}>
            <Plus size={15} />
            <span>Log decision</span>
          </button>
        </div>
      </header>

      {error && (
        <div className="error-banner">
          <span>{error}</span>
          <button onClick={() => setError(null)}><X size={14} /></button>
        </div>
      )}

      {showForm && (
        <div className="form-card">
          <div className="form-header">
            <span className="form-title">New Decision</span>
            <button className="icon-btn" onClick={() => { setShowForm(false); setForm(empty) }}><X size={16} /></button>
          </div>
          <div className="form-fields">
            <label className="form-label">
              Title <span className="required">*</span>
              <input
                className="form-input"
                placeholder="Short title for this decision"
                value={form.title}
                onChange={e => setForm(f => ({ ...f, title: e.target.value }))}
              />
            </label>
            <label className="form-label">
              Decision <span className="required">*</span>
              <textarea
                className="form-textarea"
                placeholder="What was decided."
                rows={3}
                value={form.decision}
                onChange={e => setForm(f => ({ ...f, decision: e.target.value }))}
              />
            </label>
            <label className="form-label">
              Why <span className="required">*</span>
              <textarea
                className="form-textarea"
                placeholder="The reasoning, constraints, and what would change your mind."
                rows={3}
                value={form.why}
                onChange={e => setForm(f => ({ ...f, why: e.target.value }))}
              />
            </label>
            <label className="form-label">
              Alternatives considered
              <textarea
                className="form-textarea"
                placeholder="What else was on the table."
                rows={2}
                value={form.alternatives}
                onChange={e => setForm(f => ({ ...f, alternatives: e.target.value }))}
              />
            </label>
            <label className="form-label">
              Owner
              <input
                className="form-input"
                placeholder="Who's accountable"
                value={form.owner}
                onChange={e => setForm(f => ({ ...f, owner: e.target.value }))}
              />
            </label>
          </div>
          <div className="form-footer">
            <button className="btn-ghost" onClick={() => { setShowForm(false); setForm(empty) }}>Cancel</button>
            <button
              className="btn-primary"
              onClick={save}
              disabled={saving || !form.title.trim() || !form.decision.trim() || !form.why.trim()}
            >
              {saving ? 'Saving…' : 'Save decision'}
            </button>
          </div>
        </div>
      )}

      {loading ? (
        <div className="loading-state">Loading decisions…</div>
      ) : decisions.length === 0 ? (
        <div className="empty-state">
          <GitCommit size={32} />
          <span>No decisions logged yet.</span>
          <button className="btn-primary" onClick={() => setShowForm(true)}><Plus size={14} /> Log your first decision</button>
        </div>
      ) : (
        <div className="decisions-list">
          {decisions.map(d => (
            <div key={d.id} className="decision-card">
              <div className="decision-card-header" onClick={() => setExpanded(expanded === d.id ? null : d.id)}>
                <div className="decision-card-left">
                  <span className="decision-date">{fmt(d.created_at)}</span>
                  <span className="decision-title">{d.title}</span>
                </div>
                <div className="decision-card-actions">
                  {d.owner && <span className="owner-tag">{d.owner}</span>}
                  <button className="icon-btn danger" onClick={e => { e.stopPropagation(); remove(d.id) }}><Trash2 size={13} /></button>
                  {expanded === d.id ? <ChevronUp size={15} /> : <ChevronDown size={15} />}
                </div>
              </div>
              {expanded === d.id && (
                <div className="decision-body">
                  <div className="decision-field">
                    <span className="field-label">Decision</span>
                    <p>{d.decision}</p>
                  </div>
                  <div className="decision-field">
                    <span className="field-label">Why</span>
                    <p>{d.why}</p>
                  </div>
                  {d.alternatives && (
                    <div className="decision-field">
                      <span className="field-label">Alternatives considered</span>
                      <p>{d.alternatives}</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
