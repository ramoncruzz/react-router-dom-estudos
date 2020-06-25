import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  NavLink,
  useRouteMatch,
  useParams,
  Redirect,
} from "react-router-dom";

export default function App() {
  return (
    <Router>
      <div style={{flex:1, backgroundColor: 'blue'}}>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <NavLink to="/about" activeClassName="hurray">About</NavLink>
            </li>
            <li>
              <Link to="/users">Users</Link>
            </li>
            <li>
              <Link to="/topics">Topics</Link>
            </li>
          </ul>
        </nav>
       
        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
            <span>oi</span>
        <Switch>
          <Route path="/about">
            <About />
          </Route>
          <Route path="/users">
            <Users />
          </Route>
          <Route path="/topics">
            <Topics />
          </Route>
          <Route component={NotFound} />
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

function RedirectWithStatus({from, to, status}){
  return(
    <Route
      render={({staticContext})=>{
        if(staticContext) staticContext.status = status;
        return <Redirect from={from} to ={to}/>;
      }}
    />
  )
}
function NotFound() {
  return (
  <div style={{backgroundColor: '#222'}}>
    <h2>Num achei</h2>
  </div>
  );
}



function Home() {
  return (
  <div style={{backgroundColor: 'green'}}>
    <h2>Home</h2>
  </div>
  );
}

function About() {
  return (
    <div style={{backgroundColor: 'purple'}}>
      <h2>About</h2>
    </div>
    );
}

function Users() {
  return (
    <div style={{backgroundColor: 'orange'}}>
      <h2>Users</h2>
    </div>
    );
}

function Topics(){
  let match = useRouteMatch();

  return(
    <div style={{flex:1, backgroundColor: 'red'}}>
      <h2>Topicos</h2>
      <ul>
        <li>
          <Link to={`${match.url}/components`}>Components</Link>
        </li>
        <li>
          <Link to={`${match.url}/props-v-state`}>
            Props v. State
          </Link>
        </li>
      </ul>
      <Switch>
        <Route path={`${match.path}/:topicId`}>
          <Topic />
        </Route>
        <Route path={match.path}>
          <h3>Please select a topic.</h3>
        </Route>
      </Switch>
    </div>
  );
}

function Topic() {
  let { topicId } = useParams();
  return (
  <div style={{backgroundColor: 'gray'}}>
      <h3>Requested topic ID: -> {topicId}</h3>
  </div>
  );
}
