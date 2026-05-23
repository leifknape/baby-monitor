const STORAGE_KEY = "baby-monitor-state-v1";
const DEMO_VERSION = 2;

const entryChoices = [
  { id: "feeding", label: "Trinken", type: "feeding", icon: "bottle" },
  { id: "diaper", label: "Windel", type: "diaper", icon: "diaper" },
  { id: "weight", label: "Gewicht", type: "measurement", kind: "weight", icon: "scale" },
  { id: "length", label: "Körperlänge", type: "measurement", kind: "length", icon: "ruler" },
  { id: "head", label: "Kopfumfang", type: "measurement", kind: "head", icon: "circle" },
  { id: "temperature", label: "Temperatur", type: "measurement", kind: "temperature", icon: "thermometer" },
  { id: "spo2", label: "Sauerstoffsättigung", type: "measurement", kind: "spo2", icon: "drop" },
  { id: "heart_rate", label: "Herzfrequenz", type: "measurement", kind: "heart_rate", icon: "heart" },
  { id: "respiratory_rate", label: "Atemfrequenz", type: "measurement", kind: "respiratory_rate", icon: "lungs" },
  { id: "observation", label: "Beobachtung", type: "observation", icon: "eye" },
  { id: "medication", label: "Medikament", type: "medication", icon: "pill" },
  { id: "medical_finding", label: "Arztbefund", type: "medical_finding", icon: "stethoscope" },
  { id: "note", label: "Freie Notiz", type: "note", icon: "note" },
];

const navItems = [
  { id: "dashboard", label: "Übersicht", icon: "home" },
  { id: "timeline", label: "Timeline", icon: "list" },
  { id: "spacer", label: "", icon: "" },
  { id: "analytics", label: "Verlauf", icon: "chart" },
  { id: "settings", label: "Einstellungen", icon: "settings" },
];

const state = loadState();
let view = location.hash === "#analytics" ? "analytics" : "dashboard";
let activeSheet = location.hash === "#add" ? "choice" : null;
let editingId = null;
let timelineFilter = "today";
let customRange = {
  from: new Date().toISOString().slice(0, 10),
  to: new Date().toISOString().slice(0, 10),
};

function defaultState() {
  const childId = crypto.randomUUID();
  const child = {
    id: childId,
    name: "Lina",
    birthDate: new Date(new Date().setMonth(new Date().getMonth() - 5)).toISOString().slice(0, 10),
    birthWeightGrams: 3220,
    birthLengthCm: 51,
    birthHeadCircumferenceCm: 35,
  };

  return {
    child,
    entries: createDemoEntries(childId),
    settings: {
      defaultMilk: "Pre",
      darkMode: true,
      demoVersion: DEMO_VERSION,
    },
  };
}

