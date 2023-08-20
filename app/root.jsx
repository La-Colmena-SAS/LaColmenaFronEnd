import { useEffect, useState } from 'react';
import { 
    Meta,
    Links,
    Outlet,
    Scripts,
    LiveReload,
    useRouteError,
    Link
} from '@remix-run/react';
import Header from '~/components/Header';
import Footer from './components/Footer';
import style from '~/styles/index.css';


export const meta = () => {
    return (
        [
            {charset: 'utf-8'},
            {title: 'La Colmena'},
            {viewport: 'width=device-width, initial-scale=1'} 
        ]
    );       
}




export const links = () => {
    return ([
        {
            rel: 'stylesheet',
            href: 'https://necolas.github.io/normalize.css/8.0.1/normalize.css'
        },
        {
            rel: 'preconnect',
            href: 'https://fonts.googleapis.com'
        },
        {
            rel: 'preconnect',
            href: 'https://fonts.gstatic.com',
            crossOrigin: 'true'
        },
        {
            rel: 'stylesheet',
            href: 'https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;500;600;700;800&family=Outfit:wght@400;700;900&family=Roboto:wght@100;300;400;700;900&display=swap'
        },
        {
            rel: 'stylesheet',
            href: style
        }
    ])
}



const App = () => {
    
    
    const carritoLS = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('carrito')) ?? [] : null
    const [ carrito, setCarrito ] = useState(carritoLS)
     
    useEffect(()=>{
      localStorage.setItem('carrito', JSON.stringify(carrito))
    }, [carrito])


    const agregarCarrito = product => {
        if(carrito.some(productState => productState.id === product.id)){
            //Iterar sobre el arreglo e identificar el elemnto duplicado
            const carritoActualizado = carrito.map(productState => {
                if(productState.id === product.id){
                    // Reescribir la cantidad
                    productState.cantidad = product.cantidad
                    productState.peso = product.peso
                }
                return productState
            })
            // Añadir al carrito
            setCarrito(carritoActualizado);
        }else {
            setCarrito([...carrito, product]);     
        }
    }

    const actualizarPeso = product => {
        const carritoActualizado = carrito.map(productState => {
            if(productState.id === product.id){
                productState.peso = product.peso;
            }
            return productState;
        })
        setCarrito(carritoActualizado);
    }

    const actualizarCantidad = product => {
        const carritoActualizado = carrito.map(productState => {
            if(productState.id === product.id){
                productState.cantidad = product.cantidad;
            }
            return productState;
        })
        setCarrito(carritoActualizado);
    }

    const eliminarProduct = id => {
        const carritoActualizado = carrito.filter(productState => productState.id !== id);
        setCarrito(carritoActualizado);
    }
    

    return (
        <Document>
            <Outlet
                context={{
                    agregarCarrito,
                    carrito,
                    actualizarCantidad,
                    actualizarPeso,
                    eliminarProduct
                }}
            />
        </Document>
    );
}

export default App;



const Document = ({children}) => {
    return (
        <html lang="es">
            <head>
                <Meta/>
                <Links/>
            </head>
            <body>
                <Header/>
                {children}
                <Footer/>
                <Scripts/>
                <LiveReload/>
            </body>
        </html>
    );
}

//** Manejo de errores */

export function ErrorBoundary() {
    const error = useRouteError();

    return (
        <Document>
            <p className='error'>{error.status} {error.statusText}</p>
            <p className='error-mensaje' to="/">Lo sentimos, en estos momentos no contamos con el producto que buscas</p>
            <Link className='error-enlace' to="/tienda">Tal vez quieras volver a la tienda</Link>
        </Document>
    )
}
