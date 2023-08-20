import { Link, useLocation } from '@remix-run/react';
import Logo from '../../public/assets/logo.svg';
import cart from '../../public/assets/cart.svg';

const Header = () => {
    
    const location = useLocation();
    
    return (
        <header className="header">
            <Link to="/" className="header__navbar-link"><img className='header__logo' src={Logo} alt="logo de la colmena" /></Link>
            <nav className='header__navbar'>
                <Link to="/" className={location.pathname === '/' ? 'active' : ''} >Inicio</Link>
                <Link to="/tienda" className={location.pathname === '/tienda' ? 'active' : ''}>Tienda</Link>
                <Link to="/contacto" className={location.pathname === '/contacto' ? 'active' : ''}>Contacto</Link>
                <Link to="/nosotros" className={location.pathname === '/nosotros' ? 'active' : ''}>Nosotros</Link>
                <Link to="/carrito"><img className='header__cart' src={cart} alt="carrito" /></Link>
            </nav>
        </header>
    );
}

export default Header;
