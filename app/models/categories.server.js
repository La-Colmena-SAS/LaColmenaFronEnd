export async function getCategories(){
    const respuesta = await fetch(`${process.env.API_URL}/categories?populate=*`);
    const resultado = await respuesta.json();
    
    return resultado;
}

export async function getCategory(url) {
    const respuesta = await fetch(`${process.env.API_URL}/categories?filters[url]=${url}&populate=subcategories.image`);
    const resultado = await respuesta.json();
    
    return resultado;
}