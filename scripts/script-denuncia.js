//Cria o banco de dados de Denuncia
let denunciaDados = [];

//Inicializa o banco de dados se não existir
function carregarDados(){
    //Verifica se  já existe dados no localStorage
    if (!localStorage.getItem("dados")){
        let ds = [
            //Dados dos administradores do sistema
            {id:1, celLogin:"011962827520", pass:"123", nUser:"Leo", dataNasc:"00/00/0000", tipoCta:"admin"},
        
        ];
        //Transforma os dados acima em JSON
        let json = JSON.stringify(ds);
        
        //Carrega os dados do banco de dados
        localStorage.setItem("dados",json);
    }
}

//Chama a inicialização quando a página carrega
document.addEventListener('DOMContentLoaded', carregarDados);

//Limpa os campos do formulário
function limparCampos(){
    document.querySelector('#check-anonimo').value = '';
    document.querySelector('#nome-usuario').value = '';
    document.querySelector('#localizacao').value = '';
    document.querySelector('#identificacao').value = '';
    document.querySelector('#tipo-denuncia').value = '';
    document.querySelector('#descricao').value = '';
}

//Cria um registro de denúncia
function enviarDenuncia(){
    // Impedir o recarregamento da página se for um evento de formulário
    if (event && event.preventDefault) {
        event.preventDefault();
    }

    //Coleta os dados do form de denúncia
    let anonimo = document.querySelector('#check-anonimo');

    if (!anonimo.checked){
        let nUsuario = document.querySelector('#nome-usuario').value.trim();
    }

    let local = document.querySelector('#localizacao').value.trim();
    let ident = document.querySelector('#identificacao').value.trim();
    //trim() apaga os espaços em branco deixados no campo do formulário
    let tipo = document.querySelector('#tipo-denuncia').value;
    let desc = document.querySelector('#descricao').value;

    let cadastro = {id:Date.now(), nUser:nUsuario, localizacao:local, identificacao:ident, tpDenuncia:tipo, descricao:desc};

    denunciaDados.push(cadastro);

    localStorage.setItem("dados", json);
    alert("Denúncia registrada com sucesso!");
    console.log("Sucesso!");

}

//(C)reate da sigla CRUD
//Cria um registro do usuário
function cadastrar(event) {
    // Impedir o recarregamento da página se for um evento de formulário
    if (event && event.preventDefault) {
        event.preventDefault();
    }
    //Inicializar dados se necessárui
    carregarDados();

    //Puxa o banco de dados
    let ds = JSON.parse(localStorage.getItem("dados"));

    //Coleta os dados do form de cadastro
    let nUsuario = document.querySelector('#nome-usuario').value.trim();
    let celular = document.querySelector('#celular').value.trim();
    //trim() apaga os espaços em branco deixados no campo do formulário
    let dtNasc = document.querySelector('#data-nasc').value;
    let sen = document.querySelector('#senha').value;
    let conc = document.querySelector('#check-concordo');

    if(conc.checked) {
        console.log("O cliente marcou o checkbox");
        const exist = conferirExist(nUsuario, celular, ds);

        if(exist === true){
            let cadastro = {id:Date.now(), nUser:nUsuario, celLogin:celular, dataNasc:dtNasc, pass:sen, tipoCta:"user"};

            ds.push(cadastro);

            let json = JSON.stringify(ds);

            localStorage.setItem("dados", json);

            alert("Cadastro efetuado com sucesso!");
            console.log("Sucesso!");

            //Envia para a página de confirmação de telefone
            //Envia código para o telefone
            //Após o usuário digitar o código correto, redireciona para a página de login
            //setTimeout(() => {
                //window.location.href = "./login.html";
                //}, 1000);

        }
        else {
            alert(exist);
            console.log(exist);
            console.log(ds);
    }

    } 
    else {
        alert("É necessário concordar com os termos de serviço, as políticas de privacidade e as regras de conduta para prosseguir com o cadastro");
        console.log("O cliente não marcou o checkbox");
        limparCampos();
    }

}

function validarLogin(usuario, senha, ds) {
    // Impedir o recarregamento da página se for um evento de formulário
    if (event && event.preventDefault) {
        event.preventDefault();
    }
    for(let i=0;i<ds.length;i++){
        if((usuario == ds[i].celLogin || usuario == ds[i].nUser) && senha == ds[i].pass) {
            console.log("Validado");
            //Salva os dados do usuário logado
            sessionStorage.setItem("usuarioLogado", JSON.stringify(ds[i]));
            return true;
        }
    }
    
    return "Usuário ou senha incorreto.";
}


function logon(event) {
    // Impedir o recarregamento da página se for um evento de formulário
    if (event && event.preventDefault) {
        event.preventDefault();
    }

    //Inicializa dados se necessário
    carregarDados();

    //Puxa o banco de dados
    let ds = JSON.parse(localStorage.getItem("dados"));

    if(!ds){
        alert("Erro ao carregar dados. Tente novamente.");
        return false;
    }
    
    //Coleta os dados do form de login
    let usuario = document.querySelector('#usuario').value.trim();
    let senha = document.querySelector('#senha').value;
    //valida os dados com o BD
    const resultado = validarLogin(usuario, senha, ds);

    if(resultado === true){
        alert("Login efetuado com sucesso!");
        window.location.href = "../../index.html";
        return true;
    }
    else {
        alert(resultado);
        console.log(resultado, usuario, senha);
        //limpa os campos se o login falhar
        limparCampos();
        return false;
    }
}

//Função para verificar se o usuário está logado
function verificarLogin(){
    const usuarioLogado = sessionStorage.getItem("usuarioLogado");
    if(!usuarioLogado){
        window.location.href = "./public/Login/Logon.html";
        return null;
    }
    return JSON.parse(usuarioLogado);
}

//Função para fazer logout
function logout(){
    sessionStorage.removeItem("usuarioLogado");
    window.location.href = "./public/Login/Logon.html";
}