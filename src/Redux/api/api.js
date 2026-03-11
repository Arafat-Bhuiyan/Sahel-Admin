import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { logout, setCredentials } from "../services/authSlice";

const baseUrl = import.meta.env.VITE_BASE_URL;

const baseQuery = fetchBaseQuery({
  baseUrl: baseUrl,
  prepareHeaders: (headers, { getState }) => {
    // Try to get token from Redux state
    const token = getState().auth?.access || localStorage.getItem("access");
    // If token not in state, retrieve from local storage
    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

const baseQueryWithReauth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result.error && result.error.status === 401) {
    // try to get a new token
    const refreshToken =
      api.getState().auth?.refresh || localStorage.getItem("refresh");

    if (refreshToken) {
      const refreshResult = await baseQuery(
        {
          url: "/api/v1/auth/token-refresh/",
          method: "POST",
          body: { refresh: refreshToken },
        },
        api,
        extraOptions,
      );

      if (refreshResult.data) {
        // store the new token
        const user = api.getState().auth?.user;
        api.dispatch(
          setCredentials({
            access: refreshResult.data.access,
            refresh: refreshToken, // backend might return a new refresh token or not
            user: user,
          }),
        );
        // retry the initial query
        result = await baseQuery(args, api, extraOptions);
      } else {
        api.dispatch(logout());
      }
    } else {
      api.dispatch(logout());
    }
  }
  return result;
};

export const api = createApi({
  reducerPath: "baseApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Category", "Job", "Subscriber", "Blacklist", "Setting"],
  endpoints: () => ({}),
});
