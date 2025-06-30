// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

// @ts-ignore
/// <reference types="Cypress" />

/// <reference types="cypress-xpath"/>

import '@4tw/cypress-drag-drop'
import 'cypress-real-events/support'
import 'cypress-file-upload';   


/* Not work
// over-write contains() command to it work without matchCase
Cypress.Commands.overwriteQuery('contains', (originalFn, subject, filter, text, options = {})=>{

    //add custom statement
    options.matchCase = false

    return originalFn(subject, filter, text, options)
}) */