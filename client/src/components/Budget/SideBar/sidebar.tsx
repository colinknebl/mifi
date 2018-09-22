import * as React from 'react';

import { Link } from 'react-router-dom';
import ListItem from '../../ListItem/listItem';
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
						<ListItem {...{
							fontAwesomeIcon: 'folder-open-o',
							liClassName: 'sidebar--navigation-li',
							linkClassName: 'sidebar--navigation-link',
							linkTo: 'budget',
							title: 'Budget',
							titleClass: 'sidebar--navigation-description'
						}}/>
						<ListItem {...{
							fontAwesomeIcon: 'code',
							liClassName: 'sidebar--navigation-li',
							linkClassName: 'sidebar--navigation-link',
							linkTo: '',
							title: 'Something 1',
							titleClass: 'sidebar--navigation-description'
						}}/>
						<ListItem {...{
							fontAwesomeIcon: 'bullseye',
							liClassName: 'sidebar--navigation-li',
							linkClassName: 'sidebar--navigation-link',
							linkTo: '',
							title: 'Something 2',
							titleClass: 'sidebar--navigation-description'
						}}/>
					</ul>

					<ul className="sidebar--navigation-list sidebar--navigation-bottom">
						<ListItem {...{
							fontAwesomeIcon: 'sliders',
							liClassName: 'sidebar--navigation-li',
							linkClassName: 'sidebar--navigation-link',
							linkTo: 'account',
							title: 'Account Settings',
							titleClass: 'sidebar--navigation-description'
						}}/>
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