// =====================================================================
//  Dits Màgics — lògica de l'aplicació (tot al navegador)
// =====================================================================
const $ = (id) => document.getElementById(id);

// ---------------------------------------------------------------------
//  Desament (localStorage, amb alternativa en memòria)
// ---------------------------------------------------------------------
const CLAU = 'dits-magics.v1';
const CLAU_ANTIGA = 'teclat-magic.v1'; // nom anterior: es recupera el progrés si hi és
let dades = { perfils: {}, actiu: null, opcions: { so: true, colors: true, desbloquejar: false } };

function carrega() {
  try {
    const d = JSON.parse(localStorage.getItem(CLAU) || localStorage.getItem(CLAU_ANTIGA));
    if (d && d.perfils) dades = { ...dades, ...d, opcions: { ...dades.opcions, ...d.opcions } };
  } catch (e) { /* sense emmagatzematge: treballem en memòria */ }
}
function desa() {
  try { localStorage.setItem(CLAU, JSON.stringify(dades)); } catch (e) { /* ignora */ }
}
const perfil = () => dades.perfils[dades.actiu];

// ---------------------------------------------------------------------
//  Sons (Web Audio)
// ---------------------------------------------------------------------
let audio = null;
function so(tipus) {
  if (!dades.opcions.so) return;
  try {
    audio = audio || new (window.AudioContext || window.webkitAudioContext)();
    const o = audio.createOscillator();
    const g = audio.createGain();
    const t = audio.currentTime;
    const cfg = {
      ok: ['sine', 660, 0.05, 0.04],
      error: ['square', 160, 0.14, 0.05],
      fi: ['triangle', 880, 0.35, 0.08],
    }[tipus];
    o.type = cfg[0];
    o.frequency.setValueAtTime(cfg[1], t);
    if (tipus === 'fi') o.frequency.linearRampToValueAtTime(1320, t + 0.3);
    g.gain.setValueAtTime(cfg[3], t);
    g.gain.exponentialRampToValueAtTime(0.0001, t + cfg[2]);
    o.connect(g).connect(audio.destination);
    o.start(t);
    o.stop(t + cfg[2]);
  } catch (e) { /* sense so */ }
}

// ---------------------------------------------------------------------
//  Perfils
// ---------------------------------------------------------------------
function pintaPerfils() {
  const sel = $('selPerfil');
  sel.innerHTML = '';
  Object.keys(dades.perfils).forEach((nom) => {
    const o = document.createElement('option');
    o.value = o.textContent = nom;
    sel.appendChild(o);
  });
  sel.value = dades.actiu || '';
  $('nomSalutacio').textContent = dades.actiu || 'amic';
}

function nouPerfil() {
  $('inpNom').value = '';
  $('dlgPerfil').showModal();
}

$('formPerfil').addEventListener('submit', () => {
  const nom = $('inpNom').value.trim();
  if (!nom) return;
  if (!dades.perfils[nom]) dades.perfils[nom] = { estrelles: {}, millorPPM: {} };
  dades.actiu = nom;
  desa();
  pintaPerfils();
  pintaNivells();
});
$('btnCancelPerfil').addEventListener('click', () => $('dlgPerfil').close());
$('btnNouPerfil').addEventListener('click', nouPerfil);
$('selPerfil').addEventListener('change', (e) => {
  dades.actiu = e.target.value;
  desa();
  pintaPerfils();
  pintaNivells();
});
$('btnEsborrarPerfil').addEventListener('click', () => {
  if (!dades.actiu) return;
  if (!confirm(`Segur que vols esborrar el perfil de ${dades.actiu} i tot el seu progrés?`)) return;
  delete dades.perfils[dades.actiu];
  dades.actiu = Object.keys(dades.perfils)[0] || null;
  desa();
  pintaPerfils();
  pintaNivells();
  if (!dades.actiu) nouPerfil();
});

// ---------------------------------------------------------------------
//  Opcions
// ---------------------------------------------------------------------
[['optSo', 'so'], ['optColors', 'colors'], ['optDesbloquejar', 'desbloquejar']].forEach(([id, clau]) => {
  const el = $(id);
  el.checked = !!dades.opcions[clau];
  el.addEventListener('change', () => {
    dades.opcions[clau] = el.checked;
    desa();
    aplicaOpcions();
    pintaNivells();
  });
});
function aplicaOpcions() {
  $('teclat').classList.toggle('amb-colors', !!dades.opcions.colors);
}

