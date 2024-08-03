import { GraphQLFormattedError } from "graphql"

type Error  = {
  message: string,
  statusCode: string
}

// Custom fetch function to handle API requests
const customFetch = async (url: string, options: RequestInit) => {
  const API_TOKEN = localStorage.getItem("access_token");
  
  const headers = options.headers as Record<string, string>;

  return await fetch(url, {
    ...options,
    headers: {
      ...headers,
      Authorization: headers?.Authorization || `Bearer ${API_TOKEN}`,
      "Content-Type": "application/json",
      "Apollo-Require-Preflight": "true" 
    }
  })
}

// Function to handle errors based on body content
const graphQLErrors = (body: Record<"errors", GraphQLFormattedError[]> | undefined): Error | null => {
  if(!body) {
    return {
      message: "Unknown Error",
      statusCode: "INTERNAL_SERVER_ERROR"
    }
  }

  if("errors" in body) {
    const errors = body?.errors;
    const messages = errors.map((error) => error?.message).join("");
    const errorCodes = errors?.[0].extensions?.code;
    return {
      message: messages || JSON.stringify(errors),
      statusCode: errorCodes || 500
    }
  }

  return null;
}

// Custom fetch wrapper to handle API requests
export const fetchWrapper = async (url: string, options: RequestInit) => {
  const response = await customFetch(url, options);
  const responseClone = response.clone();
  const body = await responseClone.json();
  const error = graphQLErrors(body);

  if(error) {
    throw error;
  }

  return response;
}