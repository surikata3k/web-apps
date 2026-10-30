// =====================================================================
//  Nivells i textos de pràctica
// =====================================================================

// Paraules catalanes senzilles (sense accents) per a la pràctica
const PARAULES = (
  'ja la sal sala salsa gall falla fada gala dalla llaga alga saga gas ' +
  'casa gat gos pa mar sol lluna aigua foc terra mare pare avi iaia nen nena escola llibre llapis ' +
  'taula cadira porta finestra arbre flor fruita poma pera taronja llet sopa dia nit any mes joc ' +
  'pilota bici cotxe tren vaixell riu muntanya bosc camp ciutat poble carrer amic amiga gran petit ' +
  'alt baix nou vell bo bona blau verd vermell groc negre blanc rosa gris menjar beure jugar saltar ' +
  'llegir escriure dibuixar cantar ballar dormir riure parlar mirar teclat pantalla ordinador lletra ' +
  'paraula frase mans dits peu cap ull nas boca orella cor sala fulla gel pluja neu vent estel ' +
  'tigre ovella vaca porc cavall conill peix ocell formiga abella papallona ' +
  'dit fet dir tres sis set deu tu jo ell ella si sense sota sobre dalt fora dins ' +
  'gela sega guix suc fil fila fira girafa hora hola idea illa ritme regla full tasca tassa ' +
  'pedra seda tela delit desig fideus guerra tia tot totes ruta rata res tresor ' +
  'quatre quinze queda pes pots poder porta puja peix pipa'
).split(' ');

const PARAULES_ACCENT_OBERT = ['àvia', 'mà', 'sofà', 'germà', 'cafè', 'què', 'perquè', 'això', 'allò', 'història', 'fàcil', 'pèsol', 'demà', 'pròxim', 'màgia', 'òliba', 'cèntim', 'sèrie'];
const PARAULES_ACCENT_TANCAT = ['també', 'només', 'avió', 'camió', 'cançó', 'música', 'pastís', 'aquí', 'així', 'difícil', 'ratolí', 'cosí', 'ós', 'balcó', 'pingüí', 'raïm', 'veïna', 'línia'];
const PARAULES_APOSTROF = ["l'avi", "l'escola", "d'aigua", "l'arbre", "m'agrada", "s'ha", "d'or", "l'ocell", 'col·legi', 'il·lusió', 'cel·la', 'intel·ligent', 'col·lecció', 'pel·lícula'];
const NOMS = ['Anna', 'Pau', 'Marc', 'Laia', 'Joan', 'Martina', 'Oriol', 'Nil', 'Carla', 'Arnau', 'Ona', 'Biel'];

const FRASES = [
  'El gat dorm al sofà.',
  "M'agrada jugar amb els amics.",
  'Avui fa sol i anem a la platja.',
  'La meva germana llegeix un llibre.',
  'Escric amb tots els dits.',
  'El gos corre pel parc.',
  "Demà anirem a l'escola en bicicleta.",
  'La lluna surt de nit.',
  "Aprenc a escriure amb l'ordinador.",
  "Els ocells canten a l'arbre.",
  'Tinc una pilota vermella.',
  'A la tardor cauen les fulles.',
  'El tren arriba a les cinc.',
  "L'àvia fa un pastís de poma.",
  'Quan plou, saltem als bassals.',
];

