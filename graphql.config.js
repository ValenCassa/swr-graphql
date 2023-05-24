module.exports = {
  projects: {
    app: {
      schema: "./gql/schema.graphql",
      documents: ["components/**/*.tsx", "pages/**/*.tsx"],
      extensions: {
        endpoints: {
          default: "https://countries.trevorblades.com",
        },
      },
    },
  },
};
