import Head from "next/head"
import { FC } from "react";
import Navbar from "../ui/Navbar";
import { SideMenu } from "../ui/SideMenu";

interface Props {
    
    title:string;
    pageDescription:string;
    imageFullUrl?:string;
    children: string | JSX.Element | JSX.Element[];

}

const ShopLayout: FC<Props> = ({children, title, pageDescription, imageFullUrl}) => {
  return (
    <>
        <Head>
            <title>{ title }</title>
            <meta name="description" content={ pageDescription } />
            <meta name="og:title" content={ title } />
            <meta name="og.description" content={ pageDescription } />
            {
                imageFullUrl && ( <meta name="og:image" content={imageFullUrl} />)
            }
            
        </Head>
        <nav>
           <Navbar />
        </nav>
        <SideMenu />
        {/* Todo Sidebar */}
        <main style={{
                    margin:'80px auto', maxWidth: '1440px', padding: '0px 30px'
                }}>
            { children }
        </main>
        <footer>
            {/* Todo custom footer */}
        </footer>
    </>
  )
}

export default ShopLayout