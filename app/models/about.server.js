export async function getAbout() {
    const respuesta = await fetch(`${process.env.API_URL}/about?populate=imagen`);
    return await respuesta.json()
}