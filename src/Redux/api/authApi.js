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
    // === Add New Job ===
    addJob: builder.mutation({
      query: (data) => ({
        url: "/api/v1/admin/jobs/",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Job"],
    }),
    // === Edit Job ===
    updateJob: builder.mutation({
      query: ({ id, data }) => ({
        url: `/api/v1/admin/jobs/${id}/`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Job"],
    }),
    // === Delete Job ===
    deleteJob: builder.mutation({
      query: (id) => ({
        url: `/api/v1/admin/jobs/${id}/`,
        method: "DELETE",
      }),
      invalidatesTags: ["Job"],
    }),
    // === Get Subscriber ===
    getSubscribers: builder.query({
      query: () => ({
        url: "/api/v1/admin/subscribers/",
        method: "GET",
      }),
      providesTags: ["Subscriber"],
    }),
    // === Blacklist ===
    getBlacklist: builder.query({
      query: () => ({
        url: "/api/v1/admin/blacklist/",
        method: "GET",
      }),
      providesTags: ["Blacklist"],
    }),
    addToBlacklist: builder.mutation({
      query: (data) => ({
        url: "/api/v1/admin/blacklist/",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Blacklist"],
    }),
    removeFromBlacklist: builder.mutation({
      query: (id) => ({
        url: `/api/v1/admin/blacklist/${id}/`,
        method: "DELETE",
      }),
      invalidatesTags: ["Blacklist"],
    }),
    updateSubscriber: builder.mutation({
      query: ({ id, data }) => ({
        url: `/api/v1/admin/subscribers/${id}/`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Subscriber", "Blacklist"],
    }),
    // === Action Subscriber ===
    subscriberBulkAction: builder.mutation({
      query: (data) => ({
        url: "/api/v1/admin/subscribers/bulk_action/",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Subscriber", "Blacklist"],
    }),
    // === Terms & Policy ===
    getTerms: builder.query({
      query: () => ({
        url: "/api/v1/admin/settings/terms/",
        method: "GET",
      }),
      providesTags: ["Setting"],
    }),
    updateTerms: builder.mutation({
      query: (data) => ({
        url: "/api/v1/admin/settings/terms/",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Setting"],
    }),
    getPrivacy: builder.query({
      query: () => ({
        url: "/api/v1/admin/settings/privacy/",
        method: "GET",
      }),
      providesTags: ["Setting"],
    }),
    updatePrivacy: builder.mutation({
      query: (data) => ({
        url: "/api/v1/admin/settings/privacy/",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Setting"],
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
  useAddJobMutation,
  useUpdateJobMutation,
  useDeleteJobMutation,
  useGetSubscribersQuery,
  useGetBlacklistQuery,
  useAddToBlacklistMutation,
  useRemoveFromBlacklistMutation,
  useUpdateSubscriberMutation,
  useSubscriberBulkActionMutation,
  useGetTermsQuery,
  useUpdateTermsMutation,
  useGetPrivacyQuery,
  useUpdatePrivacyMutation,
} = authApi;
