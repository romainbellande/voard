# RoleForm

## Props

| Name           | Type  | Example                 | Default | Required | Description      |
|----------------|-------|-------------------------|---------|----------|------------------|
| allPermissions | Array | ['documents.users.get'] | []      | false    | role permissions |

## Events

| Name   | Example                                                       | Description                                 |
|--------|---------------------------------------------------------------|---------------------------------------------|
| submit | { name: 'SUPER_ADMIN', permissions: ['documents.users.get'] } | Event emitted regarding submitted user role |
