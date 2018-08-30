import React from 'react';
import { CameraContext } from 'App';

export function wrapWithContext(ToWrap) {
    return function wrapped(props) {
        return (
            <CameraContext.Consumer>
                {(context) => (
                    <ToWrap
                        app={context.app}
                        showLoader={context.showLoader}
                        hideLoader={context.hideLoader}
                        {...props}
                    />
                )}
            </CameraContext.Consumer>
        );
    }
}
