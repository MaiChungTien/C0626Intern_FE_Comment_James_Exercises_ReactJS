import { useState } from 'react';

const useIncrement = () => {
    const [count,setCount] = useState(0);
    const increase = (addAmount) => {
        console.log(count);
        setCount((prev) => prev+addAmount)
    }
    return [count,increase];
}
 
export default useIncrement;