// Cada nivell: títol, tecles noves, mode i explicació
const NIVELLS = [
  { titol: 'F i J', noves: 'fj', mode: 'exercici', desc: 'Posa els dits índexs sobre la F i la J. Tenen un petit relleu: així les trobaràs sense mirar!' },
  { titol: 'D i K', noves: 'dk', mode: 'exercici', desc: 'Els dits del mig van a la D i a la K.' },
  { titol: 'S i L', noves: 'sl', mode: 'exercici', desc: 'Els dits anulars van a la S i a la L.' },
  { titol: 'A i Ñ', noves: 'añ', mode: 'exercici', desc: 'Els dits petits van a la A i a la Ñ.' },
  { titol: 'G i H', noves: 'gh', mode: 'exercici', desc: "Els índexs s'estiren cap al centre: la G amb l'esquerre i la H amb el dret. Ja tens tota la fila base!" },
  { titol: 'Repàs fila base', noves: '', mode: 'repas', desc: 'Practiquem totes les tecles de la fila base. Recorda: els dits sempre tornen a casa.' },
  { titol: 'E i I', noves: 'ei', mode: 'exercici', desc: 'Puja el dit del mig: la E amb la mà esquerra i la I amb la dreta. Després torna a casa!' },
  { titol: 'R i U', noves: 'ru', mode: 'exercici', desc: "Els índexs pugen: la R amb l'esquerre i la U amb el dret." },
  { titol: 'T i Y', noves: 'ty', mode: 'exercici', desc: "Els índexs pugen i s'estiren cap al centre: la T i la Y." },
  { titol: 'W i O', noves: 'wo', mode: 'exercici', desc: 'Els anulars pugen: la W amb la mà esquerra i la O amb la dreta.' },
  { titol: 'Q i P', noves: 'qp', mode: 'exercici', desc: 'Els dits petits pugen: la Q i la P.' },
  { titol: 'Repàs fila superior', noves: '', mode: 'repas', desc: 'Ja coneixes dues files! Escriu paraules amb totes aquestes lletres.' },
  { titol: 'C i coma', noves: 'c,', mode: 'exercici', desc: 'Els dits del mig baixen: la C amb la mà esquerra i la coma amb la dreta.' },
  { titol: 'V i M', noves: 'vm', mode: 'exercici', desc: "Els índexs baixen: la V amb l'esquerre i la M amb el dret." },
  { titol: 'B i N', noves: 'bn', mode: 'exercici', desc: "Els índexs baixen i s'estiren cap al centre: la B i la N." },
  { titol: 'X, Z i punt', noves: 'xz.', mode: 'exercici', desc: "La X amb l'anular esquerre, la Z amb el dit petit esquerre i el punt amb l'anular dret." },
  { titol: 'Ç i guionet', noves: 'ç-', mode: 'exercici', desc: 'El dit petit dret fa la Ç (a la fila base) i el guionet (a baix).' },
  { titol: 'Paraules', noves: '', mode: 'paraules', desc: 'Ja coneixes totes les lletres! Ara escriu paraules senceres.' },
  { titol: 'Majúscules', noves: '', mode: 'majuscules', desc: "Per fer una majúscula, mantén premuda la tecla Majúscules amb el dit petit de l'altra mà i prem la lletra." },
  { titol: 'Accents oberts: à è ò', noves: '', mode: 'llista', llista: () => PARAULES_ACCENT_OBERT, desc: "Prem primer la tecla de l'accent obert ( ` ) amb el dit petit dret, deixa-la anar, i després prem la vocal." },
  { titol: 'Accents tancats i dièresi', noves: '', mode: 'llista', llista: () => PARAULES_ACCENT_TANCAT, desc: "Per a é í ó ú prem primer l'accent tancat ( ´ ) i després la vocal. Per a la dièresi (ï ü), Majúscules + ´ i després la vocal." },
  { titol: "Apòstrof i ela geminada", noves: '', mode: 'llista', llista: () => PARAULES_APOSTROF, desc: "L'apòstrof ( ' ) és a dalt a la dreta, al costat del 0. El punt volat ( · ) és Majúscules + 3." },
  { titol: 'Números', noves: '', mode: 'numeros', desc: 'Els números són a la fila de dalt de tot. Cada dit puja des de la seva tecla de casa.' },
  { titol: 'Frases', noves: '', mode: 'frases', desc: 'Ara ja ho saps fer tot! Escriu frases completes amb majúscules, accents i punts.' },
];

// ---------------------------------------------------------------------
//  Seccions de la graella de nivells
// ---------------------------------------------------------------------
const SECCIONS = {
  inicial: { titol: 'Nivell inicial', desc: "Aprèn on és cada tecla i amb quin dit s'ha de prémer." },
  mitja: { titol: 'Nivell mitjà', desc: 'Textos curts amb majúscules, accents, signes de puntuació i números.' },
  avancat: { titol: 'Nivell avançat', desc: 'Textos llargs: contes, ciència, tradicions... Concentra\'t i escriu sense mirar el teclat!' },
};
NIVELLS.forEach((n) => (n.seccio = 'inicial'));

