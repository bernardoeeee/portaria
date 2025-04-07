create database portaria;
use portaria;

create table moradores(
	id int auto_increment primary key,
    nome varchar(255) not null,
    bloco enum('A','B','C','D') not null,
    apartamento varchar(5) not null unique,
    telefone varchar(11) not null unique,
    email varchar(255) not null unique,
    status enum('residente', 'proprietario', 'visitante') default('residente'),
    criado_em timestamp default current_timestamp
);

SELECT nome,apartamento,telefone FROM moradores;
# INSERT INTO moradores(name, bloco, apartamento, telefone, email, status) VALUES (?,?,?,?,?,?);

create table veiculo(
	id_carro int primary key auto_increment,
    placa varchar(7) unique not null,
    modelo varchar(255) not null,
    cor varchar(255),
    box varchar(50) not null unique,
    criado_em timestamp default current_timestamp,
    email varchar(255) not null,
    
    foreign key (email) references moradores(email)
);

DELETE FROM moradores WHERE email = 'any@gmail.com';

select * from moradores;
select * from veiculo;
