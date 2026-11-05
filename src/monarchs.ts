export type Monarch = {
  id: string
  name: string
  byname?: string
  reign: string
  start: number
  end?: number
  house: string
  parents: [string, string]
  parentId?: string
  fact: string
  motto?: string
}

type MonarchRecord = Omit<Monarch, 'parents'> & { parent: string }

const monarchRecords: MonarchRecord[] = [
  {
    id: 'erik-segersall', name: 'Erik Segersäll', byname: 'Segersäll', reign: 'ca 970–995', start: 970, end: 995,
    house: 'Munsöätten', parent: 'Okänd', fact: 'En av de tidigaste kungarna som brukar räknas till Sveriges regentlängd. Hans regeringstid och rike är omdiskuterade i de äldsta källorna.',
  },
  {
    id: 'olof-skotkonung', name: 'Olof Skötkonung', byname: 'Skötkonung', reign: 'ca 995–1022', start: 995, end: 1022,
    house: 'Munsöätten', parent: 'Erik Segersäll', parentId: 'erik-segersall', fact: 'Sveriges första kristna kung enligt traditionen. De första svenska mynten präglades under hans regering.',
  },
  {
    id: 'anund-jakob', name: 'Anund Jakob', reign: 'ca 1022–1050', start: 1022, end: 1050,
    house: 'Munsöätten', parent: 'Olof Skötkonung', parentId: 'olof-skotkonung', fact: 'Son till Olof Skötkonung. Han stödde den norske kungen Olav Haraldsson och fick tillnamnet Kolbränna i nordiska källor.',
  },
  {
    id: 'emund-gamle', name: 'Emund den gamle', byname: 'den gamle', reign: 'ca 1050–1060', start: 1050, end: 1060,
    house: 'Munsöätten', parent: 'Olof Skötkonung', parentId: 'olof-skotkonung', fact: 'Olof Skötkonungs son och Anund Jakobs halvbror. Gränsdragningen mot Danmark dokumenterades under hans tid.',
  },
  {
    id: 'stenkil', name: 'Stenkil', reign: 'ca 1060–1066', start: 1060, end: 1066,
    house: 'Stenkilätten', parent: 'Okänd; släktbanden är osäkra', fact: 'Inledde den ätt som fått sitt namn efter honom. Källorna om hans familj och exakta regeringstid är få.',
  },
  {
    id: 'halsten', name: 'Halsten', reign: 'ca 1067–1070', start: 1067, end: 1070,
    house: 'Stenkilätten', parent: 'Stenkil', parentId: 'stenkil', fact: 'Stenkils son. Regerade enligt vissa källor tillsammans med sin bror Inge den äldre.',
  },
  {
    id: 'inge-aldre', name: 'Inge den äldre', byname: 'den äldre', reign: 'ca 1079–1110', start: 1079, end: 1110,
    house: 'Stenkilätten', parent: 'Stenkil', parentId: 'stenkil', fact: 'Förknippas med kristnandet av Sverige och med att ha avsatt den hedniske kungen Blot-Sven.',
  },
  {
    id: 'filip', name: 'Filip', reign: 'ca 1110–1118', start: 1110, end: 1118,
    house: 'Stenkilätten', parent: 'Halsten', parentId: 'halsten', fact: 'Halstens son. Hans regeringstid var kort och de bevarade uppgifterna om honom är begränsade.',
  },
  {
    id: 'inge-yngre', name: 'Inge den yngre', byname: 'den yngre', reign: 'ca 1118–1125', start: 1118, end: 1125,
    house: 'Stenkilätten', parent: 'Troligen Halsten', fact: 'En av de sista kungarna ur Stenkilätten. Uppgifterna om släktband och regeringstid varierar mellan källor.',
  },
  {
    id: 'sverker-1', name: 'Sverker den äldre', byname: 'den äldre', reign: 'ca 1130–1156', start: 1130, end: 1156,
    house: 'Sverkerska ätten', parent: 'Kornube (enligt traditionen)', fact: 'Grundade den Sverkerska kungalinjen. Under hans tid stärktes kyrkans organisation i Sverige.',
  },
  {
    id: 'erik-9', name: 'Erik den helige', byname: 'Erik IX', reign: 'ca 1156–1160', start: 1156, end: 1160,
    house: 'Erikska ätten', parent: 'Jedvard (enligt traditionen)', fact: 'Senare vördad som Sveriges skyddshelgon. Den så kallade Eriksgatan, kungens resa genom riket, knyts till hans namn i traditionen.',
  },
  {
    id: 'magnus-henriksson', name: 'Magnus Henriksson', reign: 'ca 1160–1161', start: 1160, end: 1161,
    house: 'Magnus Henrikssons ätt', parent: 'Henrik Skadelår', fact: 'Regerade kort efter Erik den heliges död. Hans ställning som kung har diskuterats av historiker.',
  },
  {
    id: 'karl-7', name: 'Karl Sverkersson', byname: 'Karl VII', reign: '1161–1167', start: 1161, end: 1167,
    house: 'Sverkerska ätten', parent: 'Sverker den äldre', parentId: 'sverker-1', fact: 'Sverker den äldres son. Han stupade på Visingsö i en konflikt med Knut Eriksson.',
  },
  {
    id: 'knut-eriksson', name: 'Knut Eriksson', reign: 'ca 1167–1195', start: 1167, end: 1195,
    house: 'Erikska ätten', parent: 'Erik den helige', parentId: 'erik-9', fact: 'Knut Eriksson konsoliderade kungamakten efter oroliga tronstrider. Han lät bygga en av de tidigaste kända svenska borgarna.',
  },
  {
    id: 'sverker-2', name: 'Sverker den yngre', byname: 'Sverker II', reign: '1196–1208', start: 1196, end: 1208,
    house: 'Sverkerska ätten', parent: 'Karl Sverkersson', parentId: 'karl-7', fact: 'Återförde den Sverkerska ätten till tronen. Han besegrades av Erik Knutsson vid slaget vid Lena.',
  },
  {
    id: 'erik-10', name: 'Erik Knutsson', byname: 'Erik X', reign: '1208–1216', start: 1208, end: 1216,
    house: 'Erikska ätten', parent: 'Knut Eriksson', parentId: 'knut-eriksson', fact: 'Den förste svenske kung som med säkerhet kröntes. Hans son Erik Eriksson föddes efter hans död.',
  },
  {
    id: 'johan-1', name: 'Johan Sverkersson', byname: 'Johan I', reign: '1216–1222', start: 1216, end: 1222,
    house: 'Sverkerska ätten', parent: 'Sverker den yngre', parentId: 'sverker-2', fact: 'Sverker den yngres son. Dog ung och utan arvingar, varefter Erikska ätten återkom på tronen.',
  },
  {
    id: 'erik-11', name: 'Erik Eriksson', byname: 'Erik XI', reign: '1222–1250', start: 1222, end: 1250,
    house: 'Erikska ätten', parent: 'Erik Knutsson', parentId: 'erik-10', fact: 'Kallades "läspe och halte" i äldre historieskrivning. Han var den sista kungen ur Erikska ätten.',
  },
  {
    id: 'valdemar', name: 'Valdemar Birgersson', reign: '1250–1275', start: 1250, end: 1275,
    house: 'Bjälboätten', parent: 'Birger jarl', fact: 'Valdes till kung som barn. Hans far Birger jarl styrde riket som förmyndare och genomförde viktiga lagreformer.',
  },
  {
    id: 'magnus-ladulas', name: 'Magnus Ladulås', byname: 'Ladulås', reign: '1275–1290', start: 1275, end: 1290,
    house: 'Bjälboätten', parent: 'Birger jarl', fact: 'Avskaffade gästningsskyldigheten för stormän, en reform som förknippas med hans tillnamn. Han grundade franciskanerklostret i Stockholm.',
  },
  {
    id: 'birger-magnusson', name: 'Birger Magnusson', reign: '1290–1318', start: 1290, end: 1318,
    house: 'Bjälboätten', parent: 'Magnus Ladulås', parentId: 'magnus-ladulas', fact: 'Bjälboättens siste kung. Konflikten med bröderna Erik och Valdemar slutade med Nyköpings gästabud och Birgers landsflykt.',
  },
  {
    id: 'magnus-eriksson', name: 'Magnus Eriksson', reign: '1319–1364', start: 1319, end: 1364,
    house: 'Bjälboätten', parent: 'Hertig Erik Magnusson', fact: 'Valdes till kung som treåring och regerade även över Norge. Landslagen som bär hans namn samlade rikets lagstiftning.',
  },
  {
    id: 'albrekt-meklenburg', name: 'Albrekt av Mecklenburg', reign: '1364–1389', start: 1364, end: 1389,
    house: 'Mecklenburgska ätten', parent: 'Albrekt II av Mecklenburg', fact: 'Valdes till kung av de svenska stormännen. Drottning Margareta besegrade hans styrkor vid Falköping 1389.',
  },
  {
    id: 'margareta', name: 'Drottning Margareta', reign: '1389–1412', start: 1389, end: 1412,
    house: 'Estridska ätten', parent: 'Valdemar Atterdag av Danmark', fact: 'Samlade Danmark, Norge och Sverige i Kalmarunionen. Hon styrde unionen som regent fram till sin död.',
  },
  {
    id: 'erik-pommern', name: 'Erik av Pommern', reign: '1396–1439', start: 1396, end: 1439,
    house: 'Griffinska ätten', parent: 'Hertig Vartislav VII av Pommern', fact: 'Margaretas systerdotterson och utvald unionskung. Han regerade över de nordiska rikena i Kalmarunionen.',
  },
  {
    id: 'kristoffer-bayern', name: 'Kristoffer av Bayern', reign: '1441–1448', start: 1441, end: 1448,
    house: 'Wittelsbachska ätten', parent: 'Johan av Pfalz-Neumarkt', fact: 'Valdes till kung i alla tre unionsländerna. Under hans tid kom Kristofers landslag att gälla i Sverige.',
  },
  {
    id: 'karl-knutsson', name: 'Karl Knutsson Bonde', reign: '1448–1457, 1464–1465, 1467–1470', start: 1448, end: 1470,
    house: 'Bondeska ätten', parent: 'Knut Tordsson Bonde', fact: 'Valdes till kung tre gånger under striderna om Kalmarunionen. Hans gravmonument finns i Riddarholmskyrkan.',
  },
  {
    id: 'kristian-1', name: 'Kristian I', reign: '1457–1464', start: 1457, end: 1464,
    house: 'Oldenburgska ätten', parent: 'Didrik den lycklige av Oldenburg', fact: 'Kalmarunionens kung och grundare av universitetet i Köpenhamn. Hans svenska regeringstid präglades av återkommande uppror.',
  },
  {
    id: 'johan-2', name: 'Johan II', byname: 'Hans', reign: '1497–1501', start: 1497, end: 1501,
    house: 'Oldenburgska ätten', parent: 'Kristian I', parentId: 'kristian-1', fact: 'Dansk kung som återupprättade unionen med Sverige under några år. Han förlorade den svenska kronan efter ett uppror.',
  },
  {
    id: 'kristian-2', name: 'Kristian II', reign: '1520–1521', start: 1520, end: 1521,
    house: 'Oldenburgska ätten', parent: 'Johan II', parentId: 'johan-2', fact: 'Hans kröning följdes av Stockholms blodbad 1520. Upproret under Gustav Vasa ledde till att den svenska unionstiden tog slut.',
  },
  {
    id: 'gustav-vasa', name: 'Gustav Vasa', reign: '1523–1560', start: 1523, end: 1560,
    house: 'Vasaätten', parent: 'Erik Johansson Vasa', fact: 'Valdes till kung 1523. Reformationen och arvsmonarkin genomfördes under hans regering, och Sverige lämnade Kalmarunionen.',
  },
  {
    id: 'erik-14', name: 'Erik XIV', reign: '1560–1568', start: 1560, end: 1568,
    house: 'Vasaätten', parent: 'Gustav Vasa', parentId: 'gustav-vasa', fact: 'Gustav Vasas äldste son. Han avsattes av sina bröder och tillbringade sina sista år som fånge.',
  },
  {
    id: 'johan-3', name: 'Johan III', reign: '1568–1592', start: 1568, end: 1592,
    house: 'Vasaätten', parent: 'Gustav Vasa', parentId: 'gustav-vasa', fact: 'Gustav Vasas son och byggherre bakom flera renässansombyggnader, däribland på Kalmar slott.',
  },
  {
    id: 'sigismund', name: 'Sigismund', reign: '1592–1599', start: 1592, end: 1599,
    house: 'Vasaätten', parent: 'Johan III', parentId: 'johan-3', fact: 'Var samtidigt kung av Polen. Han avsattes efter en maktkamp med sin farbror hertig Karl.',
  },
  {
    id: 'karl-9', name: 'Karl IX', reign: '1604–1611', start: 1604, end: 1611,
    house: 'Vasaätten', parent: 'Gustav Vasa', parentId: 'gustav-vasa', fact: 'Gustav Vasas yngste son. Han styrde som riksföreståndare innan han formellt blev kung.',
  },
  {
    id: 'gustav-2-adolf', name: 'Gustav II Adolf', reign: '1611–1632', start: 1611, end: 1632,
    house: 'Vasaätten', parent: 'Karl IX', parentId: 'karl-9', fact: 'Ledde Sverige in i trettioåriga kriget och stupade vid Lützen 1632. Han kallas ofta "den store" i svensk historieskrivning.',
  },
  {
    id: 'kristina', name: 'Drottning Kristina', reign: '1632–1654', start: 1632, end: 1654,
    house: 'Vasaätten', parent: 'Gustav II Adolf', parentId: 'gustav-2-adolf', fact: 'Efterträdde sin far som sexåring. Hon abdikerade 1654 och konverterade senare till katolicismen.',
  },
  {
    id: 'karl-10-gustav', name: 'Karl X Gustav', reign: '1654–1660', start: 1654, end: 1660,
    house: 'Pfalziska ätten', parent: 'Johan Kasimir av Pfalz-Zweibrücken', fact: 'Inledde den Pfalziska kungalinjen. Under hans regering utvidgades Sveriges territorium genom freden i Roskilde.',
  },
  {
    id: 'karl-11', name: 'Karl XI', reign: '1660–1697', start: 1660, end: 1697,
    house: 'Pfalziska ätten', parent: 'Karl X Gustav', parentId: 'karl-10-gustav', fact: 'Genomförde reduktionen och införde det karolinska enväldet. Han moderniserade armén och förvaltningen.',
  },
  {
    id: 'karl-12', name: 'Karl XII', reign: '1697–1718', start: 1697, end: 1718,
    house: 'Pfalziska ätten', parent: 'Karl XI', parentId: 'karl-11', fact: 'Var kung under stora nordiska kriget. Han stupade vid Fredrikstens fästning i Norge 1718.',
  },
  {
    id: 'ulrika-eleonora', name: 'Ulrika Eleonora', reign: '1718–1720', start: 1718, end: 1720,
    house: 'Pfalziska ätten', parent: 'Karl XI', parentId: 'karl-11', fact: 'Karl XII:s syster och Sveriges sista regerande drottning. Hon avstod kronan till sin make Fredrik I.',
  },
  {
    id: 'fredrik-1', name: 'Fredrik I', reign: '1720–1751', start: 1720, end: 1751,
    house: 'Hessiska ätten', parent: 'Karl I av Hessen-Kassel', fact: 'Ulrika Eleonoras make. Hans tid på tronen sammanföll med frihetstiden, då riksdagen hade den starkaste politiska makten.',
  },
  {
    id: 'adolf-fredrik', name: 'Adolf Fredrik', reign: '1751–1771', start: 1751, end: 1771,
    house: 'Holstein-Gottorpska ätten', parent: 'Kristian August av Holstein-Gottorp', fact: 'Valdes till tronföljare med ryskt stöd. Under hans regeringstid inträffade den misslyckade statskuppen 1756.',
  },
  {
    id: 'gustav-3', name: 'Gustav III', reign: '1771–1792', start: 1771, end: 1792,
    house: 'Holstein-Gottorpska ätten', parent: 'Adolf Fredrik', parentId: 'adolf-fredrik', fact: 'Återtog makt från riksdagen genom statskuppen 1772. Han grundade Svenska Akademien och Operan.',
  },
  {
    id: 'gustav-4-adolf', name: 'Gustav IV Adolf', reign: '1792–1809', start: 1792, end: 1809,
    house: 'Holstein-Gottorpska ätten', parent: 'Gustav III', parentId: 'gustav-3', fact: 'Avsattes efter förlusten av Finland i finska kriget. Han levde därefter i landsflykt under namnet överste Gustafsson.',
  },
  {
    id: 'karl-13', name: 'Karl XIII', reign: '1809–1818', start: 1809, end: 1818,
    house: 'Holstein-Gottorpska ätten', parent: 'Adolf Fredrik', parentId: 'adolf-fredrik', fact: 'Gustav IV Adolfs farbror. Han adopterade Jean Baptiste Bernadotte som tronföljare.',
  },
  {
    id: 'karl-14-johan', name: 'Karl XIV Johan', reign: '1818–1844', start: 1818, end: 1844,
    house: 'Bernadotteätten', parent: 'Jean Henri Bernadotte', motto: 'Folkets kärlek min belöning', fact: 'Född i Frankrike som Jean Baptiste Bernadotte. Som kronprins ledde han Sverige i unionen med Norge.',
  },
  {
    id: 'oscar-1', name: 'Oscar I', reign: '1844–1859', start: 1844, end: 1859,
    house: 'Bernadotteätten', parent: 'Karl XIV Johan', parentId: 'karl-14-johan', fact: 'Född i Paris som son till Karl XIV Johan. Under hans regering genomfördes flera sociala reformer, bland annat lika arvsrätt.',
  },
  {
    id: 'karl-15', name: 'Karl XV', reign: '1859–1872', start: 1859, end: 1872,
    house: 'Bernadotteätten', parent: 'Oscar I', parentId: 'oscar-1', fact: 'Känd som konstnär och folklig regent. Han var den siste svenske kungen som kröntes i Norge.',
  },
  {
    id: 'oscar-2', name: 'Oscar II', reign: '1872–1907', start: 1872, end: 1907,
    house: 'Bernadotteätten', parent: 'Oscar I', parentId: 'oscar-1', motto: 'Brödrafolkens väl', fact: 'Karl XV:s yngre bror. Unionen mellan Sverige och Norge upplöstes fredligt under hans regering 1905.',
  },
  {
    id: 'gustav-5', name: 'Gustav V', reign: '1907–1950', start: 1907, end: 1950,
    house: 'Bernadotteätten', parent: 'Oscar II', parentId: 'oscar-2', motto: 'Med folket för fosterlandet', fact: 'Den förste svenske kungen som avstod från kröning. Hans regeringstid sträckte sig över båda världskrigen.',
  },
  {
    id: 'gustav-6-adolf', name: 'Gustav VI Adolf', reign: '1950–1973', start: 1950, end: 1973,
    house: 'Bernadotteätten', parent: 'Gustav V', parentId: 'gustav-5', motto: 'Plikten framför allt', fact: 'Arkeolog och hängiven botaniker. Hans långa regering bidrog till övergången till en mer ceremoniell roll för monarkin.',
  },
  {
    id: 'carl-16-gustaf', name: 'Carl XVI Gustaf', reign: '1973–', start: 1973,
    house: 'Bernadotteätten', parent: 'Arvprins Gustav Adolf, hertig av Västerbotten', motto: 'För Sverige – i tiden', fact: 'Sveriges nuvarande kung. Successionsordningen ändrades 1980 till full kognatisk tronföljd, vilket gjorde kronprinsessan Victoria till tronföljare.',
  },
]

