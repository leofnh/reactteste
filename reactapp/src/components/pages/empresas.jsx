import React, { useState, useEffect } from 'react';
import { useAuth } from './estado';
import Modal from './modal';
import InputMask from 'react-input-mask';

export default function Empresas() {
    const { usuarioId, setUsuarioId } = useAuth();
    const [aviso, setAviso] = useState('');
    const [dadosBd, setDados] = useState([]);
    const [openModal, setOpenModal] = useState(false);
    const [nomeFantasiaInput, setNomeFantasia] = useState('');
    const [cnaeInput, setCnae] = useState('');
    const [selectedCompanyId, setSelectedCompanyId] = useState(null);

    useEffect(() => {
        buscarDados();
    }, [])
    const editarEmpresa = (companyId) => {
        if (companyId == "") {
            setAviso('Houve algum erro com esta empresa!');
        } else {

            if (cnaeInput == "" || nomeFantasiaInput == "") {

                setAviso('Digite algum dos campos para atualizar!');
            } else {
                const data = {
                    'cnae': cnaeInput,
                    'nome_fantasia': nomeFantasiaInput
                }

                fetch(`https://leofnhflask.pythonanywhere.com/acoes-empresas-teste/${usuarioId}/${companyId}`, {
                method: 'PUT',
                headers: {
                'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
                })
                .then(result => result.json())
                .then(data => {

                    const status = data['status'];                  
                    setAviso(status);               
                
                })
                .catch(error => {
                    console.error(error);
                });

            }

        }
    }
    const confirmarExclusao = (cnpj, idDaEmpresa) => {

        const data = {
            cnpj: cnpj
          };
        
          fetch(`https://leofnhflask.pythonanywhere.com/acoes-empresas-teste/${usuarioId}/${idDaEmpresa}`, {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
          })
          .then(result => result.json())
          .then(data => {
            const status = data['status'];           
            setAviso(status); 
            buscarDados();       
            
          })
          .catch(error => {
            console.error(error);
          });

    };
    const buscarDados = () => {

        const data = new FormData();     
        data.append('usuario', 'autorizado');
        fetch("https://leofnhflask.pythonanywhere.com/acoes-empresas-teste/1/1", {
        method: "GET",    
              
      })
      .then(result => result.json())
      .then(data => {
        const status = data['status'];  
        const situacao = data['situacao'];
        if (situacao == 'sucesso') {     
            
            console.log('Sucesso na situação!');
            const dados = data['empresas'];            
            setDados(dados);
            setAviso(status);            
            
        } else {            
            setAviso(status);
            setDados('');            
        }        
      })
      .catch(error => {
        setAviso(error);
      });

    }
    const excluirEmpresa = (idEmpresa, idEmpresaUsuario, cnpj) => {
        const empresaId = parseInt(idEmpresaUsuario);

        if (empresaId == usuarioId) {
            confirmarExclusao(cnpj, idEmpresa);
        } else {
            setAviso('Você não tem permissão para excluir esta empresa.');
        }
    }
    return(
        <>
            <div className="corpo">
                Lista de empresas!
            </div>
            <div className="alert">{aviso}</div>
            <table className='tabela'>           
                <thead>
                    <th>CNPJ</th>                    
                    <th>CNAE</th>
                    <th>Nome Fantasia</th>
                    <th>Nome Razão</th>
                    <th>AÇÕES</th>
                </thead>
                <tbody>
                    {dadosBd.map((x) => (
                        <tr key={x.cnpj}>
                            <td>{x.cnpj}</td>
                            <td>{x.cnae}</td>
                            <td>{x.nomeFantasia}</td>
                            <td>{x.nomeRazao}</td>
                            <td>
                                <button className='btn-editar' onClick={() => {
                                setSelectedCompanyId(x.id);
                                setOpenModal(true);
                                }}>
                                    Editar                            
                                </button>
                                <button className='btn-excluir' onClick={() => excluirEmpresa(x.id, x.usuario, x.cnpj)} >Excluir</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>  

            <Modal companyId={selectedCompanyId} isOpen={openModal} setModalOpen={() => setOpenModal(!openModal)} editarEmpresa={editarEmpresa}>
                <div>
                    <label htmlFor='cnae'>CNAE: </label>
                    <InputMask id="cnae" 
                    value={cnaeInput}
                    onChange={(event) => setCnae(event.target.value)}
                    mask="9999-9/99"
                    />
                </div>
                <br></br>
                <div>
                    <label htmlFor='nomeFantasia'>Nome Fantasia: </label>
                    <input id="nomeFantasia"
                    value={nomeFantasiaInput}
                    onChange={(event) => setNomeFantasia(event.target.value)}
                    />
                </div>
                <br></br>
                
            </Modal>

        </>
    )
}