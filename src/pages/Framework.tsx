import { BookOpen, ChevronRight } from 'lucide-react'
import { useState } from 'react'
import './Framework.css'

const layers = [
  {
    id: 'mindset',
    label: 'Layer 1 — MINDSET',
    subtitle: 'How to Think',
    color: 'blue',
    sections: [
      {
        title: 'The Default Shift',
        body: 'Before doing any task the old way, ask "How could AI do this?" If the answer is "it can\'t do all of it," follow up: "How could AI assist with the first 30%?" It\'s never binary. The real question is always "to what extent can AI be leveraged here?"',
      },
      {
        title: 'The Function Breakdown',
        body: 'Your role is a set of functions. Each breaks into dozens of tiny tasks. You don\'t automate your whole job — you automate one tiny piece, then another, then chain them. One small task per day. Six months later, hundreds automated.',
      },
      {
        title: 'The Curiosity Rule',
        body: 'Never accept AI output without asking why. Ask for three alternatives. Push back. Dig in. If you build something and you can\'t explain how it works, you\'ve built a liability, not an asset.',
      },
    ],
  },
  {
    id: 'method',
    label: 'Layer 2 — METHOD',
    subtitle: 'How to Decide',
    color: 'cyan',
    sections: [
      {
        title: 'Find the Constraint',
        body: '"If 500 new clients showed up tomorrow, what would break first?" — finds bottlenecks. "What would give you 500 more clients tomorrow?" — finds growth opportunities. One finds what\'s broken. The other finds what could scale.',
      },
      {
        title: 'EAD: Eliminate, Automate, Delegate',
        body: 'Run EAD in order. Eliminate first: if nobody would notice it disappeared, kill it. Automate second: 60% fully automated, 30% AI-assisted, 10% stays manual. Delegate third: if it can\'t hit 60/30/10, hand it off.',
      },
      {
        title: 'The Autonomy Spectrum',
        body: 'L0 Manual → L1 Suggested → L2 Drafted → L3 Supervised → L4 Autonomous. Default to the LOWEST level that works. Workflows beat agents. Boring is Beautiful. Push autonomy up only when you\'ve proven the lower level works.',
      },
      {
        title: 'Tie It to a KPI',
        body: 'Every automation must move a number. The Three Buckets: get more customers, make each customer worth more, cut costs. If your automation doesn\'t improve a metric in one of those three, stop.',
      },
    ],
  },
  {
    id: 'machine',
    label: 'Layer 3 — MACHINE',
    subtitle: 'How to Build and Operate',
    color: 'green',
    sections: [
      {
        title: 'The Lego Principle',
        body: 'Smallest possible steps. One input, one output per block. Start with zero-AI steps first. Get the deterministic pieces working, then layer in AI where actually needed. Modularity is freedom.',
      },
      {
        title: 'The Bike Method',
        body: 'Roll out in phases. Training wheels → Guided → Watched → Hands-off. Even at 90% confidence, roll out 10% of volume first. Watch a week. Add 20% more. Tighten or loosen confidence thresholds as data accumulates.',
      },
      {
        title: 'The Intern Rule',
        body: 'Treat AI like a brand-new hire on day one. Own identity, read-only by default, never impersonates you, no personal credentials, full audit trail, scoped permissions with minimal scope.',
      },
      {
        title: 'The Kill Switch',
        body: 'If an automation consistently needs patches, produces low-quality output, or costs more to maintain than it saves — tear it down. Good operators know when to build AND when to destroy.',
      },
    ],
  },
]

export default function Framework() {
  const [active, setActive] = useState('mindset')
  const current = layers.find(l => l.id === active)!

  return (
    <div className="framework-page">
      <header className="page-header">
        <div className={`page-header-icon color-blue`}>
          <BookOpen size={18} />
        </div>
        <div>
          <h1 className="page-title">3Ms Framework</h1>
          <p className="page-subtitle">Mindset, Method, Machine — how to think, decide, and build AI automation.</p>
        </div>
      </header>

      <div className="layer-tabs">
        {layers.map(l => (
          <button
            key={l.id}
            onClick={() => setActive(l.id)}
            className={`layer-tab color-${l.color} ${active === l.id ? 'active' : ''}`}
          >
            <span className="layer-tab-label">{l.label}</span>
            <span className="layer-tab-sub">{l.subtitle}</span>
          </button>
        ))}
      </div>

      <div className={`layer-content color-${current.color}`}>
        <div className="layer-header">
          <h2 className="layer-title">{current.label}</h2>
          <span className="layer-subtitle">{current.subtitle}</span>
        </div>
        <div className="sections">
          {current.sections.map(s => (
            <div key={s.title} className="section-card">
              <div className="section-card-header">
                <ChevronRight size={14} />
                <h3 className="section-card-title">{s.title}</h3>
              </div>
              <p className="section-card-body">{s.body}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="trademark-footer">
        Adapted from The Three Ms of AI™. © 2026 Nate Herk. All rights reserved. The Three Ms of AI™ is a trademark of Nate Herk.
      </div>
    </div>
  )
}
