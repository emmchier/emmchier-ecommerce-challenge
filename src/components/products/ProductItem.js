import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import buyBlue from '../../assets/buy-blue.svg';
import { UserContext } from '../contexts/UserContext';
import { Points } from '../user/Points';
import { ProductRedeemInfo } from './ProductRedeemInfo';
import { useMediaQuery } from 'react-responsive';
import { CustomButton } from '../ui/CustomButton';
import { CustomRedeemBtn } from '../ui/CustomRedeemBtn';
import { redeemProduct } from '../../actions/redeemProduct';
import { CustomLinkBtn } from '../ui/CustomLinkBtn';
import coin from '../../assets/icons/coin.svg';
import RedeemDialog from '../ui/RedeemDialog';

export const ProductItem = ( props ) => {

    const {
        productId, 
        productCategory, 
        productName, 
        productImg, 
        productImgHd,
        productCost
    } = props;

    const isMobile = useMediaQuery({ query: `(min-width: 760px)` });

    const [isHover, setIsHover] = useState(false);

    const { user, setUser } = useContext(UserContext);

    const { points: userPoints } = user;
    
    return (

        
        
        <div className="col-sm-12 col-md-4 col-lg-3"
            onMouseEnter={() => { 
                productCost > userPoints 
                ? setIsHover(false) : setIsHover(true)
            }}
            onMouseLeave={() => { setIsHover(false) }}>
            
            <div className={
                productCost > userPoints
                ? "product-card-container"
                : "product-card-container elevate"
            }>
                {
                    isMobile && isHover && 
                        <ProductRedeemInfo 
                            productId={ productId }
                            productCost={ productCost }
                            productName={ productName }
                            productImg={ productImg }
                            productImgHd={ productImgHd } /> 
                        
                }
                    
                <div className="
                    store__product-card 
                    main-elevation 
                    animate__animated 
                    animate__fadeIn">
                    <div className="store__product-card-data">
                        {
                            !isMobile &&
                            <div className="points-container">
                                <p className="redeem-cost"> { productCost } </p>
                                <img src={ coin } className="coin-icon" alt="coin icon"/>
                            </div>
                        }
                    {
                        productCost > userPoints ? 
                        <Points points={ `You need ${ productCost - userPoints }` } /> : 
                        <img 
                            src={ buyBlue } 
                            className="store__product-buy-icon" 
                            alt="buy blue icon"
                        />
                    }
                    <div className="store__product-card-body">
                        <img 
                            src={ productImg } 
                            className="
                                store__product-card-img 
                                animate__animated 
                                animate__fadeInUp 
                                animate__faster 
                                animate__delay-0.2s" 
                            alt="product image"
                        />
                        <p className="
                            store__product-card-category 
                            animate__animated 
                            animate__fadeInUp 
                            animate__fast 
                            animate__delay-0.4s"> 
                            { productCategory } 
                        </p>
                        <p className="
                            store__product-card-title 
                            animate__animated 
                            animate__fadeInUp 
                            animate__fast 
                            animate__delay-0.8s"> 
                            { productName } 
                        </p>
                        {   
                        !isMobile &&
                        <>
                        <div classes="footer-actions-container">
                            <RedeemDialog
                                productId={ productId }
                                productCost={ productCost }
                                productName={ productName }
                                productImg={ productImg }
                                productImgHd={ productImgHd }
                                clasess={ 'btn-redeem-res' }
                            />
                            {/* <CustomRedeemBtn 
                                classes={ 'btn-redeem-res' } 
                                onClick={ ()=> { 
                                    redeemProduct() } } 
                            /> */}
                            <CustomLinkBtn productId={ productId } />
                        </div>
                        
                        </>
                    }
                    </div>
                    <div className="btn-see-more-container">
                        <CustomLinkBtn productId={ productId } />
                    </div>
                    
                    
                    </div>
                    
                </div>
            </div>
            
        </div>
    )
}
