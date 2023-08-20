import { useLoaderData } from "@remix-run/react";
import SubCategory from "~/components/SubCategory";
import { getCategory } from "~/models/categories.server";
import style from '~/styles/index.css';
import styleTienda from '~/styles/tienda.css';


export async function loader({params}) {

    const { categoryUrl} = params;
    const subcategories = await getCategory(categoryUrl);

    return subcategories.data[0].attributes;
}


export const meta = ({data}) => {
    
    if(!data) {
        return (
            [
                {title: `La Colmena - Producto no disponible`},
                {description: `La Colmena, venta de productos agricolas y carnes, Producto no disponible`},
            ]
        );
    }


    return (
        [
            {charset: 'utf-8'},
            {title: `La Colmena - Venta de ${data.url}`},
            {description: `La Colmena, venta de ${data.url}`},
            {viewport: 'width=device-width, initial-scale=1'} 
        ]
    );       
}

export const links = () => {
    return ([
        {
            rel: 'stylesheet',
            href: style
        },
        {
            rel: 'stylesheet',
            href: styleTienda
        },
        {
            // rel: 'preload',
            // href: imagen,
            // as: image
        }
    ])
}




const CategoryUrl = () => {
    
    const subcategories = useLoaderData();
    const subcategoriesData = subcategories.subcategories.data


    // Verifica si subcategories y subcategories.name están definidos antes de acceder a la propiedad
    const categoryName = subcategories && subcategories.name ? subcategories.name.toUpperCase() : '';
    

    return (

        <main className='tienda__container'>
            <h2 className='tienda__title'>{categoryName}</h2>
            {subcategoriesData?.length && (
                <div className='tienda__categories-container'>
                    {subcategoriesData?.map(subcategory => (
                        <SubCategory
                            key={subcategory?.attributes.url}
                            subcategory={subcategory?.attributes}
                            subcategories={subcategories}
                            subcategoriesData={subcategoriesData}
                        />
                    ))}
                </div>
            )}
        </main>
    );

}

export default CategoryUrl;
