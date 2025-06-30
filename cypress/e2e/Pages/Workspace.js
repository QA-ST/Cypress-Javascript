exports.Workspace =

    class Workspace {

        loggedUsername = '.workspaceName';
        goToProcessButton = "#Button_4";
        createFromScratchLink = "//p[normalize-space()='Create from Scratch']";
        searchProcess = "input[placeholder='Search'][type='search']";
        processNameTable = "//table/tbody/tr/td[1]/a";
        existingDescriptionButton = "//button[text()='Description ']";
        existingObjectiveButton = "//button[text()='Objectives ']";
        existingScopeButton = "//button[text()='Scope ']";
        existingDescription = "#Textarea_13_textarea";
        existingObjective = "#Textarea_14_textarea";
        existingScope = "#Textarea_15_textarea";
        editButton = "//button[text()='Edit ']";
        editDescriptionBox = "//label[normalize-space()='Description']/following::textarea[1]";
        editObjectiveBox = "//label[normalize-space()='Objectives']/following::textarea[1]";
        editScopeBox = "//label[normalize-space()='Scope']/following::textarea[1]";
        saveButtonDropDown = ".btn-group>button:nth-child(2)";
        saveAndCloseButton = ".btn-group>ul>li>div";
        rect = "(//div[contains(@class,'diagram-plane root')]//*[name()='svg']//*[name()='g' and contains(@class,'task root shape rect')])[1]";
        workTimeField = "(//input[@type='number'])[3]";
        waitTimeField = "(//input[@type='number'])[4]";
        workTimeText = "//p[normalize-space()='Work Time']/following::div[1]";
        waitTimeText = "//p[normalize-space()='Wait Time']/following::div[1]";

        clickOnGoToProcess() {
            cy.get(this.goToProcessButton).click();
        }

        searchExistingProcess(processName)
        {
            cy.get(this.searchProcess).type(processName);

            cy.xpath(this.processNameTable).each(($column, index, $columnList) => {
                        if($column.text()==processName)
                        {
                            cy.wrap($column).click();
                        }
            })
        }

        editProcessButton()
        {
            cy.wait(2000);
            cy.xpath(this.editButton).click();
            cy.wait(2000);
        }

        editDescription(desc)
        {
            cy.xpath(this.existingDescriptionButton).click();
            cy.xpath(this.editDescriptionBox).clear();
            cy.xpath(this.editDescriptionBox).type(desc);
        }

        editObjective(objective)
        {
            cy.xpath(this.existingObjectiveButton).click();
            cy.xpath(this.editObjectiveBox).clear();
            cy.xpath(this.editObjectiveBox).type(objective);
        }

        editScope(scope)
        {
            cy.xpath(this.existingScopeButton).click();
            cy.xpath(this.editScopeBox).clear();
            cy.xpath(this.editScopeBox).type(scope);
        }

        selectRectDiagram()
        {
            cy.xpath(this.rect).click();
            cy.wait(1500);
        }

        updateDiagramWorkAndWaitTime(workTime, waitTime)
        {
            cy.xpath(this.workTimeField).clear();
            cy.xpath(this.workTimeField).type(workTime);
            cy.xpath(this.waitTimeField).clear();
            cy.xpath(this.waitTimeField).type(waitTime);
        }

        getWorkTime()
        {
            return cy.xpath(this.workTimeText).should('exist').invoke('text');
        }

        getWaitTime()
        {
            return cy.xpath(this.waitTimeText).should('exist').invoke('text');
        }

        openCloseAll = "(//p[text()='Open/Close All'])[2]";
        descriptionBox2 = "(//label[normalize-space()='Description'])[2]/following::textarea[1]";

        saveAndClose()
        {
            cy.get(this.saveButtonDropDown).click();
            cy.get(this.saveAndCloseButton).click();
        }

        getExistingProcessDescription()
        {
            cy.xpath(this.existingDescriptionButton).click();
            cy.wait(1000);
            cy.get(this.existingDescription).click();
            return cy.get(this.existingDescription).should('exist').invoke('val');
        }

        getExistingProcessObjective()
        {
            cy.xpath(this.existingObjectiveButton).click();
            cy.wait(1000);
            cy.get(this.existingObjective).click();
            return cy.get(this.existingObjective).should('exist').invoke('val')
        }

        getExistingProcessScope()
        {
            cy.xpath(this.existingScopeButton).click();
            cy.wait(1000);
            return cy.get(this.existingScope).should('exist').invoke('val');
        }
    }