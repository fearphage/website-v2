import { Plugin } from "@nuxt/types";

type FetchOptions = Parameters<typeof fetch>[1];

declare module "vue/types/vue" {
  interface Vue {
    $api(
      path: string,
      body?: Record<string, unknown>
    ): Promise<Record<string, unknown>>;
  }
}

const apiSetup: Plugin = ({ env, $fire }, inject): void => {
  const baseUrl = env.apiBaseUrl;

  inject("api", async function (path: string, body: Record<string, unknown>) {
    let status: number;
    const user = $fire.auth.currentUser;

    if (!user) {
      return Promise.reject(
        new Error("User not logged in. Refreshng your browser and try again.")
      );
    }

    const token = await user.getIdToken();

    const options: FetchOptions = {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    };

    if (body) {
      options.method = "post";
      options.body = JSON.stringify(body);
    }

    return fetch(`${baseUrl}${path}`, options)
      .then((res) => {
        status = res.status;

        return res.json();
      })
      .then((res) => {
        if (status >= 400) {
          return Promise.reject(new Error(res.message));
        }

        return res;
      });
  });
};

export default apiSetup;