const mothersById: Record<string, string> = {
  'erik-segersall': 'Okänd',
  'olof-skotkonung': 'Sigrid Storråda (osäkert)',
  'anund-jakob': 'Estrid av obotriterna',
  'emund-gamle': 'Edla',
  stenkil: 'Okänd; uppgifterna är osäkra',
  halsten: 'Okänd',
  'inge-aldre': 'Okänd',
  filip: 'Okänd',
  'inge-yngre': 'Okänd; uppgifterna är osäkra',
  'sverker-1': 'Okänd',
  'erik-9': 'Cecilia (osäkert)',
  'magnus-henriksson': 'Ingeborg',
  'karl-7': 'Ulfhild Håkansdotter',
  'knut-eriksson': 'Kristina Björnsdotter',
  'sverker-2': 'Cecilia Johansdotter',
  'erik-10': 'Okänd',
  'johan-1': 'Ingegerd Birgersdotter',
  'erik-11': 'Rikissa av Danmark',
  valdemar: 'Ingeborg Eriksdotter',
  'magnus-ladulas': 'Ingeborg Eriksdotter',
  'birger-magnusson': 'Helvig av Holstein',
  'magnus-eriksson': 'Ingeborg Håkansdotter',
  'albrekt-meklenburg': 'Eufemia av Sverige',
  margareta: 'Helvig av Schleswig',
  'erik-pommern': 'Maria av Mecklenburg',
  'kristoffer-bayern': 'Katarina av Pommern',
  'karl-knutsson': 'Margareta Karlsdotter',
  'kristian-1': 'Hedvig av Schleswig-Holstein',
  'johan-2': 'Dorotea av Brandenburg',
  'kristian-2': 'Kristina av Sachsen',
  'gustav-vasa': 'Cecilia Månsdotter',
  'erik-14': 'Katarina av Sachsen-Lauenburg',
  'johan-3': 'Margareta Leijonhufvud',
  sigismund: 'Katarina Jagellonica',
  'karl-9': 'Margareta Leijonhufvud',
  'gustav-2-adolf': 'Kristina av Holstein-Gottorp',
  kristina: 'Maria Eleonora av Brandenburg',
  'karl-10-gustav': 'Katarina av Sverige',
  'karl-11': 'Hedvig Eleonora av Holstein-Gottorp',
  'karl-12': 'Ulrika Eleonora av Danmark',
  'ulrika-eleonora': 'Ulrika Eleonora av Danmark',
  'fredrik-1': 'Maria Amalia av Kurland',
  'adolf-fredrik': 'Albertina Fredrika av Baden-Durlach',
  'gustav-3': 'Lovisa Ulrika av Preussen',
  'gustav-4-adolf': 'Sofia Magdalena av Danmark',
  'karl-13': 'Lovisa Ulrika av Preussen',
  'karl-14-johan': 'Jeanne de Saint-Jean',
  'oscar-1': 'Desideria',
  'karl-15': 'Josefina av Leuchtenberg',
  'oscar-2': 'Josefina av Leuchtenberg',
  'gustav-5': 'Sofia av Nassau',
  'gustav-6-adolf': 'Victoria av Baden',
  'carl-16-gustaf': 'Sibylla av Sachsen-Coburg-Gotha',
}

