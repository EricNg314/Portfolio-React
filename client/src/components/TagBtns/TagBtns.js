import React from 'react';
import './TagBtns.css';

const TagBtns = props => {
  const tagName = props.tagName;
  const tagReqArr = props.tagReqArr;
  let active = "";

  if (tagReqArr.indexOf(tagName) > -1){
    active = 'active';
  }

  const classNames = `btn tag-btn my-1 mx-1 py-0 px-1 btn-color btn-outline-dark animated fadeIn ${active}`;

  return (
    <div className="col-12">
      <button className={classNames} onClick={() => props.selectTag(props['tagName'])}>{props['tagName']}

      </button>
    </div>
  )
}

export default TagBtns;

