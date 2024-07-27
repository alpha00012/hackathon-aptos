'use client'
import React, { useEffect, useState } from 'react';
import CountDownTime from "@/components/elements/CountDownTime"
import Layout from "@/components/layout/Layout"
import Link from "next/link"
import { Autoplay, Navigation, Pagination } from "swiper/modules"
import { Swiper, SwiperSlide } from "swiper/react"
import { getAccountResources, submitTransaction } from "@/lib/aptos/aptos"
import { AptosAccount, TxnBuilderTypes, BCS } from 'aptos';

const swiperOptions = {
    modules: [Autoplay, Pagination, Navigation],
    loop: true,
    slidesPerView: 1,
    spaceBetween: 30,
    navigation: {
        clickable: true,
        nextEl: ".button-collection-next",
        prevEl: ".button-collection-prev",
    },
    breakpoints: {
        600: {
            slidesPerView: 2,
            spaceBetween: 30,
        },
        991: {
            slidesPerView: 3,
            spaceBetween: 30,
        },
        1200: {
            slidesPerView: 4,
            spaceBetween: 30,
        },
    },
}

interface Resource {
    // Définissez ici les propriétés attendues des ressources du compte
}

export default function ItemDetails() {
    const [accountResources, setAccountResources] = useState<Resource | null>(null);
    const [transactionStatus, setTransactionStatus] = useState<string | null>(null);

    useEffect(() => {
        const fetchResources = async () => {
            const accountAddress = "0x49f53c97bb110327f394244cdf549d9cdb27de9ab671b311a3ba795a8f050ac1"; // Remplacez par l'adresse de votre compte
            try {
                const resources = await getAccountResources(accountAddress);
                setAccountResources(resources);
                console.log('Account resources fetched:', resources);
            } catch (error) {
                console.error('Failed to fetch account resources:', error);
            }
        };

        fetchResources();
    }, []);

    const handleTransaction = async () => {
        console.log('Starting transaction...');
        const sender = new AptosAccount(); // Assurez-vous de créer un compte ou utilisez un compte existant
        console.log('Sender address:', sender.address().toString());

        const payload = new TxnBuilderTypes.TransactionPayloadEntryFunction(
            TxnBuilderTypes.EntryFunction.natural(
                '0x49f53c97bb110327f394244cdf549d9cdb27de9ab671b311a3ba795a8f050ac1::create_nft',
                'delayed_mint_event_ticket',
                [],
                [
                    BCS.bcsToBytes(TxnBuilderTypes.AccountAddress.fromHex('0x49f53c97bb110327f394244cdf549d9cdb27de9ab671b311a3ba795a8f050ac1')), // Remplacez par l'adresse réelle du destinataire
                    BCS.bcsSerializeUint64(1000) // Montant en u64, par exemple 1000
                ]
            )
        );

        try {
            const transactionRes = await submitTransaction(sender, payload);
            console.log('Transaction submitted:', transactionRes);

            if (transactionRes.success) {
                setTransactionStatus("Transaction successfully submitted!");
            } else {
                setTransactionStatus("Transaction failed. Please try again.");
            }
        } catch (error) {
            console.error('Transaction failed:', error);
            setTransactionStatus("Transaction failed due to an error. Please try again.");
        }
    };

    return (
        <>
            <Layout headerStyle={1} footerStyle={1} breadcrumbTitle="EVENT DETAIL">
                <div>
                    <section className="tf-item-detail">
                        <div className="tf-container">
                            <div className="row">
                                <div className="col-lg-6 col-md-12">
                                    <div className="tf-item-detail-image">
                                        <img src="/assets/images/item-details.jpg" alt="Image" />
                                        <div className="countdown-inner">
                                            <h4 className="heading">EVENT ENDS IN</h4>
                                            <div className="countdown style-2">
                                                <CountDownTime />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-6 col-md-12">
                                    <div className="tf-item-detail-inner">
                                        <h2 className="title">Blockchain Summit 2024</h2>
                                        <p className="des">Join us for the Blockchain Summit 2024, where industry leaders will discuss the latest trends and innovations in blockchain technology.</p>
                                        <div className="infor-item-wrap">
                                            <div className="infor-item-box">
                                                <div className="category">Date</div>
                                                <h4 className="name">June 25, 2024</h4>
                                            </div>
                                            <div className="infor-item-box">
                                                <div className="category">Location</div>
                                                <h4 className="name">New York, USA</h4>
                                            </div>
                                            <div className="infor-item-box">
                                                <div className="category">Speakers</div>
                                                <h4 className="name">John Doe, Jane Smith</h4>
                                            </div>
                                            <div className="infor-item-box">
                                                <div className="category">Topics</div>
                                                <h4 className="name">DeFi, NFTs, Smart Contracts</h4>
                                            </div>
                                            <div className="infor-item-box">
                                                <div className="category">Tickets</div>
                                                <h4 className="name">Available Now</h4>
                                            </div>
                                        </div>
                                        <div className="price">
                                            <span className="heading">PRICE:</span>
                                            <span>0.15 ETH</span>
                                        </div>
                                        <div className="group-btn">
                                            <button onClick={handleTransaction} className="tf-button opensea"><i className="icon-fl-bag" /> BUY TICKETS</button>
                                            <div className="group-2">
                                                <Link href="#" className="tf-button style-2 "><i className="icon-fl-vt" /> JOIN DISCORD</Link>
                                                <Link href="#" className="tf-button style-2 twitter"><i className="fab fa-twitter" /> FOLLOW US ON TWITTER</Link>
                                            </div>
                                        </div>
                                        {transactionStatus && (
                                            <div className="transaction-status">
                                                <p>{transactionStatus}</p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                    <section className="tf-collection">
                        <div className="tf-container">
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="tf-heading mb40">
                                        <h2 className="heading">EXPLORE EVENTS</h2>
                                    </div>
                                </div>
                                <div className="col-md-12">
                                    <div className="swiper-container collection visible">
                                        <Swiper {...swiperOptions} className="swiper-wrapper">
                                            <SwiperSlide>
                                                <div className="slider-item">
                                                    <div className="tf-product">
                                                        <div className="image">
                                                            <img src="/assets/images/product/product3.jpg" alt="Image" />
                                                        </div>
                                                        <h6 className="name"><Link href="/item-detail">Crypto Expo 2024</Link></h6>
                                                    </div>
                                                </div>
                                            </SwiperSlide>
                                            <SwiperSlide>
                                                <div className="slider-item">
                                                    <div className="tf-product">
                                                        <div className="image">
                                                            <img src="/assets/images/product/product4.jpg" alt="Image" />
                                                        </div>
                                                        <h6 className="name"><Link href="/item-detail">NFT Art Fair</Link></h6>
                                                    </div>
                                                </div>
                                            </SwiperSlide>
                                            <SwiperSlide>
                                                <div className="slider-item">
                                                    <div className="tf-product">
                                                        <div className="image">
                                                            <img src="/assets/images/product/product5.jpg" alt="Image" />
                                                        </div>
                                                        <h6 className="name"><Link href="/item-detail">DeFi Conference</Link></h6>
                                                    </div>
                                                </div>
                                            </SwiperSlide>
                                            <SwiperSlide>
                                                <div className="slider-item">
                                                    <div className="tf-product">
                                                        <div className="image">
                                                            <img src="/assets/images/product/product6.jpg" alt="Image" />
                                                        </div>
                                                        <h6 className="name"><Link href="/item-detail">Metaverse Summit</Link></h6>
                                                    </div>
                                                </div>
                                            </SwiperSlide>
                                            <SwiperSlide>
                                                <div className="slider-item">
                                                    <div className="tf-product">
                                                        <div className="image">
                                                            <img src="/assets/images/product/product1.jpg" alt="Image" />
                                                        </div>
                                                        <h6 className="name"><Link href="/item-detail">Web3 Innovators Meetup</Link></h6>
                                                    </div>
                                                </div>
                                            </SwiperSlide>
                                            <SwiperSlide>
                                                <div className="slider-item">
                                                    <div className="tf-product">
                                                        <div className="image">
                                                            <img src="/assets/images/product/product7.jpg" alt="Image" />
                                                        </div>
                                                        <h6 className="name"><Link href="/item-detail">Tokenomics Workshop</Link></h6>
                                                    </div>
                                                </div>
                                            </SwiperSlide>
                                            <SwiperSlide>
                                                <div className="slider-item">
                                                    <div className="tf-product">
                                                        <div className="image">
                                                            <img src="/assets/images/product/product2.jpg" alt="Image" />
                                                        </div>
                                                        <h6 className="name"><Link href="/item-detail">Smart Contract Summit</Link></h6>
                                                    </div>
                                                </div>
                                            </SwiperSlide>
                                        </Swiper>
                                        <div className="group-btn-nav">
                                            <div className="swiper-button-prev button-collection-prev" />
                                            <div className="swiper-button-next button-collection-next" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </Layout>
        </>
    )
}
