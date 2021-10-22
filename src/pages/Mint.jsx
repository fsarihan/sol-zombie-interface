import {
	Container,
	Stack,
	Heading,
	Text,
	FormControl,
	FormLabel,
	FormHelperText,
	NumberInput,
	NumberInputField,
	NumberInputStepper,
	NumberIncrementStepper,
	NumberDecrementStepper, Button,
	Badge,
} from '@chakra-ui/react';
import React, {Component} from "react";

import bg1 from '../assets/img/bg.jpg';
import GlitchText from 'react-glitch-effect/core/GlitchText';
import Footer from '../components/Footer';
import Countdown from 'react-countdown';

export default function Mint() {

	const ss = Date.now() + 1000;
	const Completed = () =>
		<>
			<Button w="full" colorScheme="purple" fontSize={'xl'}>
				MINT NFT
			</Button>
		</>;
	const renderer = ({days, hours, minutes, seconds, completed}) => {
		if (completed) {
			return (
				<Completed/>
			);
		} else {
			return (

				<Button w="full" colorScheme="red" fontSize={'xl'} disabled={true}>
					{days} Days {hours} Hours {minutes} Mins {seconds} Secs
				</Button>

			);
		}
	};
	return (

		<Container maxW={'full'} backgroundImage={bg1}
		           backgroundPosition="inherit"
		           backgroundRepeat="round">
			<Stack
				align={'center'}
				spacing={{base: 6, md: 8}}
				py={{base: 20, md: 28}}
				direction={{base: 'column', md: 'row'}}>
				<Stack flex={1} spacing={{base: 5, md: 10}}>
					<GlitchText color1={'#00FFA3'} color2={'#DC1FFF'}>
						<Heading
							lineHeight={1}
							fontWeight={200}
							align={'center'}
							fontSize={{base: '8xl', sm: '8xl', lg: '8xl'}}>
							<Text
								as={'span'}
								position={'relative'}
							>
								<b>MINT NFT</b>
							</Text>
						</Heading>
					</GlitchText>
					<Text color={'white'} lineHeight={1.0}
					      align={'center'}
					      fontWeight={200}
					      fontSize={{base: '3xl', sm: '2xl', lg: '3xl'}}>
						There are no bonding curves, no price tiers here. Buying a fairly distributed SOL ZOMBIE NFT costs <Badge
						fontSize={{base: '3xl', sm: '2xl', lg: '3xl'}}
						colorScheme="purple">1 SOL</Badge>
					</Text>
				</Stack>
			</Stack>
			<Container maxW="xl" h={'xl'} centerContent>
				<FormControl id="amount">
					<FormLabel fontSize={{base: '2xl', sm: '2xl', lg: '3xl'}}>AMOUNT</FormLabel>
					<NumberInput max={1000} min={1} size="lg" variant="filled"
					             focusBorderColor={'zombie.100'}>
						<NumberInputField fontSize={{base: '2xl', sm: '2xl', lg: '3xl'}}/>
						<NumberInputStepper>
							<NumberIncrementStepper/>
							<NumberDecrementStepper/>
						</NumberInputStepper>
					</NumberInput>
					<FormHelperText>The number of NFT pieces you want to buy.</FormHelperText>
				</FormControl>
				<Countdown date={ss} renderer={renderer}>
					<Completed/>
				</Countdown>
			</Container>
			<Footer/>
		</Container>
	);
}



