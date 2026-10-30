const masterInput = document.getElementById('masterPass');
const serviceInput = document.getElementById('service');
const lengthInput = document.getElementById('length');
const resultDisplay = document.getElementById('resultDisplay');
const generateBtn = document.getElementById('generateBtn');
const copyBtn = document.getElementById('copyBtn');
const strengthBar = document.getElementById('strengthBar');

async function generateVaultless() {
    const master = masterInput.value;
    const service = serviceInput.value.toLowerCase().trim();
    const len = parseInt(lengthInput.value);
    
    if (!master || !service) {
        alert("Introdueix la contrasenya mestra i el servei");
        return;
    }

    if (isNaN(len) || len < 4) {
        alert("La longitud mínima recomanada és 4");
        return;
    }

    const seed = `${master}:${service}`;
    const msgBuffer = new TextEncoder().encode(seed);
    const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    
    // Configuració dels conjunts
    const sets = [];
    if (document.getElementById('upper').checked) sets.push("ABCDEFGHIJKLMNOPQRSTUVWXYZ");
    if (document.getElementById('lower').checked) sets.push("abcdefghijklmnopqrstuvwxyz");
    if (document.getElementById('numbers').checked) sets.push("0123456789");
    if (document.getElementById('symbols').checked) sets.push("!@#$%^&*()_+");

    if (sets.length === 0) return alert("Selecciona com a mínim un tipus de caràcter");
    if (len < sets.length) return alert(`Per complir les regles, la longitud ha de ser com a mínim ${sets.length}`);

    let password = "";
    let allChars = sets.join("");

    // 1. Assegurar un caràcter de cada conjunt seleccionat (determinista)
    // Fem servir els primers bytes del hash per triar-ne un de cada conjunt actiu
    for (let i = 0; i < sets.length; i++) {
        const charIndex = hashArray[i] % sets[i].length;
        password += sets[i].charAt(charIndex);
    }

    // 2. Omplir la resta de la longitud
    for (let i = sets.length; i < len; i++) {
        // Fem servir la resta del hash per omplir
        const charIndex = (hashArray[i % hashArray.length] + i);
        password += allChars.charAt(charIndex % allChars.length);
    }

    // Opcional: es podria "barrejar" la contrasenya aquí de manera determinista
    // perquè el caràcter obligatori no fos sempre al principi, però això ja compleix el requisit.

    resultDisplay.innerText = password;
    updateStrengthBar(len);
}

function updateStrengthBar(len) {
    let width = "0%";
    let color = "var(--bad)";

    if (len < 8) { width = "20%"; color = "var(--bad)"; }
    else if (len <= 10) { width = "40%"; color = "var(--warn)"; }
    else if (len <= 12) { width = "60%"; color = "var(--orange)"; }
    else if (len <= 16) { width = "85%"; color = "var(--good)"; }
    else { width = "100%"; color = "var(--teal)"; }

    strengthBar.style.width = width;
    strengthBar.style.backgroundColor = color;
}

generateBtn.addEventListener('click', generateVaultless);

copyBtn.addEventListener('click', () => {
    const text = resultDisplay.innerText;
    if (text === "Esperant dades...") return;
    navigator.clipboard.writeText(text);
    const originalText = copyBtn.innerText;
    copyBtn.innerText = "Copiat!";
    setTimeout(() => copyBtn.innerText = originalText, 1500);
});