// ---------------------------------------------------------------------
//  Textos del nivell mitjà (2-4 frases)
// ---------------------------------------------------------------------
const NIVELLS_MITJANS = [
  {
    titol: 'Els animals',
    desc: 'Textos curts sobre animals. Escriu amb calma i sense mirar el teclat.',
    textos: [
      'El gat de la Laia es diu Mixu. Té el pèl negre i els ulls verds. Li agrada dormir al sol i, quan té gana, miola fort a la porta de la cuina.',
      'Les abelles viuen en ruscs i fan mel amb el nèctar de les flors. Són molt treballadores i ajuden les plantes a fer fruits.',
      'El pingüí és un ocell que no pot volar, però neda molt de pressa. Viu en llocs freds i menja peixos petits.',
      'Al bosc hi viuen esquirols, guineus i senglars. Si camines en silenci, potser veuràs un esquirol pujant per un pi.',
    ],
  },
  {
    titol: "L'escola",
    desc: 'Explica com és un dia a l\'escola. Recorda: l\'apòstrof és al costat del 0.',
    textos: [
      "Cada matí agafo la motxilla i vaig a l'escola caminant. A la classe hi ha vint-i-cinc nens i nenes, i la mestra es diu Montse.",
      'A l\'hora del pati juguem a pilota i a fet i amagar. Quan sona el timbre, fem una fila i tornem a la classe.',
      'Avui a matemàtiques hem après a multiplicar. Després hem llegit un conte i hem fet un dibuix del personatge que més ens ha agradat.',
    ],
  },
  {
    titol: 'Les estacions',
    desc: 'Primavera, estiu, tardor i hivern. Fixa\'t en les comes!',
    textos: [
      "A la primavera els arbres s'omplen de flors i els dies són més llargs. És l'època perfecta per anar d'excursió.",
      "A l'estiu fa calor i no hi ha escola. Anem a la platja, mengem gelats i ens banyem a la piscina.",
      'A la tardor cauen les fulles dels arbres i anem a buscar bolets. També mengem castanyes i panellets per la Castanyada.',
      "A l'hivern fa fred i de vegades neva a la muntanya. Ens posem la bufanda, els guants i el gorro per sortir al carrer.",
    ],
  },
  {
    titol: 'El menjar',
    desc: 'Esmorzar, dinar, berenar i sopar.',
    textos: [
      "Per esmorzar prenc un got de llet i una torrada amb oli. A l'hora de dinar m'agrada molt la sopa de galets.",
      'La fruita és molt bona per a la salut. Cada dia menjo una poma, un plàtan o una taronja per berenar.',
      "El diumenge l'avi fa una paella per a tota la família. Tots ajudem a parar taula i després rentem els plats.",
    ],
  },
  {
    titol: 'Preguntes i exclamacions',
    desc: "L'interrogant ( ? ) és Majúscules + apòstrof i l'exclamació ( ! ) és Majúscules + 1.",
    textos: [
      'Com et dius? Quants anys tens? On vius? Quin és el teu color preferit? Jo em dic Pau i m\'agrada el blau!',
      'Quin dia més bonic! Anem al parc? Sí, i portarem la pilota! Quina sort que no plogui avui!',
      'Has vist el meu llapis? No el trobo enlloc! Potser és a la motxilla. Ah, aquí és! Gràcies!',
    ],
  },
  {
    titol: 'Diàlegs',
    desc: 'Els dos punts ( : ) són Majúscules + punt, i les cometes ( " ) són Majúscules + 2.',
    textos: [
      'La mare va dir: "Recull la teva habitació." I jo vaig respondre: "D\'acord, ara mateix!"',
      'El mestre va preguntar: "Qui sap quina és la capital de Catalunya?" I la Júlia va dir: "Barcelona!"',
      'En Marc va cridar: "Mira, un arc de Sant Martí!" I tots vam sortir a la finestra per veure\'l.',
    ],
  },
  {
    titol: 'Números i dates',
    desc: 'Lletres i números barrejats. Els dits pugen a la fila de dalt i tornen a casa.',
    textos: [
      'Vaig néixer el 15 de març de 2017. Visc al número 24 del carrer Major i el meu telèfon té 9 xifres.',
      'A la classe som 25 alumnes: 13 nenes i 12 nens. Cada dia fem 5 hores de classe i 30 minuts de pati.',
      "Si tinc 10 caramels i en dono 3 a la meva germana i 2 al meu cosí, me'n queden 5.",
    ],
  },
  {
    titol: 'Esports i jocs',
    desc: 'Què t\'agrada fer en el temps lliure?',
    textos: [
      "M'encanta jugar a bàsquet amb els meus amics. Entrenem dos dies a la setmana i el dissabte fem partit.",
      'Quan plou ens quedem a casa i juguem a cartes, a escacs o fem un trencaclosques de mil peces.',
      'La meva cosina fa natació. Pot nedar cinquanta metres de crol molt de pressa i vol participar en una competició.',
    ],
  },
  {
    titol: 'La ciutat i el poble',
    desc: 'Descripcions de llocs. Atenció a les majúscules i als accents.',
    textos: [
      'A la ciutat hi ha molts cotxes, autobusos i edificis alts. També hi ha parcs, museus i biblioteques.',
      'El poble dels avis és petit i tranquil. Té una plaça amb una font, una església i un forn de pa on fan coques boníssimes.',
      'Per anar a la ciutat agafem el tren. El viatge dura mitja hora i des de la finestra veiem camps i muntanyes.',
    ],
  },
  {
    titol: 'Endevinalles',
    desc: 'Escriu les endevinalles... i la solució!',
    uneix: 2,
    textos: [
      'Endevina, endevinalla: té moltes dents però mai no mossega. Què és? La pinta!',
      "Endevina, endevinalla: com més n'hi treus, més gran es fa. Què és? Un forat!",
      'Endevina, endevinalla: té fulles però no és un arbre, té llom però no és un animal. Què és? Un llibre!',
      'Endevina, endevinalla: com més s\'asseca, més es mulla. Què és? La tovallola!',
    ],
  },
];

