import React, { useState }  from 'react';
import styled from 'styled-components';
import Gx from '@tgrx/gx';
import Container from '../Container';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { Links } from '../links';
import { useAuth } from 'use-auth0-hooks';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'
const LOGO_IMG = '/logo.png';

const NavWrapper = styled.div `
    width: 100%;
    margin-top: 20px;

`;

const NavContainer = styled(Container)`
    margin-top: 20px;

`;

const Logo = styled.img `
    object-fit: cover;
    padding: 10px;
    @media (max-width: ${props => props.theme.screenSize.tablet}) {
        width: 100px;
     }
    
`;
const BurgerContainer = styled.div`
    display: flex;
   justify-content: flex-end;

`;

const StyledBurger = styled.button`
    top: 5%;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    width: 2rem;
    height: 2rem;
    background: transparent;
    border: none;
    cursor: pointer;
    padding: 0;
    z-index: 10;
    
    &:focus {
        outline: none;
    }
    
    div {
        width: 2rem;
        height: 0.25rem;
        background: ${props => props.theme.colors.persOrange};
        border-radius: 10px;
        transition: all 0.3s linear;
        position: relative;
        transform-origin: 1px;
    }
`;
const NavOpen = styled.div`
    height: 100vh;
    background-color: ${props => props.theme.colors.persBlue};
    color: white;
    font-size: 20px;
    text-align: center;
    

`;


const BurgerMenu = ({className} ) => {
    const [nav, setNav] = useState(false)
    const { isAuthenticated, isLoading, login, logout } = useAuth();


    return(
        <NavWrapper className={className}>
            <NavContainer >
                <Gx col={4} breakpoint={300} >
                    <Link href="/">
                        <a onClick={() => setNav(false)}>
                        <Logo src={LOGO_IMG} />
                        </a>
                    </Link>
                </Gx>
                <Gx col={8} breakpoint={300} >
                    <BurgerContainer>
                        <StyledBurger onClick={() => setNav(!nav)}>
                            <div/>
                            <div/>
                            <div/>
                        </StyledBurger>
                    </BurgerContainer>
                </Gx>
                {
                    nav ?
                    <Gx col={12} >
                        <NavOpen>
                        {!isLoading && (
            isAuthenticated ? (
                <>   
                    <Gx col={2}>
                        <h3 onClick={() => logout({ returnTo: process.env.AUTHO_RETURN_URL })}>Log out</h3>
                    </Gx>
                    <Gx col={1}>
                        <Link href='/profile'>
                            <a>
                                <h3>
                                    <FontAwesomeIcon icon={faUser} />
                                </h3>
                            </a>

                        </Link>
                    </Gx>
              </>
            ) : (
              <Gx col={2}>
                <h3 onClick={() => login({ appState: { returnTo: process.env.AUTHO_REDIRECT_URI + '/profile' } })}>
                  Log in
                </h3>
              </Gx>
            )
          )}
                            {Links.map((item, i) => {
                                return (
                                    <Link key={i} href={item.link}>
                                        <a onClick={() => setNav(!nav)}>
                                            <h3 >{item.name}</h3>
                                        </a>
                                    </Link>
                                )
                            })}    
                        </NavOpen>
                    </Gx>
                    :
                    null
                }
                
            </NavContainer>
        </NavWrapper>
        
    );
};
BurgerMenu.propTypes = {
    className: PropTypes.string
 };

export default BurgerMenu;