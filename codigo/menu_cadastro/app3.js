function validaEmail (){
    var lbEmail   = document.getElementById ('lbl-email').value;

    if(lbEmail == ""){
        alert("E-mail não informado!"); 
   }

    else{
        alert("Foi enviada a senha para o e-mail informado.");
    }

}

// Configura o botão

document.getElementById ('btn-recuperarSenha').addEventListener ('click', validaEmail);