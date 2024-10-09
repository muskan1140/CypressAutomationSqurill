describe("template spec", () => {
    it("Create new account using valid and invalid credentials and test the validations ", () => {
        cy.visit("/");
        cy.contains("My instances").click();
        cy.get(".MuiTypography-body1 .MuiTypography-root").click();
        cy.get('[name="firstName"]').type("Test");
        cy.get('[name="lastName"]').type("TestLastName");
        cy.get('[name="email"]').type("testing");
        cy.get('[name="password"]').type("test@1234");
        cy.get('[name="password-confirm"]').type("test@1234");
        cy.get('[name="user.attributes.terms_and_conditions"]').click();
        cy.get('[name="user.attributes.accept_newsletter"]').click();
        cy.get('[name="action"]').click();
        cy.get(".MuiPaper-root").should("contain", "Invalid email address.");
        // correct the invalid email
        cy.get('[name="email"]').type("testing@gmail.com");
        cy.get('[name="password"]').type("test@1234");
        cy.get('[name="password-confirm"]').type("test@1234");
        cy.get('[name="user.attributes.terms_and_conditions"]').click();
        cy.get('[name="user.attributes.accept_newsletter"]').click();
        cy.get('[name="action"]').click();
        cy.get(".MuiPaper-root").should("contain", "Email already exists");
    });

    it("Assert email already exist", () => {
        cy.visit("/");
        cy.contains("My instances").click();
        cy.get(".MuiTypography-body1 .MuiTypography-root").click();
        cy.get('[name="firstName"]').type("Test");
        cy.get('[name="lastName"]').type("TestLastName");
        cy.get('[name="email"]').type("demo.testing.sq@gmail.com");
        cy.get('[name="password"]').type("test@1234");
        cy.get('[name="password-confirm"]').type("test@1234");
        cy.get('[name="user.attributes.terms_and_conditions"]').click();
        cy.get('[name="user.attributes.accept_newsletter"]').click();
        cy.get('[name="action"]').click();
    });

    it("Login with invalid credientials", () => {
        cy.visit("/");
        cy.contains("My instances").click();
        cy.get(
            ":nth-child(1)  > .MuiFormControl-fullWidth  .MuiFormControl-root"
        ).type("demo.testing.sq@gmail.com");
        cy.get(
            ":nth-child(2) > .MuiFormControl-fullWidth > .MuiFormControl-root"
        ).type("test@123433");
        cy.get(":nth-child(5) .MuiFormControl-root ").click();
        cy.get(".MuiPaper-root").should("contain", "Invalid username or password.");
    });

    it("Login with valid credientials", () => {
        cy.visit("/");
        cy.contains("My instances").click();
        cy.get(
            ":nth-child(1) > .MuiFormControl-fullWidth > .MuiFormControl-root"
        ).type("demo.testing.sq@gmail.com");
        cy.get(
            ":nth-child(2) > .MuiFormControl-fullWidth > .MuiFormControl-root"
        ).type("test@1234");
        cy.get(":nth-child(5) .MuiFormControl-root ").click();
        cy.get(".jss4").should("contain", "Squirro ID");
    });

    // #USER MANAGEMENT
    it("Test adding new users to the instance", () => {
        cy.visit("/");
        cy.contains("My instances").click();
        cy.get(
            ":nth-child(1) > .MuiFormControl-fullWidth > .MuiFormControl-root"
        ).type("kapoormuskan5678@gmail.com");
        cy.get(
            ":nth-child(2) > .MuiFormControl-fullWidth > .MuiFormControl-root"
        ).type("Muskank@&411");
        cy.get(":nth-child(5) .MuiFormControl-root ").click();
        cy.get(".jss4").should("contain", "Squirro ID");
        cy.get(
            ".MuiTypography-root > .MuiIconButton-label > .MuiSvgIcon-root"
        ).click();
        cy.get(":nth-child(2) > .MuiButtonBase-root > .MuiButton-label").click();
        cy.get(
            ":nth-child(1) > .MuiFormControl-root > .MuiInputBase-root > .MuiInputBase-input"
        ).type("muskankapoor8969@gmail.com")
        cy.get(".MuiButton-label").click();
        cy.get(".MuiTableBody-root > :nth-child(2) > :nth-child(1)").should("contain", "muskankapoor");
    });

    it("Verify role assignment and permissions", () => {
        cy.visit("/");
        cy.contains("My instances").click();
        cy.get(
            ":nth-child(1) > .MuiFormControl-fullWidth > .MuiFormControl-root"
        ).type("kapoormuskan5678@gmail.com");
        cy.get(
            ":nth-child(2) > .MuiFormControl-fullWidth > .MuiFormControl-root"
        ).type("Muskank@&411");
        cy.get(":nth-child(5) .MuiFormControl-root ").click();
        cy.get(
            ":nth-child(3) > .jss29 > .MuiBox-root > .MuiTypography-root"
        ).click();
        cy.get(":nth-child(2) > .MuiButtonBase-root > .MuiButton-label").click();
        cy.get(
            ":nth-child(1) > .MuiFormControl-root > .MuiInputBase-root > .MuiInputBase-input"
        ).type("muskankapoor8969@gmail.com")
        cy.get(".MuiGrid-root > .MuiButtonBase-root").click();
        cy.get(".MuiTableBody-root > :nth-child(2) > :nth-child(1)").should("contain", "muskankapoor");
        cy.get("#mui-component-select-role").click();
        cy.contains('Admins').click();
    });

    it("Test user removal process", () => {
        cy.visit("/");
        cy.contains("My instances").click();
        cy.get(
            ":nth-child(1) > .MuiFormControl-fullWidth > .MuiFormControl-root"
        ).type("kapoormuskan5678@gmail.com");
        cy.get(
            ":nth-child(2) > .MuiFormControl-fullWidth > .MuiFormControl-root"
        ).type("Muskank@&411");
        cy.get(":nth-child(5) .MuiFormControl-root ").click();
        cy.get(
            ":nth-child(3) > .jss29 > .MuiBox-root > .MuiTypography-root > .MuiIconButton-label > .MuiSvgIcon-root"
        ).click();
        cy.get(".MuiBox-root > .MuiButtonBase-root > .MuiButton-label").click();
    });

    // #Self-Service Setup
    it("Test data source connection process", { defaultCommandTimeout: 60000 }, () => {
        cy.visit("/");
        cy.get(".MuiPaper-root:eq(3)").click();
        cy.get(".jss19 > :nth-child(1)").click();
        cy.get(
            ":nth-child(1) > .MuiFormControl-fullWidth > .MuiFormControl-root"
        ).type("demo.testing.sq@gmail.com");
        cy.get(
            ":nth-child(2) > .MuiFormControl-fullWidth > .MuiFormControl-root"
        ).type("test@1234");
        cy.get(":nth-child(5) .MuiFormControl-root ").click();
        cy.get(".MuiGrid-container > :nth-child(2) > .MuiTypography-root")
            .invoke('removeAttr', 'target')
            .click();
        cy.wait(6000);
        cy.get(".autosized > .dashboard-grid > .wrapped-widget > .grid-stack-item-content").should('be.visible')
    });

    it("Verify all setup steps are present and in logical order", () => {
        cy.visit("https://gpt-test-drive-01.squirro.cloud/app/");
        cy.get(
            ":nth-child(1) > .MuiFormControl-fullWidth > .MuiFormControl-root"
        ).type("demo.testing.sq@gmail.com");
        cy.get(
            ":nth-child(2) > .MuiFormControl-fullWidth > .MuiFormControl-root"
        ).type("test@1234");
        cy.get(":nth-child(5) .MuiFormControl-root ").click();
        cy.wait(6000);
        cy.get("[data-testid='xEOdsJMPT5A2tmTiyYviJQ'] .MuiPaper-root").click();

    })
});