function createDemoEntries(childId) {
  const now = new Date();
  const at = (hour, minute, dayOffset = 0) => {
    const date = new Date(now);
    date.setDate(date.getDate() + dayOffset);
    date.setHours(hour, minute, 0, 0);
    return date.toISOString();
  };
  const createdAt = now.toISOString();
  const entry = (type, timestamp, value, unit, data, notes) => ({
    id: crypto.randomUUID(),
    childId,
    type,
    timestamp,
    createdAt,
    updatedAt: createdAt,
    ...(value !== undefined ? { value } : {}),
    ...(unit ? { unit } : {}),
    data: { ...(data || {}), demo: true },
    ...(notes ? { notes } : {}),
  });

  return [
    entry("feeding", at(6, 20, -6), 90, "ml", { completion: "ja", spitUp: "nein", milkType: "Pre" }),
    entry("feeding", at(11, 10, -6), 105, "ml", { completion: "ja", spitUp: "wenig", milkType: "Pre" }),
    entry("feeding", at(15, 50, -6), 95, "ml", { completion: "teilweise", spitUp: "nein", milkType: "Pre" }),
    entry("diaper", at(8, 30, -6), undefined, undefined, { wet: true, wetAmount: "normal", stool: false }),
    entry("diaper", at(16, 10, -6), undefined, undefined, { wet: true, wetAmount: "normal", stool: true, stoolColor: "gelb", consistency: "weich" }),
    entry("observation", at(18, 20, -6), undefined, undefined, { categories: ["Trinken: spuckt mehr"], severity: "leicht", duration: "kurz" }, "nach der Flasche etwas gespuckt"),
    entry("measurement", at(9, 0, -6), 6140, "g", { kind: "weight" }),
    entry("measurement", at(9, 5, -6), 61.2, "cm", { kind: "length" }),
    entry("measurement", at(9, 8, -6), 39.4, "cm", { kind: "head" }),
    entry("measurement", at(9, 12, -6), 36.8, "°C", { kind: "temperature", situation: "Achsel" }),
    entry("measurement", at(9, 14, -6), 98, "%", { kind: "spo2", situation: "wach" }),
    entry("measurement", at(9, 16, -6), 132, "bpm", { kind: "heart_rate", situation: "ruhig" }),
    entry("measurement", at(9, 18, -6), 36, "/min", { kind: "respiratory_rate", situation: "ruhig" }),

    entry("feeding", at(7, 0, -5), 100, "ml", { completion: "ja", spitUp: "nein", milkType: "Pre" }),
    entry("feeding", at(12, 15, -5), 110, "ml", { completion: "ja", spitUp: "nein", milkType: "Pre" }),
    entry("feeding", at(18, 30, -5), 105, "ml", { completion: "ja", spitUp: "wenig", milkType: "Pre" }),
    entry("diaper", at(9, 45, -5), undefined, undefined, { wet: true, wetAmount: "viel", stool: false }),
    entry("diaper", at(19, 20, -5), undefined, undefined, { wet: true, wetAmount: "normal", stool: true, stoolColor: "braun", consistency: "weich" }),
    entry("measurement", at(8, 30, -5), 6220, "g", { kind: "weight" }),
    entry("measurement", at(8, 35, -5), 61.4, "cm", { kind: "length" }),
    entry("measurement", at(8, 38, -5), 39.6, "cm", { kind: "head" }),
    entry("measurement", at(8, 40, -5), 36.9, "°C", { kind: "temperature", situation: "Stirn" }),
    entry("measurement", at(8, 42, -5), 97, "%", { kind: "spo2", situation: "schlafend" }),
    entry("measurement", at(8, 44, -5), 126, "bpm", { kind: "heart_rate", situation: "schlafend" }),
    entry("measurement", at(8, 46, -5), 34, "/min", { kind: "respiratory_rate", situation: "schlafend" }),

    entry("feeding", at(6, 40, -4), 105, "ml", { completion: "ja", spitUp: "nein", milkType: "Pre" }),
    entry("feeding", at(11, 45, -4), 115, "ml", { completion: "ja", spitUp: "nein", milkType: "Pre" }),
    entry("feeding", at(17, 35, -4), 110, "ml", { completion: "ja", spitUp: "wenig", milkType: "Pre" }),
    entry("diaper", at(7, 35, -4), undefined, undefined, { wet: true, wetAmount: "normal", stool: false }),
    entry("diaper", at(14, 10, -4), undefined, undefined, { wet: true, wetAmount: "normal", stool: false }),
    entry("observation", at(16, 45, -4), undefined, undefined, { categories: ["Verhalten: sehr unruhig"], severity: "mittel", duration: "ca. 30 Minuten" }, "abends unruhiger als sonst"),
    entry("medical_finding", at(9, 30, -4), undefined, undefined, { findingType: "Echo", place: "Kinderkardiologie", vmax: 2.1, gradient: 18, insufficiency: "gering", assessment: "Kontrolle dokumentiert, nächster Befund nach ärztlicher Absprache." }),
    entry("measurement", at(10, 0, -4), 6290, "g", { kind: "weight" }),
    entry("measurement", at(10, 5, -4), 61.5, "cm", { kind: "length" }),
    entry("measurement", at(10, 8, -4), 39.7, "cm", { kind: "head" }),
    entry("measurement", at(21, 0, -4), 37.1, "°C", { kind: "temperature", situation: "Ohr" }),

    entry("feeding", at(6, 15, -3), 110, "ml", { completion: "ja", spitUp: "nein", milkType: "Pre" }),
    entry("feeding", at(10, 50, -3), 120, "ml", { completion: "ja", spitUp: "nein", milkType: "Pre" }),
    entry("feeding", at(15, 40, -3), 115, "ml", { completion: "teilweise", spitUp: "wenig", milkType: "Pre" }),
    entry("feeding", at(20, 20, -3), 100, "ml", { completion: "ja", spitUp: "nein", milkType: "Pre" }),
    entry("diaper", at(8, 5, -3), undefined, undefined, { wet: true, wetAmount: "viel", stool: false }),
    entry("diaper", at(13, 0, -3), undefined, undefined, { wet: true, wetAmount: "normal", stool: true, stoolColor: "gelb", consistency: "normal" }),
    entry("measurement", at(9, 0, -3), 6330, "g", { kind: "weight" }),
    entry("measurement", at(9, 3, -3), 61.7, "cm", { kind: "length" }),
    entry("measurement", at(9, 6, -3), 39.8, "cm", { kind: "head" }),
    entry("measurement", at(9, 12, -3), 98, "%", { kind: "spo2", situation: "wach" }),
    entry("measurement", at(9, 14, -3), 136, "bpm", { kind: "heart_rate", situation: "wach" }),
    entry("measurement", at(9, 16, -3), 38, "/min", { kind: "respiratory_rate", situation: "wach" }),

    entry("feeding", at(7, 10, -2), 115, "ml", { completion: "ja", spitUp: "nein", milkType: "Pre" }),
    entry("feeding", at(12, 0, -2), 125, "ml", { completion: "ja", spitUp: "nein", milkType: "Pre" }),
    entry("feeding", at(18, 0, -2), 115, "ml", { completion: "ja", spitUp: "wenig", milkType: "Pre" }),
    entry("diaper", at(7, 55, -2), undefined, undefined, { wet: true, wetAmount: "normal", stool: false }),
    entry("diaper", at(15, 45, -2), undefined, undefined, { wet: true, wetAmount: "viel", stool: false }),
    entry("observation", at(13, 25, -2), undefined, undefined, { categories: ["Verhalten: ungewöhnlich schläfrig"], severity: "leicht", duration: "nach dem Trinken" }, "längerer Mittagsschlaf"),
    entry("measurement", at(10, 0, -2), 6370, "g", { kind: "weight" }),
    entry("measurement", at(10, 4, -2), 61.8, "cm", { kind: "length" }),
    entry("measurement", at(10, 7, -2), 39.9, "cm", { kind: "head" }),
    entry("measurement", at(20, 0, -2), 36.7, "°C", { kind: "temperature", situation: "Achsel" }),

    entry("feeding", at(6, 50, -1), 120, "ml", { completion: "ja", spitUp: "nein", milkType: "Pre" }),
    entry("feeding", at(11, 30, -1), 125, "ml", { completion: "ja", spitUp: "nein", milkType: "Pre" }),
    entry("feeding", at(16, 15, -1), 110, "ml", { completion: "teilweise", spitUp: "wenig", milkType: "Pre" }),
    entry("feeding", at(21, 0, -1), 115, "ml", { completion: "ja", spitUp: "nein", milkType: "Pre" }),
    entry("diaper", at(9, 10, -1), undefined, undefined, { wet: true, wetAmount: "normal", stool: false }),
    entry("diaper", at(18, 45, -1), undefined, undefined, { wet: true, wetAmount: "normal", stool: true, stoolColor: "gelb", consistency: "weich" }),
    entry("observation", at(19, 15, -1), undefined, undefined, { categories: ["Sonstiges: anderes"], severity: "leicht" }, "lange wach, danach gut eingeschlafen"),
    entry("medical_finding", at(10, 15, -1), undefined, undefined, { findingType: "Arztgespräch", place: "Praxis", vmax: 2.0, gradient: 16, insufficiency: "gering", assessment: "Besprochener Verlauf dokumentiert." }),
    entry("measurement", at(8, 30, -1), 6400, "g", { kind: "weight" }),
    entry("measurement", at(8, 34, -1), 61.9, "cm", { kind: "length" }),
    entry("measurement", at(8, 37, -1), 40.0, "cm", { kind: "head" }),
    entry("measurement", at(8, 40, -1), 97, "%", { kind: "spo2", situation: "schlafend" }),
    entry("measurement", at(8, 42, -1), 128, "bpm", { kind: "heart_rate", situation: "schlafend" }),
    entry("measurement", at(8, 44, -1), 35, "/min", { kind: "respiratory_rate", situation: "schlafend" }),

    entry("feeding", at(6, 10), 95, "ml", { completion: "ja", spitUp: "nein", milkType: "Pre" }, "ruhig getrunken"),
    entry("diaper", at(7, 5), undefined, undefined, { wet: true, wetAmount: "normal", stool: false }, "morgens"),
    entry("feeding", at(10, 20), 110, "ml", { completion: "teilweise", spitUp: "wenig", milkType: "Pre" }),
    entry("observation", at(12, 15), undefined, undefined, { categories: ["Verhalten: sehr unruhig"], severity: "leicht", duration: "ca. 20 Minuten" }, "nach dem Mittagsschlaf wieder zufrieden"),
    entry("diaper", at(13, 40), undefined, undefined, { wet: true, wetAmount: "viel", stool: true, stoolColor: "gelb", consistency: "weich" }),
    entry("feeding", at(15, 30), 120, "ml", { completion: "ja", spitUp: "nein", milkType: "Pre" }),
    entry("measurement", at(17, 0), 6450, "g", { kind: "weight" }, "zu Hause gewogen"),
    entry("measurement", at(17, 5), 62, "cm", { kind: "length" }),
    entry("measurement", at(17, 7), 40, "cm", { kind: "head" }),
    entry("measurement", at(17, 10), 36.9, "°C", { kind: "temperature", situation: "Achsel" }),
    entry("measurement", at(17, 12), 98, "%", { kind: "spo2", situation: "wach" }),
    entry("measurement", at(17, 14), 134, "bpm", { kind: "heart_rate", situation: "ruhig" }),
    entry("measurement", at(17, 16), 36, "/min", { kind: "respiratory_rate", situation: "ruhig" }),
    entry("feeding", at(20, 45), 105, "ml", { completion: "ja", spitUp: "wenig", milkType: "Pre" }),
    entry("medical_finding", at(11, 30), undefined, undefined, { findingType: "Echo", place: "Kinderkardiologie", vmax: 1.9, gradient: 15, insufficiency: "gering", assessment: "Befund als Freitext dokumentiert." }),
  ].sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
}

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultState();
    const parsed = JSON.parse(raw);
    const fallback = defaultState();
    const next = {
      ...fallback,
      ...parsed,
      settings: { ...fallback.settings, ...(parsed.settings || {}) },
    };
    if (!parsed.settings?.explicitThemeChoice) next.settings.darkMode = true;
    const needsDemoRefresh = !parsed.settings?.demoRemoved && (
      !Array.isArray(next.entries) ||
      next.entries.length === 0 ||
      (next.entries.some((entry) => entry.data?.demo) && next.settings.demoVersion !== DEMO_VERSION)
    );
    if (needsDemoRefresh) {
      const realEntries = Array.isArray(next.entries) ? next.entries.filter((entry) => !entry.data?.demo) : [];
      next.entries = [...realEntries, ...createDemoEntries(next.child.id)].sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
      next.settings.demoVersion = DEMO_VERSION;
    }
    if (!parsed.settings?.demoRemoved && (!Array.isArray(next.entries) || next.entries.length === 0)) {
      next.entries = createDemoEntries(next.child.id);
      next.settings.demoVersion = DEMO_VERSION;
    }
    return next;
  } catch {
    return defaultState();
  }
}

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function render() {
  document.documentElement.dataset.theme = state.settings.darkMode ? "dark" : "light";
  document.getElementById("app").innerHTML = `
    <main class="app-shell">
      ${renderTopbar()}
      ${renderView()}
    </main>
    ${renderBottomNav()}
    <button class="plus-button" type="button" aria-label="Eintrag hinzufügen" data-action="open-add">${icon("plus")}</button>
    ${activeSheet ? renderSheet() : ""}
  `;
  bindEvents();
}

function renderTopbar() {
  return `
    <header class="topbar">
      <div class="child-chip">
        <div class="avatar" aria-hidden="true">${state.child.name.slice(0, 1).toUpperCase()}</div>
        <div>
          <h1 class="child-name">${escapeHtml(state.child.name)}</h1>
          <div class="child-meta">${childAgeText(state.child.birthDate)}</div>
        </div>
      </div>
    </header>
  `;
}

function renderView() {
  if (view === "timeline") return renderTimeline();
  if (view === "analytics") return renderAnalytics();
  if (view === "settings") return renderSettings();
  return renderDashboard();
}

