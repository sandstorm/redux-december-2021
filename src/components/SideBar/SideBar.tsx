import SideBarLink from '../SideBarLink/SideBarLink'
import './SideBar.scss'

const SideBar = () => {
  return (
    <aside className="sidebar">
      <nav>
        <ul>
          <SideBarLink to="/posts">Home</SideBarLink>
          <SideBarLink to="/create">Create</SideBarLink>
        </ul>
      </nav>
    </aside>
  )
}

export default SideBar
