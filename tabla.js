/* ============================================================
   TABLA DE POSICIONES — TORNEO APERTURA AUF
   JavaScript — Lógica, datos y animaciones
   ============================================================ */

'use strict';

/* ─── DATOS INICIALES ────────────────────────────────────────
   Estructura: { id, name, pj, pg, pe, pp, gf, gc }
   DIF y PTS se calculan dinámicamente.
   Datos aproximados del Apertura 2025 AUF (inicio de torneo).
──────────────────────────────────────────────────────────── */
const INITIAL_DATA = [
  { id: 'rac', name: 'Racing', pj: 0, pg: 0, pe: 0, pp: 0, gf: 0, gc: 0 },
  { id: 'dep', name: 'Deportivo Maldonado', pj: 0, pg: 0, pe: 0, pp: 0, gf: 0, gc: 0 },
  { id: 'pen', name: 'Peñarol', pj: 0, pg: 0, pe: 0, pp: 0, gf: 0, gc: 0 },
  { id: 'alb', name: 'Albion', pj: 0, pg: 0, pe: 0, pp: 0, gf: 0, gc: 0 },
  { id: 'nac', name: 'Nacional', pj: 0, pg: 0, pe: 0, pp: 0, gf: 0, gc: 0 },
  { id: 'esp', name: 'Central Español', pj: 0, pg: 0, pe: 0, pp: 0, gf: 0, gc: 0 },
  { id: 'def', name: 'Defensor Sporting', pj: 0, pg: 0, pe: 0, pp: 0, gf: 0, gc: 0 },
  { id: 'mct', name: 'Montevideo City', pj: 0, pg: 0, pe: 0, pp: 0, gf: 0, gc: 0 },
  { id: 'liv', name: 'Liverpool', pj: 0, pg: 0, pe: 0, pp: 0, gf: 0, gc: 0 },
  { id: 'dan', name: 'Danubio', pj: 0, pg: 0, pe: 0, pp: 0, gf: 0, gc: 0 },
  { id: 'crl', name: 'Cerro Largo', pj: 0, pg: 0, pe: 0, pp: 0, gf: 0, gc: 0 },
  { id: 'bos', name: 'Boston River', pj: 0, pg: 0, pe: 0, pp: 0, gf: 0, gc: 0 },
  { id: 'wan', name: 'Wanderers', pj: 0, pg: 0, pe: 0, pp: 0, gf: 0, gc: 0 },
  { id: 'pro', name: 'Progreso', pj: 0, pg: 0, pe: 0, pp: 0, gf: 0, gc: 0 },
  { id: 'cer', name: 'Cerro', pj: 0, pg: 0, pe: 0, pp: 0, gf: 0, gc: 0 },
  { id: 'juv', name: 'Jueventud', pj: 0, pg: 0, pe: 0, pp: 0, gf: 0, gc: 0 },
];

/*
const INITIAL_DATA = [
  { id: 'rac', name: 'Racing', pj: 12, pg: 8, pe: 3, pp: 1, gf: 21, gc: 11 },
  { id: 'dep', name: 'Deportivo Maldonado', pj: 12, pg: 7, pe: 2, pp: 3, gf: 20, gc: 13 },
  { id: 'pen', name: 'Peñarol', pj: 12, pg: 7, pe: 2, pp: 3, gf: 19, gc: 12 },
  { id: 'alb', name: 'Albion', pj: 12, pg: 5, pe: 4, pp: 4, gf: 20, gc: 13 },
  { id: 'nac', name: 'Nacional', pj: 12, pg: 6, pe: 1, pp: 5, gf: 19, gc: 16 },
  { id: 'esp', name: 'Central Español', pj: 12, pg: 5, pe: 3, pp: 4, gf: 17, gc: 19 },
  { id: 'def', name: 'Defensor Sporting', pj: 12, pg: 4, pe: 5, pp: 3, gf: 10, gc: 8 },
  { id: 'mct', name: 'Montevideo City', pj: 12, pg: 4, pe: 4, pp: 4, gf: 15, gc: 13 },
  { id: 'liv', name: 'Liverpool', pj: 12, pg: 4, pe: 4, pp: 4, gf: 16, gc: 16 },
  { id: 'dan', name: 'Danubio', pj: 12, pg: 3, pe: 6, pp: 3, gf: 15, gc: 16 },
  { id: 'crl', name: 'Cerro Largo', pj: 12, pg: 4, pe: 2, pp: 6, gf: 13, gc: 15 },
  { id: 'bos', name: 'Boston River', pj: 12, pg: 4, pe: 2, pp: 6, gf: 10, gc: 13 },
  { id: 'wan', name: 'Wanderers', pj: 12, pg: 4, pe: 2, pp: 6, gf: 13, gc: 19 },
  { id: 'pro', name: 'Progreso', pj: 12, pg: 2, pe: 4, pp: 6, gf: 11, gc: 19 },
  { id: 'cer', name: 'Cerro', pj: 12, pg: 2, pe: 4, pp: 6, gf: 7, gc: 16 },
  { id: 'juv', name: 'Jueventud', pj: 12, pg: 2, pe: 2, pp: 8, gf: 12, gc: 19 },
];
*/
/* ─── STATE ──────────────────────────────────────────────── */
let teams = [];          // working copy
let matchQueue = [];     // partidos en cola
let previousOrder = [];  // IDs en orden anterior (para animar)

