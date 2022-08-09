import { CollectionConfig } from 'payload/types';

const Contributers: CollectionConfig = {
  slug: 'contributers',
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
    {
        name: 'url',
        type: 'text',
    },
    {
        name: 'imageURL',
        label: "Image URL",
        type: 'text',
    },
    {
        name: 'role',
        type: 'text',
    }
  ],
  timestamps: false,
}

export default Contributers;