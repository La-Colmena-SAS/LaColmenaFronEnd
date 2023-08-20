import { Link } from '@remix-run/react';
import '../styles/index.css';

const Category = ({ category }) => {

    const { name, image, url } = category;
    
    return (
        <Link to={`/${url}`} className="category__container">
            <figure className="category__image-container">
                <img className='category__image' src={image.data.attributes.formats.medium.url} alt={`Imagen ${name}`} />
                <div className="category__subtitle-container">
                    <h3 className="category__subtitle">{name}</h3>
                </div>
            </figure>
        </Link>
    );
}

export default Category;
