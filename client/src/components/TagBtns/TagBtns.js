import React from 'react';
import './TagBtns.css';

const TagBtns = props => (
  <div className="col-12">
    <button className="btn tag-btn my-1 mx-1 py-0 px-1 btn-color btn-outline-dark animated fadeIn" onClick={() => props.selectTag(props['tagName'])}>{props['tagName']}

    </button>

  </div>
)


export default TagBtns;