export const monarchs: Monarch[] = monarchRecords.map(({ parent, ...monarch }) => ({
  ...monarch,
  parents: [parent, mothersById[monarch.id] ?? 'Okänd'],
}))

export const imageArticleById: Record<string, string> = {
  margareta: 'Margareta Valdemarsdotter',
  'johan-2': 'Hans av Danmark',
  kristina: 'Drottning Kristina',
}

export const houseColors: Record<string, string> = {
  'Munsöätten': '#c68752',
  'Stenkilätten': '#64a89d',
  'Sverkerska ätten': '#cb7182',
  'Erikska ätten': '#8ea85f',
  'Magnus Henrikssons ätt': '#ad8ac0',
  'Bjälboätten': '#d29d45',
  'Mecklenburgska ätten': '#5f9ac2',
  'Estridska ätten': '#d27455',
  'Griffinska ätten': '#7bad7d',
  'Wittelsbachska ätten': '#c46fa2',
  'Bondeska ätten': '#7c90c7',
  'Oldenburgska ätten': '#a7a84f',
  'Vasaätten': '#5fac8d',
  'Pfalziska ätten': '#df8651',
  'Hessiska ätten': '#6199a7',
  'Holstein-Gottorpska ätten': '#bf6c63',
  'Bernadotteätten': '#c6a34d',
}

