import style from '~/styles/nosotros.css';

export const meta = () => {
    return (
        [
            {title: 'La Colmena - Sobre Nosotros'},
            {description: 'Venta de productos carnicos, huevos, abono, productos agricolas'}   
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
            // rel: 'preload',
            // href: imagen,
            // as: image
        }
    ])
}


const Nosotros = () => {
    return (
        <main className="nosotros container">
            desde Nosotros
        </main>
    );
}

export default Nosotros;
