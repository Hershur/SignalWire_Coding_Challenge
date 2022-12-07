import chai, { expect } from "chai";
import chaiHttp from 'chai-http';
import { app } from "../../../../server";


// Assertion style
chai.should();

chai.use(chaiHttp);

describe('Health Check', () => {
    describe('GET /health', () => {
        it('It should show that server is running', (done) => {
            chai.request(app)
                .get('/health')
                .end((error, response) => {
                    response.should.have.status(200);
                    response.text.should.be.a('string');
                    response.text.should.equal('Service running');

                    done();
                })
        });
    });
});

describe('User routes', () => {
    describe('POST /api/v1/user/tickets', () => {
        it('It should post user tickets', (done) => {
            const payload = {
                user_id: 898223,
                title: "Big Ben",
                tags: ["Tag Base","Tag Base","Tag Base","Tiotle Tag"]
            };

            chai.request(app)
                .post('/api/v1/user/tickets')
                .send(payload)
                .end((error, response) => {
                    const data = response.body.data;

                    response.should.have.status(200);
                    response.body.should.be.an('object');
                    response.body.should.have.property('success').eq(true);
                    response.body.should.have.property('message').eq('Inserted successfully');
                    response.body.should.have.property('data');
                    expect(Object.keys(data)).to.include.members(['user_id', 'title', 'datetime']);
                    
                    done();
                })
        });


        it('It should validate payload for required fields', (done) => {
            const payload = {
                user_id: 898223,
                tags: ["Tag Base","Tag Base","Tag Base","Tiotle Tag"]
            };

            chai.request(app)
                .post('/api/v1/user/tickets')
                .send(payload)
                .end((error, response) => {
                    const errors = response.body.errors;

                    response.should.have.status(422);
                    response.body.should.be.an('object');
                    response.body.should.have.property('success').eq(false);
                    expect(errors).to.have.property('title').eq('title is required');

                    done();
                })
        });


        it('It should post tickets if tags is empty', (done) => {
            const payload = {
                user_id: 898223,
                title: "Big Ben"
            };

            chai.request(app)
                .post('/api/v1/user/tickets')
                .send(payload)
                .end((error, response) => {
                    const data = response.body.data;

                    response.should.have.status(200);
                    response.body.should.be.an('object');
                    response.body.should.have.property('success').eq(true);
                    response.body.should.have.property('message').eq('Inserted successfully');
                    response.body.should.have.property('data');
                    expect(Object.keys(data)).to.include.members(['user_id', 'title', 'datetime']);

                    done();
                })
        });

        it('It should not accept tags more than 4', (done) => {
            const payload = {
                user_id: 898223,
                title: "Big Ben",
                tags: ["Tag Base","Tag Base","Tag Base","Tiotle Tag", "Tiotle Tag"]
            };

            chai.request(app)
                .post('/api/v1/user/tickets')
                .send(payload)
                .end((error, response) => {
                    const errors = response.body.errors;

                    response.should.have.status(422);
                    response.body.should.be.an('object');
                    response.body.should.have.property('success').eq(false);
                    expect(errors).to.have.property('tags').eq('tags must not be more than 4');

                    done();
                })
        });
    });
});
  

  