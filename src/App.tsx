import { useEffect, useState, type CSSProperties } from 'react'
import { Crown, Search, X } from 'lucide-react'
import { houseColors, houseDetails, imageArticleById, monarchs, type Monarch } from './monarchs'
import './App.css'

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

const historicalPeriods = [
  { title: 'Bernadotteätten', years: '1809–i dag', start: 1809, end: Infinity, summary: 'Jean Baptiste Bernadotte valdes till svensk tronföljare 1810. Sverige och Norge var i union till 1905; dagens kung har främst representativa uppgifter.' },
  { title: 'Frihetstid och gustaviansk tid', years: '1718–1809', start: 1718, end: 1809, summary: 'Efter Karl XII:s död fick riksdagen större makt. Gustav III återtog en del av den genom statskuppen 1772.' },
  { title: 'Stormaktstiden', years: '1611–1718', start: 1611, end: 1718, summary: 'Sverige byggde upp ett välde kring Östersjön och deltog i trettioåriga kriget. Det stora nordiska kriget avslutade stormaktstiden.' },
  { title: 'Vasatiden', years: '1523–1611', start: 1523, end: 1611, summary: 'Gustav Vasa bröt med Kalmarunionen. Reformationen och arvsmonarkin förändrade kyrkan och statens organisation.' },
  { title: 'Medeltid och unionsstrider', years: '1250–1523', start: 1250, end: 1523, summary: 'Birger jarl och hans söner stärkte kungamakten. Kalmarunionen förenade de nordiska rikena från 1397, men Sverige gjorde upprepade uppror mot unionsstyret.' },
  { title: 'Tidiga kungar', years: 'ca 970–1250', start: 0, end: 1250, summary: 'Källorna om de tidigaste kungarna är få och osäkra. Under perioden växte kungamakten fram samtidigt som kristendomen etablerades.' },
] as const

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
  loading = 'lazy',
}: {
  monarch: Monarch
  image?: Portrait
  className: string
  loading?: 'eager' | 'lazy'
}) {
  return image ? (
    <img className={className} src={image.src} alt={`Historisk bild: ${monarch.name}`} loading={loading} />
  ) : (
    <div className={`${className} portrait-placeholder`} aria-label={`Bild saknas för ${monarch.name}`}>
      <Crown size={22} strokeWidth={1.4} />
    </div>
  )
}

function App() {
  const [query, setQuery] = useState('')
  const [selected, setSelected] = useState<Monarch | null>(null)
  const [imageById, setImageById] = useState<Record<string, Portrait>>({})

  useEffect(() => {
    let active = true
    loadPortraits().then((images) => {
      if (active) setImageById(images)
    }).catch(() => undefined)
    return () => { active = false }
  }, [])

  const normalizedQuery = query.trim().toLocaleLowerCase('sv-SE')
  const filteredMonarchs = [...monarchs]
    .sort((left, right) => right.start - left.start)
    .filter((monarch) => !normalizedQuery || `${monarch.name} ${monarch.byname ?? ''} ${monarch.house} ${monarch.reign}`
      .toLocaleLowerCase('sv-SE').includes(normalizedQuery))

  const timelineGroups = historicalPeriods
    .map((period) => ({ ...period, members: filteredMonarchs.filter((monarch) => monarch.start >= period.start && monarch.start < period.end) }))
    .filter(({ members }) => members.length > 0)
  const eagerPortraitIds = new Set(filteredMonarchs.slice(0, 4).map(({ id }) => id))

  return (
    <main className="app-shell">
      <header className="masthead">
        <h1>Sveriges monarker</h1>
      </header>

      <div className="control-bar" aria-label="Tidslinjefilter">
        <label className="search-field">
          <Search size={16} aria-hidden="true" />
          <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Sök monark eller ätt" aria-label="Sök monark eller ätt" />
          {query && <button className="clear-search" type="button" onClick={() => setQuery('')} aria-label="Rensa sökning"><X size={15} /></button>}
        </label>
      </div>

      <div className="timeline-eras" aria-label="Sveriges regenter indelade efter historisk period">
        {timelineGroups.map(({ title, years, summary, members }) => {
          const houseGroups = [...new Set(members.map((monarch) => monarch.house))].map((house) => ({
            house,
            note: houseDetails[house]?.note,
            members: members.filter((monarch) => monarch.house === house),
          }))

          return (
            <section className="timeline-era" key={title}>
              <header className="era-heading">
                <span className="era-years">{years}</span>
                <h2>{title}</h2>
                <p>{summary}</p>
              </header>
              {houseGroups.map(({ house, note, members: houseMembers }) => {
                const colorStyle = { '--house-color': houseColors[house] } as CSSProperties
                return (
                  <section className="house-section" key={house}>
                    <header className="house-heading" style={colorStyle}>
                      <h3>{house}</h3>
                      {note && <p>{note}</p>}
                    </header>
                    <ol className="timeline-list" aria-label={`${house}, nyast överst`}>
                      {houseMembers.map((monarch) => {
                        const image = imageById[monarch.id]
                        const monarchColorStyle = { '--house-color': houseColors[monarch.house] } as CSSProperties
                        return (
                          <li className="timeline-item" key={monarch.id}>
                            <button className="timeline-card" type="button" style={monarchColorStyle} onClick={() => setSelected(monarch)}>
                              <PortraitImage monarch={monarch} image={image} className="monarch-portrait" loading={eagerPortraitIds.has(monarch.id) ? 'eager' : 'lazy'} />
                              <span className="timeline-card-main">
                                <span className="reign-date">{monarch.reign}</span>
                                <span className="monarch-name">{monarch.name}</span>
                                <span className="monarch-house">{monarch.house}</span>
                              </span>
                              <span className="parents-list">
                                <span><b>Far</b>{monarch.parents[0]}</span>
                                <span><b>Mor</b>{monarch.parents[1]}</span>
                              </span>
                              <span className="timeline-card-fact">
                                {monarch.motto && <span className="monarch-motto"><b>VALSPRÅK</b> ”{monarch.motto}”</span>}
                                <span>{monarch.fact}</span>
                              </span>
                            </button>
                          </li>
                        )
                      })}
                    </ol>
                  </section>
                )
              })}
            </section>
          )
        })}
        {filteredMonarchs.length === 0 && <p className="empty-results">Inga monarker matchar sökningen.</p>}
      </div>

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
            {selected.motto && <div className="detail-motto"><b>Valspråk</b> ”{selected.motto}”</div>}
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