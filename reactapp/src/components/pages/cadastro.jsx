import React, { useState } from 'react';

export default function cadastroUsuario() {

    const [usuario, setUsuario] = useState('');
    const [senha, setSenha] = useState('');
    const [aviso, setAviso] = useState('');


    const enviarDados = () => {
        if (usuario === '' || senha === '') {
          setAviso('Digite todos os campos para enviar o formulário!');
        } else {
          setAviso('');
    
          const data = new FormData();
          data.append('usuario', usuario);
          data.append('senha', senha);         
    
          fetch("https://leofnhflask.pythonanywhere.com/cadastro-usuario", {
            method: "POST",
            body: data,
            
          })
          .then(result => result.json())
          .then(data => {
            const status = data['status'];  
            const situacao = data['situacao'];
            if (situacao == 'sucesso') {
    
                const id_usuario = data['id_usuario'];       
                setAviso(status);
                setUsuarioId(id_usuario);
    
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
    
    return (
        <>      
      <div className="corpo">Teste Cadastro</div>
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
       
        
        <button onClick={enviarDados}>Cadastrar</button>
      </div>
    </>
    )
}