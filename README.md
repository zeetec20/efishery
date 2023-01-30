
# EFishman

<div align="center">

<img src="https://raw.githubusercontent.com/zeetec20/efishman/master/public/mockup.png" style="border-radius: 10px;">

</div>

## Description
EFishman is a app for maintance add control price of fish.

## Development Device
- Node : 16.15.1
- NPM : 8.11.0

## Run project
- ### Development
  - Clone respository
  ```bash
  git https://github.com/zeetec20/efishman.git
  ```
  - Open repository
  ```bash
  cd efishman
  ```
  - Run command
  ```bash
  npm install
  npm run dev
  ```
- ### Docker
  - Clone respository
  ```bash
  git https://github.com/zeetec20/efishman.git
  ```
  - Open repository
  ```bash
  cd efishman
  ```
  - Run command
  ```bash
  docker build -t efishman .
  docker run -dp 3000:3000 efishman
  ```