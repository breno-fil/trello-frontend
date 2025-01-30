export { }
declare global {
  namespace Cypress {
    interface Chainable {
      signupApi: typeof signupApi;
    }
  }
}

/**
 * Creates a new user using the API
 * @param email user email 
 * @param password user password
 * @param login defaults to true, logs in the user
 * @example
 * cy.signupApi({ email: 'fulano@gmail.com', password: 'nbusr123', login: false })
 */
export const signupApi = function (this: any, { email, password, login = true }: { email: string, password: string, login?: boolean }) {

  cy
    .request('POST', 'http://localhost:3000/api/signup', {
      email, password
    }).then(({ body }) => {
      if (login) cy.setCookie('auth_token', body.accessToken)
      cy.wrap(body).as('user');
    });

};