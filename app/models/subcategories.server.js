export async function getSubCategories(){
    const respuesta = await fetch(`${process.env.API_URL}/subcategories?populate=*`);
    const resultado = await respuesta.json();
    
    return resultado;
}

export async function getSubCategory(url) {
    const respuesta = await fetch(`${process.env.API_URL}/subcategories?filters[url]=${url}&populate=products.image`);
    const resultado = await respuesta.json();
    
    return resultado;
}

export async function getSubCategoryAll(url){
    const respuesta = await fetch(`${process.env.API_URL}/subcategories?filters[url]=${url}&populate=*`);
    const resultado = await respuesta.json();
    
    return resultado;
}