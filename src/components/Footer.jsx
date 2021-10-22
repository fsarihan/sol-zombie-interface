import {
	Link,
	Box,
	Flex,
	Text,
	Center, Image, Spacer
} from "@chakra-ui/react";
import socials4 from '../assets/img/twitter.png';
import socials5 from '../assets/img/discord.png';
import React from "react";

export default function Footer() {

	return (
		<Flex py={75} px={90} direction={{base: 'column', md: 'column', '2xl': 'row'}}>
			<Box p="2" textAlign={"center"}>
				<Text
					fontSize={'2xl'}
				>
					©2021 SOL ZOMBIE. All rights reserved.
				</Text>
			</Box>
			<Spacer/>
			<Box>
				<Center>
					<Link
						href="https://twitter.com/SolZombieNFT"
						target={'_blank'}
					>
						<Image
							_hover={{
								transform: 'scale(1.1)',
								transition: 'all 1.0s'
							}}
							h={50}
							cursor={'pointer'}
							px={{base: '15', sm: '15', lg: '30'}}
							alt={'Twitter Logo'}
							src={socials4}
						/>
					</Link>
					<Link
						href="https://discord.com/invite/VbbxGrUmdA"
						target={'_blank'}
					>
						<Image
							_hover={{
								transform: 'scale(1.1)',
								transition: 'all 1.0s'
							}}
							h={50}
							cursor={'pointer'}
							px={{base: '15', sm: '15', lg: '30'}}
							alt={'Discord Logo'}
							src={socials5}
						/>
					</Link>
				</Center>
			</Box>
		</Flex>

	);
}
