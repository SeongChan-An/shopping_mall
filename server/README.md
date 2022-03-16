# Server

## GraphQL

- Schema : 명세
  > RESTAPI에서 데이터에 접근을 GET, POST, PUT, DELETE 등으로 처리  
  > GraphQL에서는 Query, Mutation, Subscription으로 한다.

### Get Started

https://www.apollographql.com/docs/apollo-server/getting-started/

```jsx
// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({ typeDefs, resolvers });

// The `listen` method launches a web server.
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
```
