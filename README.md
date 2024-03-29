<!-- @format -->

# Mess board

<img
  src="public/hero.png"
  alt="Mess Board screen shot"
  title="screenshot"
  style="display: inline-block; margin: 0 auto; max-width : 500px">

### What's Mess Board

A browser app to save notes, images and code in sticky cards.
All the data is stored locally on your machine

### Features

-  Four types of sticky cards : Note, Markdown, Image and Code
-  Create multiple files ("Boards")
-  Available key shortcuts to navigate fairly quickly between cards
-  Organize your cards with ctrl / cmd + O

### Idea

Like with a messy desk, keeping papers and files in a messy manner without having to be tidy.

### Limitation

-  Organizing cards is not optimal and have only to option :
   -  A grid
   -  By grouping
-  No fetching a board's data enabled

### Installing

Assuming you have Node and npm setup in your environment.

1. clone the repo

```bash
git clone https://github.com/ZouicheOmar/messBoard
```

2. install dependencies

```bash
cd messBoard
npm i
npm run setup
```

3. start the app

```bash
npm run start
```

Localhost server port from vite

<img
  src="public/port.png"
  alt="local server port information"
  title="screenshot"
  style="display: inline-block; margin: 0 auto; max-width : 600px">

You can freely access you app data, each board file (.json) is stored in `messBoard/server/uploads`, images are in `messBoard/server/media`

### Requirements

-  Node.js
-  npm