/* ─── HELPERS ────────────────────────────────────────────── */
const pts = t => t.pg * 3 + t.pe;
const dif = t => t.gf - t.gc;

function sortTeams(arr) {
  return [...arr].sort((a, b) => {
    if (pts(b) !== pts(a)) return pts(b) - pts(a);
    if (dif(b) !== dif(a)) return dif(b) - dif(a);
    return b.gf - a.gf;
  });
}

function deepClone(obj) { return JSON.parse(JSON.stringify(obj)); }

function formatDif(n) {
  if (n > 0) return '+' + n;
  return String(n);
}

/* ─── INIT ───────────────────────────────────────────────── */
function init() {
  teams = deepClone(INITIAL_DATA);
  matchQueue = [];
  previousOrder = sortTeams(teams).map(t => t.id);
  renderTable(false);
  populateSelects();
  updateQueueUI();
}

/* ─── POPULATE SELECTS ───────────────────────────────────── */
function populateSelects() {
  const sorted = sortTeams(teams);
  const selects = [document.getElementById('teamHome'), document.getElementById('teamAway')];
  selects.forEach(sel => {
    const current = sel.value;
    sel.innerHTML = sorted.map(t =>
      `<option value="${t.id}">${t.name}</option>`
    ).join('');
    if (current) sel.value = current;
  });
  // default: different teams
  document.getElementById('teamAway').value = sorted[1]?.id || '';
}

/* ─── RENDER TABLE ───────────────────────────────────────── */
function renderTable(animate = true, forceChangedIds = null) {
  const sorted = sortTeams(teams);
  const tbody = document.getElementById('tableBody');

  // Save current rendered rows (keyed by team ID) for FLIP animation
  const existingRows = {};
  tbody.querySelectorAll('tr[data-id]').forEach(row => {
    existingRows[row.dataset.id] = row.getBoundingClientRect().top;
  });

  // Detect which teams changed data
  const changedIds = forceChangedIds ?? (animate
    ? teams.filter(t => {
      const old = previousOrder.__oldData?.find(o => o.id === t.id);
      return old && (pts(t) !== pts(old) || t.pj !== old.pj || t.gf !== old.gf || t.gc !== old.gc);
    }).map(t => t.id)
    : []);

  // Clear
  tbody.innerHTML = '';

  // Zone class helper (top 3 = promotion, bottom 3 = relegation — illustrative)
  const zoneClass = pos => {
    if (pos <= 3) return 'zone-promotion';
    if (pos > sorted.length - 3) return 'zone-relegation';
    return '';
  };

  sorted.forEach((t, i) => {
    const pos = i + 1;
    const difVal = dif(t);
    const ptsVal = pts(t);
    const row = document.createElement('tr');
    row.dataset.id = t.id;
    row.className = zoneClass(pos);

    row.innerHTML = `
      <td class="cell-pos col-pos">${pos}</td>
      <td class="col-team"><span class="team-name">${t.name}</span></td>
      <td>${t.pj}</td>
      <td>${t.pg}</td>
      <td>${t.pe}</td>
      <td>${t.pp}</td>
      <td>${t.gf}</td>
      <td>${t.gc}</td>
      <td class="cell-dif ${difVal > 0 ? 'positive' : difVal < 0 ? 'negative' : 'zero'}">${formatDif(difVal)}</td>
      <td class="cell-pts col-pts">${ptsVal}</td>
    `;

    tbody.appendChild(row);
  });

  if (animate && Object.keys(existingRows).length > 0) {
    animateRows(sorted, existingRows, changedIds);
  }

  // Store previous order and data
  previousOrder = sorted.map(t => t.id);
  previousOrder.__oldData = deepClone(teams);
}

