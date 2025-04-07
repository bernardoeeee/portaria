const express = require('express')
const cors = require('cors')
const porta = process.env.PORT || 3333;
const app = express()
app.use(cors())
app.use(express.json())
app.listen(porta, () => console.log(`🚀 HTTP server running on http://localhost:` + porta))

const connection = require('./db_config')



// app.post("/cadastro/morador", (request, response) => {
//     let params = Array(
//         request.body.name,
//         request.body.bloco,
//         request.body.apartamento,
//         request.body.telefone,
//         request.body.email,
//         request.body.status
//     );

//     let query = "INSERT INTO moradores(name, bloco, apartamento, telefone, email, status) VALUES (?,?,?,?,?,?);"

//     connection.query(query, params, (err, results) => {
//         if (results) {
//             response
//                 .status(201)
//                 .json({
//                     success: true,
//                     message: "sucesso",
//                     data: results
//                 })
//         } else {
//             response
//                 .status(400)
//                 .json({
//                     success: false,
//                     message: "sem sucesso",
//                     data: err
//                 })
//         }
//     })
// });


// app.post("/cadastro/veiculo", (request, response) => {
//     let params = Array(
//         request.body.placa,
//         request.body.modelo,
//         request.body.cor,
//         request.body.box
//     );

//     let query = "INSERT INTO veiculo(placa, modelo, cor, box) VALUES (?,?,?,?);"

//     connection.query(query, params, (err, results) => {
//         if (results) {
//             response
//                 .status(201)
//                 .json({
//                     success: true,
//                     message: "sucesso",
//                     data: results
//                 })
//         } else {
//             response
//                 .status(400)
//                 .json({
//                     success: false,
//                     message: "sem sucesso",
//                     data: err
//                 })
//         }
//     })
// });


app.post("/cadastro/morador", (request, response) => {
    const { nome, bloco, apartamento, telefone, email, status } = request.body;

    if (!nome || !bloco || !apartamento || !telefone || !email || !status) {
        return response.status(400).json({ success: false, message: "Todos os campos são obrigatórios!" });
    }

    const query = "INSERT INTO moradores(nome, bloco, apartamento, telefone, email, status) VALUES (?, ?, ?, ?, ?, ?);";
    connection.query(query, [nome, bloco, apartamento, telefone, email, status], (err, results) => {
        if (err) {
            console.error("❌ Erro ao cadastrar morador:", err);
            return response.status(500).json({ success: false, message: "Erro ao cadastrar morador", error: err });
        }
        response.status(201).json({ success: true, message: "Morador cadastrado com sucesso!", data: results });
    });
});

// Rota para cadastro de veículos
app.post("/cadastro/veiculo", (request, response) => {
    const { placa, modelo, cor, box, email} = request.body;

    if (!placa || !modelo || !cor || !box || !email) {
        return response.status(400).json({ success: false, message: "Todos os campos são obrigatórios!" });
    }

    const query = "INSERT INTO veiculo(placa, modelo, cor, box, email) VALUES (?,?, ?, ?, ?);";
    connection.query(query, [placa, modelo, cor, box, email], (err, results) => {
        if (err) {
            console.error("❌ Erro ao cadastrar veículo:", err);
            return response.status(500).json({ success: false, message: "Erro ao cadastrar veículo", error: err });
        }
        response.status(201).json({ success: true, message: "Veículo cadastrado com sucesso!", data: results });
    });
});

// app.get("/listar/morador", (request, response) => {
//     const { nome, apartamento, telefone } = request.body;

//     const query = "SELECT nome,apartamento,telefone FROM moradores;";
//     connection.query(query, [nome, apartamento, telefone], (err, results) => {
//         if (err) {
//             console.error("❌ Erro ao cadastrar morador:", err);
//             return response.status(500).json({ success: false, message: "Erro ao cadastrar morador", error: err });
//         }
//         response.status(201).json({ success: true, message: "Morador cadastrado com sucesso!", data: results });
//     });
// });

// app.get("/listar/veiculo", (request, response) => {
//     const { placa, box } = request.body;

//     const query = "SELECT placa, box FROM veiculo;";
//     connection.query(query, [placa, box], (err, results) => {
//         if (err) {
//             console.error("❌ Erro ao cadastrar morador:", err);
//             return response.status(500).json({ success: false, message: "Erro ao cadastrar morador", error: err });
//         }
//         response.status(201).json({ success: true, message: "Morador cadastrado com sucesso!", data: results });
//     });
// });

app.get('/listar', (req, res) => {
    const dados = [];

    const query1 = 'SELECT * FROM moradores';
    connection.query(query1, (err, moradores) => {
        if (err) {
            console.error('Erro ao buscar moradores:', err);
            return res.status(500).json({ erro: 'Erro ao buscar moradores' });
        }

        dados.push({ moradores }); // Adiciona os moradores ao array

        const query2 = 'SELECT * FROM veiculo';
        connection.query(query2, (err, veiculo) => {
            if (err) {
                console.error('Erro ao buscar veículos:', err);
                return res.status(500).json({ erro: 'Erro ao buscar veículos' });
            }

            dados.push({ veiculo });

            res.json(dados);
        });
    });
});



app.delete('/remover/:email', (request, response) => {
    const { email } = request.params;
    const query = 'DELETE FROM veiculo WHERE email = ?';
    const query1 = 'DELETE FROM moradores WHERE email = ?';
    connection.query(query, [email], (err) => {
        if (err) {
            return response.status(500).json({ success: false, message: 'Erro ao remover carro.' });
        }
        response.json({ success: true, message: 'Carro removido com sucesso!' });
    });
    connection.query(query1, [email], (err) => {
        if (err) {
            return response.status(500).json({ success: false, message: 'Erro ao remover carro.' });
        }
    })
});
