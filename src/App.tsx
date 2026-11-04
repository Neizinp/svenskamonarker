import { useEffect, useState, type CSSProperties } from 'react'
import { ArrowDownWideNarrow, ChevronDown, Crown, GitBranch, Search, X } from 'lucide-react'
import { houseColors, houseDetails, imageArticleById, monarchs, type Monarch } from './monarchs'
import './App.css'

type View = 'timeline' | 'family'
type Portrait = { src: string; fileName: string; sourcePage: string }
type ApiPage = { title: string; pageimage?: string; thumbnail?: { source: string } }
type ApiResponse = {
  query?: {
    pages?: Record<string, ApiPage>
    normalized?: Array<{ from: string; to: string }>
    redirects?: Array<{ from: string; to: string }>
  }
}

const normalizeTitle = (title: string) => title.replaceAll('_', ' ').normalize('NFC').toLocaleLowerCase('sv-SE')

const portraitFileById: Record<string, string> = {
  'emund-gamle': 'Petter Lorens Hoffbro woodcut Johannes Magnus.tif',
  halsten: 'Petter Lorens Hoffbro woodcut Johannes Magnus.tif',
  filip: 'Ingold the Younger of Sweden & Philip of Sweden (1110s) grave 2009.jpg',
  'erik-11': 'Eric Lisper-Halter of Sweden at Vinköl.jpg',
  'gustav-vasa': 'Gustav Vasa small profile.jpeg',
  'gustav-3': 'Lorens Pasch the Younger - Gustav III, King of Sweden 1772-1792 - Google Art Project (cropped).jpg',
  sigismund: 'Anonymous Sigismund III Vasa.jpg',
  kristina: 'Portrait of Christina, Queen of Sweden, by Abraham Wuchters (1661).jpg',
}

const fileUrl = (fileName: string) => `https://commons.wikimedia.org/wiki/Special:FilePath/${encodeURIComponent(fileName)}?width=640`

async function loadPortraits(): Promise<Record<string, Portrait>> {
  const chunks: Monarch[][] = []
  for (let index = 0; index < monarchs.length; index += 50) chunks.push(monarchs.slice(index, index + 50))

  const results = await Promise.all(chunks.map(async (chunk) => {
    const requested = new Map(chunk.map((monarch) => [
      normalizeTitle(imageArticleById[monarch.id] ?? monarch.name),
      monarch,
    ]))
    const params = new URLSearchParams({
      action: 'query',
      format: 'json',
      origin: '*',
      prop: 'pageimages',
      piprop: 'thumbnail|name',
      pithumbsize: '640',
      redirects: '1',
      titles: chunk.map((monarch) => imageArticleById[monarch.id] ?? monarch.name).join('|'),
    })
    const response = await fetch(`https://sv.wikipedia.org/w/api.php?${params}`)
    if (!response.ok) throw new Error('Wikimedia returned an error')
    const data = await response.json() as ApiResponse

    for (const alias of [...(data.query?.normalized ?? []), ...(data.query?.redirects ?? [])]) {
      const monarch = requested.get(normalizeTitle(alias.from)) ?? requested.get(normalizeTitle(alias.to))
      if (monarch) requested.set(normalizeTitle(alias.to), monarch)
    }

    return Object.values(data.query?.pages ?? {}).flatMap((page) => {
      const monarch = requested.get(normalizeTitle(page.title))
      if (!monarch || !page.thumbnail?.source || !page.pageimage) return []
      return [[monarch.id, {
        src: page.thumbnail.source,
        fileName: page.pageimage,
        sourcePage: page.title,
      }] as const]
    })
  }))

  const portraits = Object.fromEntries(results.flat())
  Object.entries(portraitFileById).forEach(([id, fileName]) => {
    portraits[id] = {
      src: fileUrl(fileName),
      fileName,
      sourcePage: 'Wikimedia Commons',
    }
  })
  return portraits
}

function PortraitImage({
  monarch,
  image,
  className,
}: {
  monarch: Monarch
  image?: Portrait
  className: string
}) {
  return image ? (
    <img className={className} src={image.src} alt={`Historisk bild: ${monarch.name}`} loading="lazy" />
  ) : (
    <div className={`${className} portrait-placeholder`} aria-label={`Bild saknas för ${monarch.name}`}>
      <Crown size={22} strokeWidth={1.4} />
    </div>
  )
}

