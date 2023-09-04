import { useOutletContext } from '@remix-run/react';
import { useRef, useState } from 'react';
import style from '~/styles/formulario.css';

export const links = () => {
    return ([
        {
            rel: 'stylesheet',
            href: style
        }
    ])
}


const CarritoFormulario = () => {

    const [formData, setFormData] = useState({
        nombre: '',
        apellido: '',
        correo: '',
        telefono: '',
        pais: '',
        direccion: '',
        ciudad: '',
        region: '',
    });
    const formRef = useRef(null);
    const infoPedido = useOutletContext();
    const { setCarrito, carrito, total } = infoPedido;

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    }

    const obtenerDetallesDelPedido = (carrito) => {
        const detalles = carrito.map((producto) => {
            return (`\n\nProducto: ${producto.name}\nCantidad: ${(producto.cantidad * producto.peso) / 1000}Kg\nPrecio: ${producto.price}`);
        });

        return detalles
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        //* Se construye el mensaje de whatsapp
        const mensajeWhatsApp = `*INFORMACION DE CONTACTO*\n\nNombre: ${formData.nombre}\nApellido: ${formData.apellido}\nCorreo: ${formData.correo}\nTeléfono: ${formData.telefono}\nPaís: ${formData.pais}\nDirección: ${formData.direccion}\nCiudad: ${formData.ciudad}\nRegión: ${formData.region}\n\n*DETALLES DEL PEDIDO:* ${obtenerDetallesDelPedido(carrito)}\n\n*Total a pagar*: ${total}`;

        // Reemplaza 'tu_numero_de_whatsapp' con tu número de WhatsApp (incluyendo el código de país)
        const numeroWhatsApp = '+573013226756';
        const mensajeEncoded = encodeURIComponent(mensajeWhatsApp);

        // Construye el enlace para enviar el mensaje a través de WhatsApp
        const whatsappURL = `https://wa.me/${numeroWhatsApp}?text=${mensajeEncoded}`;

        // Abre WhatsApp en una nueva ventana o pestaña del navegador
        window.open(whatsappURL);

        // Restablece el formulario después de enviar
        formRef.current.reset();
        setCarrito([]);
    };


    return (

        <>
            {carrito?.length === 0 ? '' :

                <div className='form-container'>
                    <h3>Facturacion y envío</h3>
                    <form ref={formRef} onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="nombre">Nombre</label>
                            <input type="text" id="nombre" name="nombre" onChange={handleChange} required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="apellido">Apellido</label>
                            <input type="text" id="apellido" name="apellido" onChange={handleChange} required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="correo">Correo Electrónico</label>
                            <input type="email" id="correo" name="correo" onChange={handleChange} required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="telefono">Teléfono</label>
                            <input type="tel" id="telefono" name="telefono" onChange={handleChange} required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="pais">País</label>
                            <input type="text" id="pais" name="pais" onChange={handleChange} required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="direccion">Dirección</label>
                            <input type="text" id="direccion" name="direccion" onChange={handleChange} required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="ciudad">Ciudad</label>
                            <input type="text" id="ciudad" name="ciudad" onChange={handleChange} required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="region">Región</label>
                            <input type="text" id="region" name="region" onChange={handleChange} required />
                        </div>
                        <div className="form-group">
                            <input type="submit" value="ENVIAR PEDIDO POR WHATSAPP" />
                        </div>
                    </form>
                </div>
            }
        </>
    );
}

export default CarritoFormulario;