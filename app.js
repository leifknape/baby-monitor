const STORAGE_KEY = "baby-monitor-state-v1";
const DEMO_VERSION = 5;

const entryChoices = [
  { id: "feeding", label: "Trinken", type: "feeding", icon: "bottle" },
  { id: "diaper", label: "Windel", type: "diaper", icon: "diaper" },
  { id: "weight", label: "Gewicht", type: "measurement", kind: "weight", icon: "scale" },
  { id: "length", label: "Körperlänge", type: "measurement", kind: "length", icon: "ruler" },
  { id: "head", label: "Kopfumfang", type: "measurement", kind: "head", icon: "circle" },
  { id: "temperature", label: "Temperatur", type: "measurement", kind: "temperature", icon: "thermometer" },
  { id: "spo2", label: "Sauerstoffsättigung", type: "measurement", kind: "spo2", icon: "drop" },
  { id: "heart_rate", label: "Herzfrequenz", type: "measurement", kind: "heart_rate", icon: "heart" },
  { id: "observation", label: "Beobachtung", type: "observation", icon: "eye" },
  { id: "milestone", label: "Meilenstein", type: "milestone", icon: "flag" },
  { id: "medication", label: "Medikament", type: "medication", icon: "pill" },
  { id: "medical_finding", label: "Arztbefund", type: "medical_finding", icon: "stethoscope" },
  { id: "note", label: "Freie Notiz", type: "note", icon: "note" },
];

const milestoneGroups = [
  {
    age: "1 Monat",
    items: ["schaut Gesichter an", "reagiert auf Geräusche", "bewegt Arme und Beine", "hebt den Kopf kurz in Bauchlage"],
  },
  {
    age: "2 Monate",
    items: ["erstes soziales Lächeln", "schaut euch an", "reagiert auf Stimme oder Geräusche", "hebt den Kopf in Bauchlage etwas an"],
  },
  {
    age: "4 Monate",
    items: ["hält den Kopf stabiler", "lacht oder gluckst", "verfolgt Dinge mit den Augen", "bringt Hände zum Mund", "stützt sich in Bauchlage auf"],
  },
  {
    age: "6 Monate",
    items: ["dreht sich oft", "greift gezielter nach Dingen", "bringt Dinge zum Mund", "reagiert auf Ansprache", "sitzt mit Unterstützung oder kurz frei"],
  },
  {
    age: "9 Monate",
    items: ["sitzt meist stabil", "robbt, krabbelt oder bewegt sich anders fort", "reagiert auf den Namen", "spielt Guck-guck", "fremdelt eventuell"],
  },
  {
    age: "12 Monate",
    items: ["zieht sich hoch", "steht mit Hilfe", "macht Schritte an Möbeln oder an Händen", "zeigt oder gestikuliert", "sagt eventuell erste Wörter gezielt"],
  },
  {
    age: "15 Monate",
    items: ["läuft oft allein oder mit wenig Hilfe", "zeigt auf Dinge", "imitiert einfache Tätigkeiten", "versteht einfache Aufforderungen"],
  },
  {
    age: "18 Monate",
    items: ["läuft sicherer", "sagt mehrere Wörter", "zeigt auf Körperteile oder interessante Dinge", "spielt einfacher mit Gegenständen"],
  },
  {
    age: "2 Jahre",
    items: ["rennt", "tritt einen Ball", "baut kleine Türme", "benutzt einfache Zwei-Wort-Sätze", "zeigt mehr eigenes Spiel oder Imitation"],
  },
  {
    age: "3 Jahre",
    items: ["läuft und klettert", "spricht in kurzen Sätzen", "spielt Rollenspiele", "versteht einfache Regeln", "kann einfache Dinge selbst machen"],
  },
  {
    age: "WHO grobmotorische Bereiche",
    items: [
      "freies Sitzen beobachtet (ca. 3,8-9,2 Monate)",
      "Krabbeln auf Händen und Knien beobachtet (ca. 5,2-13,5 Monate)",
      "freies Stehen beobachtet (ca. 6,9-16,9 Monate)",
      "freies Laufen beobachtet (ca. 8,2-17,6 Monate)",
    ],
  },
];

const uHeftSchedule = [
  { name: "U1", window: "direkt nach Geburt", start: 0, end: 1 },
  { name: "U2", window: "3.-10. Lebenstag", start: 3, end: 10 },
  { name: "U3", window: "4.-5. Lebenswoche", start: 28, end: 35 },
  { name: "U4", window: "3.-4. Lebensmonat", start: 91, end: 122 },
  { name: "U5", window: "6.-7. Lebensmonat", start: 183, end: 213 },
  { name: "U6", window: "10.-12. Lebensmonat", start: 304, end: 365 },
  { name: "U7", window: "21.-24. Lebensmonat", start: 640, end: 730 },
  { name: "U7a", window: "34.-36. Lebensmonat", start: 1035, end: 1095 },
  { name: "U8", window: "46.-48. Lebensmonat", start: 1400, end: 1460 },
  { name: "U9", window: "60.-64. Lebensmonat", start: 1826, end: 1948 },
];

const heartRateReferenceRanges = [
  { minMonths: 0, maxMonths: 4, age: "1-3 Monate", sleep: [90, 160], awake: [100, 205] },
  { minMonths: 4, maxMonths: 12, age: "4-12 Monate", sleep: [90, 160], awake: [100, 180] },
  { minMonths: 12, maxMonths: 36, age: "1-2 Jahre", sleep: [80, 120], awake: [98, 140] },
  { minMonths: 36, maxMonths: 72, age: "3-5 Jahre", sleep: [65, 100], awake: [80, 120] },
];

const navItems = [
  { id: "dashboard", label: "Übersicht", icon: "home" },
  { id: "timeline", label: "Timeline", icon: "list" },
  { id: "monthly", label: "Rückblick", icon: "calendar" },
  { id: "spacer", label: "", icon: "" },
  { id: "analytics", label: "Verlauf", icon: "chart" },
  { id: "uheft", label: "U-Heft", icon: "note" },
  { id: "settings", label: "Einstellungen", icon: "settings" },
];

const childSettingKeys = Object.keys(defaultChildSettings());
const state = loadState();
let view = initialViewFromHash();
let activeSheet = location.hash === "#add" ? "choice" : null;
let editingId = null;
let timelineFilter = "today";
let customRange = {
  from: new Date().toISOString().slice(0, 10),
  to: new Date().toISOString().slice(0, 10),
};
let monthlySelection = new Date().toISOString().slice(0, 7);
let doctorExportRange = {
  from: (() => {
    const date = new Date();
    date.setDate(date.getDate() - 30);
    return date.toISOString().slice(0, 10);
  })(),
  to: new Date().toISOString().slice(0, 10),
};

function initialViewFromHash() {
  const hash = location.hash.replace("#", "");
  return ["dashboard", "timeline", "monthly", "analytics", "uheft", "settings"].includes(hash) ? hash : "dashboard";
}

function defaultState() {
  const childId = crypto.randomUUID();
  const child = {
    id: childId,
    name: "Lina",
    birthDate: new Date(new Date().setMonth(new Date().getMonth() - 5)).toISOString().slice(0, 10),
    birthWeightGrams: 3220,
    birthLengthCm: 51,
    birthHeadCircumferenceCm: 35,
    settings: defaultChildSettings(),
  };

  return {
    child,
    children: [child],
    activeChildId: childId,
    entries: [],
    settings: {
      darkMode: true,
      demoRemoved: true,
    },
  };
}

function defaultChildSettings() {
  return {
    defaultMilk: "Pre",
    growthReferenceSource: "who",
    growthReferenceSex: "none",
    correctedAgeEnabled: false,
    dueDate: "",
    uHeftQuestions: [{ question: "Gibt es etwas, das wir bis zur nächsten U beobachten sollen?", answer: "" }],
    uHeftExams: {},
    demoVersion: DEMO_VERSION,
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
    entry("observation", at(18, 20, -6), undefined, undefined, { categories: ["Trinken: spuckt mehr"], duration: "kurz" }, "nach der Flasche etwas gespuckt"),
    entry("measurement", at(9, 0, -6), 6140, "g", { kind: "weight" }),
    entry("measurement", at(9, 5, -6), 61.2, "cm", { kind: "length" }),
    entry("measurement", at(9, 8, -6), 39.4, "cm", { kind: "head" }),
    entry("measurement", at(9, 12, -6), 36.8, "°C", { kind: "temperature", situation: "Achsel" }),
    entry("measurement", at(9, 14, -6), 97.5, "%", { kind: "spo2", situation: "wach", min: 97, max: 98 }),
    entry("measurement", at(9, 16, -6), 131, "bpm", { kind: "heart_rate", situation: "ruhig", min: 126, max: 136 }),

    entry("feeding", at(7, 0, -5), 100, "ml", { completion: "ja", spitUp: "nein", milkType: "Pre" }),
    entry("feeding", at(12, 15, -5), 110, "ml", { completion: "ja", spitUp: "nein", milkType: "Pre" }),
    entry("feeding", at(18, 30, -5), 105, "ml", { completion: "ja", spitUp: "wenig", milkType: "Pre" }),
    entry("diaper", at(9, 45, -5), undefined, undefined, { wet: true, wetAmount: "viel", stool: false }),
    entry("diaper", at(19, 20, -5), undefined, undefined, { wet: true, wetAmount: "normal", stool: true, stoolColor: "braun", consistency: "weich" }),
    entry("measurement", at(8, 30, -5), 6220, "g", { kind: "weight" }),
    entry("measurement", at(8, 35, -5), 61.4, "cm", { kind: "length" }),
    entry("measurement", at(8, 38, -5), 39.6, "cm", { kind: "head" }),
    entry("measurement", at(8, 40, -5), 36.9, "°C", { kind: "temperature", situation: "Stirn" }),
    entry("measurement", at(8, 42, -5), 96.5, "%", { kind: "spo2", situation: "schlafend", min: 96, max: 97 }),
    entry("measurement", at(8, 44, -5), 124, "bpm", { kind: "heart_rate", situation: "schlafend", min: 120, max: 128 }),

    entry("feeding", at(6, 40, -4), 105, "ml", { completion: "ja", spitUp: "nein", milkType: "Pre" }),
    entry("feeding", at(11, 45, -4), 115, "ml", { completion: "ja", spitUp: "nein", milkType: "Pre" }),
    entry("feeding", at(17, 35, -4), 110, "ml", { completion: "ja", spitUp: "wenig", milkType: "Pre" }),
    entry("diaper", at(7, 35, -4), undefined, undefined, { wet: true, wetAmount: "normal", stool: false }),
    entry("diaper", at(14, 10, -4), undefined, undefined, { wet: true, wetAmount: "normal", stool: false }),
    entry("observation", at(16, 45, -4), undefined, undefined, { categories: ["Verhalten: sehr unruhig"], duration: "ca. 30 Minuten" }, "abends unruhiger als sonst"),
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
    entry("measurement", at(9, 12, -3), 97.5, "%", { kind: "spo2", situation: "wach", min: 97, max: 98 }),
    entry("measurement", at(9, 14, -3), 136, "bpm", { kind: "heart_rate", situation: "wach", min: 132, max: 140 }),

    entry("feeding", at(7, 10, -2), 115, "ml", { completion: "ja", spitUp: "nein", milkType: "Pre" }),
    entry("feeding", at(12, 0, -2), 125, "ml", { completion: "ja", spitUp: "nein", milkType: "Pre" }),
    entry("feeding", at(18, 0, -2), 115, "ml", { completion: "ja", spitUp: "wenig", milkType: "Pre" }),
    entry("milestone", at(11, 45, -2), undefined, undefined, { milestones: ["6 Monate: greift gezielter nach Dingen", "6 Monate: reagiert auf Ansprache"] }, "neue Fähigkeiten beobachtet"),
    entry("diaper", at(7, 55, -2), undefined, undefined, { wet: true, wetAmount: "normal", stool: false }),
    entry("diaper", at(15, 45, -2), undefined, undefined, { wet: true, wetAmount: "viel", stool: false }),
    entry("observation", at(13, 25, -2), undefined, undefined, { categories: ["Verhalten: ungewöhnlich schläfrig"], duration: "nach dem Trinken" }, "längerer Mittagsschlaf"),
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
    entry("observation", at(19, 15, -1), undefined, undefined, { categories: ["Sonstiges: anderes"] }, "lange wach, danach gut eingeschlafen"),
    entry("medical_finding", at(10, 15, -1), undefined, undefined, { findingType: "Arztgespräch", place: "Praxis", vmax: 2.0, gradient: 16, insufficiency: "gering", assessment: "Besprochener Verlauf dokumentiert." }),
    entry("measurement", at(8, 30, -1), 6400, "g", { kind: "weight" }),
    entry("measurement", at(8, 34, -1), 61.9, "cm", { kind: "length" }),
    entry("measurement", at(8, 37, -1), 40.0, "cm", { kind: "head" }),
    entry("measurement", at(8, 40, -1), 97.5, "%", { kind: "spo2", situation: "schlafend", min: 97, max: 98 }),
    entry("measurement", at(8, 42, -1), 126, "bpm", { kind: "heart_rate", situation: "schlafend", min: 122, max: 130 }),

    entry("feeding", at(6, 10), 95, "ml", { completion: "ja", spitUp: "nein", milkType: "Pre" }, "ruhig getrunken"),
    entry("diaper", at(7, 5), undefined, undefined, { wet: true, wetAmount: "normal", stool: false }, "morgens"),
    entry("feeding", at(10, 20), 110, "ml", { completion: "teilweise", spitUp: "wenig", milkType: "Pre" }),
    entry("observation", at(12, 15), undefined, undefined, { categories: ["Verhalten: sehr unruhig"], duration: "ca. 20 Minuten" }, "nach dem Mittagsschlaf wieder zufrieden"),
    entry("diaper", at(13, 40), undefined, undefined, { wet: true, wetAmount: "viel", stool: true, stoolColor: "gelb", consistency: "weich" }),
    entry("feeding", at(15, 30), 120, "ml", { completion: "ja", spitUp: "nein", milkType: "Pre" }),
    entry("measurement", at(17, 0), 6450, "g", { kind: "weight" }, "zu Hause gewogen"),
    entry("measurement", at(17, 5), 62, "cm", { kind: "length" }),
    entry("measurement", at(17, 7), 40, "cm", { kind: "head" }),
    entry("measurement", at(17, 10), 36.9, "°C", { kind: "temperature", situation: "Achsel" }),
    entry("measurement", at(17, 12), 97.5, "%", { kind: "spo2", situation: "wach", min: 97, max: 98 }),
    entry("measurement", at(17, 14), 133, "bpm", { kind: "heart_rate", situation: "ruhig", min: 128, max: 138 }),
    entry("feeding", at(20, 45), 105, "ml", { completion: "ja", spitUp: "wenig", milkType: "Pre" }),
    entry("medical_finding", at(11, 30), undefined, undefined, { findingType: "Echo", place: "Kinderkardiologie", vmax: 1.9, gradient: 15, insufficiency: "gering", assessment: "Befund als Freitext dokumentiert." }),
  ].sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
}

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return prepareState(defaultState());
    const parsed = JSON.parse(raw);
    const fallback = defaultState();
    const next = prepareState({
      ...fallback,
      ...parsed,
      settings: { ...fallback.settings, ...(parsed.settings || {}) },
    });
    if (!parsed.settings?.explicitThemeChoice) next.settings.darkMode = true;
    return next;
  } catch {
    return defaultState();
  }
}

