
function initLoginApp () {
    console.log('Entrou initLoginApp');

    // PARTE 1 - INICIALIZA USUARIOCORRENTE A PARTIR DE DADOS NO LOCAL STORAGE, CASO EXISTA
    usuarioCorrenteJSON = sessionStorage.getItem('usuarioCorrente');

    if (usuarioCorrenteJSON) {
        usuarioCorrente = JSON.parse (usuarioCorrenteJSON);
    }
    
    // PARTE 2 - INICIALIZA BANCO DE DADOS DE USUÁRIOS
    // Obtem a string JSON com os dados de usuários a partir do localStorage
    var usuariosJSON = localStorage.getItem('db_usuarios');

    // Verifica se existem dados já armazenados no localStorage
    if (usuariosJSON) {  // Se há dados no localStorage
          
        // Converte a string JSON em objeto colocando no banco de dados baseado em JSON
          db_usuarios = JSON.parse(usuariosJSON); 
    }
 
};


function cadastraUsuario (event) {
    // Cancela a submissão do formulário para tratar sem fazer refresh da tela
    event.preventDefault ();

    // Obtem os dados do formulário
    let nome   = document.getElementById('campoNome').value;
    let email  = document.getElementById('campoEmail').value;
    let senha  = document.getElementById('campoSenha').value;
    let telefone = document.getElementById('campoTelefone').value;
    let sexo = document.getElementById('inlineFormSelectPref').value;

    let cadastrado = verificaCadastro(email);

    console.log('Função Cadastra Usuário')
    console.log(cadastrado);

    if(cadastrado){
         alert("E-mail já cadastrado");
    }

    else{
         // Adiciona o usuário no banco de dados
        addUser (nome, email, senha, telefone, sexo);
        alert ('Usuário salvo com sucesso.');
    } 

    // Oculta a div modal do login
    //document.getElementById ('loginModal').style.display = 'none';
    $('#loginModal').modal('hide');

}

function verificaCadastro (email) {
    console.log('Verificando Cadastro');
    let cadastrado = false;
    var usuariosJSON = localStorage.getItem('db_usuarios');

    for (var i = 0; i < db_usuarios.usuarios.length && cadastrado == false; i++) {
        var usuario = db_usuarios.usuarios[i];
        console.log(email);
        console.log(usuario.Email);
        console.log(cadastrado);

        if (email == usuario.Email){
            cadastrado = true;
        }
    }
       
    return cadastrado;
   
}

// Associar salvamento ao botao
document.getElementById ('btn-cadastrar').addEventListener ('click', cadastraUsuario);        


/* Estava no arquivo javascript*/

// Objeto para o banco de dados de usuários baseado em JSON
var db_usuarios = {};

function addUser (nome, email, senha, telefone, sexo) { 
    
    // Cria um objeto de usuario para o novo usuario 
    let usuario = { "nome": nome, "Email": email, "Senha": senha, "telefone": telefone, "Sexo": sexo};
    
    // Inclui o novo usuario no banco de dados baseado em JSON
    db_usuarios.usuarios.push (usuario);

    // Salva o novo banco de dados com o novo usuário no localStorage
    localStorage.setItem('db_usuarios', JSON.stringify (db_usuarios));
}

// Inicializa as estruturas utilizadas pelo LoginApp
initLoginApp ();
