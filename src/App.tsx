import { useEffect, useState, type ReactNode } from 'react'
import {
  Accessibility, ArrowRight, BarChart3, BellRing, Bot,
  Check, ChevronDown, CircleHelp, Clock3, Files, GitPullRequestArrow,
  Layers3, LockKeyhole, Menu, MousePointerClick, Network, Plus,
  Search, Settings2, ShieldCheck, Sparkles, Users, X,
} from 'lucide-react'
import './App.css'

type Trap = {
  id: string
  number: string
  name: string
  description: string
  metric: string
  icon: typeof CircleHelp
  tone: string
}

const traps: Trap[] = [
  { id: 'confusion', number: '01', name: 'Confusion Creates Engagement', description: "If users immediately understand something, they won't spend enough time with it.", metric: 'Time spent looking for the Save button', icon: CircleHelp, tone: 'cobalt' },
  { id: 'journey', number: '02', name: 'Every Click Is A Journey', description: 'Users should experience growth, discovery, and mild frustration before completing any task.', metric: 'Average clicks per action', icon: MousePointerClick, tone: 'coral' },
  { id: 'choice', number: '03', name: 'Choice Builds Character', description: 'No decision should involve fewer than 12 similarly named options.', metric: 'Decision abandonment rate', icon: Layers3, tone: 'amber' },
  { id: 'governance', number: '04', name: 'Governance Is Love', description: 'Every request deserves additional review.', metric: 'Approvals per outcome', icon: GitPullRequestArrow, tone: 'green' },
  { id: 'ai', number: '05', name: 'AI Knows Best', description: 'Users should never have to make a decision if AI can confidently make the wrong one.', metric: 'Confidence score', icon: Bot, tone: 'magenta' },
  { id: 'notifications', number: '06', name: 'Notification-Driven Productivity', description: 'People work best when continuously interrupted.', metric: 'Alerts per minute', icon: BellRing, tone: 'red' },
  { id: 'alignment', number: '07', name: 'Alignment Before Action', description: 'Action without alignment is reckless.', metric: 'Meetings held before work begins', icon: Users, tone: 'teal' },
  { id: 'dashboard', number: '08', name: 'Dashboard First Thinking', description: "If it can't be measured, create a dashboard. If it can be measured, create two.", metric: 'Dashboards per employee', icon: BarChart3, tone: 'blue' },
  { id: 'accessibility', number: '09', name: 'Accessibility Through Optimism', description: 'Assume every user has perfect vision, hearing, dexterity, memory, patience, and context.', metric: 'User perseverance score', icon: Accessibility, tone: 'lime' },
]

const badges = ['Accessibility Aspirational', 'User Adjacent', 'Vibes Tested', 'Assumption Driven', 'Technically Compliant', 'ISO-9001-ish']

const dashboardTypes = [
  { title: 'Dashboard inventory', label: 'Total dashboards', value: '24', kind: 'bars' },
  { title: 'Meeting readiness', label: 'Alignment coverage', value: '87%', kind: 'donut' },
  { title: 'Visibility velocity', label: 'Views of views', value: '+31%', kind: 'trend' },
  { title: 'Approval health', label: 'Pending decisions', value: '14', kind: 'status' },
  { title: 'Engagement heatmap', label: 'Peak activity', value: '3:47 PM', kind: 'heat' },
  { title: 'Strategic funnel', label: 'Ideas shipped', value: '0.8%', kind: 'funnel' },
]

function DashboardVisual({ kind, value }: { kind: string; value: string }) {
  if (kind === 'donut') return <div className="dashboard-visual donut"><div><strong>{value}</strong></div></div>
  if (kind === 'status') return <div className="dashboard-visual status"><span>Waiting</span><span>In review</span><span>Re-review</span></div>
  return <div className={`dashboard-visual ${kind}`}>{Array.from({ length: kind === 'heat' ? 20 : 5 }, (_, index) => <i key={index} />)}</div>
}

function DemoFrame({ children, label }: { children: ReactNode; label: string }) {
  return <div className="demo-frame"><div className="demo-browser-bar"><span /><span /><span /><div className="demo-address"><LockKeyhole size={12} /> enterprise.internal/{label}</div></div><div className="demo-canvas">{children}</div></div>
}

