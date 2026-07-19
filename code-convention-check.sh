# Lint check
echo "========== Lint check =========="
npm run lint
# TypeScript check
echo "========== TypeScript check =========="
npx tsc -p tsconfig.build.json --noEmit
