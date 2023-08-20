import { useLoaderData } from '@remix-run/react';
import Product from '~/components/Product';
import { getCategories } from '~/models/categories.server';
import { getProducts } from '~/models/products.server';
import { getSubCategories, getSubCategory, getSubCategoryAll } from '~/models/subcategories.server';
import style from '~/styles/index.css';
import styleTienda from '~/styles/tienda.css';

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



export async function loader({params}) {

    const [ categories, subcategories, products ] = await Promise.all([
        getCategories(),
        getSubCategories(),
        getProducts()
    ])

    const { subcategory } = params;
    const subCategoryProducts = await getSubCategory(subcategory);
    const subCategoryAll = await getSubCategoryAll(subcategory)

    const data = {
        categories,
        subcategories,
        products,
        subCategoryProducts,
        subCategoryAll
    }

    return data;
}


const CategorySubcategory = () => {
    
    const data = useLoaderData();
    const products = data.subCategoryProducts.data[0].attributes.products.data;
    const subcategories = data.subCategoryAll.data[0].attributes;
    const categories = data.subCategoryAll.data[0].attributes.category.data.attributes;

    return (
        <>
            <main>
            {products?.length ? 
                <div className='outstanding__container'>
                    <h3 className='outstanding__title'>{subcategories.name}</h3>
                    <div className='outstanding__products-container'>
                        {products?.map(product => (
                            <Product
                            key={product.id}
                            product={product}
                            subcategories={subcategories}
                            categories={categories}
                            />
                        ))}
                    </div>
                </div>
                
            : <h3>No hay productos disponibles</h3>}
            </main>
            <aside>

            </aside>
        </>
    );
}

export default CategorySubcategory;
