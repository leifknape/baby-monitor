// U-Heft oriented curves digitized from the supplied U-Heft photos.
// 0-24 months reuse the existing German Kromeyer-Hauschild oriented data where available;
// later points are approximate readings from the photographed printed curves.
(function () {
  const base = window.GERMAN_GROWTH || {};

  function p3(row) {
    if (row.p3 !== undefined) return row.p3;
    if (row.p2 !== undefined && row.p5 !== undefined) return round(row.p2 + ((row.p5 - row.p2) / 3));
    return row.p5;
  }

  function p97(row) {
    if (row.p97 !== undefined) return row.p97;
    if (row.p95 !== undefined && row.p98 !== undefined) return round(row.p95 + ((row.p98 - row.p95) * 2) / 3);
    return row.p95;
  }

  function round(value) {
    return Math.round(Number(value) * 100) / 100;
  }

  function fromGerman(sex, kind) {
    return (base[sex]?.[kind] || []).map((row) => ({
      m: row.m,
      p3: p3(row),
      ...(row.p10 !== undefined ? { p10: row.p10 } : {}),
      p50: row.p50,
      ...(row.p90 !== undefined ? { p90: row.p90 } : {}),
      p97: p97(row),
    }));
  }

  function kgRows(rows) {
    return rows.map((row) => Object.fromEntries(
      Object.entries(row).map(([key, value]) => [key, key === "m" ? value : Math.round(value * 1000)])
    ));
  }

  function merge(baseRows, extraRows) {
    const rows = new Map(baseRows.map((row) => [row.m, row]));
    extraRows.forEach((row) => rows.set(row.m, row));
    return [...rows.values()].sort((a, b) => a.m - b.m);
  }

  const maleLength = [
    { m: 36, p3: 89.5, p10: 92, p50: 96.3, p90: 101.2, p97: 103.5 },
    { m: 48, p3: 96.5, p10: 99.2, p50: 103.8, p90: 109, p97: 111.5 },
    { m: 60, p3: 103.5, p10: 106, p50: 110.2, p90: 116, p97: 119 },
    { m: 72, p3: 110, p10: 112.5, p50: 116.7, p90: 123, p97: 126.5 },
    { m: 84, p3: 115.5, p10: 118, p50: 122, p90: 128, p97: 132 },
  ];

  const femaleLength = [
    { m: 36, p3: 88.5, p10: 91, p50: 95, p90: 100.5, p97: 103 },
    { m: 48, p3: 95.5, p10: 98.3, p50: 103, p90: 109, p97: 112 },
    { m: 60, p3: 102.5, p10: 105.5, p50: 110, p90: 116.5, p97: 120 },
    { m: 72, p3: 109, p10: 112, p50: 116.8, p90: 124, p97: 128 },
    { m: 84, p3: 115, p10: 118, p50: 122.5, p90: 130, p97: 134 },
  ];

  const maleWeight = kgRows([
    { m: 36, p3: 11.5, p10: 12.5, p50: 14.8, p90: 18, p97: 20 },
    { m: 48, p3: 13, p10: 14.2, p50: 16.5, p90: 21.2, p97: 24 },
    { m: 60, p3: 14.6, p10: 16, p50: 18.7, p90: 24.6, p97: 28 },
    { m: 72, p3: 16.2, p10: 17.9, p50: 21, p90: 28.6, p97: 32 },
    { m: 84, p3: 17.5, p10: 19.5, p50: 23.5, p90: 32, p97: 35 },
  ]);

  const femaleWeight = kgRows([
    { m: 36, p3: 11.2, p10: 12, p50: 14.2, p90: 18.2, p97: 20.5 },
    { m: 48, p3: 12.8, p10: 14, p50: 16.3, p90: 21.8, p97: 25 },
    { m: 60, p3: 14.5, p10: 15.8, p50: 18.4, p90: 25.5, p97: 30 },
    { m: 72, p3: 16, p10: 17.6, p50: 20.8, p90: 30, p97: 35 },
    { m: 84, p3: 17, p10: 19, p50: 23.5, p90: 34, p97: 39 },
  ]);

  const maleHead = [
    { m: 36, p3: 48.4, p10: 49.2, p50: 50.8, p90: 52.4, p97: 53.4 },
    { m: 48, p3: 49, p10: 49.8, p50: 51.2, p90: 53, p97: 54 },
  ];

  const femaleHead = [
    { m: 36, p3: 47.4, p10: 48.2, p50: 49.8, p90: 51.7, p97: 52.8 },
    { m: 48, p3: 47.8, p10: 48.8, p50: 50.3, p90: 52.4, p97: 53.4 },
  ];

  const maleBmi = [
    { m: 0, p3: 10.2, p50: 12.7, p90: 14 },
    { m: 3, p3: 12.3, p50: 14.8, p90: 17.2 },
    { m: 6, p3: 13.8, p50: 16.6, p90: 18.7 },
    { m: 9, p3: 14.5, p50: 16.9, p90: 18.8 },
    { m: 12, p3: 14.6, p50: 16.8, p90: 18.7 },
    { m: 24, p3: 14, p50: 16.1, p90: 18 },
    { m: 36, p3: 13.6, p50: 15.6, p90: 17.7 },
    { m: 48, p3: 13.4, p50: 15.5, p90: 17.6 },
    { m: 60, p3: 13.3, p50: 15.5, p90: 17.7 },
    { m: 72, p3: 13.2, p50: 15.6, p90: 18 },
    { m: 84, p3: 13.3, p50: 15.8, p90: 18.4 },
  ];

  const femaleBmi = [
    { m: 0, p3: 10.2, p50: 12.7, p90: 14 },
    { m: 3, p3: 12.2, p50: 14.6, p90: 16.8 },
    { m: 6, p3: 13.6, p50: 16, p90: 17.9 },
    { m: 9, p3: 14, p50: 16.3, p90: 18.1 },
    { m: 12, p3: 14.1, p50: 16.3, p90: 18.2 },
    { m: 24, p3: 13.6, p50: 15.7, p90: 17.7 },
    { m: 36, p3: 13.1, p50: 15.3, p90: 17.4 },
    { m: 48, p3: 12.9, p50: 15.1, p90: 17.3 },
    { m: 60, p3: 12.8, p50: 15.1, p90: 17.4 },
    { m: 72, p3: 12.7, p50: 15.2, p90: 17.7 },
    { m: 84, p3: 12.7, p50: 15.3, p90: 18.1 },
  ];

  window.UHEFT_BOOK_GROWTH = {
    male: {
      weight: merge(fromGerman("male", "weight"), maleWeight),
      length: merge(fromGerman("male", "length"), maleLength),
      head: merge(fromGerman("male", "head"), maleHead),
      bmi: maleBmi,
    },
    female: {
      weight: merge(fromGerman("female", "weight"), femaleWeight),
      length: merge(fromGerman("female", "length"), femaleLength),
      head: merge(fromGerman("female", "head"), femaleHead),
      bmi: femaleBmi,
    },
  };
})();
