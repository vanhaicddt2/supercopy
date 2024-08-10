import React from "react";
import LoadingIcon from '../../../units/img/loading.gif';

function IsLoading() {
    return (<div className="globalloading">
            <img src={LoadingIcon} alt="loading" className="globalloading-icon" style={{width:'75px'}} />
            <h4 className="globalloading-text">{"Loading..." }</h4>
    </div>)
}

export default IsLoading;
