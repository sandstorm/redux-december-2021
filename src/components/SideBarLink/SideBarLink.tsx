import { FC } from 'react'
import { Link, useRouteMatch } from 'react-router-dom'
import './SideBarLink.scss'

type SideBarLinkProps = {
  to: string
}

const SideBarLink: FC<SideBarLinkProps> = (props) => {
  const isMatchingRoute = useRouteMatch({ path: props.to, exact: true })

  return (
    <li className="sidebar-link">
      <Link className={isMatchingRoute ? 'active' : ''} to={props.to}>
        {props.children}
      </Link>
    </li>
  )
}

export default SideBarLink
