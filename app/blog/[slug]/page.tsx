import type { Metadata } from "next";
import BlogPostClientPage from "./BlogPostClientPage";

// This would typically come from a CMS, markdown files, or database
const blogPosts = [
  {
    id: "building-scalable-react-apps",
    title: "Building Scalable React Applications: Best Practices for 2024",
    excerpt:
      "Learn the essential patterns and practices for building React applications that can grow with your team and user base.",
    content: `
# Building Scalable React Applications: Best Practices for 2024

As React applications grow in complexity, maintaining scalability becomes crucial. Here are the key practices I've learned from building production applications.

## Component Architecture

The foundation of a scalable React app lies in its component architecture. I recommend following these principles:

### 1. Single Responsibility Principle
Each component should have one clear purpose. This makes them easier to test, debug, and reuse.

### 2. Composition over Inheritance
React's composition model is powerful. Instead of creating complex inheritance hierarchies, compose smaller components together.

### 3. Custom Hooks for Logic Reuse
Extract common logic into custom hooks. This promotes reusability and keeps components focused on rendering.

## State Management

For larger applications, consider these state management approaches:

- **Local State**: Use useState for component-specific state
- **Context API**: For sharing state across component trees
- **External Libraries**: Redux Toolkit or Zustand for complex global state

## Performance Optimization

Key performance strategies include:

1. **Code Splitting**: Use React.lazy() and Suspense
2. **Memoization**: React.memo, useMemo, and useCallback
3. **Virtual Scrolling**: For large lists
4. **Image Optimization**: Next.js Image component

## Testing Strategy

A comprehensive testing approach includes:

- Unit tests for individual components
- Integration tests for component interactions
- End-to-end tests for critical user flows

## Conclusion

Building scalable React applications requires thoughtful architecture decisions from the start. By following these practices, you'll create applications that are maintainable, performant, and enjoyable to work with.
    `,
    author: "John Doe",
    date: "2024-01-15",
    readTime: "8 min read",
    tags: ["React", "JavaScript", "Architecture", "Best Practices"],
    image: "/blog-react-scalability.png",
    featured: true,
  },
  {
    id: "mastering-nodejs-apis",
    title: "Mastering Node.js APIs: From REST to GraphQL",
    excerpt:
      "A comprehensive guide to building robust APIs with Node.js, covering REST principles, GraphQL implementation, and performance optimization.",
    content: `
# Mastering Node.js APIs: From REST to GraphQL

Building robust APIs is at the heart of modern web development. Let's explore how to create powerful APIs with Node.js.

## REST API Fundamentals

REST (Representational State Transfer) remains the most popular API architecture. Key principles include:

### HTTP Methods
- **GET**: Retrieve data
- **POST**: Create new resources
- **PUT**: Update entire resources
- **PATCH**: Partial updates
- **DELETE**: Remove resources

### Status Codes
Proper HTTP status codes improve API usability:
- 200: Success
- 201: Created
- 400: Bad Request
- 401: Unauthorized
- 404: Not Found
- 500: Internal Server Error

## Express.js Best Practices

When building APIs with Express.js:

1. **Middleware Organization**: Use middleware for cross-cutting concerns
2. **Error Handling**: Implement centralized error handling
3. **Validation**: Validate input data with libraries like Joi or Yup
4. **Security**: Use helmet, cors, and rate limiting

## GraphQL with Node.js

GraphQL offers several advantages:

- **Single Endpoint**: One URL for all operations
- **Flexible Queries**: Clients request exactly what they need
- **Strong Type System**: Self-documenting APIs

### Setting up GraphQL

\`\`\`javascript
const { ApolloServer } = require('apollo-server-express');
const typeDefs = require('./schema');
const resolvers = require('./resolvers');

const server = new ApolloServer({ typeDefs, resolvers });
\`\`\`

## Performance Optimization

Key strategies for API performance:

1. **Caching**: Implement Redis for frequently accessed data
2. **Database Optimization**: Use indexes and query optimization
3. **Compression**: Enable gzip compression
4. **Rate Limiting**: Prevent abuse and ensure fair usage

## Conclusion

Whether you choose REST or GraphQL, focus on creating APIs that are intuitive, well-documented, and performant. The key is understanding your use case and choosing the right tool for the job.
    `,
    author: "John Doe",
    date: "2024-01-10",
    readTime: "12 min read",
    tags: ["Node.js", "API", "REST", "GraphQL", "Backend"],
    image: "/blog-nodejs-apis.png",
    featured: true,
  },
  {
    id: "mongodb-optimization-tips",
    title: "MongoDB Performance Optimization: Tips from Production",
    excerpt:
      "Real-world strategies for optimizing MongoDB performance, including indexing strategies, query optimization, and scaling considerations.",
    content: `
# MongoDB Performance Optimization: Tips from Production

After working with MongoDB in production environments, I've learned valuable lessons about performance optimization.

## Indexing Strategies

Proper indexing is crucial for MongoDB performance:

### Compound Indexes
Create indexes that support your most common query patterns:

\`\`\`javascript
db.users.createIndex({ "status": 1, "createdAt": -1 })
\`\`\`

### Index Intersection
MongoDB can use multiple indexes for a single query, but compound indexes are usually more efficient.

## Query Optimization

### Use Projection
Only fetch the fields you need:

\`\`\`javascript
db.users.find({ status: "active" }, { name: 1, email: 1 })
\`\`\`

### Limit and Skip Efficiently
For pagination, consider using range queries instead of skip():

\`\`\`javascript
// Instead of skip()
db.posts.find().sort({ _id: 1 }).limit(10).skip(100)

// Use range queries
db.posts.find({ _id: { $gt: lastId } }).sort({ _id: 1 }).limit(10)
\`\`\`

## Schema Design

### Embedding vs Referencing
- **Embed**: When data is accessed together and doesn't grow unbounded
- **Reference**: When data is accessed independently or grows large

### Avoid Deep Nesting
Keep document structure relatively flat for better performance.

## Monitoring and Profiling

Use MongoDB's built-in tools:

1. **explain()**: Analyze query execution
2. **mongostat**: Monitor database operations
3. **mongotop**: Track time spent in collections

## Scaling Considerations

### Replica Sets
Implement replica sets for:
- High availability
- Read scaling
- Backup and maintenance

### Sharding
Consider sharding when:
- Data size exceeds single server capacity
- Write throughput requirements are high
- Geographic distribution is needed

## Conclusion

MongoDB performance optimization is an ongoing process. Regular monitoring, proper indexing, and thoughtful schema design are key to maintaining optimal performance as your application scales.
    `,
    author: "John Doe",
    date: "2024-01-05",
    readTime: "10 min read",
    tags: ["MongoDB", "Database", "Performance", "Optimization"],
    image: "/blog-mongodb-optimization.png",
    featured: false,
  },
  {
    id: "typescript-react-patterns",
    title: "Advanced TypeScript Patterns for React Developers",
    excerpt:
      "Explore advanced TypeScript patterns that will make your React code more type-safe, maintainable, and developer-friendly.",
    content: `
# Advanced TypeScript Patterns for React Developers

TypeScript and React make a powerful combination. Let's explore advanced patterns that will elevate your development experience.

## Generic Components

Create reusable components with generics:

\`\`\`typescript
interface ListProps<T> {
  items: T[];
  renderItem: (item: T) => React.ReactNode;
}

function List<T>({ items, renderItem }: ListProps<T>) {
  return (
    <ul>
      {items.map((item, index) => (
        <li key={index}>{renderItem(item)}</li>
      ))}
    </ul>
  );
}
\`\`\`

## Discriminated Unions

Handle different states with discriminated unions:

\`\`\`typescript
type AsyncState<T> =
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'success'; data: T }
  | { status: 'error'; error: string };

function DataComponent() {
  const [state, setState] = useState<AsyncState<User>>({ status: 'idle' });

  switch (state.status) {
    case 'loading':
      return <Spinner />;
    case 'success':
      return <UserProfile user={state.data} />;
    case 'error':
      return <ErrorMessage error={state.error} />;
    default:
      return <button onClick={fetchUser}>Load User</button>;
  }
}
\`\`\`

## Utility Types

Leverage TypeScript's utility types:

### Pick and Omit
\`\`\`typescript
interface User {
  id: string;
  name: string;
  email: string;
  password: string;
}

type PublicUser = Omit<User, 'password'>;
type UserCredentials = Pick<User, 'email' | 'password'>;
\`\`\`

### Partial and Required
\`\`\`typescript
type UserUpdate = Partial<User>;
type UserCreation = Required<Omit<User, 'id'>;
\`\`\`

## Custom Hooks with TypeScript

Create type-safe custom hooks:

\`\`\`typescript
function useApi<T>(url: string): {
  data: T | null;
  loading: boolean;
  error: string | null;
} {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // API logic here
  }, [url]);

  return { data, loading, error };
}
\`\`\`

## Component Props with Variants

Handle component variants with union types:

\`\`\`typescript
type ButtonProps = {
  children: React.ReactNode;
} & (
  | { variant: 'primary'; color?: never }
  | { variant: 'secondary'; color: 'blue' | 'green' | 'red' }
);

function Button({ children, variant, ...props }: ButtonProps) {
  // Implementation
}
\`\`\`

## Conclusion

These TypeScript patterns will help you write more robust React applications. The key is to leverage TypeScript's type system to catch errors at compile time and improve the developer experience.
    `,
    author: "John Doe",
    date: "2023-12-28",
    readTime: "15 min read",
    tags: ["TypeScript", "React", "Patterns", "Advanced"],
    image: "/blog-typescript-patterns.png",
    featured: false,
  },
];

interface PageProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const post = blogPosts.find((p) => p.id === params.slug);
  if (!post) return { title: "Post Not Found" };

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.date,
      authors: [post.author],
      tags: post.tags,
    },
  };
}

export async function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.id,
  }));
}

export default function BlogPostPage({ params }: PageProps) {
  return <BlogPostClientPage params={params} />;
}
