import * as React from 'react';
import Link from 'next/link';
import ListItem from './ListItem';
import SVG from '../../SVGLogo';

class AppNavigationBar extends React.Component {
	public props: any;
	constructor(props: any) {
		super(props);
		this.props = props;
	}

	public render() {
		return (
			<section className="AppNavigationBar">
				<div className="AppNavigationBar__image-container">
					<SVG />
				</div>

				<nav className="AppNavigationBar__navigation">
					<ul className="AppNavigationBar__navigation-list AppNavigationBar__navigation-top">
						<ListItem
							{...{
								fontAwesomeIcon: 'far fa-folder-open',
								liClassName: 'AppNavigationBar__navigation-li',
								linkClassName:
									'AppNavigationBar__navigation-link',
								linkTo: 'budget',
								title: 'Budget',
								titleClass:
									'AppNavigationBar__navigation-description'
							}}
						/>
						<ListItem
							{...{
								fontAwesomeIcon: 'far fa-folder',
								liClassName: 'AppNavigationBar__navigation-li',
								linkClassName:
									'AppNavigationBar__navigation-link',
								linkTo: '',
								title: 'Folder Open',
								titleClass:
									'AppNavigationBar__navigation-description'
							}}
						/>
						<ListItem
							{...{
								fontAwesomeIcon: 'fa fa-code',
								liClassName: 'AppNavigationBar__navigation-li',
								linkClassName:
									'AppNavigationBar__navigation-link',
								linkTo: '',
								title: 'Something 1',
								titleClass:
									'AppNavigationBar__navigation-description'
							}}
						/>
						<ListItem
							{...{
								fontAwesomeIcon: 'fa fa-bullseye',
								liClassName: 'AppNavigationBar__navigation-li',
								linkClassName:
									'AppNavigationBar__navigation-link',
								linkTo: '',
								title: 'Something 2',
								titleClass:
									'AppNavigationBar__navigation-description'
							}}
						/>
					</ul>

					<ul className="AppNavigationBar__navigation-list AppNavigationBar__navigation-bottom">
						<ListItem
							{...{
								fontAwesomeIcon: 'fas fa-sliders-h',
								liClassName: 'AppNavigationBar__navigation-li',
								linkClassName:
									'AppNavigationBar__navigation-link',
								linkTo: 'account',
								title: 'Account Settings',
								titleClass:
									'AppNavigationBar__navigation-description'
							}}
						/>
					</ul>
				</nav>

				<div className="AppNavigationBar__nametag">
					<div
						className="AppNavigationBar__nametag-icon"
						title="Jessica Knebl"
					>
						JK
					</div>
					<span className="AppNavigationBar__nametag-email">
						jessica.knebl@gmail.com
					</span>
					<Link href="/">
						<a className="AppNavigationBar__nametag-link link">
							Sign Out
						</a>
					</Link>
				</div>
			</section>
		);
	}
}

export default AppNavigationBar;
