export async function getProducts(){
    const respuesta = await fetch(`${process.env.API_URL}/products?populate=*`);
    const resultado = await respuesta.json();
    
    return resultado;
}

export async function getProduct(url) {
    const respuesta = await fetch(`${process.env.API_URL}/products?filters[url]=${url}&populate=*`);
    const resultado = await respuesta.json();
    
    return resultado;
}
