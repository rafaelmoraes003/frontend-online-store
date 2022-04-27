// import * as api from './services/api';

export async function getCategories() {
  const url = 'https://api.mercadolibre.com/sites/MLB/categories';
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
}

export async function getProductsFromCategoryAndQuery(categoryId, query) {
  const url = `https://api.mercadolibre.com/sites/MLB/search?category=${categoryId}_ID&q=${query}`;
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
}

export async function getItemsByQuery(query) {
  const url = `https://api.mercadolibre.com/sites/MLB/search?q=${query}`;
  try {
    const response = await fetch(url);
    const data = response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
}

export async function getItemsByCategory(CATEGORY_ID) {
  const url = `https://api.mercadolibre.com/sites/MLB/search?category=${CATEGORY_ID}`; //
  try {
    const response = await fetch(url);
    const data = response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
}
