module.exports = {
    baseURL: 'https://demoqa.com',
    home: {
        url: '/',
        selectors: {
            categoryCards: '.card',
            categoryTitle: '.card-body h5'
        }
    },
    textBox: {
        url: '/text-box',
        selectors: {
            fullName: '#userName',
            email: '#userEmail',
            currentAddress: '#currentAddress',
            permanentAddress: '#permanentAddress',
            submit: '#submit',
            output: '#output'
        }
    },
    checkBox: {
        url: '/checkbox',
        selectors: {
            expandButton: '.rct-option-expand-all',
            collapseButton: '.rct-option-collapse-all',
            result: '#result',
            checkboxLabel: '.rct-title',
            checkbox: '.rct-item-label:has-text("{name}") >> span'
        }
    },
    menu: {
        url: '/menu',
        selectors: {
            mainItem1: 'a:has-text("Main Item 1")',
            mainItem2: 'a:has-text("Main Item 2")',
            mainItem3: 'a:has-text("Main Item 3")',
            subSubList: 'a:has-text("Sub Sub List")',
            subSubItem2: 'a:has-text("Sub Sub Item 2")'
        }
    }
};
