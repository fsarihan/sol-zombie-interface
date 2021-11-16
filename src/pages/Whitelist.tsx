import {useEffect, useState, Component} from "react";
import {
    Box,
    chakra,
    Flex,
    SimpleGrid,
    Stat,
    StatLabel,
    StatNumber,
    Link,
    Container,
    Stack,
    Heading,
    Text,
    FormControl,
    FormLabel,
    FormHelperText,
    Center,
    Grid,
    GridItem,
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    NumberIncrementStepper,
    NumberDecrementStepper, Button,
    FormErrorMessage,
    Input,
    Checkbox,
    Badge,
} from '@chakra-ui/react';

import bg1 from '../assets/img/main-banner-bg2.jpg.webp';
import axios from 'axios';
import Footer from '../components/Footer';
import toast, {Toaster} from "react-hot-toast";
import Header from '../components/HeaderForMintPage';
import {useForm} from "react-hook-form";

require('../style/style.css');


export default function Whitelist() {
    const {
        handleSubmit,
        register,
        formState: {errors, isSubmitting}
    } = useForm();

    function onSubmit(values: any) {
        return new Promise((resolve) => {
            setTimeout(() => {
                axios.get('https://api.solzombie.com/whitelist-application?address=' + values.address + '&twitter=' + values.twitter + '&country=' + values['country'])
                    .then(response => {
                        console.log(response.data);
                        toast.success(
                            `Congratulations! ${response.data}`,
                            {duration: 6000, position: "top-center"}
                        );
                    })
                    .catch(error => {
                        toast.error(
                            `Error! Your application already added to checklist.`,
                            {duration: 6000, position: "top-center"}
                        );
                        console.log(error.data);
                    });
                resolve(true);
            }, 500);
        });
    }


    return (
        <>
            <Header/>
            <Container maxW={'full'} backgroundImage={bg1}
                       backgroundAttachment={'fixed'}
                       backgroundPosition={'center'}
                       backgroundSize={'cover'}>
                <Toaster/>
                <Stack
                    mt={-200}
                    align={'center'}
                    spacing={{base: 6, md: 8}}
                    py={{base: 20, md: 20}}
                    direction={{base: 'column', md: 'row'}}>
                    <Stack flex={1} spacing={{base: 5, md: 10}} mt={200}>

                        <Heading
                            lineHeight={1}
                            fontWeight={200}
                            align={'center'}
                            fontSize={{base: '8xl', sm: '8xl', lg: '8xl'}}>
                            <Text
                                as={'span'}
                                position={'relative'}
                            >
                                <b>Whitelist</b>
                            </Text>
                        </Heading>
                    </Stack>
                </Stack>
                <form onSubmit={handleSubmit(onSubmit)}>

                    <FormControl id="whitelist" mb={'75'}>
                        <Center>
                            <Box w="lg">

                                <FormLabel
                                    fontSize={{base: '3xl', sm: '3xl', lg: '4xl'}}>Solana Wallet Address</FormLabel>
                                <Input borderColor={'zombie.100'} focusBorderColor={'zombie.100'} size="lg"
                                       fontSize={{base: '2xl', sm: '2xl', lg: '3xl'}} type="text"
                                       id="address"
                                       placeholder="SOL Address"
                                       {...register("address", {
                                           required: "This is required",
                                           minLength: {value: 4, message: "Minimum length should be 4"}
                                       })}
                                />

                                < FormLabel mt={5}
                                            fontSize={{base: '3xl', sm: '3xl', lg: '4xl'}}>Twitter Username</FormLabel>
                                <Input borderColor={'zombie.100'} focusBorderColor={'zombie.100'} size="lg"
                                       fontSize={{base: '2xl', sm: '2xl', lg: '3xl'}} type="text"
                                       id="twitter"
                                       placeholder="Twitter Username"
                                       {...register("twitter", {
                                           required: "This is required",
                                           minLength: {value: 4, message: "Minimum length should be 4"}
                                       })}
                                />

                                <FormLabel mt={5}
                                           fontSize={{base: '3xl', sm: '3xl', lg: '4xl'}}>Country</FormLabel>
                                <Input borderColor={'zombie.100'} focusBorderColor={'zombie.100'} size="lg"
                                       fontSize={{base: '2xl', sm: '2xl', lg: '3xl'}} type="text"
                                       id="country"
                                       placeholder="Country"
                                       {...register("country", {
                                           required: "This is required",
                                           minLength: {value: 4, message: "Minimum length should be 4"}
                                       })}
                                />

                                <Checkbox size="lg" mt={5}
                                          {...register("twitterFollow", {
                                              required: "This is required",
                                          })}
                                ><Text
                                    fontSize={{
                                        base: '2xl',
                                        sm: '2xl',
                                        lg: '3xl'
                                    }}>I Followed Sol Zombie NFT <Link
                                    href="https://twitter.com/SolZombieNFT"
                                    px={2}
                                    backgroundColor={'#b33939'}
                                    target={'_blank'}
                                >Twitter Account.</Link></Text></Checkbox> <p>
                                <Checkbox size="lg" mt={5}
                                          {...register("twitterRT", {
                                              required: "This is required",
                                          })}><Text
                                    fontSize={{
                                        base: '2xl',
                                        sm: '2xl',
                                        lg: '3xl'
                                    }}>I liked the <Link
                                    px={2}
                                    backgroundColor={'#b33939'}
                                    href="https://twitter.com/SolZombieNFT/status/1460527273086488576"
                                    target={'_blank'}
                                >whitelist post</Link> and retweeted it.</Text></Checkbox></p>

                                <FormErrorMessage>
                                    {errors.name && errors.name.message}
                                </FormErrorMessage>
                                <Button my={8} w="full" colorScheme="red" fontSize={'xl'} isLoading={isSubmitting}
                                        type="submit">
                                    Send My Application
                                </Button>
                            </Box>
                        </Center>
                    </FormControl>
                </form>
                <br/>
                <Footer/>
            </Container>
        </>
    );
}
