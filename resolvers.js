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
        }
    }
};