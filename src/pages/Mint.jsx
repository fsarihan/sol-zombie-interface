import {
	Container,
	Stack,
	Heading,
	Text,
	Image,
	FormControl,
	FormLabel,
	FormHelperText,
	NumberInput,
	NumberInputField,
	NumberInputStepper,
	NumberIncrementStepper,
	NumberDecrementStepper,


} from '@chakra-ui/react';
import bg1 from '../assets/img/bg.jpg';
import GlitchText from 'react-glitch-effect/core/GlitchText';
import Footer from '../components/Footer';
import Countdown from 'react-countdown';

export default function Mint() {
	const Completionist = () => <span>You are good to go!</span>;
	const renderer = ({days, hours, minutes, seconds, completed}) => {
		if (completed) {
			return (
				<Completionist/>
			);
		} else {
			return (
				<>
					{days} D {hours} H {minutes} M {seconds} S
				</>
			);
		}
	};
	return (
		<>
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
									MINT NFT
								</Text>
							</Heading>
						</GlitchText>
						<Text color={'white'} lineHeight={1.0}
						      align={'center'}
						      fontWeight={200}
						      fontSize={{base: '3xl', sm: '2xl', lg: '3xl'}}>
							There are no bonding curves, no price tiers here. Buying a fairly distributed SOL ZOMBIE NFT costs 1 SOL.
						</Text>
					</Stack>
				</Stack>
				<Container maxW="xl" h={'xl'} centerContent>
					<FormControl id="amount">
						<FormLabel fontSize={{base: '2xl', sm: '2xl', lg: '3xl'}}>Amount</FormLabel>
						<NumberInput max={1000} min={0} size="lg" variant="filled" focusBorderColor={'zombie.100'}>
							<NumberInputField fontSize={{base: '2xl', sm: '2xl', lg: '3xl'}}/>
							<NumberInputStepper>
								<NumberIncrementStepper/>
								<NumberDecrementStepper/>
							</NumberInputStepper>
						</NumberInput>
						<FormHelperText>The number of NFT pieces you want to buy.</FormHelperText>
					</FormControl>
					<Countdown date={1636674193000} renderer={renderer}>
						<Completionist/>
					</Countdown>
				</Container>
				<Footer/>
			</Container>
		</>
	);
}



