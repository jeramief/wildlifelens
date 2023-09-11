import {defineConfig} from 'sanity'
import {deskTool} from 'sanity/desk'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemas/Schema'

export default defineConfig({
  name: 'default',
  title: 'Wild Life Lens',

  projectId: 'hj9gs7g8',
  dataset: 'default',

  plugins: [deskTool(), visionTool()],

  schema: {
    types: schemaTypes,
  },
})
