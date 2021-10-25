import './App.scss'
import PostListing from '../PostListing/PostListing'
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom'
import SideBar from '../SideBar/SideBar'
import PostEditorView from '../PostEditView/PostEditView'
import CreatePostView from '../CreatePostView/CreatePostView'

function App() {
  return (
    <Router>
      <div className="App">
        <SideBar />
        <Switch>
          <Route path="/posts">
            <div id="content" className="content">
              <PostListing />
            </div>
          </Route>
          <Route path="/create">
            <div id="content" className="content">
              <CreatePostView />
            </div>
          </Route>
          <Route path="/edit/:id">
            <div id="content" className="content">
              <PostEditorView />
            </div>
          </Route>
          <Route path="*">
            <Redirect to="/posts" />
          </Route>
        </Switch>
      </div>
    </Router>
  )
}

export default App
