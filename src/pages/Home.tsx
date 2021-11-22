import {
    Container,
    Stack,
    Flex,
    Box,
    Heading,
    Text,
    Button,
    Center,
    Image, useColorModeValue,
} from '@chakra-ui/react';
import logo from '../assets/img/banner-img1.webp';
import bg2 from '../assets/img/main-banner-bg2.jpg';
// @ts-ignore
import GlitchText from 'react-glitch-effect/core/GlitchText';
import Footer from '../components/Footer';
import Header from "../components/Header";
import {NavLink as LinkRouter} from "react-router-dom";
import React from "react";

// @ts-ignore
export default function Home() {
    return (
        <section id={"home"}>
            {/*<Container maxW={'full'} backgroundImage={bg2}*/}
            {/*           backgroundPosition="inherit"*/}
            {/*           backgroundRepeat="round">*/}

            <Stack
                mt={-100}
                h="100vh"
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
                                <b>SOL ZOMBIE NFT</b>
                            </Text>
                        </Heading>
                    </GlitchText>
                    <Text color={'white'} lineHeight={1.0}
                          align={'center'}
                          fontWeight={300}
                          fontSize={{base: '3xl', sm: '2xl', lg: '3xl'}}>
                        <b>Welcome to “The World of Living Dead”</b>
                    </Text>
                    <Center>
                        <Text
                            maxW={200}
                            mx={5}
                            textAlign={'center'}
                            fontSize={'2xl'}
                            backgroundColor={'blue.500'}
                            px={2}
                            py={2}
                            rounded={'md'}
                            _hover={{
                                bg: 'blue.700',
                            }}>
                            <LinkRouter
                                to="/whitelist-check"
                                exact>
                                WHITE LIST CHECK
                            </LinkRouter>
                        </Text>
                        <Text
                            maxW={200}
                            mx={5}
                            textAlign={'center'}
                            fontSize={'2xl'}
                            backgroundColor={'zombie.100'}
                            px={2}
                            py={2}
                            rounded={'md'}
                            _hover={{
                                bg: 'red.700',
                            }}>
                            <LinkRouter
                                to="/mint"
                                exact>
                                MINT SOL ZOMBIE
                            </LinkRouter>
                        </Text>
                    </Center>


                </Stack>
                <Flex
                    flex={1}
                    justify={'center'}
                    align={'center'}
                    position={'relative'}
                    w={'full'}>

                    <Box
                        position={'relative'}
                        height={'full'}
                        // width={'full'}
                        overflow={'hidden'}>
                        <Image
                            alt={'Zombie Hero Image'}
                            /*@ts-ignore*/
                            fit={'full'}
                            align={'center'}
                            w={'100%'}
                            h={'100%'}
                            src={logo}
                        />
                    </Box>
                </Flex>
            </Stack>
            {/*<Footer/>*/}
            {/*</Container>*/}

        </section>
    );

}



