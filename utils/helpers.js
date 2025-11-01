export const getById = (data, id) => data.find((e) => e.id == id);

export const getNextId = (data) => {
  if (data.length === 0) return 1;
  return Math.max(...data.map((e) => e.id)) + 1;
};
