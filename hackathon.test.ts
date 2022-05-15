import { setupTestRunner } from '@keystone-6/core/testing';
import config  from './keystone';

const runner = setupTestRunner({ config });

describe('User Tests', () => {

    test('Can register user', 
        runner(async ({ context }) => {
        // We can use the context argument provided by the test runner to access
        // the full context API.
        const person = await context.query.User.createOne({
          data: { 
              name: 'Alice', 
              email: 'alice@example.com', 
              password: 'super-secret',
              role: 'guest' 
          },
          query: 'id name email password { isSet }',
        });

        expect(person.name).toEqual('Alice');
        expect(person.email).toEqual('alice@example.com');
        expect(person.password.isSet).toEqual(true);
      }))


      test(
        'Create a Person using a hand-crafted GraphQL query sent over HTTP',
        runner(async ({ graphQLRequest }) => {
          // We can use the graphQLRequest argument provided by the test runner
          // to execute HTTP requests to our GraphQL API and get a supertest
          // "Test" object back. https://github.com/visionmedia/supertest
          const { body } = await graphQLRequest({
            query: `mutation {
              createUser(data: { name: "Thomas Alderson", email: "thomas@example.com", password: "super-secret" role: "guest" }) {
                id name email password { isSet }
              }
            }`,
          }).expect(200);
          const person = body.data.createUser;

          console.log("The Person: ", person)
          expect(person.name).toEqual('Thomas Alderson');
          expect(person.email).toEqual('thomas@example.com');
          expect(person.password.isSet).toEqual(true);
        })
      );


})