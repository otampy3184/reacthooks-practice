import { extendTheme } from "@chakra-ui/react";

// ページの配色などを決める
const theme = extendTheme({
    styles: {
        global: {
            body: {
                backgroundColor: "orange.50",
                color: "gray.800",
            },
            p: {
                fontSize: { base: "md", md: "lg" },
                lineHeight: "tall"
            }
        }
    }
});

export default theme;