# Dreaming Forest

## Table of Contents
* [Introduction](#Introduction)
* [Technologies Used](#Technologies)
* [Data Model](#Data)
* [Folder Structure](#Structure)
* [Component Hierarchy](#Hierarchy)
* [Pictures](#Pictures)

<a name="Introduction"></a>
## Introduction
This is still a work in progress! The aim of this project is to remaster my previous <a href="https://github.com/midorinom/maplestory_tracker">Maplestory Tracker</a> website, to make big improvements all around in performance, scalability, serch enginer optimisation (SEO), user experience, aesthetics and design, as well as a more organised and maintainable codebase. It is also an opportunity for me to learn and implement new technologies, mainly Next.js with its host of features to optimise React projects such as server-side rendering and many more.

This project is also the first time where I used Figma to create extensive prototypes before developing the website and I found it to be extremely useful, making the development process more productive and effective! You can view my designs on Figma <a href="https://www.figma.com/design/IohBAXXF9Q7OTlyMF99BhX/Dreaming-Forest?t=LR5oNgodlYfqsClm-1">here</a>.

The website is deployed to Vercel and can be accessed <a href="https://dreaming-forest.vercel.app/">here</a>. As Next.js is developed by Vercel, they have naturally made it easy to integrate Next.js projects with Vercel hosting solutions. I hosted my entire project on Vercel with my Next.js app that includes both the frontend and backend server, using Vercel Postgres as my database and Vercel Blob as file storage.

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
```Pages```

The name of the folder corresponds to each of the URL routes. Each folder contains page.tsx, loading.tsx and layout.tsx. All pages apart from "welcome" are stored in the "(main-app)" folder.

```api```

API endpoints. Each folder inside "api" that contains a route.ts file is an endpoint, with the endpoint following the folder structure.

```lib```

Server actions, definitions and fetch functions.
- Server actions are used inside client components to make requests to the server.
- Definitions contain Typescript type definitions.
- Fetch functions are used in server components to fetch data from the server that are then propped down to client components.

```ui```

React components that make up the frontend of the website.

```documentation```

Diagrams for planning and designing various aspects of the website, as well as images that are used in the README file.

```drizzle```

Schema used for Drizzle ORM and storing migrations logs.


```public```

Static assets such as images.

```scripts```

Scripts and data that are used to seed the database, mainly to populate static data or enums.

### Root
```Config Files```

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

"/dailies-weeklies"
Page (Server Component)
  MainAppWrapper
    TopNav
    SideNav
    DailiesWeeklies

"/bosses"
Page (Server Component)
  MainAppWrapper
    TopNav
    SideNav
      Bosses

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
        ResetButton

"/welcome"
Page (Server Component)
  Welcome
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

<a name="Data"></a>
## Data Model
<img src="/documentation/readme/Data_Model.png" alt="Data Model" title="Data Model">

<a name="Pictures"></a>
## Pictures
Some pictures of what the website looks like so far!




