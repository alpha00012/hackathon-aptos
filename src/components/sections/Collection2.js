import Link from "next/link";

export default function Collection2() {
    return (
        <>
            <section className="tf-collection wow fadeInUp">
                <div className="tf-container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="tf-heading style-2 mb60">
                                <h2 className="heading">HOT EVENT</h2>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6 col-sm-6">
                            <div className="tf-product">
                                <div className="image">
                                    <Link href="/item-detail">
                                        <img src="/assets/images/product/product12.jpg" alt="Image" />
                                    </Link>
                                </div>
                                <h6 className="name"><Link href="/item-detail">Blockchain Summit 2024</Link></h6>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6 col-sm-6">
                            <div className="tf-product active">
                                <div className="image">
                                    <Link href="/item-detail">
                                        <img src="/assets/images/product/product13.jpg" alt="Image" />
                                    </Link>
                                </div>
                                <h6 className="name"><Link href="/item-detail">Crypto Expo 2024</Link></h6>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6 col-sm-6">
                            <div className="tf-product">
                                <div className="image">
                                    <Link href="/item-detail">
                                        <img src="/assets/images/product/product14.jpg" alt="Image" />
                                    </Link>
                                </div>
                                <h6 className="name"><Link href="/item-detail">NFT Art Fair</Link></h6>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6 col-sm-6">
                            <div className="tf-product">
                                <div className="image">
                                    <Link href="/item-detail">
                                        <img src="/assets/images/product/product15.jpg" alt="Image" />
                                    </Link>
                                </div>
                                <h6 className="name"><Link href="/item-detail">DeFi Conference</Link></h6>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6 col-sm-6">
                            <div className="tf-product">
                                <div className="image">
                                    <Link href="/item-detail">
                                        <img src="/assets/images/product/product16.jpg" alt="Image" />
                                    </Link>
                                </div>
                                <h6 className="name"><Link href="/item-detail">Metaverse Summit</Link></h6>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6 col-sm-6">
                            <div className="tf-product">
                                <div className="image">
                                    <Link href="/item-detail">
                                        <img src="/assets/images/product/product17.jpg" alt="Image" />
                                    </Link>
                                </div>
                                <h6 className="name"><Link href="/item-detail">Web3 Innovators Meetup</Link></h6>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6 col-sm-6">
                            <div className="tf-product">
                                <div className="image">
                                    <Link href="/item-detail">
                                        <img src="/assets/images/product/product18.jpg" alt="Image" />
                                    </Link>
                                </div>
                                <h6 className="name"><Link href="/item-detail">Tokenomics Workshop</Link></h6>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6 col-sm-6">
                            <div className="tf-product">
                                <div className="image">
                                    <Link href="/item-detail">
                                        <img src="/assets/images/product/product19.jpg" alt="Image" />
                                    </Link>
                                </div>
                                <h6 className="name"><Link href="/item-detail">Smart Contract Summit</Link></h6>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
