"use client";
import StoreModal from '@/components/modal/store-modal';
import React from 'react'

const StoreModalProvider = () => {
const [isMounted, setIsMounted] = React.useState(false);

React.useEffect(() => {
    setIsMounted(true);
}, []);

if (!isMounted) {
    return null;
}


  return (
    <StoreModal />
  )
}

export default StoreModalProvider