function prepareState(source) {
  const fallbackChild = source.child || defaultState().child;
  const sourceEntries = Array.isArray(source.entries) ? source.entries : [];
  const entriesForChildId = (childId) => sourceEntries.filter((entry) => entry.childId === childId);
  const hasEntriesForChildId = (childId) => entriesForChildId(childId).length > 0;
  const isRecoveredChild = (child) => /^Gespeichertes Kind/.test(child.name || "");
  const legacyCarrierChild = (Array.isArray(source.children) ? source.children.find((child) => child?.id && !isRecoveredChild(child) && !hasEntriesForChildId(child.id)) : null) || fallbackChild;
  const legacySettings = {
    ...defaultChildSettings(),
    ...(source.settings || {}),
    ...(legacyCarrierChild.settings || {}),
  };
  const legacyChildData = {
    name: legacyCarrierChild.name,
    birthDate: legacyCarrierChild.birthDate,
    birthWeightGrams: legacyCarrierChild.birthWeightGrams,
    birthLengthCm: legacyCarrierChild.birthLengthCm,
    birthHeadCircumferenceCm: legacyCarrierChild.birthHeadCircumferenceCm,
    settings: legacySettings,
  };
  const legacyChildName = legacyChildData.name && legacyChildData.name !== "Lina" ? legacyChildData.name : "";
  const rawChildren = (Array.isArray(source.children) && source.children.length ? source.children : [fallbackChild])
    .map((child) => ({
      ...child,
      id: child.id || crypto.randomUUID(),
      name: child.name || "Baby",
      birthDate: child.birthDate || new Date().toISOString().slice(0, 10),
      settings: {
        ...defaultChildSettings(),
        ...(source.settings || {}),
        ...(child.settings || {}),
      },
    }));
  const children = [];
  const seenChildIds = new Set();
  rawChildren.forEach((child) => {
    if (seenChildIds.has(child.id)) return;
    children.push(child);
    seenChildIds.add(child.id);
  });
  const activeChildId = source.activeChildId && children.some((child) => child.id === source.activeChildId)
    ? source.activeChildId
    : children[0].id;
  const knownChildIds = new Set(children.map((child) => child.id));
  const unknownChildIds = [];
  (source.entries || []).forEach((entry) => {
    const childId = entry.childId;
    if (!childId || knownChildIds.has(childId)) return;
    knownChildIds.add(childId);
    unknownChildIds.push(childId);
  });
  unknownChildIds
    .forEach((childId, index) => {
      const shouldAdoptLegacyChild = unknownChildIds.length === 1 && !hasEntriesForChildId(fallbackChild.id);
      children.push({
        id: childId,
        name: shouldAdoptLegacyChild ? (legacyChildName || "Gespeichertes Kind") : (index === 0 ? "Gespeichertes Kind" : `Gespeichertes Kind ${index + 1}`),
        birthDate: (shouldAdoptLegacyChild ? legacyChildData.birthDate : fallbackChild.birthDate) || new Date().toISOString().slice(0, 10),
        ...(shouldAdoptLegacyChild && legacyChildData.birthWeightGrams !== undefined ? { birthWeightGrams: legacyChildData.birthWeightGrams } : {}),
        ...(shouldAdoptLegacyChild && legacyChildData.birthLengthCm !== undefined ? { birthLengthCm: legacyChildData.birthLengthCm } : {}),
        ...(shouldAdoptLegacyChild && legacyChildData.birthHeadCircumferenceCm !== undefined ? { birthHeadCircumferenceCm: legacyChildData.birthHeadCircumferenceCm } : {}),
        settings: shouldAdoptLegacyChild ? { ...legacyChildData.settings } : { ...defaultChildSettings() },
      });
    });
  const rescuedChildrenWithEntries = children.filter((child) => (isRecoveredChild(child) || unknownChildIds.includes(child.id)) && hasEntriesForChildId(child.id));
  if (rescuedChildrenWithEntries.length === 1 && !hasEntriesForChildId(fallbackChild.id)) {
    const recoveredChild = rescuedChildrenWithEntries[0];
    Object.assign(recoveredChild, {
      name: legacyChildName || recoveredChild.name,
      birthDate: legacyChildData.birthDate || recoveredChild.birthDate,
      ...(legacyChildData.birthWeightGrams !== undefined ? { birthWeightGrams: legacyChildData.birthWeightGrams } : {}),
      ...(legacyChildData.birthLengthCm !== undefined ? { birthLengthCm: legacyChildData.birthLengthCm } : {}),
      ...(legacyChildData.birthHeadCircumferenceCm !== undefined ? { birthHeadCircumferenceCm: legacyChildData.birthHeadCircumferenceCm } : {}),
      settings: {
        ...defaultChildSettings(),
        ...(recoveredChild.settings || {}),
        ...legacyChildData.settings,
      },
    });
  }
  const preferredActiveChildId = rescuedChildrenWithEntries.length === 1 && !hasEntriesForChildId(activeChildId)
    ? rescuedChildrenWithEntries[0].id
    : activeChildId;
  const prepared = {
    ...source,
    children,
    activeChildId: preferredActiveChildId,
    entries: sourceEntries.map((entry) => ({ ...entry, childId: entry.childId || preferredActiveChildId })),
    settings: {
      darkMode: source.settings?.darkMode ?? true,
      explicitThemeChoice: source.settings?.explicitThemeChoice,
    },
  };
  syncActiveChild(prepared);
  installSettingsBridge(prepared);
  return prepared;
}

function installSettingsBridge(target) {
  childSettingKeys.forEach((key) => {
    Object.defineProperty(target.settings, key, {
      configurable: true,
      enumerable: false,
      get: () => currentChild(target).settings[key],
      set: (value) => {
        currentChild(target).settings[key] = value;
      },
    });
  });
}

function currentChild(target = state) {
  return target.children.find((child) => child.id === target.activeChildId) || target.children[0];
}

function syncActiveChild(target = state) {
  target.child = currentChild(target);
}

function activeEntries(target = state) {
  const child = currentChild(target);
  return (target.entries || []).filter((entry) => entry.childId === child.id);
}

