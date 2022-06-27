import { CollectionConfig } from 'payload/types';

const Applications: CollectionConfig = {
  slug: 'applications',
  auth: true,
  access: {
    read: () => true,
  },
  fields: [
    {
        name: 'message',
        type: 'richText'
      },
    {
        name: 'agreed_to_requirements',
        type: 'checkbox',
        defaultValue: false,
        
      },
    {
        name: 'agreed_to_rules',
        type: 'checkbox',
        defaultValue: false,

      },

    {
        name: 'teammates',
        type: 'select',
        options: [
          {
            value: 'solo',
            label: 'Working Solo',
          },
          {
            value: 'looking',
            label: 'Looking for a Team',
          },
          {
            value: 'assembling',
            label: 'Assembling a Team',
          },
          {
            value: 'teamed',
            label: 'Have a Team',
          },
        ],
        defaultValue: 'looking',
        admin: {
          position: 'sidebar',
        }
      },
    {
        name: 'approved',
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

      {
        name: 'date',
        type: 'date',
      },

    // Relationships
    {
      name: 'users',
      type: 'relationship',
      relationTo: 'users',
      hasMany: false,
    },
  ],
};

export default Applications;