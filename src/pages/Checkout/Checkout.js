import { useState } from 'react';

import Layout from "../../components/Layout";
import Title from "../../components/Title";
import CartList from "../../components/CartList";
import ShippingForm from "../../components/ShippingForm";
import SuccessModal from "../../components/SuccessModal";
import ErrorModal from "../../components/ErrorModal";

const Checkout = ({ items }) => {
    const [cartItems, setCartItems] = useState(items);
    const [status, setStatus] = useState();
    

    const handleComplete = (success) => {
        if (success) {
            setStatus("SUCCESS");
        } else {
            setStatus("ERROR");
        }
    }   
    return (
        <Layout>
            <Title>Your shopping cart</Title>
            {status && (
                <>
                    {status === "SUCCESS" ? (<SuccessModal />) : (<ErrorModal />)}
                </>
            )}
            <div className="grid grid-cols-8 gap-16 mt-6">
                
                <div className="col-span-3">
                    <CartList items={cartItems} onUpdate={(items) => setCartItems(items)} /> 
                </div>
                <div className="col-span-5 mt-4">
                    <h2 className="text-lg font-semibold">Shipping Details</h2>
                    <ShippingForm items={cartItems} onComplete={handleComplete} />
                </div>
            </div>  
        </Layout>
    );
}

export default Checkout;
