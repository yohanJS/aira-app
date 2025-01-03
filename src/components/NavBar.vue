<template>
  <!--MOBILE VERSION-->
  <nav id="home" class="navbar p-0 bg-light shadow-lg" v-if="isMobile">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">
        LuvoAI
      </a>
      <button class="navbar-toggler p-0" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar"
        aria-controls="offcanvasNavbar">
        <span>
          <div class="toggler-icon">
            <svg width="20" height="20" viewBox="0 0 42 30" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M0 28V23.3333H42V28H0ZM0 16.3333V11.6667H42V16.3333H0ZM0 4.66667V0H42V4.66667H0Z"
                fill="#36454F" />
            </svg>
          </div>
        </span>
      </button>
      <div class="offcanvas offcanvas-end" tabindex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
        <div class="offcanvas-header secondary-bg-color p-2">
          <h5 class="offcanvas-title" id="offcanvasNavbarLabel">
            LuvoAI
          </h5>
          <!-- Social Media Icons -->
          <a href="#" class="nav-link m-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-facebook"
              viewBox="0 0 16 16">
              <path
                d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951" />
            </svg>
          </a>
          <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        <div class="offcanvas-body bg-color">
          <ul class="list-unstyled">
            <!-- Register Link -->
            <li>
              <a href="https://engfuel.com/Identity/Account/Register" class="btn btn-link text-dark">
                Register
              </a>
            </li>
            <!-- Login Link -->
            <li>
              <a href="https://engfuel.com/Identity/Account/Login" class="btn btn-link text-dark">
                Login
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </nav>
</template>


<style scoped>
.btn-color {
  background-color: #101010;
}

.btn-grad {
  background-image: linear-gradient(to right, #AAFFA9 0%, #11FFBD 51%, #AAFFA9 100%);
  text-align: center;
  transition: 0.5s;
  background-size: 200% auto;
}

.btn-grad:hover {
  background-position: right center;
  color: #fff;
  text-decoration: none;
}

.btn-border-color {
  border: 1px solid #CFDD51;
}

.text-color {
  color: #cfdd51;
}

.toggler-icon {
  width: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  cursor: pointer;
}

.line {
  width: 100%;
  height: 3px;
  background-color: #cfdd51;
}

.bg-color {
  background-color: rgba(242, 244, 243, 0.1);
  backdrop-filter: blur(10px);
}

.secondary-bg-color {
  background-color: #f3f3f3;
}

.navbar-toggler {
  border: none !important;
  box-shadow: none !important;
}

.sticky {
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 9999;
}
</style>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      isMobile: true, // Adjust this based on screen size detection logic
    };
  },
  methods: {
    async handleRegister() {
      try {
        const response = await axios.get("https://engfuel.com/Identity/Account/Register");
        console.log("Register response:", response.data);
        // Handle success logic here
      } catch (error) {
        console.error("Error during registration request:", error);
      }
    },
    async handleLogin() {
      try {
        const response = await axios.get("https://engfuel.com/Identity/Account/Login");
        console.log("Login response:", response.data);
        // Handle success logic here
      } catch (error) {
        console.error("Error during login request:", error);
      }
    },
  },
};
</script>
