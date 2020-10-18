import React from 'react';
import StripeCheckout from 'react-stripe-checkout';


const StripeCheckoutButton = ({price}) => {
    const priceForStripe = price * 100;
    const publishableKey = 'pk_test_51HdcaHFjkdsLm5dDOB08tkkd9x1At5owUHIBinNYfGMd7jdd1tYjoF5hXXWWaMZPxo7zFstGJCsh34RjoKD8x4Nh009McLLiT7';

    const onToken = token => {
        console.log(token);
        alert('Payment successful')
    }
    return (
        <StripeCheckout 
            label='Pay Now'
            name='Crown Clothing Ltd.'
            billingAddress
            shippingAddress
            image='https://svgshare.com/i/CUz.svg'
            description={`Your total is $${price}`}
            amount={priceForStripe}
            panelLabel='Pay Now'
            token={onToken}
            stripeKey={publishableKey}
        />
    )
};

export default StripeCheckoutButton;