import React from 'react'

const CartList = ({ items, onUpdate }) => {
    return (
        <>
            <div className="card bg-white w-full shadow-md rounded-md ">
                <div className="card-body">
                    {!Boolean(items.length) && (
                        <p className="text-lg text-center">Your cart is empty!</p>
                    )}
                    {items.map((item, idx) => (
                        <div key={item.id} data-testid={`item-${item.id}`}>
                            <img className="rounded-md" alt={`${item.title} product`} src={item.image} />
                            <div className="mt-6 col-span-3">
                                <h2 className="text-md font-medium">{item.title}</h2>
                                <p className="mt-1">{item.description}</p>

                                <p className="mt-3 font-semibold" data-testid={`item-${item.id}-price`}>${item.price / 100} <span className="opacity-50 font-normal ml-2">(Excludes shipping)</span></p>
                            </div>

                            <div className="mt-6">
                                <button className="btn btn-sm btn-outline btn-secondary w-full" onClick={() => onUpdate(items.splice(idx + 1, 1))}>
                                    Remove from cart
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}

export default CartList