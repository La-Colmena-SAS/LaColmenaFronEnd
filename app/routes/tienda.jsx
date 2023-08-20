import { Outlet, useLoaderData } from '@remix-run/react';
import { getCategories } from '~/models/categories.server';
import Category from '~/components/Category';
import style from '~/styles/index.css';
import styleTienda from '~/styles/tienda.css';


export async function loader() {
    const categories = await getCategories();

    return categories.data;
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
            {title: 'La Colmena - Tienda'},
            {description: 'La Colmena, venta de carne de res, carne de cerdo, productos avicolas, abono'},
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




const Tienda = () => {

    const categories = useLoaderData();
    return (
        <main className='tienda__container'>
            <h2 className='tienda__title'>Categorías</h2>
            {categories?.length && (
                <div className='tienda__categories-container'>
                    {categories.map(category => (
                        <Category
                            key={category?.attributes.url}
                            category={category?.attributes}
                        />
                    ))}
                </div>
            )}
            <Outlet/>
        </main>
    );
}

export default Tienda;