function renderDashboard() {
  const today = entriesForDay(new Date());
  const feedings = today.filter((entry) => entry.type === "feeding" && Number(entry.value) > 0);
  const diapers = today.filter((entry) => entry.type === "diaper");
  const wet = diapers.filter((entry) => entry.data?.wet);
  const stool = diapers.filter((entry) => entry.data?.stool);
  const latestFeeding = latest(state.entries.filter((entry) => entry.type === "feeding"));
  const latestWeight = latest(measurements("weight"));
  const latestObservation = latest(state.entries.filter((entry) => entry.type === "observation"));
  const latestFinding = latest(state.entries.filter((entry) => entry.type === "medical_finding"));
  const totalMl = sum(feedings.map((entry) => Number(entry.value || 0)));
  const avgMl = feedings.length ? Math.round(totalMl / feedings.length) : null;

  const cards = [];
  if (feedings.length) {
    cards.push(statCard("Trinkmenge heute", `${totalMl} ml`, `${feedings.length} Fütterungen`, "bottle"));
    cards.push(statCard("Anzahl Fütterungen", String(feedings.length), avgMl ? `Ø ${avgMl} ml pro Flasche` : "", "chart"));
  }
  if (latestFeeding) cards.push(statCard("Letzte Fütterung", timeText(latestFeeding.timestamp), detailForEntry(latestFeeding), "clock"));
  if (wet.length) cards.push(statCard("Nasse Windeln heute", String(wet.length), latestTimeSub(wet), "diaper"));
  if (stool.length) cards.push(statCard("Stuhlwindeln heute", String(stool.length), latestTimeSub(stool), "diaper"));
  if (latestWeight) cards.push(statCard("Letztes Gewicht", formatValue(latestWeight), dateTimeText(latestWeight.timestamp), "scale"));
  dashboardMeasurementCards().forEach((card) => cards.push(card));
  if (latestObservation) cards.push(statCard("Letzte Beobachtung", firstLine(latestObservation.notes || categoriesText(latestObservation)), dateTimeText(latestObservation.timestamp), "eye"));
  if (latestFinding) cards.push(statCard("Letzter Arztbefund", firstLine(latestFinding.data?.assessment || latestFinding.notes || latestFinding.data?.findingType || "Dokumentiert"), dateTimeText(latestFinding.timestamp), "stethoscope"));

  return `
    ${cards.length ? `<section class="dashboard-grid">${cards.join("")}</section>` : renderEmptyDashboard()}
    <section>
      <div class="section-head">
        <h2>Heute</h2>
        <span>${today.length ? `${today.length} Einträge` : "Noch keine Einträge vorhanden"}</span>
      </div>
      <div class="timeline-list">
        ${today.length ? today.slice(0, 7).map(renderEntryRow).join("") : `<div class="empty">Noch keine Einträge vorhanden</div>`}
      </div>
    </section>
  `;
}

function dashboardMeasurementCards() {
  return [
    ["length", "Letzte Körperlänge", "ruler"],
    ["head", "Letzter Kopfumfang", "circle"],
    ["temperature", "Letzte Temperatur", "thermometer"],
    ["spo2", "Letzte SpO₂", "drop"],
    ["heart_rate", "Letzte Herzfrequenz", "heart"],
    ["respiratory_rate", "Letzte Atemfrequenz", "lungs"],
  ].map(([kind, label, iconName]) => {
    const entry = latest(measurements(kind));
    if (!entry) return "";
    return statCard(label, formatValue(entry), dateTimeText(entry.timestamp), iconName);
  }).filter(Boolean);
}

function renderEmptyDashboard() {
  return `
    <section class="panel">
      <h2>Ereignisse dokumentieren, wenn sie anfallen</h2>
      <p class="detail-stack">Diese Übersicht zeigt nur tatsächlich vorhandene Daten. Werte sind optional und können jederzeit über <strong>Eintrag hinzufügen</strong> ergänzt werden.</p>
    </section>
  `;
}

function statCard(label, value, sub, iconName, wide = false) {
  const longValue = String(value).length > 16;
  return `
    <article class="stat-card ${wide ? "wide" : ""}">
      <div class="stat-icon">${icon(iconName)}</div>
      <div class="stat-label">${escapeHtml(label)}</div>
      <div class="stat-value ${longValue ? "long" : ""}">${escapeHtml(value)}</div>
      ${sub ? `<div class="stat-sub">${escapeHtml(sub)}</div>` : ""}
    </article>
  `;
}

function renderTimeline() {
  const filtered = filteredTimelineEntries();
  return `
    <section>
      <div class="section-head">
        <h2>Timeline</h2>
        <span>${filtered.length ? `${filtered.length} Einträge` : "Noch keine Einträge vorhanden"}</span>
      </div>
      <div class="filters">
        ${[
          ["today", "Heute"],
          ["yesterday", "Gestern"],
          ["7days", "Letzte 7 Tage"],
          ["custom", "Eigener Zeitraum"],
          ["feeding", "Trinken"],
          ["diaper", "Windeln"],
          ["measurement", "Messwerte"],
          ["measurement:weight", "Gewicht"],
          ["measurement:head", "Kopfumfang"],
          ["measurement:length", "Körperlänge"],
          ["measurement:temperature", "Temperatur"],
          ["observation", "Beobachtungen"],
          ["medication", "Medikamente"],
          ["medical_finding", "Arztbefunde"],
        ].map(([id, label]) => `<button class="chip ${timelineFilter === id ? "active" : ""}" type="button" data-filter="${id}">${label}</button>`).join("")}
      </div>
      ${timelineFilter === "custom" ? `
        <div class="custom-range">
          <div class="field"><label for="range-from">Von</label><input id="range-from" type="date" value="${customRange.from}" /></div>
          <div class="field"><label for="range-to">Bis</label><input id="range-to" type="date" value="${customRange.to}" /></div>
        </div>
      ` : ""}
      <div class="timeline-list">
        ${filtered.length ? filtered.map(renderEntryRow).join("") : `<div class="empty">Noch keine Einträge vorhanden</div>`}
      </div>
    </section>
  `;
}

function renderEntryRow(entry) {
  return `
    <article class="entry-row" data-entry="${entry.id}">
      <div class="entry-time">${timeText(entry.timestamp)}</div>
      <div>
        <div class="entry-title">${entryTitle(entry)}</div>
        <div class="entry-detail">${escapeHtml(detailForEntry(entry))}</div>
      </div>
      <button class="icon-button" type="button" title="Eintrag öffnen" data-action="edit-entry" data-id="${entry.id}">${icon("chevron")}</button>
    </article>
  `;
}

function renderAnalytics() {
  const sections = [
    renderGrowthCharts(),
    renderFeedingCharts(),
    renderDiaperCharts(),
    renderVitalCharts(),
  ].filter(Boolean);

  return `
    <section>
      <div class="section-head">
        <h2>Verlauf</h2>
        <span>Nur vorhandene Werte</span>
      </div>
      <div class="analytics-list">
        ${sections.length ? sections.join("") : `<div class="empty">Noch nicht genug Werte für einen Verlauf.</div>`}
      </div>
    </section>
  `;
}

function renderGrowthCharts() {
  const kinds = [
    ["weight", "Gewicht", "g"],
    ["head", "Kopfumfang", "cm"],
    ["length", "Körperlänge", "cm"],
  ];
  const charts = kinds.map(([kind, title, unit]) => {
    const values = measurements(kind);
    if (values.length < 2) return "";
    return lineChart(title, values, unit, { showPointLabels: true, showTimeAxis: true });
  }).filter(Boolean);
  const latestWeight = latest(measurements("weight"));
  const priorWeight = measurements("weight").slice(-2)[0];
  const gainParts = [];
  if (state.child.birthWeightGrams && latestWeight) gainParts.push(`Seit Geburt: ${Math.round(latestWeight.value - state.child.birthWeightGrams)} g`);
  if (latestWeight && priorWeight && priorWeight.id !== latestWeight.id) gainParts.push(`Seit letzter Messung: ${Math.round(latestWeight.value - priorWeight.value)} g`);
  if (!charts.length && !gainParts.length) return "";
  return `<article class="chart-card"><div class="chart-title stacked"><span>Wachstum</span><small>${gainParts.join(" · ")}</small></div>${charts.join("") || `<div class="empty">Noch nicht genug Werte für einen Verlauf.</div>`}</article>`;
}

