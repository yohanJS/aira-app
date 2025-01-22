<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div id="bookingFormContainer" class="container p-0 text-dark">
    <div class="row m-0 p-4 text-center text-white" style="background-color: #454B1BB8;">
      <div class="col-12">
        <h4>TRUST OUR HVAC EXPECTS</h4>
        <p>Professional cooling and heating services at your finger tips</p>
        <p v-if="step === 1" class="text-center mb-0 select-txt-color">Select service</p>
        <!--Step 2-->
        <div class="row align-items-center" v-if="step === 2">
          <!-- Left arrow -->
          <div class="col-3 text-start">
            <i @click="goToStep(1)" id="step1" class="bi bi-arrow-left-circle fs-5"></i>
          </div>

          <!-- Center text -->
          <div class="col-6 text-center">
            <p class="mb-0 select-txt-color">Select date</p>
          </div>

          <!-- Right arrow -->
          <div class="col-3 text-end">
            <i @click="goToStep(3)" id="step3" class="bi bi-arrow-right-circle fs-5"></i>
          </div>
        </div>
        <!--Step 3-->
        <div class="row align-items-center" v-if="step === 3">
          <!-- Left arrow -->
          <div class="col-3 text-start">
            <i @click="goToStep(2)" id="step1" class="bi bi-arrow-left-circle fs-5"></i>
          </div>

          <!-- Center text -->
          <div class="col-6 text-center">
            <p class="mb-0 select-txt-color">Select time</p>
          </div>

          <!-- Right arrow -->
          <div class="col-3 text-end">
            <i @click="goToStep(4)" id="step3" class="bi bi-arrow-right-circle fs-5"></i>
          </div>
        </div>
        <!--Step 4-->
        <div class="row align-items-center" v-if="step === 4">
          <!-- Left arrow -->
          <div class="col-3 text-start">
            <i @click="goToStep(3)" id="step3" class="bi bi-arrow-left-circle fs-5"></i>
          </div>

          <!-- Center text -->
          <div class="col-8 text-start">
            <p class="mb-0 select-txt-color">Enter personal details</p>
          </div>
        </div>
      </div>
    </div>

    <form @submit.prevent="submitForm" class="p-2 rounded-1">
      <!--Booking Details-->
      <!-- Booking Details -->
      <div v-if="step === 4 && formData.service !== ''" class="p-4 m-3 rounded box-shadow form-style">
        <i class="bi bi-info-circle fs-5"></i>
        <p class=" fs-6 fw-bold">Your Appointment Details:</p>
        <div class="mb-2 m-3">
          <p class="mb-1"><strong>Service:</strong> {{ formData.service }}</p>
          <p class="mb-1"><strong>Date:</strong> {{ formattedDate }}</p>
          <p v-if="formattedTime !== ''" class="mb-1"><strong>Time:</strong> {{ formattedTime }} </p>
          <p v-else class="text-danger">Select time</p>
        </div>
      </div>

      <!-- Step 1: Booking Service -->
      <div v-if="step === 1">
        <div class="d-flex flex-column gap-3 mb-5">
          <div v-for="service in services" :key="service.id" class="service-card border-0 rounded-2 m-3 btn"
            @click="selectService(service)">
            <div class="overlay rounded-2 d-flex flex-row align-items-center p-3">
              <!-- Small image on the left -->
              <img :src="service.image" alt="Service Image" class="me-3 rounded-2" style="width: 100px; height: 100%; object-fit: cover;">

              <!-- Description on the right -->
              <div class="service-info d-flex flex-column text-start">
                <h4 class="mb-1 card-header">{{ service.name }}</h4>
                <p class="mb-2" style="font-size: 0.8rem;">{{ service.description }}</p>
              </div>

              <!-- Arrow icon stays in the same place -->
              <div class="text-end ms-auto mt-5 pt-5">
                <i class="bi bi-arrow-right-circle orange-txt fs-4"></i>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Step 2: Date -->
      <div v-if="step === 2">
        <div class="datepicker-container m-2 mx-auto">
          <div class="calendar rounded-2">
            <div class="calendar-header">
              <button @click="prevMonth" class="nav-button" type="button">‹</button>
              <span>{{ monthNames[currentMonth] }} {{ currentYear }}</span>
              <button @click="nextMonth" class="nav-button" type="button">›</button>
            </div>
            <div class="calendar-body">
              <div class="calendar-weekdays">
                <span v-for="day in weekdays" :key="day" class="weekday">{{ day }}</span>
              </div>
              <div class="calendar-dates">
                <span v-for="(date, index) in getDates()" :key="index"
                  :class="['date', { 'current-date': isToday(date), 'selected-date': isSelectedDate(date) }]"
                  @click="selectDate(date)">
                  {{ date.getDate() }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Step 3: Time Picker -->
      <div v-if="step === 3">
        <div class="timepicker-container m-2 mx-auto rounded-2">
          <div class="time-grid">
            <div v-for="(time, index) in timeSlots" :key="index"
              :class="['time-box shadow-sm', { 'taken': takenTimes.includes(time), 'selected': selectedTime === time }]"
              @click="!takenTimes.includes(time) && selectTime(time)">
              {{ time }}
            </div>
          </div>
        </div>
      </div>

      <!-- Step 4: Personal Details -->
      <div v-if="step === 4">
        <!--In Person-->
        <div class="p-3 m-3 rounded-2 box-shadow form-style">
          <!--In Person-->
          <div>
            <div class="mb-2">
              <label for="name" class="form-label">Name</label>
              <input type="text" id="name" class="form-control" v-model="formData.name" placeholder="" required />
            </div>

            <div class="mb-2">
              <label for="email" class="form-label">Email</label>
              <input type="email" id="email" class="form-control" v-model="formData.email" placeholder="" required />
            </div>

            <div class="mb-2">
              <label for="phone" class="form-label">Phone Number</label>
              <input type="tel" id="phone" class="form-control" v-model="formData.phone" placeholder="" required />
            </div>

            <div class="mb-2">
              <label for="street" class="form-label">Street Address</label>
              <input type="text" id="street" class="form-control" v-model="formData.street" placeholder="" required />
            </div>

            <div class="row mb-2">
              <div class="col">
                <label for="city" class="form-label">City</label>
                <input type="text" id="city" class="form-control" v-model="formData.city" placeholder="" required />
              </div>
              <div class="col">
                <label for="state" class="form-label">State</label>
                <input type="text" id="state" class="form-control" v-model="formData.state" placeholder="" required />
              </div>
              <div class="col">
                <label for="zip" class="form-label">ZIP Code</label>
                <input type="text" id="zip" class="form-control" v-model="formData.zip" placeholder="" required />
              </div>
            </div>
          </div>
          <!--Buttons Section-->
          <div class="d-flex justify-content-end mt-4">
            <div v-if="displaySpinnerMessage">
              <button class="btn btn-outline-dark border-0" type="button" disabled>
                <span class="spinner-border spinner-border-sm" aria-hidden="true"></span>
              </button>
            </div>
            <div v-else>
              <button type="submit" class="submit-btn mt-3 mb-3">
                Submit
                <i class="bi bi-send-check-fill"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </form>

    <!--SUCCESS MODAL-->
    <div>
      <div class="modal fade" id="submissionModal" tabindex="-1" aria-labelledby="submissionModalLabel"
        aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content modern-modal rounded-2 border-0 shadow-lg">
            <div class="modal-header border-0">
              <button type="button" class="btn-close text-dark" data-bs-dismiss="modal" aria-label="Close" @click="goToHome()"></button>
            </div>
            <div class="modal-body text-center p-4">
              <h5 class="modal-title fw-bold mb-1">Thank You!</h5>
              <i class="bi bi-emoji-smile-fill fs-4"></i>
              <p>
                Your appointment has been successfully scheduled.
                We’ll be in touch soon! Please check your email for confirmation, and
                <span class="text-danger fw-bold">
                  don't forget to check your spam or junk folder if you don't see it in your inbox.
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
      <!--<div v-if="errorMessage != ''" class="alert alert-danger mt-2" role="alert">
        {{ errorMessage }}
      </div>-->
    </div>
  </div>
</template>

<!--JS-->
<script>
import moment from 'moment';
import axiosClient from "../util/axiosClient";
import { Modal } from "bootstrap";
import serviceImg1 from '/assets/serviceImg1.png';
import serviceImg2 from '/assets/serviceImg2.png';
import serviceImg3 from '/assets/serviceImg3.png';
import serviceImg4 from '/assets/serviceImg4.png';
import serviceImg5 from '/assets/serviceImg5.png';
import serviceImg6 from '/assets/serviceImg6.png';

export default {
  name: "BookingForm",
  components: {
  },
  data() {
    const today = new Date();
    return {
      isPrd: true,
      CreateBookingUrl: "",
      displaySpinnerMessage: false,
      currentYear: today.getFullYear(),
      currentMonth: today.getMonth(),
      selectedDate: today,
      weekdays: Array.from({ length: 7 }, (_, index) => moment().weekday(index).format('ddd')),
      monthNames: Array.from({ length: 12 }, (_, index) => moment().month(index).format('MMMM')),
      timeSlots: this.generateTimeSlots(),
      selectedTime: null,
      takenTimes: [],
      step: 1,
      isInPerson: false,
      isSubmissionOk: false,
      formData: {
        businessId: "YohanJS",
        name: "",
        email: "",
        phone: "",
        street: "",
        city: "",
        state: "",
        zip: "",
        service: "",
        meetingType: "",
        date: "",
        time: "",
      },
      services: [
        {
          name: "AC REPAIR",
          description: "Fast and reliable air conditioning repair services to restore comfort to your home.",
          image: serviceImg1,
        },
        {
          name: "AC MAINTENANCE",
          description: "Comprehensive maintenance plans to keep your air conditioning running efficiently year-round.",
          image: serviceImg2,
        },
        {
          name: "AC INSTALLATION",
          description: "Professional and energy-efficient air conditioning installations tailored to your needs.",
          image: serviceImg3,
        },
        {
          name: "AIR DUCT CLEANING",
          description: "Improve Indoor Air Quality. Professional Air Duct Cleaning.",
          image: serviceImg5,
        },
        {
          name: "INDOOR AIR QUALITY TESTING",
          description: "Identify & Eliminate Indoor Air Pollutants. Comprehensive IAQ Testing.",
          image: serviceImg6,
        },
                {
          name: "UV LIGHT INSTALL",
          description: "Prevent Mold & Bacteria Growth. UV Light Installation for Your HVAC System.",
          image: serviceImg4,
        },
      ],
    };
  },
  computed: {
    formattedTime() {
      // Format as HH:MM AM/PM
      if (this.selectedTime === "" || this.selectedTime === null) {
        return ""
      }
      return moment(this.selectedTime, 'HH:mm').format('h:mm A');
    },
    formattedDate() {
      return moment(this.selectedDate).format('MM/DD/YYYY dddd');
    }
  },
  async created() {
    //this.$nextTick() ensures that any DOM updates triggered by changes to this.services are completed before proceeding.
    await this.$nextTick();
    const container = document.getElementById("bookingFormContainer");
    container.scrollIntoView({ behavior: "smooth", block: "start" });

    this.CreateBookingUrl = this.isPrd ? "https://engfuel.com/Bookings/CreateBooking" : "https://localhost:7144/Bookings/CreateBooking";
    this.GetTimes = this.isPrd ? "https://engfuel.com/Bookings/GetTimes" : "https://localhost:7144/Bookings/GetTimes";
  },
  methods: {
    validateFormData(formData) {
      for (const key in formData) {
        const value = formData[key];

        if (typeof value === 'object') {
          // Recursively validate nested objects
          if (this.validateFormData(value)) {
            return true;
          }
        } else if (value === null || value === '') {
          alert(`Please fill in the ${key} field.`);
          return false;
        }
      }
    },
    selectService(service) {
      this.formData.service = service.name;
      this.goToStep(2);
    },
    inPersonMeeting(bool) {
      if (bool === true) {
        this.formData.meetingType = "In Person";
        this.isInPerson = true;
      } else if (bool === false) {
        this.isInPerson = false;
        this.formData.meetingType = "Online/Phone";
      }
      this.goToStep(3);
    },
    goToStep(stepNumber) {
      // Check if the step has changed
      if (this.step !== stepNumber) {
        // Scroll up to the top of the page
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
      }
      // Set the new step
      this.step = stepNumber;
    },
    getDates() {
      const dates = [];
      const startOfMonth = moment([this.currentYear, this.currentMonth]); // Start of the current month
      const endOfMonth = moment(startOfMonth).endOf('month'); // End of the current month

      // Add days from the previous month to fill the first week
      const startDay = startOfMonth.day(); // 0 (Sunday) to 6 (Saturday)
      for (let i = 0; i < startDay; i++) {
        dates.push(moment(startOfMonth).subtract(startDay - i, 'days').toDate());
      }

      // Add all dates from the current month
      for (let i = 0; i < endOfMonth.date(); i++) {
        dates.push(moment(startOfMonth).add(i, 'days').toDate());
      }

      // Add days from the next month to complete the grid
      const remainingDays = 7 - (dates.length % 7);
      for (let i = 1; i <= remainingDays && remainingDays < 7; i++) {
        dates.push(moment(endOfMonth).add(i, 'days').toDate());
      }

      return dates;
    },
    prevMonth() {
      this.currentMonth -= 1;
      if (this.currentMonth < 0) {
        this.currentMonth = 11;
        this.currentYear -= 1;
      }
    },
    nextMonth() {
      this.currentMonth += 1;
      if (this.currentMonth > 11) {
        this.currentMonth = 0;
        this.currentYear += 1;
      }
    },
    selectDate(date) {
      this.selectedDate = date;
      this.formData.date = moment(date).format('YYYY/MM/DD');
      this.fetchTimes(moment(date).format('YYYY/MM/DD'));
      this.goToStep(3);
    },
    isToday(date) {
      const today = new Date();
      return (
        date.getFullYear() === today.getFullYear() &&
        date.getMonth() === today.getMonth() &&
        date.getDate() === today.getDate()
      );
    },
    isSelectedDate(date) {
      return (
        this.selectedDate.getFullYear() === date.getFullYear() &&
        this.selectedDate.getMonth() === date.getMonth() &&
        this.selectedDate.getDate() === date.getDate()
      );
    },
    generateTimeSlots() {
      const slots = [];
      const startTime = moment().startOf('day').hour(8); // Start at 8:00 AM
      const endTime = moment().startOf('day').hour(18); // End at 6:00 PM
      while (startTime <= endTime) {
        slots.push(startTime.format('h:mm A'));
        startTime.add(15, 'minutes'); // Increment by 15 minutes
      }
      return slots;
    },
    selectTime(time) {
      this.selectedTime = time;
      this.formData.time = time;
      this.goToStep(4);
    },
    async fetchTimes(date) {
      await axiosClient.get(this.GetTimes, { params: { serviceDate: date } })
        .then((response) => {
          this.takenTimes = response.data;
        });
    },
    async submitForm() {
      try {
        this.displaySpinnerMessage = true;
        await axiosClient
          .post(
            this.CreateBookingUrl,
            {
              BusinessId: this.formData.businessId,
              Name: this.formData.name,
              Email: this.formData.email,
              Phone: this.formData.phone,
              Street: this.formData.street,
              City: this.formData.city,
              State: this.formData.state,
              ZipCode: this.formData.zip,
              Service: this.formData.service,
              date: this.formData.date,
              Time: this.formData.time,
            },
          )
          .then(this.isSubmissionOk = true);

        const modalElement = document.getElementById("submissionModal");
        const submissionModal = new Modal(modalElement);

        if (this.isSubmissionOk) {
          submissionModal.show();
        }
      } catch (error) {
        alert("Failed to submit form. Please try again.", error);
      }
      // Clear the form
      this.step = 1;
      this.formData = {
        name: "",
        email: "",
        phone: "",
        street: "",
        city: "",
        state: "",
        zip: "",
        service: "",
        date: "",
        time: "",
      };
      this.displaySpinnerMessage = false;
      // Handle form submission (e.g., send to an API)
      //alert(`Booking submitted: \n${JSON.stringify(this.formData, null, 2)}`);
    },
    goToHome() {
      window.location.href = "/";
    },
  },
};
</script>

<!--CSS-->
<style scoped>
.select-txt-color {
  color: #F6A487;
}

.f-s {
  font-size: 0.8rem;
}

.orange-txt {
  color: #F28C28;
}

.max-w {
  max-width: 300px;
}

.my-bg {
  background-color: #1a1919 !important;
}

.small-btn {
  font-size: 0.7rem !important;
}

.form-check-input {
  background-color: #000000 !important;
  border: 1px solid #2C3539;
}

p,
label {
  font-size: 1.2rem;
}

.steel-blue-color {
  color: #4682B4;
}

.box-shadow {
  box-shadow: 2px 2px 5px rgba(200, 200, 200, 0.3);
}

.service-card {
  font-size: 0.8rem;
  background-size: cover;
  background-position: center;
  position: relative;
  min-height: 150px;
}

.service-card .overlay {
  background-color: #d9d9d9;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}

.card-header {
  font-size: 1.2rem;
}

.form-label {
  font-size: 1rem !important;
}

.form-select {
  font-size: 0.8rem !important;
}
.submit-btn {
    border: none;
    outline: none;
    background: #F6A487;
    color: #fff;
    border-radius: 40px;
    padding: 10px 20px;
    text-align: center;
    box-shadow: 0 6px 20px -5px rgba(0,0,0,0.4);
    position: relative;
    overflow: hidden;
    cursor: pointer;
}
.submit-btn:hover {
  color: #1a1919;
  background-color: #d9d9d9;
  border-radius: 40px;
}
.container {
  max-width: 500px;
  margin: 0 auto;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

h2 {
  font-size: 1.8rem;
  color: #333;
}

button:hover {
  background-color: #0056b3;
  border-radius: 5px;
}

.text-muted {
  font-size: 0.9rem;
  font-style: italic;
}

.price {
  font-size: 0.7rem;
}

/*InPerson/Online CSS*/
.datepicker-container {
  max-width: 350px;
  margin: 0 auto;
  font-family: Arial, sans-serif;
}

.calendar {
  color: #000;
  font-size: 1rem;
  padding: 10px;
  box-shadow: 2px 2px 5px rgba(200, 200, 200, 0.3);
  background-color: #d9d9d9;
}

.calendar-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
  font-weight: bold;
}

.nav-button {
  border: none;
  background: none;
  cursor: pointer;
  font-size: 2rem;
  padding: 5px;
  color: #F28C28;
}

.calendar-weekdays,
.calendar-dates {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  text-align: center;
  gap: 5px;
}

.weekday {
  font-weight: bold;
}

.date {
  cursor: pointer;
  padding: 8px;
  border-radius: 50%;
  transition: background-color 0.3s ease;
}

.date:hover {
  background-color: #4682B4;
}

.current-date {
  background-color: #ffffff;
  color: #000000;
}

.selected-date {
  background-color: #E9A992;
  color: #000;
}

/*TIME PICKER CSS*/
.timepicker-container {
  padding: 10px;
  box-shadow: 2px 2px 5px rgba(200, 200, 200, 0.3);
  background-color: #d9d9d9;
  max-width: 350px;
}

.time-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  /* 3 boxes per row */
  gap: 5px;
}

.time-box {
  font-size: 0.9rem;
  text-align: center;
  padding: 2px;
  border: 1px solid #ddd;
  border-radius: 4px;
  color: #000;
  cursor: pointer;
  transition: background-color 0.3s;
}

.time-box.taken {
  background-color: #E9A992;
  cursor: not-allowed;
  color: #000;
}

.time-box.selected {
  background-color: #E9A992;
  color: #000;
}

/* ONLY DESKTOP */
@media screen and (min-width: 800px) {
  .time-box:hover:not(.taken):not(.selected) {
    background-color: #888585;
  }
}

/*MODAL*/
.modern-modal {
  background-color: #d9d9d9;
  color: #000;
}

.modal-title {
  font-size: 1.5rem;
  color: #000;
}

.modal-body {
  font-family: "Roboto", sans-serif;
  line-height: 1.6;
}

.btn-close {
  filter: invert(1);
  color: #000;
  background-color: #fff;
  border-radius: 20px;
}

.shadow-lg {
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
}

.rounded-3 {
  border-radius: 1rem !important;
}

.form-style {
  background-color: #d9d9d9;
}
</style>
