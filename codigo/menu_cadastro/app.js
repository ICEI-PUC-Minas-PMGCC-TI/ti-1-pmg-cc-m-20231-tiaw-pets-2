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

// Configura os botões
document.getElementById ('btn-cadastrar').addEventListener ('click', incluirPessoa);




