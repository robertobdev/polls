# MyAdmin

## Create new module (crud)

1. Create module

```bash

ng g m pages/MODULE_NAME --routing

```

2. Create a base component for you module

```bash

ng g c pages/MODULE_NAME

```

> NOTE: Four files will be create, You just need .component file, delete the rest.

2.1 Code snippet for you .component

```bash
import { Component } from '@angular/core';

@Component({
  selector: 'app-components',
  template: ` <router-outlet></router-outlet> `,
})
export class MODULE_NAMEComponent {}

```

3. Create componets (REGISTER AND LIST)

```bash

ng g c pages/MODULE_NAME/register-MODULE_NAME
ng g c pages/MODULE_NAME/list-MODULE_NAME

```

4. Link APP Routing to your module

Add your created module into `pages-routing.module.ts` as lazy loading


5. Link your create components in your MODULE_NAME-routing.module.ts file
