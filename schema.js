exports.typeDefs = `

type Case {
    _id: ID
    image: String!
    comments: String
    toxicVotes: Int
    nonToxicVotes: Int
    extraCaseInfo: String!
}

type User {
    _id: ID
    summonerName: String! @unique
    password: String!
    email: String!
    joinDate: String
    judgedCases: [Case]
}

type Token {
    token: String!
}

type Query {
    getAllCases: [Case]
}

type Mutation {
    addCase(image: String!, extraCaseInfo: String!): Case
    
    signupUser(summonerName: String!, email: String!, password: String!): Token
}

`;