function InteractiveDemo({ trap }: { trap: Trap }) {
  const [count, setCount] = useState(0)
  const [choice, setChoice] = useState('Select a strategic option')
  const [notices, setNotices] = useState<string[]>([])
  const [dashboards, setDashboards] = useState<number[]>([0])

  if (trap.id === 'confusion') return <DemoFrame label="workspace"><div className="mock-app"><aside><div className="mock-logo">N</div><Menu /><Files /><Network /><Settings2 /></aside><main><div className="mock-title"><span>Untitled request</span><span className="quiet">Last saved maybe</span></div><div className="mock-toolbar"><button aria-label="Search"><Search /></button><button aria-label="Settings"><Settings2 /></button><button className="operationalize" onClick={() => setCount(count + 1)}>{count ? 'Re-operationalize' : 'Operationalize'}</button></div><div className="document-lines"><i /><i /><i /><i /></div><div className="demo-result">{count ? 'Changes sent somewhere.' : 'Make a change, then locate Save.'}</div></main></div></DemoFrame>

  if (trap.id === 'journey') {
    const steps = ['Begin export', 'Confirm format', 'Verify intent', 'Review policy', 'Confirm confirmation', 'Request export']
    return <DemoFrame label="export"><div className="journey-demo"><div className="step-count">STEP {Math.min(count + 1, steps.length)} OF {steps.length}</div><div className="journey-path">{steps.map((step, index) => <span key={step} className={index <= count ? 'active' : ''} />)}</div><h3>{count >= steps.length ? 'Request submitted to the export team' : steps[count]}</h3><p>{count >= steps.length ? 'Typical response time: 3–5 strategic planning cycles.' : 'Your progress is important to our process.'}</p><button onClick={() => setCount(count >= steps.length ? 0 : count + 1)}>{count >= steps.length ? 'Begin another export' : 'Continue journey'} <ArrowRight /></button></div></DemoFrame>
  }

  if (trap.id === 'choice') {
    const options = ['Standard', 'Standard Plus', 'Standard Pro', 'Standard Pro Plus', 'Advanced', 'Advanced Standard', 'Advanced Plus', 'Advanced Pro', 'Essential', 'Essential Plus', 'Preferred', 'Preferred Standard', 'Recommended', 'Recommended Plus', 'Classic', 'Other (recommended)']
    return <DemoFrame label="configuration"><div className="choice-demo"><label>Choose your default experience</label><button className="select-trigger" onClick={() => setCount(count ? 0 : 1)}>{choice}<ChevronDown /></button>{Boolean(count) && <div className="option-grid">{options.map((option) => <button key={option} onClick={() => { setChoice(option); setCount(0) }}>{option}{option.includes('Recommended') && <Sparkles />}</button>)}</div>}<p>All options can be changed by submitting a support request.</p></div></DemoFrame>
  }

  if (trap.id === 'governance') {
    const approvers = ['Direct manager', 'Indirect manager', 'Finance partner', 'Risk liaison', 'Brand steward', 'Request council']
    return <DemoFrame label="approvals"><div className="approval-demo"><div className="approval-head"><div><span>REQUEST #88421</span><h3>Change button label</h3></div><span className="pending">In review</span></div>{approvers.map((approver, index) => <div className="approver" key={approver}><span className={index < count ? 'approved avatar' : 'avatar'}>{index < count ? <Check /> : index + 1}</span><div><strong>{approver}</strong><small>{index < count ? 'Approved with minor concerns' : 'Waiting for alignment'}</small></div></div>)}<button disabled={count >= approvers.length} onClick={() => setCount(count + 1)}>Simulate next approval</button></div></DemoFrame>
  }

  if (trap.id === 'ai') return <DemoFrame label="copilot"><div className="ai-demo"><div className="ai-orbit"><Sparkles /></div><span className="eyebrow">AI RECOMMENDATION</span><h3>{count ? 'Archive all active projects' : 'Delete your highest-performing workflow'}</h3><p>Based on 14 signals, 3 assumptions, and a document from 2019.</p><div className="confidence"><span style={{ width: count ? '99.9%' : '99.8%' }} /><strong>{count ? '99.9%' : '99.8%'} confident</strong></div><div className="ai-actions"><button onClick={() => setCount(count + 1)}>Trust recommendation</button><button className="text-button" onClick={() => setCount(count + 1)}>Regenerate certainty</button></div></div></DemoFrame>

  if (trap.id === 'notifications') {
    const messages = ['New priority update', 'Reminder: reminder due', 'A channel was renamed', 'You may have missed this']
    const addNotice = () => setNotices((current) => [messages[current.length % messages.length], ...current].slice(0, 4))
    return <DemoFrame label="focus"><div className="notice-demo"><div className="focus-task"><Clock3 /><span>Focus session</span><strong>24:59</strong><button onClick={addNotice}>Begin focus</button></div><div className="notice-stack">{notices.length === 0 && <p>Begin focusing to receive important interruptions.</p>}{notices.map((notice, index) => <div className="toast" key={`${notice}-${index}`}><BellRing /><div><strong>{notice}</strong><small>Now · Action may be required</small></div><button aria-label="Dismiss" onClick={() => setNotices((current) => current.filter((_, itemIndex) => itemIndex !== index))}><X /></button></div>)}</div></div></DemoFrame>
  }

  if (trap.id === 'alignment') return <DemoFrame label="calendar"><div className="meeting-demo"><div className="week-row"><span>MON</span><span>TUE</span><span>WED</span><span>THU</span><span>FRI</span></div><div className="calendar-grid">{Array.from({ length: 15 }, (_, index) => <div key={index}>{index < count && <span className={`meeting m${index % 3}`}>Pre-align</span>}</div>)}</div><div className="meeting-footer"><div><strong>{count}</strong><span>meetings before action</span></div><button onClick={() => setCount(Math.min(count + 1, 15))}><Plus /> Schedule alignment</button></div></div></DemoFrame>

  if (trap.id === 'dashboard') {
    const addDashboard = () => setDashboards((current) => {
      const unused = dashboardTypes.map((_, index) => index).filter((index) => !current.includes(index))
      const choices = unused.length ? unused : dashboardTypes.map((_, index) => index).filter((index) => index !== current.at(-1))
      return [...current, choices[Math.floor(Math.random() * choices.length)]]
    })
    return <DemoFrame label="insights"><div className="dashboard-demo"><div className="dash-top"><div><span>EXECUTIVE OVERVIEW</span><h3>Dashboard adoption dashboard</h3></div><button onClick={addDashboard}><Plus /> Add dashboard</button></div><div className="dashboard-grid">{dashboards.map((typeIndex, index) => { const dashboard = dashboardTypes[typeIndex]; return <article className="dashboard-card" key={`${typeIndex}-${index}`}><div className="dashboard-card-head"><span>DASHBOARD {String(index + 1).padStart(2, '0')}</span><strong>{dashboard.value}</strong></div><h4>{dashboard.title}</h4><DashboardVisual kind={dashboard.kind} value={dashboard.value} /><small>{dashboard.label}</small></article> })}</div></div></DemoFrame>
  }

  return <DemoFrame label="accessibility"><div className={`access-demo contrast-${count}`}><div className="access-copy"><span>Account verification</span><h3>Prove you're probably you</h3><p>Enter the 18-character code displayed for 2.4 seconds in the silent video.</p></div><div className="code-boxes">{Array.from({ length: 8 }, (_, index) => <input key={index} aria-label={`Code character ${index + 1}`} maxLength={1} />)}</div><button className="faint-button" onClick={() => setCount((count + 1) % 4)}>Improve optimism</button><small>Contrast confidence: {['hopeful', 'very hopeful', 'aspirational', 'visionary'][count]}</small></div></DemoFrame>
}

