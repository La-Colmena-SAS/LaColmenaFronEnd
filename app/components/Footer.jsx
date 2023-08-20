import { Link } from '@remix-run/react';

const Footer = () => {
    return (
        <footer className='footer'>
            <nav className="footer__nav">
                <Link to="/">Inicio</Link>
                <Link to="/tienda">Tienda</Link>
                <Link to="/contacto">Contacto</Link>
                <Link to="/nosotros">Nosotros</Link>
            </nav>
            <div className='footer__reserved'>
                <p>Terms of Service Privacy Policy</p>
                <p>© {new Date().getFullYear()} La Colmena. All rights reserved.</p>
            </div>
        </footer>
    );
}

export default Footer;
