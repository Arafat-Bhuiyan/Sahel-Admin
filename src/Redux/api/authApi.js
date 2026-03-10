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
  }),
});
export const {
  useLoginMutation,
} = authApi;
