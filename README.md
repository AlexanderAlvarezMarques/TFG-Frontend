# TFG
## Index
* [Introduction](#introduction)
* [Requirements](#requirements)
* [Installation](#installation)
* [Usage](#usage)
* [Structure](#structure)
* [Results](#results)
* [References](#references)

## Introduction

This project is a part of my final degree project.
The main objective it to create an app that allow the users to create and manage a reservation in a sport center.

## Requirements

This project got the following requirements:
* reduxjs/toolkit: ^1.9.7
* @types/react-datepicker: ^4.19.2,
* axios: ^1.5.1,
* eslint-plugin-react-hooks: ^4.6.0,
* next: 13.5.4,
* react: ^18.2.0,
* react-datepicker: ^4.21.0,
* react-dom: ^18.2.0,
* react-redux: ^8.1.3,
* react-select: ^5.8.0

## Installation
```
npm install
```

## Usage
```
npm run dev
```

## Structure

* src/
  * app
    App pages
  * assets
    * bootstrap
    * sass:
        * globals.scss: Global styles
        * _variables.scss: Global variables
        * _forms.scss: Global styles for forms
        * _modals.scss: Global styles for modals
        * partial/page.module.scss: Styles for each page
  * components
    * Footer
    * Header
    * Modal: Modals used in the app
    * Shared: Components that are used in more than one page
  * enums: Enums used in the app. These are to simplify the code and make it more readable
  * lib: Libraries used in the app
    * api: Api calls
    * exception: Exceptions used in the app
  * partials: Partials that contains the information of each page, components, modal, etc.
  * redux: Redux files
    * reducers
    * store
  * services
    * api: Services to simplify the api calls. This services can control the data returned by the api
  * types: Custom types used in the app
  * utils: Other files used in the app. Axios global configuration, api tools, etc.


## Results

A web app that allow the users to create and manage a reservation in a sport center.
Also allow the admin to manage the users and the reservations.
This app must be able to add new sport centers.

## References

* [Next.js](https://nextjs.org/)
* [React](https://reactjs.org/)
* [Redux](https://redux.js.org/)
* [React-Redux](https://react-redux.js.org/)
