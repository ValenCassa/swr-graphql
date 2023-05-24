import { TypedDocumentNode } from "@graphql-typed-document-node/core";
import { Variables } from "graphql-request";
import { client } from "~/client";

export const gqlMutation = async <TResult, TVariables>(
  document: TypedDocumentNode<TResult, TVariables>,
  variables: TVariables
): Promise<TResult> => {
  const res = (await client.request(
    document,
    variables as Variables
  )) as TResult;
  return res;
};
