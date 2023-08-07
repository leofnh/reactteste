import Navbar from "./components/navbar";
import {Route, Routes} from 'react-router-dom';
import cadastroUsuario from './components/pages/cadastro';
import Logar from './components/pages/logar'
import Empresas from './components/pages/empresas'
import { AuthProvider } from './components/pages/estado';
import cadEmpresa from "./components/pages/cadastroEmpresa";


export default function App() {
  
  return (
    <>
    <AuthProvider>
      <Navbar/>

      <Routes>
        <Route path='/cadastro' Component={cadastroUsuario} />
        <Route path='/logar' Component={Logar} />
        <Route path='/empresas' Component={Empresas} />
        <Route path='/cadastrar-empresa' Component={cadEmpresa} />
      </Routes>
      
    </AuthProvider>
    
    </>
  )
   
}