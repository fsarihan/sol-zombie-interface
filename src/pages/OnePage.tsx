import {
    Container,
} from '@chakra-ui/react';
import bg2 from '../assets/img/main-banner-bg2.jpg.webp';
import Footer from '../components/Footer';
import bg1 from "../assets/img/bg.jpg.webp";
import {Toaster} from "react-hot-toast";

import HomePage from '../pages/Home';
import Info from '../pages/Info';
import History from '../pages/History';
import Roadmap from '../pages/Roadmap';
import Header from '../components/Header';


export default function Home() {

    return (
        <>
            <Header/>
            <Container maxW={'full'} backgroundImage={bg2}
                       backgroundAttachment={'fixed'}
                       backgroundSize={'cover'}
                       backgroundPosition={'center'}
            >
                <Toaster/>
                <HomePage/>
            </Container>
            <Container maxW={'full'} backgroundImage={bg1}
                       backgroundPosition="center"
                       backgroundRepeat="round">

                <History/>
                <Info/>
                <Roadmap/>
                <Footer/>

            </Container>
        </>
    );

}



