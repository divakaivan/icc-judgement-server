exports.typeDefs = `

type Case {
    image: String!
    comments: String
    toxicVotes: Int
    nonToxicVotes: Int
    extraCaseInfo: String!
}

type User {
    summonerName: String! @unique
    password: String!
    email: String!
    joinDate: String
    judgedCases: [Case]
}

type Query {
    getAllCases: [Case]
}

type Mutation {
    addCase(image: String!, extraCaseInfo: String!): Case
}

`;