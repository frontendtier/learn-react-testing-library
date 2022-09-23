import React from 'react'
import Container from "../Container";

const Layout = ({ children }) => (
  <main className="h-screen bg-slate-100">
      <div className="py-20">
        <Container>
            {children}  
        </Container>
      </div>
  </main>
)


export default Layout