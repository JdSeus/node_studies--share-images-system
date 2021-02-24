let app = require("../src/app");
let supertest = require("supertest");
let request = supertest(app);

let mainUser = {name: "Tester", email: "tester@tester.com", password: "tester123"}

beforeAll(() => {
    // Inserir usuário Tester no Banco
    return request.post("/user")
    .send(mainUser)
    .then(res => {})
    .catch(err => {console.log(err)});

});

afterAll(() => {
    return request.delete(`/user/${mainUser.email}`)
    .then(res => {})
    .catch(err => {console.log(err)});

});

describe("Cadastro de usuário",() => {

    test("Deve cadastrar um usuário com sucesso", () => {

        let time = Date.now();
        let email = `teste${time}@teste.com`;
        let user = {name: "Teste", email: email, password: "123456"};

        return request.post("/user")
        .send(user)
        .then( res => {

            expect(res.statusCode).toEqual(200);
            expect(res.body.email).toEqual(email);

        }).catch(err => {
            fail(err);
        });
    });

    test("Deve impedir que um usuário se cadastre com os dados vazios", () => {

        let user = {name: "", email: "", password: ""};

        return request.post("/user")
        .send(user)
        .then( res => {
            expect(res.statusCode).toEqual(400) // 400 = Bad Request
        }).catch(err => {
            fail(err);
        });
    });

    test("Deve impedir que um usuário se cadastre com um e-mail repetido", () => {

        let time = Date.now();
        let email = `teste${time}@teste.com`;
        let user = {name: "Teste", email: email, password: "123456"};

        return request.post("/user")
        .send(user)
        .then( res => {

            expect(res.statusCode).toEqual(200);
            expect(res.body.email).toEqual(email);

            return request.post("/user")
            .send(user)
            .then(res => {
                expect(res.statusCode).toEqual(400);
                expect(res.body.error).toEqual("E-mail já cadastrado");
            }).catch(err => {
                fail(err);
            });

        }).catch(err => {
            fail(err);
        });
    });
});