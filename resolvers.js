exports.resolvers = {
    Query: {
        getAllCases: async () => {

        }
    },

    Mutation: {
        addCase: async (root, {image, extraCaseInfo}, {Case}) => {
            try {
                const newCase = await new Case({
                    image, extraCaseInfo
                }).save();

                return newCase;
            } catch (error) {
                throw new Error("Could not add case.")
            }
        }
    }
};