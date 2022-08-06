import { CollectionConfig } from 'payload/types';

const Hackathons: CollectionConfig = {
    slug: 'hackathons',
    auth: false,
    admin: {
        useAsTitle: 'name',
    },
    access: {
        read: () => true,
    },
    fields: [
        {
            name: 'name',
            type: 'text'
        },

        {
            name: 'maxParticipants',
            type: 'number'
        },
        {
            name: 'participants',
            type: 'number'
        },
        {
            name: 'prices',
            type: 'number'
        },
        {
            name: 'location',
            type: 'text'
        },
        {
            name: 'description',
            type: 'richText'
        },
        {
            name: 'requirements',
            type: 'richText'
        },
        {
            name: 'rules',
            type: 'richText'
        },
        {
            name: 'selection_criteria',
            label: "Selection Criteria",
            type: 'richText'
        },

        {
            name: 'prizes',
            type: 'richText'
        },
        {
            name: 'potraitImage', // required
            type: 'upload', // required
            relationTo: 'media', // required
            required: true,
        },
        {
            name: 'landscapeImage', // required
            type: 'upload', // required
            relationTo: 'media', // required
            required: true,
        },
        {
            name: 'type',
            type: 'select',
            options: [
                {
                    value: 'online',
                    label: 'Online',
                },
                {
                    value: 'onsite',
                    label: 'Onsite',
                },
            ],
            defaultValue: 'online',
            admin: {
                position: 'sidebar',
            }
        },
        {
            name: 'timepoint',
            type: 'select',
            options: [
              {
                value: 'past',
                label: 'Past'
              },
              {
                value: 'upcoming',
                label: 'Upcoming'
              },
              {
                value: 'ongoing',
                label: 'Ongoing'
              }
            ],
            defaultValue: 'upcoming',
            admin: {
              position: 'sidebar',
            }
          },
        {
            name: "setting",
            type: "select",
            options: [
                {
                    value: "public",
                    label: "Public"
                },
                {
                    value: "private",
                    label: "Private"
                }
            ],
            defaultValue: "public",
            admin: {
                position: "sidebar",
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
            name: 'applications',
            type: 'relationship',
            relationTo: 'applications',
            hasMany: true,
        },
        {
            name: 'tags',
            type: 'relationship',
            relationTo: 'tags',
            hasMany: true,
        },
        {
            name: 'hackathon_categories',
            type: 'relationship',
            relationTo: 'hackathon_categories',
            hasMany: true,
        },

    ],
    timestamps: true
};

export default Hackathons;