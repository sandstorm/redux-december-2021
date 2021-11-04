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
        <div id="content" className="content">
          <Switch>
            <Route path="/posts">
              <PostListing />
            </Route>
            <Route path="/create">
              <CreatePostView />
            </Route>
            <Route path="/edit/:id" component={PostEditorView}></Route>
            <Route path="*">
              <Redirect to="/posts" />
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
  )
}

export default App
