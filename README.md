# Dreaming Forest

## Table of Contents

- [Introduction](#Introduction)
- [Video Demonstration](#Demo)
- [Technologies Used](#Technologies)
- [Folder Structure](#Structure)
- [Component Hierarchy](#Hierarchy)
- [APIs](#API)
- [Data Model](#Data)
- [Systems](#Systems)
  - [Styling](#Styling)
  - [Database](#Database)
  - [Images](#Images)
  - [Storing of User Data](#UserData)
- [Explanation of Each Page](#Explanation)
  - [Welcome](#Welcome)
  - [Dashboard](#Dashboard)
  - [Characters](#Characters)
  - [Dailies/Weeklies](#Dailies)
  - [Bosses](#Bosses)
  - [Progression](#Progression)
  - [Settings](#Settings)
- [Credits](#Credits)

<a name="Introduction"></a>

## Introduction

The aim of this project is to remaster my previous <a href="https://github.com/midorinom/maplestory_tracker">Maplestory Tracker</a> website. I want to make big improvements all around in performance, scalability, serch engine optimisation (SEO), user experience, aesthetics and design, as well as a more organised and maintainable codebase. It is also an opportunity for me to learn and implement new technologies, mainly Next.js with its host of features to optimise React projects such as server-side rendering and many more.

You can view my designs on Figma <a href="https://www.figma.com/design/IohBAXXF9Q7OTlyMF99BhX/Dreaming-Forest?t=LR5oNgodlYfqsClm-1">here</a>. The website is deployed to Vercel and can be accessed <a href="https://dreaming-forest.vercel.app/">here</a>. As Next.js is developed by Vercel, they have naturally made it easy to integrate Next.js projects with Vercel hosting solutions. I hosted my entire project on Vercel with my Next.js app that includes both the frontend and backend server, using Vercel Postgres as my database and Vercel Blob as file storage.

<a name="Demo"></a>

## Video Demonstration

I have recorded a walkthrough of the website, showing how it looks like and explaining its key features. You can watch it <a href = "https://www.youtube.com/watch?v=5EycrPXZjI0">here</a>.

<a name="Technologies"></a>

## Technologies Used

<div style="display:flex">
<img src="/documentation/readme/Typescript.png" alt="Typescript" title="Typescript">
<img src="/documentation/readme/Next.png" alt="NextJS" title="NextJS">
<img src="/documentation/readme/React.png" alt="React" title="React">
<img src="/documentation/readme/Tailwind.png" alt="TailwindCSS" title="TailwindCSS">
<img src="/documentation/readme/DaisyUI.png" alt="DaisyUI" title="DaisyUI">
</div>

<div style="display:flex">
<img src="/documentation/readme/Drizzle.png" alt="Drizzle" title="Drizzle">
<img src="/documentation/readme/Vercel.png" alt="Vercel" title="Vercel">
<img src="/documentation/readme/Vercel_Postgres.png" alt="Vercel Postgres" title="Vercel Postgres">
<img src="/documentation/readme/Vercel_Blob.png" alt="Vercel Blob" title="Vercel Blob">
</div>

<a name="Structure"></a>

## Folder Structure

### app

`Pages`

The name of the folder corresponds to each of the URL routes. Each folder contains page.tsx, loading.tsx and layout.tsx. All pages apart from "welcome" are stored in the "(main-app)" folder.

`api`

API endpoints. Each folder inside "api" that contains a route.ts file is an endpoint, with the endpoint following the folder structure.

`lib`

Server actions, definitions, fetch functions and utility functions.

- Server actions are used inside client components to make requests to the server.
- Definitions contain Typescript type definitions.
- Fetch functions are used in server components to fetch data from the server that are then propped down to client components.
- Utility functions

`ui`

React components that make up the frontend of the website.

`documentation`

Diagrams for planning and designing various aspects of the website, as well as images that are used in the README file.

`drizzle`

Schema used for Drizzle ORM and storing migrations logs.

`public`

Static assets such as images.

`scripts`

Scripts and data that are used to seed the database, mainly to populate static data or enums.

### Root

`Config Files`

Various files used in configuration of Next, Typescript, Tailwind, Drizzle and project dependencies.

<a name="Hierarchy"></a>

## Component Hierarchy

```
"/"
Page (Server Component)
  MainAppWrapper
    TopNav
    SideNav
    Dashboard
      ActiveCharacter
      CharactersWheel
      DailiesWeeklies
        Dailies
          DailiesCard
        DailiesEdit
          DailiesEditCard
            DailyInput
        Weeklies
          WeekliesCard
        WeekliesEdit
          WeekliesEditCard
            WeeklyInput
            WeeklyTimerSelect
      Bosses
        BossesCard
      BossesEdit
        BossesEditCard

"/characters"
Page (Server Component)
  MainAppWrapper
    Characters
      ViewCharacters
        ViewCharacterCard
          ViewCharacterCardEdit
            ImageField
            IgnField
            LevelField
            ClassField
              ClassSelect
          CharacterDetails
          CharacterTracking
      RearrangeCharacters
        RearrangeCharacterCard
      AddCharacter
        ImageField
        IgnField
        LevelField
        ClassField
          ClassSelect
      DeleteCharacters
        DeleteCharacterCard

"/dailies-weeklies"
Page (Server Component)
  MainAppWrapper
    TopNav
    SideNav
    DailiesWeeklies
      Dailies
        DailiesCard
        DailiesFilter
        Pagination
      Weeklies
        WeekliesCard
        WeekliesFilter
        Pagination

"/bosses"
Page (Server Component)
  MainAppWrapper
    TopNav
    SideNav
    Bosses
      NavBar
      BossesView
        Characters
          CharacterCard
        BossesList
          BossesListCard
        BossesPagination
        Checkboxes
          CheckboxCard
        MesoTotals
      BossesEdit
        ActiveCharacter
        CharactersWheel
          CharactersWheelCard
        Editor
          EditorCard
          Pagination

"/progression"
Page (Server Component)
  MainAppWrapper
    TopNav
    SideNav
      Progression

"/settings"
Page (Server Component)
  MainAppWrapper
    TopNav
    SideNav
      Settings
        CreateAccount
          UsernameField
          PasswordField
          ConfirmPasswordField
        SyncButton
        CreateAccountButton
        ResetButton

"/welcome"
Page (Server Component)
  Welcome
    Login
      UsernameField
      PasswordField
    RegionAndCharacter
      SelectRegion
      AddCharacter
        ImageField
        IgnField
        LevelField
        ClassField
          ClassSelect
            AutoComplete
    CreateAccount
      UsernameField
      PasswordField
      ConfirmPasswordField

```

<a name="API"></a>

## APIs

All api endpoints are organised in the `/app/api` directory, as async functions inside route.ts files. Next.JS deploys all these async functions as serverless functions onto Vercel, where they are executed whenever invoked by the application.

Endpoints:

`/bosses`, `/character-images`, `/characters`, `/dailies`, `/tracking`, `/userids`, `/users`, `/weeklies`

Conventions for HTTP methods that I use:

- POST - To retrieve
- PUT - To insert data where there will never be a need to update
- PATCH - To update, and also to insert data that might be updated
- DELETE - To delete

<a name="Data"></a>

## Data Model

<img src="/documentation/readme/Data_Model.png" alt="Data Model" title="Data Model">

<a name="Systems"></a>

## Systems

<a name="Styling"></a>

### Styling

I use Tailwind for all css throughout the project, with many UI elements being imported from the DaisyUI library. The `tailwind.config.ts` file contains theme configurations and custom css classes.

<a name="Database"></a>

### Database

The Vercel database is used for storing all data apart from images with login credentials being provided in a `.env` file, which is configured in the Vercel projects management page.

When connecting to the database, Drizzle is used as an ORM to map the Typescript objects to database objects and
to perform database queries. Relevant paths are defined in the `drizzle.config.ts` file and the `schema.ts` file is used to define the table designs in the database.

Whenever the schema is changed, for the changes to be reflected in the database, a new migration has to be made by running `drizzle-kit generate` and then `drizzle-kit migrate` in the terminal. All previous migrations can be easily kept track of in the `/drizzle` directory, stored as sql files.

Static data such as enums (regions, classes etc.) and boss info are seeded into the database using the `npm seed` command in the terminal (this is configured in `package.json` to execute `tsx scripts/seed.ts`). The `seed.ts` file is where the seeding functions are set up.

<a name="Images"></a>

### Images

Images are stored in the Vercel Blob Store as large binary data. Inside the store, they are organised into directories which are named using UUIDs that correspond to userIds. All that user's character images are stored inside the directory named after their userID, with each character image being named using their character IGN, concatenated together with a generated UUID. Whenever a character is deleted, their respective image is also deleted and whenever a user's data is deleted, their user directory is deleted entirely along with all their character images.

<img src="/documentation/readme/Blob_Store.png" alt="Blob Store" title="Blob Store">

<a name="UserData"></a>

### Storing of User Data

User data is primarily stored on local storage as it allows for the most immediate storing and retrieving of all data that is dynamically changed, which happens frequently in a highly user-interactive application such as this one. When first using the website, the user is encouraged to create an account as this would then allow them to upload their data to the database and safeguard against the loss of data if their local storage were to be lost.

However, it is too computationally intensive and also slow and thus, a bad user experience if data were to be synced with the database in real-time. I decided to then use the solution of requiring the user to manually click the sync button in the settings page in order to save their data to the database. Whenever this is done, the version number property of the user data is incremented by 1.

In the `MainAppWrapper` component which is used to wrap over every page component in the application to check for whether a user is logged in, it also checks the version number of the local storage against the one in the database. If the version number in the local storage is of a smaller number, then an immediate forced sync happens where all database data is retrieved and then saved to local storage. This ensures that the user will always have their most updated data whenever they visit the website on a new device after they have previously synced on a different device.

Last logged in date is also updated as a property in the user data whenever a user logs in. This can be useful in future for cleaning up storage space by running a script to delete all user data from users that have not logged in to the website in a long time.

<a name="Explanation"></a>

## Explanation of Each Page

<a name="Welcome"></a>

### Welcome

The `MainAppWrapper` component checks whenever a user visits any of the pages in the website, whether there is any user data stored in the local storage. If there is none, the user will be redirected to the `/welcome` page where they can either log in or get started by making a new character, with the option to create a new account.

<img src="/documentation/readme/Welcome_Login.png" alt="Welcome Page - Login" title="Welcome Page - Login">

Logging in will first query the database to check whether the username exists, otherwise an error is thrown to alert the user that there is no such user. Only if the username exists, then the next query will be made to retrieve the password hash from that corresponding username, decrypt the hash and match whether the user has inputted the correct password. Upon login, all the user's data will be fetched from the database and saved to the local storage. Currently, there are no authentication technologies implemented yet.

If the user clicks on "I am new!", they get prompted to choose a region and add their first character to begin using the website.

<img src="/documentation/readme/Welcome_Select_Region.png" alt="Welcome Page - Select Region" title="Welcome Page - Select Region">
<img src="/documentation/readme/Welcome_Add_Character.png" alt="Welcome Page - Add Character" title="Welcome Page - Add Character">

Next, they will be encouraged to create an account which allows them to save their data onto the database.

<img src="/documentation/readme/Welcome_Create_Account.png" alt="Welcome Page - Create Account" title="Welcome Page - Create Account">

After this step, the initial setup is completed and they will be redirected to the dashboard page.

<a name="Dashboard"></a>

### Dashboard

This is the main page of the website where the user is expected to use the most frequently and is effectively the home page as it exists on the `/` root route. Clicking the butterfly icon on the top left while the user is in any other page will redirect them back to the Dashboard. This is an example of what the Dashboard looks like:

<img src="/documentation/readme/Dashboard_Done.png" alt="Dashboard Page - Fully Set Up" title="Dashboard Page - Fully Set Up">

A new user however, will only see this:

<img src="/documentation/readme/Dashboard_New_User.png" alt="Dashboard Page - New User" title="Dashboard Page - New User">

To add dailies, weeklies and bosses, the user has to hover over each tab, exposing an edit button that then allows them to enter a menu where they can add, edit and delete. The character wheel at the top right also only appears after the user has more than 1 character. Hovering over the icon will expand into a row of characters, allowing the user to switch between each one. Examples of the edit menus:

<img src="/documentation/readme/Dashboard_Edit_Dailies.png" alt="Dashboard Page - Edit Dailies" title="Dashboard Page - Edit Dailies">
<img src="/documentation/readme/Dashboard_Edit_Weeklies.png" alt="Dashboard Page - Edit Weeklies" title="Dashboard Page - Edit Weeklies">
<img src="/documentation/readme/Dashboard_Edit_Bosses.png" alt="Dashboard Page - Edit Bosses" title="Dashboard Page - Edit Bosses">

The reset times are based on the region selected by the user. All checked dailies and weeklie will automatically become unchecked once their respective reset time has passed. This check is done as soon as the user visits the page, right as the UI components are being mapped out. Weeklies allow for customising the reset date as different weeklies can have different reset dates, while bosses always reset on Thursday.

The edit menu of the bosses is a grid of all available bosses that when clicked, means the user wants to track that boss and adds the boss to the list. Selected bosses are coloured while the unselected ones are in grayscale.

In the main bosses view (not the edit menu), clicking a boss toggles between whether the boss is done or not. A boss that is done will have a white border around it and the boss icon will be coloured whereas the bosses that are not done will be in grayscale. Furthermore, the bosses that are done will be automatically sorted to the end of the list.

<a name="Characters"></a>

### Characters

This page is in the `/characters` URL route and can be visited by clicking the first icon on the left sidebar. This page allows the user to manage all their characters, changing the aspects they want to track, edit their details rearrange or delete them, or add new characters. The icons on the top right can be used to navigate between the View, Rearrange, Add and Delete pages. Whenever a page changes, on the top right sidebar, the previous page will then be swapped out with the page that is clicked. The default page is the View page:

<img src="/documentation/readme/Characters_View_Characters.png" alt="Characters Page - View Characters" title="Characters Page - View Characters">

The checkboxes are used to select the aspects of each character that the user wants to track. Anything that is unchecked will be hidden in their respective pages. For example, untracking Dailies will cause the Dailies tab to be hidden in the Dashboard for that particular character and in the Dailies/Weeklies page, that character will not appear.

Hovering over a character card exposes the edit icon which allows the user to edit the character's details:

<img src="/documentation/readme/Characters_Edit_Character.png" alt="Characters Page - View Characters (Edit)" title="Characters Page - View Characters (Edit)">

These are the other pages for rearranging, adding and deleting:

<img src="/documentation/readme/Characters_Rearrange_Characters.png" alt="Characters Page - Rearrange Characters" title="Characters Page - Rearrange Characters">
<img src="/documentation/readme/Characters_Add_Character.png" alt="Characters Page - Add Character" title="Characters Page - Add Character">
<img src="/documentation/readme/Characters_Delete_Characters.png" alt="Characters Page - Delete Characters" title="Characters Page - Delete Characters">

<a name="Dailies"></a>

### Dailies/Weeklies

This page is in the `/dailies-weeklies` URL route and can be visited by clicking the second icon on the left sidebar. This page allows the user to see at one glance the completion status of dailies and weeklies across all their characters. By default, all characters that have dailies and weeklies will be displayed, with a total count of all their dailies and weeklies. If all the dailies or weeklies are done, a checked icon is displayed instead.

<img src="/documentation/readme/Dailies_Weeklies.png" alt="Dailies/Weeklies Page" title="Dailies/Weeklies Page">

There is a filter on the top right of either the Dailies or Weeklies tab, that allows the user to filter out specific dailies or weeklies that they would like to check. Clicking the filter reveals a dropdown containing all the unique dailies or weeklies across all characters, clicking one will then display only characters that have that particular daily or weekly. In this filtered context, the checkbox then indicates whether or not that 1 daily or weekly is done. Clicking the checkbox also will directly toggle the done state of that particular daily or weekly for that character.

<a name="Bosses"></a>

### Bosses

This page is in the `/bosses` URL route and can be visited by clicking the third icon on the left sidebar. This page allows the user to track the bossing mesos earned for each character and across their account, as well as being able to easily see the total bossing completion of all characters. The list of bosses on the left is gathered from all the bosses that the current page of (up to 5) characters have, with the meso value for each boss differing depending on the region. All the meso values are fetched from the bosses data table in the database. The meso value displayed is total meso, in order words, the meso that would be earned if the player clears the boss solo.

<img src="/documentation/readme/Bosses_View.png" alt="Bosses Page - View" title="Bosses Page - View">

Clicking a checkbox directly increases the meso subtotal at the bottom of the column, which corresponds to the character in that same column, as well as adding to the total account meso which is in the red box all the way at the bottom. Clicking the boss icon on the left will check/uncheck all the checkboxes in that same row.

If all the checkboxes are checked, then they will all be unchecked. Otherwise, all of the checkboxes will become checked.Clicking a character image will apply this logic to all the checkboxes in that row, while clicking a meso subtotal box will apply that logic to all the checkboxes belonging to that character whose subtotal was clicked, including the checkboxes that are not shown on the current page.

Whenever a checkbox changes, the change in meso is not necessarily the same number as the one displayed in the boss list on the left, as the meso value can be divided depending on how many players cleared the boss together. This party size setting can be changed in the edit menu that is accessed by clicking the icon on the top left of the page.

<img src="/documentation/readme/Bosses_Edit.png" alt="Bosses Page - Edit" title="Bosses Page - Edit">

Apart from changing the party size, the edit menu also allows for changing the difficulty of the boss. In the main view page, the list of bosses on the left are all sensitive to the boss difficulties, meaning that it is normal for multiple of the same boss to appear in the list, if there are characters on that page that have that same boss selected but configured to be of different difficulties.

<a name="Progression"></a>

### Progression

This page is in the `/progression` URL route and can be visited by clicking the fourth icon on the left sidebar. The Progression Page is still under development, this is my figma design of what I envision the page to look like:

<img src="/documentation/readme/Progression_Figma.png" alt="Progression Page - Figma" title="Progression Page - Figma">

The purpose of this page is to allow the user to track all the gear progression of each character and to see in one infographic-style page, all the various different sources of power that contribute to their character's growth. All the boxes should be clickable to pull up a modal that allows the user to choose and set their gear or stats, depending on what was clicked.

<a name="Settings"></a>

### Settings

This page is in the `/settings` URL route and can be visited by clicking the cog icon on the top right. This page allows the user to change their region and if they have not yet created an account, there is an option to do so, along with an option to clear all their data on the local storage which then redirects them back to the `/welcome` page.

<img src="/documentation/readme/Settings.png" alt="Settings Page" title="Settings Page">

If the user already has an account and is logged in, the second button will instead be "Sync Data" which when clicked, uploads all the user's data onto the database and then increments the version number by 1. The third button will also show "Log Out" instead of "Clear Data", which still does the same thing as before of clearing all local storage and redirecting the user to the `/welcome` page. However, the data still exists on the database and can be retrieved by logging in, so "Log Out" becomes a more appropriate name for the button when the user is logged in with an account.

<a name="Credits"></a>

## Credits

All UI Icons are taken from <a href = "https://www.flaticon.com/">FlatIcon</a>. All Maplestory-related assets such as the static images used for the background, boss icons etc. belong to Nexon, the publisher and developer of Maplestory.
