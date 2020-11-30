### Authentication

The routes are now protected, this means you will have to authenticate to be able to access the site.

If you're not signed up yet and have your own credentials you can login via:
Username: Admin@admin.se
Password: 123456!a

There is currently no purpose to the select verksamhet field, so no need to use that one.

### Documentation

Living documents, e.g "education plan" and "project plan" are now found under "docs".

### Get started with the project

Install yarn: https://classic.yarnpkg.com/en/docs/getting-started
Navigate to a desirable folder -> do "git clone -b "pure-react" https://gitlab.liu.se/tddc88-company-3-2020/deploy.git" (either use the branch pure-react or a feature branch)
"cd deploy"
"yarn install"
"yarn start"

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

------------------------------------- Not auto generated below -------------------------------------

Added some example files to make the proposed file structure visible.

### Code structure

index.js access "root" and loads our app.js into the root.

app.js contains routing information, allowing for authenticated routes ("ProtectedRoutes") and unauthenticated ones.
These routes in turn render views, which are located under src/views/<>.js

The views have components, located under /components/<>.js

(Some components should and could be considered more "common" and instead located under /components/common/<>.js, e.g form field, buttons etc etc.. )

Make sure to get comfortable with https://material-ui.com/ and their component library to avoid unnecessary work. (Bootstrapy)

### Styling

The proposed styling is, inside a html element, e.g div, "<"div classname="proposed styling class here">", populate this with a suitable classname you find in tailwind, if you want padding 0, write "p-0", if you want multiple values, simply space separate the different classnames. "p-0 justify-center" etc.
Read more at: https://tailwindcss.com/

If you need to add specific styling, you could make a specific css file for that component, and load it inside that component, see how src/index.js uses src/index.css or src/app.js uses src/app.css.

### Packages

- Added axios for http promises,
- Formik (forms)
- yup (validation)
- Material ui (component library built on material design, and icons from material ui)
- React-router (routing in react, do we want this or pure SPA feeling?)