function TreeBranch({
  monarch,
  childrenByParent,
  imageById,
  onSelect,
}: {
  monarch: Monarch
  childrenByParent: Map<string, Monarch[]>
  imageById: Record<string, Portrait>
  onSelect: (monarch: Monarch) => void
}) {
  const children = childrenByParent.get(monarch.id) ?? []
  const colorStyle = { '--house-color': houseColors[monarch.house] } as CSSProperties

  return (
    <li className="tree-branch">
      <button className="tree-person" type="button" style={colorStyle} onClick={() => onSelect(monarch)}>
        <PortraitImage monarch={monarch} image={imageById[monarch.id]} className="tree-portrait" />
        <span className="tree-person-text">
          <span className="tree-person-name">{monarch.name}</span>
          <span className="tree-person-reign">{monarch.reign}</span>
          <span className="tree-person-parent">Föräldrar: {monarch.parents.join(' · ')}</span>
        </span>
      </button>
      {children.length > 0 && (
        <ul className="tree-children">
          {children.map((child) => (
            <TreeBranch key={child.id} monarch={child} childrenByParent={childrenByParent} imageById={imageById} onSelect={onSelect} />
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
  const [imageById, setImageById] = useState<Record<string, Portrait>>({})

  useEffect(() => {
    let active = true
    loadPortraits().then((images) => {
      if (active) setImageById(images)
    }).catch(() => undefined)
    return () => { active = false }
  }, [])

  const houses = [...new Set(monarchs.map((monarch) => monarch.house))]
  const normalizedQuery = query.trim().toLocaleLowerCase('sv-SE')
  const filteredMonarchs = [...monarchs]
    .sort((left, right) => right.start - left.start)
    .filter((monarch) => houseFilter === 'Alla ätter' || monarch.house === houseFilter)
    .filter((monarch) => !normalizedQuery || `${monarch.name} ${monarch.byname ?? ''} ${monarch.house} ${monarch.reign}`
      .toLocaleLowerCase('sv-SE').includes(normalizedQuery))

  const groupedHouses = houses
    .map((house) => ({
      house,
      members: monarchs.filter((monarch) => monarch.house === house).sort((a, b) => a.start - b.start),
    }))
    .sort((left, right) => right.members.at(-1)!.start - left.members.at(-1)!.start)

  return (
    <main className="app-shell">
      <div className="control-bar" aria-label="Tidslinjefilter">
        <label className="search-field">
          <Search size={16} aria-hidden="true" />
          <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Sök monark eller ätt" aria-label="Sök monark eller ätt" />
          {query && <button className="clear-search" type="button" onClick={() => setQuery('')} aria-label="Rensa sökning"><X size={15} /></button>}
        </label>
        <label className="house-select-wrap">
          <span className="house-select-label">ÄTT</span>
          <span className="house-select">
            <select value={houseFilter} onChange={(event) => setHouseFilter(event.target.value)} aria-label="Filtrera efter ätt">
              <option>Alla ätter</option>
              {houses.map((house) => <option key={house}>{house}</option>)}
            </select>
            <ChevronDown size={14} aria-hidden="true" />
          </span>
        </label>
        <div className="view-switch" role="tablist" aria-label="Visningsläge">
          <button className={view === 'timeline' ? 'active' : ''} type="button" role="tab" aria-selected={view === 'timeline'} onClick={() => setView('timeline')}>
            <ArrowDownWideNarrow size={15} /> Tidslinje
          </button>
          <button className={view === 'family' ? 'active' : ''} type="button" role="tab" aria-selected={view === 'family'} onClick={() => setView('family')}>
            <GitBranch size={15} /> Släktträd
          </button>
        </div>
      </div>

      {view === 'timeline' ? (
        <ol className="timeline-list" aria-label="Sveriges monarker, senast överst">
          {filteredMonarchs.map((monarch) => {
            const image = imageById[monarch.id]
            const colorStyle = { '--house-color': houseColors[monarch.house] } as CSSProperties
            return (
              <li className="timeline-item" key={monarch.id}>
                <span className="timeline-rail" style={colorStyle} aria-hidden="true"><i /></span>
                <button className="timeline-card" type="button" style={colorStyle} onClick={() => setSelected(monarch)}>
                  <PortraitImage monarch={monarch} image={image} className="monarch-portrait" />
                  <span className="timeline-card-main">
                    <span className="reign-date">{monarch.reign}</span>
                    <span className="monarch-name">{monarch.name}</span>
                    <span className="monarch-house">{monarch.house}</span>
                  </span>
                  <span className="parents-list">
                    <span><b>FAR</b>{monarch.parents[0]}</span>
                    <span><b>MOR</b>{monarch.parents[1]}</span>
                  </span>
                </button>
              </li>
            )
          })}
        </ol>
      ) : (
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
            const colorStyle = { '--house-color': houseColors[house] } as CSSProperties
            const details = houseDetails[house]
            return (
              <section className="family-group" key={house} style={colorStyle}>
                <div className="family-group-heading">
                  <Crown size={16} />
                  <h2>{house}</h2>
                  <span>{details?.years ?? `${members[0].reign} – ${members.at(-1)!.reign}`}</span>
                </div>
                <ul className="family-roots">
                  {roots.map((root) => <TreeBranch key={root.id} monarch={root} childrenByParent={childrenByParent} imageById={imageById} onSelect={setSelected} />)}
                </ul>
              </section>
            )
          })}
        </div>
      )}

      {selected && (
        <div className="detail-overlay" role="presentation" onClick={() => setSelected(null)}>
          <aside className="detail-panel" role="dialog" aria-modal="true" aria-labelledby="detail-name" onClick={(event) => event.stopPropagation()}>
            <div className="detail-topline" style={{ '--house-color': houseColors[selected.house] } as CSSProperties}>
              <span>{selected.house}</span>
              <button type="button" className="close-detail" onClick={() => setSelected(null)} aria-label="Stäng faktaruta"><X size={18} /></button>
            </div>
            <PortraitImage monarch={selected} image={imageById[selected.id]} className="detail-portrait" />
            <div className="detail-date">{selected.reign}</div>
            <h2 id="detail-name">{selected.name}</h2>
            {selected.byname && <div className="detail-byname">Tillnamn: {selected.byname}</div>}
            <p className="detail-fact">{selected.fact}</p>
            <dl className="detail-data">
              <div><dt>Ätt</dt><dd>{selected.house}</dd></div>
              <div><dt>Far</dt><dd>{selected.parents[0]}</dd></div>
              <div><dt>Mor</dt><dd>{selected.parents[1]}</dd></div>
              <div><dt>Regeringstid</dt><dd>{selected.reign}</dd></div>
            </dl>
            {imageById[selected.id] && (
              <a className="image-source" href={`https://commons.wikimedia.org/wiki/File:${encodeURIComponent(imageById[selected.id].fileName.replaceAll(' ', '_'))}`} target="_blank" rel="noreferrer">
                Bildkälla och licens <span>Wikimedia Commons</span>
              </a>
            )}
          </aside>
        </div>
      )}
    </main>
  )
}

export default App