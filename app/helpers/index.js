export const formatearCantidad = (cantidad) => {
    return (
        cantidad.toLocaleString('es-LA', {
        minimumFractionDigits: 0
        })
    );
};