function renderFeedingCharts() {
  const feedings = state.entries.filter((entry) => entry.type === "feeding" && Number(entry.value) > 0);
  if (!feedings.length) return "";
  const byDay = dailyCounts(feedings, (items) => sum(items.map((entry) => Number(entry.value || 0))));
  const maxBottle = Math.max(...feedings.map((entry) => Number(entry.value)));
  const minBottle = Math.min(...feedings.map((entry) => Number(entry.value)));
  const avg = Math.round(sum(feedings.map((entry) => Number(entry.value))) / feedings.length);
  const currentWeight = latest(measurements("weight"));
  const mlKg = currentWeight ? ` · ca. ${Math.round((byDay.at(-1)?.value || 0) / (currentWeight.value / 1000))} ml/kg/Tag` : "";
  return `<article class="chart-card"><div class="chart-title"><span>Trinken</span><span>Ø ${avg} ml · ${minBottle}-${maxBottle} ml${mlKg}</span></div>${barChart(byDay, "ml")}</article>`;
}

function renderDiaperCharts() {
  const diapers = state.entries.filter((entry) => entry.type === "diaper");
  if (!diapers.length) return "";
  const wet = dailyCounts(diapers.filter((entry) => entry.data?.wet), (items) => items.length);
  const stool = dailyCounts(diapers.filter((entry) => entry.data?.stool), (items) => items.length);
  return `<article class="chart-card"><div class="chart-title"><span>Windeln</span><span>Nass und Stuhl pro Tag</span></div>${barChart(mergeSeries(wet, stool), "")}</article>`;
}

function renderObservationCharts() {
  const observations = state.entries.filter((entry) => entry.type === "observation");
  if (!observations.length) return "";
  const bySeverity = countBy(observations, (entry) => entry.data?.severity || "nicht angegeben");
  return `<article class="chart-card"><div class="chart-title"><span>Beobachtungen</span><span>Nach Schweregrad</span></div>${barChart(bySeverity, "")}</article>`;
}

function renderVitalCharts() {
  const values = measurements("temperature");
  if (values.length < 2) return "";
  return `<article class="chart-card"><div class="chart-title"><span>Temperatur</span><span>Nur eintragen, wenn gemessen</span></div>${lineChart("Temperatur", values, "°C", { showPointLabels: true, showTimeAxis: true })}</article>`;
}

function renderSettings() {
  const hasDemoData = state.entries.some((entry) => entry.data?.demo);
  return `
    <section>
      <div class="section-head">
        <h2>Einstellungen</h2>
        <span>Lokale Speicherung</span>
      </div>
      <div class="settings-card">
        <h3>Kind</h3>
        <div class="field"><label for="child-name">Name</label><input id="child-name" value="${escapeAttr(state.child.name)}" /></div>
        <div class="field"><label for="child-birth">Geburtsdatum</label><input id="child-birth" type="date" value="${escapeAttr(state.child.birthDate)}" /></div>
        <div class="field-row">
          <div class="field"><label for="birth-weight">Geburtsgewicht g <span>Optional</span></label><input id="birth-weight" type="number" inputmode="numeric" value="${state.child.birthWeightGrams || ""}" /></div>
          <div class="field"><label for="birth-length">Geburtslänge cm <span>Optional</span></label><input id="birth-length" type="number" step="0.1" value="${state.child.birthLengthCm || ""}" /></div>
        </div>
        <div class="field"><label for="birth-head">Kopfumfang bei Geburt cm <span>Optional</span></label><input id="birth-head" type="number" step="0.1" value="${state.child.birthHeadCircumferenceCm || ""}" /></div>
        <button class="primary-button" type="button" data-action="save-child">Speichern</button>
      </div>
      <div class="settings-card">
        <h3>Einstellungen</h3>
        <div class="field"><label for="default-milk">Standardnahrung</label><input id="default-milk" value="${escapeAttr(state.settings.defaultMilk)}" /></div>
        <div class="segmented"><label><input type="checkbox" id="dark-mode" ${state.settings.darkMode ? "checked" : ""} /> Dark Mode</label></div>
        <button class="text-button" type="button" data-action="refresh-app">App aktualisieren</button>
        <button class="primary-button" type="button" data-action="save-settings">Speichern</button>
      </div>
      <div class="settings-card">
        <h3>Demo-Daten</h3>
        <p class="detail-stack">Zum Kennenlernen sind Beispiel-Einträge lokal gespeichert. Du kannst sie entfernen und die App danach normal weiter nutzen.</p>
        <div class="export-grid">
          <button class="text-button" type="button" data-action="load-demo">Demo-Daten laden</button>
          <button class="danger-button" type="button" data-action="remove-demo" ${hasDemoData ? "" : "disabled"}>Demo-Daten entfernen</button>
        </div>
      </div>
      <div class="settings-card">
        <h3>CSV-Export</h3>
        <p class="detail-stack">Alle Daten bleiben lokal in diesem Browser. Der CSV-Export funktioniert ohne Server und ohne Weitergabe medizinischer Daten.</p>
        <div class="export-grid">
          <button class="text-button" type="button" data-action="export-long">Gesamtexport im Long-Format</button>
          <button class="text-button" type="button" data-action="export-separate">Separate CSVs exportieren</button>
        </div>
      </div>
    </section>
  `;
}

function renderBottomNav() {
  return `
    <nav class="bottom-nav" aria-label="Hauptnavigation">
      <div class="bottom-nav-inner">
        ${navItems.map((item) => `
          ${item.id === "spacer" ? `<div class="nav-spacer" aria-hidden="true"></div>` : `<button class="nav-button ${view === item.id ? "active" : ""}" type="button" data-nav="${item.id}">
            ${icon(item.icon)}
            <span>${item.label}</span>
          </button>`}
        `).join("")}
      </div>
    </nav>
  `;
}

function renderSheet() {
  if (activeSheet === "choice") {
    return `
      <div class="modal-backdrop" data-action="close-sheet">
        <section class="sheet" role="dialog" aria-modal="true" aria-label="Eintrag hinzufügen" data-sheet>
          <div class="sheet-handle"></div>
          <h2 class="sheet-title">Eintrag hinzufügen</h2>
          <div class="choice-grid">
            ${entryChoices.map((choice) => `
              <button class="choice-button" type="button" data-choice="${choice.id}">
                ${icon(choice.icon)}
                <span>${choice.label}</span>
              </button>
            `).join("")}
          </div>
          <div class="form-actions"><button class="quiet-button full" type="button" data-action="close-sheet">Abbrechen</button></div>
        </section>
      </div>
    `;
  }

  const entry = editingId ? state.entries.find((item) => item.id === editingId) : null;
  const choice = entry ? choiceForEntry(entry) : entryChoices.find((item) => item.id === activeSheet);
  return `
    <div class="modal-backdrop" data-action="close-sheet">
      <section class="sheet" role="dialog" aria-modal="true" aria-label="${entry ? "Eintrag bearbeiten" : "Wert dokumentieren"}" data-sheet>
        <div class="sheet-handle"></div>
        <h2 class="sheet-title">${entry ? "Eintrag bearbeiten" : "Wert dokumentieren"}: ${choice.label}</h2>
        <form class="form-grid" data-form="${choice.id}">
          ${renderFormFields(choice, entry)}
          <div class="form-actions">
            ${entry ? `<button class="danger-button" type="button" data-action="delete-entry" data-id="${entry.id}">Löschen</button>` : `<button class="quiet-button" type="button" data-action="close-sheet">Abbrechen</button>`}
            <button class="primary-button" type="submit">${entry ? "Speichern" : "Eintrag speichern"}</button>
          </div>
        </form>
      </section>
    </div>
  `;
}

