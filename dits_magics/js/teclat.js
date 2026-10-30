// =====================================================================
//  Teclat (distribució espanyola/catalana ISO) i mapa de caràcters
// =====================================================================

// [codi, caràcter base, caràcter amb Majúscules, amplada, tipus]
const lletres = (s) => s.split('').map((c) => ['Key' + c.toUpperCase(), c, c.toUpperCase()]);

const FILES_TECLAT = [
  [
    ['Backquote', 'º', 'ª'], ['Digit1', '1', '!'], ['Digit2', '2', '"'], ['Digit3', '3', '·'],
    ['Digit4', '4', '$'], ['Digit5', '5', '%'], ['Digit6', '6', '&'], ['Digit7', '7', '/'],
    ['Digit8', '8', '('], ['Digit9', '9', ')'], ['Digit0', '0', '='], ['Minus', "'", '?'],
    ['Equal', '¡', '¿'], ['Backspace', '⌫', null, 2, 'fn'],
  ],
  [
    ['Tab', 'Tab ⇥', null, 1.5, 'fn'], ...lletres('qwertyuiop'),
    ['BracketLeft', '`', '^', 1, 'dead'], ['BracketRight', '+', '*'], ['Enter', 'Intro', null, 1.5, 'fn'],
  ],
  [
    ['CapsLock', 'Bloq Maj', null, 1.75, 'fn'], ...lletres('asdfghjkl'), ['Semicolon', 'ñ', 'Ñ'],
    ['Quote', '´', '¨', 1, 'dead'], ['Backslash', 'ç', 'Ç'], ['Enter', '↵', null, 1.25, 'fn'],
  ],
  [
    ['ShiftLeft', '⇧ Maj', null, 1.25, 'fn'], ['IntlBackslash', '<', '>'], ...lletres('zxcvbnm'),
    ['Comma', ',', ';'], ['Period', '.', ':'], ['Slash', '-', '_'], ['ShiftRight', '⇧ Majúscules', null, 2.75, 'fn'],
  ],
  [
    ['ControlLeft', 'Ctrl', null, 1.5, 'fn'], ['MetaLeft', 'Win', null, 1.25, 'fn'], ['AltLeft', 'Alt', null, 1.25, 'fn'],
    ['Space', 'espai', null, 7, 'fn'], ['AltRight', 'Alt Gr', null, 1.25, 'fn'], ['MetaRight', 'Win', null, 1.25, 'fn'],
    ['ControlRight', 'Ctrl', null, 1.5, 'fn'],
  ],
];

// Dit que prem cada tecla
const DITS = {
  lp: { nom: 'dit petit esquerre', ma: 'E' },
  la: { nom: 'dit anular esquerre', ma: 'E' },
  lm: { nom: 'dit del mig esquerre', ma: 'E' },
  li: { nom: 'dit índex esquerre', ma: 'E' },
  ri: { nom: 'dit índex dret', ma: 'D' },
  rm: { nom: 'dit del mig dret', ma: 'D' },
  ra: { nom: 'dit anular dret', ma: 'D' },
  rp: { nom: 'dit petit dret', ma: 'D' },
  th: { nom: 'polze', ma: '' },
};

const DIT_PER_TECLA = {};
const assigna = (dit, codis) => codis.split(' ').forEach((c) => (DIT_PER_TECLA[c] = dit));
assigna('lp', 'Backquote Digit1 Tab KeyQ CapsLock KeyA ShiftLeft IntlBackslash KeyZ ControlLeft MetaLeft');
assigna('la', 'Digit2 KeyW KeyS KeyX');
assigna('lm', 'Digit3 KeyE KeyD KeyC');
assigna('li', 'Digit4 Digit5 KeyR KeyT KeyF KeyG KeyV KeyB');
assigna('ri', 'Digit6 Digit7 KeyY KeyU KeyH KeyJ KeyN KeyM');
assigna('rm', 'Digit8 KeyI KeyK Comma');
assigna('ra', 'Digit9 KeyO KeyL Period');
assigna('rp', 'Digit0 Minus Equal Backspace KeyP BracketLeft BracketRight Enter Semicolon Quote Backslash Slash ShiftRight ControlRight MetaRight AltRight');
assigna('th', 'Space AltLeft');

