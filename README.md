# sx-dashboard
Online dashboard for the IoT sensor project.
## React Component

Running the app:  
While in the project directory, run  
`npm start` or `yarn start`  
to run the application at http://localhost:3000.  
<br />

Building the app:  
`npm build` or `yarn build`  
will build the application for production.

### File Structure

**assets**:  
Contains any assets the application will use, such as styles and images.  
<br />

**components**:  
Components that will be rendered in each view/layout are found in this folder.  
<br />

**layout**:  
The main layout component is found here, it essentially just renders the Sidebar component.  
<br />

**server**:  
Server components, see [Server Component](#server-component).  
<br />

**__test__**:  
Contains jest tests.  
<br />

**theme**:  
Defines the theme for the @material-ui library.  
<br />

**views**:  
Contains a folder for each section linked to by the sidebar.  
<br />

**index.js**:  
Entry point for the application.  
<br />

## Server Component

The backend of the application is made using [go](https://golang.org/).  
Go files are found in src/server/src/go.  
**mqtt.go**:  
MQTT client that receives all the sensor data sent by the broker it has subscribed to.  
<br />

**server.go**:  
Sets up the http server, and contains the main() function that the app enters at.  
<br />

**socket.go**:  
Sets up a websocket server that will send out each new mqtt data to a client.  
<br />

**sql.go**:  
Retrieves all SQL data returned from a specified query, and responds to the 'GET' request with said data.  
<br />

To build,  
 `go build -o ../../build/main.exe server.go mqtt.go sql.go socket.go`  
 will create an executable named main.exe in the build folder (You can change the path and name). To build for cross-platform, or specific platforms, reference https://golang.org/pkg/go/build/.  

 If you are just running the files to test, make sure to run all of them at once, as they all rely on each other.  
 `go run server.go mqtt.go sql.go socket.go`