// ---------------------------------------------------------------------
//  Pantalla de nivells
// ---------------------------------------------------------------------
const estrellesDe = (i) => perfil()?.estrelles[i] || 0;
const desbloquejat = (i) => i === 0 || dades.opcions.desbloquejar || estrellesDe(i - 1) > 0;

function pintaNivells() {
  const g = $('graellaNivells');
  g.innerHTML = '';
  let seccioActual = null;
  NIVELLS.forEach((n, i) => {
    if (n.seccio !== seccioActual) {
      seccioActual = n.seccio;
      const sec = SECCIONS[n.seccio];
      const fets = NIVELLS.filter((m, j) => m.seccio === n.seccio && estrellesDe(j) > 0).length;
      const total = NIVELLS.filter((m) => m.seccio === n.seccio).length;
      const h = document.createElement('div');
      h.className = `seccio seccio-${n.seccio}`;
      h.innerHTML = `<h3>${sec.titol} <span class="comptador">${fets}/${total}</span></h3><p>${sec.desc}</p>`;
      g.appendChild(h);
    }
    const obert = desbloquejat(i);
    const est = estrellesDe(i);
    const ppm = perfil()?.millorPPM[i];
    const b = document.createElement('button');
    b.type = 'button';
    b.className = `nivell nivell-${n.seccio}` + (obert ? '' : ' tancat') + (est ? ' fet' : '');
    b.disabled = !obert;
    b.innerHTML = `
      <span class="num">${obert ? i + 1 : '🔒'}</span>
      <span class="nom">${n.titol}</span>
      <span class="peu-nivell">
        <span class="estrelles">${'★'.repeat(est)}<span class="buides">${'★'.repeat(3 - est)}</span></span>
        ${est && ppm ? `<span class="record" title="Millor velocitat">${ppm} ppm</span>` : ''}
      </span>`;
    b.addEventListener('click', () => comencaNivell(i));
    g.appendChild(b);
  });
}

function mostraPantalla(nom) {
  $('pantallaNivells').hidden = nom !== 'nivells';
  $('pantallaExercici').hidden = nom !== 'exercici';
  estat.pantalla = nom;
}

// ---------------------------------------------------------------------
//  Exercici
// ---------------------------------------------------------------------
const estat = {
  pantalla: 'nivells',
  nivell: 0,
  text: '',
  pos: 0,
  fase: 0, // per a vocals accentuades: 0 = cal la tecla morta, 1 = cal la vocal
  correctes: 0,
  errors: 0,
  inici: null,
  errorsPos: new Set(),
};

function comencaNivell(i) {
  const n = NIVELLS[i];
  Object.assign(estat, {
    nivell: i, text: generaText(i), spans: [], pos: 0, fase: 0, correctes: 0, errors: 0, inici: null, errorsPos: new Set(),
  });
  $('titolNivell').textContent = `Nivell ${i + 1}: ${n.titol}`;
  $('descNivell').textContent = n.desc;
  pintaText();
  actualitzaStats();
  marcaObjectiu();
  mostraPantalla('exercici');
  document.activeElement?.blur();
}

// Cada paraula (amb l'espai que la segueix) va dins d'un bloc que no es parteix.
function pintaText() {
  const caixa = $('text');
  caixa.innerHTML = '<div class="text-interior"></div>';
  caixa.classList.toggle('llarg', estat.text.length > 120);
  const cont = caixa.firstChild;
  estat.spans = [];
  let paraula = null;
  [...estat.text].forEach((c, i) => {
    if (!paraula) {
      paraula = document.createElement('span');
      paraula.className = 'paraula';
      cont.appendChild(paraula);
    }
    const s = document.createElement('span');
    s.className = 'c';
    if (c === ' ') s.classList.add('espai');
    s.textContent = c === ' ' ? '·' : c;
    paraula.appendChild(s);
    estat.spans.push(s);
    if (c === ' ') paraula = null;
  });
  actualitzaCursor();
}

