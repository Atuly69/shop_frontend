import React from 'react';
import styles from './Nodata.css';
import no_result from "../assets/no-results.png"

const NoDataFound = () => {
    return (
        <div className={'container'}>
            <img src={no_result}
                style={{ height: "200px" }}
            />
        </div>
    );
}

export default NoDataFound;