/* ─── ANIMATE ROWS (FLIP technique) ─────────────────────── */
function animateRows(sorted, oldTops, changedIds) {
  const tbody = document.getElementById('tableBody');

  sorted.forEach((t, i) => {
    const row = tbody.querySelectorAll('tr[data-id]')[i];
    if (!row) return;

    const oldTop = oldTops[t.id];
    const newTop = row.getBoundingClientRect().top;

    if (oldTop !== undefined && Math.abs(newTop - oldTop) > 2) {
      const delta = oldTop - newTop;
      row.style.transition = 'none';
      row.style.transform = `translateY(${delta}px)`;
      row.style.opacity = '0.6';

      requestAnimationFrame(() => {
        row.style.transition = 'transform 0.55s cubic-bezier(0.34,1.2,0.64,1), opacity 0.3s';
        row.style.transform = 'translateY(0)';
        row.style.opacity = '1';

        // Add direction class for extra flair
        const moved = delta > 0 ? 'row-moved-up' : 'row-moved-down';
        row.classList.add(moved);
        setTimeout(() => row.classList.remove(moved), 700);
      });
    }

    // Highlight changed rows
    if (changedIds.includes(t.id)) {
      setTimeout(() => {
        row.classList.add('row-highlight');
        setTimeout(() => row.classList.remove('row-highlight'), 1500);
        // Animate individual stat cells
        animateCells(row);
      }, 120);
    }
  });
}

/* ─── ANIMATE CELLS (count bounce) ──────────────────────── */
function animateCells(row) {
  // Skip pos and team columns
  const cells = Array.from(row.querySelectorAll('td')).slice(2);
  cells.forEach((cell, i) => {
    setTimeout(() => {
      cell.classList.add('count-anim');
      setTimeout(() => cell.classList.remove('count-anim'), 700);
    }, i * 60);
  });
}

/* ─── MATCH LOGIC ────────────────────────────────────────── */
function applyMatch(homeId, awayId, goalsHome, goalsAway) {
  const home = teams.find(t => t.id === homeId);
  const away = teams.find(t => t.id === awayId);
  if (!home || !away) return;

  home.pj++; away.pj++;
  home.gf += goalsHome; home.gc += goalsAway;
  away.gf += goalsAway; away.gc += goalsHome;

  if (goalsHome > goalsAway) {
    home.pg++; away.pp++;
  } else if (goalsHome < goalsAway) {
    away.pg++; home.pp++;
  } else {
    home.pe++; away.pe++;
  }
}

function applyQueue() {
  if (matchQueue.length === 0) {
    showToast('No hay partidos en cola.', 'error');
    return;
  }

  const btnUpdate = document.getElementById('btnUpdate');
  const btnAdd = document.getElementById('btnAddMatch');
  const btnReset = document.getElementById('btnReset');
  btnUpdate.disabled = true;
  btnAdd.disabled = true;
  btnReset.disabled = true;

  const queue = [...matchQueue];
  matchQueue = [];
  updateQueueUI();

  const STEP_DELAY = 2500;

  queue.forEach((m, i) => {
    setTimeout(() => {
      previousOrder.__oldData = deepClone(teams);
      const oldSorted = sortTeams(teams);
      previousOrder = oldSorted.map(t => t.id);

      applyMatch(m.homeId, m.awayId, m.goalsHome, m.goalsAway);
      renderTable(true, [m.homeId, m.awayId]);

      if (i === queue.length - 1) {
        setTimeout(() => {
          triggerFinalGlow();
          showToast('✓ Todos los resultados actualizados');
          btnUpdate.disabled = false;
          btnAdd.disabled = false;
          btnReset.disabled = false;
        }, 700);
      }
    }, i * STEP_DELAY);
  });
}

/* ─── QUEUE UI ───────────────────────────────────────────── */
function addToQueue() {
  const homeId = document.getElementById('teamHome').value;
  const awayId = document.getElementById('teamAway').value;
  const gh = parseInt(document.getElementById('goalsHome').value, 10);
  const ga = parseInt(document.getElementById('goalsAway').value, 10);

  if (homeId === awayId) {
    showToast('Seleccioná dos equipos distintos.', 'error');
    return;
  }
  if (isNaN(gh) || isNaN(ga) || gh < 0 || ga < 0) {
    showToast('Ingresá goles válidos.', 'error');
    return;
  }

  const homeName = teams.find(t => t.id === homeId)?.name || homeId;
  const awayName = teams.find(t => t.id === awayId)?.name || awayId;

  matchQueue.push({ homeId, awayId, goalsHome: gh, goalsAway: ga, homeName, awayName });
  updateQueueUI();
  showToast(`Partido agregado: ${homeName} ${gh} - ${ga} ${awayName}`);

  // Reset goals
  document.getElementById('goalsHome').value = 0;
  document.getElementById('goalsAway').value = 0;
}

