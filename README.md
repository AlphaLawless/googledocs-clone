# Google Docs Clone

A clone of the google docs from deep web. Just kidding 😆!

I was just wanting to do a google clone to learn more about the Quilljs API.

## Techs
### Front-end
- [React](https://reactjs.org) - Library I use to make the frontend.
- [Vite](https://vitejs.dev) - build tool that aims to provide a faster and leaner development experience for modern web projects.
- [Sass](https://sass-lang.com) - Responsible for front-end styling (even if little is useful).
- [Socketio](https://socket.io) - Communication between back-end - front-end.
- [Quilljs](https://quilljs.com/docs/quickstart/) - Quill is a modern WYSIWYG editor built for compatibility and extensibility.

### Back-end

- [Babel](https://babeljs.io) - Compiler the code.
- [Socketio](https://socket.io) - Communication between back-end - front-end.
- [Mongoose](https://mongoosejs.com) - Connection with mongodb.
- [Docker](https://www.docker.com) - Create a container with mongodb.
## Running project

To execute the project follow the steps:

1. Clone this repository:
```
git clone https://github.com/AlphaLawless/googledocs-clone
cd googledocs-clone
```
2. Install dependencies:
```
yarn install
```
3. Running a container with a mongodb:
```
yarn mongodb:up
```
4. Running back-end and front-end separate:
```
yarn dev:client
yarn dev:server
```
## License

[MIT LICENSE](./LICENSE)