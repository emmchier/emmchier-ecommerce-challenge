import React from 'react';

import { SkeletonProduct } from './SkeletonProduct';

export const SkeletonRow = () => {
    return (
        <>
            <div className="row skeleton-row">
                {
                    [...new Array(4)].map((n, key) => <SkeletonProduct key={ key } />)
                }
            </div>
        </>
    )
}
