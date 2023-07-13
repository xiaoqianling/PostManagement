"use client";
import {Inter} from 'next/font/google'
import style from './app.module.css'
import {StrictMode} from "react";
import {Provider} from "react-redux";
import {store} from "@/app/features/store";
import Link from "next/link";

const inter = Inter({subsets: ['latin']})

export default function RootLayout({children}) {
    return (
        <html lang="en">
        <body className={inter.className}>
        <StrictMode>
            <Provider store={store}>
                <div className={style.top}>
                    <span>Next&Redux</span>
                    <Link href={"/"} className={style.posts}>文章列表</Link>
                </div>
                {children}
            </Provider>
        </StrictMode>
        </body>
        </html>
    )
}
