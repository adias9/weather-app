The following application completes the required functionality with one main bug. The graph library I use has some sort of cacheing that will not all the graphs to refresh even though I'm passing new data each time.  I have tried to fix it assuming it may have had to do something with not deep cloning but it would take more time to figure out/debug. For proof I do log to the console the values as the state changes, but the graph doesn't respond to the state updating.

Please also add the env file with the keys I have supplied to be able to have the app function.

## Available Scripts

In the project directory, you can run:

### `yarn`
to install

### `yarn start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.
