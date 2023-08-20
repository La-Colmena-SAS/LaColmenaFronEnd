import { formatearCantidad } from '~/helpers/index';
import trash from '../../public/assets/trash.svg';

const CartItem = ({ product, actualizarCantidad, actualizarPeso, eliminarProduct }) => {
    

    
    return (
        <div className="cartItem">
            <div className="cartItem__image-container">
                <img
                    className="cartItem__image"
                    src={product.image}
                    alt={`${product.name}`} 
                    
                />
            </div>
            <div className="cartItem__info-container">
                <div className="cartItem__subtotal-container">
                    <h3 className="cartItem__name">{product.name}</h3>
                    <button 
                        className="cartItem__trash-icon"
                        onClick={() => eliminarProduct(product.id)}
                    >
                        <img src={trash} alt="" width={'20px'}/>
                    </button>
                </div>
                <span>$ {formatearCantidad(product.price)} x Kg</span>
                <select
                className='productSelected__selectCantidad'
                id='pesoCartItem'
                name='pesoCartItem'
                value={product.peso}
                onChange={e => actualizarPeso({
                    peso: +e.target.value,
                    id: product.id
                })}
            >
                <option className='productSelected__option' value="0">Peso</option>
                <option className='productSelected__option' value="500">500 g</option>
                <option className='productSelected__option' value="600">600 g</option>
                <option className='productSelected__option' value="700">700 g</option>
                <option className='productSelected__option' value="800">800 g</option>
                <option className='productSelected__option' value="900">900 g</option>
                <option className='productSelected__option' value="1000">1000 g</option>
            </select>
            <label
                className='productSelected__multiplier-label'
                htmlFor="cantidadCartItem"
            >Cantidad
                <input
                    className='productSelected__multiplier-input'
                    name='cantidadCartItem'
                    id='cantidadCartItem'
                    type="number"  
                    min={0}  // Valor mínimo permitido
                    max={10}  // Valor máximo permitido                  
                    onKeyDown={(e) => {
                        if (e.key === '-' || e.key === '+' || e.key === 'e') {
                            e.preventDefault(); // Evitar que se ingresen caracteres negativos o positivos
                        }
                    }}
                    value={product.cantidad}
                    onChange={e => actualizarCantidad({
                        cantidad: e.target.value,
                        id: product.id
                    })}
                /></label>
                <p className="cartItem__subtotal">Subtotal: <span>$ {formatearCantidad(product.price*(product.peso/1000)*product.cantidad)}</span></p>
            </div>
        </div>
    );
}

export default CartItem;
