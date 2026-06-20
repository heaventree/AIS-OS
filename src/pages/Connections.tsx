import { Network, Circle } from 'lucide-react'
import './Connections.css'

const domains = [
  { num: 1, domain: 'Revenue / Financials', tool: 'Stripe / QuickBooks / Skool', mechanism: 'not yet connected' },
  { num: 2, domain: 'Customer interactions', tool: 'CRM / Inbox', mechanism: 'not yet connected' },
  { num: 3, domain: 'Calendar', tool: 'Google Calendar / Notion', mechanism: 'not yet connected' },
  { num: 4, domain: 'Communication', tool: 'Gmail / Slack / Teams', mechanism: 'not yet connected' },
  { num: 5, domain: 'Project / task tracking', tool: 'ClickUp / Asana / Linear', mechanism: 'not yet connected' },
  { num: 6, domain: 'Meeting intelligence', tool: 'Granola / Otter / Fireflies', mechanism: 'not yet connected' },
  { num: 7, domain: 'Knowledge / files', tool: 'Notion / Google Drive', mechanism: 'not yet connected' },
]

const mechanismBadge = (m: string) => {
  if (m === 'not yet connected') return 'badge-dim'
  if (m === 'mcp') return 'badge-blue'
  if (m === 'script') return 'badge-green'
  if (m === 'key+ref') return 'badge-amber'
  return 'badge-dim'
}

export default function Connections() {
  return (
    <div className="connections-page">
      <header className="page-header">
        <div className="page-header-icon icon-cyan">
          <Network size={18} />
        </div>
        <div>
          <h1 className="page-title">Connections</h1>
          <p className="page-subtitle">Registry of every system your AIOS can reach.</p>
        </div>
      </header>

      <div className="connections-table-wrap">
        <table className="connections-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Domain</th>
              <th>Tool</th>
              <th>Mechanism</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {domains.map(row => (
              <tr key={row.num}>
                <td className="col-num">{row.num}</td>
                <td className="col-domain">{row.domain}</td>
                <td className="col-tool">{row.tool}</td>
                <td>
                  <span className={`conn-badge ${mechanismBadge(row.mechanism)}`}>
                    {row.mechanism}
                  </span>
                </td>
                <td>
                  <span className="status-dot">
                    <Circle size={8} fill="currentColor" />
                    <span>not connected</span>
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mechanism-legend">
        <h3 className="legend-title">Mechanism Types</h3>
        <div className="legend-items">
          {[
            { key: 'mcp', label: 'MCP server', color: 'blue' },
            { key: 'script', label: 'Python/Bash hitting an API in scripts/', color: 'green' },
            { key: 'export', label: 'CSV/JSON dump pipeline', color: 'cyan' },
            { key: 'key+ref', label: '.env key + references/{tool}-api.md guide', color: 'amber' },
          ].map(({ key, label, color }) => (
            <div key={key} className="legend-item">
              <span className={`conn-badge badge-${color}`}>{key}</span>
              <span>{label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
