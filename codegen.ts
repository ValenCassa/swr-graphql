// eslint-disable-next-line import/no-extraneous-dependencies
import { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  schema: "https://countries.trevorblades.com/",
  documents: ["components/**/*.tsx", "pages/**/*.tsx"],
  ignoreNoDocuments: true,
  generates: {
    "./gql/schema.graphql": {
      plugins: ["schema-ast"],
    },
    "./gql/": {
      preset: "client",
    },
  },
  //hooks: { afterAllFileWrite: ["prettier --write"] },
};

export default config;
