function updateSizeInfo() {
    let largura = window.innerWidth
    // document.getElementById("sizeInfo").textContent = `Largura da janela: ${largura}px`

    // let container = document.getElementById("container")
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


document.addEventListener("DOMContentLoaded", () => {
    carregarCarros();
});

// async function carregarCarros() {
//     const response = await fetch('http://localhost:3333/listar');
//     const data = await response.json();
//     const tbody = document.getElementById('tbody');
//     tbody.innerHTML = '';

//     if (data.success) {
//         alert('Erro ao listar: ' + (data.message || 'Erro desconhecido'));
//         return;
//     }

//     const moradores = data[0].moradores;
//     const veiculo = data[1].veiculo;

//     for (let i = 0; i < moradores.length; i++) {
//         const morador = moradores[i];
//         const veiculos = veiculo[i]; // ainda é um array!

//         const row = document.createElement('tr');
//         row.innerHTML = `
//             <td>${morador.nome}</td>
//             <td>${morador.bloco}</td>
//             <td>${morador.apartamento}</td>
//             <td>${morador.email}</td>
//             <td>${morador.status}</td>
//             <td>${veiculos?.placa || '-'}</td>
//             <td>${veiculos?.box || '-'}</td>
//             <td hidden>${veiculos.email}</td>
//             <td><button id="remover" onclick="excluir('${veiculo.email}', '${morador.email}')">Excluir</button></td>
//             <td><button id="editar" onclick="abrirModal('${morador.nome}','${morador.bloco}','${morador.apartamento}','${morador.telefone}','${morador.email}', '${morador.status}','${veiculos?.placa || ''}','${veiculos?.modelo || ''}','${veiculos?.cor || ''}','${veiculos?.box || ''}')">Editar</button></td>
//         `;
//         tbody.appendChild(row);
//     }

//     // alert('Listagem realizada com sucesso!');
// }


async function carregarCarros() {
    const response = await fetch('http://localhost:3333/listar');
    const data = await response.json();
    const tbody = document.getElementById('tbody');
    tbody.innerHTML = '';

    console.log(data);

    const moradores = data[0].moradores;
    const veiculos = data[1].veiculo;

    moradores.forEach(morador => {
        const veiculosMorador = veiculos.filter(v => v.email === morador.email);

        if (veiculosMorador.length > 0) {
            veiculosMorador.forEach(veiculo => {
                const linha = document.createElement('tr');
                linha.innerHTML = `
            <td>${morador.nome}</td>
            <td>${morador.bloco}</td>
            <td>${morador.apartamento}</td>
            <td>${morador.status}</td>
            <td>${veiculo.placa}</td>
            <td>${veiculo.modelo}</td>
            <td>${veiculo.vaga}</td>

            <td>
              <button id="remover" onclick="excluir('${veiculo.email}', '${morador.email}')"
              >Excluir</button>
            </td>
            <td>
              <button id="editar" 
              onclick="abrirModal('${morador.nome}','${morador.bloco}','${morador.apartamento}','${morador.telefone}','${morador.email}', '${morador.status}','${veiculo.placa}',  '${veiculo.modelo}','${veiculo.cor}','${veiculo.vaga}')"
              >Editar</button>

            </td>
          `;
                tbody.appendChild(linha);
            });
        } else {
            veiculosMorador.forEach(veiculo => {
                const linha = document.createElement('tr');
                linha.innerHTML = `
            <td>${morador.nome}</td>
            <td>${morador.bloco}</td>
            <td>${morador.apartamento}</td>
            <td>${morador.status}</td>
            <td>${veiculo.placa}</td>
            <td>${veiculo.modelo}</td>
            <td>${veiculo.vaga}</td>

            <td>
              <button id="remover" onclick="excluir('${veiculo.email}', '${morador.email}')"
              >Excluir</button>
            </td>
            <td>
              <button id="editar" 
              onclick="abrirModal('${morador.nome}','${morador.bloco}','${morador.apartamento}','${morador.telefone}','${morador.email}', '${morador.status}','${veiculo.placa}',  '${veiculo.modelo}','${veiculo.cor}','${veiculo.vaga}')"
              >Editar</button>

            </td>
          `;
                tbody.appendChild(linha);
            });
        }
    });
}

async function excluir(email) {
    const response = await fetch(`http://localhost:3333/remover/${email}`, {
        method: 'DELETE'
    });

    const result = await response.json();
    if (result.success) {
        alert(result.message || 'Erro ao remover o carro!');
    } else {
        alert('Carro removido com sucesso!');
        carregarCarros()
    }
}


function abrirModal(nome, bloco, apartamento, telefone, email, status, placa, modelo, cor, vaga) {
    emailAntigo = email;


    document.getElementById('nome').value = nome;
    document.getElementById('bloco').value = bloco;
    document.getElementById('apartamento').value = apartamento;
    document.getElementById('telefone').value = telefone;
    document.getElementById('email').value = email;
    document.getElementById('status').value = status;

    document.getElementById('placa').value = placa;
    document.getElementById('modelo').value = modelo;
    document.getElementById('cor').value = cor;
    document.getElementById('vaga').value = vaga;


    document.getElementById('modal').style.display = 'block';
}

function fecharModal() {
    document.getElementById('modal').style.display = 'none';
}