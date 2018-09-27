import * as React from 'react';

import { Link } from 'react-router-dom';
import ListItem from '../ListItem/listItem';
import SVG from '../SVGLogo/SVGLogo';

import 'font-awesome/css/font-awesome.min.css';
import './AppNavigationBar.css';


class AppNavigationBar extends React.Component {
	public props: any;
	constructor(props: any) {
		super(props);
		this.props = props;

		// console.log('props in AppNavigationBar :', props);
	}
	public render() {
		return (
			<section className="AppNavigationBar">
				<div className="AppNavigationBar__image-container">
					<SVG />
				</div>

				<nav className="AppNavigationBar__navigation">
					<ul className="AppNavigationBar__navigation-list AppNavigationBar__navigation-top">
						<ListItem {...{
							fontAwesomeIcon: 'folder-open-o',
							liClassName: 'AppNavigationBar__navigation-li',
							linkClassName: 'AppNavigationBar__navigation-link',
							linkTo: 'budget',
							title: 'Budget',
							titleClass: 'AppNavigationBar__navigation-description'
						}}/>
						<ListItem {...{
							fontAwesomeIcon: 'folder-o',
							liClassName: 'AppNavigationBar__navigation-li',
							linkClassName: 'AppNavigationBar__navigation-link',
							linkTo: '',
							title: 'Folder Open',
							titleClass: 'AppNavigationBar__navigation-description'
						}}/>
						<ListItem {...{
							fontAwesomeIcon: 'code',
							liClassName: 'AppNavigationBar__navigation-li',
							linkClassName: 'AppNavigationBar__navigation-link',
							linkTo: '',
							title: 'Something 1',
							titleClass: 'AppNavigationBar__navigation-description'
						}}/>
						<ListItem {...{
							fontAwesomeIcon: 'bullseye',
							liClassName: 'AppNavigationBar__navigation-li',
							linkClassName: 'AppNavigationBar__navigation-link',
							linkTo: '',
							title: 'Something 2',
							titleClass: 'AppNavigationBar__navigation-description'
						}}/>
					</ul>

					<ul className="AppNavigationBar__navigation-list AppNavigationBar__navigation-bottom">
						<ListItem {...{
							fontAwesomeIcon: 'sliders',
							liClassName: 'AppNavigationBar__navigation-li',
							linkClassName: 'AppNavigationBar__navigation-link',
							linkTo: 'account',
							title: 'Account Settings',
							titleClass: 'AppNavigationBar__navigation-description'
						}}/>
					</ul>
				</nav>

				<div className="AppNavigationBar__nametag">
					<div className="AppNavigationBar__nametag-icon" title="Jessica Knebl">JK</div>
					<span className="AppNavigationBar__nametag-email">jessica.knebl@gmail.com</span>
					<Link className="AppNavigationBar__nametag-link link" to="/">Sign Out</Link>
				</div>
			</section>
		);
	}
}

export default AppNavigationBar;