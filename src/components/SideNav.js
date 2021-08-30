import { Link} from 'react-router-dom';

const SideNav =() => {

    return(

    <div className="sidebar">

        <ul className="nav-links">
            <Link to="/">
            <li>Home</li>
            </Link>
            <Link to="/saved">
            <li>Saved</li>
            </Link>
        </ul>
    </div>


    )
}

export default SideNav;