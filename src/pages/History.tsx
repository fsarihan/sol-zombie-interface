import {
    Container,
    Stack,
    Heading,
    Center,
    Text,
    Image,
} from '@chakra-ui/react';
import bg1 from '../assets/img/bg.jpg';
import w2 from '../assets/work/2.png';
import w3 from '../assets/work/3.png';
import w4 from '../assets/work/4.png';
import w5 from '../assets/work/5.png';
// @ts-ignore
import GlitchText from 'react-glitch-effect/core/GlitchText';
import Footer from '../components/Footer';
import Youtube from '../components/Youtube';

export default function History() {
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
            <Center>
                <Stack
                    align={'center'}
                    direction={{base: 'column', md: 'column', '2xl': 'row'}}
                >

                    <Image
                        _hover={{
                            transform: 'scale(1.07)',
                            transition: 'all 0.5s'
                        }}
                        px={75}
                        alt={'Zombie Hero Image'}
                        fit={'cover'}
                        align={'center'}
                        w={'225'}
                        h={'225'}
                        src={w2}
                    />
                    <Image
                        _hover={{
                            transform: 'scale(1.07)',
                            transition: 'all 0.5s'
                        }}
                        px={75}
                        alt={'Zombie Hero Image'}
                        fit={'cover'}
                        align={'center'}
                        w={'225'}
                        h={'225'}
                        src={w3}
                    />
                    <Image
                        _hover={{
                            transform: 'scale(1.07)',
                            transition: 'all 0.5s'
                        }}
                        px={75}
                        alt={'Zombie Hero Image'}
                        fit={'cover'}
                        align={'center'}
                        w={'225'}
                        h={'225'}
                        src={w4}
                    />
                    <Image
                        _hover={{
                            transform: 'scale(1.07)',
                            transition: 'all 0.5s'
                        }}
                        px={75}
                        alt={'Zombie Hero Image'}
                        fit={'cover'}
                        align={'center'}
                        w={'225'}
                        h={'225'}
                        src={w5}
                    />

                </Stack>
            </Center>
            <Center>
                <Stack
                    align={'center'}
                    py={8}
                    direction={{base: 'column', '2xl': 'row'}}
                >

                    <Image
                        _hover={{
                            transform: 'scale(1.07)',
                            transition: 'all 0.5s'
                        }}
                        px={75}
                        alt={'Zombie Hero Image'}
                        fit={'cover'}
                        align={'center'}
                        w={'225'}
                        h={'225'}
                        src={w2}
                    />
                    <Image
                        _hover={{
                            transform: 'scale(1.07)',
                            transition: 'all 0.5s'
                        }}
                        px={75}
                        alt={'Zombie Hero Image'}
                        fit={'cover'}
                        align={'center'}
                        w={'225'}
                        h={'225'}
                        src={w3}
                    />
                    <Image
                        _hover={{
                            transform: 'scale(1.07)',
                            transition: 'all 0.5s'
                        }}
                        px={75}
                        alt={'Zombie Hero Image'}
                        fit={'cover'}
                        align={'center'}
                        w={'225'}
                        h={'225'}
                        src={w4}
                    />


                </Stack>
            </Center>

            {/*<Footer/>*/}
            {/*</Container>*/}

        </section>
    );

}


