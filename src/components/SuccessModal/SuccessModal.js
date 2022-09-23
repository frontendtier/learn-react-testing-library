import React, { useState } from 'react'

const SuccessModal = () => {
    const [open, setOpen] = useState(true);
  return (
      <div className={open ? 'modal modal-open' : 'modal'}>
          <div className="modal-box">
              <h3 className="font-bold text-lg">Thank you for your order!</h3>
              <p className="py-4">You are now one step closer to annoying your co-workers with a mechanical keyboard!</p>
              <div className="modal-action">
                  <button className="btn" onClick={() => setOpen(false)}>Close</button>
              </div>
          </div>
      </div>
  )
}

export default SuccessModal