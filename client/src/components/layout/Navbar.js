import React, { useContext, useEffect } from 'react';
import { Nav, NavItem, NavLink } from 'reactstrap'
import { Link, useNavigate  } from 'react-router-dom';
import SupplyChainContext from '../../context/SupplyChainContext';



const Navbar = () => {

    const supplyChainContext = useContext(SupplyChainContext);

    const {setRole, role} = supplyChainContext;
      

    useEffect(()=>{
        setRole();
        
        
    },[])

    return (
        <div>
            <Nav style={{ backgroundColor: '#34495e', color: 'white' }}>

                   <NavItem>
                    <NavLink style={{color:'#00cec9'}}
                        disabled>
                        Food Supply Chain
                    </NavLink>
                </NavItem> 

                <NavItem>
                    <NavLink
                        active
                    >
                        <Link to="/" style={{ textDecoration: 'none', color: 'white' }}>Role</Link>
                    </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink>
                        <Link to="/allProducts" style={{ textDecoration: 'none', color: 'white' }}>All Products</Link>
                    </NavLink>
                </NavItem>


            
             
            </Nav>
        </div>
    )
}

export default Navbar;