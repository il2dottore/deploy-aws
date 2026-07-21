- CODE CONVENTION:
1. Tuân thủ TypeScript check
2. Tuân thủ ESLint check
3. Tuân thủ chuẩn cấu trúc thư mục tương tự như: `apps\auth\src\auth`

- KHI THÊM LIBRARY:
1. Kiểm tra đã tạo file `tsconfig.lib.json` chưa?
```json
{
  "extends": "../../tsconfig.json",
  "compilerOptions": {
    "declaration": true,
    "outDir": "../../dist/libs/libName",
    "rootDir": "src"
  },
  "include": [
    "src/**/*.ts"
  ]
}
```

2. Kiểm tra file `index.ts` đã export các file cần thiết chưa?
```typescript
export * from './redis.module';
export * from './redis.constants';
```

3. Kiểm tra WebPack đã thêm vào `resolve.alias` chưa?
```javascript
module.exports = {
  resolve: {
    extensions: ['.ts', '.js'],
    alias: {
      '@app/libName': root('libs/libName/src')
    }
  }
}
```

4. Kiểm tra file `tsconfig.json` đã thêm `"@app/libName": ["./libs/libName/src"]` chưa?