function updateQueueUI() {
  const container = document.getElementById('matchQueue');
  const list = document.getElementById('queueList');

  if (matchQueue.length === 0) {
    container.classList.add('hidden');
    return;
  }

  container.classList.remove('hidden');
  list.innerHTML = matchQueue.map((m, i) => `
    <li>
      <span>${m.homeName} ${m.goalsHome} — ${m.goalsAway} ${m.awayName}</span>
      <span class="remove-btn" data-index="${i}" title="Quitar">✕</span>
    </li>
  `).join('');

  list.querySelectorAll('.remove-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      matchQueue.splice(parseInt(btn.dataset.index, 10), 1);
      updateQueueUI();
    });
  });
}

/* ─── TOAST ──────────────────────────────────────────────── */
let toastTimer = null;
function showToast(msg, type = 'success') {
  const toast = document.getElementById('toast');
  toast.textContent = msg;
  toast.className = 'toast' + (type === 'error' ? ' error' : '');
  clearTimeout(toastTimer);
  // force reflow to restart animation
  void toast.offsetWidth;
  toastTimer = setTimeout(() => toast.classList.add('hidden'), 2800);
}

/* ─── FULLSCREEN ─────────────────────────────────────────── */
function triggerFinalGlow() {
  const wrapper = document.querySelector('.table-wrapper');
  wrapper.classList.add('glow-finish');
  setTimeout(() => wrapper.classList.remove('glow-finish'), 2200);
}

function toggleFullscreen() {
  const body = document.body;
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen?.()
      .then(() => body.classList.add('fullscreen'))
      .catch(() => body.classList.toggle('fullscreen'));
  } else {
    document.exitFullscreen?.()
      .then(() => body.classList.remove('fullscreen'))
      .catch(() => body.classList.toggle('fullscreen'));
  }
}

document.addEventListener('fullscreenchange', () => {
  if (!document.fullscreenElement) document.body.classList.remove('fullscreen');
});

/* ─── PANEL TOGGLE ───────────────────────────────────────── */
function setupPanelToggle() {
  const header = document.getElementById('inputPanel').querySelector('.panel-header');
  const body = document.getElementById('panelBody');
  const btn = document.getElementById('btnTogglePanel');

  header.addEventListener('click', () => {
    body.classList.toggle('collapsed');
    btn.textContent = body.classList.contains('collapsed') ? '▲' : '▼';
  });
}

function exportState() {
  const data = {
    exportDate: new Date().toISOString(),
    teams: teams
  };
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `apertura2025_${new Date().toISOString().slice(0, 10)}.json`;
  a.click();
  URL.revokeObjectURL(url);
  showToast('✓ Estado exportado');
}

function importState(file) {
  const reader = new FileReader();
  reader.onload = e => {
    try {
      const data = JSON.parse(e.target.result);
      if (!data.teams) throw new Error();
      teams = data.teams;
      previousOrder = sortTeams(teams).map(t => t.id);
      renderTable(false);
      populateSelects();
      showToast('✓ Estado importado correctamente');
    } catch {
      showToast('Error al leer el archivo.', 'error');
    }
  };
  reader.readAsText(file);
}

/* ─── EVENT LISTENERS ────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  init();
  setupPanelToggle();

  document.getElementById('btnAddMatch').addEventListener('click', addToQueue);
  document.getElementById('btnUpdate').addEventListener('click', applyQueue);

  document.getElementById('btnReset').addEventListener('click', () => {
    if (!matchQueue.length && teams.every(t => t.pj === 0)) {
      showToast('La tabla ya está en el estado inicial.', 'error');
      return;
    }
    if (confirm('¿Reiniciar la tabla a cero?')) {
      init();
      showToast('Tabla reiniciada.');
    }
  });

  document.getElementById('btnExport').addEventListener('click', exportState);
  document.getElementById('btnImport').addEventListener('click', () => document.getElementById('fileImport').click());
  document.getElementById('fileImport').addEventListener('change', e => {
    if (e.target.files[0]) importState(e.target.files[0]);
    e.target.value = '';
  });

  document.getElementById('btnFullscreen').addEventListener('click', toggleFullscreen);

  // Enter key en inputs para agregar partido rápido
  ['goalsHome', 'goalsAway'].forEach(id => {
    document.getElementById(id).addEventListener('keydown', e => {
      if (e.key === 'Enter') document.getElementById('btnAddMatch').click();
    });
  });
});
