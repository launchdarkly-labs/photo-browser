import React from 'react';

export default ({markup, state}) => (
  <html>
    <head>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="stylesheet" type="text/css" href="/assets/styles.css" />
      <title>unsplash browser</title>
    </head>
    <body>
      <div
        id="app-mount"
        dangerouslySetInnerHTML={{ __html: markup }}>
      </div>

      <script
        id="app-state"
        dangerouslySetInnerHTML={{ __html: state }}>
      </script>

      <script src="/assets/client.js"></script>
    </body>
  </html>
);
