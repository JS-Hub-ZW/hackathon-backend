import { CollectionConfig } from 'payload/types';

const Sponsors: CollectionConfig = {
  slug: 'sponsors',
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
        name: 'imageURL',
        label: "Image URL",
        type: 'text',
      },
  ],
  timestamps: false,
}

export default Sponsors;