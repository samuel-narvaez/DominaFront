<script setup>
import { onBeforeUnmount, onBeforeMount,ref } from "vue";
import { useRouter  } from "vue-router";
import { useStore } from "vuex";
import ArgonInput from "@/components/ArgonInput.vue";
import ArgonButton from "@/components/ArgonButton.vue";
const body = document.getElementsByTagName("body")[0];

const store = useStore();
const router = useRouter()
onBeforeMount(() => {
  store.state.hideConfigButton = true;
  store.state.showNavbar = false;
  store.state.showSidenav = false;
  store.state.showFooter = false;
  localStorage.clear();
  body.classList.remove("bg-gray-100");
});
onBeforeUnmount(() => {
  store.state.hideConfigButton = false;
  store.state.showNavbar = true;
  store.state.showSidenav = true;
  store.state.showFooter = true;
  body.classList.add("bg-gray-100");
});

const user = ref('');
const password = ref('');

const handleLogin = async() => {
  const dataLogin = {
    email: user.value,
    password: password.value    
  }
  await store.dispatch('auth/login',dataLogin);
  if (store.state.auth.isLogunned) {
    router.push({ name: 'Tasks' })
  }
}
</script>
<template>

  <main class="mt-0 main-content">
    <section>
      <div class="page-header min-vh-100">
        <div class="container">
          <div class="row">
            <div
              class="mx-auto col-xl-4 col-lg-5 col-md-7 d-flex flex-column mx-lg-0"
            >
              <div class="card card-plain">
                <div class="pb-0 card-header text-start">
                  <h4 class="font-weight-bolder">Login</h4>
                </div>
                <div class="card-body">
                  <div class="mb-3">
                    <argon-input
                      id="user"
                      type="text"
                      placeholder="Usuario"
                      name="user"
                      v-model="user"
                      size="lg"
                    />
                  </div>
                  <div class="mb-3">
                    <argon-input
                      id="password"
                      type="password"
                      placeholder="Contraseña"
                      name="password"
                      v-model="password"
                      size="lg"
                    />
                  </div>
                  <div class="text-center">
                    <argon-button
                      class="mt-4"
                      variant="gradient"
                      color="success"
                      fullWidth
                      size="lg"
                      @click="handleLogin"
                      >Sign in</argon-button
                    >
                  </div>
                </div>
              </div>
            </div>
            <div
              class="top-0 my-auto text-center col-6 d-lg-flex d-none h-100 pe-0 position-absolute end-0 justify-content-center flex-column"
            >
              <div
                class="position-relative bg-gradient-primary h-100 m-3 px-7 border-radius-lg d-flex flex-column justify-content-center overflow-hidden"
                style="
                  background-image: url(&quot;https://raw.githubusercontent.com/creativetimofficial/public-assets/master/argon-dashboard-pro/assets/img/signin-ill.jpg&quot;);
                  background-size: cover;
                "
              >
                <span class="mask bg-gradient-success opacity-6"></span>
                <h4
                  class="mt-5 text-white font-weight-bolder position-relative"
                >
                  "Attention is the new currency"
                </h4>
                <p class="text-white position-relative">
                  The more effortless the writing looks, the more effort the
                  writer actually put into the process.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>
