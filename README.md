### Universal JS Boilerplate

---

[![NPM](https://nodei.co/npm/universal-js-boilerplate.png)](https://nodei.co/npm/universal-js-boilerplate/)

![](https://david-dm.org/matthiasak/universal-js-boilerplate.svg)

This is a scaffolding project that includes boilerplate code for:

- Node
- Heroku
- Babel, Babel runtime, ES6/2015, ES7/2016
- Express, with a default server, some example code and routes, static file sharing, and proxy code
- SCSS-like syntax driven by PostCSS
- Some example SCSS, grids, normalize and typeplate css kits (installed from bower)
- An example index.html for serving files
- An example .gitignore for the project
- A host of npm scripts for watching and building your files

#### How to get started

1. Start your own project folder with a git clone

    ```sh
    cd ~/Github\ Projects/
    git clone git@github.com:matthiasak/universal-js-boilerplate.git NEWPROJECT
    cd NEWPROJECT
    ```

2. Install prerequisites

    ```sh
    npm install

    # if you've not installed the global tools before
    npm run setup
    # otherwise, if you've installed these before
    npm run linkup
    ```

3. Start your server:

    ```sh
    npm run s

    # Alternatively, if you need nodemon to auto-reload your server
    # (when doing server-side work)
    # npm run server
    ```

4. Ready to push your code live, and want to minify your code with uglifyjs?

    ```sh
    npm run build
    ```

#### License

MIT.
