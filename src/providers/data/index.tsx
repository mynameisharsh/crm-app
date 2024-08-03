import graphQLDataProvider, { GraphQLClient, liveProvider as graphQLLiveProvider } from "@refinedev/nestjs-query";
import { fetchWrapper } from "./fetchWrapper";
import { Client, createClient } from "graphql-ws";

export const BASE_API_URL = "https://api.crm.refine.dev";
export const API_URL = `${BASE_API_URL}/graphql`;
const WS_URL = "wss://api.crm.refine.dev/graphql";

export const client = new GraphQLClient(API_URL, {
  fetch: (url: string, options: RequestInit) => {
    try {
      return fetchWrapper(url, options);
    } catch(error) {
      return Promise.reject(error as Error);
    }
  }
})

export const wsClient = typeof window !== "undefined" ?
  createClient({
    url: WS_URL,
    connectionParams: () => {
      const accessToken = localStorage.getItem("access_token");
      return {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      }
    },
  })
  : null

export const dataProvider = graphQLDataProvider(client);

export const liveProvider = wsClient ? graphQLLiveProvider(wsClient) : undefined;