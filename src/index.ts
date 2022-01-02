import { ApolloServer, gql } from 'apollo-server'

import dotenv from 'dotenv'

dotenv.config()

const dbUrl =
  'mongodb+srv://enes:enes1234@cluster0.wttdm.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'

const books = [
  {
    title: 'The Awakening',
    author: 'Kate Chopin'
  },
  {
    title: 'City of Glass',
    author: 'Paul Auster'
  }
]

const typeDefs = gql`
  # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.

  # This "Book" type defines the queryable fields for every book in our data source.
  type Book {
    title: String
    author: String
  }

  # The "Query" type is special: it lists all of the available queries that
  # clients can execute, along with the return type for each. In this
  # case, the "books" query returns an array of zero or more Books (defined above).
  type Query {
    books: [Book]
  }
`

const resolvers = {
  Query: {
    books: () => books
  }
}

const server = new ApolloServer({ typeDefs, resolvers })

const runServer = async () => {
  try {
    const { url } = await server.listen()
    console.log(`🚀 apollo server ready at ${url}`)
  } catch (error) {
    console.error(error)
  }
}

runServer()