function Header({ onHome }: { onHome: () => void }) {
  return <header className="site-header"><button className="wordmark" onClick={onHome} aria-label="UI Traps home"><span className="trap-logo wordmark-mark" aria-hidden="true"><MousePointerClick /></span><span>UI Traps</span></button><a className="division" href="https://www.linkedin.com/in/yueou/" target="_blank" rel="noreferrer">Yue Ou</a></header>
}

function Home({ onSelect }: { onSelect: (trap: Trap) => void }) {
  return <><section className="hero-section" id="principles"><div className="hero-photo" aria-hidden="true" /><div className="hero-overlay" /><div className="hero-content reveal"><h1>No UI Tenets.<br /><em>All Traps.</em></h1><p className="tagline">100 years of user research, ignored.</p><p className="mission">Empower every person and every organization to submit another request.</p><button className="primary-cta" onClick={() => document.querySelector('#traps')?.scrollIntoView({ behavior: 'smooth' })}>Unlock Enterprise Complexity <ArrowRight /></button></div><div className="hero-index" aria-hidden="true"><span>9</span><small>PROVEN<br />ANTI-PATTERNS</small></div></section>
    <div className="badge-rail" aria-label="Compliance badges">{badges.map((badge) => <div key={badge}><ShieldCheck />{badge}</div>)}</div>
    <main><section className="traps-section" id="traps"><div className="section-heading"><div><h2>Nine traps. Infinite process.</h2></div><p>A practical framework for turning obvious user needs into scalable organizational complexity.</p></div><div className="trap-grid">{traps.map((trap, index) => { const Icon = trap.icon; return <article className={`trap-card tone-${trap.tone} reveal`} style={{ animationDelay: `${index * 55}ms` }} key={trap.id} onClick={() => onSelect(trap)}><div className="card-top"><span className="trap-icon"><Icon /></span><span className="trap-number">{trap.number}</span></div><h3>{trap.name}</h3><p>{trap.description}</p><div className="metric"><span>KEY METRIC</span><strong>{trap.metric}</strong></div><button onClick={(event) => { event.stopPropagation(); onSelect(trap) }}>Learn more <ArrowRight /></button></article> })}</div></section>
      <section className="philosophy-section"><div className="philosophy-intro"><div className="philosophy-heading"><span className="eyebrow">OUR PHILOSOPHY</span></div><div className="philosophy-copy"><p>At the Enterprise Friction Division, we believe great experiences aren't built overnight.</p><p>They're built through reviews, approvals, escalations, governance, alignment meetings, roadmap discussions, and occasional user interactions.</p><p>We strive to create software that challenges assumptions and tests patience.</p></div></div><div className="philosophy-principle"><p>Because if a user can complete a task without assistance, did we really create organizational value?</p></div></section>
      <section className="method-section" id="research"><div className="method-copy"><span className="eyebrow">OUR RESEARCH PRACTICE*</span><h2>Evidence-based.<br />Outcome-optional.</h2><p>Our proprietary methodology synthesizes stakeholder instinct, competitive screenshots, and the last comment in the meeting chat.</p><small>* Research participants may include members of the product team.</small></div><div className="method-steps"><div><h3>Assume</h3><p>Start with a strongly held solution.</p></div><div><h3>Validate</h3><p>Find a metric that agrees with it.</p></div><div><h3>Scale</h3><p>Make it mandatory for everyone.</p></div></div></section>
      <section className="principles-section" aria-labelledby="research-principles-title"><div className="principles-heading"><span className="eyebrow">SIX FOUNDATIONAL BELIEFS</span><h2 id="research-principles-title"><span>OUR CORE</span> PRINCIPLES</h2></div><ol className="principles-list"><li><span>01</span><p>If users understand it immediately, it's probably too simple.</p></li><li><span>02</span><p>Every workflow can benefit from an additional approval.</p></li><li><span>03</span><p>AI should be involved regardless of relevance.</p></li><li><span>04</span><p>Dashboards create visibility.</p></li><li><span>05</span><p>Additional dashboards create additional visibility.</p></li><li><span>06</span><p>Visibility is progress.</p></li></ol></section>
    </main></>
}

