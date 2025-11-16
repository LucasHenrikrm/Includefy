function criarPost(){
    console.log("Sucesso!");
    function alertaCriarPost(){
        Swal.fire({
        title: "Sucesso!",
        text: "Post criado com sucesso!",
        icon: "success",
        confirmButtonColor: "#fe3f6c"
        });
    }
    alertaCriarPost();
    setTimeout(function(){
        window.location.href = "../index.html";
    }, 3000)
}
