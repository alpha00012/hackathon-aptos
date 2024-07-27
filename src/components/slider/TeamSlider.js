'use client'
import { Autoplay, Navigation, Pagination } from "swiper/modules"
import { Swiper, SwiperSlide } from "swiper/react"
import Link from "next/link"

const swiperOptions = {
    modules: [Autoplay, Pagination, Navigation],
    loop: false,
    slidesPerView: 1,
    spaceBetween: 30,
    navigation: {
        clickable: true,
        nextEl: ".button-team-next",
        prevEl: ".button-team-prev",
    },
    breakpoints: {
        600: {
            slidesPerView: 2,
            spaceBetween: 30,
        },
        992: {
            slidesPerView: 3,
            spaceBetween: 30,
        },
        1200: {
            slidesPerView: 4,
            spaceBetween: 30,
        },
    },
}

export default function TeamSlider() {
    return (
        <>
            <div className="swiper-container team-slider ">
                <Swiper {...swiperOptions} className="swiper-wrapper">
                    <SwiperSlide>
                        <div className="slider-item">
                            <div className="tf-team">
                                <div className="image">
                                    <img src="/assets/images/team/farouk.jpeg" alt="Image" />
                                </div>
                                <h4 className="name"><Link href="/team">Farouk Chalghoumi</Link></h4>
                                <ul className="social">
                                    <li><Link href="https://www.linkedin.com/in/farouk-chalghoumi/"><i className="fab fa-linkedin" /></Link></li>
                                    <li><Link href="#"><i className="fab fa-facebook" /></Link></li>
                                    <li><Link href="#"><i className="fab fa-instagram" /></Link></li>
                                    <li><Link href="#"><i className="fab fa-telegram" /></Link></li>
                                </ul>
                            </div>
                        </div>{/* item*/}
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className="slider-item">
                            <div className="tf-team active">
                                <div className="image">
                                    <img src="/assets/images/team/wala.jpg" alt="Image" />
                                </div>
                                <h4 className="name"><Link href="/team">Walaeddine Riahi</Link></h4>
                                <ul className="social">
                                    <li><Link href="https://www.linkedin.com/in/walaeddine-riahi-18177b23a/"><i className="fab fa-linkedin" /></Link></li>
                                    <li><Link href="#"><i className="fab fa-facebook" /></Link></li>
                                    <li><Link href="#"><i className="fab fa-instagram" /></Link></li>
                                    <li><Link href="#"><i className="fab fa-telegram" /></Link></li>
                                </ul>
                            </div>
                        </div>{/* item*/}
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className="slider-item">
                            <div className="tf-team">
                                <div className="image">
                                    <img src="/assets/images/team/habib.jpeg" alt="Image" />
                                </div>
                                <h4 className="name"><Link href="/team">Mohamed Habib Allah Bibani</Link></h4>
                                <ul className="social">
                                    <li><Link href="https://www.linkedin.com/in/mohamed-habib-allah-bibani-08b966230/"><i className="fab fa-linkedin" /></Link></li>
                                    <li><Link href="#"><i className="fab fa-facebook" /></Link></li>
                                    <li><Link href="#"><i className="fab fa-instagram" /></Link></li>
                                    <li><Link href="#"><i className="fab fa-telegram" /></Link></li>
                                </ul>
                            </div>
                        </div>{/* item*/}
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className="slider-item">
                            <div className="tf-team">
                                <div className="image">
                                    <img src="/assets/images/team/fares.jpeg" alt="Image" />
                                </div>
                                <h4 className="name"><Link href="/team">Mohamed Fares Frini</Link></h4>
                                <ul className="social">
                                    <li><Link href="https://www.linkedin.com/in/mohamed-fares-frini-91b518257/"><i className="fab fa-linkedin" /></Link></li>
                                    <li><Link href="#"><i className="fab fa-facebook" /></Link></li>
                                    <li><Link href="#"><i className="fab fa-instagram" /></Link></li>
                                    <li><Link href="#"><i className="fab fa-telegram" /></Link></li>
                                </ul>
                            </div>
                        </div>{/* item*/}
                    </SwiperSlide>
                </Swiper>
            </div>
            <div className="swiper-button-prev button-team-prev" />
            <div className="swiper-button-next button-team-next" />
        </>
    )
}
