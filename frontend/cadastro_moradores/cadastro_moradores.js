function updateSizeInfo() {
    let largura = window.innerWidth
    document.getElementById("sizeInfo").textContent = `Largura da janela: ${largura}px`

    let container = document.getElementById("container")
    let inputs = document.querySelectorAll("input, select, label")

    if (largura < 600) {

        inputs.forEach(input => {
            input.style.width = "70%"
            input.style.padding = "6px"
        })
    } else {

        inputs.forEach(input => {
            input.style.width = "90%"
            input.style.padding = "8px"
        })
    }
}

window.addEventListener("resize", updateSizeInfo)
updateSizeInfo()


async function cadastro(event) {
    event.preventDefault();


    const nome = document.getElementById('nome').value.trim();
    const bloco = document.getElementById('bloco').value.trim().toUpperCase();
    const apartamento = document.getElementById('apartamento').value.trim();
    const telefone = document.getElementById('telefone').value.trim();
    const email = document.getElementById('email').value.trim();
    const status = document.getElementById('status').value;

    const dataMorador = { nome, bloco, apartamento, telefone, email, status };

    try {
        // Cadastra o morador primeiro
        const responseMorador = await fetch('http://localhost:3333/cadastro/morador', {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(dataMorador)
        });

        const resultMorador = await responseMorador.json();

        if (!resultMorador.success) {
            alert("Erro ao cadastrar morador: " + resultMorador.message);
            return;
        }
        console.log("✅ Morador cadastrado com sucesso!");



        // Captura os dados do carro
        const placa = document.getElementById('placa').value.trim().toUpperCase();
        const modelo = document.getElementById('modelo').value.trim();
        const cor = document.getElementById('cor').value.trim();
        const box = document.getElementById('box').value.trim();
        const email = document.getElementById('email').value.trim();


        const dataCarro = { placa, modelo, cor, box, email };

        // Cadastra o carro após o morador
        const responseCarro = await fetch('http://localhost:3333/cadastro/veiculo', {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(dataCarro)
        });

        const resultCarro = await responseCarro.json();

        if (!resultCarro.success) {
            alert("Erro ao cadastrar carro: " + resultCarro.message);
            return;
        } else {
            window.location.href = '../listagem/listar.html'
            console.log("✅ Carro cadastrado com sucesso!");
            alert("Cadastro realizado com sucesso! 🎉");
        }


        // Limpa os campos após o cadastro bem-sucedido
        document.querySelector("form").reset();
    } catch (error) {
        console.error("Erro ao conectar com o servidor:", error);
        alert("Erro na comunicação com o servidor. Tente novamente.");
    }
}



// async function cadastroMorador(data) {
//     const response = await fetch('http://localhost:3333/cadastro/morador', {
//         method: 'POST',
//         headers: {
//             "Content-Type": "application/json",
//         },

//         body: JSON.stringify(data)
//     })
//     console.log(response)

//     const results = await response.json()
//     console.log(results)


//     if (results.success) {
//         alert(results.message);
//     } else {
//         console.log("Erro no cadastro do carro :", results.message);
//     }
// }

// async function cadastroCarro(data) {
//     const response = await fetch('http://localhost:3333/cadastro/veiculo', {
//         method: 'POST',
//         headers: {
//             "Content-Type": "application/json",
//         },

//         body: JSON.stringify(data)
//     })
//     console.log(response)

//     const results = await response.json()
//     console.log(results)


//     if (results.success) {
//         alert(results.message);
//     } else {
//         console.log("Erro no cadastro do carro :", results.message);
//     }
// }

// async function cadastro(event) {
//     event.preventDefault()

//     const name = document.getElementById('name').value
//     const bloco = document.getElementById('bloco').value
//     const apartamento = document.getElementById('apartamento').value
//     const telefone = document.getElementById('telefone').value
//     const email = document.getElementById('email').value
//     const status = document.getElementById('status').value

//     const dataMorador = { name, bloco, apartamento, telefone, email, status }

//     cadastroMorador(dataMorador)

//     const placa = document.getElementById('placa').value
//     const modelo = document.getElementById('modelo').value
//     const cor = document.getElementById('cor').value
//     const box = document.getElementById('box').value

//     const dataCarro = { placa, modelo, cor, box }

//     cadastroCarro(dataCarro)
// }


