import React, { useState, useEffect } from 'react'

const completeOrder = async (values) => {
    const data = await (await fetch(`http://localhost:4000/complete-order`, {
        method: 'POST',
        body: JSON.stringify(values),
    })).json();
    
    return data;
}


const ShippingForm = ({ items, onComplete }) => {
    const [loading, setLoading] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [shippingMethod, setShippingMethod] = useState(undefined);
    const [shippingCost, setShippingCost] = useState(undefined);

    const hasItems = Boolean(items.length);
    const hasShippingCost = shippingCost || shippingCost === 0;
    const total = hasItems ? items?.reduce((item, total) => item + total.price, 0) : undefined;

    useEffect(() => {
        if (!shippingMethod) return;
        const getShippingCost = async (method) => {
            setLoading(true);
            const data = await (await fetch(`http://localhost:4000/shipping-cost?method=${method}`)).json();
            setLoading(false);
            setShippingCost(data);
        }

        getShippingCost(shippingMethod)
    }, [shippingMethod])


    const handleSubmit = async (e) => {
        e.preventDefault(); 

        if (!name || !email || !shippingMethod) {
            return;
        }

        setSubmitting(true);

        const { success } = await completeOrder({
            name, email, shippingMethod,
        })

        setSubmitting(false);

        if (success) {
            setName("")
            setEmail("")
            setShippingMethod(undefined)
            setShippingCost(undefined);
        }
        onComplete(success);
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className="form-control w-full mt-2">
                <label htmlFor="name" className="label">
                    <span className="label-text text-base">Your name</span>
                </label>
                <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Joe Bloggs" className="input input-bordered w-full text-base" />
            </div>
            <div className="form-control w-full mt-2">
                <label htmlFor="email" className="label">
                    <span className="label-text text-base">Email address</span>
                </label>
                <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="joe@bloggs.com" className="input input-bordered w-full text-base" />
            </div>
            <div className="form-control w-full mt-2">
                <label htmlFor="shippingMethod" className="label">
                    <span className="label-text text-base">Shipping method</span>
                </label>
                <select id="shippingMethod" className="select select-bordered " value={shippingMethod || "DEFAULT"} onChange={(e) => setShippingMethod(e.target.value)}>
                    <option value="DEFAULT" disabled>Please select an option</option>
                    <option value="ASAP">Next Working Day</option>
                    <option value="STANDARD">2 to 5 Working Days</option>
                    <option value="SLOW">1 to 2 Weeks</option>
                </select>
            </div>

            {hasItems && (
                <p className="mt-6 text-right">Cart total: <span className="font-semibold">${total / 100}</span></p>
            )}

            {!hasShippingCost && !loading && hasItems && (
                <p className="mt-1 text-right opacity-50">Select a shipping method to calculate total</p>
            )}

            {loading && (
                <div className="flex items-center justify-end mt-2">
                    <svg role="status" className="w-6 h-6 mr-4 text-gray-200 animate-spin dark:text-gray-300 fill-blue-500" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                    </svg>
                    <p>Calculating your order total</p>
                </div>
            )}

            {(hasShippingCost) && !loading && hasItems && (
                <>
                    <p className="mt-1 text-right">
                        {shippingCost ? <>Shipping costs: ${(shippingCost / 100).toFixed(2)}</> : <>Free shipping on this order</>}
                    </p>
                    <p className="mt-4 text-right">Order total: <span className="font-semibold">${(total + shippingCost) / 100}</span></p>
                </>
            )}

            <div className="flex justify-end">
                <button disabled={!total} type="submit" className="btn btn-primary mt-6">
                    {submitting ? "Submitting order...": "Complete your order"}
                </button>
            </div>
        </form>
    )
}

export default ShippingForm
