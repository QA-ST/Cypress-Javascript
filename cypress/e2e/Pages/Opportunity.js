exports.Opportunity = 

class Opportunity {

    opportunityLink = "//button[normalize-space()='Go to Opportunity']";
    createNewOppLink = "//p[normalize-space()='Create New Opportunity']";
    oppNameField = "//label[normalize-space()='Name*']/following::input";
    priorityDropdown = "//select[@placeholder='Select Priority']";
    oppOwner = "(//span[normalize-space()='Select Opportunity Owner'])[1]";
    searchOwner = ".select2-search__field";
    selectFirstOwn = ".select2-results>ul>li:nth-child(1)";
    oppDescTextbox = "//label[normalize-space()='Opportunity Description']/following::textarea";
    saveOption = "//button[normalize-space()='Save']/following::button";
    saveAndCloseButton = ".dropdown-item[data-id='save-exit']";
    searchBoxTable = "input[type='search']";
    oppNameTable = "//table/tbody/tr/td[1]/a";

    navigatedToOpportunity()
    {
        cy.xpath(this.opportunityLink).click();
    }

    createNewOpportunity(oppName, priority, ownerName, oppDesc)
    {
        cy.xpath(this.createNewOppLink).click();
        cy.xpath(this.oppNameField).type(oppName);
        cy.xpath(this.priorityDropdown).select(priority);
        cy.xpath(this.oppOwner).click();
        cy.get(this.searchOwner).type(ownerName);
        cy.get(this.selectFirstOwn).click();
        cy.xpath(this.oppDescTextbox).type(oppDesc);
        cy.xpath(this.saveOption).click();
        cy.get(this.saveAndCloseButton).click();
    }

    verifyCreatedOpportunityFromTable(oppName)
    {
        cy.get(this.searchBoxTable).type(oppName);
        
        cy.xpath(this.oppNameTable).each(($column, index, $columnList) => {
            if($column.text()==oppName)
                {
                    cy.log(`Opportunity present in the table: ${$column.text()}`);
                    expect($column.text()).to.equal(oppName);
                    return false;
                }
            })
    }

    selectOpportunityFromTable(oppName)
    {
        cy.get(this.searchBoxTable).type(oppName);

        cy.xpath(this.oppNameTable).each(($column, index, $columnList) => {
            if($column.text()==oppName)
            {
                cy.wrap($column).click();
                return false;
            }
        })
    }

    editButton = "//button[normalize-space()='Edit']";
    typeDropdown = "//label[normalize-space()='Type']/following::select[1]";
    tagInput = "//label[normalize-space()='Tags']/following::textarea[1]";
    editROIAnalysisLink = "//li[normalize-space()='ROI Analysis']";
    timeHorizonButton = "//label[normalize-space()='Time Horizon']/following::button[1]";
    numberOfPeriodsField = "//p[normalize-space()='Number of Periods']/following::input[1]";
    saveTimeFrame = "//h6[normalize-space()='Set Time Frame']/following::button[text()='Save'][1]";
    interestRateField = "(//input[@placeholder='Add Rate'])[1]";
    inflationRateField = "(//input[@placeholder='Add Rate'])[2]";
    laborCostSavingEditButton = "((//table)[3]/tbody/tr/td[1]/span)[1]/button";
    errorReworkCostReductionButton = "((//table)[3]/tbody/tr/td[1]/span)[2]/button";
    softwareLicensingCostsButton = "((//table)[4]/tbody/tr/td[1]/span)[1]/button";
    implementationIntegrationCostsButton = "((//table)[4]/tbody/tr/td[1]/span)[2]/button";
    amountField = "//label[normalize-space()='Amount']/following::input[1]";
    savePopup = "//h6[normalize-space()='Edit Entry']/following::button[text()='Save'][1]";
    saveOptionsAfterEdit = "(//button[normalize-space()='Save']/following::button[1])[1]";
    saveAndCloseAfterEdit = "//li/div[normalize-space()='Save and Exit']";

