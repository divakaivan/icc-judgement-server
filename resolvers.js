const jwt = require("jsonwebtoken");
const SECRET = require("./secret");

const createToken = (user, secret, expiresIn) => {
    const {summonerName, email} = user;
    return jwt.sign({summonerName, email}, secret, {expiresIn})
};

exports.resolvers = {
    Query: {
        getAllCases: async (root, args, {Case}) => {
            try {
                return await Case.find();
            } catch (error) {
                throw new Error("Could not fetch all recipes.")
            }
        }
    },

    Mutation: {
        addCase: async (root, {image, extraCaseInfo}, {Case}) => {
            try {
                return await new Case({
                    image, extraCaseInfo
                }).save();
            } catch (error) {
                throw new Error("Could not add case.")
            }
        },

        signupUser: async (root, {summonerName, email, password}, {User}) => {
            const user = await User.findOne({summonerName});
            if (user) {
                throw new Error(`User with username <${summonerName}> already exists`);
            }

            const newUser = await new User({summonerName, email, password}).save();
            return {token: createToken(newUser, SECRET, '10h')}
        }
    }
};