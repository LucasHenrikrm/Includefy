// Cria o banco de dados de Denúncia
let denunciaDados = [];

// Inicializa e carrega as denúncias do localStorage
function carregarDenuncias() {
    // Verifica se já existe dados no localStorage
    if (!localStorage.getItem("denuncias")) {
        denunciaDados = [];
        // Transforma os dados em JSON e salva
        let json = JSON.stringify(denunciaDados);
        localStorage.setItem("denuncias", json);
    } else {
        // Carrega os dados existentes do localStorage
        let json = localStorage.getItem("denuncias");
        denunciaDados = JSON.parse(json);
    }

    // Exibe as denúncias na página
    exibirDenuncias();
}

// Exibe as denúncias cadastradas
function exibirDenuncias() {
    const divDenuncia = document.querySelector('.container-denuncia');
    
    if (!divDenuncia) return;

    // Verifica se há denúncias cadastradas
    if (denunciaDados.length === 0) {
        divDenuncia.innerHTML = '<div style="text-align: center; padding: 20px; margin-top: 30px;"><h1>Ainda não há denúncias registradas.</h1></div>';
    } else {
        let html = '<div id="denuncias" style="width: 95%; margin-top: 30px; margin-left: 20px;"><h1>Denúncias Cadastradas</h1><hr style="width: 95%; margin-left:0px">';
        
        // Percorre todas as denúncias e cria o HTML (mais recentes primeiro)
        denunciaDados.slice().reverse().forEach((denuncia) => {
            html += `
                <div class="card-denuncia" style="width: 95%; border: 2px solid #00000098; padding: 20px; margin: 15px 0; border-radius: 8px; background-color: white; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
                    <div style="margin-bottom: 10px;">
                        <strong style="color: #fe3f6c;">Denúncia #${denuncia.id}</strong>
                        ${denuncia.data ? `<span style="float: right; color: #666; font-size: 0.9em;">${denuncia.data}</span>` : ''}
                    </div>
                    <p><strong>Usuário:</strong> ${denuncia.nUser || 'Anônimo'}</p>
                    <p style="color: #740002;">&#11044; Em andamento</p>
                    <p><strong>Localização:</strong> ${denuncia.localizacao}</p>
                    ${denuncia.identificacao ? `<p><strong>Como se identifica:</strong> ${denuncia.identificacao}</p>` : ''}
                    <p><strong>Tipo de Denúncia:</strong> ${denuncia.tpDenuncia}</p>
                    <p><strong>Descrição:</strong></p>
                    <p style="background-color: white; padding: 10px; border-radius: 5px; border: 2px solid #0000003d; white-space: pre-wrap;">${denuncia.descricao}</p>
                    <button onclick="excluirDenuncia(${denuncia.id})" class="btn btn-danger btn-sm" style="margin-top: 10px;">Excluir Denúncia</button>
                </div>
            `;
        });
        
        html += '</div>';
        divDenuncia.innerHTML = html;
    }
}

// Limpa os campos do formulário
function limparCampos() {
    document.querySelector('#check-anonimo').checked = false;
    document.querySelector('#nome-usuario').value = '';
    document.querySelector('#localizacao').value = '';
    document.querySelector('#identificacao').value = '';
    document.querySelector('#tipo-denuncia').value = '';
    document.querySelector('#descricao').value = '';
}

// Valida os campos obrigatórios
function validarCampos(nUsuario, local, tipo, desc, anonimo) {
    if (!anonimo && !nUsuario) {
        alert('Por favor, preencha o nome do usuário ou marque como anônimo.');
        return false;
    }
    
    if (!local) {
        alert('Por favor, preencha a localização.');
        return false;
    }
    
    if (!tipo) {
        alert('Por favor, selecione o tipo de denúncia.');
        return false;
    }
    
    if (!desc) {
        alert('Por favor, preencha a descrição.');
        return false;
    }
    
    return true;
}

// Cria um registro de denúncia
function enviarDenuncia() {
    // Impedir o recarregamento da página
    if (event && event.preventDefault) {
        event.preventDefault();
    }

    // Coleta os dados do formulário
    const anonimo = document.querySelector('#check-anonimo').checked;
    const nUsuario = anonimo ? 'Anônimo' : document.querySelector('#nome-usuario').value.trim();
    const local = document.querySelector('#localizacao').value.trim();
    const ident = document.querySelector('#identificacao').value.trim();
    const tipo = document.querySelector('#tipo-denuncia').value;
    const desc = document.querySelector('#descricao').value.trim();

    // Valida os campos
    if (!validarCampos(nUsuario, local, tipo, desc, anonimo)) {
        return false;
    }

    // Cria o objeto de denúncia
    const cadastroDenuncia = {
        id: Date.now(),
        nUser: nUsuario,
        localizacao: local,
        identificacao: ident,
        tpDenuncia: tipo,
        descricao: desc,
        data: new Date().toLocaleString('pt-BR')
    };

    // Adiciona ao array
    denunciaDados.push(cadastroDenuncia);

    // Salva no localStorage
    const json = JSON.stringify(denunciaDados);
    localStorage.setItem("denuncias", json);

    console.log("Denúncia cadastrada com sucesso!", cadastroDenuncia);

    // Exibe alerta de sucesso
    alertaDenuncia();

    return false;
}

// Alerta de sucesso ao cadastrar denúncia
function alertaDenuncia() {
    // Verifica se SweetAlert2 está disponível
    if (typeof Swal !== 'undefined') {
        Swal.fire({
            title: "Sucesso!",
            text: "Denúncia cadastrada com sucesso!",
            icon: "success",
            confirmButtonColor: "#fe3f6c",
        }).then((result) => {
            // Limpa os campos
            limparCampos();
            // Atualiza a lista de denúncias
            exibirDenuncias();
        });
    } else {
        // Fallback caso SweetAlert2 não esteja disponível
        alert("Denúncia cadastrada com sucesso!");
        limparCampos();
        exibirDenuncias();
    }
}

// Exclui uma denúncia
function excluirDenuncia(id) {
    if (confirm('Tem certeza que deseja excluir esta denúncia?')) {
        // Filtra o array removendo a denúncia com o ID especificado
        denunciaDados = denunciaDados.filter(denuncia => denuncia.id !== id);
        
        // Atualiza o localStorage
        const json = JSON.stringify(denunciaDados);
        localStorage.setItem("denuncias", json);
        
        // Atualiza a exibição
        exibirDenuncias();
        
        console.log(`Denúncia ${id} excluída com sucesso!`);
    }
}

// Habilita/desabilita o campo de nome quando marcar anônimo
document.addEventListener('DOMContentLoaded', () => {
    carregarDenuncias();
    
    const checkAnonimo = document.querySelector('#check-anonimo');
    const nomeUsuario = document.querySelector('#nome-usuario');
    
    if (checkAnonimo && nomeUsuario) {
        checkAnonimo.addEventListener('change', function() {
            if (this.checked) {
                nomeUsuario.value = '';
                nomeUsuario.disabled = true;
                nomeUsuario.placeholder = 'Denúncia anônima';
            } else {
                nomeUsuario.disabled = false;
                nomeUsuario.placeholder = '@Novousuario123';
            }
        });
    }
});