import {
    Container,
    Stack,
    Flex,
    Box,
    Heading,
    Text,
    Image, Center, Accordion, AccordionItem, AccordionButton, AccordionIcon, AccordionPanel,
} from '@chakra-ui/react';
import logo from '../assets/img/banner-img1.png';
import bg2 from '../assets/img/main-banner-bg2.jpg';
import Footer from '../components/Footer';
import bg1 from "../assets/img/bg.jpg";
import {Toaster} from "react-hot-toast";

import HomePage from '../pages/Home';
import Mint from '../pages/Mint';
import Info from '../pages/Info';
import History from '../pages/History';
import Roadmap from '../pages/Roadmap';
import Header from '../components/Header';


export default function Home() {
    return (
        <>
            <Box
                bgGradient="linear(to-l, #000, #000)"
                sx={{
                    position: '-webkit-sticky', /* Safari */
                    // @ts-ignore
                    position: 'sticky',
                    top: '0',
                    'z-index': "999",
                }}>
                <Header/>
            </Box>
            <Container maxW={'full'} backgroundImage={bg2}
                       backgroundPosition="inherit"
                       backgroundRepeat="round">
                <Toaster/>
                <HomePage/>
            </Container>
            <Container maxW={'full'} backgroundImage={bg1}
                       backgroundPosition="inherit"
                       backgroundRepeat="round">
                <History/>
                <Info/>
                <Roadmap/>
                <Footer/>
            </Container>
        </>
    );

}



