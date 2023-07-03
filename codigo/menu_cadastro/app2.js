// Disciplina: Trabalho Interdisciplinar - Aplicações Web
// Aluna: Bruna Cristine Pereira (brunacristinpereira@gmail.com)
//

// Declara uma função para processar o formulário de login
function processaFormLogin (event) {                
    // Cancela a submissão do formulário para tratar sem fazer refresh da tela
    event.preventDefault ();

    // Obtem os dados de login e senha a partir do formulário de login
    var usuario = document.getElementById('campoEmail').value;
    var senha = document.getElementById('campoSenha').value;

    /*Valida login e se estiver ok, redireciona para tela inicial da aplicação
     */
   
    resultadoLogin = loginUser (usuario, senha);

    if (resultadoLogin == 1) {
        window.location.href = 'index.html';
    }

    else if(resultadoLogin == -1){
        alert ('Usuário não encontrado na base de dados');
    }
    else{
        alert ('Senha incorreta');
    }
}

// Associa a funçao processaFormLogin  formulário adicionado um manipulador do evento submit
document.getElementById ('login-form').addEventListener ('submit', processaFormLogin);
 

// Página inicial de Login
const LOGIN_URL = "login.html";

// Objeto para o banco de dados de usuários baseado em JSON
var db_usuarios = {};

// Objeto para o usuário corrente
var usuarioCorrente = {};

// Dados de usuários para serem utilizados como carga inicial
const dadosIniciais = {
     usuarios: [ 
        {nome: "Maria da Glória", Email: "maria@teste.com", Senha: "abcd", Sexo: 1, telefone: "31-98795-5587"}, 
        {nome: "Joana Aparecida", Email: "joana@teste.com", Senha: "abc3", Sexo: 1, telefone: "31-98563-9985"},  
        {nome: "João da Costa", Email: "joao@teste.com", Senha: "1234", Sexo: 2, telefone: "31-96652-6423"}, 
        {nome: "Elias", Email: "elias@teste.com", Senha: "5874", Sexo: 2, telefone: "31-94125-6998"} 
    ]
};

// Inicializa o usuarioCorrente e banco de dados de usuários da aplicação de Login
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
    if (!usuariosJSON) {  // Se NÃO há dados no localStorage
        
        // Informa sobre localStorage vazio e e que serão carregados os dados iniciais
        alert('Dados de usuários não encontrados no localStorage. \n -----> Fazendo carga inicial.');

        // Copia os dados iniciais para o banco de dados 
        db_usuarios = dadosIniciais;

        // Salva os dados iniciais no local Storage convertendo-os para string antes
        localStorage.setItem('db_usuarios', JSON.stringify (dadosIniciais));
    }
    else  {  // Se há dados no localStorage
        
        // Converte a string JSON em objeto colocando no banco de dados baseado em JSON
        db_usuarios = JSON.parse(usuariosJSON);    
    }
};


/* Verifica o login do usuário 
/ -1 - Usuário não encontrado na base
/  0 - Senha incorreta
/  1 - Usuário e senha ok
*/
function loginUser (login, senha) {
    var retorno = -1; // usuário não está na base
    
    // Verifica todos os itens do banco de dados de usuarios 
    // para localizar o usuário informado no formulario de login
    for (var i = 0; i < db_usuarios.usuarios.length && retorno == -1; i++) {

        var usuario = db_usuarios.usuarios[i];
                
        // Se encontrou login, carrega usuário corrente e salva no Session Storage
        if (login == usuario.Email)
        {
         
            if(senha == usuario.Senha){
                console.log('entrou validação senha');
                usuarioCorrente.nome = usuario.nome;
                usuarioCorrente.Email = usuario.Email;
                usuarioCorrente.Sexo = usuario.Sexo;
                usuarioCorrente.telefone = usuario.telefone;
                
                // Salva os dados do usuário corrente no Session Storage, mas antes converte para string
                sessionStorage.setItem ('usuarioCorrente', JSON.stringify (usuarioCorrente));

                // Retorna 1 para usuário encontrado
                retorno = 1;

            }
            else
            {
            // retorno para senha incorreta
            retorno = 0;
            }

        } 
    }
    return retorno;
}

// Apaga os dados do usuário corrente no sessionStorage
function logoutUser () {
    usuarioCorrente = {};
    sessionStorage.setItem ('usuarioCorrente', JSON.stringify (usuarioCorrente));
    window.location = LOGIN_URL;
}

// Inicializa as estruturas utilizadas pelo LoginApp
initLoginApp ();
