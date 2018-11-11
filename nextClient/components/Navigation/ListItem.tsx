import * as React from 'react';
import Link from 'next/link';

interface IProps {
    fontAwesomeIcon: string;
    liClassName: string;
    linkClassName: string;
    linkTo: string;
    title: string;
    titleClass: string;
}

export default function ListItem(props: IProps) {
    const { fontAwesomeIcon, liClassName, title, linkClassName, linkTo, titleClass } = props;
	return (
		<li className={liClassName} title={title}>
			<Link href={linkTo}>
                <a className={linkClassName}>
                    <i className={fontAwesomeIcon} />
                    <span className={titleClass}>{title}</span>
                </a>
			</Link>
		</li>
	)
}