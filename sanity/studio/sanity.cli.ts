import {defineCliConfig} from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: '4y88u6cf',
    dataset: 'production'
  },
  deployment: {
    appId: 'y0b8rnfz7riipbx459jizecz',
  },
  autoUpdates: true,
})
