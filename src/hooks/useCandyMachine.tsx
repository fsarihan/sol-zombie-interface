import {useEffect, useState} from "react";
import * as anchor from "@project-serum/anchor";
import {
    awaitTransactionSignatureConfirmation,
    CandyMachine,
    getCandyMachineState,
    mintMultipleToken,
    mintOneToken,
} from "../utils/candyMachine";
import toast from "react-hot-toast";
import {useWallet} from "@solana/wallet-adapter-react";
import useWalletBalance from "./useWalletBalance";
import {LAMPORTS_PER_SOL} from "@solana/web3.js";
import {sleep} from "../utils";

const MINT_PRICE_SOL: number = parseFloat(process.env.REACT_APP_PUBLIC_MINT_PRICE!);

const treasury = new anchor.web3.PublicKey(
    process.env.REACT_APP_PUBLIC_TREASURY_ADDRESS!
);

const config = new anchor.web3.PublicKey(
    process.env.REACT_APP_PUBLIC_CANDY_MACHINE_CONFIG!
);

const candyMachineId = new anchor.web3.PublicKey(
    process.env.REACT_APP_PUBLIC_CANDY_MACHINE_ID!
);

const rpcHost = process.env.REACT_APP_PUBLIC_SOLANA_RPC_HOST!;
const connection = new anchor.web3.Connection(rpcHost);

