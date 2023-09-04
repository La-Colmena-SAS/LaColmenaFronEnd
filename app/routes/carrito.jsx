import { Link, Outlet, useOutletContext } from '@remix-run/react';
import { useEffect, useState } from 'react';
import { ClientOnly } from 'remix-utils';
import { formatearCantidad } from '~/helpers/index';
import CartItem from '~/components/CartItem';
import style from '~/styles/carrito.css';


export const meta = () => {
    return (
        [
            { charset: 'utf-8' },
            { title: 'La Colmena - Carrito' },
            { viewport: 'width=device-width, initial-scale=1' }
        ]
    );
}

export const links = () => {
    return ([
        {
            rel: 'stylesheet',
            href: style
        }
    ])
}


const Carrito = () => {

    const [total, setTotal] = useState(0);
    const { setCarrito, carrito, actualizarCantidad, actualizarPeso, eliminarProduct } = useOutletContext();

    useEffect(() => {
        const calcTotal = carrito.reduce((total, product) => total + (product.cantidad * (product.peso / 1000) * product.price), 0);
        setTotal(calcTotal);
    }, [carrito]);

    return (
        <ClientOnly fallback={'Cargando...'}>
            {() => (
                <main className='carrito'>
                    <h1 className="carrito__title title">Carrito de compras</h1>
                    <div className="carrito__contenido">
                        <div className='carrito__products'>
                            <h2 className='carrito__product-title subtitle'>Listado de productos</h2>
                            {carrito?.length === 0 ? 'Carrito vacio' :
                                <div className='carrito__product-list'>
                                    {carrito?.map(product => (
                                        <CartItem
                                            key={product.id}
                                            product={product}
                                            actualizarCantidad={actualizarCantidad}
                                            actualizarPeso={actualizarPeso}
                                            eliminarProduct={eliminarProduct}
                                        />
                                    ))
                                    }
                                </div>
                            }
                        </div>
                        <aside className='carrito__resumen'>
                            <div className='carrito__resumen-container'>
                                <h3 className='carrito__resumen-title subtitle'>Resumen del pedido</h3>
                                <p>Total a Pagar: <span>$ {formatearCantidad(total)} COP</span></p>
                            </div>
                            <Link 
                                className='carrito__realizar-pedido-link' 
                                to="/carrito/formulario">
                                <input
                                    className='carrito__realizar-pedido' 
                                    type="submit" 
                                    value={"Realizar Pedido"}
                                />
                            </Link>
                        </aside>
                    </div>
                    <Outlet
                        context={{setCarrito, carrito, total}}
                    />
                </main>
            )}
        </ClientOnly>

    );
}

export default Carrito;
