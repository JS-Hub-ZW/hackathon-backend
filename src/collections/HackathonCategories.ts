import { CollectionConfig } from 'payload/types';

const HackathonCategories: CollectionConfig = {
  slug: 'hackathon_categories',
  labels: {
    singular: 'Hackathon Category',
    plural: 'Hackathon Categories',
  },
  admin: {
    useAsTitle: 'name',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
    },
  ],
  timestamps: false,
}

export default HackathonCategories;