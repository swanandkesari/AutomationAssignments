# Automation Test Plan - DemoQA

## 1. Elements (Current Focus)
- [x] **Home Page**: Verify category cards (Implemented).
- [x] **Text Box**: Verify form submission and output. (Implemented)
- [x] **Check Box**: Verify expand/collapse and selection logic. (Implemented)
- [ ] **Radio Button**: Verify selection and "disabled" state handling.
- [ ] **Web Tables**: Verify adding, editing, and deleting rows.
- [ ] **Buttons**: Verify double click, right click, and dynamic click.

## 2. Forms
- [ ] **Practice Form**:
  - Fill all fields (Text, Radio, Checkbox, Dropdown).
  - Upload picture.
  - Handle Date Picker.
  - Validate modal with submitted data.

## 3. Alerts, Frame & Windows
- [ ] **Browser Windows**: Handle new tab and new window creation.
- [ ] **Alerts**: Handle JS Alerts, Confirm boxes, and Prompts.
- [ ] **Frames**: Switch context to IFrame and interact with elements.
- [ ] **Nested Frames**: Navigate parent/child frames.

## 4. Widgets
- [ ] **Accordian**: Verify collapse/expand behavior.
- [ ] **Auto Complete**: Verify multi-select and single-select suggestions.
- [ ] **Date Picker**: Select date and time.

## 5. Interactions
- [ ] **Sortable**: Drag and drop to reorder list/grid.
- [ ] **Droppable**: Drag element to target area.
- [ ] **Resizable**: Resize box and verify dimensions.

#Current Folder structure:
javascript/PlaywrightJs/features/
├── config.js
├── menu_steps.js
└── support/
    └── logger.js

javascript/PlaywrightJs/
├── config/
│   └── app_config.js       <-- Moved from features/config.js
├── features/
│   ├── home.feature
│   ├── step_definitions/
│   │   └── menu_steps.js   <-- Moved here
│   └── support/
│       └── logger.js
└── TEST_PLAN.md            <-- New file recommended below
