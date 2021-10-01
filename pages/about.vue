<template>
  <div class="static-page">
    <ArtCircle
      card-name="Codie, Vociferous Codex"
      artist="Daniel Ljunggren"
      class="m-auto md:block hidden"
    />
    <h1 class="heading-title">About Commander Spellbook</h1>

    <input class="input" type="text" v-model="message" />
    <button @click="sendMessage" class="button">Send Message</button>
    <button @click="lookup" class="button">lookup</button>
    <button @click="edit" class="button">edit</button>
    <button @click="create" class="button">create</button>

    <p>
      The Commander Spellbook project is a search engine for Commander/EDH
      combos and to make them easily available across all modern digital
      platforms. This community driven project is used to power
      <ExternalLink to="https://edhrec.com/combos">
        EDHREC's Combo Feature</ExternalLink
      >.
    </p>
    <p>
      The database and the source code for the website are
      <ExternalLink to="https://opensource.org/licenses/MIT">
        completely free and open source under the MIT license</ExternalLink
      >. We encourage you to copy this data so it lives on!
    </p>

    <ul>
      <li>
        <ExternalLink to="https://github.com/Commander-Spellbook/website-v2"
          >Website Source Code on GitHub</ExternalLink
        >
      </li>
      <li>
        <ExternalLink
          to="https://docs.google.com/spreadsheets/d/1KqyDRZRCgy8YgMFnY0tHSw_3jC99Z0zFvJrPbfm66vA/"
          >Combo Database Backend on Google Sheets</ExternalLink
        >
      </li>
    </ul>

    <strong>Sincerely, the Community Admins,</strong>
    <ul class="ml-4 list-inside">
      <li>
        <ExternalLink to="https://twitter.com/lappermedic">Lapper</ExternalLink>
      </li>
      <li>
        <ExternalLink to="https://www.moxfield.com/users/goldshot20"
          >Goldshot20</ExternalLink
        >
      </li>
      <li>
        <ExternalLink to="https://www.moxfield.com/users/AppleSaws"
          >AppleSaws</ExternalLink
        >
      </li>
      <li>
        <ExternalLink to="https://twitter.com/rosequartz_26"
          >Jaelyn Rosenquist</ExternalLink
        >
      </li>
      <li>
        <ExternalLink to="https://www.moxfield.com/users/SeniorEdificer"
          >Senior Edificer</ExternalLink
        >
        (emeritus)
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import ArtCircle from "@/components/ArtCircle.vue";
import ExternalLink from "@/components/ExternalLink.vue";

export default Vue.extend({
  components: {
    ArtCircle,
    ExternalLink,
  },

  data() {
    return {
      message: "",
    };
  },
  methods: {
    async sendMessage() {
      const res = await fetch(process.env.apiBaseUrl + "api/message", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: this.message }),
      })
        .then((res) => res.json())
        .catch((err) => {
          console.log(":(");
          console.error(err);
        });

      console.log(res);
    },
    async lookup() {
      // const ref = this.$fire.firestore.collection('users').doc(userId)
      const ref = this.$fire.firestore.collection("foo").doc("foo");
      console.log("got ref", ref);
      try {
        const doc = await ref.get();
        console.log("resovled");
        console.log(doc.exists);
        console.log(doc.data());
        if (doc.exists) {
          return doc.data();
        }
      } catch (e) {
        console.log("yikes");
        console.log(e);
      }
    },

    async edit() {
      const currentDoc = await this.lookup();
      const ref = this.$fire.firestore.collection("foo").doc("foo");

      if (!currentDoc) {
        console.log("current doc could not be found");
        return;
      }

      console.log("baz", currentDoc.baz);

      try {
        await ref.update({
          baz: currentDoc.baz.split("").reverse().join(""),
        });
      } catch (e) {
        console.log("oops");
        console.log(e);
      }
    },
    async create() {
      try {
        await this.$fire.firestore
          .collection("users")
          .doc(this.$fire.auth.currentUser.uid)
          .add({
            username: "foo",
            permissions: {
              admin: true,
              submit_combo: true,
            },
          });
        console.log("done");
      } catch (e) {
        console.log("couldn't create");
        console.log(e);
      }
    },
  },
});
</script>

<style scoped>
p,
ul {
  @apply my-2;
}
</style>
