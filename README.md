<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    


# Function:
**This program is a demo version that offers partially the backend functions for merchants to sell their products (objects), which are available to purchase by customers. For the object controller and service unit tests have been written.**

## Prerequisites:
To use this program you need Docker, including Docker Compose (Docker version 24.0.6 and Docker Compose version v2.21.0 were used) installed as well as an API like Postman:

[Docker][https://docs.docker.com/get-docker/]

[Postman][https://www.postman.com/]

## Start:
docker compose --profile [development/production] up

## How to use:
You can test the functions of the program by using already stored data from the database or insert new data as a customer or a merchant. Passwords are stored hashed in the database. Registrating as a merchant or customer initializes a random code and password and sends it to the user (currently mocked by using ethereal email). The database has to be backed up manually by using:

docker exec db mysqldump -u root --password=password DatabaseApplication > [name of the backup].sql

Note: The password is obviously not a safe password to use in any real application, but is only used to make the testing process easier.



In the following some example data from the database is given that can be used:

*admin:*
| id              | code            | firstName       | lastName          | email                     | address                | postcode        | city            | telephoneNumber | mobileNumber    | password                         | createdAt             | role            |
| :-------------: | :-------------: | :-------------: | :---------------: | :-----------------------: | :--------------------: | :-------------: | :-------------: | :-------------: | :-------------: | :------------------------------: | :-------------------: | :-------------: |
| 1               | A7-6            | Ada-Charles     | Babbage-Lovelace  | BabbageLovelace@gmail.com | Ada-Lovelace-Straße 17 | 63457           | Hanau           | 06181261291     | NULL            | BKwGU5XdACaU8WW0QvAoEhhBhrAB0Uzt | 2024-02-07 06:34:39   | admin           |
| id              | code            | firstName       | lastName          | email                     | address                | postcode        | city            | telephoneNumber | mobileNumber    | password                         | createdAt             | role            |


*customer:*
| id              | code            | firstName       | lastName          | email                     | address                | postcode        | city            | telephoneNumber | mobileNumber    | password                         | createdAt             | role            |
| :-------------: | :-------------: | :-------------: | :---------------: | :-----------------------: | :--------------------: | :-------------: | :-------------: | :-------------: | :-------------: | :------------------------------: | :-------------------: | :-------------: |
| 1               | Z610-FB-S3RP3   | Alan            | Turing            | test1@gmail.com           | TestStrasse 37         | 37073           | Göttingen       | NULL            | 3141592         | fu21uMRfCgJ4Ufg8ouIrsQtUWJ4jJ0wi | 2024-02-15 12:44:43   | customer        |
| id              | code            | firstName       | lastName          | email                     | address                | postcode        | city            | telephoneNumber | mobileNumber    | password                         | createdAt             | role            |


*merchant:*
| id              | code            | companyName     | email                   | address           | postcode        | city            | country         | telephoneNumber | mobileNumber    | password                         | createdAt           | role            |
| :-------------: | :-------------: | :-------------: | :---------------------: | :---------------: | :-------------: | :-------------: | :-------------: | :-------------: | :-------------: | :------------------------------: | :-----------------: | :-------------: |
| 1               | CWF9-J5         | TheCompany      | testCompany37@gmail.com | Rubidiumstraße 37 | 85468           | Sundsvall       | Sweden          | 1337314159265   | NULL            | BGga0QnNU9A0aFNaQtvX8MyMK6I81iAD | 2024-02-07 06:34:48 | merchant        |
| 2               | 2-6OURR         | testCompany     | testCompany73@gmail.com | Rubidiumstraße 37 | 85468           | Sundsvall       | Sweden          | 1337314159265   | 7331314159265   | tbGMHLofDhckiIDlVpgfJdq6o718pGQE | 2024-02-15 12:26:07 | merchant        |
| id              | code            | companyName     | email                   | address           | postcode        | city            | country         | telephoneNumber | mobileNumber    | password                         | createdAt           | role            |



*object (with relation to merchant 'TheCompany'):*
| id                  | object              | objectNumber        | price               | color               | amount              | available           | createdAt           |
| :-----------------: | :-----------------: | :-----------------: | :-----------------: | :-----------------: | :-----------------: | :-----------------: | :-----------------: |
|                     | cookie              | 27                  | 6.66                | kuro                | 13                  | true                | 2024-02-15 12:28:35 |
|                     | cookie              | 271                 | 13.37               | kuro                | 13                  | true                | 2024-02-15 12:32:04 |
|                     | cookie              | 2718                | 13.37               | violett             | 13                  | true                | 2024-02-15 12:32:38 |
| id                  | object              | objectNumber        | price               | color               | amount              | available           | createdAt           |

*object (with relation to merchant 'testCompany'):*
| id                  | object              | objectNumber        | price               | color               | amount              | available           | createdAt           |
| :-----------------: | :-----------------: | :-----------------: | :-----------------: | :-----------------: | :-----------------: | :-----------------: | :-----------------: |
|                     | cookie              | 31                  | 11.11               | nero                | 13                  | true                | 2024-02-15 12:33:47 |
|                     | cookie              | 314                 | 73.31               | violett             | 7                   | true                | 2024-02-15 12:34:39 |
|                     | cookie              | 3141                | 6.66                | black               | 7                   | true                | 2024-02-15 12:34:56 |
|                     | cookie              | 31415               | 6.00                | black               | 7                   | true                | 2024-02-15 12:37:17 |
| id                  | object              | objectNumber        | price               | color               | amount              | available           | createdAt           |






## Features:

- Dockerized
- Using already existing Database 
- Registration (as an admin, a customer or a merchant)
- Updating user information (e.g. change password, address,...)
- (Mocked) Emails are send (e.g. registration, order,...)


## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.


