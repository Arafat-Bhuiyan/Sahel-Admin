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
      providesTags: ["Category"],
    }),
    // === Add New Category ===
    addCategory: builder.mutation({
      query: (data) => ({
        url: "/api/v1/admin/categories/",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Category"],
    }),
    // === Edit Category ===
    updateCategory: builder.mutation({
      query: ({ id, data }) => ({
        url: `/api/v1/admin/categories/${id}/`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Category"],
    }),
    // === Delete Category ===
    deleteCategory: builder.mutation({
      query: (id) => ({
        url: `/api/v1/admin/categories/${id}/`,
        method: "DELETE",
      }),
      invalidatesTags: ["Category"],
    }),
    // === Get Job ===
    getJobs: builder.query({
      query: () => ({
        url: "/api/v1/admin/jobs/",
        method: "GET",
      }),
      providesTags: ["Job"],
    }),
  }),
});
export const {
  useLoginMutation,
  useGetDashboardStatsQuery,
  useGetCategoriesQuery,
  useAddCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
  useGetJobsQuery,
} = authApi;