function renderFormFields(choice, entry) {
  const data = entry?.data || {};
  const timestamp = toLocalInputValue(entry?.timestamp || new Date().toISOString());
  const notes = entry?.notes || "";
  const base = `<div class="field"><label for="timestamp">Zeitstempel</label><input id="timestamp" name="timestamp" type="datetime-local" value="${timestamp}" required /></div>`;

  if (choice.id === "feeding") {
    return `${base}
      <div class="field"><label for="amount">Menge in ml <span>Optional</span></label><input id="amount" name="value" type="range" min="0" max="300" step="10" value="${entry?.value || 0}" data-range="amount-number" /><input id="amount-number" type="number" inputmode="numeric" min="0" max="300" step="10" value="${entry?.value || ""}" placeholder="Nur eintragen, wenn gemessen" /></div>
      ${radioGroup("completion", "Vollständig getrunken", ["ja", "nein", "teilweise"], data.completion)}
      ${radioGroup("spitUp", "Spucken danach", ["nein", "wenig", "mittel", "viel", "schwallartig"], data.spitUp || "nein")}
      <div class="field"><label for="milkType">Milchtyp</label><input id="milkType" name="milkType" value="${escapeAttr(data.milkType || state.settings.defaultMilk || "Pre")}" /></div>
      ${notesField(notes)}`;
  }

  if (choice.id === "diaper") {
    return `${base}
      ${radioGroup("wet", "Nass", ["ja", "nein"], data.wet ? "ja" : "nein")}
      ${radioGroup("wetAmount", "Menge nass", ["wenig", "normal", "viel"], data.wetAmount)}
      ${radioGroup("stool", "Stuhl", ["ja", "nein"], data.stool ? "ja" : "nein")}
      <div class="field-row">
        ${selectField("stoolColor", "Stuhlfarbe Optional", ["", "gelb", "grün", "braun", "schwarz", "rot", "weißlich-hell"], data.stoolColor)}
        ${selectField("consistency", "Konsistenz Optional", ["", "flüssig", "weich", "normal", "fest"], data.consistency)}
      </div>
      ${notesField(notes)}`;
  }

  if (choice.type === "measurement") {
    return renderMeasurementFields(choice, entry, base, notes);
  }

  if (choice.id === "observation") {
    return `${base}
      ${renderObservationCategories(data.categories || [])}
      ${radioGroup("severity", "Schweregrad", ["leicht", "mittel", "stark"], data.severity || "leicht")}
      <div class="field"><label for="duration">Dauer <span>Optional</span></label><input id="duration" name="duration" value="${escapeAttr(data.duration || "")}" /></div>
      <div class="field"><label for="photo">Foto <span>Optional</span></label><input id="photo" name="photo" type="file" accept="image/*" /></div>
      ${notesField(notes)}`;
  }

  if (choice.id === "medication") {
    return `${base}
      <div class="field"><label for="medName">Name <span>Optional</span></label><input id="medName" name="medName" value="${escapeAttr(data.name || "")}" /></div>
      <div class="field-row">
        <div class="field"><label for="dose">Dosis <span>Optional</span></label><input id="dose" name="dose" value="${escapeAttr(data.dose || "")}" /></div>
        <div class="field"><label for="unit">Einheit <span>Optional</span></label><input id="unit" name="unit" value="${escapeAttr(data.unit || "")}" /></div>
      </div>
      ${radioGroup("given", "Gegeben", ["ja", "nein"], data.given === false ? "nein" : "ja")}
      ${checkGroup("flags", "Optional", ["wiederkehrend speichern", "Erinnerung"], data.flags || [])}
      ${notesField(notes)}`;
  }

  if (choice.id === "medical_finding") {
    return `${base}
      <div class="field"><label for="place">Ort/Klinik/Praxis <span>Optional</span></label><input id="place" name="place" value="${escapeAttr(data.place || "")}" /></div>
      ${selectField("findingType", "Art", ["Echo", "Herzkatheter", "Kontrolltermin", "Arztgespräch", "Entlassbrief", "Sonstiges"], data.findingType)}
      <div class="field-row">
        <div class="field"><label for="vmax">Vmax m/s <span>Optional</span></label><input id="vmax" name="vmax" type="number" step="0.01" value="${data.vmax || ""}" /></div>
        <div class="field"><label for="gradient">Druckgradient mmHg <span>Optional</span></label><input id="gradient" name="gradient" type="number" step="0.1" value="${data.gradient || ""}" /></div>
      </div>
      ${selectField("insufficiency", "Pulmonalklappen-Undichtigkeit Optional", ["", "keine", "gering", "mittel", "hochgradig", "nicht angegeben"], data.insufficiency)}
      <div class="field"><label for="assessment">Ärztliche Einschätzung <span>Optional</span></label><textarea id="assessment" name="assessment">${escapeHtml(data.assessment || "")}</textarea></div>
      <div class="field"><label for="nextControl">Nächster Kontrolltermin <span>Optional</span></label><input id="nextControl" name="nextControl" type="datetime-local" value="${data.nextControl ? toLocalInputValue(data.nextControl) : ""}" /></div>
      <div class="field"><label for="file">Datei/Foto <span>Optional</span></label><input id="file" name="file" type="file" /></div>
      ${notesField(notes)}`;
  }

  return `${base}
    <div class="field"><label for="title">Titel <span>Optional</span></label><input id="title" name="title" value="${escapeAttr(data.title || "")}" /></div>
    <div class="field"><label for="photo">Foto <span>Optional</span></label><input id="photo" name="photo" type="file" accept="image/*" /></div>
    <div class="field"><label for="notes">Freitext</label><textarea id="notes" name="notes">${escapeHtml(notes)}</textarea></div>`;
}

function renderMeasurementFields(choice, entry, base, notes) {
  const data = entry?.data || {};
  const specs = {
    weight: ["Gewicht in Gramm", "g", "number", "1", "Nur eintragen, wenn gemessen"],
    length: ["Körperlänge in cm", "cm", "number", "0.1", "Nur eintragen, wenn gemessen"],
    head: ["Kopfumfang in cm", "cm", "number", "0.1", "Nur eintragen, wenn gemessen"],
    temperature: ["Temperatur in °C", "°C", "number", "0.1", "Optional"],
    spo2: ["SpO₂ in %", "%", "number", "1", "Nur eintragen, wenn gemessen"],
    heart_rate: ["Herzfrequenz in bpm", "bpm", "number", "1", "Nur eintragen, wenn gemessen"],
    respiratory_rate: ["Atemzüge pro Minute", "/min", "number", "1", "Nur eintragen, wenn gemessen"],
  };
  const [label, unit, type, step, placeholder] = specs[choice.kind];
  const situationOptions = {
    temperature: ["", "rektal", "Ohr", "Stirn", "Achsel", "unbekannt"],
    spo2: ["", "wach", "schlafend", "unruhig", "schreiend", "nach dem Trinken", "sonstiges"],
    heart_rate: ["", "ruhig", "schlafend", "schreiend", "trinkt", "unruhig", "sonstiges"],
    respiratory_rate: ["", "ruhig", "schlafend", "unruhig", "schreiend", "sonstiges"],
  };
  return `${base}
    <div class="field"><label for="value">${label} <span>Optional</span></label><input id="value" name="value" type="${type}" step="${step}" value="${entry?.value || ""}" placeholder="${placeholder}" /></div>
    <input type="hidden" name="unit" value="${unit}" />
    ${situationOptions[choice.kind] ? selectField("situation", choice.kind === "temperature" ? "Messort Optional" : "Situation Optional", situationOptions[choice.kind], data.situation) : ""}
    ${choice.kind === "weight" ? `<div class="empty">Gewicht wird in Gramm gespeichert und angezeigt.</div>` : ""}
    ${notesField(notes)}`;
}

function notesField(notes) {
  return `<div class="field"><label for="notes">Notiz <span>Optional</span></label><textarea id="notes" name="notes">${escapeHtml(notes || "")}</textarea></div>`;
}

function radioGroup(name, label, options, selected) {
  return `
    <fieldset class="field">
      <legend>${label}</legend>
      <div class="segmented">
        ${options.map((option) => `<label><input type="radio" name="${name}" value="${escapeAttr(option)}" ${selected === option ? "checked" : ""} /> ${option}</label>`).join("")}
      </div>
    </fieldset>
  `;
}

function checkGroup(name, label, options, selected) {
  return `
    <fieldset class="field">
      <legend>${label}</legend>
      <div class="checkbox-grid">
        ${options.map((option) => `<label><input type="checkbox" name="${name}" value="${escapeAttr(option)}" ${selected.includes(option) ? "checked" : ""} /> ${option}</label>`).join("")}
      </div>
    </fieldset>
  `;
}

function selectField(name, label, options, selected) {
  return `
    <div class="field">
      <label for="${name}">${label}</label>
      <select id="${name}" name="${name}">
        ${options.map((option) => `<option value="${escapeAttr(option)}" ${selected === option ? "selected" : ""}>${option || "Optional"}</option>`).join("")}
      </select>
    </div>
  `;
}

function renderObservationCategories(selected) {
  const groups = {
    "Atmung": ["schnelle Atmung", "angestrengte Atmung", "Atempausen", "ungewöhnlich langsame Atmung"],
    "Farbe/Kreislauf": ["blass", "blau/grau", "marmoriert", "kalte Hände/Füße"],
    "Trinken": ["trinkt schlechter als sonst", "schwitzt beim Trinken", "erschöpft", "spuckt mehr", "Erbrechen"],
    "Verhalten": ["ungewöhnlich schläfrig", "sehr unruhig", "schwer weckbar", "schrilles Schreien"],
    "Wunde/Einstichstelle": ["Blutung", "Schwellung", "Rötung", "Wärme", "Sekret"],
    "Sonstiges": ["Fieber", "weniger nasse Windeln", "anderes"],
  };
  return Object.entries(groups).map(([group, options]) => `
    <section class="checkbox-section">
      <h3>${group}</h3>
      <div class="checkbox-grid">
        ${options.map((option) => `<label><input type="checkbox" name="categories" value="${escapeAttr(`${group}: ${option}`)}" ${selected.includes(`${group}: ${option}`) ? "checked" : ""} /> ${option}</label>`).join("")}
      </div>
    </section>
  `).join("");
}

