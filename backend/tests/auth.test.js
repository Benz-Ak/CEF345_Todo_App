const request = require('supertest');
const app = require('../server'); // Ton fichier Express principal

describe('Auth API Unit Tests', () => {

    // Test 1 : Identifiants incorrects
    it('should return 401 for wrong password', async () => {
        const res = await request(app)
            .post('/api/auth/login')
            .send({
                email: "test@example.com",
                password: "wrongpassword"
            });

        expect(res.statusCode).toEqual(401);
        expect(res.body).toHaveProperty('message', 'Email ou mot de passe incorrect.');
    });

    // Test 2 : Utilisateur inexistant (Base de données vide)
    it('should return 404 if user does not exist', async () => {
        const res = await request(app)
            .post('/api/auth/login')
            .send({
                email: "ghost@example.com",
                password: "anypassword"
            });

        expect(res.statusCode).toEqual(404);
    });
});