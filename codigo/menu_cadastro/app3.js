function validaEmail (){
    var lbEmail   = document.getElementById ('lbl-email').value;

    if(lbEmail == ""){
        alert("E-mail não informado!"); 
   }

    else{
        sendEmail(lbEmail);   
    }

}

function sendEmail(email) {
    console.log('entrou sendEmail');
    Email.send({
    SecureToken : "2a7bd8f7-3f61-44e2-8c9b-c2ac8c4d6af6",
    To : email,
    From : "adota1pet@gmail.com",
    Subject: "Testing Email using javascript",
    Body: "If you are reading this, dont forget to applaud"
    })
    .then(function (message) {
    alert("Foi enviada a senha para o e-mail informado.");
    });
    }

// Configura o botão

document.getElementById ('btn-recuperarSenha').addEventListener ('click', validaEmail);