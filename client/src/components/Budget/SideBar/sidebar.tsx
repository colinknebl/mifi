import * as React from 'react';

import { Link } from 'react-router-dom';
import SVG from '../../SVGLogo/SVGLogo';

import 'font-awesome/css/font-awesome.min.css';
import './sidebar.css';


class SideBar extends React.Component {
	public routerProps: any;
	constructor(routerProps: any) {
		super(routerProps);
		this.routerProps = routerProps
	}
	public render() {
		return (
			<section className="SideBar">
				<div className="sidebar--image-container">
					<SVG />
				</div>

				<nav className="sidebar--navigation">
					<ul className="sidebar--navigation-list sidebar--navigation-top">
					<li className="sidebar--navigation-li" title="Budget">
						<Link className="sidebar--navigation-link" to="/budget">
						<i className="fa fa-folder-open-o" />
						<span className="sidebar--navigation-descript">Budget</span>
						</Link>
					</li>
					<li className="sidebar--navigation-li" title="">
						<Link className="sidebar--navigation-link" to="/budget">
						<i className="fa fa-folder-o" />>
						<span className="sidebar--navigation-descript">Folder Closed</span>
						</Link>
					</li>
					<li className="sidebar--navigation-li" title="">
						<Link className="sidebar--navigation-link" to="/budget">
						<i className="fa fa-code" />>
						<span className="sidebar--navigation-descript">Code</span>
						</Link>
					</li>
					<li className="sidebar--navigation-li" title="">
						<Link className="sidebar--navigation-link" to="/budget">
						<i className="fa fa-bullseye" />>
						<span className="sidebar--navigation-descript">Bullseye</span>
						</Link>
					</li>
					</ul>

					<ul className="sidebar--navigation-list sidebar--navigation-bottom">
					<ListItem {...{
						fontAwesomeIcon: 'sliders',
						liClassName: 'sidebar--navigation-li',
						linkTo: 'account',
						title: 'Settings',

					}}/>
					{/* <li className="sidebar--navigation-li" title="Settings">
						<Link className="sidebar--navigation-link" to="account">
						<i className="fa fa-sliders"></i>
						<span className="sidebar--navigation-descript">Account Settings</span>
						</Link>
					</li> */}
					</ul>
				</nav>

				<div className="sidebar--nametag">
					<div className="sidebar--nametag-icon" title="Jessica Knebl">JK</div>
					<span className="sidebar--nametag-email">jessica.knebl@gmail.com</span>
					<Link className="sidebar--nametag-link link" to="/">Sign Out</Link>
				</div>
			</section>
		);
	}
}

export default SideBar;

const ListItem = (props: any) => {
	console.log('props :', props);
	return (
		<li className={props.liClassName} title="Settings">
			<Link className="sidebar--navigation-link" to="account">
			<i className="fa fa-sliders" />>
			<span className="sidebar--navigation-descript">Account Settings</span>
			</Link>
		</li>
	)
}