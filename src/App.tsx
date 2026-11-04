import { useState } from 'react'
import {
  ArrowDownWideNarrow,
  ArrowRight,
  CalendarDays,
  ChevronDown,
  Crown,
  GitBranch,
  Landmark,
  Search,
  X,
} from 'lucide-react'
import { houseDetails, monarchs, type Monarch } from './monarchs'
import './App.css'

type View = 'timeline' | 'family'

function TreeBranch({
  monarch,
  childrenByParent,
  onSelect,
}: {
  monarch: Monarch
  childrenByParent: Map<string, Monarch[]>
  onSelect: (monarch: Monarch) => void
}) {
  const children = childrenByParent.get(monarch.id) ?? []

  return (
    <li className="tree-branch">
      <button className="tree-person" type="button" onClick={() => onSelect(monarch)}>
        <span className="tree-person-name">{monarch.name}</span>
        <span className="tree-person-reign">{monarch.reign}</span>
        <span className="tree-person-parent">{monarch.parentId ? `Barn till ${monarch.parent}` : `Förälder: ${monarch.parent}`}</span>
      </button>
      {children.length > 0 && (
        <ul className="tree-children">
          {children.map((child) => (
            <TreeBranch key={child.id} monarch={child} childrenByParent={childrenByParent} onSelect={onSelect} />
          ))}
        </ul>
      )}
    </li>
  )
}

