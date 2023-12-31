import { Link } from 'react-router-dom';
import * as userService from '../../utilities/users-service';  
export default function NavBar( {user, setUser} ) {
    //log out handler
    function handleLogOut() {
        //delegate to the users-service
        userService.logOut();
        //update state will also cause a re-render
        setUser(null);
    }
    return (
        <nav>
            <Link to="/orders">Order History</Link>
            &nbsp; | &nbsp;
            <Link to="/orders/new">New Order</Link>
            {/* prevents http requests ^ */}
            &nbsp; | &nbsp;
            <span>Welcome, {user.name}</span>
            &nbsp; | &nbsp;
            <Link to="" onClick={handleLogOut}>Log Out</Link>
        </nav>
    );
}