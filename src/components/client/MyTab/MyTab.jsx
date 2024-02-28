import { Link } from '@/components/server';
import { Tab, Tabs } from '@mui/material';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

/**
 * This is a tab that uses next/link
 */
const MyTab = ({ ...props }) => {
	return <Tab component={Link} {...props} />;
};

/**
 * Pathname aware tabs that use next/link
 *
 * What's nice about this is that the current tab state is saved
 * when copying the url, in comparison to the default mui tabs
 * where this behavior is not present
 */
export const MyTabs = ({ values, urlPrepend, ...props }) => {
	/* update navbar tabs on path change */
	const pathname = usePathname();

	// use only the first part of the path to determine the tab
	// so that sub pages are also highlighted in the navbar
	const [currentTab, setCurrentTab] = useState(Number(pathname.toLowerCase().split('/')[2]));

	useEffect(() => {
		setCurrentTab(Number(pathname.toLowerCase().split('/')[2]));
	}, [pathname]);

	return (
		<Tabs value={currentTab} {...props}>
			{values.map(tab => {
				return <MyTab key={tab} href={`${urlPrepend}/${tab}`} value={tab} label={tab} />;
			})}
		</Tabs>
	);
};
