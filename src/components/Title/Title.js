import React from 'react';

const Title = ({ children }) => {
  return (
    <>
        <h1 className="text-2xl font-semibold">{children}</h1>
        <hr  className="mt-4"/>
    </>
  )
}

export default Title