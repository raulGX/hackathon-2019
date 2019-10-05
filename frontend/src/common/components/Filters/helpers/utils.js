export const filterMeetings = (meetings, selectedFilters) => {
  if (!selectedFilters || selectedFilters.length === 0) return meetings;

  return meetings.filter(meeting => {
    const exists = selectedFilters.some(({ category, id: value }) => value === meeting[category]);
    return exists;
  });
};
