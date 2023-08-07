import React, { useState } from 'react';
import { useAuth } from './estado';
import Empresas from './empresas';


export default function Logar() {
  const [usuario, setUsuario] = useState('');
  const [senha, setSenha] = useState('');
  const [aviso, setAviso] = useState('');
  const [pageEmpresa, setEmpresa] = useState(false);
  const { usuarioId, setUsuarioId } = useAuth(); 
  const enviarDados = () => {
    if (usuario === '' || senha === '') {
      setAviso('Digite o usuário e a senha!');
    } else {
      setAviso('');
      const data = new FormData();      
      data.append('usuario', usuario);
      data.append('senha', senha);
      fetch("https://leofnhflask.pythonanywhere.com/logar", {
        method: "POST",
        body: data,        
      })
      .then(result => result.json())
      .then(data => {
        const status = data['status'];  
        const situacao = data['situacao'];
        if (situacao == 'sucesso') {

            const id_usuario = data['id_usuario'];
            const novaUrl = '/empresas';       
            setAviso(status);
            setUsuarioId(id_usuario);
            setEmpresa(true);
            history.pushState(null,null,novaUrl);

        } else {
            
            setAviso(status);
            setUsuarioId(null);

        }
        console.log(status);
      })
      .catch(error => {
        console.error(error);
      });
    }
  };

  if (pageEmpresa) {

    return <Empresas />

  } else {


  return (
    <>      
      <div className="corpo">Teste API</div>
      <div className="alert">{aviso}</div>
      <div className="corpo">
        <label htmlFor="usuario">Usuário:</label>
        <input
          id="usuario"
          type="text"
          value={usuario}
          onChange={(event) => setUsuario(event.target.value)}
        />

        <label htmlFor="senha">Senha:</label>
        <input
          id="senha"
          type="password"
          value={senha}
          onChange={(event) => setSenha(event.target.value)}
        />
        
        <button onClick={enviarDados}>Logar</button>
      </div>
    </>
  );
  };
}