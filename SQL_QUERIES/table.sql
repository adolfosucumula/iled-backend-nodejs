create table _USER(
    id int primary key AUTO_INCREMENT,
    name varchar(250),
    phone_number varchar(50),
    email varchar(50),
    password varchar(250),
    status varchar(20),
    role  varchar(20),
    UNIQUE (email)
);