function carregaDados () {
    let strDados = localStorage.getItem('db');
    let objDados = {};

    if (strDados) {
        objDados = JSON.parse (strDados);
    }
    else {
        objDados = { pessoas: [ 
                        {nome: "Maria da Glória", Email: "maria@teste.com", Senha: "abcd", Sexo: 1, telefone: "31-98795-5587"}, 
                        {nome: "Joana Aparecida", Email: "joana@teste.com", Senha: "abc3", Sexo: 1, telefone: "31-98563-9985"},  
                        {nome: "João da Costa", Email: "joao@teste.com", Senha: "1234", Sexo: 2, telefone: "31-96652-6423"}, 
                        {nome: "Elias", Email: "elias@teste.com", Senha: "5874", Sexo: 2, telefone: "31-94125-6998"} 
                    ]}
    }

    objDados.contatos.push (pessoas);
    salvaDados (objDados);

    buscaPessoa ();
}

function salvaDados (pessoas) {
    localStorage.setItem ('db', JSON.stringify (pessoas));
}

function buscaPessoa () {
    let lbEmail = document.getElementById('campoEmail');
    var cadastrado= true;
    
    for (i=0; i< objDados.pessoas.length; i++) {
        if(objDados.pessoas[i].email !== lbEmail)
        {
            cadastrado = false;
        } 
    }

    if(cadastrado == false)
    alert("E-mail não cadastrado");
}

document.getElementById ('btn-entrar').addEventListener ('click', carregaDados);