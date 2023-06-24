const config = {
    env: 'test',
    db: process.env.MONGODB_TEST_URI,
    port: process.env.PORT || 3000,
};

export default config;
