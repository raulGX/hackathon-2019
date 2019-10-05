export const uniqueMeetingsFromClusters = meetings => {
  const duplicates = {};
  const unique = meetings.reduce((result, m) => {
    const { payload } = m.properties;

    if (!duplicates[payload.id]) {
      duplicates[payload.id] = true;
      result.push(payload);
    }

    return result;
  }, []);

  return unique.sort(a => {
    if (a.ongoing) return -1;
    return 0;
  });
};
