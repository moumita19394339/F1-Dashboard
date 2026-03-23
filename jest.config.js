const nextJest = require('next/jest')

const createJestConfig = nextJest({
  dir: './',
})

const customJestConfig = {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testMatch: ['**/test/**/*.test.ts?(x)'],
  collectCoverageFrom: ['components/admin/DataTable.tsx',
  'components/admin/DeleteConfirmModal.tsx',
  'components/admin/ProtectedRoute.tsx',
  'components/admin/Sidebar.tsx',
  'lib/api/client.ts',
  'lib/hooks/useAuth.tsx']
}

module.exports = createJestConfig(customJestConfig)