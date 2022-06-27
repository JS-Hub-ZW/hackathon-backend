import { CollectionConfig } from 'payload/types';

const Users: CollectionConfig = {
  slug: 'users',
  auth: true,
  admin: {
    useAsTitle: 'email',
  },
  access: {
    read: () => true,
  },
  fields: [
    // Email added by default
    {
      name: 'name',
      type: 'text',
    },
    {
      name: 'role',
      type: 'select',
      options: [
        {
          value: 'admin',
          label: 'Admin',
        },
        {
          value: 'hacker',
          label: 'Hacker',
        },
        {
          value: 'hoster',
          label: 'Hoster',
        },
        {
          value: 'writer',
          label: 'Writer',
        },
        {
          value: 'guest',
          label: 'Guest',
        },
      ],
      defaultValue: 'guest',
      admin: {
        position: 'sidebar',
      }
    },

    // Relationships
    {
      name: 'hackathons',
      type: 'relationship',
      relationTo: 'hackathons',
      hasMany: true,
    },
    {
      name: 'applications',
      type: 'relationship',
      relationTo: 'applications',
      hasMany: true,
    },
  ],
};

export default Users;