## About

> ### That's an API attached to simple portfolio to resize different types of images with various options. The server redirects to the API's page **PROCESS**. From there you can visit the rest of the webpages and parts of the website.

#### This node project is written and transpiled by TypeScript. Eslint was used for linting, Prettier was used for formatting, Jasmine and supertest with jasmine-spec-reporter were used for testing, and Express with nodemon were used for the server. Finally, Sharp was also used for the resizing.

## Scripts

> -   `npm run lint` - For linting using Eslint.
> -   `npm run build` - For trans-piling using TS.
> -   `npm run tests` - For running all tests with Jasmine.
> -   `npm run test` - For building and testing at the same time.
> -   `npm run format` - For formatting using Prettier.
> -   `npm run start` - For starting the Express server and track using nodemon.
> -   Finally, after building you can run the server by `node dist/index.js`.

## Documentation

#### There's two main parts of this API:

-   Firstly, just resizing an image and have access to them through the thumbs folder nested in images folder.
-   Secondly, resizing an image and have a placeholder of it as a response of the resized image.

#### To use the API:

Through the URL http://localhost:8080/process/resize. From there, we can put our parameters. There are four parameters at max.

    name: Represents the image name including the extension. This one is required and have to exist in the database.
    [width]: Represents the image width in pixels and it's optional.
    [height]: Represents the image height in pixels and it's optional.
    [placeholder]: Set it if you don't want to have the resized image as a response, instead redirecting to the API's page, it takes only value 'false', and it's optional.

_**Note:** if width and height not set or set to be 0, the image size won't change. Also, if only one is declared a value, the images will resize with a fixed aspect ratio._

#### Examples:

http://localhost:8080/process/resize?name=jford.jpg&placeholder=false<br>
http://localhost:8080/process/resize?name=jford.jpg&width=500<br>
http://localhost:8080/process/resize?name=jford.jpg&width=100&height=50

---
