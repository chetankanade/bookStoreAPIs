const { Address } = require("../../../models/index");

module.exports = {
    createAddress: async (request) => {
        try {
            let address = await Address.create(request);

            address = JSON.parse(JSON.stringify(address));

            return address;
        } catch (error) {
            throw new Error(error.message)
        }
    },

    getUserAddress: async (user_id) => {
        try {
            let address = await Address.findOne({
                where: user_id
            });

            address = JSON.parse(JSON.stringify(address));

            return address;
        } catch (error) {
            throw new Error(error.message)
        }
    }
}