/** Marca la lletra anterior com a feta i la nova com a actual; desplaça el text si cal. */
function actualitzaCursor() {
  const anterior = estat.spans[estat.pos - 1];
  if (anterior) {
    anterior.classList.remove('actual', 'sacseja');
    anterior.classList.add(estat.errorsPos.has(estat.pos - 1) ? 'fet-error' : 'fet');
  }
  const actual = estat.spans[estat.pos];
  if (!actual) return;
  actual.classList.add('actual');
  const cont = $('text').firstChild;
  const linia = parseFloat(getComputedStyle(cont).lineHeight) || 40;
  const objectiu = Math.max(0, actual.offsetTop - linia * 0.9);
  if (Math.abs(cont.scrollTop - objectiu) > linia / 2) cont.scrollTo({ top: objectiu, behavior: 'smooth' });
}

function marcaObjectiu() {
  document.querySelectorAll('.tecla.objectiu').forEach((t) => t.classList.remove('objectiu'));
  const c = estat.text[estat.pos];
  if (c === undefined) { $('pista').innerHTML = ''; return; }
  const tecles = teclesPer(c, estat.fase);
  tecles.forEach((codi) => document.querySelectorAll(`.tecla[data-codi="${codi}"]`).forEach((t) => t.classList.add('objectiu')));
  $('pista').innerHTML = textPista(c, tecles);
}

function nomTecla(codi) {
  if (NOM_TECLA[codi]) return NOM_TECLA[codi];
  if (/^Key/.test(codi)) return 'la ' + codi.slice(3);
  if (/^Digit/.test(codi)) return 'el ' + codi.slice(5);
  return codi;
}

function textPista(c, tecles) {
  const info = MAPA_CARACTERS[c];
  if (!info) return '';
  const dit = (codi) => `<span class="punt dit-${DIT_PER_TECLA[codi]}"></span>${DITS[DIT_PER_TECLA[codi]].nom}`;
  const [principal, shift] = tecles;
  let html = '';
  if (shift) html += `Mantén <kbd>Majúscules</kbd> amb el ${dit(shift)} i prem `;
  else html += 'Prem ';
  html += `<kbd>${nomTecla(principal)}</kbd> amb el ${dit(principal)}`;
  if (info.morta) html += estat.fase === 0 ? ' <em>(després, la vocal)</em>' : ' <em>(ara la vocal)</em>';
  return html;
}

function flaix(codi, classe) {
  document.querySelectorAll(`.tecla[data-codi="${codi}"]`).forEach((t) => {
    t.classList.remove('premuda', 'erronia');
    void t.offsetWidth; // reinicia l'animació
    t.classList.add(classe);
    setTimeout(() => t.classList.remove(classe), classe === 'erronia' ? 450 : 160);
  });
}

function encert(codi) {
  estat.correctes++;
  estat.pos++;
  estat.fase = 0;
  flaix(codi, 'premuda');
  so('ok');
  if (estat.pos >= estat.text.length) return acaba();
  actualitzaCursor();
  actualitzaStats();
  marcaObjectiu();
}

function error(codi) {
  estat.errors++;
  estat.errorsPos.add(estat.pos);
  estat.fase = 0;
  flaix(codi, 'erronia');
  so('error');
  const actual = estat.spans[estat.pos];
  if (actual) {
    actual.classList.remove('sacseja');
    void actual.offsetWidth;
    actual.classList.add('sacseja');
  }
  actualitzaStats();
  marcaObjectiu();
}

const MODIFICADORS = ['Shift', 'Control', 'Alt', 'AltGraph', 'Meta', 'CapsLock', 'Tab', 'Escape', 'ContextMenu', 'Fn'];

document.addEventListener('keydown', (e) => {
  if (estat.pantalla !== 'exercici') return;
  if (e.key === 'Escape') { mostraPantalla('nivells'); pintaNivells(); return; }
  if (MODIFICADORS.includes(e.key) || e.ctrlKey || e.metaKey) return;
  if (e.key === 'Backspace' || e.key === 'Enter') { e.preventDefault(); return; }
  e.preventDefault();
  if (!estat.inici) estat.inici = performance.now();

  const esperat = estat.text[estat.pos];
  const info = MAPA_CARACTERS[esperat];

  if (info && info.morta) {
    if (estat.fase === 0) {
      if (e.key === 'Dead' && e.code === info.morta && e.shiftKey === !!info.mortaMaj) {
        estat.fase = 1;
        flaix(e.code, 'premuda');
        marcaObjectiu();
      } else {
        error(e.code);
      }
      return;
    }
    if (e.key === esperat || (e.code === info.codi && e.shiftKey === !!info.maj)) encert(e.code);
    else error(e.code);
    return;
  }

  if (e.key === esperat) encert(e.code);
  else error(e.code);
});

