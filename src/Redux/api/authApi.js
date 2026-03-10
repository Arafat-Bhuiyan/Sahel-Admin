import { api } from "./api";

export const authApi = api.injectEndpoints({
  endpoints: (builder) => ({
    // === LOGIN ===
    login: builder.mutation({
      query: (data) => ({
        url: "/api/v1/auth/admin-login/",
        method: "POST",
        body: data,
      }),
    }),
    // === Dashboard Stats ===
    getDashboardStats: builder.query({
      query: () => ({
        url: "/api/v1/admin/dashboard-stats/",
        method: "GET",
      }),
    }),
    // === Category ===
    getCategories: builder.query({
      query: () => ({
        url: "/api/v1/admin/categories/",
        method: "GET",
      }),
    }),
  }),
});
export const {
  useLoginMutation,
  useGetDashboardStatsQuery,
  useGetCategoriesQuery,
} = authApi;
