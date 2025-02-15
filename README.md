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
- [Pictures](#Pictures)
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

Current endpoints:

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

<a name="Database"></a>

### Database

<a name="Images"></a>

### Images

<a name="UserData"></a>

### Storing of User Data

<a name="Explanation"></a>

## Explanation of Each Page

<a name="Welcome"></a>

### Welcome

<a name="Dashboard"></a>

### Dashboard

<a name="Characters"></a>

### Characters

<a name="Dailies"></a>

### Dailies/Weeklies

<a name="Bosses"></a>

### Bosses

<a name="Progression"></a>

### Progression

<a name="Settings"></a>

### Settings

<a name="Pictures"></a>

## Pictures

Some pictures of what the website looks like!

<img src="/documentation/readme/Welcome_Login.png" alt="Welcome Page - Login" title="Welcome Page - Login">
<img src="/documentation/readme/Welcome_Select_Region.png" alt="Welcome Page - Select Region" title="Welcome Page - Select Region">
<img src="/documentation/readme/Welcome_Add_Character.png" alt="Welcome Page - Add Character" title="Welcome Page - Add Character">
<img src="/documentation/readme/Welcome_Create_Account.png" alt="Welcome Page - Create Account" title="Welcome Page - Create Account">
<img src="/documentation/readme/Dashboard_New_User.png" alt="Dashboard Page - New User" title="Dashboard Page - New User">
<img src="/documentation/readme/Dashboard_Edit_Dailies.png" alt="Dashboard Page - Edit Dailies" title="Dashboard Page - Edit Dailies">
<img src="/documentation/readme/Dashboard_Edit_Weeklies.png" alt="Dashboard Page - Edit Weeklies" title="Dashboard Page - Edit Weeklies">
<img src="/documentation/readme/Dashboard_Edit_Bosses.png" alt="Dashboard Page - Edit Bosses" title="Dashboard Page - Edit Bosses">
<img src="/documentation/readme/Dashboard_Done.png" alt="Dashboard Page - Fully Set Up" title="Dashboard Page - Fully Set Up">
<img src="/documentation/readme/Characters_View_Characters.png" alt="Characters Page - View Characters" title="Characters Page - View Characters">
<img src="/documentation/readme/Characters_Edit_Character.png" alt="Characters Page - View Characters (Edit)" title="Characters Page - View Characters (Edit)">
<img src="/documentation/readme/Characters_Rearrange_Characters.png" alt="Characters Page - Rearrange Characters" title="Characters Page - Rearrange Characters">
<img src="/documentation/readme/Characters_Add_Character.png" alt="Characters Page - Add Character" title="Characters Page - Add Character">
<img src="/documentation/readme/Characters_Delete_Characters.png" alt="Characters Page - Delete Characters" title="Characters Page - Delete Characters">
<img src="/documentation/readme/Dailies_Weeklies.png" alt="Dailies/Weeklies Page" title="Dailies/Weeklies Page">
<img src="/documentation/readme/Bosses_View.png" alt="Bosses Page - View" title="Bosses Page - View">
<img src="/documentation/readme/Bosses_Edit.png" alt="Bosses Page - Edit" title="Bosses Page - Edit">
<img src="/documentation/readme/Settings.png" alt="Settings Page" title="Settings Page">

The Progression Page is still under development, this is the figma design:

<img src="/documentation/readme/Progression_Figma.png" alt="Progression Page - Figma" title="Progression Page - Figma">

<a name="Credits"></a>

## Credits
