import React from 'react';
import {Route, BrowserRouter} from 'react-router-dom';

import cadastroUsuario from './Pages/cadastroapp/cadastro';

const Routes = () => {
    return (
        
        <BrowserRouter>
            <Route component={cadastroUsuario} path="/cadastro" /> 
        </BrowserRouter>
    )
}

export default Routes;