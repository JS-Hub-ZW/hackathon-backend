import { CollectionConfig } from 'payload/types';

const Hosters: CollectionConfig = {
  slug: 'hosters',
  auth: true,
  access: {
    read: () => true,
  },
  fields: [
    {
        name: 'image',
        type: 'text'
    },
    {
        name: 'linkedin',
        type: 'text'
    },
    {
        name: 'twitter',
        type: 'text'
    },
    {
        name: 'website',
        type: 'text'
    },
    {
        name: 'subscribed',
        type: 'checkbox',
        defaultValue: false,
    },

    {
        name: 'banned',
        type: 'select',
        options: [
          {
            value: 'yes',
            label: 'Yes',
          },
          {
            value: 'no',
            label: 'No',
          },
        ],
        defaultValue: 'no',
        admin: {
          position: 'sidebar',
        }
      },

    // Relationships
    {
      name: 'users',
      type: 'relationship',
      relationTo: 'users',
      hasMany: false,
    },
    {
      name: 'applications',
      type: 'relationship',
      relationTo: 'applications',
      hasMany: true,
    },
  ],
};

export default Hosters;