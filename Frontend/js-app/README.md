This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `yarn build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify

### Code structure

index.js access "root" and loads our app.js into the root.

app.js contains routing information, allowing for authenticated routes and unauthenticated ones.
These routes in turn render pages, which are located under /pages/<>.js

The pages has components, located under /components/<>.js

(Some components should and could be considered more "common" and instead located under /components/common/<>.js, e.g form field, buttons etc etc.. )

To authenticate api calls we have a fetchContext which uses the authContext (this uses localstorage and controls authentication on the client side)

Do we want client side limitations, or simply that API calls wont be successful if not logged in?

### Packages

Added some example files to make the proposed file structure visible.

- Added axios for http promises,
- Formik (forms)
- yup (validation)
- Material ui (component library built on material design, and icons from material ui)
- React-router (routing in react, do we want this or pure SPA feeling?)

### Status

Had some problem deciding wheter to go down the typescript track (seemed like there were no real proponents for this) so here is a Javascript boilerplate (depending on our needs the package structure might change). Will wait on further instructions from the analyst team to see if this is a deemeed a priority or not.

Basic first commit, will go over a couple of wierd quirks later on.