    editOpportunity(type, tag)
    {
        cy.xpath(this.editButton).should('exist').click();
        cy.wait(5000);
        cy.xpath(this.typeDropdown).select(type);
        cy.xpath(this.tagInput).type(tag);
    }

    editROIAnalysis(years, interestRate, inflationRate, laborCostAmount, errorAndReworkCost, softwareCost, integrationCost)
    {
        cy.xpath(this.editROIAnalysisLink).click();
        cy.xpath(this.timeHorizonButton).click();
        cy.xpath(this.numberOfPeriodsField).clear();
        cy.xpath(this.numberOfPeriodsField).type(years);
        cy.xpath(this.saveTimeFrame).click();
        cy.wait(3000)  
 
        // Labor cost pop-up
        cy.xpath(this.laborCostSavingEditButton).click();
        cy.wait(2000)

        cy.xpath(this.amountField).clear(laborCostAmount);
        cy.xpath(this.amountField).type(laborCostAmount)
        cy.xpath(this.savePopup).click();
        cy.wait(2000)

        //Error & Rework Cost Reduction pop-up
        cy.xpath(this.errorReworkCostReductionButton).click();
        cy.wait(2000)

        cy.xpath(this.amountField).clear(errorAndReworkCost);
        cy.xpath(this.amountField).type(errorAndReworkCost)
        cy.xpath(this.savePopup).click();
        cy.wait(2000)

        // Software & Licensing Costs pop-up
        cy.xpath(this.softwareLicensingCostsButton).click();
        cy.wait(2000)

        cy.xpath(this.amountField).clear(softwareCost);
        cy.xpath(this.amountField).type(softwareCost)
        cy.xpath(this.savePopup).click();
        cy.wait(2000)

        // Implementation & Integration Costs pop-up
        cy.xpath(this.implementationIntegrationCostsButton).click();
        cy.wait(2000)

        cy.xpath(this.amountField).clear(integrationCost);
        cy.xpath(this.amountField).type(integrationCost)
        cy.xpath(this.savePopup).click();
        cy.wait(2000)

        cy.xpath(this.interestRateField).clear();
        cy.xpath(this.interestRateField).type(interestRate);
        cy.xpath(this.inflationRateField).clear();
        cy.xpath(this.inflationRateField).type(inflationRate);
    }

    saveAndCloseEditModel()
    {
        cy.xpath(this.saveOptionsAfterEdit).click();
        cy.xpath(this.saveAndCloseAfterEdit).click();
    }

    priorityAfterEdit = "//label[normalize-space()='Priority']/following::p[1]";
    typeAfterEdit = "//label[normalize-space()='Type']/following::p[1]";
    ownerAfterEdit = "//label[normalize-space()='Opportunity Owner']/following::div[1]/div[2]";
    descAfterEdit = "//h5[normalize-space()='Description']/following::p[1]";

    // Delete Opportunity
    actionButton = "//button[normalize-space()='Actions']";
    deleteOpportunityButton = "#deleteOpportunity";
    confirmYesDeletion = "//button[normalize-space()='Yes']";

    verifyPriority()
    {
        return cy.xpath(this.priorityAfterEdit).should('exist').invoke('text');
    }

    verifyType()
    {
        return cy.xpath(this.typeAfterEdit).should('exist').invoke('text');
    }

    verifyOwner()
    {
        return cy.xpath(this.ownerAfterEdit).should('exist').invoke('text');
    }

    verifyDesc()
    {
        return cy.xpath(this.descAfterEdit).should('exist').invoke('text');
    }

    clickOnROI()
    {
        cy.xpath(this.editROIAnalysisLink).click();
    }

    verifyTimeHoriZon()
    {
        return cy.xpath(this.timeHorizonButton).should('exist').invoke('text');
    }

    verifyInterestRate()
    {
        return cy.xpath(this.interestRateField).should('exist').invoke('text');
    }

    verifyInflationRate()
    {
        return cy.xpath(this.inflationRateField).should('exist').invoke('text');
    }

    deleteOpportunity()
    {
        cy.xpath(this.actionButton).click();
        cy.get(this.deleteOpportunityButton).click();

        cy.xpath(this.confirmYesDeletion).click();
    }
}