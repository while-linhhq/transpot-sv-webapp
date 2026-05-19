import { defineConfig, devices } from '@playwright/test';

const useExistingServers = process.env.USE_EXISTING_SERVERS === '1';

export default defineConfig({
  testDir: './e2e',
  fullyParallel: false,
  workers: 1,
  retries: 0,
  reporter: 'list',
  use: {
    baseURL: 'http://localhost:3000',
    trace: 'on-first-retry',
  },
  projects: [{ name: 'chromium', use: { ...devices['Desktop Chrome'] } }],
  webServer: useExistingServers
    ? undefined
    : [
        {
          command: 'pnpm --filter server dev',
          url: 'http://localhost:4000/api/v1/health',
          reuseExistingServer: true,
          timeout: 120000,
        },
        {
          command: 'pnpm --filter client dev',
          url: 'http://localhost:3000',
          reuseExistingServer: true,
          timeout: 120000,
        },
      ],
});
