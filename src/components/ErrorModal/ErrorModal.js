import React, { useState } from 'react'

const ErrorModal = () => {
    const [open, setOpen] = useState(true);
    return (
        <div className={open ? 'modal modal-open' : 'modal'}>
            <div className="modal-box">
                <h3 className="font-bold text-lg text-red-700">Something went wrong processing your order</h3>
                <p className="py-4">Your co-workers will survive another day without the sweet sound of a mechanical keyboard</p>
                <div className="modal-action">
                    <button className="btn btn-error" onClick={() => setOpen(false)}>Close</button>
                </div>
            </div>
        </div>
    )
}

export default ErrorModal