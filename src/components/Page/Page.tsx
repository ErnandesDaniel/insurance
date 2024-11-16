import type {ReactNode} from "react";

interface PageProps {
    children: ReactNode;
    className?:string;
}
const Page=({children, className}:PageProps)=>{
    return(<div className={className} style={{overflow:'none'}}>
        {children}
    </div>)
}

export default Page;