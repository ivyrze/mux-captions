import type { PropsWithChildren } from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Providers from "./providers";
import SettingsDialog from "@/components/SettingsDialog";
import "../styles/global.css";

const inter = Inter({ subsets: [ "latin" ] });

export const metadata: Metadata = {
    title: "Mux Captions"
};

export const RootLayout = (props: PropsWithChildren) => {
    const { children } = props;

    return (
        <html lang="en">
            <body className={ inter.className }>
                <Providers>
                    <header>
                        <SettingsDialog />
                    </header>
                    { children }
                </Providers>
            </body>
        </html>
    );
};

export default RootLayout;