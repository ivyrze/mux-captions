"use client";

import type { PropsWithChildren } from "react";
import { ChakraProvider, extendTheme, withDefaultColorScheme } from "@chakra-ui/react";

const theme = extendTheme({
    config: {
        initialColorMode: 'system',
        useSystemColorMode: true
    }
}, withDefaultColorScheme({
    colorScheme: 'blue'
}));

export const Providers = (props: PropsWithChildren) => {
    const { children } = props;

    return (
        <ChakraProvider theme={ theme }>
            { children }
        </ChakraProvider>
    );
};

export default Providers;