import { Link, useLoaderData, useNavigate, useOutletContext } from '@remix-run/react';
import { useState } from 'react';
import { getProduct } from '~/models/products.server';
import { formatearCantidad } from '~/helpers/index';
import style from '~/styles/index.css';
import styleTienda from '~/styles/tienda.css';
import ButtonAddCart from '~/components/ButtonAddCart';
import { Message } from '~/components/Message';
import SelectQuantity from '~/components/SelectQuantity';


export async function loader({ params }) {

    const { productp } = params;
    const product = await getProduct(productp);

    return product.data[0].attributes;
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
            { title: `La Colmena - ${data.url} de ${data.subcategory.data.attributes.name}` },
            { description: `La Colmena, venta de ${data.subcategory.data.attributes.name}` },
            { viewport: 'width=device-width, initial-scale=1' }
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




const CategorypSubcategorypProduct = () => {

    const [peso, setPeso] = useState(0);
    const [cantidad, setCantidad] = useState(0);
    const [mensaje, setMensaje] = useState('');
    const [isvalid, setIsvalid] = useState(false);

    const product = useLoaderData();
    const navigate = useNavigate();

    const { agregarCarrito } = useOutletContext();

    const handleGoBack = () => {
        navigate(-1)
    }

    const handleSubmit = (e) => {
        
        e.preventDefault();
        
        if (peso <= 0 && (cantidad <= 0 | isNaN(cantidad))) {

            setMensaje(`¡ Ingrese un Peso y una Cantidad Valida ! `); 
            setIsvalid(false);
            setTimeout(() => {
                setMensaje('')
            }, 1500);

            return;

        } else if (peso <= 0) {
            
            setMensaje(`¡ Ingrese un Peso Valido ! `);
            setIsvalid(false);
            setTimeout(() => {
                setMensaje('')
            }, 1500);

            return;

        } else if (cantidad <= 0 | isNaN(cantidad)) {
            
            setMensaje(`¡ Ingrese una Cantidad Valida ! `)
            setIsvalid(false);
            setTimeout(() => {
                setMensaje('')
            }, 1500);
            

            return;
        }


        const productSelected = {
            id: product.url,
            image: product.image.data.attributes.url,
            name: product.name,
            price: product.price,
            peso,
            cantidad
        }

        setIsvalid(true);
        setMensaje(`Su pedido se ha añadido correctamente al carrito`);
        setTimeout(() => {
            setMensaje('')
        }, 1000);
        
        agregarCarrito(productSelected);
    }

    const messageState = isvalid ? 'valid' : 'alert';
    
    return (
        <main className='productSelected'>
            <Link className='productSelected__goback' onClick={handleGoBack}>Volver</Link>
            <div className='productSelected__container'>
                <div className='productSelected__image-container'>
                    <img className='productSelected__image' src={product.image.data.attributes.url} alt={`imagen ${product.name}`} />
                </div>
                <div className='productSelected__info'>
                    <h3 className='productSelected__title'>{product.name}</h3>
                    <p className='productSelected__price'>{formatearCantidad(product.price)}</p>
                    <form onSubmit={handleSubmit} className='formulario'>
                        <SelectQuantity
                            setPeso={setPeso}
                            setCantidad={setCantidad}
                        />
                        <ButtonAddCart/>
                        {mensaje && <Message tipo={messageState}>{mensaje}</Message>}
                    </form>
                </div>
            </div>
        </main>
    );
}

export default CategorypSubcategorypProduct;
