<<template>
    <div>
      <!-- Floating Booking Icon -->
      <a
        id="Setmore_button_iframe"
        href="https://booking.setmore.com/scheduleappointment/d912569d-b6f9-4b9f-8c6b-142b1e40e834"
        rel="noopener noreferrer"
        class="booking-icon"
      >
        <i class="bi bi-calendar-fill"></i>
        <span class="booking-text">Book Now</span>
      </a>
    </div>
  </template>
  
  <script>
  export default {
    name: "BookingButton",
    mounted() {
      // Inject Setmore script dynamically
      const script = document.createElement("script");
      script.id = "setmore_script";
      script.type = "text/javascript";
      script.src =
        "https://storage.googleapis.com/fullintegration-live/webComponentAppListing/Container/setmoreIframeLive.js";
      document.body.appendChild(script);
    },
  };
  </script>
  
  <style scoped>
  /* Styles for the floating booking button */
  .booking-icon {
    position: fixed;
    bottom: 20px;
    right: 20px;
    background-color: #0b1c07; /* Primary button color */
    color: white;
    border-radius: 30px; /* Oval appearance to fit text */
    height: 50px;
    padding: 0 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    text-decoration: none;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    z-index: 1000;
    transition: background-color 0.3s ease;
  }
  
  .booking-icon:hover {
    background-color: #1c434d; /* Darker hover color */
    text-decoration: none;
  }
  
  .booking-icon i {
    font-size: 1.5rem; /* Size of the calendar icon */
    margin-right: 10px;
  }
  
  .booking-text {
    font-size: 1rem; /* Adjust text size */
    font-weight: bold;
    color: white;
  }
  </style>
  >