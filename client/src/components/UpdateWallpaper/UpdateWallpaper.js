import React, { useState, useEffect } from 'react';

import AddWallpaper from '../AddWallpaper/AddWallpaper';
import { DeleteWallpaper } from '../DeleteWallpaper/DeleteWallpaper';

export default function UpdateWallpaper(props) {

    const [subCategorySelect, setSubCategorySelect] = useState({});


    let rows = [];

    useEffect(() => {
        setSubCategorySelect(props.subCategorySelect);
    },[])

    return (
        <div className="row">
            {
                subCategorySelect.wallpapers ?
                    subCategorySelect.wallpapers.forEach(item => {
                        rows.push(
                            <div className="col con" key={item._id}>
                                <img className="conImgSubCategory" src={(item.url)} alt="card image3" />
                                <DeleteWallpaper wall={item} refresh={() => props.refresh()} />
                            </div>
                        )
                    })
                    : null
            }
            {rows}
            {
                <AddWallpaper subCategorySelectId={subCategorySelect._id} refresh={() => props.refresh()} />

            }
        </div>
    );
}