import { buildConfig } from 'payload/config';
import path from 'path';
import Categories from './collections/Categories';
import Posts from './collections/Posts';
import Tags from './collections/Tags';
import Users from './collections/Users';
import Hackathons from './collections/Hackathons';
import Applications from './collections/Applications';
import Hackers from './collections/Hackers';
import Hosters from './collections/Hosters';
import HackathonCategories from './collections/HackathonCategories';
import Media from './collections/Media';
import Sponsors from './collections/Sponsors';
import Contributers from './collections/Contributers';


export default buildConfig({
  serverURL: 'http://localhost:4000',
  admin: {
    user: Users.slug,
  },
  collections: [
    Categories,
    Posts,
    Tags,
    Users,
    Hackathons,
    HackathonCategories,
    Applications,
    Hackers,
    Hosters,
    Sponsors,
    Contributers,
    Media
  ],
  typescript: {
    outputFile: path.resolve(__dirname, 'payload-types.ts')
  },
});
