function salvaDados (pessoas) {
    localStorage.setItem ('db', JSON.stringify (pessoas));
}

function leDados () {
    let strDados = localStorage.getItem('db');
    let objDados = {};

    if (strDados) {
        objDados = JSON.parse (strDados);
    }
    else{
        objDados = { pessoas: [ 
            {nome: "Joana", Email: "joana@teste.com", Senha: "abcd", Sexo: 1, telefone: "31-98855-1913"}, 
            ]}
    }
    
    return objDados;
}

function incluirPessoa (){
    
    // Ler os dados do localStorage
    let objDados = leDados();
    let verificaCadastro = buscaPessoa(objDados);

    if(verificaCadastro){
         alert("E-mail já cadastrado");
    }

    else{
        // Incluir cadastro nova pessoa
        let strNome     = document.getElementById ('campoNome').value;
        let strEmail    = document.getElementById ('campoEmail').value;
        let strSenha    = document.getElementById ('campoSenha').value;
        let lbSexo        = document.getElementById ('inlineFormSelectPref').value;
        let strTelefone = document.getElementById ('campoTelefone').value;

        let novaPessoa = {
            nome: strNome,
            email: strEmail,
            senha: strSenha,
            sexo:  lbSexo,
        telefone: strTelefone
        };
        
        objDados.pessoas.push (novaPessoa);

        // Salvar os dados no localStorage novamente
        salvaDados (objDados);

        alert("Cadastro efetuado com sucesso");
    }
    
}

function buscaPessoa (dados) {
    let lbEmail = document.getElementById('campoEmail');
    let cadastrado= false;
       
    if(dados !== null){
        for (i=0; i< dados.pessoas.length; i++) {
            if(dados.pessoas[i].email == lbEmail)
            {
                cadastrado = true;
            } 
        }
    
    }
    
    return cadastrado;
    
}

const handlePhone = (event) => {
    let input = event.target
    input.value = phoneMask(input.value)
  }
  
  const phoneMask = (value) => {
    if (!value) return ""
    value = value.replace(/\D/g,'')
    value = value.replace(/(\d{2})(\d)/,"($1) $2")
    value = value.replace(/(\d)(\d{4})$/,"$1-$2")
    return value
  }

  function validaDados (){
  var dadosValidos = 1;
  var nome     = document.getElementById ('campoNome').value;
  var email    = document.getElementById ('campoEmail').value;
  var sexo     = document.getElementById ('inlineFormSelectPref').value;
  var telefone = document.getElementById ('campoTelefone').value;

    if(nome == ""){
        alert("Nome não informado!"); 
        dadosValidos = 0;

    }

    if(email == ""){
        alert("E-mail não informado!"); 
        dadosValidos = 0;
    }

    if(sexo == ""){
        alert("Sexo não informado!"); 
        dadosValidos = 0;
    }

    if(telefone == ""){
        alert("Telefone não informado!"); 
        dadosValidos = 0;
    }

    if(dadosValidos == 1){
        incluirPessoa();
        dadosValidos = 0;
    }
    else{
        alert("Campos incorretos"); 
        dadosValidos = 0;
    }
    
  }
// Configura os botões
document.getElementById ('btn-cadastrar').addEventListener ('click', validaDados);