export const houseDetails: Record<string, { years: string; note: string; tone: string }> = {
  'Bernadotteätten': { years: '1818–nu', note: 'En fransk marskalk blev stamfar till den nuvarande kungafamiljen.', tone: 'rose' },
  'Holstein-Gottorpska ätten': { years: '1751–1818', note: 'Tre generationer med rötter i ett nordtyskt hertigdöme.', tone: 'blue' },
  'Hessiska ätten': { years: '1720–1751', note: 'Fredrik I förde den hessiska linjen till den svenska tronen.', tone: 'green' },
  'Pfalziska ätten': { years: '1654–1720', note: 'En sidolinje till Wittelsbachs hus, genom Karl X Gustavs mor.', tone: 'gold' },
  'Vasaätten': { years: '1523–1654', note: 'Gustav Vasa och hans barn formade en ny svensk stormakt.', tone: 'green' },
  'Oldenburgska ätten': { years: '1457–1523', note: 'Danska kungar under Kalmarunionens sista sekel.', tone: 'blue' },
  'Bjälboätten': { years: '1250–1364', note: 'Birger jarls släkt, också kallad Folkungaätten.', tone: 'rose' },
  'Sverkerska ätten': { years: 'ca 1130–1222', note: 'Delade kronan med den Erikska ätten under flera generationer.', tone: 'gold' },
  'Erikska ätten': { years: 'ca 1156–1250', note: 'Kungar som räknade släktskap med Erik den helige.', tone: 'green' },
  'Munsöätten': { years: 'ca 970–1060', note: 'De äldsta regenterna har osäkra släktband och dateringar.', tone: 'blue' },
}