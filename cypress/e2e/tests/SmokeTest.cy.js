// @ts-ignore.ts
/// <reference types="Cypress" />

const { Homepage } = require("../Pages/Homepage");
const { Loginpage } = require("../Pages/Loginpage");
const { Opportunity } = require("../Pages/Opportunity");
const { Workspace } = require("../Pages/Workspace");


describe('Smoke Test', { viewportWidth: 1920, viewportHeight: 1080 }, () => {

    let data;

    before('read data', ()=>{

        cy.fixture('testData.json').then((fixtureData)=>{
            data = fixtureData;
        });

    });

    beforeEach(()=>{ 
        
        cy.visit(data.baseUrl);

        const homepage = new Homepage();
        const login = new Loginpage();

        // Navigated to Login Page
        homepage.navigatedToLoginPage();

        // user login
        login.loginWithValidCredentials(data.username, data.password);

        // handle uncaught exceptions
        Cypress.on('uncaught:exception', (err, runnable) => {
            return false;
        });

    });

    it('Create Opportunity Verify', ()=>{

        const opportunity = new Opportunity();

        // navigated to Opportunity module
        opportunity.navigatedToOpportunity();

        // Create new Opportunity
        opportunity.createNewOpportunity(data.oppName, data.oppPriority, data.oppOwnerName, data.oppDescription);

        // Verify created Opportunity from data-table
        opportunity.verifyCreatedOpportunityFromTable(data.oppName);

    });

    it('Edit Opportunity And Verify', ()=>{

        const opportunity = new Opportunity();

        // navigated to Opportunity module
        opportunity.navigatedToOpportunity();

        // Select Opportunity from data-table
        opportunity.selectOpportunityFromTable(data.oppName);
        cy.wait(3000);

        // Edit Opportunity data
        opportunity.editOpportunity(data.oppType, data.oppTag+'{enter}');

        // Edit ROI Analysis section data
        opportunity.editROIAnalysis(data.roiYears, data.roiInterestRate, data.roiInflationRate, data.roiLaborCostAmount, data.roiErrorAndReworkCost, data.roiSoftwareCost, data.roiIntegrationCost);

        // Save and close Edit Functionality
        opportunity.saveAndCloseEditModel();

        cy.wait(3000);

        // Validate Priority after Edit
        opportunity.verifyPriority().then((priority) => {
            cy.log(`Priority : ${priority}`);
            expect(priority).to.contains(data.oppPriority);
        });

        // Validate type after Edit
        opportunity.verifyType().then((type) => {
            cy.log(`Type : ${type}`);
            expect(type).to.contains(data.oppType);
        });

        // Validate Owner name after Edit
        opportunity.verifyOwner().then((ownerName) => {
            cy.log(`Owner Name : ${ownerName}`);
            expect(ownerName).to.contains(data.oppOwnerName);
        });

        // Validate Desc after Edit
        opportunity.verifyDesc().then((desc) => {
            cy.log(`Desc : ${desc}`);
            expect(desc).to.contains(data.oppDescription);
        });

        opportunity.clickOnROI();

        // Validate Time HoriZon name after Edit
        opportunity.verifyTimeHoriZon().then((timeHorizon) => {
            cy.log(`Time HoriZon : ${timeHorizon}`);
            expect(timeHorizon).to.contains(data.roiYears);
        });
        
        cy.wait(3000);

        // Validate Interest Rate after Edit
        opportunity.verifyInterestRate().then((interestRate) => {
            cy.log(`Interest Rate : ${interestRate}`);
        });

        // Validate Inflation Rate after Edit
        opportunity.verifyInflationRate().then((inflationRate) => {
            cy.log(`Inflation Rate : ${inflationRate}`);
        });

    });

    it('Delete Opportunity And Verify', ()=>{

        const opportunity = new Opportunity();

        // Navigated to Opportunity module
        opportunity.navigatedToOpportunity();

        // select Opportunity
        opportunity.selectOpportunityFromTable(data.oppName);
        cy.wait(3000);

        // Delete Opportunity
        opportunity.deleteOpportunity();
        cy.wait(2000);

        // validate deletion with redirected url
        cy.url().should('equal', data.oppHomeUrl);

    });


    it('Verify Existing Process Details', () => {

        const workspace = new Workspace();

        // Select Go to Process
        workspace.clickOnGoToProcess();

        // Select Existing process
        workspace.searchExistingProcess(data.processName);

        // Open edit functionality
        workspace.editProcessButton();

        // Edit description
        workspace.editDescription(data.processDesc);

        // Edit objective
        workspace.editObjective(data.processObjective);

        // Edit scope
        workspace.editScope(data.processScopeName);

        // Select Canvas Diagram
        workspace.selectRectDiagram();

        // Update Diagram content
        workspace.updateDiagramWorkAndWaitTime(data.processWorkTime, data.processWaitTime);

        // Save and close opened Process
        workspace.saveAndClose();

        cy.wait(5000);
        
        // Validate process description
        workspace.getExistingProcessDescription().then((desc) => {
            cy.log(`Process description is: ${desc}`);
            expect(desc).to.equal(data.processDesc);
        });

        cy.wait(2000);

        // Validate process objective
        workspace.getExistingProcessObjective().then((objective) => {
            cy.log(`Process objective is: ${objective}`);
            expect(objective).to.equal(data.processObjective);
        });

        cy.wait(2000);

        // validate process scope
        workspace.getExistingProcessScope().then((scope) => {
            cy.log(`Process scope is: ${scope}`);
            expect(scope).to.equal(data.processScopeName);
        });

        // select rect diagram
        workspace.selectRectDiagram();

        // validate Canvas diagram content
        workspace.getWorkTime().then((workTime) => {
            cy.log(`Work Time : ${workTime}`);
            expect(workTime).to.contains(data.processWorkTime);
        });

        // validate Canvas diagram content
        workspace.getWaitTime().then((waitTime) => {
            cy.log(`Wait Time : ${waitTime}`);
            expect(waitTime).to.contains(data.processWaitTime);
        });

    });

});