function bindEvents() {
  document.querySelectorAll("[data-nav]").forEach((button) => {
    button.addEventListener("click", () => {
      view = button.dataset.nav;
      activeSheet = null;
      render();
    });
  });
  document.querySelectorAll("[data-action='open-add']").forEach((button) => button.addEventListener("click", () => openChoice()));
  document.querySelectorAll("[data-action='close-sheet']").forEach((element) => {
    element.addEventListener("click", (event) => {
      if (event.target.closest("[data-sheet]") && event.currentTarget.classList.contains("modal-backdrop")) return;
      closeSheet();
    });
  });
  document.querySelectorAll("[data-choice]").forEach((button) => {
    button.addEventListener("click", () => {
      activeSheet = button.dataset.choice;
      editingId = null;
      render();
    });
  });
  document.querySelectorAll("[data-form]").forEach((form) => {
    form.addEventListener("submit", async (event) => {
      event.preventDefault();
      await saveEntry(form.dataset.form, new FormData(form));
    });
  });
  document.querySelectorAll("[data-action='edit-entry']").forEach((button) => {
    button.addEventListener("click", () => {
      const entry = state.entries.find((item) => item.id === button.dataset.id);
      const choice = choiceForEntry(entry);
      editingId = entry.id;
      activeSheet = choice.id;
      render();
    });
  });
  document.querySelectorAll("[data-action='delete-entry']").forEach((button) => {
    button.addEventListener("click", () => {
      state.entries = state.entries.filter((entry) => entry.id !== button.dataset.id);
      saveState();
      closeSheet();
    });
  });
  document.querySelectorAll("[data-filter]").forEach((button) => {
    button.addEventListener("click", () => {
      timelineFilter = button.dataset.filter;
      render();
    });
  });
  ["range-from", "range-to"].forEach((id) => {
    const input = document.getElementById(id);
    if (!input) return;
    input.addEventListener("change", () => {
      customRange[id === "range-from" ? "from" : "to"] = input.value || customRange[id === "range-from" ? "from" : "to"];
      render();
    });
  });
  document.querySelectorAll("[data-range]").forEach((range) => {
    const number = document.getElementById(range.dataset.range);
    if (!number) return;
    range.addEventListener("input", () => {
      number.value = range.value === "0" ? "" : range.value;
    });
    number.addEventListener("input", () => {
      range.value = number.value || 0;
    });
  });
  const actions = {
    "save-child": saveChild,
    "save-settings": saveSettings,
    "refresh-app": refreshApp,
    "load-demo": loadDemoData,
    "remove-demo": removeDemoData,
    "export-long": exportLongCsv,
    "export-separate": exportSeparateCsvs,
  };
  document.querySelectorAll("[data-action]").forEach((element) => {
    const fn = actions[element.dataset.action];
    if (fn) element.addEventListener("click", fn);
  });
  const darkMode = document.getElementById("dark-mode");
  if (darkMode) {
    darkMode.addEventListener("change", () => {
      state.settings.darkMode = darkMode.checked;
      state.settings.explicitThemeChoice = true;
      saveState();
      render();
    });
  }
}

function openChoice() {
  activeSheet = "choice";
  editingId = null;
  render();
}

function closeSheet() {
  activeSheet = null;
  editingId = null;
  render();
}

async function saveEntry(choiceId, formData) {
  const choice = entryChoices.find((item) => item.id === choiceId);
  const now = new Date().toISOString();
  const existing = editingId ? state.entries.find((entry) => entry.id === editingId) : null;
  const data = dataForChoice(choice, formData);
  const attachment = await attachmentFrom(formData);
  if (attachment) data.attachment = attachment;
  const entry = {
    id: existing?.id || crypto.randomUUID(),
    childId: state.child.id,
    type: choice.type,
    timestamp: new Date(formData.get("timestamp")).toISOString(),
    createdAt: existing?.createdAt || now,
    updatedAt: now,
    value: optionalNumber(formData.get("value")),
    unit: formData.get("unit") || undefined,
    data,
    notes: cleanString(formData.get("notes")),
  };
  if (entry.value === undefined) delete entry.value;
  if (!entry.unit) delete entry.unit;
  if (!entry.notes) delete entry.notes;
  if (!Object.keys(entry.data || {}).length) delete entry.data;

  if (existing) {
    state.entries = state.entries.map((item) => item.id === existing.id ? entry : item);
  } else {
    state.entries.push(entry);
  }
  state.entries.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
  saveState();
  closeSheet();
}

function attachmentFrom(formData) {
  const file = ["photo", "file"].map((name) => formData.get(name)).find((item) => item && typeof item === "object" && item.size > 0);
  if (!file) return Promise.resolve(null);
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = () => resolve({
      name: file.name,
      type: file.type,
      size: file.size,
      dataUrl: reader.result,
    });
    reader.onerror = () => resolve({
      name: file.name,
      type: file.type,
      size: file.size,
    });
    reader.readAsDataURL(file);
  });
}

function dataForChoice(choice, formData) {
  const data = {};
  if (choice.kind) data.kind = choice.kind;
  if (choice.id === "feeding") {
    data.completion = formData.get("completion") || undefined;
    data.spitUp = formData.get("spitUp") || undefined;
    data.milkType = cleanString(formData.get("milkType"));
  }
  if (choice.id === "diaper") {
    data.wet = formData.get("wet") === "ja";
    data.wetAmount = formData.get("wetAmount") || undefined;
    data.stool = formData.get("stool") === "ja";
    data.stoolColor = cleanString(formData.get("stoolColor"));
    data.consistency = cleanString(formData.get("consistency"));
  }
  if (choice.type === "measurement") {
    data.situation = cleanString(formData.get("situation"));
  }
  if (choice.id === "observation") {
    data.categories = formData.getAll("categories");
    data.severity = formData.get("severity") || undefined;
    data.duration = cleanString(formData.get("duration"));
  }
  if (choice.id === "medication") {
    data.name = cleanString(formData.get("medName"));
    data.dose = cleanString(formData.get("dose"));
    data.unit = cleanString(formData.get("unit"));
    data.given = formData.get("given") !== "nein";
    data.flags = formData.getAll("flags");
  }
  if (choice.id === "medical_finding") {
    data.place = cleanString(formData.get("place"));
    data.findingType = cleanString(formData.get("findingType"));
    data.vmax = optionalNumber(formData.get("vmax"));
    data.gradient = optionalNumber(formData.get("gradient"));
    data.insufficiency = cleanString(formData.get("insufficiency"));
    data.assessment = cleanString(formData.get("assessment"));
    data.nextControl = formData.get("nextControl") ? new Date(formData.get("nextControl")).toISOString() : undefined;
  }
  if (choice.id === "note") {
    data.title = cleanString(formData.get("title"));
  }
  Object.keys(data).forEach((key) => {
    if (data[key] === undefined || data[key] === "" || (Array.isArray(data[key]) && !data[key].length)) delete data[key];
  });
  return data;
}

function saveChild() {
  state.child.name = document.getElementById("child-name").value.trim() || state.child.name;
  state.child.birthDate = document.getElementById("child-birth").value || state.child.birthDate;
  state.child.birthWeightGrams = optionalNumber(document.getElementById("birth-weight").value);
  state.child.birthLengthCm = optionalNumber(document.getElementById("birth-length").value);
  state.child.birthHeadCircumferenceCm = optionalNumber(document.getElementById("birth-head").value);
  saveState();
  render();
}

function saveSettings() {
  state.settings.defaultMilk = document.getElementById("default-milk").value.trim() || "Pre";
  state.settings.darkMode = document.getElementById("dark-mode").checked;
  state.settings.explicitThemeChoice = true;
  saveState();
  render();
}

async function refreshApp() {
  if ("serviceWorker" in navigator) {
    const registration = await navigator.serviceWorker.getRegistration();
    if (registration) await registration.update();
  }
  window.location.reload();
}

function loadDemoData() {
  const existingRealEntries = state.entries.filter((entry) => !entry.data?.demo);
  state.entries = [...existingRealEntries, ...createDemoEntries(state.child.id)].sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
  state.settings.demoRemoved = false;
  state.settings.demoVersion = DEMO_VERSION;
  saveState();
  render();
}

