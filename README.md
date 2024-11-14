# Legislative News Aggregator

This is a [Next.js](https://nextjs.org) project designed to aggregate and display legislative news from multiple sources, allowing users to filter articles by state and topic. The application leverages Prisma for database interactions, caching strategies to enhance performance, and server components for efficient data fetching and rendering.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## !! Important !!

# Use this credential to log in manual
email = 'johndoe@example.com'
password = 'test123'

Using a seed file, the user will be created with the email and password above.

## Prisma and Database Management

This project uses Prisma ORM to manage database schema, migrations, and seeds, integrated seamlessly with Next.js for efficient server-side and static data operations.

- **TypeScript Integration**: Prisma automatically generates TypeScript interfaces for the database schema in `prisma/interfaces.ts`.
- **Database Schema**: The Prisma schema is defined in `prisma/schema.prisma`.
- **Seed Data**: The main seed file is located in `prisma/seed.ts`, which populates the database with initial data.

### Migration and Seeding Commands

```bash
# create a new migration
npx prisma migrate dev --name init

# reset migrations and execute seeds
prisma migrate reset

# reset migrations without executing the seeds
prisma migrate reset --skip-seed

# execute only seeds
prisma db seed
```

For more on Prisma seeding, visit the [Prisma seeds documentation](https://www.prisma.io/docs/orm/prisma-migrate/workflows/seeding).

## Project Overview and Key Features

This Next.js application is a news aggregator for legislative articles that offers customizable news feeds based on states and topics, leveraging several performance optimization techniques, including caching and server-side rendering (SSR) with server components.

### News Aggregation and Deduplication Strategy

- **Multiple Sources**: The application aggregates news articles from various external APIs to provide a comprehensive feed.
- **Slug-Based Deduplication**: Each article's title is used to create a unique slug, which is stored and indexed in the database. Before a new article is inserted, the system checks for an existing article with the same slug. This ensures that duplicate articles are not added, even if the same news content appears across multiple sources.
- **Fresh Data Management**: Scheduled updates ensure that users always see the latest news, while older articles are archived based on predefined retention policies.

### Scalability

The system is designed to handle thousands of articles across multiple states and topics:

- **Database Indexing**: Prisma facilitates indexing key fields, such as publication date and topic, ensuring efficient queries as the dataset grows.
- **Horizontal Scaling**: The modular structure of Next.js components and Prisma’s compatibility with serverless functions allow the app to scale horizontally, distributing traffic evenly across multiple instances.
- **Storage Strategy**: Older articles can be moved to a data archive, while only recent or popular articles remain readily accessible to optimize storage and performance.

### Search Optimization

To enhance the search experience:

- **Indexed Fields**: Indexed fields (e.g., topics, states, and publication dates) allow users to quickly filter and search through large datasets.
- **Pagination**: For large datasets, results are paginated to ensure that users can navigate the content without overloading the interface.
- **Full-Text Search**: For optimal search functionality, a full-text search mechanism can be implemented with Prisma for more advanced, user-friendly querying.

To filter by Topic or State, click on them in any article.

### Performance and Caching

- **Next.js Caching**: Cached data for infrequently changing endpoints, such as states and topics, reduces unnecessary API calls and optimizes load times.
- **Server Components**: Server components in Next.js allow efficient data fetching and rendering on the server side, minimizing the client-side processing and boosting performance.
- **Incremental Static Regeneration (ISR)**: Next.js ISR generates and caches static pages, revalidating them periodically to keep content up to date without rebuilding the entire application.

### Potential Use of AI for Enhanced Content Management

To further improve the quality and relevance of aggregated news, AI tools like OpenAI’s GPT models could be integrated for advanced content analysis:

- **Automated Topic Classification**: By analyzing the content of each article, AI can automatically assign topics and categories, even beyond the basic tags provided by the sources. This would ensure a more accurate classification and help users find relevant news more effectively.
- **Malicious Content Detection**: AI models could scan articles to detect potentially malicious or inappropriate content that does not meet the organization’s policies. This would add an extra layer of quality control and ensure that only trusted content is displayed to users.
- **Content Summarization**: For lengthy articles, AI could generate concise summaries, allowing users to quickly get the gist of the news without reading the full content.

### Security Considerations

- **Input Sanitization**: All user inputs, especially for filtering and searching, are sanitized to protect against injection attacks.
- **Rate Limiting** (Optional): Rate-limiting middleware can be applied to the news-fetching endpoints to prevent abuse or overload.

### Bonus Features

- **Real-Time Updates**: Leveraging server components and WebSocket connections, users can subscribe to real-time updates, receiving notifications for newly published articles relevant to their interests.
- **User Personalization**: Users can save their preferred states and topics, which automatically displays relevant articles upon returning to the app.
- **Newsletter Subscription**: Users can subscribe to a daily email summary that aggregates the latest articles based on their saved states and topics.

## Directory Structure

```plaintext
legislative-news-aggregator-app
├── .github                     # GitHub workflows and configurations
├── .husky                      # Husky hooks for git pre-commit and pre-push
├── .next                       # Next.js build output
├── .swc                        # SWC cache directory
├── actions                     # Custom actions for handling different tasks
├── app                         # Next.js app directory for routing and pages
├── components                  # Reusable UI components
├── hooks                       # Custom hooks
├── lib                         # Utility functions and shared libraries
├── node_modules                # Project dependencies
├── prisma                      # Prisma schema and migrations
│   ├── schema.prisma           # Prisma schema definition
│   ├── migrations              # Database migrations
│   └── seed.ts                 # Seed file for initial data population
├── public                      # Public assets
├── services                    # Services for external API interactions
├── tests                       # Unit and integration tests
├── types                       # TypeScript types and interfaces
├── .env                        # Environment variables for production
├── .env.local                  # Environment variables for local development
├── .eslintignore               # ESLint ignore file
├── .eslintrc.json              # ESLint configuration
├── .gitignore                  # Git ignore file
├── .prettierrc                 # Prettier configuration
├── auth.ts                     # Authentication configuration
├── components.json             # Shadcn component configuration
├── Dockerfile                  # Docker configuration for containerization
├── jest.config.ts              # Jest configuration for testing
└── jest.setup.ts               # Jest setup file
```

## Environment Variables

```plaintext
# Database Connection URL
DATABASE_URL="mysql://user:password@localhost:3306/legislative_news"
# URL for accessing the API server (used on client-side code)
NEXT_PUBLIC_API_URL="http://localhost:3000"
# Pagination limit for displaying articles per page
NEXT_PUBLIC_PAGINATION_LIMIT=10
# WebSocket URL for real-time updates on news
NEXT_PUBLIC_WS_URL="http://localhost:3001/news"
# Authentication secret for securing sessions
AUTH_SECRET=""
# GitHub OAuth client ID for GitHub login
AUTH_GITHUB_ID=""
# GitHub OAuth client secret for GitHub login
AUTH_GITHUB_SECRET=""
```

### Environment Variables Description

- **`DATABASE_URL`**: The connection URL for the MySQL database where legislative news articles and user preferences are stored.
- **`NEXT_PUBLIC_API_URL`**: The base URL for the API, used for making API calls from the frontend. This should point to your backend or Next.js server URL.
- **`NEXT_PUBLIC_PAGINATION_LIMIT`**: The maximum number of articles to display per page in paginated views. Adjust this to control pagination size.
- **`NEXT_PUBLIC_WS_URL`**: WebSocket URL used to connect clients for real-time notifications of new articles. This URL should match the WebSocket server’s address.
- **`AUTH_SECRET`**: A secret key used by the authentication library to secure user sessions. This should be generated and stored securely.
- **`AUTH_GITHUB_ID`** and **`AUTH_GITHUB_SECRET`**: Credentials for GitHub OAuth integration. These enable users to sign in with their GitHub accounts. You can get these values by registering your application on GitHub's developer settings.

## Deployment on Vercel

The easiest way to deploy this Next.js app is through [Vercel](https://vercel.com), which offers seamless deployment for Next.js projects.

Check out the [Next.js deployment documentation](https://nextjs.org/docs

## Known Issues
There is an issue when trying to log in manually with wrong credentials,
the error is not being captured.
It seems an issue of the library used for authentication authjs.dev in the last version.
And it's getting hard to resolve it.
This is a known issue and will be fixed in the next release.
