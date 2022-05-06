import React, { memo } from "react";
import { Heading} from "@chakra-ui/react";

// Title用のコンポーネント
// 親コンポーネントからpropsとしてtitle, as, fontSize, mtを受け取る
export const TodoTitle = memo(({title, as, fontSize, mt}) => {
    return (
        <Heading mt={mt} as={as} fontSize={fontSize} w="full">
            {title}
        </Heading>  
    );
});