function removeDemoData() {
  state.entries = state.entries.filter((entry) => !entry.data?.demo);
  state.settings.demoRemoved = true;
  saveState();
  render();
}

function exportLongCsv() {
  const headers = ["id", "childId", "timestamp", "type", "value", "unit", "data", "notes", "createdAt", "updatedAt"];
  downloadCsv("baby-monitor-export.csv", toCsv(state.entries, headers));
}

function exportSeparateCsvs() {
  const groups = {
    "feedings.csv": (entry) => entry.type === "feeding",
    "diapers.csv": (entry) => entry.type === "diaper",
    "measurements.csv": (entry) => entry.type === "measurement",
    "observations.csv": (entry) => entry.type === "observation",
    "medications.csv": (entry) => entry.type === "medication",
    "medical_findings.csv": (entry) => entry.type === "medical_finding",
    "notes.csv": (entry) => entry.type === "note",
  };
  const headers = ["id", "childId", "timestamp", "type", "value", "unit", "data", "notes", "createdAt", "updatedAt"];
  Object.entries(groups).forEach(([filename, predicate]) => downloadCsv(filename, toCsv(state.entries.filter(predicate), headers)));
}

function toCsv(rows, headers) {
  return [
    headers.join(","),
    ...rows.map((row) => headers.map((header) => csvCell(header === "data" ? JSON.stringify(row[header] || {}) : row[header] ?? "")).join(",")),
  ].join("\n");
}

function csvCell(value) {
  return `"${String(value).replaceAll('"', '""')}"`;
}