function saveState() {
  syncActiveChild();
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function render() {
  syncActiveChild();
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
          <div class="child-meta">${childAgeText()}</div>
        </div>
      </div>
    </header>
    ${renderChildTabs()}
  `;
}

function renderChildTabs() {
  return `
    <div class="child-tabs" aria-label="Kind wechseln">
      ${state.children.map((child) => `
        <button class="child-tab ${child.id === state.activeChildId ? "active" : ""}" type="button" data-action="switch-child" data-child-id="${escapeAttr(child.id)}">${escapeHtml(child.name)}</button>
      `).join("")}
      <button class="child-tab add" type="button" data-action="add-child" aria-label="Kind hinzufügen">${icon("plus")}</button>
    </div>
  `;
}

function renderView() {
  if (view === "timeline") return renderTimeline();
  if (view === "monthly") return renderMonthlyReview();
  if (view === "analytics") return renderAnalytics();
  if (view === "uheft") return renderUHeftView();
  if (view === "settings") return renderSettings();
  return renderDashboard();
}

function renderDashboard() {
  const today = entriesForDay(new Date());
  const feedings = today.filter((entry) => entry.type === "feeding" && Number(entry.value) > 0);
  const diapers = today.filter((entry) => entry.type === "diaper");
  const wet = diapers.filter((entry) => entry.data?.wet);
  const stool = diapers.filter((entry) => entry.data?.stool);
  const entries = activeEntries();
  const latestFeeding = latest(entries.filter((entry) => entry.type === "feeding"));
  const latestWeight = latest(measurements("weight"));
  const latestObservation = latest(entries.filter((entry) => entry.type === "observation"));
  const latestMilestone = latest(entries.filter((entry) => entry.type === "milestone"));
  const latestFinding = latest(entries.filter((entry) => entry.type === "medical_finding"));
  const latestPositive = latest(positiveDevelopmentItems().map((item) => item.entry));
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
  if (latestMilestone) cards.push(statCard("Letzter Meilenstein", milestoneText(latestMilestone), dateTimeText(latestMilestone.timestamp), "flag"));
  if (latestPositive) cards.push(statCard("Positiver Moment", positiveEntryText(latestPositive), dateTimeText(latestPositive.timestamp), "sparkles"));
  if (latestFinding) cards.push(statCard("Letzter Arztbefund", firstLine(latestFinding.data?.assessment || latestFinding.notes || latestFinding.data?.findingType || "Dokumentiert"), dateTimeText(latestFinding.timestamp), "stethoscope"));
  const hints = sinceHints();

  return `
    ${hints.length ? `<section class="since-strip">${hints.map((hint) => `<span>${escapeHtml(hint)}</span>`).join("")}</section>` : ""}
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

function sinceHints() {
  const entries = activeEntries();
  return [
    sinceHint("Letzte Fütterung", latest(entries.filter((entry) => entry.type === "feeding"))),
    sinceHint("Letzte nasse Windel", latest(entries.filter((entry) => entry.type === "diaper" && entry.data?.wet))),
    sinceHint("Letzte Gewichtsmessung", latest(measurements("weight"))),
    sinceHint("Letzter Arztbefund", latest(entries.filter((entry) => entry.type === "medical_finding"))),
  ].filter(Boolean);
}

function sinceHint(label, entry) {
  if (!entry) return "";
  return `${label}: ${relativeTimeText(entry.timestamp)}`;
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
          ["milestone", "Meilensteine"],
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

function renderMonthlyReview() {
  const selectedMonth = monthDateFromSelection();
  const monthEntries = entriesForMonth(selectedMonth);
  const feedings = monthEntries.filter((entry) => entry.type === "feeding" && Number(entry.value) > 0);
  const diapers = monthEntries.filter((entry) => entry.type === "diaper");
  const milestones = monthEntries.filter((entry) => entry.type === "milestone");
  const observations = monthEntries.filter((entry) => entry.type === "observation");
  const findings = monthEntries.filter((entry) => entry.type === "medical_finding");
  const positives = positiveDevelopmentItems().filter((item) => monthEntries.some((entry) => entry.id === item.entry.id));
  const monthMeasurements = (kind) => measurements(kind).filter((entry) => isSameMonth(new Date(entry.timestamp), selectedMonth));
  const growthParts = ["weight", "head", "length"].map((kind) => monthlyGrowthPart(kind, monthMeasurements(kind))).filter(Boolean);
  const totalMl = sum(feedings.map((entry) => Number(entry.value || 0)));
  const monthLabel = selectedMonth.toLocaleDateString("de-DE", { month: "long", year: "numeric" });
  const monthOptions = monthlyReviewOptions();

  return `
    <section>
      <div class="section-head">
        <h2>Monatsrückblick</h2>
        <span>${escapeHtml(monthLabel)}</span>
      </div>
      <div class="month-selector">
        ${selectField("monthly-review-month", "Monat", monthOptions.months, String(selectedMonth.getMonth()))}
        ${selectField("monthly-review-year", "Jahr", monthOptions.years, String(selectedMonth.getFullYear()))}
      </div>
      <div class="monthly-grid">
        ${monthEntries.length ? `
          <article class="chart-card">
            <div class="chart-title stacked"><span>Zusammenfassung</span><small>${monthEntries.length} Einträge dokumentiert</small></div>
            <div class="monthly-list">
              ${growthParts.length ? `<div><strong>Wachstum</strong><span>${escapeHtml(growthParts.join(" · "))}</span></div>` : ""}
              ${feedings.length ? `<div><strong>Trinken</strong><span>${feedings.length} Fütterungen · ${totalMl} ml insgesamt</span></div>` : ""}
              ${diapers.length ? `<div><strong>Windeln</strong><span>${diapers.length} Einträge · ${diapers.filter((entry) => entry.data?.wet).length} nass · ${diapers.filter((entry) => entry.data?.stool).length} Stuhl</span></div>` : ""}
              ${milestones.length ? `<div><strong>Meilensteine</strong><span>${milestones.length} Einträge</span></div>` : ""}
              ${positives.length ? `<div><strong>Positive Entwicklung</strong><span>${positives.length} gute Momente oder neue Fähigkeiten</span></div>` : ""}
              ${findings.length ? `<div><strong>Arztbefunde</strong><span>${findings.length} dokumentiert</span></div>` : ""}
            </div>
          </article>
          ${renderMonthlyEntries("Neue Fähigkeiten", milestones, "flag")}
          ${renderMonthlyPositive(positives)}
          ${renderMonthlyEntries("Beobachtungen", observations, "eye")}
          ${renderMonthlyEntries("Arztbefunde", findings, "stethoscope")}
        ` : `<div class="empty">Noch keine Einträge in diesem Monat vorhanden.</div>`}
      </div>
    </section>
  `;
}

function renderMonthlyEntries(title, entries, iconName) {
  if (!entries.length) return "";
  return `
    <article class="chart-card">
      <div class="chart-title"><span>${escapeHtml(title)}</span><span>${entries.length}</span></div>
      <div class="monthly-list">
        ${entries.slice(0, 6).map((entry) => `
          <div>
            <strong>${escapeHtml(dateTimeText(entry.timestamp))}</strong>
            <span>${icon(iconName)} ${escapeHtml(detailForEntry(entry))}</span>
          </div>
        `).join("")}
      </div>
    </article>
  `;
}

function renderMonthlyPositive(items) {
  if (!items.length) return "";
  return `
    <article class="chart-card">
      <div class="chart-title"><span>Positive Entwicklung</span><span>${items.length}</span></div>
      <div class="monthly-list">
        ${items.slice(0, 6).map((item) => `
          <div>
            <strong>${escapeHtml(item.title)}</strong>
            <span>${escapeHtml(dateTimeText(item.entry.timestamp))}${item.detail ? ` · ${escapeHtml(item.detail)}` : ""}</span>
          </div>
        `).join("")}
      </div>
    </article>
  `;
}

function renderAnalytics() {
  const sections = [
    renderFeedingCharts(),
    renderDiaperCharts(),
    renderGrowthCharts(),
    renderVitalCharts(),
    renderMilestoneAchievements(),
    renderDevelopmentProfile(),
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

function renderDevelopmentProfile() {
  const achievements = uniqueMilestoneAchievements();
  if (!achievements.length) return "";
  const byArea = new Map();
  achievements.forEach((achievement) => {
    const area = achievement.area;
    byArea.set(area, [...(byArea.get(area) || []), achievement]);
  });
  const areas = [...byArea.entries()]
    .map(([area, items]) => ({ area, items: items.sort((a, b) => new Date(b.entry.timestamp) - new Date(a.entry.timestamp)) }))
    .sort((a, b) => b.items.length - a.items.length);

  return `
    <article class="chart-card">
      <div class="chart-title stacked">
        <span>Entwicklungsprofil</span>
        <small>Nur dokumentierte Fähigkeiten, ohne Bewertung.</small>
      </div>
      <div class="development-grid">
        ${areas.map(({ area, items }) => `
          <section class="development-card">
            <div class="development-head">
              <div>
                <div class="development-title">${escapeHtml(area)}</div>
                <div class="development-count">${items.length} dokumentiert</div>
              </div>
              <div class="development-icon">${icon(developmentAreaIcon(area))}</div>
            </div>
            <div class="development-items">
              ${items.map((item) => `
                <div class="development-item">
                  <span>${escapeHtml(item.label)}</span>
                  <details class="development-detail">
                    <summary>${escapeHtml(item.entries.length === 1 ? `1 Beobachtung · ${shortDateText(item.entries[0].timestamp)}` : `${item.entries.length} Beobachtungen`)}</summary>
                    ${item.entries.map((entry) => `<small>${escapeHtml(dateTimeText(entry.timestamp))}${entry.notes ? ` · ${escapeHtml(firstLine(entry.notes))}` : ""}</small>`).join("")}
                  </details>
                </div>
              `).join("")}
            </div>
          </section>
        `).join("")}
      </div>
    </article>
  `;
}

function renderPositiveDevelopment() {
  const items = positiveDevelopmentItems();
  if (!items.length) return "";
  return `
    <article class="chart-card">
      <div class="chart-title stacked">
        <span>Positive Entwicklung</span>
        <small>Neue Fähigkeiten und gute Momente.</small>
      </div>
      <div class="positive-list">
        ${items.slice(0, 8).map((item) => `
          <div class="positive-item">
            <div class="positive-icon">${icon(item.icon)}</div>
            <div>
              <div class="positive-title">${escapeHtml(item.title)}</div>
              <div class="positive-meta">${escapeHtml(dateTimeText(item.entry.timestamp))}${item.detail ? ` · ${escapeHtml(item.detail)}` : ""}</div>
            </div>
          </div>
        `).join("")}
      </div>
    </article>
  `;
}

function renderUHeftCompanion() {
  const nextExam = nextUHeftExam();
  const questions = state.settings.uHeftQuestions || [];
  const summary = currentUHeftSummary(nextExam.name);

  return `
    <article class="chart-card">
      <div class="chart-title stacked">
        <span>U-Heft-Begleiter</span>
        <small>Vorbereitung für das Gespräch, ohne Bewertung.</small>
      </div>
      <div class="uheft-panel">
        <div class="uheft-next">
          <div>
            <div class="uheft-label">Nächste Orientierung</div>
            <div class="uheft-title">${escapeHtml(nextExam.name)}</div>
            <div class="uheft-meta">${escapeHtml(nextExam.window)} · ${escapeHtml(nextExam.status)}</div>
          </div>
          <div class="uheft-icon">${icon("note")}</div>
        </div>
        ${nextExam.name.startsWith("U") && nextExam.window !== "Gelbes Heft" ? `<button class="text-button full" type="button" data-action="mark-uheft-done" data-exam="${escapeAttr(nextExam.name)}">Als durchgeführt markieren</button>` : ""}
        ${renderUHeftSummary(summary)}
        <div class="uheft-questions">
          <div class="uheft-label">Fragen für das Gespräch</div>
          ${questions.length ? normalizedUHeftQuestions().map((item, index) => `
            <div class="uheft-question">
              <div class="uheft-question-main">
                <span>${escapeHtml(item.question)}</span>
                <button class="icon-button compact" type="button" title="Frage entfernen" data-action="remove-uheft-question" data-index="${index}">${icon("close")}</button>
              </div>
              <textarea data-uheft-answer="${index}" placeholder="Antwort notieren">${escapeHtml(item.answer || "")}</textarea>
            </div>
          `).join("") : `<div class="empty">Noch keine Fragen notiert.</div>`}
          <div class="uheft-add">
            <input id="uheft-question" placeholder="Frage notieren" />
            <button class="text-button" type="button" data-action="add-uheft-question">Hinzufügen</button>
          </div>
        </div>
      </div>
    </article>
  `;
}

function renderUHeftView() {
  const completed = uHeftSchedule.filter((exam) => state.settings.uHeftExams?.[exam.name]?.done);
  return `
    <section>
      <div class="section-head">
        <h2>U-Heft</h2>
        <span>${completed.length ? `${completed.length} durchgeführt` : "Noch keine U dokumentiert"}</span>
      </div>
      <div class="analytics-list">
        ${renderUHeftCompanion()}
        <article class="chart-card">
          <div class="chart-title stacked">
            <span>Durchgeführte U-Untersuchungen</span>
            <small>Zum Nachtragen und Wiederfinden, lokal gespeichert.</small>
          </div>
          <div class="uheft-exam-list">
            ${uHeftSchedule.map(renderUHeftExamCard).join("")}
          </div>
        </article>
      </div>
    </section>
  `;
}

function renderUHeftExamCard(exam) {
  const record = state.settings.uHeftExams?.[exam.name] || {};
  return `
    <article class="uheft-exam-card ${record.done ? "done" : ""}">
      <div class="uheft-exam-head">
        <label><input type="checkbox" data-action="toggle-uheft-exam" data-exam="${escapeAttr(exam.name)}" ${record.done ? "checked" : ""} /> ${escapeHtml(exam.name)}</label>
        <span>${escapeHtml(exam.window)}</span>
      </div>
      <div class="uheft-exam-fields">
        <div class="field compact-field"><label for="uheft-date-${escapeAttr(exam.name)}">Datum <span>Optional</span></label><input id="uheft-date-${escapeAttr(exam.name)}" type="date" data-uheft-date="${escapeAttr(exam.name)}" value="${escapeAttr(record.doneAt ? record.doneAt.slice(0, 10) : "")}" /></div>
        <div class="field compact-field"><label for="uheft-note-${escapeAttr(exam.name)}">Notiz <span>Optional</span></label><input id="uheft-note-${escapeAttr(exam.name)}" data-uheft-note="${escapeAttr(exam.name)}" value="${escapeAttr(record.notes || "")}" /></div>
      </div>
      ${record.summary ? `
        <details class="uheft-snapshot">
          <summary>Gespeicherte Zusammenfassung</summary>
          ${renderUHeftSummary(record.summary, { editableGrowth: true, examName: exam.name })}
        </details>
      ` : ""}
    </article>
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
    return lineChart(title, values, unit, { showPointLabels: true, showTimeAxis: true, referenceKind: kind });
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
  const feedings = activeEntries().filter((entry) => entry.type === "feeding" && Number(entry.value) > 0);
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
  const diapers = activeEntries().filter((entry) => entry.type === "diaper");
  if (!diapers.length) return "";
  const byDay = dailyCounts(diapers, (items) => items.length);
  return `<article class="chart-card"><div class="chart-title"><span>Windeln</span><span>Einträge pro Tag</span></div>${barChart(byDay, "")}</article>`;
}

function renderMilestoneAchievements() {
  const achievements = uniqueMilestoneAchievements().filter((achievement) => achievement.status === "erstmals beobachtet");
  if (!achievements.length) return "";
  return `
    <article class="chart-card">
      <div class="chart-title"><span>Meilensteine</span><span>${achievements.length} erreicht</span></div>
      <div class="achievement-list">
        ${achievements.map((achievement) => `
          <div class="achievement-item">
            <div class="achievement-icon">${icon("flag")}</div>
            <div>
              <div class="achievement-title">${escapeHtml(achievement.label)}</div>
              <div class="achievement-meta">${escapeHtml(achievementStatusText(achievement))}</div>
              ${achievement.entry.notes ? `<div class="achievement-note">${escapeHtml(firstLine(achievement.entry.notes))}</div>` : ""}
            </div>
          </div>
        `).join("")}
      </div>
    </article>
  `;
}

function renderVitalCharts() {
  const cards = [];
  const temperature = measurements("temperature");
  const spo2 = measurements("spo2");
  const heartRate = measurements("heart_rate");
  if (temperature.length >= 2) {
    cards.push(`<article class="chart-card"><div class="chart-title"><span>Temperatur</span><span>Nur eintragen, wenn gemessen</span></div>${lineChart("Temperatur", temperature, "°C", { showPointLabels: true, showTimeAxis: true })}</article>`);
  }
  if (spo2.length >= 2) {
    cards.push(`<article class="chart-card"><div class="chart-title"><span>Sauerstoffsättigung</span><span>Niedrigster und höchster Wert</span></div>${rangeChart("Sauerstoffsättigung", spo2, "%")}${spo2ReferencePanel()}</article>`);
  }
  if (heartRate.length >= 2) {
    cards.push(`<article class="chart-card"><div class="chart-title"><span>Herzfrequenz</span><span>Niedrigster und höchster Wert</span></div>${rangeChart("Herzfrequenz", heartRate, "bpm")}${heartRateReferencePanel(heartRate.at(-1))}</article>`);
  }
  return cards.join("");
}

function renderSettings() {
  const hasDemoData = activeEntries().some((entry) => entry.data?.demo);
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
        <div class="field"><label for="default-milk">Standardnahrung</label><input id="default-milk" value="${escapeAttr(state.settings.defaultMilk)}" /></div>
        ${selectField("growth-reference-source", "Referenzkurven", [["who", "WHO"], ["german", "U-Heft / deutsche Referenzkurven"]], state.settings.growthReferenceSource || "who")}
        ${selectField("growth-reference-sex", "Perzentilen anzeigen", [["none", "Nicht anzeigen"], ["female", "Mädchen"], ["male", "Junge"]], state.settings.growthReferenceSex || "none")}
        <div class="segmented"><label><input type="checkbox" id="corrected-age-enabled" ${state.settings.correctedAgeEnabled ? "checked" : ""} /> Korrigiertes Alter verwenden</label></div>
        <div class="field"><label for="due-date">Errechneter Geburtstermin <span>Optional</span></label><input id="due-date" type="date" value="${escapeAttr(state.settings.dueDate || "")}" /></div>
        <div class="empty">Korrigiertes Alter wird nur als Entwicklungs- und U-Heft-Orientierung angezeigt.</div>
        <button class="primary-button" type="button" data-action="save-child">Speichern</button>
      </div>
      <div class="settings-card">
        <h3>App-Einstellungen</h3>
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
      <div class="settings-card">
        <h3>Export für Ärztinnen/Ärzte</h3>
        <p class="detail-stack">Erstellt eine kompakte Zusammenfassung für den gewählten Zeitraum als lokale Markdown-Datei. Es wird nichts hochgeladen.</p>
        <div class="custom-range">
          <div class="field"><label for="doctor-from">Von</label><input id="doctor-from" type="date" value="${doctorExportRange.from}" /></div>
          <div class="field"><label for="doctor-to">Bis</label><input id="doctor-to" type="date" value="${doctorExportRange.to}" /></div>
        </div>
        <button class="text-button full" type="button" data-action="export-doctor-summary">Zusammenfassung exportieren</button>
      </div>
      <div class="settings-card">
        <h3>CSV-Import</h3>
        <p class="detail-stack">CSV-Dateien werden nur lokal eingelesen. Vorhandene Einträge mit gleicher ID werden aktualisiert, neue Einträge ergänzt.</p>
        <label class="file-import">
          <input id="csv-import" type="file" accept=".csv,text/csv" multiple />
          <span>CSV-Datei auswählen</span>
        </label>
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

  const entry = editingId ? activeEntries().find((item) => item.id === editingId) : null;
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
      ${renderObservationCategories(data.categories || [], data.categoryNotes || {})}
      <div class="field"><label for="duration">Dauer <span>Optional</span></label><input id="duration" name="duration" value="${escapeAttr(data.duration || "")}" /></div>
      <div class="field"><label for="photo">Foto <span>Optional</span></label><input id="photo" name="photo" type="file" accept="image/*" /></div>
      ${notesField(notes)}`;
  }

  if (choice.id === "milestone") {
    return `${base}
      <div class="empty">Orientierung, keine Prüfung. Nur eintragen, wenn beobachtet.</div>
      ${radioGroup("milestoneStatus", "Status", ["erstmals beobachtet", "erneut beobachtet"], data.status || "erstmals beobachtet")}
      ${selectField("milestoneSituation", "Situation Optional", ["", "Spiel", "Bauchlage", "Sitzen", "Unterwegs", "beim Wickeln", "beim Essen", "mit Familie", "sonstiges"], data.situation)}
      ${renderMilestoneGroups(data.milestones || [])}
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
    const findingType = data.findingType || "Echo";
    return `${base}
      <div class="field"><label for="place">Ort/Klinik/Praxis <span>Optional</span></label><input id="place" name="place" value="${escapeAttr(data.place || "")}" /></div>
      ${selectField("findingType", "Art", ["Echo", "Herzkatheter", "Kontrolltermin", "Arztgespräch", "Entlassbrief", "Sonstiges"], findingType)}
      <div data-finding-fields>
        ${renderFindingSpecificFields(findingType, data)}
      </div>
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
    heart_rate: ["Herzfrequenz in bpm", "bpm", "number", "1", "Nur eintragen, wenn beobachtet"],
  };
  const [label, unit, type, step, placeholder] = specs[choice.kind];
  const situationOptions = {
    temperature: ["", "rektal", "Ohr", "Stirn", "Achsel", "unbekannt"],
    spo2: ["", "wach", "schlafend", "unruhig", "schreiend", "nach dem Trinken", "sonstiges"],
    heart_rate: ["", "ruhig", "schlafend", "schreiend", "trinkt", "unruhig", "sonstiges"],
  };
  if (["spo2", "heart_rate"].includes(choice.kind)) {
    const min = data.min ?? entry?.value ?? "";
    const max = data.max ?? entry?.value ?? "";
    return `${base}
      <div class="field-row">
        <div class="field"><label for="valueMin">Niedrigster Wert <span>Optional</span></label><input id="valueMin" name="valueMin" type="${type}" step="${step}" value="${min}" placeholder="${placeholder}" /></div>
        <div class="field"><label for="valueMax">Höchster Wert <span>Optional</span></label><input id="valueMax" name="valueMax" type="${type}" step="${step}" value="${max}" placeholder="${placeholder}" /></div>
      </div>
      <input type="hidden" name="unit" value="${unit}" />
      ${selectField("situation", "Situation Optional", situationOptions[choice.kind], data.situation)}
      ${choice.kind === "spo2" ? spo2ReferencePanel() : ""}
      ${choice.kind === "heart_rate" ? heartRateReferencePanel(entry || { timestamp: new Date().toISOString(), data }) : ""}
      ${notesField(notes)}`;
  }
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

function renderFindingSpecificFields(findingType, data) {
  const assessment = `<div class="field"><label for="assessment">Ärztliche Einschätzung <span>Optional</span></label><textarea id="assessment" name="assessment">${escapeHtml(data.assessment || "")}</textarea></div>`;
  const nextControl = `<div class="field"><label for="nextControl">Nächster Kontrolltermin <span>Optional</span></label><input id="nextControl" name="nextControl" type="datetime-local" value="${data.nextControl ? toLocalInputValue(data.nextControl) : ""}" /></div>`;
  const echoFields = `
    <div class="field-row">
      <div class="field"><label for="vmax">Vmax m/s <span>Optional</span></label><input id="vmax" name="vmax" type="number" step="0.01" value="${data.vmax || ""}" /></div>
      <div class="field"><label for="gradient">Druckgradient mmHg <span>Optional</span></label><input id="gradient" name="gradient" type="number" step="0.1" value="${data.gradient || ""}" /></div>
    </div>
    ${selectField("insufficiency", "Pulmonalklappen-Undichtigkeit Optional", ["", "keine", "gering", "mittel", "hochgradig", "nicht angegeben"], data.insufficiency)}
  `;
  if (findingType === "Echo") return `${echoFields}${assessment}${nextControl}`;
  if (findingType === "Herzkatheter") return `${assessment}${nextControl}`;
  if (findingType === "Kontrolltermin") return `${nextControl}${assessment}`;
  if (findingType === "Arztgespräch" || findingType === "Entlassbrief") return assessment;
  return `${assessment}${nextControl}`;
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
        ${options.map((option) => {
          const value = Array.isArray(option) ? option[0] : option;
          const text = Array.isArray(option) ? option[1] : (option || "Optional");
          return `<option value="${escapeAttr(value)}" ${selected === value ? "selected" : ""}>${escapeHtml(text)}</option>`;
        }).join("")}
      </select>
    </div>
  `;
}

function renderObservationCategories(selected, selectedNotes = {}) {
  const groups = {
    "Atmung": ["ruhige Atmung", "freie Atmung", "schnelle Atmung", "angestrengte Atmung", "Atempausen"],
    "Farbe/Kreislauf": ["rosig", "warme Hände/Füße", "blass", "blau/grau", "marmoriert", "kalte Hände/Füße"],
    "Trinken": ["trinkt gut", "trinkt entspannter", "trinkt schlechter als sonst", "schwitzt beim Trinken", "spuckt mehr", "Erbrechen"],
    "Verhalten": ["wach und zufrieden", "gut weckbar", "entspannt", "ungewöhnlich schläfrig", "sehr unruhig", "schwer weckbar", "schrilles Schreien"],
    "Wunde/Einstichstelle": ["unauffällig", "trocken", "Blutung", "Schwellung", "Rötung", "Wärme", "Sekret"],
    "Sonstiges": ["guter Gesamteindruck", "mehr nasse Windeln", "Fieber", "weniger nasse Windeln", "anderes"],
  };
  return Object.entries(groups).map(([group, options]) => `
    <section class="checkbox-section">
      <h3>${group}</h3>
      <div class="checkbox-grid">
        ${options.map((option) => `<label><input type="checkbox" name="categories" value="${escapeAttr(`${group}: ${option}`)}" ${selected.includes(`${group}: ${option}`) ? "checked" : ""} /> ${option}</label>`).join("")}
      </div>
      <div class="field compact-field"><label for="category-${slugify(group)}">Notiz zu ${group} <span>Optional</span></label><input id="category-${slugify(group)}" name="categoryNote:${escapeAttr(group)}" value="${escapeAttr(selectedNotes[group] || "")}" /></div>
    </section>
  `).join("");
}

function renderMilestoneGroups(selected) {
  return milestoneGroups.map((group) => `
    <section class="checkbox-section">
      <h3>${escapeHtml(group.age)}</h3>
      <div class="checkbox-grid">
        ${group.items.map((item) => {
          const value = `${group.age}: ${item}`;
          return `<label><input type="checkbox" name="milestones" value="${escapeAttr(value)}" ${selected.includes(value) ? "checked" : ""} /> ${escapeHtml(item)}</label>`;
        }).join("")}
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
      const entry = activeEntries().find((item) => item.id === button.dataset.id);
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
  ["monthly-review-month", "monthly-review-year"].forEach((id) => {
    const input = document.getElementById(id);
    if (!input) return;
    input.addEventListener("change", () => {
      const monthIndex = Number(document.getElementById("monthly-review-month").value);
      const year = document.getElementById("monthly-review-year").value;
      monthlySelection = `${year}-${String(monthIndex + 1).padStart(2, "0")}`;
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
  const findingType = document.getElementById("findingType");
  if (findingType) {
    findingType.addEventListener("change", () => {
      const target = document.querySelector("[data-finding-fields]");
      if (target) target.innerHTML = renderFindingSpecificFields(findingType.value, {});
    });
  }
  const actions = {
    "save-child": saveChild,
    "save-settings": saveSettings,
    "switch-child": switchChild,
    "add-child": addChild,
    "refresh-app": refreshApp,
    "load-demo": loadDemoData,
    "remove-demo": removeDemoData,
    "add-uheft-question": addUHeftQuestion,
    "remove-uheft-question": removeUHeftQuestion,
    "mark-uheft-done": markUHeftDone,
    "toggle-uheft-exam": toggleUHeftExam,
    "export-long": exportLongCsv,
    "export-separate": exportSeparateCsvs,
    "export-doctor-summary": exportDoctorSummary,
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
  const csvImport = document.getElementById("csv-import");
  if (csvImport) {
    csvImport.addEventListener("change", async () => {
      await importCsvFiles([...csvImport.files]);
      csvImport.value = "";
    });
  }
  document.querySelectorAll("[data-uheft-date]").forEach((input) => {
    input.addEventListener("change", () => updateUHeftExam(input.dataset.uheftDate, { done: Boolean(input.value), doneAt: input.value ? new Date(input.value).toISOString() : "" }));
  });
  document.querySelectorAll("[data-uheft-note]").forEach((input) => {
    input.addEventListener("change", () => updateUHeftExam(input.dataset.uheftNote, { notes: input.value.trim() }));
  });
  document.querySelectorAll("[data-uheft-growth]").forEach((input) => {
    input.addEventListener("change", () => updateUHeftGrowth(input.dataset.uheftGrowth, Number(input.dataset.growthIndex), input.value));
  });
  document.querySelectorAll("[data-uheft-answer]").forEach((input) => {
    input.addEventListener("change", () => updateUHeftAnswer(Number(input.dataset.uheftAnswer), input.value));
  });
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
  const existing = editingId ? activeEntries().find((entry) => entry.id === editingId) : null;
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
    value: entryValueForChoice(choice, formData),
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

function entryValueForChoice(choice, formData) {
  if (["spo2", "heart_rate"].includes(choice.id)) {
    const min = optionalNumber(formData.get("valueMin"));
    const max = optionalNumber(formData.get("valueMax"));
    if (min !== undefined && max !== undefined) return (min + max) / 2;
    return min ?? max;
  }
  return optionalNumber(formData.get("value"));
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
    if (["spo2", "heart_rate"].includes(choice.id)) {
      data.min = optionalNumber(formData.get("valueMin"));
      data.max = optionalNumber(formData.get("valueMax"));
    }
  }
  if (choice.id === "observation") {
    data.categories = formData.getAll("categories");
    data.categoryNotes = categoryNotesFromForm(formData);
    data.duration = cleanString(formData.get("duration"));
  }
  if (choice.id === "milestone") {
    data.milestones = formData.getAll("milestones");
    data.status = formData.get("milestoneStatus") || undefined;
    data.situation = cleanString(formData.get("milestoneSituation"));
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
    if (
      data[key] === undefined ||
      data[key] === "" ||
      (Array.isArray(data[key]) && !data[key].length) ||
      (data[key] && typeof data[key] === "object" && !Array.isArray(data[key]) && !Object.keys(data[key]).length)
    ) delete data[key];
  });
  return data;
}

function categoryNotesFromForm(formData) {
  return [...formData.entries()].reduce((notes, [key, value]) => {
    if (!key.startsWith("categoryNote:")) return notes;
    const text = cleanString(value);
    if (text) notes[key.slice("categoryNote:".length)] = text;
    return notes;
  }, {});
}

function saveChild() {
  state.child.name = document.getElementById("child-name").value.trim() || state.child.name;
  state.child.birthDate = document.getElementById("child-birth").value || state.child.birthDate;
  state.child.birthWeightGrams = optionalNumber(document.getElementById("birth-weight").value);
  state.child.birthLengthCm = optionalNumber(document.getElementById("birth-length").value);
  state.child.birthHeadCircumferenceCm = optionalNumber(document.getElementById("birth-head").value);
  state.settings.defaultMilk = document.getElementById("default-milk").value.trim() || "Pre";
  state.settings.growthReferenceSource = document.getElementById("growth-reference-source").value;
  state.settings.growthReferenceSex = document.getElementById("growth-reference-sex").value;
  state.settings.correctedAgeEnabled = document.getElementById("corrected-age-enabled").checked;
  state.settings.dueDate = document.getElementById("due-date").value || "";
  saveState();
  render();
}

function switchChild(event) {
  const childId = event.currentTarget.dataset.childId;
  if (!childId || childId === state.activeChildId) return;
  state.activeChildId = childId;
  syncActiveChild();
  saveState();
  render();
}

function addChild() {
  const name = prompt("Name des Kindes");
  if (!name?.trim()) return;
  const child = {
    id: crypto.randomUUID(),
    name: name.trim(),
    birthDate: new Date().toISOString().slice(0, 10),
    settings: defaultChildSettings(),
  };
  state.children.push(child);
  state.activeChildId = child.id;
  syncActiveChild();
  saveState();
  render();
}

function saveSettings() {
  state.settings.darkMode = document.getElementById("dark-mode").checked;
  state.settings.explicitThemeChoice = true;
  saveState();
  render();
}

function addUHeftQuestion() {
  const input = document.getElementById("uheft-question");
  const question = cleanString(input?.value);
  if (!question) return;
  state.settings.uHeftQuestions = [...normalizedUHeftQuestions(), { question, answer: "" }];
  saveState();
  render();
}

function removeUHeftQuestion(event) {
  const index = Number(event.currentTarget.dataset.index);
  state.settings.uHeftQuestions = normalizedUHeftQuestions().filter((_, itemIndex) => itemIndex !== index);
  saveState();
  render();
}

function updateUHeftAnswer(index, answer) {
  state.settings.uHeftQuestions = normalizedUHeftQuestions().map((item, itemIndex) => itemIndex === index ? { ...item, answer: answer.trim() } : item);
  saveState();
}

function updateUHeftGrowth(name, index, value) {
  const record = state.settings.uHeftExams?.[name];
  if (!record?.summary?.growth?.[index]) return;
  const growth = record.summary.growth.map((item, itemIndex) => itemIndex === index ? { ...item, value: value.trim() } : item);
  const nextSummary = {
    ...record.summary,
    growth,
    updatedAt: new Date().toISOString(),
  };
  nextSummary.growthSinceU = growthSincePreviousU(name, nextSummary);
  state.settings.uHeftExams = {
    ...(state.settings.uHeftExams || {}),
    [name]: {
      ...record,
      summary: nextSummary,
    },
  };
  saveState();
  render();
}

function markUHeftDone(event) {
  updateUHeftExam(event.currentTarget.dataset.exam, { done: true, doneAt: new Date().toISOString() });
}

function toggleUHeftExam(event) {
  const done = event.currentTarget.checked;
  updateUHeftExam(event.currentTarget.dataset.exam, { done, doneAt: done ? new Date().toISOString() : "" });
}

function updateUHeftExam(name, patch) {
  if (!name) return;
  const current = state.settings.uHeftExams?.[name] || {};
  const wasDone = Boolean(current.done);
  const dateChanged = Object.hasOwn(patch, "doneAt") && patch.doneAt !== current.doneAt;
  const nextRecord = {
    ...current,
    ...patch,
  };
  if (nextRecord.done && (!nextRecord.summary || dateChanged)) {
    nextRecord.summary = currentUHeftSummary(name, nextRecord.doneAt || new Date().toISOString());
  }
  if (!nextRecord.done) delete nextRecord.summary;
  state.settings.uHeftExams = {
    ...(state.settings.uHeftExams || {}),
    [name]: nextRecord,
  };
  if (!state.settings.uHeftExams[name].done && !state.settings.uHeftExams[name].doneAt && !state.settings.uHeftExams[name].notes) {
    delete state.settings.uHeftExams[name];
  }
  if (!wasDone && nextRecord.done) {
    state.settings.uHeftQuestions = [];
  }
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
  const confirmed = window.confirm("Demo-Daten laden? Deine eigenen Einträge bleiben erhalten, die App ergänzt aber Beispiel-Einträge. Du kannst Demo-Daten später wieder entfernen.");
  if (!confirmed) return;
  const existingRealEntries = state.entries.filter((entry) => entry.childId !== state.child.id || !entry.data?.demo);
  state.entries = [...existingRealEntries, ...createDemoEntries(state.child.id)].sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
  state.settings.demoRemoved = false;
  state.settings.demoVersion = DEMO_VERSION;
  saveState();
  render();
}

function removeDemoData() {
  state.entries = state.entries.filter((entry) => entry.childId !== state.child.id || !entry.data?.demo);
  state.settings.demoRemoved = true;
  saveState();
  render();
}

function exportLongCsv() {
  const headers = ["id", "childId", "timestamp", "type", "value", "unit", "data", "notes", "createdAt", "updatedAt"];
  downloadCsv("baby-monitor-export.csv", toCsv(activeEntries(), headers));
}

function exportSeparateCsvs() {
  const groups = {
    "feedings.csv": (entry) => entry.type === "feeding",
    "diapers.csv": (entry) => entry.type === "diaper",
    "measurements.csv": (entry) => entry.type === "measurement",
    "observations.csv": (entry) => entry.type === "observation",
    "milestones.csv": (entry) => entry.type === "milestone",
    "medications.csv": (entry) => entry.type === "medication",
    "medical_findings.csv": (entry) => entry.type === "medical_finding",
    "notes.csv": (entry) => entry.type === "note",
  };
  const headers = ["id", "childId", "timestamp", "type", "value", "unit", "data", "notes", "createdAt", "updatedAt"];
  Object.entries(groups).forEach(([filename, predicate]) => downloadCsv(filename, toCsv(activeEntries().filter(predicate), headers)));
}

function exportDoctorSummary() {
  doctorExportRange.from = document.getElementById("doctor-from")?.value || doctorExportRange.from;
  doctorExportRange.to = document.getElementById("doctor-to")?.value || doctorExportRange.to;
  const start = startOfDay(new Date(doctorExportRange.from));
  const end = startOfDay(new Date(doctorExportRange.to));
  end.setDate(end.getDate() + 1);
  const entries = activeEntries()
    .filter((entry) => {
      const timestamp = new Date(entry.timestamp);
      return timestamp >= start && timestamp < end;
    })
    .sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
  const lines = doctorSummaryLines(entries, doctorExportRange.from, doctorExportRange.to);
  downloadText(`arzt-zusammenfassung-${doctorExportRange.from}-bis-${doctorExportRange.to}.md`, lines.join("\n"));
}

function doctorSummaryLines(entries, from, to) {
  const feedings = entries.filter((entry) => entry.type === "feeding" && Number(entry.value) > 0);
  const diapers = entries.filter((entry) => entry.type === "diaper");
  const milestones = entries.filter((entry) => entry.type === "milestone");
  const observations = entries.filter((entry) => entry.type === "observation");
  const medications = entries.filter((entry) => entry.type === "medication");
  const findings = entries.filter((entry) => entry.type === "medical_finding");
  const measurementLines = ["weight", "head", "length", "temperature", "spo2", "heart_rate"]
    .map((kind) => entries.filter((entry) => entry.type === "measurement" && entry.data?.kind === kind))
    .filter((items) => items.length)
    .flatMap((items) => items.slice(-5).map((entry) => `- ${dateTimeText(entry.timestamp)}: ${entryTitle(entry)} ${formatValue(entry)}`));
  const totalMl = sum(feedings.map((entry) => Number(entry.value || 0)));
  return [
    `# Baby-Monitor Zusammenfassung`,
    ``,
    `Kind: ${state.child.name}`,
    `Geburtsdatum: ${state.child.birthDate}`,
    correctedAgeActive() ? `Alter: ${childAgeText()}` : `Alter: ${childAgeText()}`,
    `Zeitraum: ${from} bis ${to}`,
    ``,
    `## Überblick`,
    `- Einträge insgesamt: ${entries.length}`,
    feedings.length ? `- Trinken: ${feedings.length} Einträge, ${totalMl} ml insgesamt` : `- Trinken: keine Einträge`,
    diapers.length ? `- Windeln: ${diapers.length} Einträge, ${diapers.filter((entry) => entry.data?.wet).length} nass, ${diapers.filter((entry) => entry.data?.stool).length} Stuhl` : `- Windeln: keine Einträge`,
    ``,
    `## Wachstums- und Messwerte`,
    ...(measurementLines.length ? measurementLines : [`- Keine Messwerte im Zeitraum.`]),
    ``,
    `## Meilensteine`,
    ...(milestones.length ? milestones.map((entry) => `- ${dateTimeText(entry.timestamp)}: ${detailForEntry(entry)}`) : [`- Keine Meilensteine im Zeitraum.`]),
    ``,
    `## Beobachtungen`,
    ...(observations.length ? observations.map((entry) => `- ${dateTimeText(entry.timestamp)}: ${detailForEntry(entry)}${entry.notes ? ` (${entry.notes})` : ""}`) : [`- Keine Beobachtungen im Zeitraum.`]),
    ``,
    `## Medikamente`,
    ...(medications.length ? medications.map((entry) => `- ${dateTimeText(entry.timestamp)}: ${detailForEntry(entry)}`) : [`- Keine Medikamente im Zeitraum.`]),
    ``,
    `## Arztbefunde`,
    ...(findings.length ? findings.flatMap((entry) => [`- ${dateTimeText(entry.timestamp)}: ${detailForEntry(entry)}`, ...findingSummary(entry).lines.map((line) => `  - ${line}`)]) : [`- Keine Arztbefunde im Zeitraum.`]),
    ``,
    `## Fragen und Antworten aus dem U-Heft`,
    ...(normalizedUHeftQuestions().length ? normalizedUHeftQuestions().map((item) => `- ${item.question}${item.answer ? `\n  Antwort: ${item.answer}` : ""}`) : [`- Keine offenen Fragen notiert.`]),
    ``,
    `Hinweis: Diese Datei ist eine lokale Zusammenfassung dokumentierter Einträge und keine medizinische Bewertung.`,
    ``,
  ];
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
  downloadText(filename, content, "text/csv;charset=utf-8");
}

function downloadText(filename, content, type = "text/plain;charset=utf-8") {
  const blob = new Blob([content], { type });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.append(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

async function importCsvFiles(files) {
  if (!files.length) return;
  try {
    const imports = [];
    for (const file of files) {
      const text = await file.text();
      imports.push(...entriesFromCsv(text));
    }
    if (!imports.length) {
      alert("Keine passenden Einträge in der CSV-Datei gefunden.");
      return;
    }
    const byId = new Map(state.entries.map((entry) => [entry.id, entry]));
    imports.forEach((entry) => byId.set(entry.id, entry));
    state.entries = [...byId.values()].sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
    saveState();
    render();
    alert(`${imports.length} Einträge importiert.`);
  } catch (error) {
    alert(`CSV-Import nicht möglich: ${error.message}`);
  }
}

function entriesFromCsv(text) {
  const rows = parseCsv(text);
  if (rows.length < 2) return [];
  const headers = rows[0].map((header) => header.trim().replace(/^\uFEFF/, ""));
  return rows.slice(1)
    .map((row) => Object.fromEntries(headers.map((header, index) => [header, row[index] ?? ""])))
    .map(normalizeImportedEntry)
    .filter(Boolean);
}

function normalizeImportedEntry(row) {
  const allowedTypes = new Set(["feeding", "diaper", "measurement", "observation", "milestone", "medication", "medical_finding", "appointment", "note"]);
  const type = row.type?.trim();
  const timestamp = row.timestamp?.trim();
  if (!allowedTypes.has(type) || !timestamp || Number.isNaN(new Date(timestamp).getTime())) return null;

  let data = {};
  if (row.data?.trim()) {
    data = JSON.parse(row.data);
    if (!data || typeof data !== "object" || Array.isArray(data)) data = {};
  }

  const value = row.value === "" || row.value === undefined ? undefined : Number(row.value);
  const createdAt = row.createdAt?.trim() || new Date().toISOString();
  const updatedAt = row.updatedAt?.trim() || createdAt;
  const entry = {
    id: row.id?.trim() || crypto.randomUUID(),
    childId: row.childId?.trim() || state.child.id,
    type,
    timestamp: new Date(timestamp).toISOString(),
    createdAt: Number.isNaN(new Date(createdAt).getTime()) ? new Date().toISOString() : new Date(createdAt).toISOString(),
    updatedAt: Number.isNaN(new Date(updatedAt).getTime()) ? new Date().toISOString() : new Date(updatedAt).toISOString(),
    data,
  };
  if (value !== undefined && !Number.isNaN(value)) entry.value = value;
  if (row.unit?.trim()) entry.unit = row.unit.trim();
  if (row.notes?.trim()) entry.notes = row.notes.trim();
  return entry;
}

function parseCsv(text) {
  const rows = [];
  let row = [];
  let cell = "";
  let inQuotes = false;

  for (let index = 0; index < text.length; index += 1) {
    const char = text[index];
    const next = text[index + 1];
    if (char === '"' && inQuotes && next === '"') {
      cell += '"';
      index += 1;
      continue;
    }
    if (char === '"') {
      inQuotes = !inQuotes;
      continue;
    }
    if (char === "," && !inQuotes) {
      row.push(cell);
      cell = "";
      continue;
    }
    if ((char === "\n" || char === "\r") && !inQuotes) {
      if (char === "\r" && next === "\n") index += 1;
      row.push(cell);
      if (row.some((item) => item !== "")) rows.push(row);
      row = [];
      cell = "";
      continue;
    }
    cell += char;
  }

  row.push(cell);
  if (row.some((item) => item !== "")) rows.push(row);
  return rows;
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
    return activeEntries().filter((entry) => new Date(entry.timestamp) >= start);
  }
  if (timelineFilter === "custom") {
    const start = startOfDay(new Date(customRange.from));
    const end = startOfDay(new Date(customRange.to));
    end.setDate(end.getDate() + 1);
    return activeEntries().filter((entry) => {
      const timestamp = new Date(entry.timestamp);
      return timestamp >= start && timestamp < end;
    });
  }
  if (timelineFilter.startsWith("measurement:")) {
    const kind = timelineFilter.split(":")[1];
    return activeEntries().filter((entry) => entry.type === "measurement" && entry.data?.kind === kind);
  }
  return activeEntries().filter((entry) => entry.type === timelineFilter);
}

function entriesForDay(date) {
  const start = startOfDay(date);
  const end = new Date(start);
  end.setDate(end.getDate() + 1);
  return activeEntries().filter((entry) => {
    const timestamp = new Date(entry.timestamp);
    return timestamp >= start && timestamp < end;
  });
}

function entriesForMonth(date) {
  return activeEntries().filter((entry) => isSameMonth(new Date(entry.timestamp), date));
}

function monthDateFromSelection() {
  const [year, month] = monthlySelection.split("-").map(Number);
  if (!Number.isFinite(year) || !Number.isFinite(month)) return new Date();
  return new Date(year, month - 1, 1);
}

function monthlyReviewOptions() {
  const currentYear = new Date().getFullYear();
  const entryYears = activeEntries().map((entry) => new Date(entry.timestamp).getFullYear()).filter(Number.isFinite);
  const years = [...new Set([currentYear, ...entryYears])].sort((a, b) => b - a).map((year) => [String(year), String(year)]);
  const months = Array.from({ length: 12 }, (_, index) => [
    String(index),
    new Date(2024, index, 1).toLocaleDateString("de-DE", { month: "long" }),
  ]);
  return { months, years };
}

function isSameMonth(date, reference) {
  return date.getFullYear() === reference.getFullYear() && date.getMonth() === reference.getMonth();
}

function monthlyGrowthPart(kind, values) {
  if (!values.length) return "";
  const first = values[0];
  const last = values.at(-1);
  const label = { weight: "Gewicht", head: "Kopfumfang", length: "Länge" }[kind];
  if (values.length === 1) return `${label}: ${formatValue(last)}`;
  const delta = Number(last.value) - Number(first.value);
  const unit = last.unit || (kind === "weight" ? "g" : "cm");
  const formatted = kind === "weight" ? `${Math.round(delta)} ${unit}` : `${delta.toLocaleString("de-DE", { maximumFractionDigits: 1 })} ${unit}`;
  return `${label}: ${formatValue(last)} (${delta >= 0 ? "+" : ""}${formatted})`;
}

function measurements(kind) {
  return activeEntries()
    .filter((entry) => entry.type === "measurement" && entry.data?.kind === kind && Number.isFinite(Number(entry.value)))
    .sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
}

function latestMeasurementSummary() {
  const candidates = ["length", "head", "temperature", "spo2", "heart_rate"]
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

function nextUHeftExam() {
  const ageDays = childAgeDays({ corrected: true });
  const completed = state.settings.uHeftExams || {};
  const exam = uHeftSchedule.find((item) => !completed[item.name]?.done && ageDays <= item.end) || uHeftSchedule.find((item) => !completed[item.name]?.done);
  const suffix = correctedAgeActive() ? " (korrigiert)" : "";
  if (!exam) return { name: "U1-U9", window: "Gelbes Heft", status: "für dieses Alter liegen keine weiteren U1-U9-Fenster vor" };
  if (ageDays >= exam.start) return { ...exam, status: `aktuell im Zeitraum${suffix}` };
  return { ...exam, status: `${formatDayDistance(exam.start - ageDays)} bis zum Zeitraum${suffix}` };
}

function completedURecords() {
  return Object.entries(state.settings.uHeftExams || {})
    .filter(([, record]) => record.done && record.doneAt)
    .map(([name, record]) => ({ name, ...record, date: new Date(record.doneAt) }))
    .filter((record) => !Number.isNaN(record.date.getTime()))
    .sort((a, b) => b.date - a.date);
}

function lastCompletedURecord(excludeName = "") {
  return completedURecords().find((record) => record.name !== excludeName);
}

function growthSinceLastU(currentGrowthEntries = []) {
  const lastU = lastCompletedURecord();
  if (!lastU) return "Seit letzter U: noch keine U dokumentiert";
  const parts = growthComparisonParts(currentGrowthEntries.map(growthEntryToSnapshot), lastU.summary?.growth || []);
  return parts.length ? `Seit letzter U: ${parts.join(" · ")}` : "Seit letzter U: noch kein Vergleichswert";
}

function growthSincePreviousU(examName, summary) {
  const priorU = lastCompletedURecord(examName);
  if (!priorU) return "Seit letzter U: noch keine vorherige U dokumentiert";
  const parts = growthComparisonParts(summary.growth || [], priorU.summary?.growth || []);
  return parts.length ? `Seit letzter U: ${parts.join(" · ")}` : "Seit letzter U: noch kein Vergleichswert";
}

function currentUHeftSummary(examName, referenceDateString = new Date().toISOString()) {
  const recentSince = new Date();
  recentSince.setDate(recentSince.getDate() - 30);
  const referenceDate = new Date(referenceDateString);
  const latestGrowth = [
    measurementAtOrBefore("weight", referenceDate),
    measurementAtOrBefore("head", referenceDate),
    measurementAtOrBefore("length", referenceDate),
  ].filter(Boolean);
  const recentMilestones = state.entries
    .filter((entry) => entry.childId === state.child.id)
    .filter((entry) => entry.type === "milestone" && new Date(entry.timestamp) >= recentSince)
    .slice(0, 6)
    .map(summaryEntry);
  const recentObservations = state.entries
    .filter((entry) => entry.childId === state.child.id)
    .filter((entry) => entry.type === "observation" && new Date(entry.timestamp) >= recentSince)
    .slice(0, 6)
    .map(summaryEntry);
  const latestFinding = latest(activeEntries().filter((entry) => entry.type === "medical_finding"));
  return {
    examName,
    createdAt: new Date().toISOString(),
    growth: latestGrowth.map((entry) => ({
      label: entryTitle(entry),
      value: formatValue(entry),
      timestamp: entry.timestamp,
    })),
    growthSinceU: growthSinceLastU(latestGrowth),
    milestones: recentMilestones,
    observations: recentObservations,
    finding: latestFinding ? findingSummary(latestFinding) : null,
    questions: normalizedUHeftQuestions(),
  };
}

function measurementAtOrBefore(kind, date) {
  const values = measurements(kind);
  const timestamp = date.getTime();
  return [...values].reverse().find((entry) => new Date(entry.timestamp).getTime() <= timestamp) || latest(values);
}

function growthEntryToSnapshot(entry) {
  return {
    label: entryTitle(entry),
    value: formatValue(entry),
    timestamp: entry.timestamp,
  };
}

function growthComparisonParts(currentItems, priorItems) {
  const priorByKind = new Map(priorItems.map((item) => [growthKindFromLabel(item.label), item]));
  return currentItems.map((item) => {
    const kind = growthKindFromLabel(item.label);
    const prior = priorByKind.get(kind);
    const currentValue = numericGrowthValue(item.value);
    const priorValue = numericGrowthValue(prior?.value);
    if (!kind || !Number.isFinite(currentValue) || !Number.isFinite(priorValue)) return "";
    const delta = currentValue - priorValue;
    const unit = growthUnitFromValue(item.value) || (kind === "weight" ? "g" : "cm");
    const label = { weight: "Gewicht", head: "Kopfumfang", length: "Länge" }[kind];
    const formatted = kind === "weight" ? `${Math.round(delta)} ${unit}` : `${delta.toLocaleString("de-DE", { maximumFractionDigits: 1 })} ${unit}`;
    return `${label} ${delta >= 0 ? "+" : ""}${formatted}`;
  }).filter(Boolean);
}

function growthKindFromLabel(label = "") {
  if (label.includes("Gewicht")) return "weight";
  if (label.includes("Kopfumfang")) return "head";
  if (label.includes("Körperlänge") || label.includes("Länge")) return "length";
  return "";
}

function numericGrowthValue(value = "") {
  const normalized = String(value).replace(",", ".").match(/-?\d+(\.\d+)?/);
  return normalized ? Number(normalized[0]) : NaN;
}

function growthUnitFromValue(value = "") {
  if (String(value).includes("kg")) return "kg";
  if (String(value).includes("cm")) return "cm";
  if (String(value).includes("g")) return "g";
  return "";
}

function normalizedUHeftQuestions() {
  return (state.settings.uHeftQuestions || []).map((item) => {
    if (typeof item === "string") return { question: item, answer: "" };
    return {
      question: item?.question || "",
      answer: item?.answer || "",
    };
  }).filter((item) => item.question);
}

function summaryEntry(entry) {
  return {
    timestamp: entry.timestamp,
    title: entryTitle(entry),
    detail: detailForEntry(entry),
    notes: entry.notes || "",
  };
}

function findingSummary(entry) {
  return {
    timestamp: entry.timestamp,
    detail: detailForEntry(entry),
    lines: [
      entry.data?.place ? `Ort: ${entry.data.place}` : "",
      entry.data?.findingType ? `Art: ${entry.data.findingType}` : "",
      entry.data?.vmax !== undefined ? `Vmax: ${entry.data.vmax} m/s` : "",
      entry.data?.gradient !== undefined ? `Druckgradient: ${entry.data.gradient} mmHg` : "",
      entry.data?.insufficiency ? `Undichtigkeit: ${entry.data.insufficiency}` : "",
      entry.data?.assessment ? `Einschätzung: ${entry.data.assessment}` : "",
      entry.notes ? `Notiz: ${entry.notes}` : "",
    ].filter(Boolean),
  };
}

function renderUHeftSummary(summary, options = {}) {
  return `
    <div class="uheft-summary">
      ${summary.growth?.length ? `<div><strong>Wachstumswerte</strong>${summary.growth.map((item, index) => options.editableGrowth ? `
        <label class="uheft-growth-field">
          <span>${escapeHtml(item.label)} · ${escapeHtml(dateTimeText(item.timestamp))}</span>
          <input data-uheft-growth="${escapeAttr(options.examName || summary.examName || "")}" data-growth-index="${index}" value="${escapeAttr(item.value)}" />
        </label>
      ` : `<span>${escapeHtml(item.label)}: ${escapeHtml(item.value)} · ${escapeHtml(dateTimeText(item.timestamp))}</span>`).join("")}${summary.growthSinceU ? `<small>${escapeHtml(summary.growthSinceU)}</small>` : ""}</div>` : ""}
      ${summary.milestones?.length ? `<div><strong>Meilensteine</strong>${summary.milestones.map((item) => `<span>${escapeHtml(dateTimeText(item.timestamp))}: ${escapeHtml(item.detail)}</span>`).join("")}</div>` : ""}
      ${summary.observations?.length ? `<div><strong>Beobachtungen</strong>${summary.observations.map((item) => `<span>${escapeHtml(dateTimeText(item.timestamp))}: ${escapeHtml(item.detail)}</span>`).join("")}</div>` : ""}
      ${summary.finding ? renderFindingSummary(summary.finding) : ""}
      ${summary.questions?.length ? `<div><strong>Fragen</strong>${summary.questions.map((item) => `<span>${escapeHtml(typeof item === "string" ? item : item.question)}${typeof item === "string" || !item.answer ? "" : `<br>Antwort: ${escapeHtml(item.answer)}`}</span>`).join("")}</div>` : ""}
    </div>
  `;
}

function renderFindingSummary(finding) {
  return `
    <details class="uheft-finding">
      <summary>Arztbefund · ${escapeHtml(dateTimeText(finding.timestamp))}</summary>
      <div>${finding.lines?.length ? finding.lines.map((item) => `<span>${escapeHtml(item)}</span>`).join("") : `<span>${escapeHtml(finding.detail || "Keine weiteren Details dokumentiert.")}</span>`}</div>
    </details>
  `;
}

function renderFindingDetails(entry) {
  const details = [
    entry.data?.place ? `Ort: ${entry.data.place}` : "",
    entry.data?.findingType ? `Art: ${entry.data.findingType}` : "",
    entry.data?.vmax !== undefined ? `Vmax: ${entry.data.vmax} m/s` : "",
    entry.data?.gradient !== undefined ? `Druckgradient: ${entry.data.gradient} mmHg` : "",
    entry.data?.insufficiency ? `Undichtigkeit: ${entry.data.insufficiency}` : "",
    entry.data?.assessment ? `Einschätzung: ${entry.data.assessment}` : "",
    entry.notes ? `Notiz: ${entry.notes}` : "",
  ].filter(Boolean);
  return `
    <details class="uheft-finding">
      <summary>Letzter Arztbefund · ${escapeHtml(dateTimeText(entry.timestamp))}</summary>
      <div>${details.length ? details.map((item) => `<span>${escapeHtml(item)}</span>`).join("") : `<span>Keine weiteren Details dokumentiert.</span>`}</div>
    </details>
  `;
}

function childAgeDays(options = {}) {
  const origin = options.corrected && correctedAgeActive() ? new Date(state.settings.dueDate) : new Date(state.child.birthDate);
  if (Number.isNaN(origin.getTime())) return 0;
  return Math.max(0, Math.floor((startOfDay(new Date()) - startOfDay(origin)) / (24 * 60 * 60 * 1000)));
}

function formatDayDistance(days) {
  if (days < 14) return `${days} Tage`;
  if (days < 70) return `${Math.round(days / 7)} Wochen`;
  return `${Math.round(days / 30.4375)} Monate`;
}

function dailyCounts(entries, reducer) {
  const groups = new Map();
  entries.forEach((entry) => {
    const key = new Date(entry.timestamp).toLocaleDateString("de-DE", { day: "2-digit", month: "2-digit" });
    groups.set(key, [...(groups.get(key) || []), entry]);
  });
  return [...groups.entries()].map(([label, items]) => ({ label, value: reducer(items) })).slice(-7);
}

function positiveDevelopmentItems() {
  const milestoneItems = activeEntries()
    .filter((entry) => entry.type === "milestone")
    .map((entry) => ({
      entry,
      title: milestoneText(entry) || "Meilenstein dokumentiert",
      detail: entry.data?.status || "neue Fähigkeit",
      icon: "flag",
    }));
  const observationItems = activeEntries()
    .filter((entry) => entry.type === "observation" && positiveObservationText(entry))
    .map((entry) => ({
      entry,
      title: positiveObservationText(entry),
      detail: firstLine(entry.notes || ""),
      icon: "sparkles",
    }));
  return [...milestoneItems, ...observationItems]
    .sort((a, b) => new Date(b.entry.timestamp) - new Date(a.entry.timestamp));
}

function positiveObservationText(entry) {
  const positiveTerms = ["ruhige Atmung", "freie Atmung", "rosig", "warme Hände/Füße", "trinkt gut", "trinkt entspannter", "wach und zufrieden", "gut weckbar", "entspannt", "unauffällig", "trocken", "guter Gesamteindruck", "mehr nasse Windeln"];
  const positives = (entry.data?.categories || [])
    .map((item) => item.split(": ").pop())
    .filter((item) => positiveTerms.includes(item));
  return positives.slice(0, 2).join(", ");
}

function positiveEntryText(entry) {
  if (entry.type === "milestone") return milestoneText(entry) || "Meilenstein dokumentiert";
  return positiveObservationText(entry) || firstLine(entry.notes || "Positiv dokumentiert");
}

function milestoneAchievements() {
  return activeEntries()
    .filter((entry) => entry.type === "milestone")
    .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
    .flatMap((entry) => (entry.data?.milestones || []).map((milestone) => {
      const parsed = parseMilestone(milestone);
      return {
        entry,
        ...parsed,
        area: developmentAreaFor(parsed.label),
        status: entry.data?.status || "erstmals beobachtet",
        situation: entry.data?.situation || "",
        hasAttachment: Boolean(entry.data?.attachment),
      };
    }));
}

function uniqueMilestoneAchievements() {
  const grouped = new Map();
  const achievements = milestoneAchievements();
  achievements.forEach((achievement) => {
    const key = `${achievement.age}::${achievement.label}`;
    const current = grouped.get(key) || {
      ...achievement,
      entries: [],
    };
    current.entries = [...current.entries, achievement.entry]
      .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
    const firstObserved = achievements
      .filter((item) => `${item.age}::${item.label}` === key && item.status === "erstmals beobachtet")
      .sort((a, b) => new Date(a.entry.timestamp) - new Date(b.entry.timestamp))[0];
    if (firstObserved) {
      current.entry = firstObserved.entry;
      current.status = firstObserved.status;
      current.situation = firstObserved.situation;
      current.hasAttachment = firstObserved.hasAttachment;
    } else {
      current.entry = current.entries.at(-1);
    }
    grouped.set(key, current);
  });
  return [...grouped.values()];
}

function achievementStatusText(achievement) {
  return [
    achievement.age,
    achievement.status,
    achievement.situation,
    dateTimeText(achievement.entry.timestamp),
    achievement.hasAttachment ? "Foto" : "",
  ].filter(Boolean).join(" · ");
}

function parseMilestone(milestone) {
  if (!milestone.includes(": ")) return { age: "Meilenstein", label: milestone };
  const [age, ...rest] = milestone.split(": ");
  return { age, label: rest.join(": ") };
}

function developmentAreaFor(label) {
  const text = label.toLowerCase();
  if (["kopf", "bauchlage", "stützt", "dreht", "sitzt", "robbt", "krabbelt", "hoch", "steht", "schritte", "läuft", "rennt", "klettert", "ball", "sitzen", "stehen", "laufen"].some((word) => text.includes(word))) return "Motorik";
  if (["wörter", "mama", "papa", "sätze", "aufforderungen", "ansprache", "stimme", "namen"].some((word) => text.includes(word))) return "Sprache & Verstehen";
  if (["lächeln", "schaut euch", "guck-guck", "fremdelt", "gestikuliert", "zeigt"].some((word) => text.includes(word))) return "Kontakt & Sozial";
  if (["gesichter", "geräusche", "augen", "hände", "greift", "dinge", "mund", "spielt", "rollenspiele", "türme", "imitiert"].some((word) => text.includes(word))) return "Wahrnehmung & Spiel";
  if (["selbst", "regeln", "tätigkeiten"].some((word) => text.includes(word))) return "Alltag & Selbstständigkeit";
  return "Weitere Fähigkeiten";
}

function developmentAreaIcon(area) {
  const icons = {
    "Motorik": "activity",
    "Sprache & Verstehen": "chat",
    "Kontakt & Sozial": "heart",
    "Wahrnehmung & Spiel": "eye",
    "Alltag & Selbstständigkeit": "home",
    "Weitere Fähigkeiten": "flag",
  };
  return icons[area] || "flag";
}

function countBy(entries, getKey) {
  const groups = new Map();
  entries.forEach((entry) => {
    const key = getKey(entry);
    groups.set(key, (groups.get(key) || 0) + 1);
  });
  return [...groups.entries()].map(([label, value]) => ({ label, value }));
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
  const times = entries.map((entry) => new Date(entry.timestamp).getTime());
  const minTime = Math.min(...times);
  const maxTime = Math.max(...times);
  const timeRange = maxTime - minTime || 1;
  const references = referenceSeries(options.referenceKind, minTime, maxTime);
  const referenceValues = references.flatMap((line) => line.points.map((point) => point.value));
  const min = Math.min(...values, ...referenceValues);
  const max = Math.max(...values, ...referenceValues);
  const padding = (max - min) * 0.12 || 1;
  const yMin = min - padding;
  const yMax = max + padding;
  const range = yMax - yMin || 1;
  const width = 420;
  const xStart = 12;
  const xEnd = width - 12;
  const xForTime = (timestamp, index = 0) => entries.length > 2 || timeRange > 1
    ? xStart + ((timestamp - minTime) / timeRange) * (xEnd - xStart)
    : xStart + (index / (entries.length - 1)) * (xEnd - xStart);
  const yForValue = (value) => 126 - ((value - yMin) / range) * 86;
  const points = entries.map((entry, index) => {
    const x = xForTime(new Date(entry.timestamp).getTime(), index);
    const y = yForValue(Number(entry.value));
    return [x, y, entry, index];
  });
  const path = points.map(([x, y], index) => `${index ? "L" : "M"} ${x.toFixed(1)} ${y.toFixed(1)}`).join(" ");
  const referencePaths = references.map((line) => ({
    ...line,
    path: line.points.map((point, index) => {
      const x = xForTime(point.time);
      const y = yForValue(point.value);
      return `${index ? "L" : "M"} ${x.toFixed(1)} ${y.toFixed(1)}`;
    }).join(" "),
  }));
  const latestPercentile = percentileForEntry(entries.at(-1), options.referenceKind);
  const latestLabel = [formatValue(entries.at(-1)), latestPercentile ? `${referenceShortLabel()} ${latestPercentile}` : ""].filter(Boolean).join(" · ");
  return `
    <div class="chart-title"><span>${title}</span><span>${escapeHtml(latestLabel)}</span></div>
    <div class="chart-frame">
      <svg class="line-chart" viewBox="0 0 ${width} 180" role="img" aria-label="${title}">
        <line class="axis-line" x1="${xStart}" y1="140" x2="${xEnd}" y2="140"></line>
        ${referencePaths.map((line) => `<path class="reference-line ${line.key === "p50" ? "median" : ""}" d="${line.path}"></path>`).join("")}
        ${referencePaths.map((line) => `<text class="reference-label" x="${(xEnd - 2).toFixed(1)}" y="${yForValue(line.points.at(-1).value).toFixed(1)}" text-anchor="end">${line.label}</text>`).join("")}
        <path d="${path}"></path>
        ${points.map(([x, y]) => `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="4"></circle>`).join("")}
        ${options.showPointLabels ? points.map(([x, y, entry, index]) => `<text class="point-label" x="${x.toFixed(1)}" y="${Math.max(16, y - 10).toFixed(1)}" text-anchor="${edgeAnchor(index, points.length)}">${escapeHtml(chartPointValue(entry, unit))}</text>`).join("") : ""}
        ${options.showTimeAxis ? points.map(([x, , entry, index]) => `<text class="axis-label" x="${x.toFixed(1)}" y="164" text-anchor="${edgeAnchor(index, points.length)}">${escapeHtml(shortDateText(entry.timestamp))}</text>`).join("") : ""}
        ${options.showTimeAxis ? "" : `<text class="unit-label" x="${xStart}" y="176">${escapeHtml(unit)}</text>`}
      </svg>
    </div>
  `;
}

function rangeChart(title, entries, unit) {
  if (entries.length < 2) return `<div class="empty">Noch nicht genug Werte für einen Verlauf.</div>`;
  const ranges = entries.map((entry) => {
    const fallback = Number(entry.value);
    const low = Number(entry.data?.min ?? fallback);
    const high = Number(entry.data?.max ?? fallback);
    return {
      entry,
      low: Math.min(low, high),
      high: Math.max(low, high),
      time: new Date(entry.timestamp).getTime(),
    };
  }).filter((item) => Number.isFinite(item.low) && Number.isFinite(item.high) && Number.isFinite(item.time));
  if (ranges.length < 2) return `<div class="empty">Noch nicht genug Werte für einen Verlauf.</div>`;

  const minTime = Math.min(...ranges.map((item) => item.time));
  const maxTime = Math.max(...ranges.map((item) => item.time));
  const timeRange = maxTime - minTime || 1;
  const min = Math.min(...ranges.map((item) => item.low));
  const max = Math.max(...ranges.map((item) => item.high));
  const padding = (max - min) * 0.18 || 1;
  const yMin = min - padding;
  const yMax = max + padding;
  const range = yMax - yMin || 1;
  const width = 420;
  const xStart = 12;
  const xEnd = width - 12;
  const xForTime = (timestamp, index = 0) => ranges.length > 2 || timeRange > 1
    ? xStart + ((timestamp - minTime) / timeRange) * (xEnd - xStart)
    : xStart + (index / (ranges.length - 1)) * (xEnd - xStart);
  const yForValue = (value) => 126 - ((value - yMin) / range) * 86;
  const points = ranges.map((item, index) => ({
    ...item,
    index,
    x: xForTime(item.time, index),
    yLow: yForValue(item.low),
    yHigh: yForValue(item.high),
  }));
  const lowPath = points.map((point, index) => `${index ? "L" : "M"} ${point.x.toFixed(1)} ${point.yLow.toFixed(1)}`).join(" ");
  const highPath = points.map((point, index) => `${index ? "L" : "M"} ${point.x.toFixed(1)} ${point.yHigh.toFixed(1)}`).join(" ");
  const latest = points.at(-1);
  return `
    <div class="chart-frame">
      <svg class="line-chart range-chart" viewBox="0 0 ${width} 180" role="img" aria-label="${title}">
        <line class="axis-line" x1="${xStart}" y1="140" x2="${xEnd}" y2="140"></line>
        ${points.map((point) => `<line class="range-connector" x1="${point.x.toFixed(1)}" y1="${point.yHigh.toFixed(1)}" x2="${point.x.toFixed(1)}" y2="${point.yLow.toFixed(1)}"></line>`).join("")}
        <path class="range-line high" d="${highPath}"></path>
        <path class="range-line low" d="${lowPath}"></path>
        ${points.map((point) => `<circle class="range-point high" cx="${point.x.toFixed(1)}" cy="${point.yHigh.toFixed(1)}" r="3.5"></circle><circle class="range-point low" cx="${point.x.toFixed(1)}" cy="${point.yLow.toFixed(1)}" r="3.5"></circle>`).join("")}
        ${points.map((point) => `
          <text class="point-label" x="${point.x.toFixed(1)}" y="${Math.max(14, point.yHigh - 10).toFixed(1)}" text-anchor="${edgeAnchor(point.index, points.length)}">${escapeHtml(rangePointLabel(point.high, unit))}</text>
          <text class="point-label" x="${point.x.toFixed(1)}" y="${Math.min(136, point.yLow + 16).toFixed(1)}" text-anchor="${edgeAnchor(point.index, points.length)}">${escapeHtml(rangePointLabel(point.low, unit))}</text>
        `).join("")}
        ${points.map((point) => `<text class="axis-label" x="${point.x.toFixed(1)}" y="164" text-anchor="${edgeAnchor(point.index, points.length)}">${escapeHtml(shortDateText(point.entry.timestamp))}</text>`).join("")}
      </svg>
    </div>
  `;
}

function rangePointLabel(value, unit) {
  return `${Number(value).toLocaleString("de-DE", { maximumFractionDigits: 1 })} ${unit}`;
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

function referenceSeries(kind, minTime, maxTime) {
  const { sex, data } = growthReferenceData(kind);
  if (!data || sex === "none" || !["weight", "head", "length"].includes(kind)) return [];
  const count = 18;
  const keys = [
    ["p5", "P5"],
    ["p50", "P50"],
    ["p95", "P95"],
  ];
  return keys.map(([key, label]) => ({
    key,
    label,
    points: Array.from({ length: count }, (_, index) => {
      const time = minTime + ((maxTime - minTime || 1) * index) / (count - 1);
      const ageMonths = ageMonthsAt(new Date(time));
      const value = growthValueAt(data, ageMonths, key);
      return value === null ? null : { time, value };
    }).filter(Boolean),
  })).filter((line) => line.points.length > 1);
}

function percentileForEntry(entry, kind) {
  const { sex, data } = growthReferenceData(kind);
  if (!entry || !data || sex === "none" || !["weight", "head", "length"].includes(kind)) return "";
  const ageMonths = ageMonthsAt(new Date(entry.timestamp));
  const lms = growthLmsAt(data, ageMonths);
  if (!lms) return "";
  const value = Number(entry.value);
  const z = lms.l === 0 ? Math.log(value / lms.median) / lms.s : ((value / lms.median) ** lms.l - 1) / (lms.l * lms.s);
  const percentile = Math.max(0, Math.min(100, normalCdf(z) * 100));
  return `P${Math.round(percentile)}`;
}

function growthReferenceData(kind) {
  const sex = state.settings.growthReferenceSex;
  const source = state.settings.growthReferenceSource || "who";
  const datasets = {
    who: window.WHO_GROWTH,
    german: window.GERMAN_GROWTH,
  };
  return { sex, source, data: datasets[source]?.[sex]?.[kind] };
}

function referenceShortLabel() {
  return state.settings.growthReferenceSource === "german" ? "U-Heft" : "WHO";
}

function growthValueAt(data, ageMonths, key) {
  if (!data.length || ageMonths < data[0].m || ageMonths > data.at(-1).m) return null;
  const lower = data.reduce((best, row) => row.m <= ageMonths ? row : best, data[0]);
  const upper = data.find((row) => row.m >= ageMonths) || data.at(-1);
  if (upper.m === lower.m) return lower[key];
  const ratio = (ageMonths - lower.m) / (upper.m - lower.m);
  return lower[key] + (upper[key] - lower[key]) * ratio;
}

function growthLmsAt(data, ageMonths) {
  if (!data.length || ageMonths < data[0].m || ageMonths > data.at(-1).m) return null;
  return {
    l: growthValueAt(data, ageMonths, "l"),
    median: growthValueAt(data, ageMonths, "median"),
    s: growthValueAt(data, ageMonths, "s"),
  };
}

function ageMonthsAt(date) {
  const birth = new Date(state.child.birthDate);
  const days = Math.max(0, (startOfDay(date) - startOfDay(birth)) / (24 * 60 * 60 * 1000));
  return Math.max(0, Math.min(24, days / 30.4375));
}

function ageMonthsSinceBirth(date) {
  const birth = new Date(state.child.birthDate);
  const days = Math.max(0, (startOfDay(date) - startOfDay(birth)) / (24 * 60 * 60 * 1000));
  return days / 30.4375;
}

function heartRateReferenceFor(entry) {
  const date = new Date(entry?.timestamp || Date.now());
  const ageMonths = ageMonthsSinceBirth(date);
  const range = heartRateReferenceRanges.find((item) => ageMonths >= item.minMonths && ageMonths < item.maxMonths) || heartRateReferenceRanges.at(-1);
  const situation = String(entry?.data?.situation || "").toLowerCase();
  const context = situation.includes("schlaf") ? "sleep" : "awake";
  return {
    ...range,
    context,
    values: range[context],
  };
}

function heartRateReferencePanel(entry) {
  const reference = heartRateReferenceFor(entry);
  const contextLabel = reference.context === "sleep" ? "Schlaf" : "wach/ruhig";
  return `
    <div class="reference-panel">
      <strong>Puls-Orientierung</strong>
      <span>${escapeHtml(reference.age)} · ${contextLabel}: ${reference.values[0]}-${reference.values[1]} bpm</span>
      <small>Orientierungsbereich nach HealthyChildren/AAP. Puls schwankt mit Schlaf, Wachzustand, Aktivität, Trinken und Unruhe.</small>
    </div>
  `;
}

function spo2ReferencePanel() {
  return `
    <div class="reference-panel">
      <strong>SpO₂-Orientierung</strong>
      <span>Weiter Orientierungsbereich: etwa 90-100 %</span>
      <small>Nur als Orientierung. Individuelle Zielbereiche, Messbedingungen, Höhe sowie bekannte Herz- oder Lungenthemen können davon abweichen.</small>
    </div>
  `;
}

function normalCdf(z) {
  const t = 1 / (1 + 0.2316419 * Math.abs(z));
  const d = 0.3989423 * Math.exp(-z * z / 2);
  const probability = d * t * (0.3193815 + t * (-0.3565638 + t * (1.781478 + t * (-1.821256 + t * 1.330274))));
  return z > 0 ? 1 - probability : probability;
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
  if (entry.type === "observation") return [categoriesText(entry), entry.data?.duration].filter(Boolean).join(" · ") || firstLine(entry.notes || "Beobachtung");
  if (entry.type === "milestone") return [milestoneText(entry), entry.data?.status, entry.data?.situation, entry.data?.attachment ? "Foto" : "", firstLine(entry.notes || "")].filter(Boolean).join(" · ") || "Meilenstein";
  if (entry.type === "medication") return [entry.data?.name, entry.data?.dose, entry.data?.unit, entry.data?.given === false ? "nicht gegeben" : "gegeben"].filter(Boolean).join(" · ") || "Medikament";
  if (entry.type === "medical_finding") return [entry.data?.place, entry.data?.assessment || entry.notes].filter(Boolean).map(firstLine).join(" · ") || "Arztbefund";
  return [firstLine(entry.notes || "Freie Notiz"), entry.data?.attachment ? "Anhang" : ""].filter(Boolean).join(" · ");
}

function categoriesText(entry) {
  return (entry.data?.categories || []).map((item) => item.split(": ").pop()).slice(0, 2).join(", ");
}

function milestoneText(entry) {
  const milestones = entry.data?.milestones || [];
  if (!milestones.length) return "";
  const preview = milestones.map((item) => item.split(": ").pop()).slice(0, 2).join(", ");
  return milestones.length > 2 ? `${preview} +${milestones.length - 2}` : preview;
}

function choiceForEntry(entry) {
  if (entry.type === "measurement") return entryChoices.find((choice) => choice.kind === entry.data?.kind) || entryChoices.find((choice) => choice.id === "weight");
  return entryChoices.find((choice) => choice.type === entry.type) || entryChoices.at(-1);
}

function formatValue(entry) {
  if (["spo2", "heart_rate"].includes(entry.data?.kind) && (entry.data?.min !== undefined || entry.data?.max !== undefined)) {
    const min = entry.data?.min ?? entry.value;
    const max = entry.data?.max ?? entry.value;
    return min === max ? `${min} ${entry.unit || ""}`.trim() : `${min}-${max} ${entry.unit || ""}`.trim();
  }
  if (!Number.isFinite(Number(entry.value))) return "";
  if (entry.data?.kind === "weight") {
    const grams = Math.round(Number(entry.value));
    return `${grams} g`;
  }
  return `${Number(entry.value).toLocaleString("de-DE", { maximumFractionDigits: 1 })} ${entry.unit || ""}`.trim();
}

function childAgeText() {
  const birth = new Date(state.child.birthDate);
  if (Number.isNaN(birth.getTime())) return "";
  const now = new Date();
  if (birth > now) return "Geburtsdatum liegt in der Zukunft";
  const calendar = ageTextFromDate(birth, now);
  if (!correctedAgeActive()) return calendar;
  const corrected = ageTextFromDate(new Date(state.settings.dueDate), now);
  return `${calendar} · korrigiert ${corrected}`;
}

function ageTextFromDate(startDate, now = new Date()) {
  if (Number.isNaN(startDate.getTime())) return "";
  if (startDate > now) return "0 Wochen";
  const totalDays = Math.floor((startOfDay(now) - startOfDay(startDate)) / (24 * 60 * 60 * 1000));
  let months = (now.getFullYear() - startDate.getFullYear()) * 12 + now.getMonth() - startDate.getMonth();
  if (now.getDate() < startDate.getDate()) months -= 1;
  months = Math.max(0, months);
  const monthAnchor = addMonthsClamped(startDate, months);
  const remainingDays = Math.max(0, Math.floor((startOfDay(now) - startOfDay(monthAnchor)) / (24 * 60 * 60 * 1000)));
  const remainingWeeks = Math.floor(remainingDays / 7);
  if (months === 0) return `${Math.floor(totalDays / 7)} Wochen`;
  return remainingWeeks ? `${months} Monate, ${remainingWeeks} Wochen` : `${months} Monate`;
}

function correctedAgeActive() {
  if (!state.settings.correctedAgeEnabled || !state.settings.dueDate) return false;
  const due = new Date(state.settings.dueDate);
  const birth = new Date(state.child.birthDate);
  return !Number.isNaN(due.getTime()) && !Number.isNaN(birth.getTime()) && due > birth;
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

function relativeTimeText(dateString) {
  const diffMinutes = Math.max(0, Math.round((Date.now() - new Date(dateString).getTime()) / 60000));
  if (diffMinutes < 60) return `vor ${diffMinutes || 1} Min.`;
  const hours = Math.round(diffMinutes / 60);
  if (hours < 48) return `vor ${hours} Std.`;
  const days = Math.round(hours / 24);
  return `vor ${days} Tagen`;
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

function slugify(value) {
  return String(value || "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
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
    close: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="m7 7 10 10M17 7 7 17"/></svg>`,
    bottle: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M9 2h6v4l-2 2v13H8V8L6 6V2h3M8 12h5M8 16h5"/></svg>`,
    diaper: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M3 7h18v6a7 7 0 0 1-7 7h-4a7 7 0 0 1-7-7zM7 7v5M17 7v5M8 15h8"/></svg>`,
    scale: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><rect x="4" y="5" width="16" height="15" rx="2"/><path d="M9 11a3 3 0 0 1 6 0M12 11l2-2"/></svg>`,
    ruler: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="m4 16 12-12 4 4L8 20zM9 15l-2-2M12 12l-2-2M15 9l-2-2"/></svg>`,
    circle: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><circle cx="12" cy="12" r="8"/><path d="M8 18c1-2 7-2 8 0"/></svg>`,
    thermometer: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M14 14.8V5a3 3 0 0 0-6 0v9.8a5 5 0 1 0 6 0zM11 5v10"/></svg>`,
    drop: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M12 3s7 7 7 12a7 7 0 0 1-14 0c0-5 7-12 7-12z"/><path d="M9 14h6"/></svg>`,
    heart: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M20 8.5c0 5-8 10.5-8 10.5S4 13.5 4 8.5A4.5 4.5 0 0 1 12 6a4.5 4.5 0 0 1 8 2.5z"/><path d="M7 12h3l1-2 2 5 1-3h3"/></svg>`,
    lungs: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M12 4v16M12 10c-5-5-8-2-8 4v4c4 1 7-1 8-5M12 10c5-5 8-2 8 4v4c-4 1-7-1-8-5"/></svg>`,
    activity: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M4 13h4l2-6 4 12 2-6h4"/></svg>`,
    chat: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M5 5h14v10H9l-4 4z"/><path d="M8 9h8M8 12h5"/></svg>`,
    sparkles: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M12 3l1.4 4.1 4.1 1.4-4.1 1.4L12 14l-1.4-4.1-4.1-1.4 4.1-1.4zM18 14l.8 2.2L21 17l-2.2.8L18 20l-.8-2.2L15 17l2.2-.8zM6 15l.6 1.6 1.6.4-1.6.6L6 19.2l-.6-1.6-1.6-.6 1.6-.4z"/></svg>`,
    eye: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M2 12s4-6 10-6 10 6 10 6-4 6-10 6S2 12 2 12z"/><circle cx="12" cy="12" r="3"/></svg>`,
    flag: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M6 21V4M6 5h11l-1.8 4L17 13H6"/><path d="M6 13h8"/></svg>`,
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
