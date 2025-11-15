function cadastrarLocal() {
    console.log("Sucesso!");
    function alertaCadastrarLocal(){
        Swal.fire({
        title: "Sucesso!",
        text: "Local e/ou serviço cadastrado com sucesso!",
        icon: "success",
        confirmButtonColor: "#fe3f6c"
        });
    }
    alertaCadastrarLocal();
    setTimeout(function(){
        window.location.href = "../Mapa.html";
    }, 3000)
}

function enviarAvaliacao() {
    console.log("Sucesso!");
    function alertaEnviarAvaliacao(){
        Swal.fire({
        title: "Sucesso!",
        text: "Avaliação cadastrada com sucesso!",
        icon: "success",
        confirmButtonColor: "#fe3f6c"
        });
    }
    alertaEnviarAvaliacao();
    setTimeout(function(){
        window.location.href = "../Mapa.html";
    }, 3000)
}

document.querySelectorAll('.star-rating:not(.readonly) label').forEach(star => {
        star.addEventListener('click', function() {
            this.style.transform = 'scale(1.2)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 200);
        });
    });