const txTimeout = 30000;
// @ts-ignore
Date.prototype.addHours = function (h) {
    this.setTime(this.getTime() + (h * 60 * 60 * 1000));
    return this;
}
export default function useCandyMachine() {
    const whiteList = [
        {
            "address": "GJ1DhMrUzpMmQqcSPuSU3inVXjcMmhzPRCt29PYAsCnD",
            "twitter": "test2",
            "country": "test3"
        },
        {
            "address": "53FjR3fhwkmngAwtuXKuPY9LxxA5zArz1fhxSCZspVxx",
            "twitter": "frenziedfather",
            "country": "United States"
        },
        {
            "address": "ssssasaassasa",
            "twitter": "222212121ssasa",
            "country": "222sassa"
        },
        {
            "address": "CiJJmQ7ZkZhsZ9Aa4gZPMsTnXs4kDXNvqMucioi2Vja3",
            "twitter": "Sopcaja",
            "country": "France"
        },
        {
            "address": "EgWCDY7nim2pcpkh3VEWP1V7p8P7hzUrdd46eBX7iMw2",
            "twitter": "bilbanbiba",
            "country": "Egypt"
        },
        {
            "address": "FupF5vepvLPX9S7VFMMYzy1cHsNKthQMhmEaMao8RShv",
            "twitter": "bughymann",
            "country": "Romania"
        },
        {
            "address": "BeqRYCRgKGJ2tnqbdwDKEUSZsHA8teBqcP34apuCwWNs",
            "twitter": "adrian52953083",
            "country": "Romania"
        },
        {
            "address": "D1tv6JPFZ4WZdug1RmBC9yftXvXbrco9iHGfgLThdMht",
            "twitter": "Pierresuleyman",
            "country": "France"
        },
        {
            "address": "59AuGJCcD7m52199oj2baVYBwyb55199Dz5Ng43QtiPG",
            "twitter": "Pierresuleyman",
            "country": "France"
        },
        {
            "address": "3sHN2377n4qWrsj1L7QccmrgmuvNgDhcpMrh5rbDXkcs",
            "twitter": "BiVnTh62157221",
            "country": "VietNam"
        },
        {
            "address": "EeKoPBsBsykUwssX7vjSKuHj8rUifaTCiuncTM1pWeZq",
            "twitter": "Ashiiqq1",
            "country": "Bangladesh"
        },
        {
            "address": "3ZCyx1AoFDgHD5vcQeHoVgPieTyzGW431w7od73p6KiP",
            "twitter": "pkv9162",
            "country": "India"
        },
        {
            "address": "6aNRvtarfS9Jc8J6gsGQC1qikCdt4gn6mcUZpamZy1tQ",
            "twitter": "ceyproOsi",
            "country": "Bahrain"
        },
        {
            "address": "94u8abfxheLVssY877pYavGnnDsE8bzZYfJ3G4snnYhw",
            "twitter": "Trex4510",
            "country": "indonesia"
        },
        {
            "address": "HJGBabHHze48txa9CzXq2vkxtVi48RQDY4rotY28nGtY",
            "twitter": "kaptainjay1",
            "country": "Nigeria"
        },
        {
            "address": "CL1dh4VvYJtW3XeGWnqHh9KdKkeGMcUdUgMBgPndwpW3",
            "twitter": "RamziAzizi9",
            "country": "Serbia"
        },
        {
            "address": "deneme",
            "twitter": "deneme",
            "country": "deneme"
        },
        {
            "address": "HT7htbXx2fAYbykb3qxENexhf3cZRCqp9Nk46gZEfLBU",
            "twitter": "Gianlukha",
            "country": "Italy"
        },
        {
            "address": "0xaA7e4E559f1aeEe6A91c9d06368c7EE9D3553085",
            "twitter": "fanxin80878079",
            "country": "China"
        },
        {
            "address": "test2",
            "twitter": "test4",
            "country": "test5"
        },
        {
            "address": "deneme2",
            "twitter": "deneme1",
            "country": "deneme123"
        },
        {
            "address": "deneme3",
            "twitter": "deaowdk",
            "country": "ajkdalwidl"
        },
        {
            "address": "sss19828919821sasasa",
            "twitter": "9189191sasa",
            "country": "urksasa"
        },
        {
            "address": "AP2RFC3GpAo4dyE4bSmacdwkSUjtrSRXQNgStGVSeR98",
            "twitter": "cwdingo",
            "country": "United States"
        },
        {
            "address": "8FSrNkPAqNui99RG5CG5qSi68UYATGAoc5RvshdYmRdd",
            "twitter": "eee2e2e2e",
            "country": "2e2e2e2e2"
        },
        {
            "address": "Merhaba ",
            "twitter": "Merhaba ",
            "country": "Merhaba"
        },
        {
            "address": "DqymLGfx8mvwFxVmopVVzmPN7eewPWWJfZh3jFiEguJL",
            "twitter": "KingCryptomania",
            "country": "United Kingdom"
        },
        {
            "address": "Dkosksbss",
            "twitter": "ok aosspsoab",
            "country": "Kdosososj"
        },
        {
            "address": "75UC263t6vDJ7vceSv3BvHV8fihuUVDXaBfpCRYMi6mM",
            "twitter": "expert_kripto",
            "country": "Switzerland"
        },
        {
            "address": "DXKvz87hmGSJ1auVgUS1LCZiQDHJJDn1wu6dR4BhD52p",
            "twitter": "xevi87",
            "country": ""
        },
        {
            "address": "2L8YE8zRtpkRMdch1ze6WShX1tMxbEjcn29AtABC4g6t",
            "twitter": "AljazChvatal",
            "country": "Slovenia"
        },
        {
            "address": "As7RDENWg9PnPuEG3siQzJoqfTMo77EP1b129cDiQXVj",
            "twitter": "ZanLogar",
            "country": "Slovenija"
        },
        {
            "address": "DtGgiqcaRpGLVYZfPaGUAqDG8vmEhDX85vBu8TC8bdsd",
            "twitter": "SamBane11",
            "country": "FRANCE"
        },
        {
            "address": "euhhuh",
            "twitter": "fkmjjkk",
            "country": "tkouu88"
        },
        {
            "address": "4uu7kt5rfRctetSvqjy2KA57Fce2TdQwePYMny5TLEQe",
            "twitter": "MCS94904842",
            "country": "Turkey"
        },
        {
            "address": "GZBGnYBXV44mUGkXfup9Q1KRNkHu7wRMfPsGD9AxpixS",
            "twitter": "ahmet_sengul74",
            "country": "turkey"
        },
        {
            "address": "5qzbJNsqMDhfNwLnWcq7prT7MdjCtEw9wrc4Ysu62Zsx",
            "twitter": "matrax41_08",
            "country": "turkey"
        },
        {
            "address": "BamkdL1fybJ82RfQrgWbnDWMjGEjfL7j28cT8gov93ki",
            "twitter": "HakanTIMRIS",
            "country": "Turkey"
        },
        {
            "address": "4mCVdck9E6XTBQE517cBYPSYRvQb7crPB7UdGYhT6yxX",
            "twitter": "e_ryan",
            "country": "Turkey"
        },
        {
            "address": "7BzKm2KKSYBJVu5N23vL3X2S7exWPb2LSS4y7JGkyhsE",
            "twitter": "AdenMurathan",
            "country": "TURKEY"
        },
        {
            "address": "E39tyu6FYMazeavsYjX2w7oDSEV44eBkNCZNfa5tqnPk",
            "twitter": "Brandto9",
            "country": "Turkey"
        },
        {
            "address": "9SjQEjXUyb2DEG3NPFJYU7eMZsLtTr6k7B6iV6yxPYaT",
            "twitter": "lhan",
            "country": "Turkey"
        },
        {
            "address": "ADRAzjXKLcpm3Et6gnX5H9wm6zug5REj3isdi7isxNaT",
            "twitter": "3erencelik3",
            "country": "Turkey"
        },
        {
            "address": "CixYTXApcEagcE9qW67Tqdoy8a8d5CsgMBjaCwDfJSHF",
            "twitter": "krmbzglu",
            "country": "turkey"
        },
        {
            "address": "7DE49jC5mGumwCeH6xDcQGtp58PdeipaQ8KRY9kghE19",
            "twitter": "kiriptosman",
            "country": "Turkey"
        },
        {
            "address": "DZYPnSeC4pAk17R3YhKsqem418KQbCPTEtNdjMnZzryV",
            "twitter": "selcuk3419",
            "country": "turkiye"
        },
        {
            "address": "7kHj9DWaUscRpQr3VV4PRovaggvjiGH912jnwCs94HUo",
            "twitter": "Mr_zero06",
            "country": "turkiye"
        },
        {
            "address": "CV7e81KXBTYR9JPi1fAmwif6oVM7BgCQXK5kibZ6x2JA",
            "twitter": "MuratBlt9967",
            "country": "Turkey"
        },
        {
            "address": "8hZWWQLBrVLQy9k6aoEPoHJbYmtvnBd2wtaaqR2c41qK",
            "twitter": "cskadirr",
            "country": "TURKEY"
        },
        {
            "address": "ANZZHQZEffyAJe8k3mbGSYQTXfgFyf7VGu2YjhjiAQDY",
            "twitter": "azaztrader",
            "country": "turkey"
        },
        {
            "address": "CVpZpMZB3xY8MU7hvqTtyVfVbgufpY844x2uwGo7Gryb",
            "twitter": "mahmutustunel",
            "country": "TURKEY"
        },
        {
            "address": "H9ctaVZyVhb4vpwUmvsF8rV3gQA4jBHgP9dBCuKGwav",
            "twitter": "UzNedo",
            "country": "Turkey"
        },
        {
            "address": "3hpsuRVqyDCL7w2aFEqor77S3ZhDu74BJrqQ1tYxNoQf",
            "twitter": "xtracoin_",
            "country": "Turkey"
        },
        {
            "address": "2dfscSj8DQPpZXPJCzUWW4xRq3sY3LX2Eg4V26o99MPN",
            "twitter": "osmderin",
            "country": "Trkey"
        },
        {
            "address": "BRtXv8Q1p1PMFs3zJTr52yHpoR3kLd69SGZ1Te6c9FBu",
            "twitter": "hamitakda3",
            "country": "TURKEY"
        },
        {
            "address": "HqEznuDhkVoN5dFoU8FYtgkoXF2D6dkUUtZbPQ9GD11",
            "twitter": "alidsky01",
            "country": "trkiye"
        },
        {
            "address": "F5iRE4uzfhiaDpFoidWWqJ4fxT2gapQM8tiaT1C4VbUv",
            "twitter": "celikemr3_",
            "country": "Turkey"
        },
        {
            "address": "0x0eB1D8C7cE9db95Ca2895e90D73eC6ad59056D53",
            "twitter": "serkandeexx",
            "country": "turkey"
        },
        {
            "address": "HVoiw4gJAR1pCTAhhJmn2gyoDxBem8iL4qJW2GkgGv8L",
            "twitter": "FanBilzerian",
            "country": "TURKEY"
        },
        {
            "address": "38ZYrhRbJZsi2EzNrJedhDrLxm6AUPUJQyF5VM7u7Gi3",
            "twitter": "WolverineCrypto",
            "country": "Turkey"
        },
        {
            "address": "FKiuSVpLLwwY831rMFtiswHxpZU1AYBS1mhMFFAfhHNC",
            "twitter": "rukujijimo",
            "country": "Italy"
        },
        {
            "address": "XfFDmHLS78oVc1Rdt3ZhH77stEaUw3Cz7TMDbbsWyj5",
            "twitter": "franklinchavezg",
            "country": "Honduras"
        },
        {
            "address": "6scFE5hzx74DWm23uBjiKei6UPpnaVroo68VYTFTs1G9",
            "twitter": "scaliskan66",
            "country": "Turkey"
        },
        {
            "address": "BmgVTQWkPVF37y26zgqk49yDLhJ2tiV8BTZ7B7JQ9jtB",
            "twitter": "Mohamma44476826",
            "country": "Turkey"
        },
        {
            "address": "AMyjF8h8oQRfnShMXekk1x1T9GsVDmG2pPNyTK2WMF3v",
            "twitter": "crypto101real",
            "country": "Turkey"
        },
        {
            "address": "6LhzSYg9fsbWTzGRrw4sixTowRmeChFcq6E1orFDKh4K",
            "twitter": "FurkanAktas367",
            "country": "Turkey"
        },
        {
            "address": "HPjHgJwACuZRoVCC1zKXXtoyBSinkFF9pVfa7Uh7rxUM",
            "twitter": "yirmibirotuziki",
            "country": "Turkey"
        },
        {
            "address": "CtYsF9oaJnE1wHYXCsFuygCWHinZbTh9zzJNF7FuteeA",
            "twitter": "DanOri19",
            "country": "South Africa"
        },
        {
            "address": "9opdfUymaJro2eq6t8c267wqfnASggVfXvAw6W7GSxBp",
            "twitter": "MAMAMULU",
            "country": "TRKYE"
        },
        {
            "address": "HLhCu1apJG5VBpi1dsKS9t6YaXUvQ8LHN3m6VeT2GjZA",
            "twitter": "berkaaytemel",
            "country": "Turkey"
        },
        {
            "address": "HFrGuok4g7XFP5KmL8ZxsgjXmwbUb5bVhX5TsBdMakQN",
            "twitter": "monkeyDD5",
            "country": "TURKEY"
        },
        {
            "address": "uZMzQSLrzuvhTFfM7PwZY4139s8ov13RuYBzZgo2sFZ",
            "twitter": "sayacal71",
            "country": "turkey"
        },
        {
            "address": "BDLzs8DKjBMs4aQEWHFshKCTf9vieCRyvY1ppY7F6F8K",
            "twitter": "BranfordNga",
            "country": "Canada"
        },
        {
            "address": "6HyapXhwraV6RZDAsPqWqKu7Z99cfDmQ2cbmc9fBFCsW",
            "twitter": "bimamozha",
            "country": "Indonesia"
        },
        {
            "address": "HTKDZUxq8rQLDAh9DudrviKvhdVZyTuNJza6LKqPsXns",
            "twitter": "YolGezen27",
            "country": "Turkey"
        },
        {
            "address": "A1FuKgkphpVps82bEiBuAbCBxQyphfELHLJSL845JHxb",
            "twitter": "kitesurforever",
            "country": "Trkiye"
        },
        {
            "address": "DFUQAUjp5buNENXL7cf2dYtjAZFbKqn46syoJsNeoYTc",
            "twitter": "MahirDRMS",
            "country": "Turkey"
        },
        {
            "address": "HNuSavnANQdjq4p2ZjvgFbEkLF19iuyW2tNXFDaswgWy",
            "twitter": "Hemgol",
            "country": "Estonia"
        },
        {
            "address": "7wR6pZjn3eFHgXTthrFVwyn5A7ugE6yatukka69cxJq7",
            "twitter": "bpv73",
            "country": "Moldova"
        },
        {
            "address": "0x884962745AEFb9C9bbD3a202D5528ED88187EE0C",
            "twitter": "Shelovesdranes ",
            "country": "United States"
        },
        {
            "address": "Q4F8sNLDU1Gfj1ur3vk1iXmvnBVifbnkuD3wpUGdpyk",
            "twitter": "habibullahtur20",
            "country": "turkey"
        },
        {
            "address": "2n1rRzes6By2w8nQsApjzgkgbBGCYvH9XpVjHxugcoo6",
            "twitter": "acar06ali",
            "country": "Trkiye"
        },
        {
            "address": "5R8SxkjiyanzHXFK6K2QEevo5CkSwaKbbvhMoT3p3QRm",
            "twitter": "solking_nft",
            "country": "Portugal"
        },
        {
            "address": "BaKQBX76AxFUqFJkfJPJPeDSqPsK8YgMCQoxmdiknFUs",
            "twitter": "Mr",
            "country": "Indonesia"
        },
        {
            "address": "3zfY1vcZRDYyjy5fgywCBNorZT7JaHxhEhxyj7yJGsv8",
            "twitter": "zakmayfieldyo",
            "country": "United States"
        },
        {
            "address": "GZyEkrwjAHmTNBbc9CJVNuUKHQkQy82gu5ThwuyPpiT5",
            "twitter": "korkmaz_ertan",
            "country": "Turkey"
        },
        {
            "address": "BvjJcKWaGGf8HpNCiruXkinvhFWXc2zReEYyb7qgLUFS",
            "twitter": "bitcoinci57",
            "country": "Trkiye"
        },
        {
            "address": "44ArjbJReSXwkpYydMK8wtMFhQh7rv2AhydeAXDE2Kum",
            "twitter": "ezgitmlll",
            "country": "trkiye"
        },
        {
            "address": "6m1UYzBGNFdgodac3XBj4LtK5gd4LTGPXZNfZCCCDzdr",
            "twitter": "cryptoking0077",
            "country": "Bangladesh"
        },
        {
            "address": "H1Be4nNjuNqZjMrgdmujRsNa9b1tt46zpXMRNJFUETzq",
            "twitter": "PINAR91545368",
            "country": "turkey"
        },
        {
            "address": "Azs4X2k5Uem5fVyrHDixi8mXP4huBYFswbfjM6KFx5b5",
            "twitter": "tafa42",
            "country": "turkey"
        },
        {
            "address": "Hr5pSLzotzXcJJ3pRxiEKq9FmVTNVokhztrJg48Qnkri",
            "twitter": "dada86854250",
            "country": "turkey"
        },
        {
            "address": "9mREtNpS73jMaVLZHE9TqnSHdmbrPvyssdSVrQ1Sx2Sw",
            "twitter": "Muck_48",
            "country": "Turkey"
        },
        {
            "address": "E7uFVPiGeoiMa4h6gJA3EPazKYu2APNXFYy2z1zuojo4",
            "twitter": "SarpKayaFB",
            "country": "Turkey"
        },
        {
            "address": "6UejNhEyC9BnvUSmvgzLFRHfJziJJ2JFW8BJH6bZ8bjC",
            "twitter": "AliMusabKaplan",
            "country": "turkey"
        },
        {
            "address": "8bVnRHSNR7jQK84me5dzSLUT3i8K8cqczduCesdhp6mk",
            "twitter": "ayseyeneer",
            "country": "turkey"
        },
        {
            "address": "Ck7b5nVqBmBDWx59WViFGDQac2cCqJJbfMEtMtBCeZny",
            "twitter": "tahsincanhanayy",
            "country": "TURKEY"
        },
        {
            "address": "7Vo86r9Ccjp1QyYGQ2e2y3hVLLEQc323FmMmbFdT6PkE",
            "twitter": "httpstwittercomglp_erturk",
            "country": "turkey"
        },
        {
            "address": "9XmZAB7QeZR86JhJ6njY9dLDTjZA4oAnHP81Z2EYpYew",
            "twitter": "AHTRADING1",
            "country": "Algeria"
        },
        {
            "address": "8Z6cEDUhTnBPNmAKSxQPeJiS1fR1MdFvZq6oYrVRvzdG",
            "twitter": "snowdrop_hrci",
            "country": "Trkiye"
        },
        {
            "address": "DPZKS41EGwN3YnJVCBpAra3CgUjMpSAaCwbo2v1Mes62",
            "twitter": "Eiriksteel",
            "country": "Norge"
        },
        {
            "address": "CSfkbtTmAgaMirwkXGZZkRcmxHGU7mibQiuEbuC1nCeN",
            "twitter": "Ethanwillou",
            "country": "Canada"
        },
        {
            "address": "DH97WnpjuNxw75RhCtLTKvAUyptbxfEz8599AHUW31Xb",
            "twitter": "Huseyin29375811",
            "country": "United Kingdom"
        },
        {
            "address": "9xw3LjrpRUfuQtaWPpeHE5UkWNnsXbgY7tBprSajN7GF",
            "twitter": "yalnz kral9xw3LjrpRUfuQtaWPpeHE5UkWNnsXbgY7tBprSajN7GF",
            "country": "Trkiye"
        },
        {
            "address": "7UteVhHBNhoM2ZtQPS9FWDX3yskZfCGLVYr9zazYCme6",
            "twitter": "Furkan01965294",
            "country": "Trkiye"
        },
        {
            "address": "EvgJ8quNYNpTmrMeQWNKeGDUd8nw2osDSgzvhyQo4SbK",
            "twitter": "fitgeneral",
            "country": "TURKEY"
        },
        {
            "address": "A2HCbrh9SZMD66mzezyZcmFrcuNgWUvc7D6Jjya7dJ3Y",
            "twitter": "Summer21730760",
            "country": "Switzerland"
        },
        {
            "address": "Gcyc1N3wKAJjnSD4d7Jhgxywvn5xgKJbMYqqDkj2VUTn",
            "twitter": "Cyrekamil",
            "country": "Poland"
        },
        {
            "address": "7kaS8SnFX1KVtbraf5CSuLG7i6rjYNj1iNhuFST3KseD",
            "twitter": "fatiihozdemir",
            "country": "Turkey"
        },
        {
            "address": "Fr34g9HZEDptLLxGAp83WSMKgrfcz7QhpaAfZpTk8QYu",
            "twitter": "Sara_sara_97",
            "country": "Romania"
        },
        {
            "address": "Merhabakdkdb",
            "twitter": "Idddss  ",
            "country": "Turkey"
        },
        {
            "address": "ARv7VASxBLn6yaGjceyuS2x5kDkxL2BEFWq7NRMw7Ywh",
            "twitter": "quangpd2001",
            "country": "Vietnam"
        },
        {
            "address": "7imsEN1dhU6rU1uVcVnZoobLgwAUy5TDe69bLLXvXTLL",
            "twitter": "haybat_mustafa",
            "country": "Turkey"
        },
        {
            "address": "HW8oaSit5ZCHY35N27mL32RqhAMa51JqDCeQwxYoWqdi",
            "twitter": "tunahantuna6",
            "country": "turkey"
        },
        {
            "address": "SdMVqfXobqhL1V6rCjaUMDEfhbQ7UWnHAnDnMGUenWx",
            "twitter": "stevka2008",
            "country": "Deutschland"
        },
        {
            "address": "EH39agJhh7MzRAqJtW3JD3d5gTTuJuUYs1D1aSRAZQct",
            "twitter": "OFD40349665",
            "country": "turkey"
        },
        {
            "address": "AauToV3wdDyrNHd8BgNdULQ5ia4CXJJ5zZnHFZWuFGu9",
            "twitter": "Princeb47",
            "country": "Uinted States"
        },
        {
            "address": "A9eC9hZ2cxkT53sVeGjBzdTQprAbBnDLXapFNP7NbLVM",
            "twitter": "Girirajsinghp19",
            "country": "India"
        },
        {
            "address": "i1fKptqc1a8Ffztww1G1bBuBgRSxR1yRTz7QPuR2Qew",
            "twitter": "Aktieroth",
            "country": "Sweden"
        },
        {
            "address": "1SjfbHyLfdnzsgaXHVKRuECjwBv3r5221MSgqGoK2Gy",
            "twitter": "fajry001",
            "country": "Indonesia"
        },
        {
            "address": "4mrKsUZHrig5JwAPfhj3JMMgYb69TRWSfhZ8JALXEuan",
            "twitter": "Cuneytakk",
            "country": "Trkiye"
        },
        {
            "address": "cidU7JVhfWrSdYK32QbwmuZu9GpJ8Zk1tgWMJQKuGHE",
            "twitter": "StachuPundi",
            "country": "POLAND"
        },
        {
            "address": "5t3YtdbQC2NjxgNC7Em9mM9q1vb3hnurUztzrqpRpZY2",
            "twitter": "GianniJaraa",
            "country": "chile"
        },
        {
            "address": "D5bsCANshp5GUVzJhJgqXBA8NWHYfwfbbWEL47fjzvUx",
            "twitter": "BinsarCurrency",
            "country": "Indonesia"
        },
        {
            "address": "7U7ymrFPFavqs2BfCw32RRbgnz7n3FaNUFwCDZBeBfFZ",
            "twitter": "IndiraSulistia1",
            "country": "Indonesia"
        },
        {
            "address": "DkecTWHWj7NqVYMS4NzZt3pe2tesvA5Cgf9Ebbx4nHtv",
            "twitter": "ahmetsoybelli",
            "country": "United Kingdom"
        },
        {
            "address": "HkVqB9RcuaqKGRnVXJKcAZT3zBmQHgYUoUGHMYYF8b5t",
            "twitter": "AdamtimAdam",
            "country": "Singapore"
        },
        {
            "address": "Cq9Z6bk62rToGfy5ToYKrfce5QP9qdgU8GpmMnV73nR4",
            "twitter": "kidapp2",
            "country": "Thailand"
        },
        {
            "address": "3EPDzhJoL1XRXsqXUGhottCtcYZn1vx9F86LHYEU2Jm8",
            "twitter": "httpstwittercomdegisendegisim",
            "country": "Trkiye"
        },
        {
            "address": "AcYRLx1mrwopTk7soSBoKZ9MddfcrgeCxQwxj9vy1ATV",
            "twitter": "tetsu_jo",
            "country": "France"
        },
        {
            "address": "E1AjsEqhGbYBYpyWmtEprGzTDYBanRhD1jhCWt19ENXF",
            "twitter": "deepsnft",
            "country": "Germany"
        },
        {
            "address": "CAj7famL2taE3TiRUoQuBz5ejfqXNB6LjZ5ZKtKC2jLY",
            "twitter": "itsKaamaman",
            "country": "Australia"
        },
        {
            "address": "5tovY3knjuSVY5eaoTfZfh9tyYH29jdAWvXMSEc1Pxra",
            "twitter": "DANNIIIEL9",
            "country": "spain"
        },
        {
            "address": "7RFSxwyaaJRrDcFfaDVsrdiKURQHx5bPVkp9q4i94cD5",
            "twitter": "Hosein12337519 ",
            "country": "Afghanistan"
        },
        {
            "address": "CnpathT1ByPFfLokHhXfyofSb24tZWTF1jrnTdwyhrVJ",
            "twitter": "oeufTrading",
            "country": "France"
        },
        {
            "address": "J1gMPCEFpv7ztQbGnyYzibjYKorhLvdttRYicCQY4AQe",
            "twitter": "mete0r7o",
            "country": "Turkey"
        },
        {
            "address": "8wvVM6gzUbmGye312aFeX37emAXdEgi1q9qtG9NkXirR",
            "twitter": "gemstoneravi",
            "country": "canada"
        },
        {
            "address": "Eztf8EVjjdszPBFwuwLLazLnE91XKo27up9Db6iwmoGP",
            "twitter": "o_ocak27",
            "country": "Trkiye"
        },
        {
            "address": "E2XSsrH7S8nFGoEjfLRikGryGZBcinaHSKP5pPDRMdC8",
            "twitter": "marrouan2",
            "country": "morocco"
        },
        {
            "address": "F1Wurj2qh9hXt2JEgqDoxJxNjNRNCTJRKXqpQQ7KCW4g",
            "twitter": "Daniel_Galdino_",
            "country": "BRAZIL"
        },
        {
            "address": "HvAZjjoRDwmeEQDgLaSc1yYzqKNwsTe4DWB52sgR2Rna",
            "twitter": "uzuncpt",
            "country": "Turkey"
        },
        {
            "address": "FwmvtXH5HELwXZ69vSz2Yht4wGmQzBvFMTqP9tBbZF8C",
            "twitter": "kinomip",
            "country": "Japan"
        },
        {
            "address": "22rbA2Aq6PVx52LbePtFLQzHAx6ajCXkPvfKGuadGWwP",
            "twitter": "katter56225027",
            "country": "England"
        },
        {
            "address": "89XaCzz8bVtkMPeuwnsZKRoEF6v5tKwm8wLkeJ6ay49b",
            "twitter": "Crypt0cean_",
            "country": "Australia"
        },
        {
            "address": "DjytV3iKVZ3zrqWnVxrSyQ9ebJPtPyZMrvMk82us9hVY",
            "twitter": "Kryptoonyx",
            "country": "USA"
        },
        {
            "address": "5p36iESmrn3cujAJxwZwV6x7JXzXLB3WvkxNCDRDoxfz",
            "twitter": "NguyenT98964687",
            "country": "Vietnam"
        },
        {
            "address": "Z6vXxtG8v2RuZdH7PTMSranacVrgRJFpPaoZaWrLJ9x",
            "twitter": "BIVI_fly",
            "country": "Vit Nam"
        },
        {
            "address": "9YPvS9MHjnrh455Er8NLcAfECCP1iparNxPa6jEZSdhY",
            "twitter": "OREN FINKEL",
            "country": "United States"
        },
        {
            "address": "GpGZMW3RbmLGHzXcRDzSzxvu54TgpHAn8Eku1vVnmbra",
            "twitter": "Slentlegend21",
            "country": "Trkiye"
        },
        {
            "address": "FTyWNkreqQNSe93Kpsm2imRifGXN3JwiKoEhhsFtRhHc",
            "twitter": "dcep13",
            "country": "HONGKONG"
        },
        {
            "address": "5Apu4SGyWKTAy3cEvU3bsVb6YBav9cANbULPkTSp2DXh",
            "twitter": "Tib0d ",
            "country": "France"
        },
        {
            "address": "crTHU1CyxP8f9SbW8Bz1HM1ScahUjGBHW1kwggPwTEU",
            "twitter": "Suksesmuda18 ",
            "country": "Indonesia"
        },
        {
            "address": "568jtt6Ya7U4QhqQVnfRvsWZZqUW4TFp7vvfurUDvugK ",
            "twitter": "minhdiemha1",
            "country": "Vietnam"
        },
        {
            "address": "Bd22MWdzRdJnkAKaY6PrQBfGs1rw2q3g8A2KChRqVWa6",
            "twitter": "haminhdiem06",
            "country": "viet nam"
        },
        {
            "address": "7MZ17yyri2bA5UCCcZdUYY3sbEARhHAKLsV9rmAUmNYR",
            "twitter": "philfx10",
            "country": "Austria"
        },
        {
            "address": "szdwdawdawd",
            "twitter": "adawdawdawFAW",
            "country": "WR2Q3RDASDAWD"
        },
        {
            "address": "DWFer1PaFc638qMHL8s7h79Xt5u6C8c6DV2SMbHjXkr4",
            "twitter": "BaVit17",
            "country": "Vietnam"
        },
        {
            "address": "DPC7TPYesnbKEgd4KJVXu9P7gCZki4DHUsKLtptkKuVw",
            "twitter": "happysagittar",
            "country": "Turkey"
        },
        {
            "address": "akuwhdjao wjd",
            "twitter": "awdokawp d",
            "country": "auodklawdpakw"
        },
        {
            "address": "12323442",
            "twitter": "2133",
            "country": "fszfsef"
        },
        {
            "address": "57HtHgY7KDxyXh279nsvjPAhXzxnFchk7YuoMvqoX4vA",
            "twitter": "last_maxi",
            "country": "Germany Deutschland"
        },
        {
            "address": "4iBjmEJBPLLXjaLQfCYH5mF7pGsqhCMaa48GpDJ9hMce",
            "twitter": "ilkersonmez10",
            "country": "Turkey"
        },
        {
            "address": "GxsRHm42qhPSeb17MvxL5yHd5ucgv9RTwjcKZr3JcCx4",
            "twitter": "dotuanbinh2",
            "country": "Viet Nam"
        },
        {
            "address": "E9T28aPkEePmvc74W9Tdv1kXZqH2Abzs7JHZJciXdGei",
            "twitter": "tuanbinh86",
            "country": "Viet Nam"
        },
        {
            "address": "CyRXvJbHdkrGgraiy2FW8UeTFhzZbg89Bt8JhS63ZuGB",
            "twitter": "PatrickBER87",
            "country": "Germany"
        },
        {
            "address": "HW1KkCo4EhZFKWgowvMv1DYWELPEoKp4d4wAzFeqRQAm",
            "twitter": "BekirAkmil",
            "country": "Trkiye"
        },
        {
            "address": "E4w52b8nRSh7GSQoxvudd98gbt55BFTpxMYig2Vbynnr",
            "twitter": "wdmxssm2018",
            "country": "honggang"
        },
        {
            "address": "F4WpkoYQoPbS6yE8FJc9F7beEr1p9SYyv2agNYszpSc3",
            "twitter": "SeptoDwiardian1",
            "country": "Indonesia"
        },
        {
            "address": "7JsArJRufHKkkVXX3DXJ31CSQvccg6X9rc8JjFGAuzaw",
            "twitter": "OzylmzIbrahim",
            "country": "Trkiye"
        },
        {
            "address": "F9xzbJeWfYyBaJPLdkZV2cwyr13sbwqcQJwTdVgo6scF",
            "twitter": "mrsmoradi2",
            "country": "Pakistan"
        },
        {
            "address": "BhqVu8GgGiCZzjuQZhfqNWoUNnKV7vtvDcZoD5BrLmko",
            "twitter": "kintecno",
            "country": "Indonesia"
        },
        {
            "address": "9Fpz6VbRxYjij14ZSJRhffo8Qbd467PVNo38DyhN2B1Y",
            "twitter": "Adiantok7",
            "country": "Indonesia"
        },
        {
            "address": "AKUSMGrEqJYkcMN6ENUxgVFnqc42pHxaqHWjKJ5sm5rQ",
            "twitter": "ClemKit24",
            "country": "Vit Nam"
        },
        {
            "address": "HPqTgaYFXZtK9az1ft54a86RAKQmNcHeFdjemW1WbqQd",
            "twitter": "cryptom30227332",
            "country": "trkiye"
        },
        {
            "address": "CoBepQ966syB6rhBkzpvT3xhWkPGGXJ9BPc9tHwsWR9y",
            "twitter": "eceJosefin",
            "country": "Germany Deutschland"
        },
        {
            "address": "FzL1ZRh4bXpLsEj4DXkqPHAsmKXuxNKWANXbhYua38NV",
            "twitter": "borsafinanstr",
            "country": "Trkiye"
        },
        {
            "address": "3C2WkVB4zb6Yt3Si5s8QvJ8WmDgb6tQyBVk1o87bGsF1",
            "twitter": "crypto101real",
            "country": "turkey"
        },
        {
            "address": "4xbcxRAm5ztuMH5AsSg1V1zBLPGHAnpv6vCiuWRo6rgP",
            "twitter": "yogadog12",
            "country": "Indonesia"
        },
        {
            "address": "DhGhgam9vphcRYnwQsa2anXAKz5kNktFA9Ri3EswzowJ",
            "twitter": "blacksabbath000",
            "country": "TURKEY"
        },
        {
            "address": "B5QTi2oTsNiiEU8XBBgDqSBzEH35Pf4rQRghWuXZF7uc",
            "twitter": "andersonbell",
            "country": "United States"
        },
        {
            "address": "8so2UGQh4jCg18YzyFS2Neq4dhYb7v23TkuJDTm536pE",
            "twitter": "veritasrulez",
            "country": "Turkey"
        },
        {
            "address": "0x2Ca16085FeD8Ff0023eD0E030dE770dD54BA1E8b",
            "twitter": "WeikerFx",
            "country": "Germany"
        },
        {
            "address": "45Ca6jtBsEPwPB84yL6wgqRQ1FdPM9F2gKtujZpyHgKS",
            "twitter": "_olurdabelki",
            "country": "Trkiye"
        },
        {
            "address": "CfeQNWD4T3NTtSoq9LENMx2MQdjYw4Z6oX9pJ2h8ongr",
            "twitter": "oguzhanbirgucu",
            "country": "Turkey"
        },
        {
            "address": "7Jcsnn4so3YUxks6ie4EayWNfm5MnHdCw6fb7TwXbaGg",
            "twitter": "platinumtekstil",
            "country": "Trkiye"
        },
        {
            "address": "6yDpVvimUrQuQ6tFxCXRph9kvRpABXuSU9EFBPbsgRCe",
            "twitter": "bufavento0234",
            "country": "Trkiye"
        },
        {
            "address": "8XEzdaZEt264ZGnREo6yfFvJaASgy1ECeM3neZ9c4EZS",
            "twitter": "Badbuoy15",
            "country": "India"
        },
        {
            "address": "BZHHX12QqP6tSM3Cbk2TZyUrct1ju1dxwgaoHBMEtrZ3",
            "twitter": "yemresacma",
            "country": "Turkey"
        },
        {
            "address": "4GYVgTUdddj4xpyCk7Pacma3ZDcxx2zM8sfbn14NeTAr",
            "twitter": "Burak02452163",
            "country": "Turkey"
        },
        {
            "address": "2FBK3hdiRzzFVVKu1Pgkfu65Vu9nvAddQ7XKLkEfW78U",
            "twitter": "ApecryptoApe",
            "country": "Nepal"
        },
        {
            "address": "WGQ43johXuZ1FTeTrCQ4K8tL2scn1gbE8zeEMkfMxbZ",
            "twitter": "Fearful_Crypto",
            "country": "United States"
        },
        {
            "address": "7zjgzeWrWaNHnTjo19PTLddsQggg9o1msGNAC3m2QF7s",
            "twitter": "Adrnmarket",
            "country": "United States"
        },
        {
            "address": "CJ3C7m68kaxLey4sJpF2em7bLtVswtj7wJ81XUYenQ2",
            "twitter": "AaronCaldo",
            "country": "United States"
        },
        {
            "address": "5zcoLjwZtwmdWzA3BCNfDVrVPDXyYWGE76tF6nqBN4Gg",
            "twitter": "Maxlvl11",
            "country": "Mongolia"
        },
        {
            "address": "9skaZ5M82KzpFYcGEmMuGw63Z22JHtcd6cQh352s4m71",
            "twitter": "MiSTerNfTMrWhale99286257",
            "country": "united states"
        },
        {
            "address": "9egGchFjus3HmqdqovXDbFpSoF44q3h9BUUWV9YnFvbf",
            "twitter": "cdawgg29",
            "country": "United States"
        },
        {
            "address": "Qa736rrGWR1tPZbJaAQADWQDhYbQHbrSTuqg4m7W3tm",
            "twitter": "_rashedalq",
            "country": "United Arab Emirates"
        },
        {
            "address": "BV8e5c3xSCLCwZna9vy9ThvxCgQRYsRfuxmKkSv4zJW3",
            "twitter": "ronitve15711330",
            "country": "india"
        },
        {
            "address": "3PF3AfL6fzs4mUztGHo6nLZ5eJXFY7ouVkBHaGLCexXc",
            "twitter": "Cem64781398",
            "country": "Turkey"
        },
        {
            "address": "CDFrKaSaG4pRKiLRiMyHv4XDZjsxQAWEPCWme4d1VY32",
            "twitter": "DicaireMaxime",
            "country": "canada"
        },
        {
            "address": "C6RLMGiUTLDuhL5uiVjcFP2U8cGHbEjmstaY3bbdaTXz",
            "twitter": "Pooja151patil",
            "country": "India"
        },
        {
            "address": "Cw9Yr7vvb1L8gao72Rj8sc7tyTtE6aCDyGjJc6bVCkfe",
            "twitter": "httpstwittercomHanifKhosravi",
            "country": "UNITED STATES"
        },
        {
            "address": "AGZoNNz1sXKDUu776cJdyCFsLiaDGfZr5fqSxQjuwWEf",
            "twitter": "wwwoodunk",
            "country": "Australia"
        },
        {
            "address": "G9Y2vQhzMYUZm9mgsp9rqV2dN3BHjPNAREbFPeGHwrF9",
            "twitter": "dw1097",
            "country": "Australia"
        },
        {
            "address": "65sqxJsBGQqP5uSnNHWxrPvUVdv3Dc4qxAd5Q4Wokf4B",
            "twitter": "R4Vvne",
            "country": "Germany"
        },
        {
            "address": "F5ESvN8RJdowDWqjxhgLS6ThHVLfLWii2v3rR5eQTtm5",
            "twitter": "marmara2525",
            "country": "Trkiye"
        },
        {
            "address": "9EgmNHLgH2pdmYSr2E63gJkTWXgLYUE2XRa5DcFa5hEm",
            "twitter": "Hoang61272296",
            "country": "Vietnam"
        },
        {
            "address": "ATgLdbFurqjKkHvRzr15N1Xy6SzavX85M7GLGmsrQy1B",
            "twitter": "ibrahimaltun47",
            "country": "turkey"
        },
        {
            "address": "AXxdshmMvyXVHPSh6ihRtSXuUpwJRkqvFnc1kNR29eZ7",
            "twitter": "Horizon_pubg",
            "country": "Trkiye"
        },
        {
            "address": "4p3K1EBpfjAi5eMJrTcAcF3V47hKMszjoGtAxLYZhDXN",
            "twitter": "chef_zoro",
            "country": "United Kingdom"
        },
        {
            "address": "B3SyeGgmmNVcCWG9wcdiH5Rb7uhBF3krQAc3EGaaDPWc",
            "twitter": "alpercelebi3",
            "country": "Turkey"
        },
        {
            "address": "7c99SGJ2zSzHoBvPJ5R3S9Lw3SzZKzfw8FqTwiHekWPK",
            "twitter": "leo_black90",
            "country": "Germany"
        },
        {
            "address": "H1RaGnNSz7ZECvsaLaddEWvDf3ijCWMHD9A1DvZ7NNjz",
            "twitter": "k1llthehype",
            "country": "Belgium"
        },
        {
            "address": "GZHtc6V7dfXiQzfqRRvSoh49gayNBfULRmiR2TLDQbf2",
            "twitter": "Juuliuswtt",
            "country": "Germany"
        },
        {
            "address": "ELRWc3kXBxjvnwDQpTv9DG7Hf7fe4gjofR4hw9haYkKG",
            "twitter": "vado21021",
            "country": "Germany"
        },
        {
            "address": "2vEGus6q1hM7GMTpT8yXKL6MXULpykJhMhgHNiDwnftr",
            "twitter": "clippedpaypal",
            "country": "Deutschland"
        },
        {
            "address": "GwmCdPQHBQDaPBRdu3XhiEtDKmxR3mrmLXz4n1q1hcux",
            "twitter": "gaurab_gaihre",
            "country": "nepal"
        },
        {
            "address": "3ysB4EmYac4XpVuTzt6WPEsRaewGx3Y5sMyiiM5NXCQ8",
            "twitter": "lukas_8008",
            "country": "Austria"
        },
        {
            "address": "EmhAPzAm8M8pz356jacPXjnJiBU3kXyaq6JNcaHBmBab",
            "twitter": "minirone",
            "country": "Singapore"
        },
        {
            "address": "5ktBVGj6PgWp4HbNPVA7tzaEaEYrrni9XWiWsTY7SWJW",
            "twitter": "davidctn",
            "country": "Romania"
        },
        {
            "address": "HePny9jdVumPFzyo2rfchb3Viu9DyskMRUcxXkhZ9RKZ",
            "twitter": "ae91_34",
            "country": "turkey"
        },
        {
            "address": "6inA1BdG2kje2XFyMMg3LGRjxeDr3X9uyJiySmTEy3kf",
            "twitter": "hadamjune",
            "country": "Republic of Korea"
        },
        {
            "address": "E6BQVPYgGY8HqwNvrvoQcH8BWBUZapH8A3DTVRTcCrdo",
            "twitter": "Furkan01965294",
            "country": "Trkiye"
        },
        {
            "address": "5Yr7YZvVJztRnwiM3ksrzRHTrUfdgAfCdrwQF2dirrAC",
            "twitter": "_mae97",
            "country": "Australia"
        },
        {
            "address": "DGAkKkzxeV7SzQ2MwfREn1eqhVvSaEp9cFnWMu4rjFYb",
            "twitter": "NF_Jay_",
            "country": "United Kingdom"
        },
        {
            "address": "6NKZnbCKr9S4rjFxn1nmgfMCTSRoZ6m7aHf3v3TESeMX",
            "twitter": "DrBrettyD",
            "country": "United States"
        },
        {
            "address": "3XNKHXP9Z9YZPubRnaSkmqwzaTd7EhBGc7kRTsHhdH4H",
            "twitter": "okcualike",
            "country": "Turkey"
        },
        {
            "address": "C2N4PmBFpqksAxHz4WFKqoe7vGEzhhPpYw8ZokUCQsTL",
            "twitter": "TheMuff85572402",
            "country": "Malaysia"
        },
        {
            "address": "4o9JAoRn3EaWGyWr7rkj4LWcWNs1UGPYhZfJZ2euXfhC",
            "twitter": "Cryptobargain",
            "country": "United Kingdom"
        },
        {
            "address": "Ek5wpCHtvM1oREKNjjiiBBH1KtYqT5eW9XZ38ALH15V8",
            "twitter": "AkyKubilay",
            "country": "Turkey"
        },
        {
            "address": "FzC6JvnGKN1W6pHqoDs8T3gtTPPr5YFGCGnDZBs17mLp",
            "twitter": "Viktor45203584",
            "country": "esko"
        },
        {
            "address": "B6CwRg2Wv1y6QrTSsnhS9YDH7LrPdBdPZFuj6421xJLc",
            "twitter": "btgflm",
            "country": "United States of America"
        },
        {
            "address": "2FqghQJtqPqrVrA2ZgptRUrygjVifP5uhhJTGCqH9QsZ",
            "twitter": "gangstarr177",
            "country": "Australia"
        },
        {
            "address": "BFhTnaX3WhTNonF5PsYMbEoe47HqPXwMhUFobvJfNvv6",
            "twitter": "EnoughTea4413",
            "country": "United States"
        },
        {
            "address": "EwqXhUE9sgANx1ZpXrXr382qjDsRP8XvBXJbu231uqM2",
            "twitter": "madboteth",
            "country": "France"
        },
        {
            "address": "13VJiuGKTBCh967yttd54EPMa5HMEaZQWERaCTvt5WfS",
            "twitter": "yahvetty",
            "country": "United States"
        },
        {
            "address": "96rGVfM4642rQvNnRPmn4y35kUPaRYGS76si6ntNEZ6w",
            "twitter": "ttom9240",
            "country": "Belgium"
        },
        {
            "address": "8oV3sTRdJfo7LJexSBxTDp8KwMRHTnZz2jCB22aF2mZa",
            "twitter": "efersin",
            "country": "Turkey"
        },
        {
            "address": "EzjiH5vgEp6ksiCzaYMwyakf8t2Uw2Cr6A2sNehzNLAa",
            "twitter": "matthieuzh",
            "country": "switzerland"
        },
        {
            "address": "Mw3EjGszYCgkYLjiJpsSfpuVxCdDx7AfyvXqQcE8A8V",
            "twitter": "DannyDDahl",
            "country": "United States"
        },
        {
            "address": "28gxUyQAXghPtGC6taotxxYjCcRzt9L978fmg2fjXTkv",
            "twitter": "idoicoinvestor",
            "country": "turkey"
        },
        {
            "address": "DS8C8y87a18AF5rV8VyXF9bnj498NHrHpk2zgQJqw4Ej",
            "twitter": "dash29105333",
            "country": "czech republic"
        },
        {
            "address": "8rBUAG3DyaTzbH1CXZ2jVYMrdw3c1aEhkqChnqQbEfLT",
            "twitter": "DinoDinard",
            "country": "United States"
        },
        {
            "address": "6bzCk6kusMroPPNBxe8aDpRSrJcfEBtRLubgDYqy6Rn4",
            "twitter": "eduplugg",
            "country": "UNITED STATES OF AMERICA"
        },
        {
            "address": "7feZt5mRcebMbT3C7WFygU7jvHXZsKFSwJcjn9qzed17",
            "twitter": "Michell19519981",
            "country": "SOUTH AFRICA"
        },
        {
            "address": "5czsPpynRLr2aM57a1aYiBFf8kMrrEjaG9gJCrivsGEW",
            "twitter": "GufoMilani",
            "country": "Dominican Republic"
        },
        {
            "address": "CjFMFoCGvz3tD6mBnffeYXmkBYuSeWKhc8CDkkT97ndM",
            "twitter": "SawyerJonez",
            "country": "United States"
        },
        {
            "address": "E7CrGNkmSmRkH4PNRkrGQSosmMpHjm2Xu4qpmcs65M4r",
            "twitter": "VCapestany",
            "country": "United States"
        },
        {
            "address": "6pJhS7EABNfJ9aJnqj9tM5qpSEtuWughons4e4nRt9XT",
            "twitter": "_acrvz_",
            "country": "United States"
        },
        {
            "address": "7awCtgztDAif1CwYUkTsRHm534AQCy3HqjFyFkAFgic1",
            "twitter": "getitfastceo",
            "country": "Canada"
        },
        {
            "address": "E2ZeqMsYNseDrgCFvVNRBQCYLMB7Tic1iB4wcRKbaCkU",
            "twitter": "CROcrypto_",
            "country": "canada"
        },
        {
            "address": "9o4BgsmMdgpzowa6zR3Hveyeev9zJgswv4JMvUgGQzCx",
            "twitter": "Jpowell105",
            "country": "United states"
        },
        {
            "address": "A5FGWFGNtkeHnPq7yKHCTGwRnq2Lc3rHNwbDiPBtQqAF",
            "twitter": "ymittal_NFT",
            "country": "India"
        },
        {
            "address": "23kNbHuMXkU4dBQvKsBySLTGz9Wo93FNAziwqjko5wSW",
            "twitter": "kimseyun0507",
            "country": "South Korea"
        },
        {
            "address": "BHXWXEPYkVKffHRsRd52gRAfG8ySyASmQ9sWEPTgA2up",
            "twitter": "CQoS2QBcGD4q4I8",
            "country": "China"
        },
        {
            "address": "FUgr4x4kTg6t9wuLKTNftJ9pY2sjchw9AfUA7aD5mRv5",
            "twitter": "Daniel452379",
            "country": "Nederland"
        },
        {
            "address": "kWzkwMp5g5uc2G5TZLys6oWATPfBvTdAA1o9zYQqADa",
            "twitter": "DakshKalra21",
            "country": "india"
        },
        {
            "address": "AgCuxobkF2BTw2xc1X3qVviHyd3FYmsrtDBx7wF6oiMS",
            "twitter": "pixms",
            "country": "United Kingdom"
        },
        {
            "address": "Cja61meae5hAB6Qj25rmon3P31oQwmg4iwCyBEPkZv2d",
            "twitter": "vasul79591803",
            "country": "ukreina"
        },
        {
            "address": "6ZSn9ChAVetEg2tUi139CWSoDEfrptxTZdyfCZD9TyZc",
            "twitter": "uchnik1",
            "country": "Russian"
        },
        {
            "address": "0x5791D137A2724C99631125443aa20fB6FEdF7b61",
            "twitter": "aksisYang",
            "country": "Ukraine"
        },
        {
            "address": "AN2BpDesRq2aDzF3B6gfhof1zsMPZJCjX8kJdZ7nR5au",
            "twitter": "Evgeniy_Popov",
            "country": "Russia"
        },
        {
            "address": "EZGXX5APA2y5D715rq4ttdjDLv7uQviACbNW5x7uqLxs",
            "twitter": "afterglowflexin",
            "country": "Russia"
        },
        {
            "address": "sassa3323232",
            "twitter": "sasasa",
            "country": "aaaa"
        },
        {
            "address": "2pMavmiAvwpxsZaRDfiqsRY6Cz5LPh45gFJEyyDTmJzM",
            "twitter": "cakoberf",
            "country": "Trkiye"
        },
        {
            "address": "CiL8MHHjT5DjvSwxj276CG32GjzNecwrEAXUrgCRVTho",
            "twitter": "liquidation",
            "country": "Russia"
        },
        {
            "address": "6gkAYkNTYMfzyDo15Hm2b9kryuWcLH6ATbFK1gi3mVmT",
            "twitter": "IgorSukhanov",
            "country": "Lithuania"
        },
        {
            "address": "4vjz1ymmEqFYUyMnXA2RDQ1E3q9yg6ZkL7pbqDQCDXYQ",
            "twitter": "varik121",
            "country": "rus"
        },
        {
            "address": "CULfb91UrExYDHWX5x3bdb79YUsXsY3PRtGD3w6qNeP8",
            "twitter": "BibudhR",
            "country": "India"
        },
        {
            "address": "E8v2Y8LfwcT6xKGwf9bKpBB7UUijoJiXvgixrae6GmYT",
            "twitter": "armand_dizon",
            "country": "Philippines"
        },
        {
            "address": "6oUVShMRtfM2nXmDuoXSZbwZSbEZKp3sDB5NZRD7JrYL",
            "twitter": "Nada92991394",
            "country": "Brazil"
        },
        {
            "address": "2i7ixtJM3Tvqks6JL448t9TeVJCVV2a5UuspEaDawDiT",
            "twitter": "pikaculsuz",
            "country": "Turkey"
        },
        {
            "address": "4nGhnEKDXLH3txZkYWiUidpwhHEguFbAABDfrSfMbpjC",
            "twitter": "tharun555555",
            "country": "India"
        },
        {
            "address": "H8SGdbjpmF3b2cCpbdxzB7cAgpGRCQQu2STLdaFLYcwX",
            "twitter": "khlabib1",
            "country": "Bangladesh"
        },
        {
            "address": "9ouiX74aemrBSD7qs5Ft37aip9LsC8g9nHuiLZhmkeMz",
            "twitter": "OozanKk",
            "country": "Turkey"
        },
        {
            "address": "4Ddsx7GBkFXCb1byED4cKcVbZsh3F4KuS1tFstbAfCh7",
            "twitter": "vovchaz",
            "country": "Latvia"
        },
        {
            "address": "5AGWCFfyVzzRrisUar39UDckcFynKGJncqXTK1tF2tej",
            "twitter": "alacheng",
            "country": "china"
        },
        {
            "address": "FpFgc2MHGQXtEfp5tZ8z7ux1kT8GVGF5vxvF8gLSgF1j",
            "twitter": "ibrst12",
            "country": "TURKYE"
        },
        {
            "address": "4oYxyWczBU8BwXmwk5Z2W3QFD16WM2ugVLMnfo4pDR7M",
            "twitter": "httpstwittercomSeenuvasanRsstvRx8Vl8c2UQ7pUB1TwFBmQ",
            "country": "India"
        },
        {
            "address": "7UTKVfzJjY1pePtQE69ruYcAABVbCXhL3tPCyx7WC6d",
            "twitter": "niperemi1",
            "country": "India"
        },
        {
            "address": "J56zKGd814Nz93y63Jp9Ci3arq9UbgYwoZjGEyGMvEYQ",
            "twitter": "AllenZh",
            "country": "Holland"
        },
        {
            "address": "2qNgtZDkqSjcufHcrC6XiqcshCj9v9DiNpt8rpNmcg5Y",
            "twitter": "BURRI01",
            "country": "India"
        },
        {
            "address": "9oNpdcrsshw9SgfbuJD7srTiwXKZQZ6ZcCRXuj6APE5",
            "twitter": "cryptoking8484",
            "country": "India"
        },
        {
            "address": "HYQvNpZPBqs6fRwNA84qTzqk4tk7Sn1jbpjuRL3dBzKy",
            "twitter": "bils12812031",
            "country": "belgium"
        },
        {
            "address": "FeYXevHRGSQC418kJtTF3x2sAAc7FyLQBSzMjU8FGvuf",
            "twitter": "PiiOnTheAIR",
            "country": "France"
        },
        {
            "address": "9wvuxvy27nv7Jfzv85wqaLw8U5tNYeNFk8vSMYsZLRDA",
            "twitter": "kireetiarelli",
            "country": "India"
        },
        {
            "address": "kXZtSgWiU3ie8jtTcqWSH5i8hagwbYd1PWkrdSSJh8k",
            "twitter": "LidyYuu",
            "country": "china"
        },
        {
            "address": "Fq1Nk8w4ZWu1de3Ug4p9WhW3HRqHuY2TH66UmTQF9Cf1",
            "twitter": "Shama_Tran",
            "country": "vietnam"
        },
        {
            "address": "Az5ygvyovc9Jnwj523S2qGUUth2ta2nbN1m9Ps3riSV2",
            "twitter": "est_Predict",
            "country": "Thailand"
        },
        {
            "address": "AZ2Dcr4b3cVwQW1MRqRCQqyz9E3Wd8UFfMq9N5n4a95F",
            "twitter": "lamngqu26",
            "country": "Viet Nam"
        },
        {
            "address": "4n6Kog63SsozRQPAgq8VShcHkfGgysm3bBEYSZMXE8Kv",
            "twitter": "yyds",
            "country": "Hongkang"
        },
        {
            "address": "3WPjzZFU9rj8wt3m6U8cuBJjAsMbN4VfGbWUa7so1Gop",
            "twitter": "RafaaPint0",
            "country": "Portugal"
        },
        {
            "address": "5kZGfvxTA9p18oomsNxbkz9HYeQ86oT1A96hiwvQttNS",
            "twitter": "Ayush22505613",
            "country": "India"
        },
        {
            "address": "8XHrBSw8ZVau65jvKycrx3HeAmLs21MGkwqC3mXcnqZB",
            "twitter": "mrazotaoutlaw",
            "country": "Ukraine"
        },
        {
            "address": "5ZFarHkQsXCsxZmprr4VTr6L87mYAcmsw4eQzCubTb9U",
            "twitter": "ritvickpaliwal",
            "country": "India"
        },
        {
            "address": "Ez2vs5eP7k34PrnRfxgkY5s3xZ1SvbdFkDXV22WmnVz6",
            "twitter": "ghofardhana",
            "country": "Indonesia"
        },
        {
            "address": "FcbnF4d1TdzsJW8mD8tqDHYuTHXTZM2sRZ7FZsdcjrYs",
            "twitter": "junaidjamall",
            "country": "United Arab Emirates"
        },
        {
            "address": "8wGTCdU2N4r3tXntycHTBtnZBqLrsYCUQuNDVng4xRsS",
            "twitter": "JamallMunir",
            "country": "United Arab Emirates"
        },
        {
            "address": "C4PjJiXjhqkaDM2DyLKe1piD9hW3gHsmUauaijXgyA2T",
            "twitter": "cornselk",
            "country": "ukraine"
        },
        {
            "address": "Merhabaslsl",
            "twitter": "Kdkssoajaja ",
            "country": "Lslalapapaoaos"
        },
        {
            "address": "Denememememememememe",
            "twitter": "Denenenenenenenen",
            "country": "Nfndndndjdjdjdjd"
        },
        {
            "address": "2sKNSvXZ4JDGqc5YNqVyhswEVWg8ZEFtXwcL4tsA4pd8",
            "twitter": "Madarasz1Tibor",
            "country": "Slovakia"
        },
        {
            "address": "AJZoKJrcHu8w1bTNABUFMXpfEe5mAZpxfJsqcyK31QCY",
            "twitter": "mraulemon",
            "country": "Taiwan Province of China"
        },
        {
            "address": "8tHBt2tqBgictxweWTErad9LCKgyBdHjunYHLaoKSrgD",
            "twitter": "cryptripr",
            "country": "United Kingdom"
        },
        {
            "address": "7i3kQU3MtvhWAB2MRRDSBDP9jF6wPTuJaQRYzv7Y7DfX",
            "twitter": "lamng0206",
            "country": "Viet Nam"
        },
        {
            "address": "B7zihoGGq4BNEPyjAHcpjERP1gN3CpwKHX3YVuU5BAe5",
            "twitter": "lamngqu0206",
            "country": "VietNam"
        },
        {
            "address": "7i9Zi2ckW1H4FbNWbqmANBHYzmb7tDk8hDj2BFp55pUa",
            "twitter": "Sneadgb1hxyj",
            "country": "America"
        },
        {
            "address": "B5SCBQH9yaxZwteCMbzJ8yWKS5X3HEUft7nUUovms7b1",
            "twitter": "thaolinh231",
            "country": "VietNam"
        },
        {
            "address": "AsA7HjYNY8b5Ev2uDWGtP8jsb4YGFB6rUCzEJHnzovkK",
            "twitter": "Janettew9v0q0q",
            "country": "Russia"
        },
        {
            "address": "MbYq2sFhYcwWMNkyNCN8wCskZjjD3Cih2kjciLnXrtk",
            "twitter": "Arliem6cmh",
            "country": "Uruguay"
        },
        {
            "address": "51coqdxyZw9LhMeMgJFiBqUVxyxmmbhAa3TqY7yqUjWQ",
            "twitter": "Stiltner0sv6jwb",
            "country": "Paraguay"
        },
        {
            "address": "6zGaQK6mUgh6j3dpRNJToKQ1174erWobzrFyL3aXwJw6",
            "twitter": "abhijeets0001",
            "country": "India"
        },
        {
            "address": "E9RrD4oXnastk4P3DWvkXjKG1Nr2rtLXjcgdwi99TUBT",
            "twitter": "Wahyudi_Riszki",
            "country": "Indonesia"
        },
        {
            "address": "8QDn8PAiejqeqYzKNcEzir7py2RNpEu2oDw1aZM5oVN2",
            "twitter": "atofighiii",
            "country": "iran"
        },
        {
            "address": "ENra2e3FJDAbG7zU2QvxUPf6HiUcfBpzG3vVDmxfqQ6c",
            "twitter": "rozhckovandrejk",
            "country": "Russia"
        },
        {
            "address": "8qPk3rsFEup9fERDK7Hw2NmeZ5p2daYYVNm8o3XR9U4a",
            "twitter": "tayyab7337",
            "country": "Australia"
        },
        {
            "address": "9Zs1DxC8fxjHU7TSHYzFhQGTMrwt23tNEyTfmW7Jk8tk",
            "twitter": "sasghar81",
            "country": "Australia"
        },
        {
            "address": "aDow3xNRX2K3jqo3JSAxC5KZ145p6cvowjHTYmv6y5T",
            "twitter": "DavidBathory2",
            "country": "Spain"
        },
        {
            "address": "5k2V15c1R4ZCUSmso3aLKMHLD6HRnL6HQbn72eFgxSA4",
            "twitter": "efforsk8",
            "country": "United States"
        },
        {
            "address": "7ZgjAHYeak1jp7KMSDoUmuCHZPSwoja8tYwizHn3fCKH",
            "twitter": "needeth8",
            "country": "United States"
        },
        {
            "address": "DGJrFou9J526RqUifcqooUjZqAdfLpXquEYG3yrQtHBT",
            "twitter": "soyrodrigoojeda",
            "country": "Argentina"
        },
        {
            "address": "Ao4ZVCMPwRg49dNnszqgy1Z3sUMhbFF22fryeTaaGjVZ",
            "twitter": "CryptoF52151157",
            "country": "India"
        },
        {
            "address": "8tRAp2hRpapTTRfRUuBCdcfJUj6CQ8PNDkw1FPowAQyZ",
            "twitter": "Bob5J",
            "country": "South Korea"
        },
        {
            "address": "4Sc7xguekM2n3c1qYFqUEa5nFjHTWQ9wpPffefYczPSG",
            "twitter": "mozgov0",
            "country": "russia"
        },
        {
            "address": "7bGJyq9ZUotfoLHMdQiYkmViYpGzGXSXg9H58tN2kLLC",
            "twitter": "haninnuwaira",
            "country": "Indonesia"
        },
        {
            "address": "7GG5ggALQraGi8Y4kaXZ7aGhCDt3gGqB81VZGMqndPt1",
            "twitter": "Alize863860111",
            "country": "United Kingdom"
        },
        {
            "address": "2j4P8Cb18RF2e3GgYWLg8GsFan7HkxhxpZdUi69z6hx6",
            "twitter": "XDuZi",
            "country": "China"
        },
        {
            "address": "FKyewWLpsNV6aNL2juSCYJx1MeXvrc9RaHhXBovTaAbp",
            "twitter": "iangoose1",
            "country": "United States"
        },
        {
            "address": "ATW9R5kXKPDPA3AXsrfRe1Dw3Hz1Y8Aj1EP7dXZrgj2B",
            "twitter": "dcsneaks",
            "country": "Singapore"
        },
        {
            "address": "CBw9n22U4qv3zvtrTRdWjzJFAX4J9b8W4Ko9hFGbpgDg",
            "twitter": "NovaDoska",
            "country": "australia"
        },
        {
            "address": "3G4CHyfUKLL1zWfz8XFCovXh8JpNJ9bH88F2zk7zJVmf",
            "twitter": "yunus07686962",
            "country": "Trkiye"
        },
        {
            "address": "GgMQqjQYsAVDMMAFzxtsA54R78uCp7BVh3FEhhn2Pmoe",
            "twitter": "amelku091",
            "country": "Indonesia"
        },
        {
            "address": "855A3uL7WqSMUwoDrdEbUS4VAGEF9riQPiLURo83PQRw",
            "twitter": "RaimondsMLV",
            "country": "Latvia"
        },
        {
            "address": "61espZ9AjXVabSE2taqsVxzY5mn87n2DNnPKS4cKHdRM",
            "twitter": "omurga",
            "country": "TURKEY"
        },
        {
            "address": "Dqh8jMj9zUMXmp8gF1QGikePkep9Jijr6u7xSEU9xSKP",
            "twitter": "nhandylan27",
            "country": "Vietnam"
        },
        {
            "address": "4bauEVwtr7CQhKuEzJAxH55CgDsvcuPep5ymfmyyRw21",
            "twitter": "Datek73001983",
            "country": "Poland"
        },
        {
            "address": "5zCZWfNxk3SrtgCvYiBzwGAtJ4uxjF6Xs1eDdTkjWB9Z",
            "twitter": "huberc1k",
            "country": "Poland"
        },
        {
            "address": "HxChRYAECUVVUkAEx7hdBrKq63xAK9ECvrtmDkHVk6gy",
            "twitter": "BartoLoreno",
            "country": "Poland"
        },
        {
            "address": "5D1NfF1HLXUq26Dvo2T69xGDwk2Ftx35ShKd4Bh4B3h3",
            "twitter": "Prateeksk07",
            "country": "India"
        },
        {
            "address": "Denememememepe",
            "twitter": "Denememelepe",
            "country": "Kdkdldsspslsns"
        },
        {
            "address": "3FudzDCsiqrm4qacX7upjTUvaUrjnBexgvrNkWUs8qRr",
            "twitter": "erkin69029",
            "country": "turkey"
        },
        {
            "address": "6CavMETv51AFpZFpXKhmiLjUp5H8MYWptV4BGNBHCYJh",
            "twitter": "Ndboom337",
            "country": "United States"
        },
        {
            "address": "7F3tkWGcqF35NL6PcizReA6XkmuJaJHyVnMXuMw4QzSo",
            "twitter": "2aunt",
            "country": "Thailand"
        },
        {
            "address": "0x5c7685c9186eB0af2C8b0374e57D6D2502Fc1af7",
            "twitter": "",
            "country": ""
        },
        {
            "address": "FZBaVkSZdzmLFYMzus6ZDAHMAHuPwJ931hrJtJf45tW4",
            "twitter": "omagico001",
            "country": "Taiwan"
        },
        {
            "address": "2NCeaHiJCwNTUYZPtivtx5ZfCVD7McXjwSCUW8EyzYtB",
            "twitter": "wijangsuanG",
            "country": "Indonesia"
        },
        {
            "address": "Gs3WP18hbzNpbBgiU39e6tfkggfCKRyNqPqJQcthuHFD",
            "twitter": "solanairan",
            "country": "united kingdom"
        },
        {
            "address": "3NSfZHoaKZb4NoTjRJARBvJQMJACZdxrhXazaeu227js",
            "twitter": "csiavash",
            "country": "united kingdom"
        }
    ]
    const [, setBalance] = useWalletBalance();
    const [candyMachine, setCandyMachine] = useState<CandyMachine>();
    const wallet = useWallet();
    const [nftsData, setNftsData] = useState<any>(
        ({} = {
            itemsRemaining: 0,
            itemsRedeemed: 0,
            itemsAvailable: 0,
        } as any)
    );
    const [isMinting, setIsMinting] = useState(false);
    const [isSoldOut, setIsSoldOut] = useState(false);
    const [mintStartDate, setMintStartDate] = useState(
        new Date(parseInt(process.env.REACT_APP_PUBLIC_CANDY_START_DATE!, 10))
    );

    useEffect(() => {
        (async () => {
            if (
                !wallet ||
                !wallet.publicKey ||
                !wallet.signAllTransactions ||
                !wallet.signTransaction
            ) {
                return;
            }

            const anchorWallet = {
                publicKey: wallet.publicKey,
                signAllTransactions: wallet.signAllTransactions,
                signTransaction: wallet.signTransaction,
            } as anchor.Wallet;

            const {candyMachine, goLiveDate, itemsRemaining} =
                await getCandyMachineState(
                    anchorWallet,
                    candyMachineId,
                    connection
                );

            setIsSoldOut(itemsRemaining === 0);
            // @ts-ignore
            let found = whiteList.find(element => element.address == wallet.publicKey);
            if (found) {
                setMintStartDate(goLiveDate);
            } else {
                // @ts-ignore
                setMintStartDate(goLiveDate.addHours(1));
            }

            setCandyMachine(candyMachine);
        })();
    }, [wallet, candyMachineId, connection]);

    useEffect(() => {
        (async () => {
            if (!isMinting) {
                const anchorWallet = {
                    publicKey: wallet.publicKey,
                    signAllTransactions: wallet.signAllTransactions,
                    signTransaction: wallet.signTransaction,
                } as anchor.Wallet;

                const {itemsRemaining, itemsRedeemed, itemsAvailable} =
                    await getCandyMachineState(
                        anchorWallet,
                        candyMachineId,
                        connection
                    );

                setNftsData({itemsRemaining, itemsRedeemed, itemsAvailable});
            }
        })();
    }, [wallet, candyMachineId, connection, isMinting]);

    const startMint = async () => {
        try {
            setIsMinting(true);
            if (wallet.connected && candyMachine?.program && wallet.publicKey) {
                const mintTxId = await mintOneToken(
                    candyMachine,
                    config,
                    wallet.publicKey,
                    treasury
                );

                const status = await awaitTransactionSignatureConfirmation(
                    mintTxId,
                    txTimeout,
                    connection,
                    "singleGossip",
                    false
                );

                if (!status?.err) {
                    toast.success(
                        "Congratulations! Mint succeeded! Check your wallet :)"
                    );
                } else {
                    toast.error("Mint failed! Please try again!");
                }
            }
        } catch (error: any) {
            let message = error.msg || "Minting failed! Please try again!";
            if (!error.msg) {
                if (error.message.indexOf("0x138")) {
                } else if (error.message.indexOf("0x137")) {
                    message = `SOLD OUT!`;
                } else if (error.message.indexOf("0x135")) {
                    message = `Insufficient funds to mint. Please fund your wallet.`;
                }
            } else {
                if (error.code === 311) {
                    message = `SOLD OUT!`;
                    setIsSoldOut(true);
                } else if (error.code === 312) {
                    message = `Minting period hasn't started yet.`;
                }
            }
            toast.error(message);
        } finally {
            if (wallet?.publicKey) {
                const balance = await connection.getBalance(wallet?.publicKey);
                // @ts-ignore
                setBalance(balance / LAMPORTS_PER_SOL);
            }
            setIsMinting(false);
        }
    };

    const startMintMultiple = async (quantity: number) => {
        try {
            setIsMinting(true);
            if (wallet.connected && candyMachine?.program && wallet.publicKey) {
                const oldBalance =
                    (await connection.getBalance(wallet?.publicKey)) /
                    LAMPORTS_PER_SOL;
                const futureBalance = oldBalance - MINT_PRICE_SOL * quantity;

                const signedTransactions: any = await mintMultipleToken(
                    candyMachine,
                    config,
                    wallet.publicKey,
                    treasury,
                    quantity
                );

                const promiseArray = [];

                for (
                    let index = 0;
                    index < signedTransactions.length;
                    index++
                ) {
                    const tx = signedTransactions[index];
                    promiseArray.push(
                        awaitTransactionSignatureConfirmation(
                            tx,
                            txTimeout,
                            connection,
                            "singleGossip",
                            true
                        )
                    );
                }

                const allTransactionsResult = await Promise.all(promiseArray);
                let totalSuccess = 0;
                let totalFailure = 0;

                for (
                    let index = 0;
                    index < allTransactionsResult.length;
                    index++
                ) {
                    const transactionStatus = allTransactionsResult[index];
                    if (!transactionStatus?.err) {
                        totalSuccess += 1;
                    } else {
                        totalFailure += 1;
                    }
                }

                let newBalance =
                    (await connection.getBalance(wallet?.publicKey)) /
                    LAMPORTS_PER_SOL;

                while (newBalance > futureBalance) {
                    await sleep(1000);
                    newBalance =
                        (await connection.getBalance(wallet?.publicKey)) /
                        LAMPORTS_PER_SOL;
                }

                if (totalSuccess) {
                    toast.success(
                        `Congratulations! ${totalSuccess} mints succeeded! Your NFT's should appear in your wallet soon :)`,
                        {duration: 6000, position: "bottom-center"}
                    );
                }

                if (totalFailure) {
                    toast.error(
                        `Some mints failed! ${totalFailure} mints failed! Check your wallet :(`,
                        {duration: 6000, position: "bottom-center"}
                    );
                }
            }
        } catch (error: any) {
            console.log(error);
            let message = error.msg || "Minting failed! Please try again!";
            if (!error.msg) {
                if (error.message.indexOf("0x138")) {
                } else if (error.message.indexOf("0x137")) {
                    message = `SOLD OUT!`;
                } else if (error.message.indexOf("0x135")) {
                    message = `Insufficient funds to mint. Please fund your wallet.`;
                }
            } else {
                if (error.code === 311) {
                    message = `SOLD OUT!`;
                    setIsSoldOut(true);
                } else if (error.code === 312) {
                    message = `Minting period hasn't started yet.`;
                }
            }
            toast.error(message);
        } finally {
            if (wallet?.publicKey) {
                const balance = await connection.getBalance(wallet?.publicKey);

                // @ts-ignore
                setBalance(balance / LAMPORTS_PER_SOL);
            }
            setIsMinting(false);
        }
    };

    return {
        isSoldOut,
        mintStartDate,
        isMinting,
        nftsData,
        startMint,
        startMintMultiple,
    };
}
