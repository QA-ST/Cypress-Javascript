exports.Loginpage = 

class Loginpage {

    usernameField = "#username";
    passwordField = "#password";
    signinButton = "#kc-login";

    loginWithValidCredentials(username, password)
    {
        cy.get(this.usernameField).type(username);
        cy.get(this.passwordField).type(password);
        cy.get(this.signinButton).click();
    }
}