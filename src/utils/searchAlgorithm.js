export const searchData = (data, searchField) => {
  if (searchField.length === 0) {
    return data?.results;
  }
  return data?.results.filter((item) => {
    return item.name.toLowerCase().indexOf(searchField.toLowerCase()) > -1;
  });
};
