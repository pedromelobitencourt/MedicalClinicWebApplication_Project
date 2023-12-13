# Medical Clinic Web Application

This repository contains the source code and documentation for the **Medical Clinic Web Application** project. In this project, our team has developed a web application for a medical clinic. The application is organized into two main parts: one for restricted access, intended for the clinic's internal team, and the other for the general public.

## Project Overview

### General Public Access
The public-facing part of the application provides the following features:

1. **Home Page:** Displays general information about the clinic.
2. **Gallery:** Showcases fictitious photos of the clinic.
3. **New Address:** Allows users to submit their address details.
4. **Appointment Booking:** Enables clients to schedule medical appointments.
5. **Login Page:** Provides user authentication for staff and clients.

### Restricted Access
The restricted access part of the application includes screens/pages for the following:

1. **Patient Electronic Health Record (EHR) Registration:** Allows staff to create electronic health records for patients.
2. **Clinic Staff Registration:** Permits the clinic to add new staff members to the system.
3. **Patient Registration:** Enables the registration of new patients.
4. **List of Registered Staff:** Displays a list of all registered staff members.
5. **List of Registered Patients:** Displays a list of all registered patients.
6. **List of Registered Addresses:** Provides a list of all registered addresses.
7. **List of All Appointment Bookings:** Shows all appointment bookings made by clients.
8. **List of Appointment Bookings (for Doctors):** Displays appointment bookings only for the logged-in doctor, if applicable.


## Technologies Used

Below are the main technologies and libraries used in this project, listed based on the `package.json` and `package-lock.json` files.

### Dependencies

