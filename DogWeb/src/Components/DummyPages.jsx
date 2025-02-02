import { Link, NavLink, Outlet, useParams } from "react-router-dom";


function Header() {
    return <header>
        <Link className="NL" to='page/'>Home</Link>
    </header>;
}

export function Content(props) {
    const { txt } = props;
    //This page that give you many dogs pictures, and you can save those pictures that you like
    const params = useParams();
    return <h2 style={{ padding: 15 }}>{txt}</h2>;
}

export function Page() {
    return <>
        <Header />
        <Content />
    </>;
}