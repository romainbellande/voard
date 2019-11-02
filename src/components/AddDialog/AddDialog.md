# AddDialog

Simple dialog to add something.

## Props

| Name        | Type    | Default | Required | Description                       |
|-------------|---------|---------|----------|-----------------------------------|
| title       | String  | /       | true     | Dialog title                      |
| description | String  | /       | true     | Dialog description                |
| dialog      | Boolean | false   | false    | Manage if the dialog must be open |

## Events

| Name  | Example | Description                                           |
|-------|---------|-------------------------------------------------------|
| close | false   | Event emitted when the dialog must be closed or not   |
| add   | /       | Event emitted when the add button has been clicked on |

## Slots

| Name      | Props | Description                             |
|-----------|-------|-----------------------------------------|
| (default) | /     | Slot to replace the default dialog body |
