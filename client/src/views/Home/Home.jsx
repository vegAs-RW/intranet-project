import React from 'react';
// Import hook
import { useSelector } from 'react-redux';
// Import des composants
import SignInForm from '../../components/SignInForm/SignInForm';
import Welcome from '../../components/Welcome/Welcome'

const Home = () => {
    // Import du store pour verifier si il y a le token de connexion
    const isLogged = useSelector(state => state.user.token)

    return (
        <>
            {isLogged ? (
                <Welcome />
            ) : (
                <SignInForm />
            )}
        </>
    );
};

export default Home;