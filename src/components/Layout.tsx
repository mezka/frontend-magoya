import Navbar from 'react-bootstrap/Navbar';
import './Layout.css';

export default (props) => {
    return(
        <div className="container">
            <Navbar bg="dark">
                <Navbar.Brand href="/">
                    <img src="/logo.png" width="30" height="30" className="d-inline-block align-top" alt="Magoya Logo"/>
                </Navbar.Brand>
            </Navbar>
            <div className="content">
                {props.children}
            </div>
            <div className="footer">
                Thank you for visiting!
            </div>
        </div>
    );
}