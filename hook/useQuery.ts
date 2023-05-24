import { TypedDocumentNode } from "@graphql-typed-document-node/core";
import { ASTNode, Kind, OperationDefinitionNode } from "graphql";
import { Variables } from "graphql-request";
import useSWR from "swr";
import useSWRMutation from "swr/mutation";
import { client } from "~/client";

const isOperationDefinition = (def: ASTNode): def is OperationDefinitionNode =>
  def.kind === Kind.OPERATION_DEFINITION;

export const useQuery = <TResult, TVariables>(
  document: TypedDocumentNode<TResult, TVariables>,
  ...[variables]: TVariables extends Record<string, never> ? [] : [TVariables]
) => {
  return useSWR(
    [
      document.definitions.find(isOperationDefinition)?.name?.value,
      variables,
    ] as const,
    async ([_, variables]) => {
      const res = await client.request(document, variables as Variables);
      return res;
    }
  );
};

export const useLazyQuery = <TResult, TVariables>(
  document: TypedDocumentNode<TResult, TVariables>,
  ...[variables]: TVariables extends Record<string, never> ? [] : [TVariables]
) => {
  return useSWRMutation(
    [
      document.definitions.find(isOperationDefinition)?.name?.value,
      variables,
    ] as const,
    async ([_, variables]) => {
      const res = await client.request(document, variables as Variables);
      return res;
    }
  );
};
