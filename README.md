# Desafio Zoox  ![N|Solid](https://zooxsmart.com/wp-content/themes/zoox/img/logo-menu-fixed.svg)


A api foi construída utilizando Node js como servidor backend e Mongo DB como banco de dados.

### Packages usados
* [Express] - Framework para construção rápida de APIS.
* [nodemon] - Monitora alterações em arquivos e sobe novamente a aplicação.
* [mongoose] - Conectar e inserir dados no database do Mongo DB.
* [Babel] - Para usarmos javascript ES6 no nosso projeto.
* [Body parser] pra vida ficar facil usando o *req* e o *res*.
* [Node] - duh.

#### Rotas

Todas as rotas necessitam obrigatoriamente de **dois** parâmetros no header.

*Authorization :*  `Api Token`.
*Content-Type :* `application/json`

***Token de sandbox:***
```sh
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI1ZjI4OGMyOTU3NGI0NWQ2NzJhNTA1N2QiLCJzZWNyZXRLZXkiOiJiMmRmNDI4Yjk5MjlkM2FjZTdjNTk4YmJmNGU0OTZiMiIsIm5vdyI6IjIwMjAtMDgtMzBUMjM6Mjc6MTkuODM4WiIsImlhdCI6MTU5ODgzMDAzOX0.SwO3HaAxIcRDt168w3eL-RRC4OFArTd3LfHXgyA5M-s
```


Todos os parâmetros marcados com `*` são obrigatórios.

Nas rotas com método `DELETE` o paramêtro **id** é passado na url.
Nas rotas **POST** e **PUT** os parâmetros são passados no  *body*.

### Cidades
| Método | Rota | Parâmetros | Descrição
| ------ | ------ | ------ | ------ |
| GET | cities/ |  | Retorna todas as cidades criadas.
| POST | cities/create |  **name:** String `*`| Cria uma nova cidade.
| |  | **stateId:** String `*`  |
| PUT | cities/update |  **id:** String `*` | Altera informações de uma cidade.
|  | | **name:** String |
|  |  | **stateId:** String |
| `DELETE` | cities/delete | **id:** String `*` | Deleta uma cidade.

### Estados
| Método | Rota | Parâmetros | Descrição
| ------ | ------ | ------ | ------ |
| GET | states/ | | Retorna todos os estados criados.
| POST | states/create |  **name:** *String* `*` | Cria um novo estado
|  | |  **abbreviation:** *String* `*` |
| PUT | states/update | **id:** *String* `*` | Altera informações de um estado.
|  |  | **name:** *String* |
|  | | **abbreviation:** *String*  |
| `DELETE` | cities/update | **id:** String `*` | Deleta um estado.


 >Assim que recebemos a sua requisição, Nós integramos com a **Contraktor**
 >Criamos entâo um novo contrato, associando as duas partes a ele ( Empresa / Advogado )
 >E entâo mandamos um email com o documento para ambas as partes assinarem.

 ## Api criada utilizando os seguintes princípios:
 >DRY: "Don’t Repeat Yourself".
 >KISS: "Keep It Simple,Stupid"

### Instalando projeto

O projeto utiliza [Node.js](https://nodejs.org/) versão 10 ou superior e é bem simples de rodar ele.

Basta entrar na pasta do projeto.

```sh
$ cd desafio-zoox
```

Verificando versões.

```sh
$ npm run status
```

Instalar os pacotes.
```sh
$ sudo npm install
```

e rodar o servidor.
```sh
$ npm start
```

`*` As credencias do banco de dados são pegas através de variaveis de ambiente configuradas em produção.


#### Considerações finais...
Criado e documentado por `Andre becker`.

```sh
  github.com/wassupandre
```
[Body parser]: <http://daringfireball.net/projects/markdown/>
[Babel]: <https://babeljs.io/docs>
[Node]: <http://nodejs.org>
[express]: <http://expressjs.com>
[nodemon]: <https://nodemon.io/>
[mongoose]: <https://mongoosejs.com/>
