# Portaria - Sistema de Controle de Acessos

## Descrição do Projeto

Este projeto consiste em um sistema de portaria para controle de acessos, desenvolvido utilizando HTML, CSS e JavaScript no front-end e Node.js com MySQL no back-end. O objetivo é permitir o registro e monitoramento de entrada e saída de visitantes, moradores e prestadores de serviço em um ambiente controlado.

## Tecnologias Utilizadas

Front-end: HTML, CSS, JavaScript

Back-end: Node.js, Express.js, MySQL

Banco de Dados: MySQL

#### Outras dependências utilizadas no back-end:

 * Express (framework para Node.js)

 * Cors (permite comunicação entre diferentes domínios)

 * MySQL (conexão com banco de dados)

 * dotenv (gestão de variáveis de ambiente)
  
## Funcionalidades do Front-End

### Cadastro de moradores com os seguintes dados:

Nome

Bloco

Apartamento

Email

Status

Placa do veículo

Box de estacionamento

### Listagem dos moradores com opções para:

Editar dados

Excluir morador

Modal para edição de moradores e veículos

Estilização responsiva utilizando CSS


## Back-End

* Rota de Cadastro de Morador (POST /cadastro/morador)

* Rota de Cadastro de Veículo (POST /cadastro/veiculo)

* Rota de Listagem de Moradores e Veículos (GET /listar)

* Rota de Remoção de Morador e Veículo pelo Email (DELETE /remover/:email)

## Estrutura do banco de dados

### Tabela Moradores

![image](https://github.com/user-attachments/assets/ffa3dc0c-4ba1-4217-ad74-a81f347ca730)


### Tabela Veiculo

![image](https://github.com/user-attachments/assets/7909f346-f8d2-4751-b00b-0d811b6b066f)




