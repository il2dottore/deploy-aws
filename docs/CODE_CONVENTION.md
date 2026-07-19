- CODE CONVENTION:
1. Tuân thủ TypeScript check
2. Tuân thủ ESLint check
3. Tuân thủ chuẩn cấu trúc thư mục tương tự như: `apps\auth\src\auth`

C:\Users\il2dottore\Documents\Projects\deploy-aws
├── apps
|  ├── auth
|  |  ├── src
|  |  |  ├── app.module.ts
|  |  |  ├── auth
|  |  |  |  ├── auth.controller.spec.ts
|  |  |  |  ├── auth.controller.ts
|  |  |  |  ├── auth.module.ts
|  |  |  |  ├── auth.service.spec.ts
|  |  |  |  ├── auth.service.ts
|  |  |  |  └── dtos
|  |  |  |     ├── login.dto.ts
|  |  |  |     └── register.dto.ts
|  |  |  ├── entities
|  |  |  |  ├── permission.entity.ts
|  |  |  |  ├── role-permission.entity.ts
|  |  |  |  ├── role.entity.ts
|  |  |  |  ├── user-role.entity.ts
|  |  |  |  └── user.entity.ts
|  |  |  ├── main.ts
|  |  |  └── user
|  |  |     ├── dtos
|  |  |     |  ├── requests
|  |  |     |  |  ├── batch-users.dto.ts
|  |  |     |  |  └── update-profile.dto.ts
|  |  |     |  └── responses
|  |  |     |     ├── login-response.dto.ts
|  |  |     |     └── user-profile.dto.ts
|  |  |     ├── user.controller.spec.ts
|  |  |     ├── user.controller.ts
|  |  |     ├── user.module.ts
|  |  |     ├── user.service.spec.ts
|  |  |     └── user.service.ts
|  |  └── tsconfig.app.json
|  └── upload
|     ├── src
|     |  ├── app.module.ts
|     |  ├── auth
|     |  ├── entities
|     |  |  └── upload.entity.ts
|     |  └── main.ts
|     └── tsconfig.app.json
├── docker
|  └── postgres
|     └── init-multipe-dbs.sh
├── docs
|  └── CODE_CONVENTION.md
├── eslint.config.mjs
├── libs
|  ├── auth
|  |  ├── src
|  |  |  ├── auth-lib.module.ts
|  |  |  ├── decorators
|  |  |  |  ├── current-user.decorator.ts
|  |  |  |  ├── optional-auth.decorator.ts
|  |  |  |  ├── permission.decorator.ts
|  |  |  |  ├── public.decorator.ts
|  |  |  |  └── role.decorator.ts
|  |  |  ├── guards
|  |  |  |  ├── jwt.guard.ts
|  |  |  |  ├── permission.guard.ts
|  |  |  |  └── role.guard.ts
|  |  |  ├── index.ts
|  |  |  ├── interfaces
|  |  |  |  └── jwt-payload.interface.ts
|  |  |  └── strategies
|  |  |     └── jwt.strategy.ts
|  |  └── tsconfig.lib.json
|  ├── common
|  |  ├── src
|  |  |  ├── dtos
|  |  |  |  └── api-response.dto.ts
|  |  |  ├── entities
|  |  |  |  └── base.entity.ts
|  |  |  ├── filters
|  |  |  |  └── http-exception.filter.ts
|  |  |  ├── index.ts
|  |  |  └── interceptors
|  |  |     └── transform.interceptor.ts
|  |  └── tsconfig.lib.json
|  ├── config
|  |  ├── src
|  |  |  ├── config.module.ts
|  |  |  ├── index.ts
|  |  |  └── namespaces
|  |  |     ├── database.config.ts
|  |  |     ├── jwt.config.ts
|  |  |     └── redis.config.ts
|  |  └── tsconfig.lib.json
|  ├── database
|  |  ├── src
|  |  |  ├── database.module.ts
|  |  |  └── index.ts
|  |  └── tsconfig.lib.json
|  └── redis
|     ├── src
|     |  ├── index.ts
|     |  ├── redis.constants.ts
|     |  └── redis.module.ts
|     └── tsconfig.lib.json
├── nest-cli.json
├── package.json
├── pnpm-lock.yaml
├── pnpm-workspace.yaml
├── README.md
├── scripts
|  └── seed-auth.ts
├── tsconfig.build.json
└── tsconfig.json