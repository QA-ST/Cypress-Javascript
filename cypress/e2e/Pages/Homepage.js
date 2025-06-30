exports.Homepage = 

class Homepage {

        loginButton = ".button.login";

        navigatedToLoginPage()
        {
            cy.get(this.loginButton).invoke('removeAttr', 'target').click();
        }

}