// ---------------------------------------------------------------------
//  Textos del nivell avançat (paràgrafs llargs)
// ---------------------------------------------------------------------
const NIVELLS_AVANCATS = [
  {
    titol: 'Contes',
    desc: 'Un conte llarg. Respira, posa els dits a casa i ves fent.',
    textos: [
      'Hi havia una vegada un drac que vivia en una cova, a dalt d\'una muntanya molt alta. Tothom al poble li tenia por, però ningú no sabia que el drac era molt poruc: s\'espantava dels trons, de les ombres i fins i tot de les papallones. Un dia, una nena valenta que es deia Clara va pujar fins a la cova amb una cistella de pomes. "No tinguis por", li va dir, "només vull ser la teva amiga." Des d\'aquell dia, el drac i la Clara van ser inseparables.',
      'La Sara i en Biel van trobar un mapa antic a les golfes de casa l\'àvia. Hi havia dibuixat un camí que sortia del jardí, passava per sota el pont vell i acabava al costat d\'un roure enorme. Van agafar una pala, una llanterna i uns entrepans, i van seguir les indicacions amb molta atenció. Després de caminar una bona estona, van trobar una capsa de llauna enterrada. A dins no hi havia or ni joies, sinó fotografies de quan l\'àvia era petita i una nota que deia: "El tresor més gran són els records."',
    ],
  },
  {
    titol: 'La natura',
    desc: 'Textos de ciències naturals.',
    textos: [
      "L'aigua del planeta no s'acaba mai: viatja contínuament en un cicle. Quan el sol escalfa els mars, els rius i els llacs, una part de l'aigua s'evapora i puja cap al cel en forma de vapor. A dalt fa més fred, i el vapor es condensa en gotes petitíssimes que formen els núvols. Quan les gotes es fan grans i pesen massa, cauen en forma de pluja, neu o calamarsa. Aquesta aigua torna als rius i als mars, o s'infiltra sota terra, i el cicle torna a començar.",
      "Els arbres són molt importants per a la vida a la Terra. Amb les fulles capten la llum del sol i fabriquen el seu propi aliment; aquest procés s'anomena fotosíntesi. Mentre ho fan, absorbeixen diòxid de carboni de l'aire i alliberen oxigen, que és el que respirem les persones i els animals. A més, les arrels subjecten el terra i eviten que la pluja se l'emporti. Per això és tan important cuidar els boscos i plantar arbres nous.",
    ],
  },
  {
    titol: "L'espai",
    desc: 'Planetes, la Lluna i els astronautes. Hi ha moltes majúscules!',
    textos: [
      'El sistema solar està format pel Sol i tots els cossos que giren al seu voltant. Hi ha vuit planetes: Mercuri, Venus, la Terra, Mart, Júpiter, Saturn, Urà i Neptú. Els quatre primers són petits i rocosos, mentre que els altres quatre són gegants fets sobretot de gasos. Júpiter és el planeta més gran: hi cabrien més de mil planetes com el nostre! La Terra triga 365 dies a fer una volta completa al Sol, i aquest temps és el que anomenem un any.',
      "La Lluna és el satèl·lit de la Terra. No fa llum pròpia: la veiem perquè reflecteix la llum del Sol. Com que gira al voltant de la Terra, cada nit en veiem il·luminada una part diferent, i per això parlem de fases: lluna nova, quart creixent, lluna plena i quart minvant. Un cicle complet dura uns vint-i-nou dies. L'any 1969, els astronautes Neil Armstrong i Buzz Aldrin van ser les primeres persones que van caminar sobre la Lluna.",
    ],
  },
  {
    titol: 'Tradicions',
    desc: 'Festes i tradicions de Catalunya.',
    textos: [
      "Els castells són una tradició catalana molt antiga. Un grup de persones, la colla castellera, s'enfila l'una sobre l'altra per construir torres humanes. A baix hi ha la pinya, on molta gent fa força per aguantar el pes del castell. A dalt de tot puja l'enxaneta, normalment un nen o una nena, que fa l'aleta amb la mà quan arriba al capdamunt. L'any 2010, la UNESCO va declarar els castells Patrimoni Cultural Immaterial de la Humanitat.",
      "El 23 d'abril se celebra Sant Jordi, una de les diades més estimades de Catalunya. Segons la llegenda, el cavaller Jordi va vèncer un drac que espantava un poble i va salvar la princesa. De la sang del drac va néixer un roser ple de roses vermelles. Avui, els carrers s'omplen de parades de llibres i de flors, i és tradició regalar una rosa i un llibre a les persones que estimem. També és el Dia Internacional del Llibre.",
    ],
  },
  {
    titol: 'Geografia',
    desc: 'Muntanyes, rius i oceans. Compte amb els números!',
    textos: [
      "Catalunya té paisatges molt variats. Al nord hi ha els Pirineus, unes muntanyes altes on a l'hivern neva molt. El cim més alt és la Pica d'Estats, que fa 3.143 metres. Al sud, el riu Ebre forma un delta on es cultiva arròs i on viuen moltes aus. Altres rius importants són el Ter, el Llobregat i el Segre. I a l'est, la costa mediterrània té platges, cales i ports de pescadors.",
      "La Terra té cinc oceans: el Pacífic, l'Atlàntic, l'Índic, l'Àrtic i l'Antàrtic. El més gran és el Pacífic, que ocupa gairebé un terç de la superfície del planeta. Els oceans són plens de vida: hi viuen balenes, dofins, taurons, tortugues i milions de peixos de tots els colors. També hi ha esculls de corall, que són com ciutats submarines. Per desgràcia, el plàstic que llencem pot arribar al mar i fer mal als animals; per això és tan important reciclar.",
    ],
  },
  {
    titol: 'Tecnologia',
    desc: 'Com funciona un ordinador i com navegar amb seguretat.',
    textos: [
      "Un ordinador és una màquina que segueix instruccions per fer feines molt diferents: escriure textos, fer càlculs, dibuixar o jugar. Té una part que podem tocar, el maquinari, com el teclat, el ratolí, la pantalla o el processador. I té una part que no podem tocar, el programari, que són els programes. El processador és el cervell de l'ordinador: pot fer milions d'operacions cada segon. Les instruccions que li donem s'escriuen en un llenguatge de programació.",
      "Internet és una xarxa que connecta milions d'ordinadors de tot el món. Gràcies a internet podem buscar informació, veure vídeos o parlar amb persones que viuen molt lluny. Però també cal anar amb compte: no hem de compartir mai les nostres contrasenyes, ni l'adreça de casa, ni fotografies amb desconeguts. Si veiem alguna cosa que ens fa sentir malament, ho hem d'explicar a un adult de confiança. Navegar amb seguretat és molt important!",
    ],
  },
  {
    titol: 'Cartes i invitacions',
    desc: 'Escriure a un amic és més fàcil quan domines el teclat!',
    textos: [
      "Estimada Laia: Com estàs? T'escric des del poble dels avis, on passo les vacances d'estiu. Cada matí anem a buscar ous al galliner i a la tarda ens banyem al riu, que té l'aigua molt freda. Ahir vam fer una excursió fins a dalt de la muntanya i vam veure un cabirol! A la nit, des del jardí, es veuen moltíssimes estrelles. Tinc ganes de tornar per explicar-t'ho tot. Una abraçada molt forta, Martina.",
      "Hola a tots! Aquest dissabte, a les cinc de la tarda, celebro el meu aniversari a casa. Farem una gimcana al jardí, menjarem pastís de xocolata i després mirarem una pel·lícula. Si podeu venir, porteu roba còmoda perquè ens mourem molt! Si us plau, digueu-me si vindreu abans de dijous. Us espero amb moltes ganes. Fins dissabte! Pau.",
    ],
  },
  {
    titol: 'Receptes',
    desc: 'Instruccions pas a pas. Fixa\'t en els guionets: torra-les, frega\'ls...',
    textos: [
      "Pa amb tomàquet. Ingredients: pa de pagès, tomàquets madurs, oli d'oliva i sal. Primer, talla el pa a llesques i, si vols, torra-les una mica. Després, talla els tomàquets per la meitat i frega'ls sobre el pa fins que quedi ben vermell. A continuació, tira-hi un raig d'oli d'oliva i una mica de sal. I ja està! El pa amb tomàquet és boníssim sol, però també el pots acompanyar amb formatge o embotit.",
      "Batut de maduixa. Necessitaràs: deu maduixes, un plàtan, un got de llet i una cullerada de mel. Renta bé les maduixes i treu-los les fulles. Pela el plàtan i talla'l a rodanxes. Posa totes les fruites al got de la batedora, afegeix-hi la llet i la mel, i demana a un adult que t'ajudi a batre-ho tot durant un minut. Serveix el batut en gots ben freds i, si vols, decora'ls amb una maduixa. Bon profit!",
    ],
  },
  {
    titol: 'Repte final',
    desc: 'El text més llarg de tots! Demostra tot el que has après. Pots fer-ho!',
    uneix: 2,
    textos: () => NIVELLS_AVANCATS.slice(0, -1).flatMap((n) => n.textos),
  },
];

