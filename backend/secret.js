const secrets = {
    //The url that we use to connect to the MongoDB Atlas Cluster

    dbUrl: 'mongodb+srv://adrianmckaybragg:<password>@cluster0-gl7vx.mongodb.net/test?retryWrites=true&w=majority'
};

const getSecret = key => secrets[key];

module.exports = secret;