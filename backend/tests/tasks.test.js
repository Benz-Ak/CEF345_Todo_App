const request = require('supertest');
const app = require('../app');

describe('Task CRUD Automation', () => {
    let testUserId;
    let authToken;

    // Étape 1 : Créer un utilisateur pour les besoins du test
    beforeAll(async () => {
        const userRes = await request(app)
            .post('/api/auth/signup')
            .send({
                full_name: "Test User",
                email: "test_tasks@example.com",
                password: "password123"
            });

        testUserId = userRes.body.userId || userRes.body.user.id;
        authToken = userRes.body.token;
    });

    // Test : Création d'une tâche pour cet utilisateur précis
    it('should create a task for the specific test user', async () => {
        const res = await request(app)
            .post('/api/tasks/add')
            .set('Authorization', `Bearer ${authToken}`)
            .send({
                title: "Apprendre GitHub Actions",
                user_id: testUserId // Utilisation de la donnée créée au-dessus
            });

        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty('id');
    });
});