// Nom amigable de cada tecla per a les pistes
const NOM_TECLA = {
  Space: 'l\'espai', Minus: "l'apòstrof (')", Comma: 'la coma (,)', Period: 'el punt (.)', Slash: 'el guionet (-)',
  BracketLeft: "l'accent obert (`)", Quote: "l'accent tancat (´)", Semicolon: 'la Ñ', Backslash: 'la Ç',
  ShiftLeft: 'Majúscules (esquerra)', ShiftRight: 'Majúscules (dreta)', Digit3: 'el 3',
};

// ---- Mapa caràcter → com s'escriu --------------------------------------
const MAPA_CARACTERS = {};
FILES_TECLAT.flat().forEach(([codi, base, maj, , tipus]) => {
  if (tipus === 'fn' || tipus === 'dead') return;
  MAPA_CARACTERS[base] = { codi };
  if (maj) MAPA_CARACTERS[maj] = { codi, maj: true };
});
MAPA_CARACTERS[' '] = { codi: 'Space' };

// Vocals accentuades: primer la tecla morta, després la vocal
const ACCENTS = {
  à: ['BracketLeft', false, 'a'], è: ['BracketLeft', false, 'e'], ò: ['BracketLeft', false, 'o'],
  á: ['Quote', false, 'a'], é: ['Quote', false, 'e'], í: ['Quote', false, 'i'], ó: ['Quote', false, 'o'], ú: ['Quote', false, 'u'],
  ï: ['Quote', true, 'i'], ü: ['Quote', true, 'u'],
};
Object.entries(ACCENTS).forEach(([c, [morta, mortaMaj, vocal]]) => {
  MAPA_CARACTERS[c] = { morta, mortaMaj, codi: 'Key' + vocal.toUpperCase() };
  MAPA_CARACTERS[c.toUpperCase()] = { morta, mortaMaj, codi: 'Key' + vocal.toUpperCase(), maj: true };
});

/** Tecla de Majúscules que toca: la de la mà contrària. */
function shiftPer(codi) {
  return DITS[DIT_PER_TECLA[codi]]?.ma === 'E' ? 'ShiftRight' : 'ShiftLeft';
}

/** Retorna les tecles que cal prémer ara per al caràcter (fase 0 = tecla morta si n'hi ha). */
function teclesPer(caracter, fase) {
  const info = MAPA_CARACTERS[caracter];
  if (!info) return [];
  if (info.morta && fase === 0) {
    return info.mortaMaj ? [info.morta, shiftPer(info.morta)] : [info.morta];
  }
  return info.maj ? [info.codi, shiftPer(info.codi)] : [info.codi];
}

/** Dibuixa el teclat dins del contenidor. */
function dibuixaTeclat(contenidor) {
  contenidor.innerHTML = '';
  FILES_TECLAT.forEach((fila) => {
    const f = document.createElement('div');
    f.className = 'fila';
    fila.forEach(([codi, base, maj, amplada = 1, tipus = '']) => {
      const t = document.createElement('div');
      t.className = `tecla dit-${DIT_PER_TECLA[codi] || 'cap'} ${tipus}`;
      if (codi === 'KeyF' || codi === 'KeyJ') t.classList.add('casa');
      t.dataset.codi = codi;
      t.style.setProperty('--w', amplada);
      const cap = document.createElement('div');
      cap.className = 'cap';
      if (tipus === 'fn') {
        cap.innerHTML = `<span class="etiqueta-fn">${base}</span>`;
      } else if (/^Key/.test(codi) || codi === 'Semicolon' || codi === 'Backslash') {
        cap.innerHTML = `<span class="principal">${maj}</span>`;
      } else {
        cap.innerHTML = `<span class="sup">${maj ?? ''}</span><span class="principal">${base}</span>`;
      }
      t.appendChild(cap);
      f.appendChild(t);
    });
    contenidor.appendChild(f);
  });
}
