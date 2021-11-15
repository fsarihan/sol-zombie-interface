import {
    Container,
    Stack,
    Heading,
    Center,
    Text,
    Image,
    ChakraProvider,
    extendTheme,
    Button,
    VStack,
    HStack,
    Flex,
    Tag
} from '@chakra-ui/react';
import bg1 from '../assets/img/bg.jpg';

// @ts-ignore
import GlitchText from 'react-glitch-effect/core/GlitchText';
import Footer from '../components/Footer';
import Youtube from '../components/Youtube';
import ChakraCarousel from "../components/ChakraCarousel";
import {capsFirst} from "../utils";
import React, {useState, useEffect} from "react";


import w1 from '../assets/img/works/6_IMGP.webp';
import w2 from '../assets/img/works/8_IMGP.webp';
import w3 from '../assets/img/works/9_IMGP.webp';
import w4 from '../assets/img/works/11_IMGP.webp';
import w5 from '../assets/img/works/15_IMGP.webp';
import w6 from '../assets/img/works/a9_IMGP.webp';
import w7 from '../assets/img/works/a1_IMGP.webp';
import w8 from '../assets/img/works/a0_IMGP.webp';
import w9 from '../assets/img/works/a4_IMGP.webp';
import w10 from '../assets/img/works/a5_IMGP.webp';
import w11 from '../assets/img/works/a2_IMGP.webp';
import w12 from '../assets/img/works/a3_IMGP.webp';
import w13 from '../assets/img/works/a6_IMGP.webp';
import w14 from '../assets/img/works/a8_IMGP.webp';
import w15 from '../assets/img/works/a11_IMGP.webp';
import w16 from '../assets/img/works/32_IMGP.webp';
import w17 from '../assets/img/works/34_IMGP.webp';
import w18 from '../assets/img/works/213_IMGP.webp';
import w19 from '../assets/img/works/234_IMGP.webp';
import w20 from '../assets/img/works/237_IMGP.webp';
import w21 from '../assets/img/works/16_IMGP.webp';
import w22 from '../assets/img/works/12_IMGP.webp';
import w23 from '../assets/img/works/22_IMGP.webp';
import w24 from '../assets/img/works/28_IMGP.webp';
import w25 from '../assets/img/works/32_IMGP.webp';
import w26 from '../assets/img/works/36_IMGP.webp';
import w27 from '../assets/img/works/212_IMGP.webp';
import w28 from '../assets/img/works/189_IMGP.webp';
import w29 from '../assets/img/works/37_IMGP.webp';
import w30 from '../assets/img/works/131_IMGP.webp';


export default function History() {
    const [data, setData] = useState([]);

    useEffect(() => {
        // @ts-ignore
        setData([w1, w2, w3, w4, w5, w6, w7, w8, w9, w10, w11, w12, w13, w14, w15, w16, w17, w18, w19, w20, w21, w22, w23, w24, w25, w26, w27, w28, w29, w30]);
    }, []);
    return (
        <section id={'history'}>

            {/*<Container maxW={'full'} backgroundImage={bg1}*/}
            {/*           backgroundPosition="inherit"*/}
            {/*           backgroundRepeat="round">*/}
            <Stack
                align={'center'}
                spacing={{base: 6, md: 8}}
                py={{base: 20, md: 28}}
                direction={{base: 'column', md: 'row'}}>
                <Stack flex={1} spacing={{base: 5, md: 10}}>

                    <Heading
                        lineHeight={1}
                        fontWeight={200}
                        align={'center'}
                        fontSize={{base: '8xl', sm: '8xl', lg: '8xl'}}>
                        <Text
                            as={'span'}
                            position={'relative'}
                        >
                            <b>HISTORY</b>
                        </Text>
                    </Heading>


                    <Center>

                        <Text color={'white'} lineHeight={1.0}
                              maxW={'6xl'}
                              align={'center'}
                              fontWeight={300}
                              fontSize={{base: '3xl', sm: '2xl', lg: '3xl'}}>
                            <b>The virus, which was produced with an error while performing an innocent scientific experiment, caused the end of humanity, and all humans disappeared. <p>The remained was only 9.999 “Living Dead”.
                            </p>
                            </b>
                        </Text>
                    </Center>
                    <Center>
                        <Container maxW="4xl" h={'xl'} centerContent>
                            <Youtube youtubeId={'-jaVavHWF4I'}/>
                        </Container>
                    </Center>
                </Stack>


            </Stack>


            <Heading
                lineHeight={1}
                fontWeight={200}
                align={'center'}
                mb={100}
                fontSize={{base: '6xl', sm: '2xl', lg: '6xl'}}>
                <Text
                    as={'span'}
                    position={'relative'}
                >
                    <b>Characters</b>
                </Text>
            </Heading>
            <Container
                py={8}
                px={0}
                maxW={{
                    base: "100%",
                    sm: "35rem",
                    md: "43.75rem",
                    lg: "57.5rem",
                    xl: "75rem",
                    xxl: "87.5rem"
                }}
            >
                <ChakraCarousel gap={32}>
                    {data.map((post, index) => (
                        <Flex
                            key={index}
                            boxShadow="rgba(0, 0, 0, 0.1) 0px 3px 6px, rgba(0, 0, 0, 0.15) 0px 3px 4px"
                            justifyContent="space-between"
                            flexDirection="column"
                            overflow="hidden"
                            color="gray.300"
                            bg="base.d100"
                            rounded={5}
                            flex={1}
                            p={5}
                        >
                            <VStack mb={6}>
                                <Image
                                    draggable="false"
                                    _hover={{
                                        transform: 'scale(1.07)',
                                        transition: 'all 0.5s'
                                    }}
                                    borderRadius="25"
                                    alt={'Zombie Hero Image ' + index}
                                    objectFit={'cover'}
                                    align={'center'}
                                    w={'450'}
                                    h={'450'}
                                    src={post}
                                />
                            </VStack>
                        </Flex>
                    ))}
                </ChakraCarousel>
            </Container>


            {/*<Footer/>*/}
            {/*</Container>*/}

        </section>
    );

}


