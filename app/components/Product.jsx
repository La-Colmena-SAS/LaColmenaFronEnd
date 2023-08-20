import { Link } from '@remix-run/react';
import { formatearCantidad } from '~/helpers/index';
import cart from '../../public/assets/cart.svg'

const Product = ({ categories, subcategories, product }) => {

    const { name, url, image, price } = product.attributes;
    const categoryName = categories.name;
    const subCategoryName = subcategories.name;
    

    return (
        <div className="product">
            <div className="product__container">
                <div className='product__image-container'>
                    <img className='product__image' src={image.data.attributes.url} alt={`Imagen de ${name}`} />
                    <div className='product__modal'>
                        <Link to={`/${categoryName}/${subCategoryName}/${url}`} >
                            <button>
                                <img className='product__cart' src={cart} alt="carrito" /> Ver <span>Producto</span> 
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
            <div className='product__info-container'>
                <h3 className='product__title'>{name}</h3>
                <p className='product__price'>${formatearCantidad(price)}</p>
            </div>
        </div>
    );
}

export default Product;
