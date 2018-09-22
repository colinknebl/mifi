import * as React from 'react';
import { Link } from 'react-router-dom';

import './listItem.css';

interface Props {
    fontAwesomeIcon: string;
    liClassName: string;
    linkClassName: string;
    linkTo: string;
    title: string;
    titleClass: string;
}

export default function ListItem(props: Props) {
    const { fontAwesomeIcon, liClassName, title, linkClassName, linkTo, titleClass } = props;
	return (
		<li className={liClassName} title={title}>
			<Link className={linkClassName} to={linkTo}>
                <i className={'fa fa-' + fontAwesomeIcon} />
                <span className={titleClass}>{title}</span>
			</Link>
		</li>
	)
}