NIVELLS_MITJANS.forEach((n) => NIVELLS.push({ ...n, noves: '', mode: 'text', seccio: 'mitja' }));
NIVELLS_AVANCATS.forEach((n) => NIVELLS.push({ ...n, noves: '', mode: 'text', seccio: 'avancat' }));

// Lletres acumulades fins a cada nivell
(function calculaLletres() {
  let acumulades = '';
  NIVELLS.forEach((n) => {
    acumulades += n.noves;
    n.lletres = acumulades;
  });
})();

// ---------------------------------------------------------------------
//  Generació de textos
// ---------------------------------------------------------------------
const aleatori = (llista) => llista[Math.floor(Math.random() * llista.length)];
const entre = (a, b) => a + Math.floor(Math.random() * (b - a + 1));
const barreja = (llista) => {
  const c = [...llista];
  for (let i = c.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [c[i], c[j]] = [c[j], c[i]];
  }
  return c;
};

function paraulesAmb(lletres) {
  return PARAULES.filter((p) => [...p].every((c) => lletres.includes(c)));
}

function grupAleatori(noves, totes) {
  let g = '';
  const n = entre(2, 4);
  for (let i = 0; i < n; i++) g += Math.random() < 0.6 && noves ? aleatori([...noves]) : aleatori([...totes]);
  return g;
}

