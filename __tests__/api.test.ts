import superagent from "supertest";
import "expect-puppeteer";

const baseUrl = "http://localhost:3000/";

const EVENTS_IDS = ["email_notifications", "sms_notifications"];

const eventEndpoint = 'events';
const userEndpoint = 'users';

const userEmail = "jean.dupond@example.com";
const userData = { "email": userEmail };

const mailEventDisabled = { "id": EVENTS_IDS[0], "enabled": false };
const mailEventEnabled = { "id": EVENTS_IDS[0], "enabled": true };
const smsEventDisabled = { "id": EVENTS_IDS[1], "enabled": false };
const smsEventEnabled = { "id": EVENTS_IDS[1], "enabled": true };

const failEventEnabled = { "id": "something_else", "enabled": true };

const agent = superagent.agent(baseUrl);

describe('API Success', () => {

  test('Get current User before inserting - Status 401', async() => {
    const response = await agent.get(userEndpoint);
    expect(response.statusCode).toBe(401);
  });

  test('Create a non existing User - Status 200', async() => {
    const response = await agent.post(userEndpoint).send(userData);
    expect(response.statusCode).toBe(200);
    expect(response.body.email).toBe(userEmail);
    expect(response.body.consents).toHaveLength(0);
  });

  test('Create an existing User - Status 422', async() => {
    const response = await agent.post(userEndpoint).send(userData);
    expect(response.statusCode).toBe(422);
  });

  test('Get current User empty consents - Status 200', async() => {
    const response = await agent.get(userEndpoint);
    expect(response.statusCode).toBe(200);
    expect(response.body.email).toBe(userEmail);
    expect(response.body.consents).toHaveLength(0);
  });

  test('Create a new MAIL Event Enabled - Status 200', async() => {
    const response = await agent.post(eventEndpoint).send(mailEventEnabled);
    expect(response.statusCode).toBe(200);
    expect(response.body.consents).toHaveLength(1);
    expect(response.body.consents[0].id).toBe(EVENTS_IDS[0]);
    expect(response.body.consents[0].enabled).toBeTruthy();
  });

  test('Create a new SMS Event Enabled - Status 200', async() => {
    const response = await agent.post(eventEndpoint).send(smsEventEnabled);
    expect(response.statusCode).toBe(200);
    expect(response.body.consents).toHaveLength(2);
    expect(response.body.consents[0].id).toBe(EVENTS_IDS[0]);
    expect(response.body.consents[0].enabled).toBeTruthy();
    expect(response.body.consents[1].id).toBe(EVENTS_IDS[1]);
    expect(response.body.consents[1].enabled).toBeTruthy();
  });

  test('Get current User two enabled consents - Status 200', async() => {
    const response = await agent.get(userEndpoint);
    expect(response.statusCode).toBe(200);
    expect(response.body.email).toBe(userEmail);
    expect(response.body.consents).toHaveLength(2);
    expect(response.body.consents[0].id).toBe(EVENTS_IDS[0]);
    expect(response.body.consents[0].enabled).toBeTruthy();
    expect(response.body.consents[1].id).toBe(EVENTS_IDS[1]);
    expect(response.body.consents[1].enabled).toBeTruthy();
  });

  test('Create a new SMS Event Disabled - Status 200', async() => {
    const response = await agent.post(eventEndpoint).send(smsEventDisabled);
    expect(response.statusCode).toBe(200);
  });

  test('Create a new MAIL Event Disabled - Status 200', async() => {
    const response = await agent.post(eventEndpoint).send(mailEventDisabled);
    expect(response.statusCode).toBe(200);
  });

  test('Get current User two disabled consents - Status 200', async() => {
    const response = await agent.get(userEndpoint);
    expect(response.statusCode).toBe(200);
  });

  test('Create a new Unknown Event - Status 422', async() => {
    const response = await agent.post(eventEndpoint).send(failEventEnabled);
    expect(response.statusCode).toBe(422);
  });

  test('Delete current User - Status 200', async() => {
    const response = await agent.delete(userEndpoint);
    expect(response.statusCode).toBe(200);
  });

  test('Get current User after delete - Status 401', async() => {
    const response = await agent.get(userEndpoint);
    expect(response.statusCode).toBe(401);
  });
  
});