function App() {
  const [view, setView] = useState<View>('timeline')
  const [query, setQuery] = useState('')
  const [houseFilter, setHouseFilter] = useState('Alla ätter')
  const [selected, setSelected] = useState<Monarch | null>(null)

  const houses = [...new Set(monarchs.map((monarch) => monarch.house))]
  const normalizedQuery = query.trim().toLocaleLowerCase('sv-SE')
  const filteredMonarchs = [...monarchs]
    .sort((left, right) => right.start - left.start)
    .filter((monarch) => houseFilter === 'Alla ätter' || monarch.house === houseFilter)
    .filter((monarch) => {
      if (!normalizedQuery) return true
      return `${monarch.name} ${monarch.byname ?? ''} ${monarch.house} ${monarch.reign}`
        .toLocaleLowerCase('sv-SE')
        .includes(normalizedQuery)
    })

  const groupedHouses = houses
    .map((house) => ({
      house,
      members: monarchs.filter((monarch) => monarch.house === house).sort((a, b) => a.start - b.start),
    }))
    .sort((left, right) => right.members.at(-1)!.start - left.members.at(-1)!.start)

  return (
    <div className="site-shell">
      <header className="topbar">
        <a className="brand" href="#top" aria-label="Svenska monarker, till toppen">
          <span className="brand-mark"><Crown size={19} strokeWidth={1.7} /></span>
          <span className="brand-name">Svenska <b>monarker</b></span>
        </a>
        <div className="topbar-note"><span className="live-dot" /> En regentlängd genom tusen år</div>
        <a className="topbar-about" href="#om-listan">Om regentlängden <ArrowRight size={14} /></a>
      </header>

      <main id="top">
        <section className="intro" aria-labelledby="page-title">
          <div className="intro-copy">
            <div className="eyebrow"><span /> HISTORIA · ÄTTELÄNGDER · TRONFÖLJD</div>
            <h1 id="page-title">Sveriges <em>monarker</em></h1>
            <p className="intro-text">Från de tidiga kungarna till dagens kungahus. Följ kronan genom århundradena och se hur släkterna knyts samman.</p>
            <div className="intro-meta">
              <span><CalendarDays size={15} /> Ca 970–idag</span>
              <span className="meta-divider" />
              <span><Landmark size={15} /> {monarchs.length} regenter</span>
            </div>
          </div>
          <div className="intro-art" aria-hidden="true">
            <div className="art-ring art-ring-outer" />
            <div className="art-ring art-ring-inner" />
            <div className="art-center"><Crown size={58} strokeWidth={1.05} /></div>
            <span className="art-year art-year-top">1523</span>
            <span className="art-year art-year-bottom">2026</span>
            <span className="art-tick art-tick-one" />
            <span className="art-tick art-tick-two" />
          </div>
          <div className="intro-caption">En krona. Många släkter.</div>
        </section>

        <section className="explorer" aria-label="Utforska Sveriges monarker">
          <div className="explorer-heading">
            <div>
              <div className="section-kicker">REGENTLÄNGD</div>
              <h2>{view === 'timeline' ? 'En krona genom tiden' : 'Släktlinjer & ätter'}</h2>
            </div>
            <div className="view-switch" role="tablist" aria-label="Visningsläge">
              <button className={view === 'timeline' ? 'active' : ''} type="button" role="tab" aria-selected={view === 'timeline'} onClick={() => setView('timeline')}>
                <ArrowDownWideNarrow size={16} /> Tidslinje
              </button>
              <button className={view === 'family' ? 'active' : ''} type="button" role="tab" aria-selected={view === 'family'} onClick={() => setView('family')}>
                <GitBranch size={16} /> Släktträd
              </button>
            </div>
          </div>

          {view === 'timeline' ? (
            <>
              <div className="toolbar">
                <label className="search-field">
                  <Search size={17} aria-hidden="true" />
                  <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Sök monark eller ätt" aria-label="Sök monark eller ätt" />
                  {query && <button className="clear-search" type="button" onClick={() => setQuery('')} aria-label="Rensa sökning"><X size={15} /></button>}
                </label>
                <label className="house-select-wrap">
                  <span className="house-select-label">VISA ÄTT</span>
                  <span className="house-select">
                    <select value={houseFilter} onChange={(event) => setHouseFilter(event.target.value)} aria-label="Filtrera efter ätt">
                      <option>Alla ätter</option>
                      {houses.map((house) => <option key={house}>{house}</option>)}
                    </select>
                    <ChevronDown size={15} aria-hidden="true" />
                  </span>
                </label>
              </div>

              <div className="timeline-summary">
                <span>{filteredMonarchs.length} {filteredMonarchs.length === 1 ? 'regent' : 'regenter'}</span>
                <span className="summary-order"><span className="order-line" /> SENAST ÖVERST</span>
              </div>

              {filteredMonarchs.length ? (
                <ol className="timeline-list">
                  {filteredMonarchs.map((monarch, index) => {
                    const house = houseDetails[monarch.house]
                    return (
                      <li className="timeline-item" key={monarch.id}>
                        <div className="timeline-rail" aria-hidden="true">
                          <span className={`timeline-marker tone-${house?.tone ?? 'neutral'}`}>{index === 0 ? <Crown size={14} /> : <span />}</span>
                        </div>
                        <button className="timeline-card" type="button" onClick={() => setSelected(monarch)}>
                          <span className="timeline-card-main">
                            <span className="reign-date">{monarch.reign}</span>
                            <span className="monarch-name">{monarch.name}</span>
                            <span className="monarch-house"><span className={`house-swatch tone-${house?.tone ?? 'neutral'}`} />{monarch.house}</span>
                          </span>
                          <span className="timeline-card-side">
                            <span className="parent-label">FÖRÄLDER</span>
                            <span className="parent-name">{monarch.parent}</span>
                            <span className="card-open">Läs mer <ArrowRight size={14} /></span>
                          </span>
                        </button>
                      </li>
                    )
                  })}
                </ol>
              ) : (
                <div className="empty-state"><Search size={22} /><strong>Inga regenter hittades</strong><span>Prova ett annat namn eller välj en annan ätt.</span></div>
              )}
            </>
          ) : (
            <div className="family-view">
              <div className="family-intro">
                <GitBranch size={18} />
                <p>Varje gren visar kända förälder–barn-band. En tronföljd är inte alltid en släktlinje; därför står osäkra eller utomstående släktband utskrivna.</p>
              </div>
              <div className="family-groups">
                {groupedHouses.map(({ house, members }) => {
                  const memberIds = new Set(members.map((member) => member.id))
                  const childrenByParent = new Map<string, Monarch[]>()
                  members.forEach((member) => {
                    if (member.parentId && memberIds.has(member.parentId)) {
                      const siblings = childrenByParent.get(member.parentId) ?? []
                      siblings.push(member)
                      childrenByParent.set(member.parentId, siblings)
                    }
                  })
                  const roots = members.filter((member) => !member.parentId || !memberIds.has(member.parentId))
                  const details = houseDetails[house]
                  return (
                    <section className={`family-group tone-${details?.tone ?? 'neutral'}`} key={house}>
                      <div className="family-group-heading">
                        <span className="family-glyph"><Crown size={17} /></span>
                        <div><h3>{house}</h3><span>{details?.years ?? `${members[0].reign} – ${members.at(-1)!.reign}`}</span></div>
                        <span className="member-count">{members.length} {members.length === 1 ? 'regent' : 'regenter'}</span>
                      </div>
                      {details && <p className="family-note">{details.note}</p>}
                      <ul className="family-roots">
                        {roots.map((root) => <TreeBranch key={root.id} monarch={root} childrenByParent={childrenByParent} onSelect={setSelected} />)}
                      </ul>
                    </section>
                  )
                })}
              </div>
            </div>
          )}

          <div className="list-endmark"><span /><Crown size={15} /><span /></div>
        </section>

        <section className="note-band" id="om-listan">
          <div className="note-icon"><Landmark size={19} /></div>
          <div><h2>Om regentlängden</h2><p>De tidigaste kungarnas regeringsår och släktband är osäkra. Ungefärliga årtal markeras med "ca"; vissa regenter överlappade eller hade avbrott i sin regering. Uppgifterna är en översikt, inte en fullständig källkritisk genomgång.</p></div>
          <span className="note-seal">SVERIGE<br />HISTORIA</span>
        </section>
      </main>

      <footer className="site-footer"><span>SVERIGES MONARKER</span><span>Från ca 970 till idag <span className="footer-separator">·</span> En historisk översikt</span><Crown size={15} /></footer>

      {selected && (
        <div className="detail-overlay" role="presentation" onClick={() => setSelected(null)}>
          <aside className="detail-panel" role="dialog" aria-modal="true" aria-labelledby="detail-name" onClick={(event) => event.stopPropagation()}>
            <div className="detail-topline"><span>MONARK · {selected.house.toLocaleUpperCase('sv-SE')}</span><button type="button" className="close-detail" onClick={() => setSelected(null)} aria-label="Stäng faktaruta"><X size={19} /></button></div>
            <div className="detail-emblem"><Crown size={34} strokeWidth={1.35} /></div>
            <div className="detail-date">{selected.reign}</div>
            <h2 id="detail-name">{selected.name}</h2>
            {selected.byname && <div className="detail-byname">Tillnamn: {selected.byname}</div>}
            <div className="detail-rule" />
            <p className="detail-fact">{selected.fact}</p>
            <dl className="detail-data">
              <div><dt>Ätt</dt><dd>{selected.house}</dd></div>
              <div><dt>Förälder</dt><dd>{selected.parent}</dd></div>
              <div><dt>Regeringstid</dt><dd>{selected.reign}</dd></div>
            </dl>
            <div className="detail-footer"><Crown size={16} /><span>REGENTLÄNGD · SVERIGE</span></div>
          </aside>
        </div>
      )}
    </div>
  )
}

export default App