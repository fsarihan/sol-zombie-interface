import React from "react";
import {
	Link,
	Box,
	Flex,
	Text,
	Stack,
	useColorModeValue,
} from "@chakra-ui/react";


import {NavLink as LinkRouter} from 'react-router-dom';
import Logo from "./Logo";
import "@fontsource/teko/400.css"
import "@fontsource/teko/700.css"
import Wallet from './Wallet';

const NavBar = (props) => {
	const [isOpen, setIsOpen] = React.useState(false);

	const toggle = () => setIsOpen(!isOpen);
	return (

		<NavBarContainer {...props}>
			<LinkRouter to={'/'}
			            exact>
				<Logo/>
			</LinkRouter>
			<MenuToggle toggle={toggle} isOpen={isOpen}/>
			<MenuLinks isOpen={isOpen} isActive/>
		</NavBarContainer>
	);
};

const CloseIcon = () => (
	<svg width="24" viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg">
		<title>Close</title>
		<path
			fill="white"
			d="M9.00023 7.58599L13.9502 2.63599L15.3642 4.04999L10.4142 8.99999L15.3642 13.95L13.9502 15.364L9.00023 10.414L4.05023 15.364L2.63623 13.95L7.58623 8.99999L2.63623 4.04999L4.05023 2.63599L9.00023 7.58599Z"
		/>
	</svg>
);

const MenuIcon = () => (
	<svg
		width="24px"
		viewBox="0 0 20 20"
		xmlns="http://www.w3.org/2000/svg"
		fill="white"
	>
		<path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"/>
	</svg>
);

const MenuToggle = ({toggle, isOpen}) => {
	return (
		<Box display={{base: "block", md: "none"}} cursor={'pointer'} onClick={toggle}>
			{isOpen ? <CloseIcon/> : <MenuIcon/>}
		</Box>
	);
};

const MenuItem = ({children, isLast, to = "/", ...rest}) => {
	return (
		<Link>
			<Text display="block" {...rest}>
				{children}
			</Text>
		</Link>
	);
};

const MenuLinks = ({isOpen}) => {
	return (
		<Box
			display={{base: isOpen ? "block" : "none", md: "block"}}
			flexBasis={{base: "100%", md: "auto"}}
		>
			<Stack
				spacing={8}
				align="center"
				justify={["center", "space-between", "flex-end", "flex-end"]}
				direction={["column", "row", "row", "row"]}
				pt={[4, 4, 0, 0]}
				as={'nav'}
				fontSize={{base: '2xl', sm: 'md', lg: '2xl'}}

			>

				<LinkRouter to={'/'}
				            exact>
					<MenuItem
						px={2}
						py={2}
						rounded={'md'}
						_hover={{
							textDecoration: 'none',
							bg: useColorModeValue('zombie.100', 'zombie.100'),
						}} to="/">
						HOME
					</MenuItem>
				</LinkRouter>
				<LinkRouter to={'/history'}
				            exact>
					<MenuItem
						px={2}
						py={2}
						rounded={'md'}
						_hover={{
							textDecoration: 'none',
							bg: useColorModeValue('zombie.100', 'zombie.100'),
						}}>
						HISTORY
					</MenuItem>
				</LinkRouter>
				<LinkRouter to={'/info'}
				            exact>
					<MenuItem
						px={2}
						py={2}
						rounded={'md'}
						_hover={{
							textDecoration: 'none',
							bg: useColorModeValue('zombie.100', 'zombie.100'),
						}}>
						INFO
					</MenuItem>
				</LinkRouter>
				<LinkRouter to={'/roadmap'}
				            exact>
					<MenuItem
						px={2}
						py={2}
						rounded={'md'}
						_hover={{
							textDecoration: 'none',
							bg: useColorModeValue('zombie.100', 'zombie.100'),
						}}>
						ROADMAP
					</MenuItem>
				</LinkRouter>
				<LinkRouter to={'/mint'}
				            exact>
					<MenuItem
						px={2}
						py={2}
						rounded={'md'}
						backgroundColor={'#101921'}
						_hover={{
							textDecoration: 'none',
							bg: useColorModeValue('zombie.100', 'zombie.100'),
						}}>
						MINT NFT
					</MenuItem>
				</LinkRouter>
				<MenuItem>
					<Wallet/>
				</MenuItem>
			</Stack>
		</Box>
	);
};

const NavBarContainer = ({children, ...props}) => {
	return (
		<Flex
			as="nav"
			align="center"
			justify="space-between"
			wrap="wrap"
			w="100%"
			px={16}
			py={5}
			bg={["primary.500", "primary.500", "transparent", "transparent"]}
			color={["white", "white", "primary.700", "primary.700"]}
			{...props}
		>
			{children}
		</Flex>
	);
};

export default NavBar;