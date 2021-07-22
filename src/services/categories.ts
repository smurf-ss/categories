export const queryCategories = async () => {
  // https://api.publicapis.org/categories

  const fetchData = await fetch(
    "https://nodejs-typescript-express-domo.herokuapp.com/categories"
  );
  const data = await fetchData.json();
  return data;
};
