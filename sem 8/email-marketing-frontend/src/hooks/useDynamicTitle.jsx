import { useEffect } from "react";

function useDynamicTitle(title='Mailed It!') {

    useEffect(()=> {
        document.title = title;

        return(() => {
            document.title = 'Mailed It!';
        })
    }, [title]);
}

export default useDynamicTitle;