
import { list } from '@keystone-6/core';
import {
  text,
  relationship,
  password,
  timestamp,
  select,
  decimal,
  integer,
  image
} from '@keystone-6/core/fields';
import { document } from '@keystone-6/fields-document';
import { Lists } from '.keystone/types';
import Session from './types/session';


// Check roles 
const isAdmin = ({ session }: { session: Session }) => session?.data.role == "admin";
const isHacker = ({ session }: { session: Session }) => session?.data.role == "hacker";
const isHoster = ({ session }: { session: Session }) => session?.data.role == "hoster";
const isHosterOrAdmin = ({ session }: { session: Session }) => session?.data.role == "hoster" || session?.data.role == "admin";


// Other checks
const ownsResource = ({ session, item }: {session: Session, item: any  }) => {
   let userRole = session?.data.role
   let userId = session?.data.id

   if (userRole == "admin"){
      return true
   }else{
     if (item.user.id == userId){
       return true
     }
   }

   return false
}

const filterUsers = ({ session }: { session: Session }) => {
  if (session == undefined) return false
  if (session?.data.role == "admin") return true

  return { id: {equals: session?.data.id} }
}

export const lists: Lists = {

  /*
   *  -> For storing users
   */
  User: list({
    access: {
      item: {
        update: ownsResource,
        delete: ownsResource,
      },
      filter: {
        query: filterUsers
      }
    },
    fields: {
      name: text({ validation: { isRequired: true } }),
      email: text({
        validation: { isRequired: true },
        isIndexed: 'unique',
        isFilterable: true,
      }),
      password: password({ validation: { isRequired: true } }),
      posts: relationship({ ref: 'Post.author', many: true }),
      role: select({
        options: [
          { label: 'Admin', value: 'admin' },
          { label: 'Hacker', value: 'hacker' },
          { label: 'Hoster', value: 'hoster' },
          { label: 'Writer', value: 'Writer' },
          { label: 'Guest', value: 'guest' },
        ],
        defaultValue: 'guest',
        ui: {
          displayMode: 'segmented-control',
        },
      }),
      hacker: relationship({
        ref: 'Hacker.user',
        many: false
      }),
      hoster: relationship({
        ref: 'Hoster.user',
        many: false
      }),
      hackathons: relationship({
        ref: 'Hackathon',
        many: false
      }),
      applications: relationship({
        ref: 'Application',
        many: true
      })
    },
    ui: {
      listView: {
        initialColumns: ['name', 'role'],
      },
    },
  }),
  

  /*
   *  -> For storing posts
   */
  Post: list({
    fields: {
      title: text(),
      status: select({
        options: [
          { label: 'Published', value: 'published' },
          { label: 'Draft', value: 'draft' },
        ],
        defaultValue: 'draft',
        ui: {
          displayMode: 'segmented-control',
        },
      }),
      content: document({
        formatting: true,
        layouts: [
          [1, 1],
          [1, 1, 1],
          [2, 1],
          [1, 2],
          [1, 2, 1],
        ],
        links: true,
        dividers: true,
      }),
      publishDate: timestamp(),
      author: relationship({
        ref: 'User.posts',
        ui: {
          displayMode: 'cards',
          cardFields: ['name', 'email'],
          inlineEdit: { fields: ['name', 'email'] },
          linkToItem: true,
          inlineCreate: { fields: ['name', 'email'] },
        },
      }),
      tags: relationship({
        ref: 'Tag.posts',
        ui: {
          displayMode: 'cards',
          cardFields: ['name'],
          inlineEdit: { fields: ['name'] },
          linkToItem: true,
          inlineConnect: true,
          inlineCreate: { fields: ['name'] },
        },
        many: true,
      }),
    },
  }),
  


  /*
   *  -> For storing post tags
   */
  Tag: list({
    ui: {
      isHidden: true,
    },
    fields: {
      name: text(),
      posts: relationship({ ref: 'Post.tags', many: true }),
    },
  }),



  /*
   *  -> For storing hackathons
   */
  Hackathon: list({
    access: {
      operation: {

        create: isHosterOrAdmin,
      },
      item: {
        update: ownsResource,
        delete: ownsResource
      }
    },
    fields: {
      approved: select({
        options: [
          { label: 'Yes', value: 'yes' },
          { label: 'No', value: 'no' },
        ],
        defaultValue: 'no',
        ui: {
          displayMode: 'segmented-control',
        },
      }),
      name: text(),
      type: select({
        options: [
          { label: 'Online', value: 'online' },
          { label: 'On Site', value: 'on-site' },
        ],
        defaultValue: 'online',
        ui: {
          displayMode: 'segmented-control',
        },
      }),
      maxParticipants: integer(),
      participants: integer(),
      date: timestamp(),
      prices: integer(),
      location: text(),
      description: document({
        formatting: true,
        layouts: [
          [1, 1],
          [1, 1, 1],
          [2, 1],
          [1, 2],
          [1, 2, 1],
        ],
        links: true,
        dividers: true,
      }),
      rules: document({
          formatting: true,
          layouts: [
            [1, 1],
            [1, 1, 1],
            [2, 1],
            [1, 2],
            [1, 2, 1],
          ],
          links: true,
          dividers: true,
      }),
      landscapeImage: image(),
      potraitImage: image(),
      tags: relationship({
        ref: 'HackTag.hackathons',
        ui: {
          displayMode: 'cards',
          cardFields: ['name'],
          inlineEdit: { fields: ['name'] },
          linkToItem: true,
          inlineConnect: true,
          inlineCreate: { fields: ['name'] },
        },
        many: true,
      }),
      applications: relationship({
        ref: 'Application.hackathon',
        many: true
      }),
      user: relationship({
        ref: "User",
        many: false
      })
     
    }
  }),

  /*
   *  -> For storing hackathon tags
   */
  HackTag: list({
    ui: {
      isHidden: true,
    },
    fields: {
      name: text(),
      hackathons: relationship({ ref: 'Hackathon.tags', many: true }),
    },
  }),


  /*
   *  -> For storing applications
   */
  Application: list({
    access: {
      operation: {
        create: isHacker || isHoster || isAdmin,
      },
      item: {
        update: ownsResource,
        delete: ownsResource
      }
    },
    fields: {
      authorized: integer(),
      message: document({
        formatting: true,
        layouts: [
          [1, 1],
          [1, 1, 1],
          [2, 1],
          [1, 2],
          [1, 2, 1],
        ],
        links: true,
        dividers: true,
      }),
      hacker: relationship({
        ref: 'Hacker',
        many: false
      }),
      hackathon: relationship({
        ref: 'Hackathon.applications',
        many: false
      }),
      user: relationship({ ref: 'User', many: false})

    }
  }),


  /*
   *  -> For storing hackers data
   */
  Hacker: list({
    fields: {
      image: text(),
      linkedin: text(),
      github: text(),
      gitlab: text(),
      user: relationship({
        ref: 'User.hacker',
        many: false
      }),
      subscribed: integer()
    }
  }),

  /*
   *  -> For storing hosters
   */
  Hoster: list({
    fields: {
      image: text(),
      name: text(),
      location: text(),
      linkedin: text(),
      twitter: text(),
      facebook: text(),
      user: relationship({
        ref: 'User.hoster',
        many: false
      }),
      subscribed: integer()
    }
  })
};
