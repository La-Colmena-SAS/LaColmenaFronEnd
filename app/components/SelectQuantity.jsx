

const SelectQuantity = ({ setPeso, setCantidad }) => {
    return (
        <>
            <select
                className='productSelected__selectCantidad'
                name="peso"
                id="peso"
                onChange={e => setPeso(parseInt(e.target.value))}
                min='500'
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
                htmlFor="cantidad"
            >Cantidad
                <input
                    className='productSelected__multiplier-input'
                    name='cantidad'
                    id='cantidad'
                    type="number"
                    onKeyDown={(e) => {
                        if (e.key === '-' || e.key === '+' || e.key === 'e') {
                            e.preventDefault(); // Evitar que se ingresen caracteres negativos o positivos
                        }
                    }}
                    onChange={e => {
                        setCantidad(parseInt(e.target.value)
                        )
                    }
                    }

                /></label>
        </>
    );
}

export default SelectQuantity;