function omple(generador, longitud) {
  const peces = [];
  let total = 0;
  let anterior = '';
  while (total < longitud) {
    let p = generador();
    if (p === anterior) p = generador();
    peces.push(p);
    anterior = p;
    total += p.length + 1;
  }
  return peces.join(' ');
}

/** Genera el text d'un exercici per al nivell indicat. */
function generaText(nivell) {
  const n = NIVELLS[nivell];
  const totes = n.lletres;
  switch (n.mode) {
    case 'exercici': {
      const paraules = paraulesAmb(totes);
      const usaParaules = paraules.length >= 6;
      return omple(() => (usaParaules && Math.random() < 0.45 ? aleatori(paraules) : grupAleatori(n.noves, totes)), 48);
    }
    case 'repas': {
      const paraules = paraulesAmb(totes);
      return omple(() => (Math.random() < 0.75 ? aleatori(paraules) : grupAleatori('', totes)), 60);
    }
    case 'paraules':
      return omple(() => aleatori(PARAULES), 70);
    case 'majuscules':
      return omple(() => {
        if (Math.random() < 0.4) return aleatori(NOMS);
        const p = aleatori(PARAULES);
        return Math.random() < 0.5 ? p[0].toUpperCase() + p.slice(1) : p;
      }, 60);
    case 'llista': {
      const llista = n.llista();
      return omple(() => (Math.random() < 0.75 ? aleatori(llista) : aleatori(PARAULES)), 60);
    }
    case 'numeros':
      return omple(() => (Math.random() < 0.3 ? aleatori(PARAULES) : String(entre(0, 10 ** entre(1, 3) - 1))), 50);
    case 'frases':
      return barreja(FRASES).slice(0, 2).join(' ');
    case 'text': {
      const textos = typeof n.textos === 'function' ? n.textos() : n.textos;
      return barreja(textos).slice(0, n.uneix || 1).join(' ');
    }
    default:
      return 'fj fj';
  }
}