// ---------------------------------------------------------------------
//  Estadístiques i resultat
// ---------------------------------------------------------------------
function calcula() {
  const total = estat.correctes + estat.errors;
  const precisio = total ? (estat.correctes / total) * 100 : 100;
  const minuts = estat.inici ? (performance.now() - estat.inici) / 60000 : 0;
  const ppm = minuts > 0.02 ? estat.correctes / 5 / minuts : 0;
  return { precisio, ppm, minuts };
}

function actualitzaStats() {
  const { precisio, ppm } = calcula();
  $('statPrecisio').textContent = Math.round(precisio) + '%';
  $('statPPM').textContent = Math.round(ppm);
  $('statErrors').textContent = estat.errors;
  $('barraProgres').style.width = (estat.pos / estat.text.length) * 100 + '%';
}

function acaba() {
  const { precisio, ppm, minuts } = calcula();
  const est = precisio >= 97 ? 3 : precisio >= 92 ? 2 : precisio >= 85 ? 1 : 0;
  const p = perfil();
  if (p) {
    p.estrelles[estat.nivell] = Math.max(p.estrelles[estat.nivell] || 0, est);
    p.millorPPM[estat.nivell] = Math.max(p.millorPPM[estat.nivell] || 0, Math.round(ppm));
    desa();
  }
  actualitzaCursor();
  actualitzaStats();
  document.querySelectorAll('.tecla.objectiu').forEach((t) => t.classList.remove('objectiu'));
  so('fi');

  const missatges = [
    ['Gairebé!', 'Necessites com a mínim un 85% de precisió per passar de nivell. Ves amb calma: és millor anar a poc a poc i no equivocar-se.'],
    ['Nivell superat!', 'Molt bé! Pots passar al següent nivell o repetir-lo per aconseguir més estrelles.'],
    ['Molt bé!', 'Gairebé perfecte! Continua així.'],
    ['Fantàstic!', 'Excel·lent! Ets un crac del teclat! 🎉'],
  ];
  $('resEstrelles').innerHTML = '★'.repeat(est) + `<span class="buides">${'★'.repeat(3 - est)}</span>`;
  $('resTitol').textContent = missatges[est][0];
  $('resMissatge').textContent = missatges[est][1];
  $('resPrecisio').textContent = Math.round(precisio) + '%';
  $('resPPM').textContent = Math.round(ppm);
  const segons = Math.round(minuts * 60);
  $('resTemps').textContent = `${Math.floor(segons / 60)}:${String(segons % 60).padStart(2, '0')}`;

  const hiHaSeguent = estat.nivell + 1 < NIVELLS.length && desbloquejat(estat.nivell + 1);
  $('btnSeguent').hidden = !hiHaSeguent;
  estat.pantalla = 'resultat';
  $('dlgResultat').showModal();
  (hiHaSeguent ? $('btnSeguent') : $('btnRepetir')).focus();
}

$('btnSeguent').addEventListener('click', () => { $('dlgResultat').close(); comencaNivell(estat.nivell + 1); });
$('btnRepetir').addEventListener('click', () => { $('dlgResultat').close(); comencaNivell(estat.nivell); });
$('btnResNivells').addEventListener('click', () => { $('dlgResultat').close(); mostraPantalla('nivells'); pintaNivells(); });
$('dlgResultat').addEventListener('cancel', () => { mostraPantalla('nivells'); pintaNivells(); });
$('btnTornar').addEventListener('click', () => { mostraPantalla('nivells'); pintaNivells(); });

// ---------------------------------------------------------------------
//  Llegenda de dits
// ---------------------------------------------------------------------
function pintaLlegenda() {
  $('llegenda').innerHTML = ['lp', 'la', 'lm', 'li', 'th', 'ri', 'rm', 'ra', 'rp']
    .map((d) => `<span><span class="punt dit-${d}"></span>${DITS[d].nom}</span>`).join('');
}

// ---------------------------------------------------------------------
//  Inici
// ---------------------------------------------------------------------
carrega();
dibuixaTeclat($('teclat'));
pintaLlegenda();
[['optSo', 'so'], ['optColors', 'colors'], ['optDesbloquejar', 'desbloquejar']].forEach(([id, clau]) => ($(id).checked = !!dades.opcions[clau]));
aplicaOpcions();
pintaPerfils();
pintaNivells();
if (!dades.actiu) nouPerfil();
