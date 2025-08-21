import { QueryClient } from "@tanstack/react-query";
import { mockApi } from "./mockData";

// Mock API request function for frontend-only version
export async function apiRequest(
  method: string,
  endpoint: string,
  data?: unknown
): Promise<any> {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 100));
  
  // Route to appropriate mock API methods based on endpoint and method
  if (endpoint === "/api/user" && method === "GET") {
    return { json: () => mockApi.getUser() };
  }
  
  if (endpoint === "/api/tasks") {
    if (method === "GET") return { json: () => mockApi.getTasks() };
    if (method === "POST") return { json: () => mockApi.createTask(data as any) };
  }
  
  if (endpoint.startsWith("/api/tasks/") && method === "PATCH") {
    const id = endpoint.split("/")[3];
    return { json: () => mockApi.updateTask(id, data as any) };
  }
  
  if (endpoint.startsWith("/api/tasks/") && method === "DELETE") {
    const id = endpoint.split("/")[3];
    return { json: () => mockApi.deleteTask(id) };
  }
  
  if (endpoint === "/api/expenses") {
    if (method === "GET") return { json: () => mockApi.getExpenses() };
    if (method === "POST") return { json: () => mockApi.createExpense(data as any) };
  }
  
  if (endpoint.startsWith("/api/expenses/") && method === "DELETE") {
    const id = endpoint.split("/")[3];
    return { json: () => mockApi.deleteExpense(id) };
  }
  
  if (endpoint === "/api/study-sessions") {
    if (method === "GET") return { json: () => mockApi.getStudySessions() };
    if (method === "POST") return { json: () => mockApi.createStudySession(data as any) };
  }
  
  if (endpoint === "/api/achievements" && method === "GET") {
    return { json: () => mockApi.getAchievements() };
  }
  
  throw new Error(`Unknown endpoint: ${method} ${endpoint}`);
}

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchInterval: false,
      refetchOnWindowFocus: false,
      staleTime: 5 * 60 * 1000, // 5 minutes
      retry: false,
    },
    mutations: {
      retry: false,
    },
  },
});
