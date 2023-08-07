import { Link } from 'react-router-dom';
import { useAuth } from './pages/estado';

export default function Navbar() {
    const { usuarioId, setUsuarioId } = useAuth();
    return <nav className="nav"> 
        <a className="logo">Teste Prático {usuarioId !== null && '(Logado)'} </a>       
        <ul>
            {usuarioId === null && <ul>
            <li><Link className="active" to="/cadastro">Cadastro</Link></li>
            <li><Link to="logar">Logar</Link></li>
            </ul>
            }
            {usuarioId !== null && <ul>
                <li>
                    <Link to="/empresas" >Empresas</Link>
                </li>
                <li>
                    <Link to="/cadastrar-empresa" >Cadastrar Empresas</Link>
                </li>
            </ul>}
        </ul>
    </nav>
}