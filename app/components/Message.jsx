export const Message = ({children, tipo}) => {
    return (
        <div className= {`${tipo}`}>
            {children}
        </div>
    );
};
