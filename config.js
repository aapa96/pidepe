 
const config = {
    server: {
        port: process.env.PORT || 3000
    },
    db: {
        url: process.env.MONGODB_URI || 'mongodb+srv://aapa96:ANAdrYBXAJ8h6bDD@pidepe-1mhn2.mongodb.net/test?retryWrites=true&w=majority'
    },
}


module.exports = config;