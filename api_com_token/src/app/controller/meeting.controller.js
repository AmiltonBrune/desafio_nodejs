const db = require('../../config/db.config.js');
const request = require('request');

const Meeting = db.meeting;

exports.findAll = (req, res) => {
    Meeting.findAll().then(meeting => {
        // Send All Employee to Client
        res.json(meeting);
    }).catch(err => {
        console.log(err);
        res.status(500).json({ msg: "erro", details: err });
    });
};

// Post a Meeting
exports.create = (req, res) => {
    // Save to PostgreSQL database
    Meeting.create(req.body).then(meeting => {
        // Send created meeting to client
        res.json(meeting);
    }).catch(err => {
        console.log(err);
        res.status(500).json({ msg: "erro", details: err });
    });
};

// FETCH All Meeting
exports.findById = (req, res) => {
    Meeting.findById().then(meetings => {
        /* let fatorial = 1;
        let explicaFator = '';
        let num = 20

        for (let x = 1; x <= num; x++) {
            fatorial = fatorial * x;

            if (explicaFator != '')
                explicaFator += 'x';

            explicaFator += x;
        }
        let fatorialSalas = 1;
        let explicaFatorSala = '';
        let numPessoas = 4;
        for (let y = 1; y <= numPessoas; y++) {

            fatorialSalas = fatorialSalas * y;
            if (explicaFatorSala != '')

                explicaFatorSala += 'x';

            explicaFatorSala += y;
        }

        let numeroComplento = num - numPessoas;
        let fatorialComplemento = 1;
        let explicaFatorComplemento = '';

        for (let z = 1; z <= numeroComplento; z++) {

            fatorialComplemento = fatorialComplemento * z;
            if (explicaFatorComplemento != '')
                explicaFatorComplemento += 'x';

            explicaFatorComplemento += z
        }

        let calculoDePossibilidadesCombinacoes = (fatorial / (fatorialSalas * (fatorialComplemento)));

        //document.writeln(numeroComplento+"! = "+explicaFatorComplemento+" = "+fatorialComplemento);
        //document.writeln('Quantidade de Reuniões = '+calculoDePossibilidadesCombinacoes);


        for (let index = 0; index < calculoDePossibilidadesCombinacoes; index++) {
            var frase = function (texto) {

                request(`http://localhost:8080/api/funcionarios`,
                    function (error, response, body) {
                        var resposta = JSON.parse(body);
                        console.log(resposta);
                    });
            }

            var sorteados = [];

            uniqueNumber([]);


            for (i = 0; i < numPessoas; i++) {
                var sorteado = parseInt(Math.ceil(Math.random() * num));
                uniqueNumber(sorteados);
                frase(sorteado);
            }

            function uniqueNumber(array) {
                var number = parseInt(Math.ceil(Math.random() * num));

                if (array.indexOf(number) === -1) {
                    array.push(number);
                } else {

                    uniqueNumber(array);
                }
            }


        }
        // Send All meeting to Client
 */


        //res.json(meetings);


        request(`http://localhost:8080/api/funcionarios`,
            (error, response, body) => {
                var resposta = JSON.parse(body);

                let iots = resposta.filter((interesses) => {

                    return interesses.interesse === `${req.params.interesseEmComum}`;


                });

                var pessoas = [];
                iots.forEach(element => {
                    pessoas.push(element);
                });
                var pessoasAleatorias = [];
                function geraPessoasAleatorias() {
                    for (var i = 0; i < 4; i++) {
                        var numeroAleatorio = Math.floor(Math.random() * iots.length);
                        pessoasAleatorias.push(iots[numeroAleatorio]);
                    }
                }

                function comparar() {
                    if (pessoasAleatorias[0].cargo == pessoasAleatorias[1].cargo ||
                        pessoasAleatorias[0].cargo == pessoasAleatorias[2].cargo ||
                        pessoasAleatorias[0].cargo == pessoasAleatorias[3].cargo) {
                        pessoasAleatorias.length = 0;
                        geraPessoasAleatorias();
                        comparar();
                    }
                    else if (
                        pessoasAleatorias[1].cargo == pessoasAleatorias[0].cargo ||
                        pessoasAleatorias[1].cargo == pessoasAleatorias[2].cargo ||
                        pessoasAleatorias[1].cargo == pessoasAleatorias[3].cargo) {
                        pessoasAleatorias.length = 0;
                        geraPessoasAleatorias();
                        comparar();
                    }
                    else if (
                        pessoasAleatorias[2].cargo == pessoasAleatorias[1].cargo ||
                        pessoasAleatorias[2].cargo == pessoasAleatorias[0].cargo ||
                        pessoasAleatorias[2].cargo == pessoasAleatorias[3].cargo) {
                        pessoasAleatorias.length = 0;
                        geraPessoasAleatorias();
                        comparar();
                    }
                    else if (
                        pessoasAleatorias[3].cargo == pessoasAleatorias[1].cargo ||
                        pessoasAleatorias[3].cargo == pessoasAleatorias[2].cargo ||
                        pessoasAleatorias[3].cargo == pessoasAleatorias[0].cargo) {
                        pessoasAleatorias.length = 0;
                        geraPessoasAleatorias();
                        comparar();
                    } else {
                        console.log('deu tudo certo')
                    }

                }

                geraPessoasAleatorias();
                comparar();

                var nomesIntegrantesReuniao = [];
                pessoasAleatorias.forEach(dados => {
                    nomesIntegrantesReuniao.push(dados.nome)
                });
                
                
                Meeting.create({
                    nome: `Reunião sobre ${req.params.interesseEmComum}`,
                    nomeIntegrante1:`${nomesIntegrantesReuniao[0]}`,
                    nomeIntegrante2:`${nomesIntegrantesReuniao[1]}`,
                    nomeIntegrante3:`${nomesIntegrantesReuniao[2]}`,
                    nomeIntegrante4:`${nomesIntegrantesReuniao[3]}`
                });
                
                res.json(pessoasAleatorias);
            });



    }).catch(err => {
        console.log(err);
        res.status(500).json({ msg: "erro", details: err });
    });
};

