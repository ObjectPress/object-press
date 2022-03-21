  <p align="center">
    <a href="https://www.objectpress.io">
      <img src="https://share.objectpress.io/logo-circle.png" alt="logo" width="145" height="145">
    </a> 
  </p>

  <br />

  <p align="center">
    An awesome way to jumpstart your way into the Jamstack!
  </p>

  <br />

  <h2 align="center">Object Press is a FREE headless content management system.</h2>

  <br />

  <p align="center">
    <a href="https://www.objectpress.io">
      <img src="https://share.objectpress.io/dashboard.png" alt="dashboard" width="auto" height="500">
    </a>
  </p>

## Main Features

- 99.99% UP time for all content.
- Content is delivered via serverless and scalable endpoints to handle various levels of traffic appropriately.
- You can add content using markdown, create unique fields for your app, and upload your images to our servers for free.

## Implementation

1. Sign up at [objectpress.io](https://www.objectpress.io)
2. Create your content
3. Update the APP_SECRET and USER_SECRET in your gatsby-config.js file to deploy

```js
// loads the source-plugin and adds credentials
    {
      resolve: `gatsby-plugin-objectpress`,
      options: {
        appSecret: `APP_SECRET`,
        userSecret: `USER_SECRET`,
      },
    },
```

## Getting Started

Join the conversation via [Slack](https://join.slack.com/t/object-press/shared_invite/zt-15dx55b3l-ApogR4eHsbA8RWK_es5cLw).

## Contributing

Contributions are what make the open source community such an amazing place to be learn, inspire, and create. If you're interested in the project, please reach out and check the [docs](https://docs.objectpress.io). Any contributions are **greatly appreciated**.

1. Fork the Project, register via email (Google login does not work locally)
2. Create your Feature/Fix Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request using the PR template, use semantic versioning when appropriate

## License

Distributed under the ISC License.

## Contact

Email - hello@objectpress.io

GitHub - [github.com/ObjectPress](https://github.com/ObjectPress)
