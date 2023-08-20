import style from '~/styles/index.css';


export const links = () => {
    return ([
        {
            rel: 'stylesheet',
            href: style
        }
    ])
}

const Index = () => {
    return (
        <main className="index container">
            <div className="index__background-image">
                <h1>La frescura del campo al alcance de tu paladar</h1>
            </div>
        </main>
    );
}

export default Index;
