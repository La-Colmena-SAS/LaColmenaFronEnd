import { useLoaderData } from '@remix-run/react';
import Product from '~/components/Product';
import { getCategories } from '~/models/categories.server';
import { getProducts } from '~/models/products.server';
import { getSubCategories } from '~/models/subcategories.server';


export async function loader() {
    
    const [ categories, subcategories, products ] = await Promise.all([
        getCategories(),
        getSubCategories(),
        getProducts()
    ])
    
    const data = {
        categories, 
        subcategories, 
        products
    }
    
    return data;

}

export const meta = ({ data }) => {

    if (!data) {
        return (
            [
                { title: `La Colmena - Producto no disponible` },
                { description: `La Colmena, venta de productos agricolas y carnes, Producto no disponible` },
            ]
        );
    }

    return (
        [
            { charset: 'utf-8' },
            { title: 'La Colmena - Tienda' },
            { description: 'La Colmena, venta de carne de res, carne de cerdo, productos avicolas, abono' },
            { viewport: 'width=device-width, initial-scale=1' }
        ]
    );
}


const TiendaIndex = () => {

    const data = useLoaderData();
    const products = data.products.data;
    
    const subcategorycerdo = data.subcategories.data;
    const subcategorycerdoFiltered = subcategorycerdo.filter(subcategory => subcategory.attributes?.name === 'cerdo');
    const subcategories = subcategorycerdoFiltered[0].attributes;

    const categorycarne = data.categories.data;
    const categorycerdoFiltered = categorycarne.filter(category => category.attributes?.name === 'carnes');
    const categories = categorycerdoFiltered[0].attributes;

    return (
        <section className='outstanding'>
            <div className='outstanding__container'>
                <h3 className='outstanding__title'>Productos Destacados</h3>
                <div className='outstanding__products-container'>
                    {products.some(product => product.attributes.subcategory?.data?.attributes?.name === 'cerdo') ? (
                        products
                            .filter(product => product.attributes.subcategory?.data?.attributes?.name === 'cerdo')
                            .map(product => (
                                <Product
                                    key={product.id}
                                    product={product}
                                    subcategories={subcategories}
                                    categories={categories}
                                />
                            ))
                    ) : (
                        <h3>No hay productos de cerdo disponibles</h3>
                    )}
                </div>
            </div>
        </section>
    );
}

export default TiendaIndex;