function downloadCsv(filename, content) {
  const blob = new Blob([content], { type: "text/csv;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.append(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

function filteredTimelineEntries() {
  const now = new Date();
  if (timelineFilter === "today") return entriesForDay(now);
  if (timelineFilter === "yesterday") {
    const day = new Date(now);
    day.setDate(day.getDate() - 1);
    return entriesForDay(day);
  }
  if (timelineFilter === "7days") {
    const start = startOfDay(now);
    start.setDate(start.getDate() - 6);
    return state.entries.filter((entry) => new Date(entry.timestamp) >= start);
  }
  if (timelineFilter === "custom") {
    const start = startOfDay(new Date(customRange.from));
    const end = startOfDay(new Date(customRange.to));
    end.setDate(end.getDate() + 1);
    return state.entries.filter((entry) => {
      const timestamp = new Date(entry.timestamp);
      return timestamp >= start && timestamp < end;
    });
  }
  if (timelineFilter.startsWith("measurement:")) {
    const kind = timelineFilter.split(":")[1];
    return state.entries.filter((entry) => entry.type === "measurement" && entry.data?.kind === kind);
  }
  return state.entries.filter((entry) => entry.type === timelineFilter);
}

function entriesForDay(date) {
  const start = startOfDay(date);
  const end = new Date(start);
  end.setDate(end.getDate() + 1);
  return state.entries.filter((entry) => {
    const timestamp = new Date(entry.timestamp);
    return timestamp >= start && timestamp < end;
  });
}

function measurements(kind) {
  return state.entries
    .filter((entry) => entry.type === "measurement" && entry.data?.kind === kind && Number.isFinite(Number(entry.value)))
    .sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
}

function latestMeasurementSummary() {
  const candidates = ["length", "head", "temperature", "spo2", "heart_rate", "respiratory_rate"]
    .map((kind) => latest(measurements(kind)))
    .filter(Boolean)
    .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
  if (!candidates.length) return null;
  return {
    value: candidates.slice(0, 2).map(formatValue).join(" · "),
    sub: dateTimeText(candidates[0].timestamp),
  };
}

function latest(entries) {
  return [...entries].sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))[0];
}

function dailyCounts(entries, reducer) {
  const groups = new Map();
  entries.forEach((entry) => {
    const key = new Date(entry.timestamp).toLocaleDateString("de-DE", { day: "2-digit", month: "2-digit" });
    groups.set(key, [...(groups.get(key) || []), entry]);
  });
  return [...groups.entries()].map(([label, items]) => ({ label, value: reducer(items) })).slice(-7);
}

function countBy(entries, getKey) {
  const groups = new Map();
  entries.forEach((entry) => {
    const key = getKey(entry);
    groups.set(key, (groups.get(key) || 0) + 1);
  });
  return [...groups.entries()].map(([label, value]) => ({ label, value }));
}

function mergeSeries(left, right) {
  const map = new Map();
  left.forEach((item) => map.set(item.label, item.value));
  right.forEach((item) => map.set(item.label, (map.get(item.label) || 0) + item.value));
  return [...map.entries()].map(([label, value]) => ({ label, value })).slice(-7);
}

function barChart(items, unit) {
  if (!items.length) return `<div class="empty">Noch nicht genug Werte für einen Verlauf.</div>`;
  const max = Math.max(...items.map((item) => item.value), 1);
  return `<div class="bars">${items.map((item) => `
    <div class="bar-row">
      <span>${escapeHtml(item.label)}</span>
      <div class="bar-track"><div class="bar-fill" style="width:${Math.max(6, (item.value / max) * 100)}%"></div></div>
      <span>${escapeHtml(String(item.value))}${unit ? ` ${unit}` : ""}</span>
    </div>
  `).join("")}</div>`;
}

function lineChart(title, entries, unit, options = {}) {
  if (entries.length < 2) return `<div class="empty">Noch nicht genug Werte für einen Verlauf.</div>`;
  const values = entries.map((entry) => Number(entry.value));
  const min = Math.min(...values);
  const max = Math.max(...values);
  const range = max - min || 1;
  const times = entries.map((entry) => new Date(entry.timestamp).getTime());
  const minTime = Math.min(...times);
  const maxTime = Math.max(...times);
  const timeRange = maxTime - minTime || 1;
  const width = 420;
  const xStart = 12;
  const xEnd = width - 12;
  const points = entries.map((entry, index) => {
    const x = entries.length > 2
      ? xStart + ((new Date(entry.timestamp).getTime() - minTime) / timeRange) * (xEnd - xStart)
      : xStart + (index / (entries.length - 1)) * (xEnd - xStart);
    const y = 126 - ((Number(entry.value) - min) / range) * 86;
    return [x, y, entry, index];
  });
  const path = points.map(([x, y], index) => `${index ? "L" : "M"} ${x.toFixed(1)} ${y.toFixed(1)}`).join(" ");
  return `
    <div class="chart-title"><span>${title}</span><span>${formatValue(entries.at(-1))}</span></div>
    <div class="chart-frame">
      <svg class="line-chart" viewBox="0 0 ${width} 180" role="img" aria-label="${title}">
        <line class="axis-line" x1="${xStart}" y1="140" x2="${xEnd}" y2="140"></line>
        <path d="${path}"></path>
        ${points.map(([x, y]) => `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="4"></circle>`).join("")}
        ${options.showPointLabels ? points.map(([x, y, entry, index]) => `<text class="point-label" x="${x.toFixed(1)}" y="${Math.max(16, y - 10).toFixed(1)}" text-anchor="${edgeAnchor(index, points.length)}">${escapeHtml(chartPointValue(entry, unit))}</text>`).join("") : ""}
        ${options.showTimeAxis ? points.map(([x, , entry, index]) => `<text class="axis-label" x="${x.toFixed(1)}" y="164" text-anchor="${edgeAnchor(index, points.length)}">${escapeHtml(shortDateText(entry.timestamp))}</text>`).join("") : ""}
        ${options.showTimeAxis ? "" : `<text class="unit-label" x="${xStart}" y="176">${escapeHtml(unit)}</text>`}
      </svg>
    </div>
  `;
}

function edgeAnchor(index, count) {
  if (index === 0) return "start";
  if (index === count - 1) return "end";
  return "middle";
}

function chartPointValue(entry, unit) {
  if (entry.data?.kind === "weight") return `${Math.round(Number(entry.value))} g`;
  return `${Number(entry.value).toLocaleString("de-DE", { maximumFractionDigits: 1 })}${unit}`;
}

function entryTitle(entry) {
  const choice = choiceForEntry(entry);
  if (entry.type === "note" && entry.data?.title) return entry.data.title;
  if (entry.type === "medical_finding" && entry.data?.findingType) return entry.data.findingType;
  return choice.label;
}

function detailForEntry(entry) {
  if (entry.type === "feeding") return [formatValue(entry), entry.data?.milkType, entry.data?.completion].filter(Boolean).join(" · ") || "Trinken";
  if (entry.type === "diaper") return [entry.data?.wet ? "nass" : "", entry.data?.stool ? "Stuhl" : "", entry.data?.stoolColor].filter(Boolean).join(" · ") || "Windel";
  if (entry.type === "measurement") return [formatValue(entry), entry.data?.situation].filter(Boolean).join(" · ");
  if (entry.type === "observation") return [categoriesText(entry), entry.data?.severity, entry.data?.duration].filter(Boolean).join(" · ") || firstLine(entry.notes || "Beobachtung");
  if (entry.type === "medication") return [entry.data?.name, entry.data?.dose, entry.data?.unit, entry.data?.given === false ? "nicht gegeben" : "gegeben"].filter(Boolean).join(" · ") || "Medikament";
  if (entry.type === "medical_finding") return [entry.data?.place, entry.data?.assessment || entry.notes].filter(Boolean).map(firstLine).join(" · ") || "Arztbefund";
  return [firstLine(entry.notes || "Freie Notiz"), entry.data?.attachment ? "Anhang" : ""].filter(Boolean).join(" · ");
}

function categoriesText(entry) {
  return (entry.data?.categories || []).map((item) => item.split(": ").pop()).slice(0, 2).join(", ");
}

function choiceForEntry(entry) {
  if (entry.type === "measurement") return entryChoices.find((choice) => choice.kind === entry.data?.kind) || entryChoices.find((choice) => choice.id === "weight");
  return entryChoices.find((choice) => choice.type === entry.type) || entryChoices.at(-1);
}

function formatValue(entry) {
  if (!Number.isFinite(Number(entry.value))) return "";
  if (entry.data?.kind === "weight") {
    const grams = Math.round(Number(entry.value));
    return `${grams} g`;
  }
  return `${Number(entry.value).toLocaleString("de-DE", { maximumFractionDigits: 1 })} ${entry.unit || ""}`.trim();
}

function childAgeText(dateString) {
  const birth = new Date(dateString);
  if (Number.isNaN(birth.getTime())) return "";
  const now = new Date();
  if (birth > now) return "Geburtsdatum liegt in der Zukunft";
  const totalDays = Math.floor((startOfDay(now) - startOfDay(birth)) / (24 * 60 * 60 * 1000));
  let months = (now.getFullYear() - birth.getFullYear()) * 12 + now.getMonth() - birth.getMonth();
  if (now.getDate() < birth.getDate()) months -= 1;
  months = Math.max(0, months);
  const monthAnchor = addMonthsClamped(birth, months);
  const remainingDays = Math.max(0, Math.floor((startOfDay(now) - startOfDay(monthAnchor)) / (24 * 60 * 60 * 1000)));
  const remainingWeeks = Math.floor(remainingDays / 7);
  if (months === 0) return `${Math.floor(totalDays / 7)} Wochen`;
  return remainingWeeks ? `${months} Monate, ${remainingWeeks} Wochen` : `${months} Monate`;
}

function addMonthsClamped(date, months) {
  const target = new Date(date);
  const originalDay = target.getDate();
  target.setDate(1);
  target.setMonth(target.getMonth() + months);
  const lastDay = new Date(target.getFullYear(), target.getMonth() + 1, 0).getDate();
  target.setDate(Math.min(originalDay, lastDay));
  return target;
}

function latestTimeSub(entries) {
  const item = latest(entries);
  return item ? `Letzte: ${timeText(item.timestamp)}` : "";
}

function dateTimeText(dateString) {
  return new Date(dateString).toLocaleString("de-DE", { day: "2-digit", month: "2-digit", hour: "2-digit", minute: "2-digit" });
}

function shortDateText(dateString) {
  return new Date(dateString).toLocaleDateString("de-DE", { day: "2-digit", month: "2-digit" });
}

function timeText(dateString) {
  return new Date(dateString).toLocaleTimeString("de-DE", { hour: "2-digit", minute: "2-digit" });
}

function toLocalInputValue(dateString) {
  const date = new Date(dateString);
  const offset = date.getTimezoneOffset();
  return new Date(date.getTime() - offset * 60 * 1000).toISOString().slice(0, 16);
}

function startOfDay(date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

function optionalNumber(value) {
  if (value === null || value === undefined || value === "") return undefined;
  const number = Number(value);
  return Number.isFinite(number) ? number : undefined;
}

function cleanString(value) {
  return typeof value === "string" && value.trim() ? value.trim() : undefined;
}

function firstLine(value) {
  return String(value || "").split("\n")[0].slice(0, 70);
}

function sum(values) {
  return values.reduce((total, value) => total + value, 0);
}

function escapeHtml(value) {
  return String(value ?? "").replace(/[&<>"']/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;" })[char]);
}

function escapeAttr(value) {
  return escapeHtml(value);
}

function icon(name) {
  const icons = {
    plus: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M12 4.8v14.4M4.8 12h14.4"/></svg>`,
    home: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M4.5 11.2 12 5l7.5 6.2v7.3a1.5 1.5 0 0 1-1.5 1.5h-3.4v-5.2H9.4V20H6a1.5 1.5 0 0 1-1.5-1.5z"/></svg>`,
    list: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M7.5 6.5h10M7.5 12h10M7.5 17.5h10"/><path d="M4.2 6.5h.1M4.2 12h.1M4.2 17.5h.1"/></svg>`,
    chart: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M5 18.5h14"/><path d="M8 18.5v-5.2M12 18.5V7.8M16 18.5v-8"/><path d="M7.2 10.8 12 6.7l4.8 3.1"/></svg>`,
    calendar: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M7 3v4M17 3v4M4 9h16M5 5h14a1 1 0 0 1 1 1v14H4V6a1 1 0 0 1 1-1z"/></svg>`,
    settings: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M5 7h7M16 7h3M5 17h3M12 17h7"/><circle cx="14" cy="7" r="2.2"/><circle cx="10" cy="17" r="2.2"/></svg>`,
    moon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M18.8 14.3A7 7 0 0 1 9.7 5.2 7.4 7.4 0 1 0 18.8 14.3z"/></svg>`,
    sliders: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M4 7h10M18 7h2M4 17h2M10 17h10M14 5v4M8 15v4"/></svg>`,
    chevron: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="m9 18 6-6-6-6"/></svg>`,
    bottle: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M9 2h6v4l-2 2v13H8V8L6 6V2h3M8 12h5M8 16h5"/></svg>`,
    diaper: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M3 7h18v6a7 7 0 0 1-7 7h-4a7 7 0 0 1-7-7zM7 7v5M17 7v5M8 15h8"/></svg>`,
    scale: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><rect x="4" y="5" width="16" height="15" rx="2"/><path d="M9 11a3 3 0 0 1 6 0M12 11l2-2"/></svg>`,
    ruler: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="m4 16 12-12 4 4L8 20zM9 15l-2-2M12 12l-2-2M15 9l-2-2"/></svg>`,
    circle: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><circle cx="12" cy="12" r="8"/><path d="M8 18c1-2 7-2 8 0"/></svg>`,
    thermometer: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M14 14.8V5a3 3 0 0 0-6 0v9.8a5 5 0 1 0 6 0zM11 5v10"/></svg>`,
    drop: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M12 3s7 7 7 12a7 7 0 0 1-14 0c0-5 7-12 7-12z"/><path d="M9 14h6"/></svg>`,
    heart: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M20 8.5c0 5-8 10.5-8 10.5S4 13.5 4 8.5A4.5 4.5 0 0 1 12 6a4.5 4.5 0 0 1 8 2.5z"/><path d="M7 12h3l1-2 2 5 1-3h3"/></svg>`,
    lungs: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M12 4v16M12 10c-5-5-8-2-8 4v4c4 1 7-1 8-5M12 10c5-5 8-2 8 4v4c-4 1-7-1-8-5"/></svg>`,
    eye: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M2 12s4-6 10-6 10 6 10 6-4 6-10 6S2 12 2 12z"/><circle cx="12" cy="12" r="3"/></svg>`,
    pill: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M10 21 3 14a5 5 0 0 1 7-7l7 7a5 5 0 0 1-7 7zM8 9l7 7"/></svg>`,
    stethoscope: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M6 4v5a4 4 0 0 0 8 0V4M4 4h4M12 4h4M10 15a5 5 0 0 0 10 0v-2"/><circle cx="20" cy="10" r="2"/></svg>`,
    note: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M5 3h11l3 3v15H5zM16 3v4h4M8 12h8M8 16h6"/></svg>`,
    clock: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>`,
  };
  return icons[name] || icons.note;
}

render();

if ("serviceWorker" in navigator && /^https?:$/.test(location.protocol)) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("./sw.js").catch(() => {
      // The app still works without offline shell caching, for example from file:// during local testing.
    });
  });
}