- **[Vue.js](https://vuejs.org/)**: JavaScript framework for building user interfaces.
- **[Axios](https://axios-http.com/)**: HTTP client for making requests.
- **[Bootstrap](https://getbootstrap.com/)**: Design and styling framework.
- **[Bootstrap Vue](https://bootstrap-vue.org/)**: Vue components for Bootstrap.
- **[Core-js](https://github.com/zloirock/core-js)**: Modular set of polyfills for JavaScript.
- **[Moment.js](https://momentjs.com/)**: Date and time manipulation in JavaScript.
- **[Vue Router](https://router.vuejs.org/)**: Official router for Vue.js.
- **[Vue Select](https://vue-select.org/)**: Select component for Vue.js.
- **[Vue3 Select2 Component](https://www.npmjs.com/package/vue3-select2-component)**: Select component for Vue 3.
- **[Vuetify](https://vuetifyjs.com/)**: Vue.js component framework based on Material Design.
- **[Sass](https://sass-lang.com/)**: Styles preprocessor.

### Development Dependencies

- **[@vue/cli-plugin-babel](https://cli.vuejs.org/)**: Babel plugin for Vue CLI.
- **[@vue/cli-plugin-eslint](https://cli.vuejs.org/)**: ESLint plugin for Vue CLI.
- **[@vue/cli-service](https://cli.vuejs.org/)**: Vue CLI service.
- **[Babel-eslint](https://github.com/babel/babel-eslint)**: ESLint-compatible parser for Babel.
- **[ESLint](https://eslint.org/)**: Static code analysis tool.
- **[ESLint Plugin Vue](https://eslint.vuejs.org/)**: ESLint plugin for Vue.js.
- **[Node-sass](https://www.npmjs.com/package/node-sass)**: Node.js wrapper for LibSass.
- **[Sass-loader](https://www.npmjs.com/package/sass-loader)**: Sass loader for Webpack.
- **[@vue/cli-plugin-vuetify](https://github.com/vuetifyjs/vue-cli-plugin-vuetify)**: Vuetify plugin for Vue CLI.
- **[Vue Template Compiler](https://vuejs.org/v2/guide/installation.html#Runtime-Compiler-vs-Runtime-only)**: Template compiler for Vue.js.
- **[Vuetify-loader](https://github.com/vuetifyjs/vuetify-loader)**: Vuetify loader for Webpack.
- **[Webpack](https://webpack.js.org/)**: Module bundler.


## Getting Started

To run this web application locally, follow these steps:

### Instalation

1. Clone this repository to your local machine.
```
git clone https://github.com/pedromelobitencourt/MedicalClinicWebApp.git
```


### Frontend

1. Go to "frontend" folder
```
cd frontend
```

2. Go to "medical_clinic" folder
```
cd medical_clinic
```

3. Install the dependencies
```
npm install
```

4. Start the frontend application
```
npm start
```

5. Access the web application via your preferred web browser.
```
http://localhost:3000
```


### Backend

1. Go to "backend" folder
```
cd backend
```

2. Install the dependencies
```
npm install
```

3. Configure the database connection settings in the application to match your local environment. Check ".env" file

4. Start the frontend application
```
npm start
```

5. Access the web application via your preferred web browser.
```
http://localhost:8000
```

## Frontend Routes
- Home ("/")
  - Main route displaying information about the clinic.
  - Component: Home.vue

- Login ("/login")
  - Route to the login page.
  - Component: Login.vue

- List of Addresses ("/address")
  - Route to view the list of registered addresses.
  - Component: AddressList.vue

- Address Registration ("/address/create")
  - Route to register new addresses.
  - Component: AddressRegistration.vue

- Electronic Handbook ("/handbook")
  - Route to view the electronic handbook of the patient.
  - Component: Handbook.vue

- Electronic Handbook Creation ("/handbook/create")
  - Route to create a new electronic handbook for the patient.
  - Component: HandbookCreate.vue

- Electronic Handbook Edit ("/handbook/:id/edit")
  - Route to edit an existing electronic handbook.
  - Component: HandbookEdit.vue

- Appointment Scheduling ("/scheduling")
  - Route to the medical appointment scheduling page.
  - Component: AppointmentScheduling.vue

- Photo Gallery ("/photo")
  - Route for displaying photos related to the clinic.
  - Component: PhotoPage.vue

- Employees View ("/employees")
  - Route to view the list of registered employees.
  - Component: EmployeesView.vue

- Employee Registration ("/employees/create")
  - Route to register new employees.
  - Component: EmployeesCreate.vue

- Employee Edit ("/employees/:id/edit")
  - Route to edit information of an existing employee.
  - Component: EmployeesEdit.vue

- People View ("/people")
  - Route to view the list of registered people.
  - Component: PersonView.vue

- Person Registration ("/person/create")
  - Route to register new people.
  - Component: PersonCreate.vue

- Person Edit ("/person/:id/edit")
  - Route to edit information of an existing person.
  - Component: PersonEdit.vue

- Patient Registration ("/paciente/create")
  - Route to register new patients.
  - Component: PacienteCreate.vue

- Patient View ("/paciente")
  - Route to view the list of registered patients.
  - Component: Paciente.vue

- Patient Edit ("/paciente/:id/edit")
  - Route to edit information of an existing patient.
  - Component: PacienteEdit.vue

- Doctors View ("/doctors")
  - Route to view the list of registered doctors.
  - Component: DoctorsView.vue


## Backend Routes

1. Login ("/login")
   - **Description:**
     - Route to the login page.
   - **HTTP Method:**
     - POST
   - **Endpoint:**
     - /login

2. List of Addresses ("/address")
   - **Description:**
     - Route to view the list of registered addresses.
   - **HTTP Method:**
     - GET
   - **Endpoint:**
     - /address

3. Address Registration ("/address/create")
   - **Description:**
     - Route to register new addresses.
   - **HTTP Method:**
     - POST
   - **Endpoint:**
     - /addressRegistration

4. Electronic Handbook ("/handbook")
   - **Description:**
     - Route to view the electronic handbook of the patient.
   - **HTTP Method:**
     - GET
   - **Endpoint:**
     - /handbook

5. Electronic Handbook Creation ("/handbook/create")
   - **Description:**
     - Route to create a new electronic handbook for the patient.
   - **HTTP Method:**
     - POST
   - **Endpoint:**
     - /handbook

6. Electronic Handbook Edit ("/handbook/:id/edit")
   - **Description:**
     - Route to edit an existing electronic handbook.
   - **HTTP Method:**
     - GET, PUT
   - **Endpoint:**
     - /handbook/:id/edit

7. Appointment Scheduling ("/scheduling")
   - **Description:**
     - Route to the medical appointment scheduling page.
   - **HTTP Method:**
     - GET
   - **Endpoint:**
     - /agenda

8. Photo Gallery ("/photo")
   - **Description:**
     - Route for displaying photos related to the clinic.
   - **HTTP Method:**
     - GET
   - **Endpoint:**
     - /photo

9. Employees View ("/employees")
    - **Description:**
      - Route to view the list of registered employees.
    - **HTTP Method:**
      - GET
    - **Endpoint:**
      - /employees

10. Employee Registration ("/employees/create")
    - **Description:**
      - Route to register new employees.
    - **HTTP Method:**
      - POST
    - **Endpoint:**
      - /employees

11. Employee Edit ("/employees/:id/edit")
    - **Description:**
      - Route to edit information of an existing employee.
    - **HTTP Method:**
      - GET, PUT
    - **Endpoint:**
      - /employees/:id/edit

12. People View ("/people")
    - **Description:**
      - Route to view the list of registered people.
    - **HTTP Method:**
      - GET
    - **Endpoint:**
      - /pessoa

13. Person Registration ("/person/create")
    - **Description:**
      - Route to register new people.
    - **HTTP Method:**
      - POST
    - **Endpoint:**
      - /pessoa

14. Person Edit ("/person/:id/edit")
    - **Description:**
      - Route to edit information of an existing person.
    - **HTTP Method:**
      - GET, PUT
    - **Endpoint:**
      - /pessoa/:id/edit

15. Patient Registration ("/paciente/create")
    - **Description:**
      - Route to register new patients.
    - **HTTP Method:**
      - POST
    - **Endpoint:**
      - /pacientes

16. Patient View ("/paciente")
    - **Description:**
      - Route to view the list of registered patients.
    - **HTTP Method:**
      - GET
    - **Endpoint:**
      - /pacientes

17. Patient Edit ("/paciente/:id/edit")
    - **Description:**
      - Route to edit information of an existing patient.
    - **HTTP Method:**
      - GET, PUT
    - **Endpoint:**
      - /pacientes/:id/edit

18. Doctors View ("/medicos")
    - **Description:**
      - Route to view the list of registered doctors.
    - **HTTP Method:**
      - GET
    - **Endpoint:**
      - /medicos

19. Appointment View by Doctor ("/agenda/:medicoid")
    - **Description:**
      - Route to view the appointments for a specific doctor.
    - **HTTP Method:**
      - GET
    - **Endpoint:**
      - /agenda/:medicoid

20. Appointment View ("/agenda")
    - **Description:**
      - Route to view all appointments.
    - **HTTP Method:**
      - GET
    - **Endpoint:**
      - /agenda

21. Employees View ("/funcionarios")
    - **Description:**
      - Route to view the list of registered employees.
    - **HTTP Method:**
      - GET
    - **Endpoint:**
      - /funcionarios

22. Employees View ("/pacientes")
    - **Description:**
      - Route to view the list of registered patients.
    - **HTTP Method:**
      - GET
    - **Endpoint:**
      - /pacientes

23. People View ("/pessoa")
    - **Description:**
      - Route to view the list of registered people.
    - **HTTP Method:**
      - GET
    - **Endpoint:**
      - /pessoa