function TrapDetailModal({ trap, onClose }: { trap: Trap; onClose: () => void }) {
  useEffect(() => {
    const previousOverflow = document.body.style.overflow
    const closeOnEscape = (event: KeyboardEvent) => { if (event.key === 'Escape') onClose() }
    document.body.style.overflow = 'hidden'
    document.addEventListener('keydown', closeOnEscape)
    return () => {
      document.body.style.overflow = previousOverflow
      document.removeEventListener('keydown', closeOnEscape)
    }
  }, [onClose])

  return <div className="detail-backdrop" onClick={onClose}><section className={`detail-modal tone-${trap.tone}`} role="dialog" aria-modal="true" aria-labelledby="trap-detail-title" onClick={(event) => event.stopPropagation()}><button className="detail-close" aria-label="Close trap details" onClick={onClose} autoFocus><X /></button><div className="detail-summary"><div className="detail-title"><h2 id="trap-detail-title">{trap.name}</h2></div><p>{trap.description}</p><div className="detail-metric"><span>KEY METRIC</span><strong>{trap.metric}</strong></div></div><InteractiveDemo trap={trap} /></section></div>
}

function Footer() {
  return <footer className="site-footer"><div className="trap-logo footer-logo" role="img" aria-label="UI Traps logo"><MousePointerClick /></div><p className="footer-disclaimer">&gt; This website follows industry-leading practices, several of which were defined by this website.</p><p className="footer-legal">© 2026 <a href="https://www.linkedin.com/in/yueou/" target="_blank" rel="noreferrer">Yue Ou</a><br />All rights reserved. Most wrongs also reserved.</p></footer>
}

function App() {
  const [selectedTrap, setSelectedTrap] = useState<Trap | null>(null)
  const selectTrap = (trap: Trap) => setSelectedTrap(trap)
  const goHome = () => { setSelectedTrap(null); window.scrollTo({ top: 0, behavior: 'smooth' }) }
  return <div className="app-shell"><Header onHome={goHome} /><Home onSelect={selectTrap} /><Footer />{selectedTrap && <TrapDetailModal trap={selectedTrap} onClose={() => setSelectedTrap(null)} />}</div>
}

export default App