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
import w2 from '../assets/work/2.png';
import w3 from '../assets/work/3.png';
import w4 from '../assets/work/4.png';
import w5 from '../assets/work/5.png';
import w6 from '../assets/work/6.png';
import w7 from '../assets/work/7.png';
import w8 from '../assets/work/8.png';
import w9 from '../assets/work/9.png';
import w10 from '../assets/work/10.png';
import w11 from '../assets/work/11.png';
import w12 from '../assets/work/12.png';
// @ts-ignore
import GlitchText from 'react-glitch-effect/core/GlitchText';
import Footer from '../components/Footer';
import Youtube from '../components/Youtube';
import ChakraCarousel from "../components/ChakraCarousel";
import {capsFirst} from "../utils";
import React, {useState, useEffect} from "react";

export default function History() {
    const [data, setData] = useState([]);

    useEffect(() => {
        // @ts-ignore
        setData([w2, w3, w4, w5, w6, w7, w8, w9, w10, w11, w12]);
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
                                <b>HISTORY</b>
                            </Text>
                        </Heading>
                    </GlitchText>

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
                            <Youtube youtubeId={'yFcUJGlbsqI'}/>
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
                            boxShadow="rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px"
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
                                    borderRadius="75"
                                    boxSize="150px"
                                    alt={'Zombie Hero Image ' + index}
                                    objectFit={'cover'}
                                    align={'center'}
                                    w={'350'}
                                    h={'350'}
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


