const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('./app');

chai.use(chaiHttp);
const expect = chai.expect;

describe('Login', () => {
    it('Debería devolver un mensaje de éxito al iniciar sesión con credenciales válidas', (done) => {
        chai.request(app)
            . post('/login')
            .send({ username: 'usuario_valido', password: 'contraseña_valida' })
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.text).to.equal('Inicio de sesión exitoso');
                done();
            });
    });

    it('Debería devolver un mensaje de error al iniciar sesión con credenciales inválidas', (done) => {
        chai.request(app)
            .post('/login')
            .send({ username: 'usuario_invalido', password: 'contraseña_invalida' })
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.text).to.equal('Nombre de usuario o contraseña incorrectos');
                done();
            });
    });
});